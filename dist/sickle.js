/**
 * Sickle allows developers using MooTools to swap out Slick for Sizzle with no API changes.
 *
 * Copyright (c) 2013 by Matt Zabriskie
 * Released under the MIT license
 *
 * Special thanks to Christoph Pojer for his Gist (https://gist.github.com/cpojer/361474),
 * which made covering all the entry points much easier.
 */
;(function (window, document) {
    'use strict';

    var Sickle = {
        version: '0.1.9',
        IGNORE_SYNTAX_ERRORS: true
    };

    /**
     * Make sure element has had Element.Prototype applied to it
     *
     * @param {Element} el The element to apply Element.Prototype to
     * @param {boolean} [nocache] Whether or not to use cache
     * @returns {Element}
     */
    function wrap(el, nocache) {
        if (!nocache && el && el.nodeType === 1 && !el.$family && el.tagName != 'OBJECT' && el.tagName != 'EMBED') {
            var fireEvent = el.fireEvent;
            // wrapping needed in IE7, or else crash
            el._fireEvent = function(type, event){
                return fireEvent(type, event);
            };
            Object.append(el, Element.Prototype);
        }
        return el;
    }

    /**
     * Check if an element matches a selector
     *
     * @param {Element} el The element to test selector against
     * @param {String|Element} selector The selector to use for matching
     * @returns {boolean} True if element matches the selector, otherwise false
     */
    function match(el, selector) {
        var result = false;

        switch(typeOf(selector)) {
            case 'null':
                result = true;
                break;

            case 'string':
                try {
                    result = Sizzle.matchesSelector(el, scrub(selector));
                } catch (e) {
                    if (!Sickle.IGNORE_SYNTAX_ERRORS) {
                        throw e;
                    }
                }
                break;

            case 'element':
                result = el === selector;
                break;
        }

        return result;
    }

    /**
     * Search for elements matching the selector provided
     *
     * @param {String} selector The selector to use for search
     * @param {Element|Document} [context] The root element to perform search from
     * @returns {Array} The elements that matched the selector
     */
    function search(selector, context) {
        var result = [];

        try {
            result = new Sizzle(scrub(selector), context);
        } catch (e) {
            if (!Sickle.IGNORE_SYNTAX_ERRORS) {
                throw e;
            }
        }

        return result;
    }

    var RX_ATTR = /\[(.*?)=([^'"].*?[^'"])\]/g;
    /**
     * Scrub a selector to make it safe for use by Sizzle by adding quotes to attribute expressions
     *
     * @param {String} selector The selector to scrub
     * @returns {String} A selector that is safe for use by Sizzle
     */
    function scrub(selector) {
        return selector ? selector.replace(RX_ATTR, '[$1="$2"]') : selector;
    }

    /**
     * Find an element by it's ID, get an element from an object, or extend an element with Element methods
     *
     * @param {String|Object|Element} el The id of an element, an object to call toElement on, or element to extend
     * @param {boolean} [nocache] Whether or not to use cache
     * @param {Document} [doc] Document to use for search, defaults to this.document
     * @returns {Element} The Element that resulted
     */
    document.id = function (el, nocache, doc) {
        var result = null,
            type = typeOf(el);

        doc = doc || document;

        switch(type) {
            case 'string':
                result = doc.getElementById(el);
                break;

            case 'object':
                result = el.toElement ? el.toElement(doc) : null;
                break;

            case 'element':
                result = el;
                break;

            default:
                if (type === 'textnode' ||
                    type === 'whitespace' ||
                    type === 'window' ||
                    type === 'document') {
                    result = el;
                }
        }

        return wrap(result, nocache);
    };

    // Override $
    if (window.$ === null) Window.implement('$', function(el, nc){
        return document.id(el, nc, document);
    });

    // Override $$
    if ($$.toString().match(/Slick\.search/) !== null) Window.implement({
        /**
         * Searches the document for elements matching the selector, or extends elements supplied with Element methods
         *
         * @param {String|Element|Array} selector The selector to use for searching the document, or the elements to extend
         * @returns {Elements} The elements that matched the selector
         */
        $$: function (selector) {
            var result = new Elements();

            if (arguments.length === 1) {
                switch(typeOf(selector)) {
                    case 'string':
                        result = new Elements(search(selector, document));
                        break;

                    case 'element':
                        result.push(wrap(selector));
                        break;

                    case 'array':
                        result = new Elements(selector);
                        break;
                }
            } else {
                result = new Elements(arguments);
            }

            return result;
        }
    });

    // Override getElement and getElements for Element and Document
    Array.forEach([Element, Document], function (clss) {
        clss.implement({
            /**
             * Gets the first descendant element that matches the selector provided
             *
             * @param {String|Element} selector The selector to use for searching, or the element to match
             * @returns {Element} The matching element or null if none matched
             */
            getElement: function (selector) {
                var result = null;

                switch(typeOf(selector)) {
                    case 'string':
                        result = wrap(search(selector, this)[0]);
                        break;

                    case 'element':
                        var node = selector;
                        while ((node = node.parentNode) !== null) {
                            if (node === this) {
                                result = wrap(selector);
                                break;
                            }
                        }
                        break;
                }

                return result;
            },

            /**
             * Gets all descendant elements that match the selector provided
             *
             * @param {String|Element} selector The selector to use for searching, or the element to match
             * @returns {Elements} The elements that matched the selector
             */
            getElements: function (selector) {
                var result = new Elements();

                switch(typeOf(selector)) {
                    case 'string':
                        result = new Elements(search(selector, this));
                        break;

                    case 'element':
                        var node = selector;
                        while ((node = node.parentNode) !== null) {
                            if (node === this) {
                                result.push(wrap(selector));
                                break;
                            }
                        }
                        break;
                }

                return result;
            }
        });
    });

    // This is for IE<9 which doesn't return a proper Element from document.getElementById
    var uuid = 'sickle-uniqueid-' + Date.now(),
        temp = new Element('div', {id:uuid, styles:{display:'none'}});

    document.body.appendChild(temp);

    if (!(document.getElementById(uuid) instanceof Element)) {
        var getElementById = document.getElementById;
        Document.implement({
            getElementById: function (id) {
                return wrap(getElementById(id));
            }
        });
    }

    document.body.removeChild(temp);

    // Override Element methods
    Element.implement({
        /**
         * Gets the previous element sibling of this Element that matches the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Element} The previous element sibling or null if none matched
         */
        getPrevious: function (selector) {
            var node = this,
                prop = node.previousElementSibling ? 'previousElementSibling' : 'previousSibling';
            while ((node = node[prop]) !== null) {
                if (node.nodeType !== 1) continue;
                if (match(node, selector)) return wrap(node);
            }

            return null;
        },

        /**
         * Gets all previous element siblings of this Element that match the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Elements}
         */
        getAllPrevious: function (selector) {
            var nodes = new Elements(),
                node = this,
                prop = node.previousElementSibling ? 'previousElementSibling' : 'previousSibling';
            while ((node = node[prop]) !== null) {
                if (node.nodeType !== 1) continue;
                if (match(node, selector)) nodes.push(wrap(node));
            }

            return nodes;
        },

        /**
         * Gets the next element sibling of this Element that matches the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Element} The next element sibling or null if none matched
         */
        getNext: function (selector) {
            var node = this,
                prop = node.nextElementSibling ? 'nextElementSibling' : 'nextSibling';
            while ((node = node[prop]) !== null) {
                if (node.nodeType !== 1) continue;
                if (match(node, selector)) return wrap(node);
            }

            return null;
        },

        /**
         * Gets all next element siblings of this Element that match the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Elements}
         */
        getAllNext: function (selector) {
            var nodes = new Elements(),
                node = this,
                prop = node.nextElementSibling ? 'nextElementSibling' : 'nextSibling';
            while ((node = node[prop]) !== null) {
                if (node.nodeType !== 1) continue;
                if (match(node, selector)) nodes.push(wrap(node));
            }

            return nodes;
        },

        /**
         * Gets the first child element of this Element that matches the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Element} The first child element or null if none matched
         */
        getFirst: function (selector) {
            var nodes = this.children,
                node;

            for (var i=0, l=nodes.length; i<l; i++) {
                node = nodes[i];
                if (match(node, selector)) return wrap(node);
            }

            return null;
        },

        /**
         * Gets the last child element of this Element that matches the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Element} The last child element or null if none matched
         */
        getLast: function (selector) {
            var nodes = this.children,
                node,
                i = nodes.length;

            while (i--) {
                node = nodes[i];
                if (match(node, selector)) return wrap(node);
            }

            return null;
        },

        /**
         * Gets the first parent element of this Element that matches the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Element} The first parent element or null if none matched
         */
        getParent: function (selector) {
            var node = this;
            while ((node = node.parentNode) !== null) {
                if (node === document) break;
                if (match(node, selector)) return wrap(node);
            }
            return null;
        },

        /**
         * Gets all the parent elements of this Element that match the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Elements} The parent elements that match
         */
        getParents: function (selector) {
            var parents = new Elements(),
                node = this;
            while ((node = node.parentNode) !== null) {
                if (node === document) break;
                if (match(node, selector)) parents.push(wrap(node));
            }
            return parents;
        },

        /**
         * Gets all the sibling elements of this Element that match the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Elements} The sibling elements that match
         */
        getSiblings: function (selector) {
            return this.getAllNext(selector).combine(this.getAllPrevious(selector));
        },

        /**
         * Gets all the child elements of this Element that match the selector provided
         *
         * @param {String} [selector] The selector to match
         * @returns {Elements} The child elements that match
         */
        getChildren: function (selector) {
            var children = this.children,
                nodes = new Elements(),
                i = children.length;

            while (i--) {
                if (match(children[i], selector)) nodes.push(wrap(children[i]));
            }

            return nodes.reverse();
        },

        /**
         * Gets the element with the specified id found inside this Element
         *
         * @param {String} id The ID of the Element to find
         * @returns {Element} The element with the specified id or null if none matched
         */
        getElementById: function (id) {
            return wrap(search('#' + id, this)[0]);
        },

        /**
         * Tests this element to see if it matches the seletcor provided
         *
         * @param {String|Element} selector The selector or element to compare against
         * @returns {boolean} True if selector isn't provided, or matches this element, otherwise false
         */
        match: function (selector) {
            return match(this, selector);
        }
    });

    // Expose Sickle
    if (typeof define === 'function' && define.amd) {
        define('Sickle', [], function() { return Sickle; });
    } else {
        window.Sickle = Sickle;
    }

})(window, document);
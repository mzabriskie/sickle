/**
 * Sickle allows developers using MooTools to swap out Slick for Sizzle with no API changes.
 *
 * Copyright (c) 2013 by Matt Zabriskie
 * Released under the MIT license
 *
 * Special thanks to Christoph Pojer for his Gist (https://gist.github.com/cpojer/361474),
 * which made covering all the entry points much easier.
 */
;(function (document) {
    'use strict';

    function wrap(el) {
        if (el && !el.$family && el.tagName != 'OBJECT' && el.tagName != 'EMBED') {
            var fireEvent = el.fireEvent;
            // wrapping needed in IE7, or else crash
            el._fireEvent = function(type, event){
                return fireEvent(type, event);
            };
            Object.append(el, Element.Prototype);
        }
        return el;
    }

    function match(el, selector) {
        return !selector || Sizzle.matchesSelector(el, scrub(selector));
    }

    var RX_ATTR = /\[(.*?)=([^'"].*?[^'"])\]/g;
    function scrub(expression) {
        return expression ? expression.replace(RX_ATTR, '[$1="$2"]') : expression;
    }

    Window.implement({
        $: function (selector) {
            var el = selector;

            switch(typeOf(selector)) {
                case 'string':
                    el = document.getElementById(selector);
                    break;

                case 'object':
                    el = selector.toElement ? selector.toElement() : null;
                    break;
            }

            return wrap(el);
        },

        $$: function (selector) {
            return new Elements(Sizzle(scrub(selector), document));
        }
    });

    Array.forEach([Element, Document], function (clss) {
        clss.implement({
            getElement: function (expression) {
                return wrap(Sizzle(scrub(expression), this)[0]);
            },

            getElements: function (expression) {
                return new Elements(Sizzle(scrub(expression), this));
            }
        });
    });

    Element.implement({
        getPrevious: function (selector) {
            var node = this;
            while (node = node.previousSibling) {
                if (node.nodeType !== 1) continue;
                if (match(node, selector)) return wrap(node);
            }

            return null;
        },

        getAllPrevious: function (selector) {
            var nodes = [],
                node = this;
            while (node = node.previousSibling) {
                if (node.nodeType !== 1) continue;
                if (match(node, selector)) nodes.push(wrap(node));
            }

            return nodes;
        },

        getNext: function (selector) {
            var node = this;
            while (node = node.nextSibling) {
                if (node.nodeType !== 1) continue;
                if (match(node, selector)) return wrap(node);
            }

            return null;
        },

        getAllNext: function (selector) {
            var nodes = [],
                node = this;
            while (node = node.nextSibling) {
                if (node.nodeType !== 1) continue;
                if (match(node, selector)) nodes.push(wrap(node));
            }

            return nodes;
        },

        getFirst: function (selector) {
            var nodes = this.children,
                node;

            for (var i=0, l=nodes.length; i<l; i++) {
                node = nodes[i];
                if (match(node, selector)) return wrap(node);
            }

            return null;
        },

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

        getParent: function (selector) {
            var node = this;
            while (node = node.parentNode) {
                if (node === document) break;
                if (match(node, selector)) return wrap(node);
            }
            return null;
        },

        getParents: function (selector) {
            var parents = [],
                node = this;
            while (node = node.parentNode) {
                if (node === document) break;
                if (match(node, selector)) parents.push(wrap(node));
            }
            return parents;
        },

        getSiblings: function (selector) {
            return this.getAllNext(selector).combine(this.getAllPrevious(selector));
        },

        getChildren: function (selector) {
            var children = this.children,
                nodes = [],
                i = children.length;

            while (i--) {
                if (match(children[i], selector)) nodes.push(wrap(children[i]));
            }

            return nodes.reverse();
        },

        getElementById: function (id) {
            return wrap(Sizzle('#' + id, this)[0]);
        },

        match: function (expression) {
            return match(this, expression);
        }
    });

})(document);
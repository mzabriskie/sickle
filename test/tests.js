// Dollar functions
QUnit.module('dollar functions');
QUnit.test('$', function (assert) {
    assert.equal(document.id('wrapper'), document.getElementById('wrapper'), '$ and document.getElementById found same element');
    assert.equal(document.id(1), null, 'Using an invalid selector should return null');
    assert.equal(document.id({}), null, 'Object with no toElement method should return null');
    assert.equal(document.id({toElement: function () {return document.id('wrapper');}}), document.id('wrapper'), 'Object with toElement should return the correct element');
});

QUnit.test('$$', function (assert) {
    var result = $$('#qunit-fixture table tbody tr td a[href*=google]');
    assert.equal(result.length, 1, '$$ should find a single element');
    assert.equal(result[0], document.getElementById('link-google'), '$$ should find the correct element');

    result = $$('#qunit-fixture a[href]');
    assert.equal(result.length, 3, '$$ should find all matching elements');
    assert.equal(result[0], document.getElementById('link-google'), '$$ should find the correct element');
    assert.equal(result[1], document.getElementById('link-yahoo'), '$$ should find the correct element');
    assert.equal(result[2], document.getElementById('link-bing'), '$$ should find the correct element');

    result = $$([document.getElementById('link-google'), document.getElementById('link-yahoo'), document.getElementById('link-bing')]);
    assert.equal(result.length, 3, '$$ should find all matching elements');
    assert.equal(result[0], document.getElementById('link-google'), '$$ should find the correct element');
    assert.equal(result[1], document.getElementById('link-yahoo'), '$$ should find the correct element');
    assert.equal(result[2], document.getElementById('link-bing'), '$$ should find the correct element');

    result = $$(document.getElementById('link-google'), document.getElementById('link-yahoo'), document.getElementById('link-bing'));
    assert.equal(result.length, 3, '$$ should find all matching elements');
    assert.equal(result[0], document.getElementById('link-google'), '$$ should find the correct element');
    assert.equal(result[1], document.getElementById('link-yahoo'), '$$ should find the correct element');
    assert.equal(result[2], document.getElementById('link-bing'), '$$ should find the correct element');

    result = document.getElementById('table').getElements('a');
    assert.equal(result.length, 3, 'Did not find all expected elements');
    assert.equal(typeOf(result), 'elements', 'getElements should return elements');
    assert.equal($$(result).length, 3, 'Using elements as selector for $$ should return elements');

    result = document.getElementsByTagName('td');
    assert.equal(result.length, 6, 'Did not find all expected elements');
    assert.equal(typeOf(result), 'collection', 'getElementsByTagName should return collection');
    assert.equal($$(result).length, 6, 'Using collection as selector for $$ should return elements');
});

// Document prototype
QUnit.module('document prototype');
QUnit.test('getElement', function (assert) {
    assert.equal(document.getElement('table[id=table]'), document.getElementById('table'), 'document.getElement should find the correct element');
    assert.equal(document.getElementById('qunit-fixture').getElement('table[id=table]'), document.getElementById('table'), 'element.getElement should find the correct element');
    assert.strictEqual(document.getElement('abc'), null, 'document.getElement should return null when a match is not found');
});

QUnit.test('getElements', function (assert) {
    var result = document.getElements('ul[data-test=abc] li');
    assert.equal(result.length, 7, 'document.getElements should find all matching elements');
    assert.equal(result[0], document.getElementById('item-a'), 'document.getElements should find the correct element');
    assert.equal(result[1], document.getElementById('item-b'), 'document.getElements should find the correct element');
    assert.equal(result[2], document.getElementById('item-c'), 'document.getElements should find the correct element');
    assert.equal(result[3], document.getElementById('item-d'), 'document.getElements should find the correct element');
    assert.equal(result[4], document.getElementById('item-e'), 'document.getElements should find the correct element');
    assert.equal(result[5], document.getElementById('item-f'), 'document.getElements should find the correct element');
    assert.equal(result[6], document.getElementById('item-g'), 'document.getElements should find the correct element');

    result = document.getElementById('qunit-fixture').getElements('ul[data-test=abc] li');
    assert.equal(result.length, 7, 'document.getElements should find all matching elements');
    assert.equal(result[0], document.getElementById('item-a'), 'element.getElements should find the correct element');
    assert.equal(result[1], document.getElementById('item-b'), 'element.getElements should find the correct element');
    assert.equal(result[2], document.getElementById('item-c'), 'element.getElements should find the correct element');
    assert.equal(result[3], document.getElementById('item-d'), 'element.getElements should find the correct element');
    assert.equal(result[4], document.getElementById('item-e'), 'element.getElements should find the correct element');
    assert.equal(result[5], document.getElementById('item-f'), 'element.getElements should find the correct element');
    assert.equal(result[6], document.getElementById('item-g'), 'element.getElements should find the correct element');
});

// Element prototype
QUnit.module('element prototype');
QUnit.test('getPrevious', function (assert) {
    assert.equal(document.getElementById('item-d').getPrevious('li'), document.getElementById('item-c'), 'element.getPrevious should find the correct element');
});

QUnit.test('getAllPrevious', function (assert) {
    var result = document.getElementById('item-d').getAllPrevious('li');
    assert.equal(result.length, 3, 'element.getAllPrevious should find all matching elements');
    assert.equal(result[0], document.getElementById('item-c'), 'element.getAllPrevious should find the correct element');
    assert.equal(result[1], document.getElementById('item-b'), 'element.getAllPrevious should find the correct element');
    assert.equal(result[2], document.getElementById('item-a'), 'element.getAllPrevious should find the correct element');
});

QUnit.test('getNext', function (assert) {
    assert.equal(document.getElementById('item-d').getNext('li'), document.getElementById('item-e'), 'element.getNext should find the correct element');
});

QUnit.test('getAllNext', function (assert) {
    var result = document.getElementById('item-d').getAllNext('li');
    assert.equal(result.length, 3, 'element.getAllNext should find all matching elements');
    assert.equal(result[0], document.getElementById('item-e'), 'element.getAllNext should find the correct element');
    assert.equal(result[1], document.getElementById('item-f'), 'element.getAllNext should find the correct element');
    assert.equal(result[2], document.getElementById('item-g'), 'element.getAllNext should find the correct element');
});

QUnit.test('getFirst', function (assert) {
    assert.equal(document.getElementById('list').getFirst('li'), document.getElementById('item-a'), 'element.getFirst should find the correct element');
});

QUnit.test('getLast', function (assert) {
    assert.equal(document.getElementById('list').getLast('li'), document.getElementById('item-g'), 'element.getLast should find the correct element');
});

QUnit.test('getParent', function (assert) {
    assert.equal(document.getElementById('list').getFirst('li').getParent('body'), document.body, 'element.getParent should find the correct element');
});

QUnit.test('getParents', function (assert) {
    var result = document.getElementById('list').getFirst('li').getParents();
    assert.equal(result.length, 5, 'element.getParents should find all matching elements');
    assert.equal(result[0], document.getElementById('list'), 'element.getParents should find the correct element');
    assert.equal(result[1], document.getElementById('content'), 'element.getParents should find the correct element');
    assert.equal(result[2], document.getElementById('qunit-fixture'), 'element.getParents should find the correct element');
    assert.equal(result[3], document.body, 'element.getParents should find the correct element');
    assert.equal(result[4], document.html, 'element.getParents should find the correct element');
});

QUnit.test('getSiblings', function (assert) {
    var result = document.getElementById('item-d').getSiblings('li');
    assert.equal(result.length, 6, 'element.getSiblings should find all matching elements');
    assert.equal(result[0], document.getElementById('item-e'), 'element.getSiblings should find the correct element');
    assert.equal(result[1], document.getElementById('item-f'), 'element.getSiblings should find the correct element');
    assert.equal(result[2], document.getElementById('item-g'), 'element.getSiblings should find the correct element');
    assert.equal(result[3], document.getElementById('item-c'), 'element.getSiblings should find the correct element');
    assert.equal(result[4], document.getElementById('item-b'), 'element.getSiblings should find the correct element');
    assert.equal(result[5], document.getElementById('item-a'), 'element.getSiblings should find the correct element');
});

QUnit.test('getChildren', function (assert) {
    var result = document.getElementById('list').getChildren('li');
    assert.equal(result.length, 7, 'element.getChildren should find all matching elements');
    assert.equal(result[0], document.getElementById('item-a'), 'element.getChildren should find the correct element');
    assert.equal(result[1], document.getElementById('item-b'), 'element.getChildren should find the correct element');
    assert.equal(result[2], document.getElementById('item-c'), 'element.getChildren should find the correct element');
    assert.equal(result[3], document.getElementById('item-d'), 'element.getChildren should find the correct element');
    assert.equal(result[4], document.getElementById('item-e'), 'element.getChildren should find the correct element');
    assert.equal(result[5], document.getElementById('item-f'), 'element.getChildren should find the correct element');
    assert.equal(result[6], document.getElementById('item-g'), 'element.getChildren should find the correct element');
});

QUnit.test('getElementById', function (assert) {
    assert.equal(document.getElementById('wrapper').getElementById('bar'), document.getElementById('bar'), 'element.getElementById should find the correct element');
    assert.strictEqual(document.getElementById('wrapper').getElementById('abc'), null, 'element.getElementById should return null when a match is not found');
});

QUnit.test('match', function (assert) {
    assert.ok(document.getElementById('list').match('[data-test]'), 'element.match should be okay');
});

// Issue verification
QUnit.module('issue verification');
QUnit.test('$$ with element selector', function (assert) {
    var error = false,
        result;
    try {
        result = $$(document.getElementById('wrapper'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using an element selector should not throw an error');
    assert.equal(result.length, 1, 'Using an element selector should return the element');
    assert.equal(result[0], document.getElementById('wrapper'), 'Using an element selector should return the element');
});

QUnit.test('getElement with element selector', function (assert) {
    var error = false,
        result;
    try {
        result = document.getElementById('content').getElement(document.getElementById('wrapper'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using a child element as a selector should not throw an error');
    assert.equal(result, document.getElementById('wrapper'), 'Using a child element as a selector should return the element');

    error = false;
    try {
        result = document.getElementById('wrapper').getElement(document.getElementById('list'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using a sibling element as a selector should not throw an error');
    assert.equal(result, null, 'Using a sibling element as a selector should return null');
});

QUnit.test('getElements with element selector', function (assert) {
    var error = false,
        result;
    try {
        result = document.getElementById('content').getElements(document.getElementById('wrapper'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using a child element as a selector should not throw an error');
    assert.equal(result.length, 1, 'Using a child element as a selector should return the element');
    assert.equal(result[0], document.getElementById('wrapper'), 'Using a child element as a selector should return the element');

    error = false;
    try {
        result = document.getElementById('wrapper').getElements(document.getElementById('list'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using a sibling element as a selector should not throw an error');
    assert.equal(result.length, 0, 'Using a sibling element as a selector should return an empty array');
});

QUnit.test('match with element selector', function (assert) {
    var error = false,
        result;
    try {
        result = document.getElementById('wrapper').match(document.getElementById('wrapper'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using an element as a selector should not throw an error');
    assert.ok(result, 'Using an element as a selector should match itself');

    error = false;
    try {
        result = document.getElementById('wrapper').match(document.getElementById('content'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using an element as a selector should not throw an error');
    assert.equal(result, false, 'Using an element as a selector should no match another element');
});

QUnit.test('syntax errors', function (assert) {
    var error = false,
        result;
    try {
        result = document.getElementById('content').getElement('#' + document.getElementById('wrapper'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using an invalid selector for getElement should not throw an error');
    assert.equal(result, null, 'Using an invalid selector for getElement should return null');

    error = false;
    try {
        result = document.getElementById('content').getElements('#' + document.getElementById('wrapper'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using an invalid selector for getElements should not throw an error');
    assert.equal(result.length, 0, 'Using an invalid selector for getElements should return an empty array');

    error = false;
    try {
        result = document.getElementById('content').match('#' + document.getElementById('content'));
    } catch (e) {
        error = true;
    }
    assert.equal(error, false, 'Using an invalid selector for match should not throw an error');
    assert.equal(result, false, 'Using an invalid selector for match should return false');
});

QUnit.test('attribute selectors', function (assert) {
    assert.equal(document.getElement('[data-year=2013]'), document.getElementById('calendar-year'), 'document.getElement should find the correct element');
    assert.equal(document.getElement('[data-year=2013] [data-month=1]'), document.getElementById('calendar-month'), 'document.getElement should find the correct element');
    assert.equal(document.getElement('[data-year=2013] [data-month=1] [data-day=1]'), document.getElementById('calendar-day'), 'document.getElement should find the correct element');
    assert.equal(document.getElement('[data-year=2013] [data-month=1] [data-day=1] span.label'), document.getElementById('calendar-label'), 'document.getElement should find the correct element');
    assert.equal(document.getElement('[id=calendar-year][data-year=2013]'), document.getElementById('calendar-year'), 'document.getElement should find the correct element');
    assert.equal(document.getElement('[href=http://www.google.com]'), document.getElementById('link-google'), 'document.getElement should find the correct element');
});
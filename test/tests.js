// Dollar functions
QUnit.module('dollar functions');
QUnit.test('$', function (assert) {
    assert.equal($('wrapper'), document.getElementById('wrapper'), '$ and document.getElementById found same element');
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
});

// Document prototype
QUnit.module('document prototype');
QUnit.test('getElement', function (assert) {
    assert.equal(document.getElement('table[id=table]'), document.getElementById('table'), 'document.getElement should find the correct element');
    assert.equal(document.getElementById('qunit-fixture').getElement('table[id=table]'), document.getElementById('table'), 'element.getElement should find the correct element');
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
});

QUnit.test('match', function (assert) {
    assert.ok(document.getElementById('list').match('[data-test]'), 'element.match should be okay');
});
'use strict';

describe('model: TreeItem', function () {

    // load the controller's module
    beforeEach(module('testApp'));
    var treeItem;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (TreeItem) {
        treeItem = TreeItem;
    }));

    describe("Array object extends", function() {
        it('Array object should have method toTree()', function () {
            expect(typeof([].toTree) === "function").toBe(true);
        });

        it('toTree() should convert objects to TreeItem', function () {
            var _arr =[{name: 'root', nodes: [{name: 'child', nodes:[]}]}];
            _arr.toTree();

            expect(_arr[0] instanceof treeItem).toBe(true);
            expect(_arr[0].nodes[0] instanceof treeItem).toBe(true);
        });

        it('Array object should have method toTree()', function () {
            expect(typeof([].toNoCycleJSON) === "function").toBe(true);
        });

        it('toNoCycleJSON() should convert toJSON without error', function () {
            var _item = {name: 'root'};
            _item.__parent = _item;
            var _arr = [_item];

            expect(JSON.parse(_arr.toNoCycleJSON())[0].name).toBe('root');
        });
    });

    describe("TreeItem methods", function() {
        it('should have method .toggle()', function () {
            expect(typeof(treeItem.prototype.toggle) === "function").toBe(true);
        });

        it('.toggle() should toggle show property', function () {
            var _item = new treeItem({name: 'root'});
            expect(_item.show).toBe(true);

            _item.toggle();
            expect(_item.show).toBe(false);
        });

        it('should have method .getPadding()', function () {
            expect(typeof(treeItem.prototype.getPadding) === "function").toBe(true);
        });

        it('.getPadding() should depend on __depth ', function () {
            var _item = new treeItem({name: 'root'});
            var _numb = _item.getPadding();

            expect(_item.getPadding()).toBe(_numb);

            _item.__depth += 1;
            expect(_item.getPadding()).toBeGreaterThan(_numb);
        });

        it('should have method .addChild()', function () {
            expect(typeof(treeItem.prototype.addChild) === "function").toBe(true);
        });

        it('.addChild() should add child', function () {
            var _item = new treeItem({name: 'root'});

            expect(_item.nodes.length).toBe(0);

            _item.addChild();
            _item.addChild();
            _item.addChild();

            expect(_item.nodes.length).toBe(3);
            expect(_item.nodes[0].__parent).toEqual(_item);
        });

        it('should have method .remove()', function () {
            var _item = new treeItem({name: 'root'});

            _item.addChild();
            _item.addChild();
            _item.addChild();

            expect(_item.nodes.length).toBe(3);

            _item.nodes[0].remove();
            _item.nodes[0].remove();


            expect(_item.nodes.length).toBe(1);
        });

    });
});

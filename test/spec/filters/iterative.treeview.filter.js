'use strict';

describe('filter: toArray', function () {

    // load the controller's module
    beforeEach(module('testApp'));
    var $filter,
        treeItem,
        _times = function(number, callback){
            var times = number;
            for(var i=0; i < times; i++){
                callback(i);
            }
        };
    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$filter_, TreeItem) {
        $filter = _$filter_('toArray');
        treeItem = TreeItem;
    }));

    describe("toArray filter Test", function() {
        it('should have convert tree object to flat array', function () {
            var _tree = [];
            _times(5, function(i){
                var _parent = new treeItem({name: 'parent ' + i});
                _times(5, function(j){
                    _parent.nodes.push(new treeItem({name: 'child ' + j, __parent: _parent}));
                });
                _tree.push(_parent);
            });

            var _arr = $filter(_tree);

            expect(_tree.length).toBe(5);
            expect(_tree[0].nodes.length).toBe(5);
            expect(_arr.length).toBe(30);
        });

        it('flat array should have tree like item ordering', function () {
            var _tree = [];
            _times(5, function(i){
                var _parent = new treeItem({name: 'parent ' + i});
                _times(5, function(j){
                    _parent.nodes.push(new treeItem({name: 'child ' + j, __parent: _parent}));
                });
                _tree.push(_parent);
            });

            var _arr = $filter(_tree);

            expect(_arr.length).toBe(30);
            expect(_arr[5].__parent).toEqual(_arr[0]);
            expect(_arr[11].__parent).toEqual(_arr[6]);
            expect(_arr[17].__parent).toEqual(_arr[12]);
            expect(_arr[23].__parent).toEqual(_arr[18]);
            expect(_arr[29].__parent).toEqual(_arr[24]);
        });
    });
});

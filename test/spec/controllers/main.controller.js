'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('testApp'));

  var MainCtrl,
    scope,
    _window,
    treeItem;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $window, TreeItem) {
    scope = $rootScope.$new();
    treeItem = TreeItem;
    _window = $window;

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $window: $window,
      TreeItem: TreeItem
    });
  }));

  describe("addParent() Test", function() {
    it('should have "addParent" method', function () {
      expect(typeof(scope.addParent) === "function").toBe(true);
    });

    it('"addParent" method should add TreeItem to array', function () {
      var _arr = [];
      scope.addParent(_arr);

      expect(_arr.length).toBe(1);
      expect(_arr[0] instanceof treeItem).toBe(true);
    });
  });

  describe("removeItem() Test", function() {
    it('should have "removeItem" method', function () {
      expect(typeof(scope.removeItem) === "function").toBe(true);
    });


    it('"removeItem" method should remove TreeItem from model', function () {
      var _root = new treeItem({name: 'Root'});
      var _child = new treeItem({name: 'Child', __parent: _root});

      _root.nodes.push(_child);
      expect(_root.nodes.length).toBe(1);

      scope.removeItem(_child);
      expect(_root.nodes.length).toBe(0);
    });

    it('"removeItem" method should remove TreeItem from tree obj', function () {
      scope.addParent(scope.tree);
      expect(scope.tree.length).toBe(1);

      scope.removeItem(scope.tree[0]);
      expect(scope.tree.length).toBe(0);
    });

    it('"removeItem" method should cleanup params obj', function () {
      scope.params.name = 'test';
      scope.addParent(scope.tree);
      scope.removeItem(scope.tree[0]);

      expect(scope.params.name).toBe(undefined);
    });
  });
});

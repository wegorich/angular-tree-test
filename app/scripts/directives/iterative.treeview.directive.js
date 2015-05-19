'use strict';

/**
 * @ngdoc function
 * @name testApp.directives:treePicker
 * @description
 * # treePicker
 * TreePicker control
 */

angular.module('testApp').filter('toArray', function() {
    return function(newData){

        var _items = [];
        if (!newData) return _items;

        var _stack = newData;
        while (_stack.length != 0) {
            var _arr = [];
            _stack.forEach(function(i){
                if (i.nodes.length){
                    _arr = _arr.concat(i.nodes);
                }
                if (!i.__parent)
                    _items.push(i);
                else
                    _items.splice(_items.indexOf(i.__parent) + 1, 0, i);
            });

            _stack = _arr;
        }

        return _items;
    };
    }).directive('iterativeTreeview', function() {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                ngTree: '=',
                ngModel: '='
            },
            controller: function($scope) {
                $scope.select = function(data) {
                    $scope.ngModel = data;
                };
            },
            templateUrl: 'views/directives/iterative.treeview.html'
        };
    });



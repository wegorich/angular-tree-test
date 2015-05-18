'use strict';

/**
 * @ngdoc function
 * @name testApp.directives:treePicker
 * @description
 * # treePicker
 * TreePicker control
 */

angular.module('testApp')
    .directive('recursiveTreeview', function() {
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
            templateUrl: 'views/directives/recursive.treeview.html'
        };
    });



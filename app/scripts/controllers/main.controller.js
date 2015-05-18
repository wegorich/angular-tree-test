'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('MainCtrl', function ($scope, $window, TreeItem) {
      $scope.params = {};
      $scope.tree = (localStorage.tree && JSON.parse(localStorage.tree) || []).toTree();

        $window.addEventListener('beforeunload', function() {
          localStorage.setItem("tree", $scope.tree.toNoCycleJSON());
      });

      $scope.addParent = function(arr){
          arr.push(new TreeItem({name: 'Parent ' + (arr.length + 1)}));
      };

      $scope.removeItem = function(model){
          model.remove($scope.tree);
          $scope.params = {};
      };
  });

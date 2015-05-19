'use strict';

angular.module('testApp').factory('TreeItem', function() {
    // instantiate our initial object
    function TreeItem(obj) {
        this.name = obj.name;
        this.__depth = 0;
        this.nodes = [];
        this.show = true;

        if (obj.__parent instanceof TreeItem){
            this.name = (this.name || obj.__parent.name) + ' ' + (obj.__parent.nodes.length + 1);
            this.__depth = obj.__parent.__depth + 1;
            delete obj.name;
        }

        for (var prop in obj) this[prop] = obj[prop];
    }

    TreeItem.prototype.toggle = function(){
        this.show = this.show !== true;
    };

    TreeItem.prototype.getPadding = function(){
      return (this.nodes.length ? 10 : 33)  + this.__depth * 40;
    };

    TreeItem.prototype.addChild = function(){
        this.nodes.push(new TreeItem({name: 'Child', __parent: this}));
    };

    TreeItem.prototype.remove = function(arr){
        arr = this.__parent && this.__parent.nodes || arr;
        if (this.__parent || Array.isArray(arr)){
            var _index = arr.indexOf(this);
            if (_index > -1){
                arr.splice(_index, 1);
            }
        }
    };

    Array.prototype.toTree = function(){
        var _stack = this;
        var _parents = [];
        while (_stack.length != 0) {
            var _arr = [];
            _stack.forEach(function(i){
                if (i.nodes.length){
                    _arr = _arr.concat(i.nodes);
                }
                _parents.forEach(function(j){
                    if (j.nodes.indexOf(i) > -1)
                    {
                        i.__parent = j;
                    }
                });
                i.__proto__ = TreeItem.prototype;
            });
            _parents = _stack;
            _stack = _arr;
        }
        return this;
    };

    Array.prototype.toNoCycleJSON = function(){
        var _cache = [];
        return JSON.stringify(this, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (_cache.indexOf(value) !== -1) {
                    return;
                }
                _cache.push(value);
            }
            return value;
        });
    };

    return TreeItem;
});
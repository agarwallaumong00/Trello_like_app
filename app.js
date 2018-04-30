(function() {
    'use strict';

    var myApp = angular.module('noBroker', ['ngMaterial']);

    myApp.controller('noBrokerController', ['$scope', '$timeout', function($scope, $timeout) {
        var vm = $scope;

        vm.contentText = [];
        vm.showAddBox = [];

        vm.cardArr = [
            {
                "title": "To Do",
                "content": []
            },
            {
                "title": "In Progress",
                "content": []
            },
            {
                "title": "Done",
                "content": []
            }
        ];

        vm.addCard = function(index) {
            vm.showAddBox[index] = true;
        }

        vm.addNewCard = function(index, text) {
            vm.cardArr[index].content.push(text);
            vm.contentText[index] = "";
            vm.showAddBox[index] = false;
            $timeout(function() {
                var doc = document.getElementsByClassName("content-div")[index];
                doc.scrollTo(0, doc.scrollHeight);
            }, 10);
        }

        vm.cancel = function(index) {
            vm.showAddBox[index] = false;
        }

        vm.removeCard = function(parentIndex, index) {
            vm.cardArr[parentIndex].content.splice(index, 1);
        }

        vm.getId = function(parentIndex, index) {
            return parentIndex.toString() + index.toString();
        }

        var source = null;

        window.dragStarted = function(ev) {
            source = ev.target;
            ev.dataTransfer.setData("text/plain", ev.target.innerHTML);
            ev.dataTransfer.effectAllowed = "move";
        }

        window.dragOver = function(ev) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'move';
        }

        window.drop = function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var sourceId = source.id;
            var evId = ev.target.id;
            if(evId) {
                if(sourceId[0] === evId[0]) {
                    var temp = vm.cardArr[sourceId[0]].content[sourceId[1]];
                    vm.cardArr[sourceId[0]].content[sourceId[1]] = vm.cardArr[evId[0]].content[evId[1]];
                    vm.cardArr[evId[0]].content[evId[1]] = temp;
                } else if(sourceId[0] !== evId[0]) {
                    vm.cardArr[evId[0]].content.push(vm.cardArr[sourceId[0]].content[sourceId[1]]);
                    vm.cardArr[sourceId[0]].content.splice(sourceId[1], 1);
                }
                vm.$apply();
            }
        }

    }])
})()
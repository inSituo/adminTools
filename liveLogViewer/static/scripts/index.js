'use strict';

var socket = io();

var app = angular.module('LiveLogViewer', []);

app.controller('entriesCtrl', function($scope) {
    $scope.entries = [];
    $scope.maxEntries = 25;
    $scope.levels = [{
        level: "DBG",
        show: true,
    }, {
        level: "INF",
        show: true,
    }, {
        level: "CAL",
        show: true,
    }, {
        level: "ACT",
        show: true,
    }, {
        level: "WRN",
        show: true,
    }, {
        level: "ERR",
        show: true,
    }, ]
    $scope.lvlflt = function(entry) {
        for (var i = 0; i < $scope.levels.length; i++) {
            if ($scope.levels[i].level === entry.level)
                return $scope.levels[i].show;
        }
        return false;
    }
    $scope.updateMaxEntries = function() {
        var n = $scope.maxEntries;
        if ($scope.entries.length > n) {
            $scope.entries.length = n;
        }
    }
    socket.on('entry', function(entry) {
        if ($scope.lvlflt(entry)) {
            $scope.$apply(function() {
                $scope.entries.unshift(entry);
                if ($scope.entries.length > $scope.maxEntries) {
                    $scope.entries.pop();
                }
            });
        }
    });
})

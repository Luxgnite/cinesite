'use strict';

var cinema = angular.module("cinema", []);
cinema.directive("datePicker", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            $(element).datepicker({dateFormat: "D dd-M-yy",
                onSelect: function (date) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(date);
                    });
                }
            });
        }
    }
});

.directive("previewImage", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            $(element).datepicker({dateFormat: "D dd-M-yy",
                onSelect: function (date) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(date);
                    });
                }
            });
        }
    }
});

cinema.controller("formController", function ($scope) {

    var previewPic = function () {

    }
});

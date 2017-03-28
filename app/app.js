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
    };
});

cinema.directive('previewImage', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
            console.log(element);
            var listener = function() {
                var reader = new FileReader();
                var file = this.files[0];

                reader.addEventListener("load", function(){
                    console.log(file);
                    scope.$apply(function () {
                        ctrl.$setViewValue(url);
                    });
                });

                var url = reader.readAsArrayBuffer(file).result;
            };
            element.bind('change', listener);
        }
    };
});

cinema.controller("formController", function ($scope) {

    var previewPic = function () {

    };
});

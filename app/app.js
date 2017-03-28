'use strict';

var map;

function init () {
    localStorage.setItem("Movie", JSON.stringify([]));
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

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
            var listener = function() {
                var reader = new FileReader();
                reader.readAsDataURL(this.files[0]);
                reader.onloadend = function (e){
                    ctrl.$setViewValue(e.target.result);
                };
            };
            element.bind('change', listener);
        }
    };
});

cinema.controller("formController", function ($scope) {

    $scope.submit = function () {
        var movie = {
            title: $scope.title,
            realisator: $scope.realisator,
            duration: $scope.duration,
            genre: $scope.genre,
            date: $scope.date,
            file: $scope.file
        };
        var listMovies = JSON.parse(localStorage.getItem("Movie"));
        listMovies.push(movie);
        localStorage.setItem("Movie", JSON.stringify(listMovies));
    };
});

cinema.controller("searchController", function($scope) {
    $scope.keyword = "";
    $scope.search = function(){
        var movies = JSON.parse(localStorage.getItem("Movie"));
        var result = [];
        var html = "";
        for (let movie of movies)
        {
            if(movie.title === $scope.keyword || movie.realisator === $scope.keyword)
            {
                result.push(movie);
                html = "<img src='"+movie.file+"'/>";
            }

        }
        console.log(html);
        var searchResult = $("#search-result");
        searchResult.removeClass("hidden");
        searchResult.addClass("shown");

        searchResult.append(html);
    };
});

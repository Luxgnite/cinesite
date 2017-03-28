'use strict';

var map;

$(document).ready(function () {
    var movies = [
        {
          title: "Ce poisson, la vie et moi",
            realisator: "Moi",
            duration: "59:59",
            genre: "Mystère, Horreur, Romance",
            synopsis: "Glou glou. Argh, je suis mort.",
            date: "11-12-2013",
            file: "http://vignette2.wikia.nocookie.net/animalcrossing/images/f/fb/Vache-clairemedium.png/revision/latest?cb=20151220120443&path-prefix=fr"
        },

        {
            title: "Ce poisson, la vie et moi",
            realisator: "Moi",
            duration: "59:59",
            genre: "Mystère, Horreur, Romance",
            synopsis: "Glou glou. Argh, je suis mort.",
            date: "11-12-2013",
            file: "https://francaisdefrance.files.wordpress.com/2012/01/grand-moment-de-loose-pour-mathieu-madenian-dans-mot-de-passe_flash_video_background.jpg"
        }
    ];

    localStorage.setItem("Movie", JSON.stringify(movies));
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
});

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
        var searchResult = $("#search-result");

        if($scope.keyword !== "") {
            searchResult.addClass("shown");
            searchResult.removeClass("hidden");
        }
        else
        {
            searchResult.addClass("hidden");
            searchResult.removeClass("shown");
        }


        var movies = JSON.parse(localStorage.getItem("Movie"));
        console.log(movies);
        var result = [];
        var html = "";
        searchResult.empty();
        for (let movie of movies)
        {
            if(movie.title.includes($scope.keyword) && $scope.keyword!=="" || movie.realisator.includes($scope.keyword) && $scope.keyword!=="")
            {
                console.log(movie);
                result.push(movie);
                searchResult.append("<figure class='result'><img src='"+movie.file+"'/>" +
                    "<figcaption>"+movie.title+"</figcaption></figure>");
            }

        }

    };
});

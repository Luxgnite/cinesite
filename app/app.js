'use strict';

var map;

$(document).ready(function () {
    var movies = [
        {
            title: "Ce poisson, la vie et moi",
            realisator: "Toi",
            duration: "59:59",
            genre: "Mystère, Horreur, Romance",
            synopsis: "Glou glou. Argh, je suis mort.",
            date: "11-12-2013",
            file: "http://vignette2.wikia.nocookie.net/animalcrossing/images/f/fb/Vache-clairemedium.png/revision/latest?cb=20151220120443&path-prefix=fr"
        },

        {
            title: "JSP",
            realisator: "Anne Onyme",
            duration: "42:42",
            genre: "Film d'hauteur",
            synopsis: "Hmmmm... Le cerveau chauffe",
            date: "11-12-2013",
            file: "https://francaisdefrance.files.wordpress.com/2012/01/grand-moment-de-loose-pour-mathieu-madenian-dans-mot-de-passe_flash_video_background.jpg"
        },
        {
            title: "Ghost in the Shell",
            realisator: "Rupert Sander",
            duration: "1h47",
            genre: "Science Fiction",
            file: "http://fr.web.img5.acsta.net/c_215_290/pictures/17/03/01/17/45/314818.jpg",
            synopsis: "Dans un futur proche, le Major est unique en son genre: humaine sauvée d’un terrible accident, son corps aux capacités cybernétiques lui permet de lutter contre les plus dangereux criminels. Face à une menace d’un nouveau genre qui permet de pirater et de contrôler les esprits, le Major est la seule à pouvoir la combattre. Alors qu’elle s’apprête à affronter ce nouvel ennemi, elle découvre qu’on lui a menti : sa vie n’a pas été sauvée, on la lui a volée. Rien ne l’arrêtera pour comprendre son passé, trouver les responsables et les empêcher de recommencer avec d’autres. "
        }
]
;

localStorage.setItem("Movie", JSON.stringify(movies));
if (document.getElementById('map') !== null) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
})
;

var cinema = angular.module("cinema", ['ngRoute']);

cinema.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/movie/:mv', {
                templateUrl: 'movie.html',
                controller: 'movieCtrl'
            })
            .when('/addMovie', {
                templateUrl: 'addMovie.html',
                controller: 'addMovieCtrl'
            });
    }
]);

cinema.directive("datePicker", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            $(element).datepicker({
                dateFormat: "D dd-M-yy",
                onSelect: function (date) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(date);
                    });
                }
            });
        }
    };
});


cinema.directive('previewImage', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            var listener = function () {
                var reader = new FileReader();
                reader.readAsDataURL(this.files[0]);
                reader.onloadend = function (e) {
                    ctrl.$setViewValue(e.target.result);
                };
            };
            element.bind('change', listener);
        }
    };
});

cinema.controller("addMovieCtrl", function ($scope) {

    $scope.submit = function () {
        console.log('lol');
        var movie = {
            title: $scope.title,
            realisator: $scope.realisator,
            duration: $scope.duration,
            genre: $scope.genre,
            date: $scope.date,
            file: $scope.file,
            synopsis: $scope.synopsis
        };
        var listMovies = JSON.parse(localStorage.getItem("Movie"));
        listMovies.push(movie);
        localStorage.setItem("Movie", JSON.stringify(listMovies));
        window.location.href = "#movie/" + (listMovies.length - 1);
    };
});

cinema.controller("searchController", function ($scope) {
    $scope.keyword = "";
    $scope.search = function () {
        var searchResult = $("#search-result");

        if ($scope.keyword !== "") {
            searchResult.addClass("shown");
            searchResult.removeClass("hidden");
        }
        else {
            searchResult.addClass("hidden");
            searchResult.removeClass("shown");
        }


        var movies = JSON.parse(localStorage.getItem("Movie"));
        console.log(movies);
        var result = [];
        var html = "";
        searchResult.empty();
        for (var i = 0; i < movies.length; i++) {
            if (movies[i].genre.includes($scope.keyword) && $scope.keyword !== ""
                ||movies[i].title.includes($scope.keyword) && $scope.keyword !== ""
                || movies[i].realisator.includes($scope.keyword) && $scope.keyword !== "") {
                console.log(movies[i]);
                result.push(movies[i]);
                searchResult.append("<figure class='result'><a href='#movie/" + i + "'><img src='" + movies[i].file + "'/></a>" +
                    "<figcaption>" + movies[i].title + "</figcaption></figure>");
            }

        }

    };
});

cinema.controller("movieCtrl", ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.movie = JSON.parse(localStorage.getItem("Movie"))[$routeParams.mv];
    }]);
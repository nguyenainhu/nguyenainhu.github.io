var myApp = angular.module('myApp');

myApp.controller('bookCtrl', ['$scope', '$http', '$location', '$routeParams', '$cookieStore', function($scope, $http, $location, $routeParams, $cookieStore) {
    console.log('bookCtrl loaded...');

    var root = 'https://green-web-bookstore.herokuapp.com';
    $scope.getBooks = function() {
        $http.get(root + '/api/books').success(function(response) {
            $scope.books = response;
            $scope.viewby = 4;
            $scope.totalItems = $scope.books.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 2;
            $scope.pageCount = function() {
                return Math.ceil($scope.books.length / $scope.itemsPerPage);
            };
            $scope.$watch('currentPage + itemsPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;

                $scope.filteredBooks = $scope.books.slice(begin, end);
            });
        });
    }
    $scope.getGenres = function() {
        $http.get(root + '/api/genres').success(function(response) {
            $scope.genres = response;
        });
    }

    $scope.getBook = function() {
        var id = $routeParams.id;
        $http.get(root + '/api/books/' + id).success(function(response) {
            $scope.book = response;
        });
    }

    $scope.addBook = function() {
        console.log($scope.book);
        $http.post(root + '/api/books/', $scope.book).success(function(response) {
            window.location.href = '#/books';
        });
    }

    $scope.updateBook = function() {
        var id = $routeParams.id;
        $http.put(root + '/api/books/' + id, $scope.book).success(function(response) {
            window.location.href = '#/books/' + $routeParams.id;
        });
    }

    $scope.removeBook = function(id) {
        $http.delete(root + '/api/books/' + id).success(function(response) {
            window.location.href = '#/books';
        });
    }
    $scope.bookSearch = function() {
        $scope.text = $routeParams.keyword;
        $http.get(root + '/api/books/search/' + $scope.text).success(function(response) {
            $scope.books = response;
        });
    }
    $scope.submitSearch = function() {
        //window.location = window.location.href;
        $location.url('search/' + $scope.text);
        $scope.text = "";
        //window.location.href = '#/search/' + $scope.text;
        console.log('search/' + $scope.text)
    }
    $scope.getBookByGenre = function() {
        var id = $routeParams.id;
        $http.get(root + '/api/books/genre/' + id).success(function(response) {
            $scope.books = response;
        });
    }
    $scope.getGenres();

    /*Carousel*/
    $scope.getBanner = function() {
        $http.get(root + '/api/banners').success(function(response) {
            $scope.banner = response;
            $scope.myInterval = 3000;
            $scope.active = 0;
            console.log('nhu')
        })
    };

    $scope.users = {
        userName: 'Nguyen Ai Nhu',
        userEmail: 'ainhu8596@gmail.com',
        userSex: 'Nữ',
        userPhone: '0985352687',
        userHome: '90 Thành Thái, P12, Quận 10, TP.HCM',
        userAvatarUrl: 'https://avatars0.githubusercontent.com/u/26504396?v=3&s=460',
        like: [],
    };

    $scope.try = function() {
        $cookieStore.put('nhu', 'dep');
        var value = $cookieStore.get('nhu')
        console.log(value);
        $cookieStore.remove('nhu')
    }

    $scope.loadLogin = function() {
        var token = $cookieStore.get('token');
        if (token !== undefined) {
            $location.url("/")
        }
    }

    $scope.logOut = function() {
        $cookieStore.remove('token');
        $cookieStore.remove('user');
    }

    $scope.viewProfile = function() {
        var token = $cookieStore.get('token');
        if (token === undefined) {
            $location.url("/login")
        }
    }

    $scope.summitLogin = function() {
        $http.post(root + '/api/auth', $scope.loginUser).success(function(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                //Redirect here
                $location.url("/")
            } else {
                //Raise Error
                alert(response.message);
            }
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });;
    }

    $scope.summitSignup = function() {
        $http.post(root + '/api/signup/', $scope.signUpUser).success(function(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                //Redirect here
                $location.url("/")
            } else {
                //Raise Error
                alert(response.message);
            }
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }

    $scope.init = function() {
        $scope.user = $cookieStore.get('user');
        $scope.token = $cookieStore.get('token');
    }

    $scope.isLogged = function() {
            return $cookieStore.get('token') != undefined;
        }
        //Datepicker
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    //


}]);
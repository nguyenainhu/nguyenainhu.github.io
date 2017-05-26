var myApp = angular.module('myApp');

myApp.controller('bookCtrl', ['$scope', '$http', 'bookservice', '$location', '$routeParams', '$cookieStore', function($scope, $http, bookservice, $location, $routeParams, $cookieStore) {
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
            var rateTotal = 0;
            var rateLength = 0;
            for (var i = 0; i < $scope.book.comments.length; i++) {
                if ($scope.book.comments[i].hasOwnProperty('rate')) {
                    rateTotal += $scope.book.comments[i].rate
                    rateLength += 1
                }

            }
            if (rateTotal == 0) {
                $scope.rateAvr = 4
            } else {
                $scope.rateAvr = rateTotal / rateLength;
            }
            $scope.save = Math.round((($scope.book.previousPrice - $scope.book.sellingPrice) / $scope.book.previousPrice) * 100);
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
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
            $scope.genreName = '';
            for (var i = 0; i < $scope.genres.length; i++) {
                if ($scope.genres[i]._id === id) {
                    $scope.genreName = $scope.genres[i].name;
                }
            }
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
        $location.url("/");
    }

    $scope.viewProfile = function() {
        var token = $cookieStore.get('token');
        if (token === undefined) {
            $location.url("/login")
        }
    }

    $scope.summitLogin = function() {
        $http.post(root + '/api/users/auth', $scope.loginUser).success(function(response) {
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
        $http.post(root + '/api/users/signup/', $scope.signUpUser).success(function(response) {
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
    /*--------Cart ---------*/
    $scope.qty = 1;
    $scope.total = 0;

    $scope.sum = function() {
        bookservice.total.totalQty = 0;
        for (var i = 0; i < bookservice.cart.length; i++) {
            $scope.total += bookservice.cart[i].item.sellingPrice * bookservice.cart[i].qty;
            bookservice.total.totalQty += bookservice.cart[i].qty;
        }
        $scope.all = bookservice.total;

    }
    $scope.sum();
    $scope.addCart = function(item) {
        if (bookservice.cart.length > 0) {
            for (var i = 0; i < bookservice.cart.length; i++) {
                if (bookservice.cart[i].item.sku === item.sku) {
                    $scope.addedItem = true;
                    bookservice.cart[i].qty += $scope.qty;
                    bookservice.item[i].qty += $scope.qty;
                }


            }
            if ($scope.addedItem) {
                $scope.addedItem = false;

            } else {
                bookservice.cart.push({ item, qty: 1 });
                bookservice.item.push({ item, qty: 1 });
            }
        } else {
            bookservice.cart.push({ item, qty: $scope.qty });
            bookservice.item.push({ item, qty: $scope.qty });
        }


    }
    $scope.cart = bookservice.cart;
    $scope.removeCart = function(item) {
        console.log(item.qty)

        bookservice.cart.splice(item, 1);
        bookservice.item.splice(item, 1);
        $scope.total = 0;
        $scope.sum();
    }

    /*order user*/
    $scope.order = {};
    $scope.order.books = [];
    $scope.checkout = function() {
        if ($scope.cart.length > 0) {

            $scope.order._user = $scope.user._id;
            $scope.order.books = bookservice.item;
            $scope.order.total = $scope.total;
            // bookservice.bills.push($scope.order);
            console.log($scope.order)

            $http.post(root + '/api/orders', $scope.order).success(function(response) {
                console.log('success');
                bookservice.item = [];
                bookservice.cart.splice(0, bookservice.cart.length);
                $scope.total = 0;
                $location.url("/")
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });



        }
    }

    $scope.changeQty = function(index) {
        bookservice.item[index].qty = bookservice.cart[index].qty;
        $scope.total = 0;
        $scope.sum();
    }
    $scope.bills = bookservice.bills;

    $scope.removeCart = function(item) {
        console.log(item.qty)

        bookservice.cart.splice(item, 1);
        bookservice.item.splice(item, 1);
        $scope.total = 0;
        $scope.sum();

    }

    /*add comment*/

    $scope.addComment = function(post) {
            $scope.comment.userId = $scope.user._id;
            $scope.comment.bookId = post._id;
            $scope.createdDate = Date.now();
            console.log($scope.comment);
            $http.post(root + '/api/books/comment', $scope.comment).success(function(response) {
                window.location.href = '#/books/{{book._id}}';
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });
            console.log(post);
        }
        /*rating*/
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };
    $scope.ratingStates = [
        { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' }
    ];
    /*update users*/
    $scope.updateUsers = function() {
        $scope.updateUser = $scope.user;
        $http.put(root + '/api/users/', $scope.updateUser).success(function(response) {
            $scope.user = response;
            $cookieStore.put('user', response.user);
            $scope.user = $cookieStore.get('user');
            window.location.href = '#/books/';
        });
    }

    /*get order*/
    $scope.getOrder = function() {
            $http.get(root + '/api/orders').success(function(response) {
                $scope.orders = response;

            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });

        }
        /*get order of user*/
    $scope.getUserOder = function() {
        console.log(root + '/api/orders/user/' + $scope.user._id)
        $http.get(root + '/api/orders/user/' + $scope.user._id).success(function(response) {
            $scope.orders = response;
            console.log($scope.orders)

        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }
}]);
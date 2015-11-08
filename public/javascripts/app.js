angular.module('bb', ['ui.router']);

angular.module('bb').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  return $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    templateUrl: 'templates/home.html'
  });
}).run(function($rootScope) {
  return console.log('Everything is fine');
});

angular.module('bb').controller('HomeController', function($scope) {
  return console.log('Welcome home');
});

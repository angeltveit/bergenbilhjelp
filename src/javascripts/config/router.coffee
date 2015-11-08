angular.module 'bb'
  .config ($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise("/")

    $stateProvider
      .state 'home',
        url: '/'
        controller: 'HomeController'
        templateUrl: 'templates/home.html'

  .run ($rootScope) ->
    console.log 'Everything is fine'

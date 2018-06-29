import appRoutes from './app-routes';

export default function routerHelper($stateProvider, $urlRouterProvider) {
    'ngInject';

    //  $locationProvider.html5Mode(true); // setting html5 mode to remove !# from url
    $urlRouterProvider.otherwise('/'); // setting default route

    appRoutes.forEach((route) => {
      $stateProvider.state(route)
    });
}

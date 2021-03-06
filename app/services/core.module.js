import routerHelperService from './router-helper/router-helper.service';
import httpService from './http.service';
import favoritesController from "../components/favorites/favorites.controller";

const coreModule = angular.module('songsCoreModule', [
  'ui.router',
  'ngRoute',
  'ngStorage'
]);

// inject services, config, filters and re-usable code
// which can be shared via all modules
coreModule.config(routerHelperService);
coreModule.service('httpService', httpService);
coreModule.controller('favoritesController', favoritesController);


coreModule.constant('configs', {
    appVersion:'1.0.0',
    apiPath:'https://songs-api-ubiwhere.now.sh/api',
    apiOptions:{
        headers:{},
        cache: false
    },
    dateFormat: 'dd MMM yyyy',
    timeFormat: 'hh:mm:ss',
    listMaxRows: 10
});

export default coreModule;

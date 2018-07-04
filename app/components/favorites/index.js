import favoritesComponent from './favorites.component';

const favoritesModule = angular.module('favorites', []);


// loading components, services specific to this module.
favoritesModule
  .component('favorites', favoritesComponent);


// export this module
export default favoritesModule;

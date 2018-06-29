import songDetailsService from './song-details.service';
import songDetailsComponent from './song-details.component';

const songDetailsModule = angular.module('songDetails', []);


// loading components, services specific to this module.
songDetailsModule
  .service('SongDetailsService', songDetailsService)
  .component('songDetails', songDetailsComponent);


// export this module
export default songDetailsModule;

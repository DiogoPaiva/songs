import songListService from './song-list.service';
import songListComponent from './song-list.component';

const songListModule = angular.module('songList', []);


// loading components, services specific to this module.
songListModule
  .service('SongListService', songListService)
  .component('songList', songListComponent);


// export this module
export default songListModule;

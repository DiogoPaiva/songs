
export default class {

  constructor($log, $q, SongListService, $location ) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$location = $location;
    this.songListService = SongListService;
  }

  $onInit() {
    this.songListService.getSongList().then((songs) => {

      this.songs = songs;
    }).catch(e => console.error(e));
  };

  getSong(id) {
    if (id) {
      this.$location.path('song').search({ 'id': id });
    }
  }


}

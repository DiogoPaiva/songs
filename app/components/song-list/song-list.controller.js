
export default class {

  constructor($log, $q, SongListService ) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.songListService = SongListService;
  }

  $onInit() {
    var $this = this;
    this.songListService.getSongList().then(function(songs){
      $this.songs = songs;
    }, function (error) {

    });


  };

}

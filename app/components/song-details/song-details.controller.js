
export default class {

  constructor($log, $q, SongDetailsService, $location, $sessionStorage, $localStorage, $window) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.songDetailsService = SongDetailsService;
    this.$location = $location;
    this.$sessionStorage = $sessionStorage;
    this.$localStorage = $localStorage;
    this.$window = $window;
  }

  $onInit() {

    //Preloader
    this.loadingSong = false;

    //Get Query Parameter
    let searchObject = this.$location.search();

    //Call function to get song on init
    this.getSong(searchObject.id);

  };

  /*
  *  @return 'song' object
  * */
  getSong(id){

    //Preloader
    this.loadingSong =  true;

    //Call Service
    this.songDetailsService.getSong(id).then((song) => {

      this.song = song;
    }).catch(e => console.error(e));
  }

  // Navigate to the previous page
  backToList() {
    this.$window.history.back();
  }

}

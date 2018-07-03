
export default class {

  constructor($log, $q, SongDetailsService, $location, $sessionStorage, $window) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.songDetailsService = SongDetailsService;
    this.$location = $location;
    this.$sessionStorage = $sessionStorage;
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


  getSong(id){


    //Preloader
    this.loadingSong =  true;

    //Call Service
    this.songDetailsService.getSong(id).then((song) => {

      this.song = song;
    }).catch(e => console.error(e));

  }

  backToList() {

    //let searchParams = angular.fromJson(this.$sessionStorage.search);

    //this.$location.path('/');
    this.$window.history.back();
  }

}

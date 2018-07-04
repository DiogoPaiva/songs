
export default class {

  constructor($log, $q, $location, $sessionStorage, $window) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$location = $location;
    this.$sessionStorage = $sessionStorage;
    this.$window = $window;
  }

  $onInit() {

    this.favoriteSongs =  this.$sessionStorage.favorites;

  };

  /*
  *  @return 'song' object
  * */
  getSong(id){


  }

  // Navigate to the previous page
  backToList() {
    this.$window.history.back();
  }

}

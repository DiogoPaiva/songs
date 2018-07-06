
export default class favoritesController{

  constructor($log, $q, $location, $sessionStorage, $localStorage, $window, $rootScope) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$location = $location;
    this.$localStorage = $localStorage;
    this.$window = $window;
    this.$rootScope =  $rootScope;
  }

  $onInit() {

    this.existentFavorites = this.$localStorage.favorites || [];

    if(this.$localStorage.favorites){
      this.noFavorites = this.existentFavorites.length < 1 || !this.existentFavorites;
    } else {
      this.noFavorites = false;
    }
    this.favoriteCount = this.existentFavorites.length ? this.existentFavorites.length : '0';
  }

  /*
  * Adds and removes the song from the favorite array;
  * If not present in favorites, add it, when its present, remove it
  * */
  addFavorites(song){
    if(this.existentFavorites){
      // Not in Favorites list, push it to the array
      //Get Song index in favorites array, when not found in array, songIndex = -1;
      let songIndex = this.existentFavorites.findIndex(i => i.id === song.id);

      if(songIndex === -1) {
        //Add to favorites array
        this.existentFavorites.push(song);
      } else {
        //Already in existentFavorites array, remove it
        this.existentFavorites.splice(songIndex, 1);
      }
    }

    //Update LocalStorage
    this.$localStorage.favorites = this.existentFavorites;

    //Emit broadcast to update the counter
    // this.$rootScope.$broadcast('onAddToFavoriteEvent', {
    //     this.updateFavoriteCount();
    // });


    this.isFavorite(song);
  }

  /*
  *  remove Favorite from Storage
  * */
  removeFav(song){

    //Get Song index in favorites array, when not found in array, songIndex = -1;
    let songIndex = this.existentFavorites.findIndex(i => i.id === song.id);
    //Remove the index from the array
    this.existentFavorites.splice(songIndex, 1);
    //Update LocalStorage
    this.$localStorage.favorites = this.existentFavorites;
  }

  isFavorite(song){
    let songIndex = this.existentFavorites.findIndex(i => i.id === song.id);
    return songIndex !== -1;
  }

  // Navigate to the previous page
  backToList() {
    this.$window.history.back();
  }

  //Navigate to favorites page
  showFavorites() {
    this.$location.path('favorites');
  }

  updateFavoriteCount() {
    this.existentFavorites = this.$localStorage.favorites || [];
    this.favoriteCount = this.existentFavorites.length ? this.existentFavorites.length : '0';
  }
}

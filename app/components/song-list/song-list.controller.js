
export default class {

  constructor($log, $q, SongListService, $location, $sessionStorage,$localStorage, $window ) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$location = $location;
    this.songListService = SongListService;
    this.$sessionStorage = $sessionStorage;
    this.$localStorage = $localStorage;
    this.$window = $window;

  }

  $onInit() {

    //INIT APPLICATION
    if(this.$sessionStorage.search) {

      //Get the Search object from the SessionStorage
      this.searchList(
        this.$sessionStorage.search,
        this.$sessionStorage.search._order,
        this.$sessionStorage.search._sort
      );

    } else {

      //Or Init With a clean search history
      this.searchList();
    }

    this.loaderList = false;

  };

   /*Function Search
   * @search Object
   * @order - asc or desc
   * @field - can be 'title', 'artist', 'title_like', 'Year'
   * */
  searchList(search, order, field) {
    this.songs = {};
    let queryParams = {};

    if (!!search) {

      queryParams = {
        'selectedType': search.selectedType ? search.selectedType : undefined,
        'q': (!search.selectedType) ? search.q : undefined,
        'year': search.year,
        'artist': search.artist,
        'title_like': (search.selectedType) ? search.q || search.title_like : undefined,
        '_sort': field ? field : undefined,
        '_order': order ? order : undefined
      };

      //Store in session the search parameters
      this.$sessionStorage.search = queryParams;
    }

    //Call TO service
    this.loaderList = true;//Preloader
    this.songListService.getSongList(queryParams).then((songs) => {

      //Returned Object
      this.songs = songs;

      //Preloader
      this.loaderList = false;

      // Total results label
      this.totalResults = songs.length;


    }).catch(e => console.error(e)
    );
  }

  //Navigate to Song Detail View
  viewDetails(id){
      if (id) {
        this.$location.path('song').search({ 'id': id });
      }
  }

}

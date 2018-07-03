
export default class {

  constructor($log, $q, SongListService, $location, $sessionStorage, $window ) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$location = $location;
    this.songListService = SongListService;
    this.$sessionStorage = $sessionStorage;
    this.$window = $window;

  }

  $onInit() {

    //INIT APPLICATION
    if(this.$sessionStorage.search) {

      //Use the Saved search on SessionStorage
      this.searchList(
        this.$sessionStorage.search,
        this.$sessionStorage.search._order,
        this.$sessionStorage.search._sort
      );

      document.getElementById("searchText").value = this.$sessionStorage.search.q;


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
        'q': (!search.selectedType) ? search.q : undefined,
        'year': search.year,
        'artist': search.artist,
        'title_like': (search.selectedType) ? search.q : undefined,
        '_sort': field ? field : undefined,
        '_order': order ? order : undefined
      };

      this.$sessionStorage.search = queryParams;
    }

  //  console.log(search);
  //  console.log(queryParams);

    //Call TO service
    this.loaderList = true;//Preloader
    this.songListService.getSongList(queryParams).then((songs) => {

      //Returned Object
      this.songs = songs;
      this.loaderList = false;

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

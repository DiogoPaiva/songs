
export default class {

  constructor($log, $q, SongListService, $location, $scope ) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$location = $location;
    this.songListService = SongListService;

  }

  $onInit() {

    //Init tha application with a clean search
    this.searchList();

  };

   /*Function Search
   * @search Object model: searchText, year, artist, title_like, _sort, order
   * */
  searchList(search){
    this.songs = {};
    let queryParams ={};

    if(!!search){

      queryParams = {
        'q': search.q,
        'year' : search.year,
        'artist' : search.artist,
        'title_like': (search.selectedType === 'title') ? search.q : undefined,
        '_sort' : search.sort,
        'order' : search.order
      };
    }


    console.log(search);
    console.log(queryParams);

    //Call TO service
    this.songListService.getSongList(queryParams).then((songs) => {

      //Returned Object
      this.songs = songs;

    }).catch(e => console.error(e)

    );
  }

}

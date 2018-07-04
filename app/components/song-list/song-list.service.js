export default class {

  constructor(httpService, $log, $q) {
    'ngInject';

    this.httpService = httpService;
    this.$log = $log;
    this.$q = $q;
  }

  getSongList(search){

    if(!!search) {
    const defer = this.$q.defer();

    let queryParams = {
      'q': search.q,
      'year': search.year,
      'artist': search.artist,
      'title_like': search.title_like,
      '_sort': search._sort,
      '_order': search._order
    };


      var $this = this;
      this.httpService.get('/songs', queryParams).then(response => {

        if (response) {
          const data = response;
          defer.resolve(data.data);
        }
      }, error => {
        $this.$log.error('getSongList failed - ', error);
        defer.reject({
        });
      });

    return defer.promise;
    }
  };

}

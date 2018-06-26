export default class {

  constructor(httpService, $log, $q) {
    'ngInject';

    this.httpService = httpService;
    this.$log = $log;
    this.$q = $q;
  }


  getSongList(searchParams){

    var queryParams = {};

    if(!!searchParams) {
      queryParams = {
        'q': searchParams.q,
          'year' : searchParams.year,
          'artist' : searchParams.artist,
          'title': searchParams.title_like,
          'sort' : searchParams._sort,
          'order' : searchParams.order
      }
    }

    const defer = this.$q.defer();

    var $this = this;
   this.httpService.get('/songs', queryParams).then(response => {

      if (response) {

        const data = response;

        defer.resolve(data.data);

      } else {
        this.$log.error('getSongList failed - No data received');
        defer.reject({
          errorCode: 'UNKNOWN_ERROR'
        });
      }

    }, function (error) {
     $this.$log.error('getSongList failed - ', error);
      defer.reject({
        errorCode: 'UNKNOWN_ERROR'
      });
    });

    return defer.promise;

  };


  getSong(id) {

    const defer = this.$q.defer();
    var queryParameters = {
      'id' : id
    };

    this.httpService.get('https://songs-api-ubiwhere.now.sh/api/song', queryParameters).then(response => {

      if (response) {

        const data = response;

        defer.resolve(data);

      } else {
        this.$log.error('getSong failed - No data received');
        defer.reject({
          errorCode: 'UNKNOWN_ERROR'
        });
      }

    }, function (error) {
      this.$log.error('getSong failed - ', error);
      defer.reject({
        errorCode: 'UNKNOWN_ERROR'
      });
    });

    return defer.promise;

  };
}

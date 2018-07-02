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

      var $this = this;
      this.httpService.get('/songs', search).then(response => {

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

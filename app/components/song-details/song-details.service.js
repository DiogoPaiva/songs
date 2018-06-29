export default class {

  constructor(httpService, $log, $q) {
    'ngInject';

    this.httpService = httpService;
    this.$log = $log;
    this.$q = $q;
  }

  getSong(id) {

    const defer = this.$q.defer();
    let queryParameters = {
      'id' : id
    };

    var $this = this;
    this.httpService.get('/songs', queryParameters).then(response => {

      if (response) {

        const data = response.data[0];

        defer.resolve(data);

      } else {
        $this.$log.error('getSong failed - No data received');
        defer.reject({
          errorCode: 'UNKNOWN_ERROR'
        });
      }

    }, function (error) {
      $this.$log.error('getSong failed - ', error);
      defer.reject({
        errorCode: 'UNKNOWN_ERROR'
      });
    });

    return defer.promise;

  };
}

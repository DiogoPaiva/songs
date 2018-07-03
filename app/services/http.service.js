import HttpErrorResponse from './http-error.service';

export default class {

    constructor($http, $log, $q, configs) {
        'ngInject';

        this.isSecureRequest = false;

        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.configs = configs;
    }

    request(method, url, data, secured) {
        let defer = this.$q.defer();
        let requestConfigs = angular.copy(this.configs.apiOptions);

        var requestDefer;
        if (!requestDefer) {
            switch (method) {
                case 'put':
                case 'post': {
                    requestDefer = this.$http[method](this.configs.apiPath + url, data, requestConfigs);
                    break;
                }
                case 'delete':
                case 'get': {
                    requestConfigs.params = data;
                    requestDefer = this.$http[method](this.configs.apiPath + url, requestConfigs);
                    break;
                }
            }
        }

        requestDefer.then(
            response => this.handleRequestResponse(response, defer),
            error => this.handleRequestError(error, defer)
        );

        return defer.promise;
    };

    postFormData(url, formData, secured) {
        var useToken = (typeof secured === 'undefined' || secured);
        var defer = this.$q.defer();
        var requestConfigs = angular.copy(this.configs.apiOptions);


        //if secure method - set token header


        $.ajax({
            url: this.configs.apiPath + url,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            headers: '',
            success: response => this.handleRequestResponse(response, defer),
            error: error => this.handleRequestError(error, defer)
        });

        return defer.promise;
    };

    handleRequestResponse(response, defer) {
        //check token validity
        if (response.data && response.data.errorCode && response.data.errorCode === '-400') {
            //token expired
            this.sessionService.closeSession();
            this.$log.error('Invalid Token');
            let httpErrorResponse = new HttpErrorResponse();
            httpErrorResponse.tokenExpired = true;
            defer.reject(httpErrorResponse);
        } else {
            defer.resolve(response);
        }
    };

    handleRequestError(error, defer) {
        let httpErrorResponse = new HttpErrorResponse();
        //check token validity
        if (error.data && error.data.errorCode && error.data.errorCode === '-400') {
            //token expired
            this.sessionService.closeSession();
            this.$log.error('Invalid Token');
            httpErrorResponse.tokenExpired = true;
            defer.reject(httpErrorResponse);
        } else if (typeof error.data === 'object' && error.data) {
            httpErrorResponse.errorCode = error.data.errorCode;
            httpErrorResponse.errorMessage = error.data.message;
            defer.reject(httpErrorResponse);
        } else {
            httpErrorResponse.errorCode = 'UNKNOWN_ERROR';
            defer.reject(httpErrorResponse);
        }
    };

    isSuccessfulStatus(status) {
        return status === '0' || status === '200';
    };

    post(url, data, secure) {
        let useToken = (typeof secure === 'undefined' || secure);
        return this.request('post', url, data, useToken);
    };

    get(url, data, secure) {
        let useToken = (typeof secure === 'undefined' || secure);
        return this.request('get', url, data, useToken);
    };

    put(url, data, secure) {
        let useToken = (typeof secure === 'undefined' || secure);
        return this.request('put', url, data, useToken);
    };

    delete(url, data, secure) {
        let useToken = (typeof secure === 'undefined' || secure);
        return this.request('delete', url, data, useToken);
    }

    isSuccessResponse(operationName, response, defer) {
        const responseMessage = response.message;

        if (response.data && response.data.status) {
            const status = response.data.status;
            if (this.isSuccessfulStatus(status)) {
                return true;

                // Commented, because there are cases where successful requests "response.data.data" is simply null...
                // if (response.data && (response.data.data || response.data.data === false)) {
                //     return true;
                // } else {
                //     this.$log.error(`${operationName} API failed - No data property received`, status);
                //     defer.reject({
                //         errorCode: response.errorCode,
                //         message: `Operation ${operationName} failed - ${responseMessage}`
                //     });
                // }
            } else {
                this.$log.error(`${operationName} failed - status unsuccessful`, status);
                defer.reject({
                    errorCode: 'UNKNOWN_ERROR',
                    message: `Operation ${operationName} failed  - ${responseMessage}`
                });
            }
        } else {
            this.$log.error(`${operationName} failed - No response data or status`);
            defer.reject({
                errorCode: 'UNKNOWN_ERROR',
                message: `Operation ${operationName} failed  - ${responseMessage}`
            });
        }
    }

    httpError(operationName, error, defer) {
        this.$log.error(`${operationName} operation failed - `, error);
        defer.reject({
            errorCode: 'error.UNKNOWN_ERROR',
            message: `${operationName} operation failed`
        });
    }
}

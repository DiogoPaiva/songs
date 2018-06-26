import angular from 'angular';

import './style/app.css';

// loading shared module
import './services/core.module';

// loading all components
import './app.components';

const appModule = angular.module('songsWebapp', [
  'songsCoreModule',
  'songList'
]);


export default appModule;

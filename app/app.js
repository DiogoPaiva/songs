import './style/main.css';

// loading shared module
import './services/core.module';
// loading all components
import './app.components';


const appModule = angular.module('songsWebapp', [
  'songsCoreModule',
  'songList',
  'songDetails',
]);


export default appModule;

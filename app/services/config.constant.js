(function () {
    'use strict';

        angular.module("app")
       .constant('config', {
           apiUrl: "https://api.spotify.com/v1/",
           generalErrorMessage: "Could not connect to server, please try again."
       });
   
})();
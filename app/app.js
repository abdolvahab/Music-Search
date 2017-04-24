(function () {
    'use strict';
      var app = angular.module('app', ['ngAnimate', 'toastr']);

        app.config(function (toastrConfig) {
            angular.extend(toastrConfig, {
                positionClass: 'toast-bottom-left',
                timeOut: 8000,
            });
        });
        
})();

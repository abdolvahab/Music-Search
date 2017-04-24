/**
 * License: MIT
 */
(function() {
    'use strict';

        angular.module("app").factory('preLoader', function () {
            return function (url, successCallback, errorCallback) {
                angular.element(new Image()).bind('load', function () {
                    successCallback();
                }).bind('error', function () {
                    errorCallback();
                }).attr('src', url);
            }
        });

        angular.module("app").directive('preloadBgImage', ['preLoader', function (preLoader) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if (attrs.preloadBgImage != undefined) {
                        attrs.$observe('preloadBgImage', function () {
                            preLoader(attrs.preloadBgImage, function () {
                                element.css({
                                    'background-image': 'url("' + attrs.preloadBgImage + '")',
                                    'opacity': 1
                                });
                            }, function () {
                                if (attrs.fallbackImage != undefined) {
                                    element.css({
                                        'background-image': 'url("' + attrs.fallbackImage + '")',
                                        'opacity': 0
                                    });
                                }
                            });
                        });
                    }
                }
            };
        }]);

})();

(function () {
    'use strict';
    

        angular.module("app")
    .service('spotifyService', spotifyService);

        spotifyService.$inject = ['$http', 'config'];

        function spotifyService($http, config) {
            return {
                getArtists: getArtists,
                getAlbums: getAlbums,
                getAlbumAndArtists: getAlbumAndArtists,
                getAlbumsofArtist: getAlbumsofArtist,
                getAlbumsDetail: getAlbumsDetail
            };

            //find artists with specified {text} and return items from {start} number and with {count} count
            function getArtists(text, start, count) {
                return $http({
                    method: "GET",
                    url: config.apiUrl + "search?type=artist&q=" + text + "&offset=" + start + "&limit=" + count
                });

            }

            //find albums with specified {text} and return items from {start} number and with {count} count
            function getAlbums(text, start, count) {
                return $http({
                    method: "GET",
                    url: config.apiUrl + "search?type=album&q=" + text + "&offset=" + start + "&limit=" + count
                });

            }

            //find albums and artists with specified {text} and return items from {start} number and with {count} count
            function getAlbumAndArtists(text, start, count) {
                return $http({
                    method: "GET",
                    url: config.apiUrl + "search?type=artist,album&q=" + text + "&offset=" + start + "&limit=" + count
                });

            }

            //get albums of specified artist with id {artistId} and return items from {start} number and with {count} count
            function getAlbumsofArtist(artistId, start, count) {
                return $http({
                    method: "GET",
                    url: config.apiUrl + "artists/" + artistId + "/albums?album_type=album&offset=" + start + "&limit=" + count
                });

            }
            //get albums detail of specied album ids in {albumIds} array
            function getAlbumsDetail(albumIds) {
                return $http({
                    method: "GET",
                    url: config.apiUrl + "albums/?ids=" + albumIds.join()
                });

            }
        }

})();
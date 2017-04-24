(function () {
    'use strict';

    angular.module("app").controller('SearchController', SearchController);

    SearchController.$inject = ['spotifyService', 'toastr', 'config', 'ModalService'];

    function SearchController(spotifyService, toastr, config, ModalService) {
        var vm = this;
        //Searching function
        vm.search = search;
        // items loaded from service until now
        vm.loadedItemsCount = 0;
        // Albums loaded from service until now in modal
        vm.loadedAlbumsCount = 0;
        // How many items should be loaded for each request
        vm.itemsToLoadCount = 6;
        // Search Text
        vm.searchQuery = '';
        // Array of loaded items after search
        vm.items = [];
        // Array of albums of an artist loaded by modal
        vm.artistAlbums = [];
        // total items found for specified query
        vm.totalItems = vm.itemsToLoadCount;
        // total albums found for specified artist
        vm.totalAlbums = vm.itemsToLoadCount;
        // is loading spinner showing for search
        vm.loadingItems = false;
        // is loading spinner showing for artist albums
        vm.loadingAlbums = false;
        //get items from service for specified search query
        vm.getItems = getItems;
        //get albums of specified artist
        vm.getAlbums = getAlbums;
        //open modal
        vm.openModal = openModal;
        //close modal
        vm.closeModal = closeModal;
        //artist selected to view albums
        vm.selectedArtist = {};

        // Get albums and artists for specified search query
        function getItems() {
            vm.loadingItems = true;
            spotifyService.getAlbumAndArtists(vm.searchQuery, vm.loadedItemsCount, vm.itemsToLoadCount).then(
                function success(data) {
                    vm.loadedItemsCount += data.data.albums.items.length;

                    vm.items = vm.items
                        .concat(_.map(data.data.albums.items,
                        function (item) {
                            return { "name": item.name, "image": item.images.length > 1 ? item.images[0].url : '', "artist": item.artists[0].name, "id": item.id, type: "album" }
                        }))
                        .concat(_.map(data.data.artists.items,
                        function (item) {
                            return { "name": item.name, "image": item.images.length > 1 ? _.sortBy(item.images, function (item) { return item.width; }).reverse()[0].url : '', "id": item.id, type: "artist" }
                        }));
                    vm.totalItems = data.data.albums.total+data.data.artists.total;
                    vm.loadingItems = false;
                }, function error(message) { vm.loadingItems = false; toastr.error(config.generalErrorMessage) });
        }

        // Do search
        function search() {
            resetPage();
            getItems();
        }

        function resetPage() {
            vm.items = [];
            vm.loadedItemsCount = 0;
            vm.totalItems = vm.itemsToLoadCount;
        }

        function openModal(modalId, id, type) {
            if (type === 'artist') {
                ModalService.Open(modalId);
                vm.selectedArtist = _.find(vm.items, function (item) {
                    return item.type == 'artist' && item.id == id;
                });
                vm.artistAlbums = [];
                getAlbums();
            }
        }

        function closeModal(modalId) {
            ModalService.Close(modalId);
        }


        //------------------ artist Modal -----------------------------
        // Get albums of an artist in modal
        function getAlbums() {
            vm.loadingAlbums = true;
            spotifyService.getAlbumsofArtist(vm.selectedArtist.id, vm.loadedAlbumsCount, vm.itemsToLoadCount)
            .then(
                function success(data) {
                    return spotifyService.getAlbumsDetail(_.map(data.data.items, function (item) { return item.id; }))
                },
                function error(message) { vm.loadingAlbums = false; })
            .then(
                function success(data) {
                    vm.loadedAlbumsCount += data.data.albums.length;
                    vm.artistAlbums = vm.artistAlbums.concat(_.map(data.data.albums,
                        function (item) {
                            return { "name": item.name, "image": _.sortBy(item.images, function (item) { return item.width; })[0].url, "year": item.release_date.split("-")[0] }
                        }));
                    vm.totalAlbums = data.data.total;
                    vm.loadingAlbums = false;
                },
                function error() { vm.loadingAlbums = false; toastr.error(config.generalErrorMessage); });
        }
        // set background image of element
        vm.getBackgroundStyle = function (imagepath) {
            return {
                'background-image': 'url(' + imagepath + ')'
            }
        }
    }

})();

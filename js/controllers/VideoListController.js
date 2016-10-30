App.controller('videos', function($scope, Video){
	Video.key = 'AIzaSyCnfP1lmwI65k0yOwUUetZLh_ppA38MuCM';
	$scope.videos = [];
	$scope.is_loading = true;
	$scope.collection = {videos:[]};
	$scope.offset = null;
	$scope.search_by = "search";
	$scope.height_style = {"min-height":"200px","width":"100%"};

	$scope.load = function(){
		Video.findInYouTube($scope.search_by, $scope.term, $scope.offset).then(function(response) {

                $scope.offset = response.nextPageToken;

                if(response.collection) {
                    $scope.collection.videos = $scope.collection.videos.concat(response.collection);
                }

                $scope.can_load_more = !!response.collection.length;

            }).finally(function() {
                $timeout(function() {
                    $scope.is_loading = false;
                });
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
	};
});
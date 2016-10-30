"use strict";

App.directive("ytVideo", function($timeout, $window) {
    return {
        restrict: "A",
        replace:true,
        scope: {
            video: "="
        },
        template:
            '<div class="card">'
                + '<div class="item item-image" ng-click="play()">'
                    + '<div ng-hide="show_player" ng-style="height_style">'
                        + '<img ng-src="{{ video.cover_url }}"  height="200" width="{{ height_style.width }}"/>'
                        + '<div class="sprite"></div>'
                    + '</div>'
                    + '<div ng-show="show_player">'
                        +'<div ng-if="use_iframetag">'
                            +'<div id=""  width="100%" height="200" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></div>'
                        +'</div>'
                    +'</div>'
                + '</div>'
                + '<div ng-if="video.title" class="item item-text-wrap item-custom">'
                    + '<p>{{ video.title }}</p>'
                + '</div>'
            + '</div>'
        ,
        link: function(scope, element) {
            scope.height_style = null;
            if(scope.video.cover_url) {
            	scope.height_style = {"min-height":"200px","width":"100%"};
            }

            scope.play = function() {
            	$timeout(function() {
            		if (/^https?:\/\/(?:www\.)?youtube/.test(scope.video.url_embed)) {
            			var id = 'iframe-' + scope.video.video_id;
            			element.find('div').attr('id', id);
            			scope.show_player = true;
            			scope.$emit('YtVideoLaunched', {dom_id:id, video_id: scope.video.video_id, title: scope.video.title});
            		}


            	}, 1000, false);
                
                
            };
        },
        controller: function($scope, YoutubePlayer) {
            $scope.show_player = false;
            $scope.use_iframetag = /^https?:\/\/(?:www\.)?youtube/.test($scope.video.url_embed);
            $scope.$on('YtVideoLaunched', function(event, data){
                YoutubePlayer.loadVideo(data.dom_id, data.video_id);
            });
            
                


        }
    };
});
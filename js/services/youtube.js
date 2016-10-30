App.service('YoutubePlayer', function($window){
	var service = {};
	var tag , src , firstScriptTag, youtube;
	var loaded = false;
	var players = [];

	function loadIframeApi() {
		tag = document.createElement('script');
		tag.src = "https://www.youtube.com/player_api";
		firstScriptTag = document.getElementById('Youtube_Js_API');
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}



	loadIframeApi();

	$window.onYouTubePlayerAPIReady = function() {
		service.loaded = true;
	};
	service.loadVideo = function (dom, v_id){
		youtube = new player(dom, v_id);
		youtube.AddPlayer();
	};

	function stopOtherVideos(c_v_id) {
		for(var i = 0 ; i< players.length;i++){
			if((players[i].getVideoData()).video_id !== c_v_id){
				try { 
					(players[i]).stopVideo();
				} catch(err) {
					console.log(err);
				}
			}
		}
		return false;
	};
	function stopAllVideos(c_v_id) {
		for(var i = 0 ; i< players.length;i++){
			try { 
				(players[i]).stopVideo();
			} catch(err) {
				console.log(err);
			}

		}
		return false;
	};


	function player(id, vId) {
		this.id  = id;
		this.vId =  vId;
		this.state = '';
		this.AddPlayer = function(){
			players.push( new YT.Player(id, {
				height: '200',
				width: '100%',
				videoId: vId,
				events: {
					'onReady': this.onPlayerReady,
					'onStateChange':this.onPlayerStateChange
				},
				playerVars: {
					rel: 0,
					showinfo: 0,
					autoplay: 0
				}

			}));
			return this;
		};
		this.onPlayerReady = function(e){
			console.log(e);
		};
		this.onPlayerStateChange = function(event) {
			c_v_id = (event.target.getVideoData()).video_id;
			message = (event.target.getVideoData()).video_id + ' ';
			switch (event.data) {

				case YT.PlayerState.ENDED :
				this.state = 'ENDED';
				console.log(message + 'is ended');
				break;
				case YT.PlayerState.PLAYING :
				stopOtherVideos(c_v_id, players);
				this.state ='PLAYING';
				console.log(message + ' is playing');
				break;
				case YT.PlayerState.PAUSED :
				this.state ='PAUSED';
				console.log(message + ' is paused');
				break;
				case YT.PlayerState.BUFFERING:
				console.log(players);
				stopOtherVideos(c_v_id, players);
				this.state = 'BUFFERING';
				console.log(message + ' is buffering');
				break;
				case YT.PlayerState.CUED :
				this.state ='CUED';
				console.log(message + ' is cued');
				default :
				console.log(message + ': unkown state!');
				break;

			}
		};
	}
	return service;

});
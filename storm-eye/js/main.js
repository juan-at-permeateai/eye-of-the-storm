// displays summary 
var player = "this shouldn't be hapening";
function displaySummary(){
	videoLink = 'https://www.youtube.com/embed/tgbNymZ7vqY';
	tempString = "";
	
	noDataMsg = '<div class="border col-lg-5 noDataMessage"> Not specified</div>';
	
	
  tempString = '<h4 class="btn btn-info" style="margin-bottom:30px;">Crucial Parameter Readings</h4>';
  tempString += '<div id="player"></div>';
  $('#embeddedVideo').html(tempString);

	tempString = "";
	tempString = '<h4 class="btn btn-info" style="margin-bottom:30px;">Crucial Parameter Readings</h4>';
	tempString += '<div class="col-md-12"><div id="Speed" style="font-weight:bold;padding-bottom:20px;style="text-align-right;" class="border col-md-6 btn">Speed:</div><div id="speedContent" class="border col-md-6 btn btn-warning">sample1</div></div>';
	tempString += '<div class="col-md-12"><div id="direction" class="border col-md-6 btn" style="font-weight:bold;padding-bottom:20px;style="text-align-right;">Direction:</div><div id="directionContent" class="border col-md-6 btn btn-warning">sample2</div></div>';
	
	tempString += '<div class="col-md-12"><div id="other" class="border col-md-6 btn" style="font-weight:bold;padding-bottom:20px;style="text-align-right;">other parameter:</div><div class="border col-md-6 btn btn-warning">CurrentData</div></div>';


	$('#summary').html(tempString);
	
}
//youtube code
	 // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      
      function onYouTubeIframeAPIReady() {

        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
		console.log(player);
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
	  function playVideo() {
		  player.playVideo();
		  return "i tried";
	  }
      function stopVideo() {
        player.stopVideo();
      }

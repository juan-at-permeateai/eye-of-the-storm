// displays summary 
function displaySummary(){
	videoLink = 'https://www.youtube.com/embed/tgbNymZ7vqY';
	tempString = "";
	
	noDataMsg = '<div class="border col-lg-5 noDataMessage"> Not specified</div>';
	
	
  tempString = '<h4 class="btn btn-info" style="margin-bottom:30px;">Crucial Parameter Readings</h4>';
  tempString += '<iframe class="embed-responsive-item" src="'+ videoLink +'"></iframe>';
  $('#embeddedVideo').html(tempString);

	tempString = "";
	tempString = '<h4 class="btn btn-info" style="margin-bottom:30px;">Crucial Parameter Readings</h4>';
	tempString += '<div class="col-md-12"><div id="Speed" style="font-weight:bold;padding-bottom:20px;style="text-align-right;" class="border col-md-6 btn">Speed:</div><div class="border col-md-6 btn btn-warning">sample1</div></div>';
	tempString += '<div class="col-md-12"><div id="direction" class="border col-md-6 btn" style="font-weight:bold;padding-bottom:20px;style="text-align-right;">Direction:</div><div class="border col-md-6 btn btn-warning">sample2</div></div>';
	
	tempString += '<div class="col-md-12"><div id="other" class="border col-md-6 btn" style="font-weight:bold;padding-bottom:20px;style="text-align-right;">other parameter:</div><div class="border col-md-6 btn btn-warning">CurrentData</div></div>';


	$('#summary').html(tempString);

}

function updatePitchMapTooltip($parent){	
	var voiceNum = getVoiceNumber($parent);
	var $textArea =  $("#areaPitch"+voiceNum);
	var targetArea = $("#mapArea"+voiceNum);

	targetArea.popover("hide");
	targetArea.attr("data-content","<textarea readonly>"+$textArea.val()+"</textarea>");	
}
// This is used when the values are changed at the orignal pitch input.
function updatePitchMapData($parentId,voiceNumber){
	var $currMapPanel = $("#mappingPanel"+voiceNumber);
	var $range = $currMapPanel.find('[id^=range]');
	var $to = $currMapPanel.find('[id^=to]');
	
	writeRangeOut($range.val(),$to.val(),voiceNumber);

	call_pitch_Mapping($parentId,voiceNumber);// these are back at welcome.js 
	call_dur_Mapping($parentId,voiceNumber);// originates at welcome.js
}


$(document).ready(function(){
    // this is called when the normalization value is changed or the range of the keyboard is changed.
	$('.pitch_mapping').on('change', '[id^=range], [id^=to],[id^=compressType]', function() {
	    var $parentId = $(this).closest('div[id]');
		testRangeValues($parentId);
		printLocalMap($parentId);
		tooltip($parentId);
	});
    // this is through when a person uses the modify function.
	$('.pitch_mapping').on('click', '[id^=modify]', function() {
	    var $parentId = $(this).closest('div[id]');    
		replacePitchValue($parentId);// this is going to replaceValue. in WebSiteFunctions.js
	});	

    // this is called when the algorithm is changed in pitch mapping.
	function printLocalMap($parentId){
		var currVoiceNum = getVoiceNumber($parentId);		
		var $compressChoice = $parentId.find("option:selected");
		var $range = $parentId.find('[id^=range]');
		var $to = $parentId.find('[id^=to]');
		var $currArea = $parentId.find('[id^=mapArea]');
		var normalizeChoice = normalizeFactory.createNormalizer($compressChoice.text());
	
		var voiceArray = GetVoiceArray();

		musicNormalize.setAlgorithm(normalizeChoice);
		//var currData = getDataArray($("#areaPitch"+currVoiceNum));

		//var transformedData = musicNormalize.normalize(currData, $range.val(), $to.val());
		voiceArray[currVoiceNum - 1].pitchMappingArray = musicNormalize.normalize(voiceArray[currVoiceNum - 1].originalPitchArray, $range.val(), $to.val());
		SetVoiceArray(voiceArray);

		mapWriteOutput($currArea.attr("id"), voiceArray[currVoiceNum - 1].pitchMappingArray);
	}

	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=pitchMapInfo]');
		var $input = $parentId.find('[id^=compressType]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}

	function testRangeValues($parentId){
		var maxRange = 88;
		var $range = $parentId.find('[id^=range]');
		var $to = $parentId.find('[id^=to]');
	
		if((isNaN(parseInt($range.val())) || isNaN(parseInt($range.val()))) || 
		(($range.val() < 0) || ($to.val() < $range.val()) || ($to.val() > maxRange))){
			$range.val(1);
			$to.val(maxRange);
		}
	}
});

function pitchMapping(numberOfVoice) {
    for (var voiceCount = 1; voiceCount <= numberOfVoice; voiceCount++) {
        var $voice = "\
		<div id='mappingPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3></legend>\
				<label>Mapping using:</label>\
				<select id='compressType"+ voiceCount + "'>\
					<option>Division</option>\
					<option>Logarithmic</option>\
					<option>Modulo</option>\
				</select>\
				<img id='pitchMapInfo"+ voiceCount + "'> \
				<br /><label>Range:</label><input type='number' id='range"+ voiceCount + "' name='Range'>\
				<label>to:</label><input type='number' id='to"+ voiceCount + "' name='to'>\
				<img  id='pRangeImg"+ voiceCount + "'>\
				<br /><label>Output:</label>\
				<textarea readonly id='mapArea"+ voiceCount + "'></textarea>\
				<fieldset>\
					<legend>Modifications</legend>\
					<label>Replace all:</label><input type='text' id='modiAll"+ voiceCount + "' >\
					<label>with:</label><input type='text' id='modiWith"+ voiceCount + "'>\
			<!--		<input name='addSilence' type='checkbox'><label>Add Silence</label>\
					<label>Value of silence:</label><input type='text' name='valueSilence' >\
					<img id='silenceImg"+ voiceCount + "'>\
			-->		<br /><button type='button' id='modify"+ voiceCount + "' value='Modify'>Modify Output</button>\
				</fieldset>\
			</fieldset>\
		</div>\
		";
        $(".pitch_mapping").append($voice);
    }
}

	
	
	


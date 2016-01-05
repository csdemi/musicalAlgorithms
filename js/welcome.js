// This is driving the site.

$(document).ready(function(){
// a call to create voices perhaps. or move it into change voice count...
    var voiceTotal = 1;
    var voiceArray = new Array();

    voiceArray.push(new VoiceObject(voiceTotal));
    changeVoiceCount(voiceTotal, voiceArray);

    SetVoiceArray(voiceArray);//
    
	$("#welcomeChoice").change(function () {// this is where I can fix the voice changing bug. 
	    removeVoice(voiceTotal);
		voiceTotal = $(this).find('option:selected').text();
		
		EmptyVoiceArray(voiceArray);
		ReloadVoiceArray(voiceArray, voiceTotal);
        
		changeVoiceCount(voiceTotal, voiceArray);
		SetVoiceArray(voiceArray);//

		if($("#tabs_container").css('visibility') != "hidden")
			$("#options ul li").find("#tab").click();
			
		$(".choose-instrument").find("select").each(function() {
				$(this).change();
		});
	});
    // This is driving the website

	function EmptyVoiceArray(voiceArray)
	{
	    while (voiceArray.length > 0) {
	        voiceArray.pop();
	    }
	}// added 12/31

	function ReloadVoiceArray(voiceArray, count)
	{
	    for (var x = 0; x < count; x++) {
	        voiceArray.push(new VoiceObject(x + 1));
	    }
	}
	
	function changeVoiceCount(voiceTotal, voiceArray) {
	    pitchInput(voiceTotal);// this creates the panel
		durationInput(voiceTotal);//  this creates the panel
		pitchMapping(voiceTotal);// this creates the panel
		durationMapping(voiceTotal);// this creates the panel
		scaleOptions(voiceTotal); // Initialize Scale Options Tab creates the panel
		playPanel(voiceTotal);// this creates the a play panel
		defaultData(voiceArray); // this loads the array in the object.
		displayImage();
		getOutput();
}	

function removeVoice(numberOfVoice){
	$( '[id^=pitchPanel]').remove();
	$( '[id^=mappingPanel]').remove();
	$( '[id^=dPitchPanel]').remove();
	$( '[id^=dMappingPanel]').remove();
	$( '[id^=scaleOptionsPanel]').remove();
	$('.voice').remove();
}

function displayImage(){//name could change			
	$(".full_view").each(function(){//Gives every image in the index an image 
		var $parentId = $(this)
		var $img = $parentId.find("img");
		var $modifyButton = $parentId.find("button");
		var noteCount = $("[id^=note_count]");

		//Note: "Undefined" not being checked because it does not seem to produce an error in jquery.  
		$img.attr({src:"images/info.png"});
		$img.tooltip({title:"Default",placement:"right",
		html:"true"});
		
		$modifyButton.popover({title:"Attention!",placement:"top",
		html:"true",content:"Default",trigger:"manual"});

		noteCount.tooltip({title:"Max note count is 2000",placement:"top"});

		initialInfo($parentId);	
	});

	popoverPitchValue();
}

function popoverPitchValue(){
	$("textarea").filter(function(){ 
		return this.id.match(/\w+apArea\d+$/);
	}).each(function(){
		var $parent= $(this).closest("div[id]");
		var $voice = $parent.find('h3');
		var targetArea;
		var $textAreaId = $parent.find("textarea").attr("id");
		var voiceCount = getVoiceNumber($parent);
		var voiceName;

		if("mapArea" === $textAreaId.substring(0,$textAreaId.length-1)){
			targetArea = "areaPitch"+voiceCount;
			voiceName = "Pitch Input";
		}	
		else{
			targetArea = "dAreaMap"+voiceCount;
			voiceName = "Duration Input";
		}
	

		$(this).popover({trigger: 'focus', title:$voice.text()+" "+voiceName,placement:"top",
		html:"true",content:"<textarea  readonly>"+$("#"+targetArea).val()+"</textarea>"});	

		$(this).tooltip({title:"Click text area",placement:"bottom"});		
	});
}


function initialInfo($parentId){
	var groupImg = $parentId.find("img");
	var imgCount = groupImg.length;
	var tooltip;

	if(imgCount > 0){
		var $currInfo = groupImg.filter(function() {
			return this.id.match(/\w+Info\d+$/);
		});

		var $selectedBox = $parentId.find("select");
		var $selected = $selectedBox.find("option:selected");

		tooltip = information.getText($selected.text());
		$currInfo.attr("data-original-title",tooltip);
	}

	if(imgCount == 3 || imgCount == 2 ){
		var $currRangeInfo = groupImg.filter(function() {
			return this.id.match(/\w+RangeImg\d+$/);
		});

		if(imgCount == 3){					
			tooltip = information.getText("PitchMap");
		}
		else
		{
			tooltip = information.getText("durationMap");
		}		

		$currRangeInfo.attr("data-original-title",tooltip);
	}


	if(imgCount > 2){
		var $silenceInfo = groupImg.filter(function() {
			return this.id.match(/silenceImg\d+$/);
		});

		tooltip = information.getText("silence");
		$silenceInfo.attr("data-original-title",tooltip);
	}
}
});
	
	
	


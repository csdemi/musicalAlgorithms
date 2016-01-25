// This is driving the site.
var voiceArray = new Array();// voiceArray holds the voice objects that are associated with each panel.
<<<<<<< HEAD

$(document).ready(function () {
    var voiceTotal = 1;
    var previousVoiceCount = voiceTotal;// This is used with the voice change functions.

    Init(voiceArray); //<--- Loads 4 voices with default data.

    CreateDefaultPanels(voiceTotal);// This creates the panel
    LoadDefaultPanels(voiceArray, voiceTotal);// This loads the default values into the panels
=======
var previousVoiceCount = 0;// voice count holder used to determine what needs to happen when voice number has changed.

$(document).ready(function () {
    var DefaultVoiceTotal = 1;
    previousVoiceCount = DefaultVoiceTotal;// This is used with the voice change functions.

    Init(voiceArray); //<--- Loads 4 voices with default data.

    CreateDefaultPanels(DefaultVoiceTotal);// This creates the panel
    LoadDefaultPanels(voiceArray, DefaultVoiceTotal);// This loads the default values into the panels
>>>>>>> origin/DNA
    displayImage();// This does something.
	/*
		This is called whenever the voice count is changed by the the user.
	*/
	$("#welcomeChoice").change(function () {
<<<<<<< HEAD
		var previousVoiceCount = voiceTotal;// Updates previousVoiceCount.
	    voiceTotal = $(this).find('option:selected').text();
		changeVoiceCount(voiceTotal, previousVoiceCount, voiceArray);// Executes voice change procedures.
=======
	    voiceTotal = $(this).find('option:selected').text();
		changeVoiceCount(voiceTotal, previousVoiceCount, voiceArray);// Executes voice change procedures.
		previousVoiceCount = voiceTotal;// Updates previousVoiceCount.
>>>>>>> origin/DNA

		if($("#tabs_container").css('visibility') != "hidden")
			$("#options ul li").find("#tab").click();
			
		$(".choose-instrument").find("select").each(function() {
				$(this).change();
		});
	});
	/*
		This is used to change the voices via CreatePanels and LoadPanels.
	*/
	function changeVoiceCount(voiceTotal, previousVoiceCount, voiceArray) {
	    CreatePanels(voiceTotal, previousVoiceCount);// Creates the new panels
	    LoadPanels(voiceArray, voiceTotal, previousVoiceCount);// This loads the panel after the initial creation.
}
	/*
		This is used to create the default number of voices when the website is initially loaded..
	*/
	function CreateDefaultPanels(voiceNumber)
	{
	    pitchInput(voiceNumber);
	    durationInput(voiceNumber);//  this creates the panel
	    pitchMapping(voiceNumber);// this creates the panel
	    durationMapping(voiceNumber);// this creates the panel
	    scaleOptions(voiceNumber); // Initialize Scale Options Tab creates the panel
	    playPanel(voiceNumber);
	}
	
    /*
    	This is used after the Website is up and running and the user changes the number of voices.
    	Two conditions are checked, if the voice number has increased or decreased.
    */
    function CreatePanels(voiceTotal, previousVoiceCount)
	{
        var voiceIncrementor = 1;
       
        if(previousVoiceCount < voiceTotal)
        {
            for(var x = previousVoiceCount; x < voiceTotal; x++)
            {
                pitchInput(+previousVoiceCount + voiceIncrementor);
                durationInput(+previousVoiceCount + voiceIncrementor);
                pitchMapping(+previousVoiceCount + voiceIncrementor);
                durationMapping(+previousVoiceCount + voiceIncrementor);// this creates the panel
                scaleOptions(+previousVoiceCount + voiceIncrementor);
<<<<<<< HEAD
                playPanel(+previousVoiceCount + voiceIncrementor);// Move this into the loop as they get completed.
=======
                //playPanel(+previousVoiceCount + voiceIncrementor);// Move this into the loop as they get completed.
>>>>>>> origin/DNA
                // Major Issues with playPanel, play.js
                voiceIncrementor++;
            }
        }
        else if(previousVoiceCount > voiceTotal)
        {
            for( var x = previousVoiceCount; x > voiceTotal; x--)
            {
                removeVoice(x);
            }
        }
    }

	/*
		Loads the panels on the initial start up of the website.
	*/
    function LoadDefaultPanels(voices, voiceTotal)
    {
        LoadDefaultPitchInputNoteCount(voices, voiceTotal);// Found in pitchInput.js
        LoadDefaultPitchInputTextBox(voices, voiceTotal);// Found in pitchInput.js
        
        LoadDefaultDurationInputTextBox(voices, voiceTotal);// Found in durationInput.js

        LoadDefaultPitchMappingInputTextBox(voices, voiceTotal);// Found in pitchmapping.js
        LoadDefaultPitchMappingLowerRange(voices, voiceTotal);// Found in pitchmapping.js
        LoadDefaultPitchMappingUpperRange(voices, voiceTotal);// Found in pitchmapping.js

        LoadDefaultDurationMappingInputTextBox(voices, voiceTotal);// Found in durationmapping.js
        LoadDefaultDurationMappingLowerRange(voices, voiceTotal);// Found in durationmapping.js
        LoadDefaultDurationMappingUpperRange(voices, voiceTotal);// Found in durationmapping.js

        LoadDefaultScaleOptionInputTextBox(voices, voiceTotal);// Found in scaleOptions.js
    }
    
	/*
		This is used once the website is already up and running.
	*/
    function LoadPanels(voices, voiceTotal, previousVoiceCount)
    {
        var voiceIncrementor = 1;

        if (previousVoiceCount < voiceTotal) {
            for (var x = previousVoiceCount; x < voiceTotal; x++) {
                LoadPitchInputNoteCount(voices, +previousVoiceCount + voiceIncrementor);//Found in pitchInput.js
                LoadPitchInputTextBox(voices, +previousVoiceCount + voiceIncrementor);//Found in pitchInput.js
                LoadPitchAlgorithm(voices, +previousVoiceCount + voiceIncrementor);// Found in pitchInput.js

                LoadDurationInputTextBox(voices, +previousVoiceCount + voiceIncrementor);// Found in durationInput.js
                LoadDurationAlgorithm(voices, +previousVoiceCount + voiceIncrementor); // Found in durationInput.js

                LoadPitchMappingLowerRange(voices, +previousVoiceCount + voiceIncrementor);// Found in pitchMapping.js
                LoadPitchMappingUpperRange(voices, +previousVoiceCount + voiceIncrementor);// Found in pitchMapping.js
                LoadPitchMappingAlgorithm(voices, +previousVoiceCount + voiceIncrementor);// Found in pitchMapping.js
                LoadPitchMappingInputTextBox(voices, +previousVoiceCount + voiceIncrementor);// Found in pitchMapping.js

                LoadDurationMappingAlgorithm(voices, +previousVoiceCount + voiceIncrementor);// delete, used for reinstating the voice
                LoadDurationMappingUpperRange(voices, +previousVoiceCount + voiceIncrementor);// Found in durationMapping.js
                LoadDurationMappingAlgorithm(voices, +previousVoiceCount + voiceIncrementor);// Found in durationMapping.js
                LoadDurationMappingInputTextBox(voices, +previousVoiceCount + voiceIncrementor);// Found in durationMapping.js

                LoadScaleOptionsInputTextBox(voices, +previousVoiceCount + voiceIncrementor);// Found in scaleOptions.js

                voiceIncrementor++;
            }
        }
    }
    
	/*
		Used when the voice count is decreased. Removes the panel fields. Voice Object however is maintained in memory.
	*/
<<<<<<< HEAD
    function removeVoice(voiceIndex) {
        $( ("#pitchPanel" + voiceIndex) ).remove();
		$( ("#mappingPanel" + voiceIndex) ).remove();
		$( ("#dPitchPanel" + voiceIndex) ).remove();
		$( ("#dMappingPanel" + voiceIndex) ).remove();
		$( ("#scaleOptionsPanel" + voiceIndex) ).remove();
		$( ("#voiceContainer" + voiceIndex) ).remove();
=======
    function removeVoice(numberOfVoice) {
        if (numberOfVoice == 1)
        {
            $('[id^=pitchPanel1]').remove();
            $('[id^=mappingPanel1]').remove();
            $('[id^=dPitchPanel1]').remove();
            $('[id^=dMappingPanel1]').remove();
            $('[id^=scaleOptionsPanel1]').remove();
            $('.voice1').remove();
        }
        else if (numberOfVoice == 2)
        {
            $('[id^=pitchPanel2]').remove();
            $('[id^=mappingPanel2]').remove();
            $('[id^=dPitchPanel2]').remove();
            $('[id^=dMappingPanel2]').remove();
            $('[id^=scaleOptionsPanel2]').remove();
            $('.voice2').remove();
        }
        else if (numberOfVoice == 3)
        {
            $('[id^=pitchPanel3]').remove();
            $('[id^=mappingPanel3]').remove();
            $('[id^=dPitchPanel3]').remove();
            $('[id^=dMappingPanel3]').remove();
            $('[id^=scaleOptionsPanel3]').remove();
            $('.voice3').remove();
        }
        else if (numberOfVoice == 4)
        {
            $('[id^=pitchPanel4]').remove();
            $('[id^=mappingPanel4]').remove();
            $('[id^=dPitchPanel4]').remove();
            $('[id^=dMappingPanel4]').remove();
            $('[id^=scaleOptionsPanel4]').remove();
            $('.voice4').remove();
        }
>>>>>>> origin/DNA
}

/*
	Code below is from the original Website. Did not refactor at this time. <---- IDeal 
*/
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

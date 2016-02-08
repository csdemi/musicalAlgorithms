function biologyLoader($panel)
{
    /* 
     This shows and hides the fields for the DNA and Protein by checking what the option is in the dropdown menu.
     If the option is DNA then it will toggle on the areas and display the current values of the items. This area will allow 
     the user to customize the values to the letters and then convert all the letters in the input area to numerical data 
     that will be used to play music.
     */
    var $TextBox = $panel.find('[id^=areaPitch]');// This gets the Text Box
    var $Algorithm = $panel.find('[id^=input_set]');// This locates the algorithm drop down menu.
    var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
    var $NoteCount = $panel.find('[id^=note_count]');
    var voiceNumber = getVoiceNumber($panel);// This identifies the specific panel that is to be effected.

    voiceArray[voiceNumber - 1].originalPitchArrayAlgorithm = $SelectedAlgorithm.text();// may not be needed.

    var $dnaLabel = $panel.find('[id^=dna]');//Finds the DNA label so we can display the Sequence label
    var $sequenceInput =$panel.find('[id^=sequence]');//Finds the type of sequence that is going on
    var $textAreaInput=$panel.find('[id^=areaPitch]');//Finds the ID for the AreaText to clear it when DNA/RNA/Proteins ect are choosen

    var $letterA = $panel.find('[id^=A]');//Label for the letter A so we can show and hide it as needed
    var $letterT=$panel.find('[id^=T]');
    var $letterU=$panel.find('[id^=U]');
    var $letterG=$panel.find('[id^=G]');
    var $letterC=$panel.find('[id^=C]');

    var $letterAText = $panel.find('[id^=letterAText]');//The text area for the letter A so we can change values if the user wants to.
    var $letterTText=$panel.find('[id^=letterTText]');
    var $letterUText=$panel.find('[id^=letterUText]');
    var $letterCText=$panel.find('[id^=letterCText]');
    var $letterGText=$panel.find('[id^=letterGText]');
    var $extra = document.getElementsByName("extra");
    var $buttonConvert = $panel.find('[id^=convert]');
    var $radioButtonDuplicate=$panel.find('[id^=duplicates]');
    var $duplicateLabel=$panel.find('[id^=countDuplicateRadio]');
    var $radioButtonCodons=$panel.find('[id^=codons]');
    var $codonLabel=$panel.find('[id^=codonsRadio]');
    var $displayPanels=$panel.find('[id^=panels]');

    if ($SelectedAlgorithm.text() == "DNA" || $SelectedAlgorithm.text() == "RNA")
    { 
        $NoteCount.prop('readonly',true);
        $dnaLabel.show();
        $sequenceInput.show();
        $displayPanels.show();
        $textAreaInput.val("");
        $NoteCount.val("");

        $letterA.show();
        $letterC.show();
        $letterG.show();

        $letterAText.show();
        $letterCText.show();
        $letterGText.show();

        $buttonConvert.show();
        $radioButtonDuplicate.show();
        $duplicateLabel.show();
        $radioButtonCodons.show();
        $codonLabel.show();

        if ($SelectedAlgorithm.text() == "RNA")
        {
            $letterT.hide();
            $letterU.show();
            $codonLabel.hide();
            $radioButtonCodons.hide();
            $letterTText.hide();
            $letterUText.show();
        }
//THIS AREA BELOW IS FOR DNA FUNCTIONALITY
        else
        {
            $letterT.show();
            $letterU.hide();

            $letterTText.show();
            $letterUText.hide();
            
$($panel).on('change', $sequenceInput, function(){  
    voiceArray[voiceNumber - 1].biology.originalDNASequence=$sequenceInput.val().split(",");
    $NoteCount.val(voiceArray[voiceNumber-1].biology.originalDNASequence.length);
    $TextBox.val("");
    $sequenceInput.val(voiceArray[voiceNumber - 1].biology.originalDNASequence);
    voiceArray[voiceNumber-1].biology.userSequenceArray=$sequenceInput.val().split(",");
    $letterAText.val(voiceArray[voiceNumber - 1].biology.dnaValues[0]);
            $letterTText.val(voiceArray[voiceNumber-1].biology.dnaValues[1]);
            $letterCText.val(voiceArray[voiceNumber-1].biology.dnaValues[2]);
            $letterGText.val(voiceArray[voiceNumber-1].biology.dnaValues[3]);

            var i = 0;

            for (i; i < voiceArray[voiceNumber - 1].biology.originalDNASequence.length; i++)
            {
                if(voiceArray[voiceNumber-1].biology.originalDNASequence[i]=="A")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[0];
                }
                else if(voiceArray[voiceNumber-1].biology.originalDNASequence[i]=="T")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[1];
                }
                else if(voiceArray[voiceNumber-1].biology.originalDNASequence[i]=="C")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[2];
                }
                else
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[3];
                }
            }  
});

            $sequenceInput.val(voiceArray[voiceNumber - 1].biology.originalDNASequence);
            voiceArray[voiceNumber-1].biology.userSequenceArray=$sequenceInput.val().split(",");
            $NoteCount.val(voiceArray[voiceNumber-1].biology.userSequenceArray.length);
            $letterAText.val(voiceArray[voiceNumber - 1].biology.dnaValues[0]);
            $letterTText.val(voiceArray[voiceNumber-1].biology.dnaValues[1]);
            $letterCText.val(voiceArray[voiceNumber-1].biology.dnaValues[2]);
            $letterGText.val(voiceArray[voiceNumber-1].biology.dnaValues[3]);

            var i = 0;

            for (i; i < voiceArray[voiceNumber - 1].biology.originalDNASequence.length; i++)
            {
                if(voiceArray[voiceNumber-1].biology.originalDNASequence[i]=="A")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[0];
                }
                else if(voiceArray[voiceNumber-1].biology.originalDNASequence[i]=="T")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[1];
                }
                else if(voiceArray[voiceNumber-1].biology.originalDNASequence[i]=="C")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[2];
                }
                else
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[3];
                }
            }  
            
            if($buttonConvert.click(conversion));
        } 
    }
    else
    {
        //$NoteCount.prop('readonly',false);        
        $dnaLabel.hide();
        $sequenceInput.hide();
        $displayPanels.hide();
        $letterA.hide();
        $letterT.hide();
        $letterU.hide();
        $letterC.hide();
        $letterG.hide();

        $letterAText.hide();
        $letterUText.hide();
        $letterTText.hide();
        $letterCText.hide();
        $letterGText.hide();

        $buttonConvert.hide();
        $radioButtonCodons.hide();
        $radioButtonDuplicate.hide();
        $codonLabel.hide();
        $duplicateLabel.hide();
    }
    function conversion()
    {
        if($extra[1].checked==true)
            {
                var value=[];
                if(voiceArray[voiceNumber - 1].biology.userSequenceArray.length%3==0)
                    {
                        var counter=3;
                        var seqence="";
                        for(var i=0;i<voiceArray[voiceNumber - 1].biology.userSequenceArray.length+1;i++)
                            {
                                if(counter===0)
                                {
                                    counter=3;
                                    var values= parseInt(seqence.split(","));
                                    seqence="";
                                    value.push(values);
                                }
                                    seqence+=voiceArray[voiceNumber - 1].biology.userSequenceArray[i];
                                    counter--;
                            }
                        voiceArray[voiceNumber - 1].biology.userSequenceArray=value;
                        $TextBox.val(value);

                    }
                else
                {
                    alert("Please add more letters to the sequence.");
                }

            }
        else if($extra[0].checked==true)
            {
                voiceArray[voiceNumber-1].biology.userSequenceArray=[];
                for(var i = 0,j = 1;i<voiceArray[voiceNumber - 1].biology.originalDNASequence.length;i++,j++)
                    {
                        var counter = 1;
                        while(voiceArray[voiceNumber - 1].biology.originalDNASequence[i]==voiceArray[voiceNumber - 1].biology.originalDNASequence[j])
                            {
                                counter++;
                                i++;
                                j++;
                            }
                        voiceArray[voiceNumber-1].biology.userSequenceArray.push(counter);
                    }
                $TextBox.val(voiceArray[voiceNumber-1].biology.userSequenceArray);
            }
        else
            {
                $TextBox.val(voiceArray[voiceNumber-1].biology.userSequenceArray);
            }
            
            voiceArray[voiceNumber-1].originalPitchArray=voiceArray[voiceNumber-1].biology.userSequenceArray;
            //alert(voiceArray[voiceNumber-1].originalPitchArray);
            UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
            UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound); 
            UpdateDurationNoteCount(voiceArray[voiceNumber - 1],voiceNumber);
            UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);
            UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);

            LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
            LoadPitchMappingInputTextBox(voiceArray, voiceNumber);
            LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);
    }
}


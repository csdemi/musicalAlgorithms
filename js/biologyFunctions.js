function biologyLoader($panel)
{
    /* 
     This shows and hides the fields for the DNA and Protein by checking what the option is in the dropdown menu.
     If the option is DNA then it will toggle on the areas and display the current values of the items. This area will allow 
     the user to customize the values to the letters and then convert all the letters in the input area to numerical data 
     that will be used to play music.
     
     WEBSITE FOR RANDOM PROTEIN STRING: http://web.expasy.org/randseq/
     WEBSITE FOR AMINO ACIDS: http://www.cbs.dtu.dk/courses/27619/codon.html
     */
        var $TextBox = $panel.find('[id^=areaPitch]');// This gets the Text Box
        var $Algorithm = $panel.find('[id^=input_set]');// This locates the algorithm drop down menu.
        var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
        var $NoteCount = $panel.find('[id^=note_count]');
        var voiceNumber = getVoiceNumber($panel);// This identifies the specific panel that is to be effected.
        var $accordion=$panel.find('[id=accordion]');
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
        var $extra = $panel.find('[name^=extra]');
        var $buttonConvert = $panel.find('[id^=convert]');
        var $radioButtonDuplicate=$panel.find('[id^=duplicates]');
        var $duplicateLabel=$panel.find('[id^=countDuplicateRadio]');
        var $radioButtonCodons=$panel.find('[id^=codons]');
        var $codonLabel=$panel.find('[id^=codonsRadio]');
        var $defaultRadio=$panel.find('[id^=default]');
        var $defaultRadioLabel=$panel.find('[id^=defaultRadio]');
        var $displayPanels=$panel.find('[id^=panels]');

    if ($SelectedAlgorithm.text() == "DNA" || $SelectedAlgorithm.text() == "RNA"||$SelectedAlgorithm.text()=="Protein"){ 
        $NoteCount.prop('readonly',true);
        $dnaLabel.show();
        $sequenceInput.show();
        $displayPanels.show();
        $defaultRadio.show();
        $defaultRadioLabel.show();
        $textAreaInput.val("");
        $NoteCount.val("");
        $accordion.show();
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
        if ($SelectedAlgorithm.text() == "RNA")//AUCG
        {
            $letterT.hide();
            $letterU.show();
            $letterTText.hide();
            $letterUText.show();
            $sequenceInput.val(voiceArray[voiceNumber - 1].biology.originalRNASequence);
            voiceArray[voiceNumber-1].biology.userSequenceArray=$sequenceInput.val().split(",");
            voiceArray[voiceNumber-1].biology.GenericDataArray=$sequenceInput.val().split(",");
            $NoteCount.val(voiceArray[voiceNumber-1].biology.userSequenceArray.length);
            $letterAText.val(voiceArray[voiceNumber - 1].biology.rnaValues[0]);
            $letterUText.val(voiceArray[voiceNumber-1].biology.rnaValues[1]);
            $letterCText.val(voiceArray[voiceNumber-1].biology.rnaValues[2]);
            $letterGText.val(voiceArray[voiceNumber-1].biology.rnaValues[3]);
            rnaSequenceConversion();
            update();
            $($panel).on('change', $sequenceInput, function(){
                CanidateArray =$sequenceInput.val().split(",");
               /* if(ValidateBiologyData("RNA",CanidateArray)==false)
                    {
                        alert("Make Sure All Data Entered is A,U,C,G");
                        $sequenceInput.val(voiceArray[voiceNumber-1].biology.GenericDataArray);
                    }
                else
                {*/
                    voiceArray[voiceNumber - 1].biology.GenericDataArray=CanidateArray;
                    $NoteCount.val(voiceArray[voiceNumber-1].biology.GenericDataArray.length);
                    $TextBox.val("");
                    $sequenceInput.val(voiceArray[voiceNumber - 1].biology.GenericDataArray);
                    for(var i = 0;i<voiceArray[voiceNumber-1].biology.GenericDataArray.length;i++)
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.GenericDataArray[i];
                    }
                    $letterAText.val(voiceArray[voiceNumber - 1].biology.rnaValues[0]=$letterAText.val());
                    $letterUText.val(voiceArray[voiceNumber-1].biology.rnaValues[1]=$letterUText.val());
                    $letterCText.val(voiceArray[voiceNumber-1].biology.rnaValues[2]=$letterCText.val());
                    $letterGText.val(voiceArray[voiceNumber-1].biology.rnaValues[3]=$letterGText.val());
                    rnaSequenceConversion();
                    update();
                //}
            });
            if($buttonConvert.click(rnaConversion));
        }
        else if($SelectedAlgorithm.text()=="DNA")//ATCG
        {
            $letterT.show();
            $letterU.hide();
            $letterTText.show();
            $letterUText.hide();
            
$($panel).on('change', $sequenceInput, function(){
            CanidateArray = $sequenceInput.val().split(",");
            /*if (ValidateBiologyData("DNA",CanidateArray) == false)
	        {
	            alert("Make Sure All Data Entered Is A,T,C,G");
                $sequenceInput.val(voiceArray[voiceNumber - 1].biology.GenericDataArray);
	        }
	        else
	        {*/
                voiceArray[voiceNumber - 1].biology.GenericDataArray=CanidateArray;
                $NoteCount.val(voiceArray[voiceNumber-1].biology.GenericDataArray.length);
                $TextBox.val("");
                $sequenceInput.val(voiceArray[voiceNumber - 1].biology.GenericDataArray);
                voiceArray[voiceNumber-1].biology.userSequenceArray=new Array();
                for(var i = 0;i<voiceArray[voiceNumber-1].biology.GenericDataArray.length;i++)
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.GenericDataArray[i];
                }
                $letterAText.val(voiceArray[voiceNumber - 1].biology.dnaValues[0]=$letterAText.val());
                $letterTText.val(voiceArray[voiceNumber-1].biology.dnaValues[1]=$letterTText.val());
                $letterCText.val(voiceArray[voiceNumber-1].biology.dnaValues[2]=$letterCText.val());
                $letterGText.val(voiceArray[voiceNumber-1].biology.dnaValues[3]=$letterGText.val());
                dnaSequenceConversion();
                update();
            //}
});
            $sequenceInput.val(voiceArray[voiceNumber - 1].biology.originalDNASequence);
            voiceArray[voiceNumber-1].biology.GenericDataArray=$sequenceInput.val().split(",");
            voiceArray[voiceNumber-1].biology.userSequenceArray=$sequenceInput.val().split(",");
            $NoteCount.val(voiceArray[voiceNumber-1].biology.userSequenceArray.length);
            $letterAText.val(voiceArray[voiceNumber - 1].biology.dnaValues[0]);
            $letterTText.val(voiceArray[voiceNumber-1].biology.dnaValues[1]);
            $letterCText.val(voiceArray[voiceNumber-1].biology.dnaValues[2]);
            $letterGText.val(voiceArray[voiceNumber-1].biology.dnaValues[3]);
            dnaSequenceConversion();
            update();
            if($buttonConvert.click(conversion));
        } 
        else if($SelectedAlgorithm.text()=="Protein")
        {
            $accordion.hide();
$($panel).on('change',$sequenceInput,function(){
    voiceArray[voiceNumber - 1].biology.GenericDataArray=$sequenceInput.val().split(",");
    $NoteCount.val(voiceArray[voiceNumber-1].biology.GenericDataArray.length);
    $TextBox.val("");
    $sequenceInput.val(voiceArray[voiceNumber - 1].biology.GenericDataArray);
    voiceArray[voiceNumber-1].biology.userSequenceArray=voiceArray[voiceNumber-1].biology.GenericDataArray;
    
    proteinSequenceConversion();
    
    $TextBox.val(voiceArray[voiceNumber-1].biology.userSequenceArray);
    update();
});
            $sequenceInput.val(voiceArray[voiceNumber - 1].biology.originalProteinSequence);
            voiceArray[voiceNumber-1].biology.GenericDataArray=$sequenceInput.val().split(",");
            voiceArray[voiceNumber-1].biology.userSequenceArray=$sequenceInput.val().split(",");
            $NoteCount.val(voiceArray[voiceNumber-1].biology.userSequenceArray.length);
            
            proteinSequenceConversion();
            
            $TextBox.val(voiceArray[voiceNumber-1].biology.userSequenceArray);
            
            update();
        }
    }
    /*
    ELSE STATEMENT REPRESENTS WHEN IT IS NONE OF THESE ITEMS IT WILL TURN OFF THE REQUIRED FIELDS FOR
    DNA/RNA/PROTEIN.
    */
    else{
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
        $defaultRadio.hide();
        $defaultRadioLabel.hide();
        $accordion.hide();
        $buttonConvert.hide();
        $radioButtonCodons.hide();
        $radioButtonDuplicate.hide();
        $codonLabel.hide();
        $duplicateLabel.hide();
        update();
    }
    function rnaConversion(){
//THIS CONVERTS TO CODONS
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
//THIS COUNTS THE DUPLICATE VALUES
        else if($extra[2].checked==true)
            {
                voiceArray[voiceNumber-1].biology.userSequenceArray=[];
                for(var i = 0,j = 1;i<voiceArray[voiceNumber - 1].biology.GenericDataArray.length;i++,j++)
                    {
                        var counter = 1;
                        while(voiceArray[voiceNumber - 1].biology.GenericDataArray[i]==voiceArray[voiceNumber - 1].biology.GenericDataArray[j])
                            {
                                counter++;
                                i++;
                                j++;
                            }
                        voiceArray[voiceNumber-1].biology.userSequenceArray.push(counter);
                    }
                $TextBox.val(voiceArray[voiceNumber-1].biology.userSequenceArray);                
            }
//THIS CONVERTS TO SINGLE BASE VALUES
        else
        {
            $TextBox.val(voiceArray[voiceNumber-1].biology.userSequenceArray);
        }  
        update();
    }
    function conversion(){        
//THIS IS MAKING CODONS
        if($extra[1].checked==true)
            {
                var value=[];
                if(voiceArray[voiceNumber - 1].biology.GenericDataArray.length%3==0)
                    {
                        var counter=3;
                        var seqence="";
                        for(var i=0;i<voiceArray[voiceNumber - 1].biology.GenericDataArray.length+1;i++)
                            {
                                if(counter===0)
                                {
                                    counter=3;
                                    var values= parseInt(seqence.split(","));
                                    seqence="";
                                    value.push(values);
                                }
                                    seqence+=voiceArray[voiceNumber - 1].biology.GenericDataArray[i];
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
//THIS IS COUNTING DUPLICATES
        else if($extra[2].checked==true)
            {
                voiceArray[voiceNumber-1].biology.userSequenceArray=[];
                for(var i = 0,j = 1;i<voiceArray[voiceNumber - 1].biology.GenericDataArray.length;i++,j++)
                    {
                        var counter = 1;
                        while(voiceArray[voiceNumber - 1].biology.GenericDataArray[i]==voiceArray[voiceNumber - 1].biology.GenericDataArray[j])
                            {
                                counter++;
                                i++;
                                j++;
                            }
                        voiceArray[voiceNumber-1].biology.userSequenceArray.push(counter);
                    }
                $TextBox.val(voiceArray[voiceNumber-1].biology.userSequenceArray);
            }
//THIS IS SINGLE BASE CONVERSIONS
        else
            {
                $TextBox.val(voiceArray[voiceNumber-1].biology.userSequenceArray);
            }
            
            update();
    }    
    function rnaSequenceConversion(){
                    var i = 0;

            for (i; i < voiceArray[voiceNumber - 1].biology.GenericDataArray.length; i++)
            {
                if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="A")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.rnaValues[0];
                }
                else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="U")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.rnaValues[1];
                }
                else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="C")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.rnaValues[2];
                }
                else
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.rnaValues[3];
                }
            }
    }
    function dnaSequenceConversion(){
        var i = 0;

            for (i; i < voiceArray[voiceNumber - 1].biology.GenericDataArray.length; i++)
            {
                if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="A")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[0];
                }
                else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="T")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[1];
                }
                else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="C")
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[2];
                }
                else
                {
                    voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.dnaValues[3];
                }
            }  
    }
    function proteinSequenceConversion(){
            var i=0;
    for (i; i < voiceArray[voiceNumber - 1].biology.GenericDataArray.length; i++)
    {
                    if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="W")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[0]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="F")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[1]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="L")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[2]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="I")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[3]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="M")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[4]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="Y")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[5]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="V")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[6]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="C")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[7]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="P")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[8]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="T")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[9]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="A")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[10]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="S")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[11]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="Q")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[12]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="N")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[13]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="G")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[14]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="H")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[15]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="R")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[16]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="E")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[17]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="D")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[18]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                    else if(voiceArray[voiceNumber-1].biology.GenericDataArray[i]=="K")
                    {
                        voiceArray[voiceNumber-1].biology.userSequenceArray[i]=voiceArray[voiceNumber-1].biology.proteinValues[19]*voiceArray[voiceNumber-1].biology.conversionValue;
                    }
                }
    }
    function update(){
            voiceArray[voiceNumber-1].originalPitchArray=voiceArray[voiceNumber-1].biology.userSequenceArray;
            UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
            UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound); 
            UpdateDurationNoteCount(voiceArray[voiceNumber - 1],voiceNumber);
            UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);
            UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);

            LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
            LoadPitchMappingInputTextBox(voiceArray, voiceNumber);
            LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);
    }
    function ValidateBiologyData(selection,userTextData)
{
    var conditional = true;
    var index = 0;
    var acceptableDNAInput = new RegExp("^[ATCG]$");
    var acceptableRNAInput = new RegExp("^[AUCG]$");
    var acceptableProtienInput = new RegExp("[WFLIMYVCPTASQNGHREDK]$");
    if(selection == "DNA")
        {
            while(conditional && index <= userTextData.length - 1)
            {
                conditional = acceptableDNAInput.test(userTextData[index]);
                index++;
            }
        }
    else if(selection == "RNA")
        {
            while(conditional && index <= userTextData.length - 1)
            {
                conditional = acceptableRNAInput.test(userTextData[index]);
                index++;
            }
        }
    else
        {
            while(conditional && index <= userTextData.length - 1)
            {
                conditional = acceptableProtienInput.test(userTextData[index]);
                index++;
            }
        }
    
    return conditional;
}
}
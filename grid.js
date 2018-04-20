var fileData; 

function func(data,checkFunc)
{
	//alert(data.readyState);
	if (data.readyState == 4 && data.status == 200)
	{
		dictionary = data.responseText.split("\n");
		//  alert(dictionary);
		checkFunc();
	}
}


function loadFile(checkWordFunc)
{
	//alert("in load file");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		func(this,checkWordFunc);
	}
	//alert();
	xhttp.open("GET","file.txt",true);
	xhttp.send();
}


function checkTheWordInDict()
{
	//loadFile()
	var val = document.getElementById('selectedInput').value;
	var isPresent=spellcheck(val);
	if(isPresent)  {
		correctWord=correctWord+1; 
		Score=Score+10;
		$('#correctWord').html(correctWord.toString());
		$('#Score').html(Score.toString()); 

		alert("congratulations you are win this game");
	}else{
		wrongWord=wrongWord+1;
		Score=Score-5;
		$('#Score').html(Score.toString());
		$('#wrongWord').html(wrongWord.toString()); 

		//     document.getElementById('wrongWord').value=wrongWord; 

		alert("sorry !!! please try again");
	}

	resetField();
}

//var table=['asdifkenhsq','asdifkenhsq','asdifkenhsq','asdifkenhsq','asdifkenhsq','asdifkenhsq','asdifkenhsq'];
//var level=0;
var correctWord=0;

var wrongWord=0;

var Score=0;


function check(){
	// alert("in check");
	loadFile(checkTheWordInDict);

}



function spellcheck(value) {
	var returnVal = false;
	var length = dictionary.length;
	for (var inc = length - 1; inc >= 0; inc--) {
		if(value.toUpperCase() === dictionary[inc].toUpperCase()) {
			returnVal = true;
			break;
		}
	}
	return returnVal;
}

var timer='';
var counter = 60;
function startTimer() {
	document.getElementById('mycounter').innerHTML = counter;
	counter--;
	if (counter < 0 ) {
		alert('game Over!');
		$('#tab').addClass("disabled");
		$('#tab').css({'background-color': '#ddd',
				'cursor': 'not-allowed'});
		return;
	}
	else {
		timer=setTimeout(startTimer, 1000);
	}
}
function createTable()
{
	//alert("increate");
	counter=60
		clearTimeout(timer);;
	// $("#tab").removeClass()
	startTimer();
	var num_rows = "3"//document.getElementById('rows').value;
	var num_cols = "3"//document.getElementById('cols').value;
	var tbody = '';
	var random=0;
	var theader = '<div><table id="tab" class="table table-bordered" border="1">\n';
	for( var i=0; i<num_rows; i++){

		//     for(var j=0; j < num_cols; j++){
		tbody += `<tr id="tr`+i+`">`;
		for( var j=0; j<num_cols; j++)
		{
			tbody += `<td id="td`+j+`">`;

			//var chr1= table[level];
			var chr1="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
				var random = parseInt(Math.random()*chr1.length);
			var letter = chr1.charAt(random); 
			random++;

			tbody +=''+letter;
			//tbody += '</td>'+ letter + '</td>';
		}
		tbody += '</tr>\n';
		//     }
		var tfooter = '</table></div>';
		document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
	}

	getData();
}
function getData(){
	$( document ).ready(function() {
			$("#tab td").click(function(){
					if(!$(this).hasClass("disabled") && !$("#tab").hasClass('disabled')){
					var id=$(this).attr("id");
					var curWord=$(this).html();
					var prevText = document.getElementById('selectedInput').value;
					document.getElementById('selectedInput').value=prevText+''+curWord ; 
					$(this).addClass("disabled");
					$(this).css({'background-color': '#ddd',
							'cursor': 'not-allowed'});
					}
					else
					counter=0;
					//   $("#selectedInput").html(prevText+''+curWord);

					return false; // avoid parents divs if you have nested divs
					});
			});
}

function resetField()
{
	// createTable();
	//     document.getElementById('rows').value="";
	//     document.getElementById('cols').value="";     
	document.getElementById('selectedInput').value=""; 
	//     document.getElementById('wrapper').value=""; 


}

function readFile()
{
	$(document).ready(function(){
			$("button").click(function(){
					$("#filedata").load("file.txt");
					});
			});
	alert(fileData);

}


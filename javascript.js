var text = getElById("text");
var generate = getElById("generate");
var div = getElById("content");
var input = getElsByTag("input");
var fontSizeMin;
var fontSizeMax;
var radioColor;
var colors = {'red': '', 'green': '', 'blue': ''};


init();


function attachBody(tag){
  return document.body.appendChild(tag);
}
function createEl(tag){
  return document.createElement(tag);
}
function createText(text){
  return document.createTextNode(text);
}
function getElsByTag(tag){
  return document.getElementsByTagName(tag); //return array
}
function getElById(id){
  return document.getElementById(id);
}

generate.onclick = function(){
  remove("P");

  fontSizeMin = parseInt(getElById("fontSizeMin").value);
  fontSizeMax = parseInt(getElById("fontSizeMax").value);

  radioColor = input[0].checked ? input[0].value : input[1].value;
  

  init(fontSizeMin, fontSizeMax, radioColor);
};


function init(fMin, fMax, color){

  if(!color) color = "RGB";

  var txt = text.value;

  for (var i = 0; i < txt.length; i++){
    var t = createText(txt[i]);
    var p = createEl("P");
    p.appendChild(t);
    div.appendChild(p);
  }

  if(color == "RGB")

    randomColor("RGB");

  else

    randomColor("GREY");

  randomSize(fMin, fMax);
}


function randomColor(par){

  var array = getElsByTag("P");

  for (var i = 0; i < array.length; i++){

    if(par == "RGB"){
      colors.red = random();
      colors.green = random();
      colors.blue = random();
    }
    else {
      colors.red = colors.green = colors.blue = random();
    }

    array[i].style.color = "#" + colors.red + colors.green + colors.blue;
  }
}



function randomSize(min, max){

  if(!min) min = 20;
  if(!max) max = 40;

  var array = getElsByTag("P");

  for (var i = 0; i < array.length; i++){
    var r = Math.floor(Math.random() * (max - min) + min);
    array[i].style.fontSize = r + "px";
  }
}

function random(){

    var r = Math.floor(Math.random() * 256);

    return r.toString(16);

}

//FIX ME PLS
//OR KILL ME
function remove(tag){

  var array = getElsByTag(tag);

  if (array){
    for(var j = 0; j < 10; j++){
      for(var i = 0; i < array.length; i++){
      array[i].parentNode.removeChild(array[i]);
      }
    }
  } 

  else return false;

  return false;

}
var text = document.getElementById("text");
var generate = document.getElementById("generate");
var div = document.getElementById("content");
var color = {'red': '', 'green': '', 'blue': ''};

init();
randomColorRGB();
randomSize(20, 40);

function attachBody(tag){
  return document.body.appendChild(tag);
}
function createEl(tag){
  return document.createElement(tag);
}
function createText(text){
  return document.createTextNode(text);
}

generate.onclick = function(){
  var array = document.getElementsByTagName("P");
  if(array) remove("P");
  init();
  randomColorRGB();
  randomSize(20, 40);
}


function init(){
  var txt = text.value;
  console.log(txt); 
  for (var i = 0; i < txt.length; i++){
    var t = createText(txt[i]);
    var p = createEl("P");
    p.appendChild(t);
    div.appendChild(p);
  }
}


function randomColorRGB(){
  var array = document.getElementsByTagName("P");
  for (var i = 0; i < array.length; i++){
    color.red = random();
    color.green = random();
    color.blue = random();
    array[i].style.color = "#" + color.red + color.green + color.blue;
  }
}

function randomColorGREY(){
  var array = document.getElementsByTagName("P");
  for (var i = 0; i < array.length; i++){
    color.red = color.green = color.blue = random();
    array[i].style.color = "#" + color.red + color.green + color.blue;
  }
}

function randomSize(min, max){
  var array = document.getElementsByTagName("P");
  for (var i = 0; i < array.length; i++){
    var random = Math.floor(Math.random() * (max - min) + min);
    array[i].style.fontSize = random + "px";
  }
}

function random(){
    var r = Math.floor(Math.random() * 256);
    return r.toString(16);
}

//FIX ME PLS
function remove(tag){
  var array = document.getElementsByTagName(tag);
  for(var j = 0; j < 10; j++){
    for(var i = 0; i < array.length; i++){
    array[i].parentNode.removeChild(array[i]);
    }
  } 
  return false;
}
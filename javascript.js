const text = $('#text');
const generate = $('#generate');
const content = $('#content');
const colors = {'red': '', 'green': '', 'blue': ''};
const roar = $('#roar');

let cache = [];

function $(tag){
  if (document.querySelectorAll(tag).length === 1) {
    return document.querySelector(tag);
  } else {
    return document.querySelectorAll(tag);
  }
}


generate.onclick = function(){
  clear();

  const radioInput = $("[name=color]");
  const fontSizeMinNode = $("#fontSizeMin");
  const fontSizeMaxNode = $("#fontSizeMax");
  const fontSizeMin = parseInt(fontSizeMinNode.value || fontSizeMinNode.placeholder);
  const fontSizeMax = parseInt(fontSizeMaxNode.value || fontSizeMaxNode.placeholder);
  const radioColor = radioInput[0].checked ? radioInput[0].value : radioInput[1].value;

  init(fontSizeMin, fontSizeMax, radioColor);
};


function init(fMin, fMax, color = "RGB"){

  if (roar.checked) {
    forEachInTextarea((unit) => {
      const p = Math.random() > 0.5 ? 'p' : 'P';
      const textNode = document.createTextNode(p);
      const pNode = document.createElement('p');

      pNode.appendChild(textNode);
      cache.push(pNode);
      content.appendChild(pNode);
    })
  } else {
    forEachInTextarea((unit) => {
      const textNode = document.createTextNode(unit);
      const pNode = document.createElement('p');

      pNode.appendChild(textNode);
      cache.push(pNode);
      content.appendChild(pNode);
    })
  }
  if(color === "RGB") {
    randomColor("RGB");
  } else {
    randomColor("GREY");
  }
  randomSize(fMin, fMax);
}


function randomColor(pair){
  forEachInCache((unit) => {
    if (pair === "RGB"){
      colors.red = random();
      colors.green = random();
      colors.blue = random();
    } else {
      colors.red = colors.green = colors.blue = random();
    }
    unit.style.color = `#${colors.red}${colors.green}${colors.blue}`;
  })
}

function randomSize(min = 20, max = 40){
  forEachInCache((unit) => {
    let r = Math.floor(Math.random() * (max - min) + min);
    unit.style.fontSize = `${r}px`;
  })
}

function forEachInCache (cb) {
  for (let i = 0; i < cache.length; i++) {
    const unit = cache[i];
    cb(unit, i, cache);
  }
}

function forEachInTextarea (cb) {
  let txt = text.value;
  for (let i = 0; i < txt.length; i++) {
    const unit = txt[i];
    cb(unit, i, txt)
  }
}


function random(){
    const r = Math.floor(Math.random() * 256);
    return r.toString(16);
}

function clear(){
  const content = document.querySelector('#content');
  content.textContent = '';
  cache = [];
}

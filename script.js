document.addEventListener('DOMContentLoaded', () => {

  const text = getNodes('#text')[0];
  const generateButton = getNodes('#generate-button')[0];
  const content = getNodes('#content')[0];
  const saveButton = getNodes('#save-button')[0];
  const colors = { 'red': '', 'green': '', 'blue': '' };

  function getNodes(tag) {
    return document.querySelectorAll(tag);
  }

  initCustomRadioButtons();
  generateText();

  generateButton.onclick = generateText;
  saveButton.onclick = savePng;
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      generateText();
    }
  })

  function generateText() {
    clear();

    const radioInput = getNodes("[checked]");
    const fontSizeMinNode = getNodes("#fontSizeMin")[0];
    const fontSizeMaxNode = getNodes("#fontSizeMax")[0];
    const fontSizeMin = parseInt(fontSizeMinNode.value || fontSizeMinNode.placeholder);
    const fontSizeMax = parseInt(fontSizeMaxNode.value || fontSizeMaxNode.placeholder);

    const radioColor = radioInput[0].getAttribute('value');
    init(fontSizeMin, fontSizeMax, radioColor);
  }

  function init(fMin, fMax, color) {
    forEachInTextarea((unit) => {
      const textNode = document.createTextNode(unit);
      const pNode = document.createElement('span');

      pNode.style.fontSize = randomSize(fMin, fMax);
      pNode.style.color = randomColor(color);

      pNode.appendChild(textNode);

      content.appendChild(pNode);
    })
  }

  function randomColor(pair) {
    if (pair === "RGB") {
      colors.red = random();
      colors.green = random();
      colors.blue = random();
    } else {
      colors.red = colors.green = colors.blue = random();
    }
    return `#${colors.red}${colors.green}${colors.blue}`;
  }

  function randomSize(min = 20, max = 40) {
    let r = Math.floor(Math.random() * (max - min) + min);
    return `${r}px`;
  }

  function forEachInTextarea(cb) {
    let txt = text.value;
    for (let i = 0; i < txt.length; i++) {
      const unit = txt[i];
      cb(unit, i, txt)
    }
  }

  function random() {
    const r = Math.floor(Math.random() * 256);
    return r.toString(16);
  }

  function clear() {
    const content = document.querySelector('#content');
    content.textContent = '';
  }

  function initCustomRadioButtons() {
    const groups = getNodes('.custom-radio-group');

    groups.forEach(group => {
      const inputs = group.querySelectorAll('.custom-radio')
      inputs.forEach((radio) => {
        const handler = eventHandler(inputs)
        radio.addEventListener('click', handler);
      })
    });

    function eventHandler(inputs) {
      return function handler(event) {
        const className = 'custom-radio-active';
        inputs.forEach(input => {
          input.classList.remove(className);
          input.removeAttribute('checked');
        });
        const { classList } = event.target;
        const checked = classList.contains(className);
        if (!checked) {
          classList.add(className);
          event.target.setAttribute('checked', 'checked');
        }
      }
    }
  }

  function getUniqName() {
    const date = new Date();
    const string = date.getDate() + "-"
      + (date.getMonth()+1)  + "-"
      + date.getFullYear() + "_"
      + date.getHours() + ":"
      + date.getMinutes() + ":"
      + date.getSeconds();
    return 'maniac-font_' + string;
  }

  function savePng() {
    const doc = document.querySelector("#content");
    console.log(123);
    html2canvas(doc, { backgroundColor: null })
      .then(canvas => {
        const image = canvas.toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        console.log(image);
        const a = document.createElement('a');
        a.href = image;
        const fileName = getUniqName();
        console.log(fileName);
        a.download = fileName + '.png';
        a.click();
      });
  }
})

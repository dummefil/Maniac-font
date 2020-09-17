document.addEventListener('DOMContentLoaded', () => {
  //todo word wrapping, not only letter
  //todo fix bug where font is not load at start

  const text = getNode('#text');
  const generateButton = getNode('#generate-button');
  const canvasNode = getNode('canvas');
  const saveButton = getNode('#save-button');
  const canvasContext = canvasNode.getContext('2d');
  const canvasWidth = canvasNode.width;
  const canvasHeight = canvasNode.height;

  function getNodes(tag) {
    return document.querySelectorAll(tag);
  }

  function getNode(tag) {
    return document.querySelector(tag);
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
    clear(canvasContext);

    const radioInput = getNode("[checked]");
    const fontSizeMinNode = getNode("#fontSizeMin");
    const fontSizeMaxNode = getNode("#fontSizeMax");
    const fontSizeMin = parseInt(fontSizeMinNode.value || fontSizeMinNode.placeholder);
    const fontSizeMax = parseInt(fontSizeMaxNode.value || fontSizeMaxNode.placeholder);

    const radioColor = radioInput.getAttribute('value');
    init(fontSizeMin, fontSizeMax, radioColor, canvasContext);
  }


  function init(fMin, fMax, colorType, ctx) {
    let lastXPos;
    let lastYPos;
    forEachInTextarea((letter) => {
      const size = getRandomSize(fMin, fMax);
      const color = getRandomColor(colorType);
      const { x, y } = calculatePos(size, lastXPos, lastYPos);
      lastYPos = y;
      lastXPos = x;
      const options = { size, color, x, y };
      drawLetter(letter, options, ctx);
    })
  }

  function calculatePos(size, lastXPos, lastYPos = size + 10) {
    //todo normalize line spacing
    const lineXSpacing = 20;
    const lineYSpacing = 40;
    let x;
    if (lastXPos === undefined) {
      lastXPos = 0;
      x = lastXPos;
    } else {
      x = lastXPos + lineXSpacing;
    }

    let y = lastYPos;
    if (x + size > canvasWidth) {
        y = lastYPos + lineYSpacing;
        x = 0;
    }
    return { x, y };
  }

  function drawLetter(letter, options, ctx) {
    const { color, size, x, y } = options;
    ctx.font = `${size}px Barrio`;
    ctx.fillStyle = color;
    ctx.fillText(letter, x, y);
  }

  function getRandomColor(colorType) {
    let red, green, blue;
    if (colorType === "RGB") {
      red = random();
      green = random();
      blue = random();
    } else {
      red = green = blue = random();
    }
    return `#${red}${green}${blue}`;
  }

  function getRandomSize(min = 20, max = 40) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function forEachInTextarea(cb) {
    let txt = text.value;
    for (let i = 0; i < txt.length; i++) {
      const letter = txt[i];
      cb(letter, i, txt)
    }
  }

  function random() {
    const r = Math.floor(Math.random() * 256);
    return r.toString(16);
  }

  function clear(ctx) {
    //todo initial canvas color background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
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
    html2canvas(canvasNode, { backgroundColor: null })
      .then(canvas => {
        const image = canvas.toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        const a = document.createElement('a');
        a.href = image;
        const fileName = getUniqName();
        a.download = fileName + '.png';
        a.click();
      });
  }
})

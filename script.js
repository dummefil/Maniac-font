document.addEventListener('DOMContentLoaded', () => {
  //todo word wrapping, not only letter
  //todo fix bug where font is not load at start

  const text = getNode('#text');
  const canvasNode = getNode('canvas');
  const saveButton = getNode('#save-button');

  //mb it will fix image bug, dunno
  let canvasContext;
  let canvasWidth;
  let canvasHeight;
  updateCanvasVars();
  function updateCanvasVars() {
    canvasContext = canvasNode.getContext('2d');
    canvasWidth = canvasNode.width;
    canvasHeight = canvasNode.height;
  }

  function getNodes(selector) {
    return document.querySelectorAll(selector);
  }

  function getNode(selector) {
    return document.querySelector(selector);
  }

  initCustomRadioButtons();
  generateText();

  function generateEventWrapper(className, eventType) {
    getNodes(className).forEach((node) => {
      node.addEventListener(eventType, () => {
        generateText();
      })
    })
  }

  generateEventWrapper('.color-button', 'click');
  generateEventWrapper('.text-area', 'input');
  generateEventWrapper('.font-input', 'input');
  saveButton.onclick = savePng;
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      generateText();
    }
  })

  function generateText() {
    clear(canvasContext);

    const colorButton = getNode(".color-button.active");
    const fontSizeMinNode = getNode("#fontSizeMin");
    const fontSizeMaxNode = getNode("#fontSizeMax");
    const fontSizeMin = parseInt(fontSizeMinNode.value || fontSizeMinNode.placeholder);
    const fontSizeMax = parseInt(fontSizeMaxNode.value || fontSizeMaxNode.placeholder);

    const radioColor = colorButton.getAttribute('value');
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
    const buttons = getNodes('.color-button');

    let activeButton = getNode('.color-button.active');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        activeButton.classList.remove('active');
        button.classList.add('active');
        activeButton = button;
      });
    });
  }

  function getUniqName() {
    const date = new Date();
    const string = date.getDate() + "-"
      + (date.getMonth() + 1) + "-"
      + date.getFullYear() + "_"
      + date.getHours() + ":"
      + date.getMinutes() + ":"
      + date.getSeconds();
    return 'maniac-font_' + string;
  }

  function savePng() {
    updateCanvasVars();
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

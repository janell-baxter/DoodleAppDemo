// ml5.js: Classifying Drawings with DoodleNet (Mouse)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/9.1-doodlenet.html
// https://youtu.be/ABN_DWnM5GQ

// Template: https://editor.p5js.org/codingtrain/sketches/AHgkwgPdc
// Mouse: https://editor.p5js.org/codingtrain/sketches/6LLnGY1VY
// Video: https://editor.p5js.org/codingtrain/sketches/fxFKOn3il

// Super Awesome Doodle App
// Janell Baxter, 2026

// variables
const identifierOrNameOfVariable = "hello";

let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

function setup() {
  canvas = createCanvas(400, 400);
  clearButton = createButton('reset');
  //strange - function()
  clearButton.mousePressed(clearCanvas);
  setBackgroundColor();
  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  resultsDiv = createDiv('model loading');
}

function modelReady() {
  console.log('model has been loaded');
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(results);
  let content = `<p>I am ${nf(100 * results[0].confidence, 2, 1)}% confident that you are drawing: ${results[0].label}.</p>
                 <p>However, it also looks like you are drawing 
                 ${results[1].label}, ${results[2].label}, and maybe ${results[3].label}.</p>`;

  resultsDiv.html(content);
  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  setBackgroundColor();
}
function setBackgroundColor()
{
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

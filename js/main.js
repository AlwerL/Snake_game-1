document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const blockSize = 10;

const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;

let score = 0;

const drawBorder = () => {
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height)
}

const drawScore = () => {
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillStyle = "Black";
  ctx.font = "20px Comic Sans MS"
  ctx.fillText("Score: " + score, blockSize + 2, blockSize + 2);
}

const gameOver = () => {
  clearInterval(idInterval);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "Black";
  ctx.font = "60px Comic Sans MS"
  ctx.fillText("Game Over", width / 2, height / 2);
}

const idInterval = setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  drawBorder();
  drawScore()
}, 100)


setTimeout(gameOver, 3000)

































});
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

const circle = function(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

const Block = function(col, row) {
  this.col = col;
  this.row = row;
}

Block.prototype.drawSquare = function(color) {
  const x = this.col * blockSize;
  const y = this.row * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
}

Block.prototype.drawCircle = function(color) {
  const centerX = this.col * blockSize + blockSize / 2;
  const centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
}

Block.prototype.equal = function(otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};

const Snake = function() {

  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];

  this.direction = "right";
  this.nextDirection = "right";
}

Snake.prototype.draw = function() {
  this.segments.forEach(val => {
    val.drawSquare("blue")
  })
};


const idInterval = setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  drawBorder();
  drawScore();
}, 100)


setTimeout(gameOver, 3000)

































});
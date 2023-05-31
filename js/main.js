document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const directions = {
  KeyA: "left",
  KeyW: "up",
  KeyD: "right",
  KeyS: "down",
  ArrowLeft: "left",
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down"
};

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

const drawBackground = (color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0,0, width, height);
}

const gameOver = () => {
  ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  ctx.fillStyle = "Black";
  ctx.font = "900 30px Comic Sans MS"
  ctx.fillText("Герыч дашь в попку?", width / 2, height / 2);
  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  ctx.fillStyle = "Black";
  ctx.font = "900 40px Comic Sans MS"
  ctx.fillText("Score: " + score, width / 2, height / 1.7);
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
  for(let i = 0; i < this.segments.length; i++) {
    if (i === 0) {
      this.segments[i].drawSquare("rgb(27, 24, 21)")
    } else if (Number.isInteger(i / 2)) {
      this.segments[i].drawSquare("rgb(225, 88, 0)")
    } else {
      this.segments[i].drawSquare("orange")
    }
  }
};

Snake.prototype.checkCollision = function(head) {
  const leftColl = (head.col === 0); 
  const topColl = (head.row === 0)
  const rightColl = (head.col === widthInBlocks - 1);
  const downColl = (head.row === heightInBlocks - 1);

  const wallColl = leftColl || rightColl || topColl || downColl;

  let selfColl = false;

  for (let i = 0; i  < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfColl = true;
    }
  }

  return wallColl || selfColl;
}

Snake.prototype.move = function() {

  const head = this.segments[0];
  let newHead = null;

  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  }

  if (this.checkCollision(newHead)) {
    statusGame = false;
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
    apple.changeColor();
    score++;
    if (animationTime > 35) {
      animationTime -= 0.3;
    }
    apple.move();
  } else {
    this.segments.pop();
  }
}

Snake.prototype.setDirection = function(newDirection) {
  if (this.direction === "up" && newDirection === "down") {
    return;
  } else if (this.direction === "right" && newDirection === "left") {
    return;
  } else if (this.direction === "down" && newDirection === "up") {
    return;
  } else if (this.direction === "left" && newDirection === "right") {
    return;
  }

  this.nextDirection = newDirection;
}

document.addEventListener("keydown", (e) => {
  const newDirection = directions[e.code]
  if (newDirection !== undefined) {
    snake.setDirection(newDirection);
  }
})

const Apple = function() {
  this.position = new Block(10, 10);
  this.color = {
    R: 255,
    G: 0,
    B: 0
  };
};

Apple.prototype.changeColor = function() {
  const gRange = Math.floor(Math.random() * 256);
  this.color.G = gRange;
}

Apple.prototype.draw = function() {
  const color = `rgb(${this.color.R}, ${this.color.G}, ${this.color.B})`
  this.position.drawCircle(color);
}

Apple.prototype.move = function() {
  const col = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  const row = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(col, row);

  snake.segments.forEach(val => {
    if(val.equal({col, row})) {
      this.move();
      return;
    }
  })
}

const apple = new Apple();
const snake = new Snake();

let animationTime = 100;
let statusGame = true;

const gameLoop = () => {
  if (statusGame) {
    ctx.clearRect(0, 0, width, height);
    drawBackground("rgb(31, 100, 26)");
    snake.move();
    snake.draw();
    apple.draw();
    if(!statusGame) {
      drawBackground("rgb(31, 100, 26)");
      gameOver()
    };
    drawBorder();
    setTimeout(gameLoop, animationTime);
  } 
}

gameLoop();

});
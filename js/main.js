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
  clearInterval(idInterval);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "Black";
  ctx.font = "60px Comic Sans MS"
  ctx.fillText("Game Over", width / 2, height / 2);
  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  ctx.fillStyle = "Black";
  ctx.font = "40px Comic Sans MS"
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
      this.segments[i].drawSquare("black")
    } else if (Number.isInteger(i / 2)) {
      this.segments[i].drawSquare("orange")
    } else {
      this.segments[i].drawSquare("blue")
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
    gameOver();
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
    apple.changeColor();
    score++;
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
  const randCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  const randRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(randCol, randRow);
}

const apple = new Apple();
const snake = new Snake();

const idInterval = setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  drawBackground("rgb(0, 140, 3)")
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
}, 100)

});
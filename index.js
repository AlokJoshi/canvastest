import "./style.css";

let canvas = document.getElementById("app");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
const startX = 100;
const startY = 100;
const endX = 600;
const endY = 600;
const speed = 1;
const rects = 3;
const ptGap = 5;
const r = 200;
const d = 2;
const points = [];
let i = 0;

ctx.lineWidth = 0.1;
ctx.strokeStyle = "rgb(0,0,255)";
ctx.beginPath();
//ctx.arc(startX, startY, r, 0, Math.PI, false);
// ctx.moveTo(100, 100);
// ctx.lineTo(100, 300);
// ctx.lineTo(400, 300);
// ctx.lineTo(150, 120);
ctx.moveTo(startX, startY);
//ctx.quadraticCurveTo(500, 500, endX, endY);
ctx.bezierCurveTo(200, -100, 300, 850, endX, endY);
ctx.stroke();

function onCanvasClick(event) {
  i = 0;
  canvas.removeEventListener("click", onCanvasClick);
  performAnimation();
}
canvas.addEventListener("click", onCanvasClick);

const performAnimation = () => {
  const request = requestAnimationFrame(performAnimation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let iRect = 0; iRect < rects; iRect++) {
    let ptAdjust = iRect * ptGap;
    let p1 = points[i - ptAdjust];
    let p2 = points[i + 1 - ptAdjust];
    let rad;
    if (i - ptAdjust > -1) {
      if (p2) {
        rad = Math.atan((p2.y - p1.y) / (p2.x - p1.x));
      }
      ctx.save();
      if (iRect === 0) ctx.fillStyle = "Red";
      ctx.translate(p1.x + 4, p1.y + 2);
      ctx.rotate(rad);
      ctx.translate(-(p1.x + 4), -(p1.y + 2));
      ctx.fillRect(p1.x, p1.y, 10, 4);
      ctx.restore();
    }
  }

  i += Math.floor(Math.random() + speed);
  if (i >= points.length) i = 0;
};

//we start at the first point in the curve
//let data = ctx.getImageData(newX - d, newY - d, 2 * d + 1, 2 * d + 1).data;
//ctx.fillRect(newX - d, newY - d, 2 * d + 1, 2 * d + 1);

//console.log(data.length);

let xFound = 0,
  yFound = 0;

function scanNeighbors2(n, x, y, endx, endy) {
  //given the x and y of a pixel
  //this function searches the neighborhood and recursively
  //calls the same function if a neighbor is found

  //get image data of the neighboring pixels
  let data = ctx.getImageData(x - d, y - d, 2 * d + 1, 2 * d + 1).data;
  let found = false;
  //console.log(data.length);
  for (let x_ = -d; x_ < d + 1; x_++) {
    for (let y_ = -d; y_ < d + 1; y_++) {
      if (x_ == -d || x_ == d || y_ == -d || y_ == d) {
        i = ((y_ + d) * (2 * d + 1) + x_ + d) * 4;
        console.log(data[i], data[i + 1], data[i + 2], data[i + 3]);
        if (
          data[i] === 0 &&
          data[i + 1] === 0 &&
          data[i + 2] === 255 &&
          data[i + 3] >= 13
        ) {
          xFound = x + x_;
          yFound = y + y_;
          if (Math.abs(xFound - endx) < 4 && Math.abs(yFound - endy) < 4) {
            points.push({ n: n, x: endx, y: endy });
            return;
          }
          if (!alreadySelected(xFound, yFound)) {
            console.log(`Pushed: ${xFound}, ${yFound}`);
            //push the item into a points array
            points.push({ n: n, x: xFound, y: yFound });
            //and call this function recursively
            found = true;
            scanNeighbors2(n + 1, xFound, yFound, endx, endy);
          }
        }
      }
    }
  }
  if (!found) return;
}

function alreadySelected(x, y) {
  return (
    points.findIndex(p => Math.abs(p.x - x) < 2 && Math.abs(p.y - y) < 2) !== -1
  );
}

points.push({ n: 0, x: startX, y: startY });
scanNeighbors2(0, startX, startY, endX, endY);
console.log(points.length);
console.log(JSON.stringify(points));

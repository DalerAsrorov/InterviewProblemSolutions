// Given two rectangle coordinates (x1, y1) is bottom left corner and (x2, y2) is top right corner.

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const p1 = new Point(0, 0);
const p2 = new Point(1, 1);
const p3 = new Point(1, 1);
const p4 = new Point(2, 1);

const RECT1 = [p1, p2];
const RECT2 = [p3, p4];

const isRectangleOverlap = (rect1, rect2) => {
  if (rect1[0].x >= rect2[1].x || rect2[0].x >= rect1[1].x) {
    return false;
  }
  if (rect1[1].y <= rect2[0].y || rect2[1].y <= rect1[0].y) {
    return false;
  }

  return true;
};

console.log(isRectangleOverlap(RECT1, RECT2));

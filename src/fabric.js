import * as fabric from "fabric";
import Engine from "./engine";

class OptimisedRect extends fabric.Rect {
  // Do your changes here

  // calcOwnMatrix() {
  //   const center = this.getRelativeCenterPoint();
  //   const matrix = fabric.util.createTranslateMatrix(center.x, center.y);
  //   return matrix;
  // }

  // render(ctx) {
  //   ctx.save();
  //   this.transform(ctx);

  //   this.drawObject(ctx);
  //   this.dirty = false;
  //   ctx.restore();
  // }

  // _render(ctx) {
  //   ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
  //   ctx.fillStyle = 'white';
  //   ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
  // }
}

export class FabricEngine extends Engine {
  constructor() {
    super();
    const canvas = document.createElement("canvas");
    this.content.appendChild(canvas);
    this.fabricCanvas = new fabric.StaticCanvas(canvas, {
      width: this.width,
      height: this.height,
      enableRetinaScaling: true,
      renderOnAddRemove: false,
    });
    window.canvas = this.fabricCanvas;
  }

  animate = () => {
    const rects = this.rects;
    for (let i = 0; i < this.count.value; i++) {
      const r = rects[i];
      r.x -= r.speed;
      r.el.left = r.x;
      if (r.x + r.size < 0) {
        r.x = this.width + r.size;
      }
    }
    this.fabricCanvas.requestRenderAll();
    this.meter.tick();

    this.request = requestAnimationFrame(this.animate);
  };

  render() {
    // clear the canvas
    this.fabricCanvas.clear();
    this.cancelAnimationFrame(this.request);

    // rectangle creation
    const rects = new Array(this.count);
    for (let i = 0; i < this.count.value; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const size = 10 + Math.random() * 40;
      const speed = 1 + Math.random();

      const fRect = new OptimisedRect({
        width: size,
        height: size,
        fill: "white",
        stroke: "black",
        left: x,
        top: y,
        objectCaching: false,
        originX: "center",
        originY: "center",
      });
      rects[i] = { x, y, size: size / 2, speed, el: fRect };
    }
    this.rects = rects;
    this.fabricCanvas.add(...rects.map((rect) => rect.el));

    this.request = requestAnimationFrame(this.animate);
  }
}

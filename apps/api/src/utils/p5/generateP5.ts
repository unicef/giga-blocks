import { createCanvas } from 'canvas';
import p5 from 'p5';

export const generateImage = (p5Script, width, height) => {
  const canvas = createCanvas(width, height);
  const sketch = () => {
    eval(p5Script);
  };
  new p5(sketch);
  return canvas.toBuffer('image/png');
};

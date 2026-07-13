// Shared mutable bridge between the DOM name-reveal overlay and the WebGL scene's
// render loop, so hovering the name can dim visible photo tiles without threading
// React state through the canvas tree.
export const canvasDimState = {
  current: 1,
  target: 1,
};

export function setCanvasDimTarget(value: number): void {
  canvasDimState.target = value;
}

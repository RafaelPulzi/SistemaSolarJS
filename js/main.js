import { setUniversoBackground } from "./universo.js";
import { styleScrollbar } from "./styleScrollb.js";
import { initializeCanvas } from "./canva.js";

styleScrollbar();
setUniversoBackground();
initializeCanvas();


/*
function drawLight() {
  ctx.beginPath();
  ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
  var gradient = ctx.createRadialGradient(
    light.x,
    light.y,
    0,
    light.x,
    light.y,
    1000
  );
  gradient.addColorStop(0, "#3b4654");
  gradient.addColorStop(1, "#2c343f");
*/


function main() {
  const canvas = document.getElementById("webgl");
  const ctx = canvas.getContext("webgl");
  ctx.clearColor(0.0, 0.0, 1.0, 1.0);
  ctx.clear(ctx.COLOR_BUFFER_BIT);
}

function main() {
  const canvas = document.getElementById("example");

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(0, 0, 255, 1.0)"; // 填充颜色
  ctx.fillRect(120, 100, 150, 150); // 填充矩形
}

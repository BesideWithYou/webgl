function main() {
  // 顶点着色器
  const VSHADER_SOURCE = `
  // 存储限定符 变量类型  变量名
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position; // 设置坐标
    gl_PointSize = 10.0; // 设置尺寸
  }
  `;

  // 片元着色器
  const FSHADER_SOURCE = `
  // 精度限定值 中等
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor; // 设置颜色
  }
  `;

  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    return;
  }
  // 使用 getAttribLocation 获取变量存储位置
  const aPosition = gl.getAttribLocation(gl.program, "a_Position");
  if (aPosition < 0) {
    console.log("Faild to get the location of a_Position");
    return;
  }

  const uFragColor = gl.getUniformLocation(gl.program, "u_FragColor");

  // 设置 canvas 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const gPoints = [];
  canvas.addEventListener("mousedown", (e) =>
    click(e, gl, canvas, aPosition, uFragColor)
  );

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
}

const gPoints = [];
const gColors = [];
function click(e, gl, canvas, aPosition, uFragColor) {
  let x = e.clientX;
  let y = e.clientY;
  const rect = e.target.getBoundingClientRect();

  // 要先将浏览器坐标系转到 canvas 坐标系下，再转到 webgl 坐标系下
  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  gPoints.push([x, y]);
  // 第一象限
  if (x >= 0 && y >= 0) {
    gColors.push([1.0, 0.0, 0.0, 1.0]); // 红色
  } else if (x < 0.0 && y < 0.0) {
    gColors.push([0.0, 1.0, 0.0, 1.0]); // 绿色
  } else {
    gColors.push([1.0, 1.0, 1.0, 1.0]); // 白色
  }
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < gPoints.length; i++) {
    const xy = gPoints[i];
    const rgba = gColors[i];

    gl.vertexAttrib3f(aPosition, xy[0], xy[1], 0.0);
    gl.uniform4f(uFragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    /**
     * @param mode 指定绘图的方式，gl.POINTS, gl.LINES, gl.LINE_STRIP...
     * @param first 指定从哪个顶点开始绘制
     * @param count 指定绘制多少个顶点
     */
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

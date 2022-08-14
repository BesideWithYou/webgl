function main() {
  // 顶点着色器
  const VSHADER_SOURCE = `
  // 存储限定符 变量类型  变量名
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position; // 设置坐标
    gl_PointSize = a_PointSize; // 设置尺寸
  }
  `;

  // 片元着色器
  const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(0.5, 1.0, 1.0, 1.0); // 设置颜色
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

  const aPointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  if (aPointSize < 0) {
    console.log("Faild to get the location of aPointSize");
    return;
  }
  // 将数据 v0 v1 v2 传给由 location 参数指定的 attribute 变量
  gl.vertexAttrib1f(aPointSize, 15.0);

  // 设置 canvas 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const gPoints = [];
  canvas.addEventListener("mousedown", (e) => click(e, gl, canvas, aPosition));

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
}

const gPoints = [];
function click(e, gl, canvas, aPosition) {
  let x = e.clientX;
  let y = e.clientY;
  const rect = e.target.getBoundingClientRect();

  // 要先将浏览器坐标系转到 canvas 坐标系下，再转到 webgl 坐标系下
  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  gPoints.push(x);
  gPoints.push(y);
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < gPoints.length; i += 2) {
    gl.vertexAttrib3f(aPosition, gPoints[i], gPoints[i + 1], 0.0);

    // 执行顶点着色器，按照mode参数指定的方式来进行绘图
    /**
     * @param mode 指定绘图的方式，gl.POINTS, gl.LINES, gl.LINE_STRIP...
     * @param first 指定从哪个顶点开始绘制
     * @param count 指定绘制多少个顶点
     */
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

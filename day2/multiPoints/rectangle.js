// 获取 webgl 上下文
// 初始化着色器
// 设置点的坐标信息
// 设置 canvas 背景色
// 清空 canvas
// 绘制

const VSHADER_SOURCE = `
      attribute vec4 a_Position;
      void main() {
        gl_Position = a_Position;
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

function main() {
  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    return;
  }

  // 设置顶点位置
  const n = initVertexBuffers(gl);

  if (n < 0) {
    console.log("faild to set the positions of the vertices");
    return;
  }

  // 设置背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 第二个参数表示从缓冲区第一个坐标开始画起
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function initVertexBuffers(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5,
  ]);
  // 点的个数
  const n = 4;

  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("faild to create the buffer object");
    return -1;
  }

  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // 将缓冲区对象写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, "a_Position");
  if (aPosition < 0) {
    console.log("Faild to get the location of aPointSize");
    return;
  }
  // 将缓冲区对象分配给 a_Position变量
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  // 连接 aPosition 变量与分配给它的缓冲区对象
  // 让着色器能够访问到缓冲区内的数据
  gl.enableVertexAttribArray(aPosition);

  return n;
}

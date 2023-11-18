
function GLBuilder() {

}

GLBuilder.prototype.initProgram = function() {
    var fgShader = utils.getShader(gl, "shader-fs");
    var vxShader = utils.getShader(gl, "shader-vs");

    prg = gl.createProgram();
    gl.attachShader(prg, vxShader);
    gl.attachShader(prg, fgShader);
    gl.linkProgram(prg);

    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(prg);
    prg.vertexPosition = gl.getAttribLocation(prg, "aVertexPosition");
    gl.enableVertexAttribArray(prg.vertexPosition);

    prg.vertexColor = gl.getAttribLocation(prg, "aVertexColor");
    gl.enableVertexAttribArray(prg.vertexColor);

};

GLBuilder.prototype.initWebGL = function() {
    gl = utils.getGLContext('cnv_layer1');
    this.initProgram();
    this.initializeBuffers();
};

GLBuilder.prototype.resetFrameBuffer = function() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
};

GLBuilder.prototype.initializeBuffers = function() {
    drawTng.initFanBuffer();
    drawTng.initStripBuffer();
    drawTng.initTriangleBuffer();
};

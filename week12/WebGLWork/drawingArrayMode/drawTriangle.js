
function DrawTriangle() {
    this.fanVertexBuffer = null;
    this.fanColorBuffer = null;
    this.stripVertexBuffer = null;
    this.trianglesVertexBuffer = null;
    this.trianglesColorBuffer = null;
}

DrawTriangle.prototype.initFanBuffer = function() {

    //set vertices buffer
    var fanVertices = [
        -0.5, 0.5, 0.0, //Vertex 0
        -0.5, -0.5, 0.0, //Vertex 1
        0.5, -0.5, 0.0, //Vertex 2                    
        0.5, 0.5, 0.0       //Vertex 3  
    ];

    this.fanVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.fanVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fanVertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.fanVertexBuffer.itemSize = 3;
    this.fanVertexBuffer.numItems = 4;


    //set color buffer
    var fanColor = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 0.0, 1.0
    ];

    this.fanColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.fanColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fanColor), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.fanColorBuffer.itemSize = 4;
    this.fanColorBuffer.numItems = 4;

};

// after drawing the first triangle from the first three vertices
// each next vertex is connected with the previous two vertices
DrawTriangle.prototype.initStripBuffer = function() {
    var stripVertices = [
        -0.5, -0.5, 0.0, //Vertex 1
        -0.5, 0.5, 0.0, //Vertex 0                    
        0.5, -0.5, 0.0, //Vertex 2                       
        0.5, 0.5, 0.0 //Vertex 3
    ];

    //create buffers
    this.stripVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.stripVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stripVertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.stripVertexBuffer.itemSize = 3;
    this.stripVertexBuffer.numItems = 4;

};

DrawTriangle.prototype.initTriangleBuffer = function() {
    var trianglesVertices = [
        -0.5, -0.5, 0.0, //Vertex 0
        -0.5, 0.5, 0.0, //Vertex 0                    
        0.5, -0.5, 0.0, //Vertex 2                       
        0.5, 0.5, 0.0, //Vertex 3
        -0.5, 0.5, 0.0, //Vertex 4    
        0.5, -0.5, 0.0 //Vertex 5       
    ];

    //create buffers
    this.trianglesVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglesVertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.trianglesVertexBuffer.itemSize = 3;
    this.trianglesVertexBuffer.numItems = 6;


    //set color buffer
    var triangleColor = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 1.0, 1.0,
        1.0, 0.0, 1.0, 1.0
    ];

    this.trianglesColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleColor), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.trianglesColorBuffer.itemSize = 4;
    this.trianglesColorBuffer.numItems = 6;

};

DrawTriangle.prototype.drawTriangles = function() {
    //this.resetFrameBuffer();
    glBuilder.resetFrameBuffer();

    //draw
    var mode = $("#selDrawMode option:selected").text().trim();
    console.log(mode);

    // 4 means there are four vertices in total
    // gl.TRIANGLE_FAN must be used to create square out of the given vertices
    // gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    switch (mode) {
        case "TRIANGLE_FAN":
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.fanColorBuffer);
                gl.vertexAttribPointer(prg.vertexColor, this.fanColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.fanVertexBuffer);
                gl.vertexAttribPointer(prg.vertexPosition, this.fanVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.drawArrays(gl.TRIANGLE_FAN, 0, this.fanVertexBuffer.numItems);  //4 number of vertices
                break;
            }
        case "TRIANGLES":
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesColorBuffer);
                gl.vertexAttribPointer(prg.vertexColor, this.trianglesColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesVertexBuffer);
                gl.vertexAttribPointer(prg.vertexPosition, this.trianglesVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.drawArrays(gl.TRIANGLES, 0, this.trianglesVertexBuffer.numItems);      //6 number of vertices
                break;
            }
        case "TRIANGLE_STRIP":
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.stripVertexBuffer);
                gl.vertexAttribPointer(prg.vertexPosition, this.stripVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.stripVertexBuffer.numItems);  //6 number of vertices
                break;
            }
        default:
        //nothing to do
    }
};

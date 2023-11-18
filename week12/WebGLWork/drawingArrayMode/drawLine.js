function DrawLine() {
    //this.lineLoopBuffer = null;
    //this.lineStripBuffer = null;
    this.linesBuffer = null;    
    this.linesColorBuffer = null;

    this.lineVertices = [
        -0.75, -0.5, 0,
        -0.25, 0.5, 0,
        0.25, -0.5, 0,
        0.75, 0.5, 0
    ];

    this.lineVColors = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 1.0
    ];
}


DrawLine.prototype.initLinesBuffer = function() {

    this.linesColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.linesColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.lineVColors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.linesColorBuffer.itemSize = 4;
    this.linesColorBuffer.numItems = 4;

    this.linesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.linesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.lineVertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.linesBuffer.itemSize = 3;
    this.linesBuffer.numItems = 4;
};

DrawLine.prototype.drawLines = function() {
    glBuilder.resetFrameBuffer();

    //draw
    var mode = $("#selLineMode option:selected").text().trim();
    var lineWidth = $("#selLineWidth option:selected").text().trim();

    console.log(mode);
    
    gl.lineWidth(parseInt(lineWidth));
    
    switch (mode) {
        case "LINE_LOOP":
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.linesColorBuffer);
                gl.vertexAttribPointer(prg.vertexColor, this.linesColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.linesBuffer);
                gl.vertexAttribPointer(prg.vertexPosition, this.linesBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.drawArrays(gl.LINE_LOOP, 0, this.linesBuffer.numItems);  //6 number of vertices
                break;
            }
        case "LINES":
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.linesColorBuffer);
                gl.vertexAttribPointer(prg.vertexColor, this.linesColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.linesBuffer);
                gl.vertexAttribPointer(prg.vertexPosition, this.linesBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.drawArrays(gl.LINES, 0, this.linesBuffer.numItems);  //6 number of vertices
                break;
            }
        case "LINE_STRIP":
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.linesColorBuffer);
                gl.vertexAttribPointer(prg.vertexColor, this.linesColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.linesBuffer);
                gl.vertexAttribPointer(prg.vertexPosition, this.linesBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.drawArrays(gl.LINE_STRIP, 0, this.linesBuffer.numItems);  //6 number of vertices
                break;
            }
        default:
        //nothing to do
    }

};




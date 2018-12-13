function canvas2DDrawer_erase() {
    // Store the current transformation matrix
    //drawingContext.save();
    // Use the identity matrix while clearing the canvas
    this.setTransform(1, 0, 0, 1, 0, 0);
    var width = this.getWidth();
    var height = this.getHeight();
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    console.log('erase ' + width + 'x' + height);

    this.drawingContext.clearRect(0, 0, width, height);
    this.setColor('#FF0000');
    this.drawingContext.strokeStyle = 'red';
    this.penSize(4);
    this.moveTo(0,0);
    this.lineTo(200,200);
    
    this.drawingContext.translate(halfWidth + 0.5, halfHeight / 2 + 0.5);
//    if(drawCrossHairs) {
//        this.drawingContext.beginPath();
//        // Draw crosshairs
//        this.drawingContext.moveTo(-halfWidth, 0);
//        this.drawingContext.lineTo(halfWidth,0);
//        this.drawingContext.moveTo(0, -halfHeight);
//        this.drawingContext.lineTo(0,halfHeight);
//        this.drawingContext.closePath;
//        this.drawingContext.lineWidth = 0.5;
//        this.drawingContext.setColor = "red";
//        this.drawingContext.stroke();
//    }
}

function canvas2DDrawer_penSize(penSize) {
    if(penSize === undefined) {
        return this.drawingContext.lineWidth * 2;
    } else {
//        console.log("canvas2DDrawer.penSize = " + penSize);
        this.drawingContext.lineWidth = penSize / 2;
    }
}

function canvas2DDrawer_setColor(color) {
    this.drawingContext.strokeStyle = color;
    this.drawingContext.fillStyle = color;
//    console.log('setColor ' + color);
}

function canvas2DDrawer_moveTo(x,y) {
    this.drawingContext.beginPath();
    this.drawingContext.moveTo(x,y);
}
function canvas2DDrawer_lineTo(x,y) {
    this.drawingContext.lineTo(x,y);
    this.drawingContext.stroke();
}

function canvas2DDrawer_frameOval(rect) {
    var cx = (rect.left + rect.right) / 2;
    var cy = (rect.top + rect.bottom) / 2;
    var rx = (rect.right - rect.left) / 2;
    var ry = (rect.bottom - rect.top) / 2;
        
    this.drawingContext.save(); // save state
    this.drawingContext.beginPath();

    this.drawingContext.translate(cx-rx, cy-ry);
    this.drawingContext.scale(rx, ry);
    this.drawingContext.arc(1, 1, 1, 0, 2 * Math.PI, false);

    this.drawingContext.restore(); // restore to original state
    this.drawingContext.stroke();
}

function canvas2DDrawer_paintOval(rect) {
    var cx = (rect.left + rect.right) / 2;
    var cy = (rect.top + rect.bottom) / 2;
    var rx = (rect.right - rect.left) / 2;
    var ry = (rect.bottom - rect.top) / 2;
        
    this.drawingContext.save(); // save state
    this.drawingContext.beginPath();

    this.drawingContext.translate(cx-rx, cy-ry);
    this.drawingContext.scale(rx, ry);
    this.drawingContext.arc(1, 1, 1, 0, 2 * Math.PI, false);

    this.drawingContext.restore(); // restore to original state
    this.drawingContext.fill();
}


function canvas2DDrawer_paintRect(rect) {
    var width = (rect.right - rect.left);
    var height = (rect.bottom - rect.top);
    this.drawingContext.fillRect(rect.left, rect.top, width, height);
}
function canvas2DDrawer_frameRect(rect) {
    var width = (rect.right - rect.left);
    var height = (rect.bottom - rect.top);
    this.drawingContext.strokeRect(rect.left, rect.top, width, height);
    
}

function canvas2DDrawer_getHeight() {
    return this.drawingObject.height;
}
function canvas2DDrawer_getWidth() {
    return this.drawingObject.width;
}

function canvas2DDrawer_translate(x,y) {
    this.drawingContext.translate(x,y);
}
function canvas2DDrawer_save() {
    this.drawingContext.save();
}
function canvas2DDrawer_restore() {
    this.drawingContext.restore();
}
function canvas2DDrawer_setTransform(x1, x2, x3, x4, x5, x6) {
    this.drawingContext.setTransform(x1, x2, x3, x4, x5, x6);
}
function canvas2DDrawer_clearRect(x1, x2, x3, x4) {
    this.drawingContext.beginPath();
        
    this.drawingContext.clearRect(x1, x2, x3, x4);
}

function canvas2DDrawer_drawLine(x1, y1, x2, y2) {
    var drawingContext = this.drawingContext;
    drawingContext.beginPath();
    drawingContext.moveTo(x1, y1);
    drawingContext.lineTo(x2, y2);
    drawingContext.stroke();
}

function canvas2DDrawer_stroke() {
    this.drawingContext.stroke();
}




function Canvas2DDrawer(drawingObject) {
    this.drawingObject = drawingObject;
    this.drawingContext = drawingObject.getContext('2d');
    this.getHeight = canvas2DDrawer_getHeight;
    this.getWidth = canvas2DDrawer_getWidth;
    this.penSize = canvas2DDrawer_penSize;
    this.moveTo = canvas2DDrawer_moveTo;
    this.lineTo = canvas2DDrawer_lineTo;
    this.frameRect = canvas2DDrawer_frameRect;
    this.paintRect = canvas2DDrawer_paintRect;
    this.frameOval = canvas2DDrawer_frameOval;
    this.paintOval = canvas2DDrawer_paintOval;
    this.setColor = canvas2DDrawer_setColor;
    this.translate = canvas2DDrawer_translate;
    this.save = canvas2DDrawer_save;
    this.restore = canvas2DDrawer_restore;
    this.setTransform = canvas2DDrawer_setTransform;
    this.erase = canvas2DDrawer_erase;
    this.drawingContext.translate(0.5, 0.5);
    this.clearRect = canvas2DDrawer_clearRect;
    this.drawLine = canvas2DDrawer_drawLine;
    this.stroke = canvas2DDrawer_stroke;
}


_drawerFactorySingleton.registerDrawerType("canvas2d", (
        function(drawingObject) { 
            return new Canvas2DDrawer(drawingObject);}));




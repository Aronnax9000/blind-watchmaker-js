function canvasDrawingContextMoveTo(x, y) {
	this.drawingContext.moveTo(x,y);
}
function canvasDrawingContextLineTo(x, y) {
	this.drawingContext.drawingContext.lineTo(x,y);
}
function canvasDrawingContextPenSize(lineWidth) {
	this.drawingContext.lineWidth = lineWidth / 2;
}
function CanvasDrawingContext(drawingContext) {
	this.drawingContext = drawingContext;
	this.moveTo = canvasDrawingContextMoveTo;
	this.lineTo = canvasDrawingContextLineTo;
	this.penSize = canvasDrawingContextPenSize;
}
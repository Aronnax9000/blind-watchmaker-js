initializeMut();

var drawCrossHairs = false;



function doPerson(biomorphType, canvas) {
    
    var genotype = new Person();
    switch(biomorphType) {
    case "Chess": chess(genotype); break;
    case "BasicTree": basicTree(genotype); break;
    case "Insect": insect(genotype); break;
    case "Saltation": doSaltation(genotype); break;
    }
    develop(genotype, canvas, drawCrossHairs); 
    jQuery.data(canvas, "genotype", genotype);
    $(canvas).trigger('mouseover');

    return genotype;
}
function startAutoReproduce(canvasId, targetCanvasId) {
    autoRunning = true;
    doRepro(canvasId, targetCanvasId);
    measureGenerationRate(Number(document.getElementById('generations').value));
}



function doRepro(sourceCanvas, targetCanvas) {
    doReproduce(sourceCanvas, targetCanvas);
    if(autoRunning)
        setTimeout(function() { 
            doRepro(sourceCanvas, targetCanvas)}, 
                Number(document.getElementById("autoReproduceInterval").value));

}

function eraseCanvasNoCenter(canvas) {
//    console.log("eraseCanvasNoCenter");
    var drawingContext = canvas.getContext("2d");
    // Use the identity matrix while clearing the canvas
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    
    drawingContext.clearRect(0, 0, canvas.width, canvas.height);
}

function eraseCanvas(canvas) {
    // Store the current transformation matrix
    //drawingContext.save();
    var drawingContext = canvas.getContext("2d");
    // Use the identity matrix while clearing the canvas
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    drawingContext.clearRect(0, 0, canvas.width, canvas.height);
    drawingContext.translate(canvas.width / 2 + 0.5, canvas.height / 2 + 0.5);

    if(drawCrossHairs) {
        drawingContext.beginPath();
        // Draw crosshairs
        drawingContext.moveTo(-100, 0);
        drawingContext.lineTo(100,0);
        drawingContext.moveTo(0, -100);
        drawingContext.lineTo(0,100);
        drawingContext.closePath;
        drawingContext.lineWidth = 0.5;
        drawingContext.strokeStyle = "red";
        drawingContext.stroke();
    }
}

function formChanged(canvasId) {
    var form = document.getElementById('engineering');
    var canvas  = document.getElementById(canvasId);
    genotype = jQuery.data(canvas, "genotype");
    genotype.fromForm(form);
    drawCrossHairs = document.getElementById('crosshairs').checked;
    develop(genotype, canvas, drawCrossHairs); 
}

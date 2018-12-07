initializeMut();

var drawCrossHairs = false;
var autoRunning = false;
function initialize(biomorphType, canvasId) {
    doPerson(biomorphType, canvasId);
}

function doPerson(biomorphType, canvasId) {
    var canvas = document.getElementById(canvasId);
    var genotype = new Person();
    switch(biomorphType) {
    case "Chess": chess(genotype); break;
    case "BasicTree": basicTree(genotype); break;
    case "Insect": insect(genotype); break;
    case "Saltation": doSaltation(genotype); break;
    }
    develop(genotype, canvas, drawCrossHairs); 
    genotype.setForm(document.getElementById('engineering'));
    jQuery.data(canvas, "genotype", genotype);
    $('#' + canvasId).trigger('mouseover');

    return genotype;
}
function startAutoReproduce(canvasId, targetCanvasId) {
    autoRunning = true;
    doRepro(canvasId, targetCanvasId);
    measureGenerationRate(Number(document.getElementById('generations').value));
}

function measureGenerationRate(generationsPreviousSecond) {
    var generationCounter = document.getElementById('generations');
    var newGenerationValue = Number(generationCounter.value) + 1;
    generationCounter.value = newGenerationValue;
    document.getElementById('generationRate').value = newGenerationValue - generationsPreviousSecond;
    if(autoRunning)
        setTimeout(function() { measureGenerationRate(newGenerationValue)}, 1000);
    
}

function doRepro(canvasId, targetCanvasId) {
    doReproduce(canvasId, targetCanvasId);
    if(autoRunning)
        setTimeout(function() { doRepro(canvasId, targetCanvasId)}, Number(document.getElementById("autoReproduceInterval").value));

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



 

function doReproduce(canvasId, targetCanvasId) {
//    console.log('sourceId ' + canvasId + ' targetCanvasId ' + targetCanvasId);
    var generationCounter = document.getElementById('generations');
    generationCounter.value = Number(generationCounter.value) + 1;
    var canvas = document.getElementById(canvasId);
    var targetCanvas = document.getElementById(targetCanvasId)
    var genotype = jQuery.data(canvas, "genotype");
    if(genotype != null) {
        var childGenotype = reproduce(genotype);
        jQuery.data(targetCanvas, 'genotype', childGenotype);
        develop(childGenotype, targetCanvas, drawCrossHairs); 
        var form = document.getElementById('engineering');
        genotype.setForm(form);
    }
    else 
        alert("Genotype is null");
    return genotype;
}




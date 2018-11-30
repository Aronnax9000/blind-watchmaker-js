
function initGeneboxes(container) {
    var geneboxes = $("<div></div>").monochrome_geneboxes({engineering: false});
    container.append(geneboxes);
    return geneboxes;
}

$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingBoxes", {
        // default options
        options: {
            rows: 5,
            cols: 3,

            // Callbacks
//          change: null,
//          random: null
        },

        // The constructor
        _create: function() {
            var boxes = this.element;
            $(boxes).attr('id', 'boxes').addClass('boxes');
//          
            this.element.append(boxes);
            var numberOfBoxes = this.options.rows * this.options.cols;
            this.options.numBoxes = numberOfBoxes;
            var midBox = Math.trunc(numberOfBoxes / 2);
            console.log("numberOfBoxes: " + numberOfBoxes + " MidBox: " + midBox);
            for (j = 0; j < numberOfBoxes; j++) {
                var isMidBox = j == midBox;
                var canvas = $("<canvas></canvas>").breedingBox({ 
                    boxIndex: j, 
                    isMidBox: isMidBox, 
                    breedingBoxes: this}).appendTo(boxes);
                if(isMidBox) {
                    this.options.midCanvas = canvas;
                }
            }

            console.log("return from initialize");
            this._refresh();
        },

        // Called when created, and later when changing options
        _refresh: function() {
        },

        // A public method to change the color to a random value
        // can be called directly via .colorize( "random" )
        random: function( event ) {
        },

        _destroy: function() {
        },

        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function( key, value ) {
            this._super( key, value );
        }
    });
} );


function startAutoBreeding() {
    autoRunning = true;
    autoBreed();
    measureGenerationRate(Number(document.getElementById('generations').value));
}

function fitness(biomorph, targetWidth, targetHeight) {
    var margin = biomorph.pic.margin;
    var marginWidth = margin.right - margin.left;
    var marginHeight = margin.bottom - margin.top;
    var widthError = Math.abs(targetWidth - marginWidth) / targetWidth;
    var heightError = Math.abs(targetHeight - marginHeight) / targetHeight;
    var averageError = (widthError + heightError) / 2;
    return averageError;
}

function getBiomorphFromCanvas(canvas) {

    var biomorph = jQuery.data(canvas, 'genotype');
    return biomorph;
}

function autoBreed() {
    if (autoRunning) {
        var useFitness = document.getElementById('useFitness').checked;
        var numBoxes = $('#boxes').breedingBoxes("option", "numBoxes");
        if (useFitness) {
            var canvasId = 'canvas0';
            var canvas = document.getElementById(canvasId);
            var biomorph = getBiomorphFromCanvas(canvas);
            var bestSoFar = canvasId;
            var errorToBeat = fitness(biomorph, canvas.width, canvas.height);
            for (i = 1; i < numBoxes; i++) {
                canvasId = 'canvas' + i;
                canvas = document.getElementById(canvasId);
                var currentError = fitness(getBiomorphFromCanvas(canvas),
                        canvas.width, canvas.height);
                if (currentError < errorToBeat) {
                    bestSoFar = canvasId;
                    errorToBeat = currentError;
                }
            }
            document.getElementById(bestSoFar).click();
        } else {
            var luckyParent = Math.trunc(Math.random() * numBoxes);
            document.getElementById('canvas' + luckyParent).click();
        }
        setTimeout(function() {
            autoBreed()
        }, Number(document.getElementById("autoReproduceInterval").value));
    }

}
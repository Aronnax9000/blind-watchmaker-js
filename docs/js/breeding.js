
function initGeneboxes(container, options) {
    var geneboxes = $("<div></div>").monochrome_geneboxes(options);
    container.append(geneboxes);
    return geneboxes;
}
/*
 * breedingBoxes widget definition
 */
$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingBoxes", {
        // default options
        options: {
            cols: 3,
            numBoxes: 15,
        },

        produceKthOffspring: function (numBoxes, midBox, k, midCanvasDivPosition, recursive) {
            if(k < numBoxes) {
                var sourceId = 'canvas' + midBox;
                var targetId = 'canvas' + k; 
                var targetCanvas = $("#" + targetId);
                targetCanvas.css({ left: "0px", top: "0px" });
                if (k != midBox) {
                    var position = targetCanvas.parent().position();
                    var deltaX = midCanvasDivPosition.left - position.left;
                    var deltaY = midCanvasDivPosition.top - position.top;
                    console.log('offspring ' + targetId + ' offSet ' + deltaX + ',' + deltaY);
                    targetCanvas.css({ left: deltaX, top: deltaY});
                                        
                    doReproduce(sourceId, targetId);
                    if(recursive) {
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0,
                          }, { queue: true, duration: 200, 
                              complete: function() {
                                  var breedingBoxes = $(targetCanvas).parent().breedingBox("option", "breedingBoxes");
                                  breedingBoxes.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                                  console.log('finished animate Offspring ' + targetCanvas.attr('id'));
                          }});
                        
                    } else {
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0,
                          }, { queue: true, duration: 1000, 
                              complete: function() {
                                  console.log('finished animate Offspring ' + targetCanvas.attr('id'));
                          }});
                    }
                } else { // midbox
                    if(recursive) {
                        this.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                    }
                }
            }
        },
        
        produceLitter: function(numBoxes, midBox) {
            var midCanvasDiv = this.options.midCanvasDiv;
            var midCanvasDivPosition = midCanvasDiv.position();
            var recursive = ! document.getElementById('explosiveBreeding').checked;
            if(recursive) {
                this.produceKthOffspring(numBoxes, midBox, 0, midCanvasDivPosition, recursive);
            } else {
                for (k = 0; k < numBoxes; k++) {
                    this.produceKthOffspring(numBoxes, midBox, k, midCanvasDivPosition, recursive);
                }
            }

        },
        
        // The constructor
        _create: function() {
            var boxes = this.element;

            $(boxes).attr('id', 'boxes').addClass('boxes');
            this.element.append(boxes);
            var numBoxes = this.options.numBoxes;
            var midBox = Math.trunc(numBoxes / 2);
            console.log("numberOfBoxes: " + numBoxes + " MidBox: " + midBox);
            for (j = 0; j < numBoxes; j++) {
                var isMidBox = j == midBox;
                var canvasDiv = $("<div></div>").breedingBox({ 
                    boxIndex: j, 
                    isMidBox: isMidBox, 
                    breedingBoxes: this}).appendTo(boxes);
                if(isMidBox) {
                    this.options.midCanvasDiv = canvasDiv;
                }
            }

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
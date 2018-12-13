
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

        sparkLine: function(destinationId) {
            var canvas = document.getElementById('overlayCanvas');
            var context = canvas.getContext('2d');
            var midBox = Math.trunc(this.options.numBoxes / 2);
            var midDiv = $('#canvas' + midBox).parent();
            var midPos = $(midDiv).position();
            var destDiv = $('#' + destinationId).parent();
            var destPos = $(destDiv).position();
            var x0 = Math.trunc(midPos.left + midDiv.width() / 2);
            var y0 = Math.trunc(midPos.top + midDiv.height() / 2);
            var x1 = Math.trunc(destPos.left + destDiv.width() / 2);
            var y1 = Math.trunc(destPos.top + destDiv.height() / 2);
            context.strokeStyle = '#000000';
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.closePath();
            context.stroke();
//          console.log('sparkline ' + destinationId + " (" + x0 + "," + y0 + "), (" + x1 + "," + y1 + ")" );
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
//                  console.log('offspring ' + targetId + ' offSet ' + deltaX + ',' + deltaY);
                    // Move the target canvas to the centre
                    targetCanvas.css({ left: deltaX, top: deltaY});
                    // Grow the offspring on the target canvas
                    doReproduce(sourceId, targetId);
                    if(recursive) { // one at a time
                        this.sparkLine(targetId);
                        // Move the target canvas back into its home position
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0
                        }, { duration: 200, 
                            easing: 'easeOutExpo',
                            progress: function(animation, progress, msRemaining) {
                                var context = $(targetCanvas)[0].getContext("2d");

//                              $('#progress').html(targetCanvas.attr('width') + " " + (100 * progress) + "%");
                            },
                            complete: function() {
                                eraseCanvasNoCenter(document.getElementById('overlayCanvas'));
                                var breedingBoxes = $(targetCanvas).parent().breedingBox("option", "breedingBoxes");
                                breedingBoxes.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                                console.log('finished recursive animate Offspring ' + targetCanvas.attr('id'));
                            }});
                    } else { // Explosive breeding
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0,
                        }, { queue: true, duration: 2000,
                            easing: 'easeOutExpo',
                            complete: function() {
//                              eraseCanvasNoCenter(document.getElementById('overlayCanvas'));
//                              console.log('finished animate Offspring ' + targetCanvas.attr('id'));
                            }});
                    }
                } else { // midbox
                    if(recursive) {
                        this.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                    }
                }
            } else {
                stillBreeding = false;
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

$( function() { 
    $.widget( "dawk.breedingAutoReproduceControl", {
        _create: function() {
            var string = '<div><button onclick="startAutoBreeding();">AutoReproduce</button>\
                <span> with delay of</span> <input type="text"\
                id="autoReproduceInterval" size="5" maxlength="10" value="5000" />\
                milliseconds.\
                <button id="stopAutoReproduce" onclick="autoRunning = false;">Stop</button>\
                </div>'
                var div = $($.parseHTML(string));
            this.element.append(div);
        }
    });
});

$( function() {
    $.widget( "dawk.breedingControl", {
        _create: function() {
            var string = '<div>\
                <input type="checkbox" id="useFitness" /> <span>Use Fitness\
                (Breed based on how well biomorph fits its box) <a\
                href="engineering.html">Engineering</a>\
                </span> <input type="checkbox" id="explosiveBreeding" /> <span>Explosive\
                Breeding </span>\
                </div>';
            var div = $($.parseHTML(string));
            this.element.append(div);
        }
    });
});
$( function() {
    $.widget( "dawk.breedingOffspringCounter", {
        _create: function() {
            var string = '<div>\
                Offspring count: <input type="number" value="0" id="generations" />\
                Offspring per second: <input type="number" value="0"\
                id="generationRate" />\
                </div>'
                var div = $.parseHTML(string);
            this.element.append(div);
        }
    });
});


$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingWindow", {
        _create: function () {
            $(this.element).breedingAutoReproduceControl();
            $(this.element).breedingControl();
            $(this.element).breedingOffspringCounter();
            var geneboxes = initGeneboxes(this.element, {
                numBoxes : 15,
                cols : 5,
                engineering : false
            });
            var container = $("<div></div>");
            container.addClass('container');
            var boxes = $("<div></div>").breedingBoxes();
            var overlay = $("<div></div>");
            overlay.addClass("overlay");
            container.append(overlay);
            container.append(boxes);
            var overlayCanvas = $('<canvas></canvas>');
            overlayCanvas.attr('id', 'overlayCanvas');
            overlayCanvas.attr('width', 1000);
            overlayCanvas.attr('height', 600);
            overlayCanvas.addClass('overlayCanvas');
            overlay.append(overlayCanvas);
            this.element.append(container);
            var numBoxes = boxes.breedingBoxes("option", 'numBoxes');
            var midCanvasDivId = 'canvas' + Math.trunc(numBoxes / 2);
            var cols = boxes.breedingBoxes("option", 'cols');


            initialize("BasicTree", midCanvasDivId);


            $('#' + midCanvasDivId).trigger('mouseover');
            $('#' + midCanvasDivId).trigger('click');
        }})});


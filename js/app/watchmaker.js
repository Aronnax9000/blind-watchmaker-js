

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


//function startAutoReproduce(canvasId, targetCanvasId) {
//    autoRunning = true;
//    doRepro(canvasId, targetCanvasId);
//    measureGenerationRate(Number(document.getElementById('generations').value));
//}

//function doRepro(sourceCanvas, targetCanvas) {
//    doReproduce(sourceCanvas, targetCanvas);
//    if(autoRunning)
//        setTimeout(function() { 
//            doRepro(sourceCanvas, targetCanvas)}, 
//                Number(document.getElementById("autoReproduceInterval").value));
//}

function eraseCanvasNoCenter(canvas) {
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
//    drawingContext.translate(canvas.width / 2 + 0.5, canvas.height / 2 + 0.5);
}


$( function() {
    $.widget('dawk.breedingBox', {
        options: {
            species: null,
            canvas: null,
            boxIndex: null,
            isMidBox: false,
            breedingBoxes: null,
            width: 200,
            height: 200,
        },
        _create: function() {
            this.element.addClass('boxDiv');
            var canvasId = "canvas" + this.options.boxIndex;
            var canvas = $("<canvas></canvas>");
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
            this.options.canvas = canvas;
            this.element.append(canvas);
            if (this.options.isMidBox) {
                canvas.addClass('midBox');
            }

            this._on( canvas, {
                click: "_doCanvasClicked",
                mouseover: "_doMouseOver"
            });
        },
        _doMouseOver: function(event) {
            var parentbreedingView = this.element.parents('.breedingView').get(0);
            var geneboxes = $(parentbreedingView)
                .find('.geneboxes').get(0);
            _speciesFactorySingleton.updateFromCanvas(
                    this.options.species,
                    geneboxes, this.options.canvas)
        },
        _doCanvasClicked: function(event) {
            var canvas = this.options.canvas;
            var position = this.element.position();
            var midCanvasDiv = this.options.breedingBoxes.options.midCanvasDiv;
            var midCanvasDivPosition = midCanvasDiv.position();
            var deltaX = midCanvasDivPosition.left - position.left;
            var deltaY = midCanvasDivPosition.top - position.top;
            var boxes = this.options.breedingBoxes;
            var numBoxes = boxes.options.numBoxes;
            var midBox = Math.trunc(numBoxes / 2);
            var midCanvas = $(this.element).parent().find('.midBox').get(0);
            var genotype = jQuery.data(event.target, 'genotype');
            var breedingBoxes = this.options.breedingBoxes;
            var clickedBoxIndex =  this.options.boxIndex;
            if (genotype != null) {
                // erase the other canvases
                var breedingViewCanvases = $(canvas).parents('.boxes').find('canvas');
                $(breedingViewCanvases).each(function(index) {
                    if(index != clickedBoxIndex) {
                        eraseCanvas(this);
                        $(this).css({left: midCanvasDivPosition.left, top: midCanvasDivPosition.top});
                    }
                });
 
                if (! this.options.isMidBox) {
                    $( canvas ).animate({
                        left: "+=" + deltaX,
                        top: "+=" + deltaY
                    }, { duration: 1000,                               
                        easing: 'easeOutExpo',
                        complete: function() {
                            // Hand the biomorph off to the middle canvas
                            jQuery.data(canvas, 'genotype', null)
                            jQuery.data(midCanvas, 'genotype', genotype)
                            eraseCanvas(this)
                            console.log('handoff complete')
                            // Inform the genotype that it now draws on a different
                            // canvas
                            genotype.drawer = midCanvas
                            $(midCanvas).css({left:0,top:0})
                            genotype.develop()
                            breedingBoxes.produceLitter(numBoxes, midBox)
                        } });
                } else {
                    breedingBoxes.produceLitter(numBoxes, midBox);
                }
            } else {
                // Genotype was null
            } 
            // Update the geneboxes with the genes of the new parent.
            $(midCanvasDiv).trigger("mouseover");
            return false;
        },
    });
});/*
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
            speciesFactory: null,
        },

        sparkLine: function(destinationCanvas) {
            var canvas = $(this.element).parent().find('.overlayCanvas')[0];

            var context = canvas.getContext('2d');
            var midBox = Math.trunc(this.options.numBoxes / 2);
            var parents = $(destinationCanvas).parent();
            
            var midCanvas = $(destinationCanvas).parents('.boxes').find('.midBox').get(0);
            var midDiv = $(midCanvas).parent();
            var midPos = $(midDiv).position();
            var destDiv = $(destinationCanvas).parent();
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
        },

        doReproduce: function (sourceCanvas, targetCanvas) {
            var breedingView = $(sourceCanvas).closest('.breedingView')
            var generations = $(breedingView).find('.generations').get(0)
            generations.value = Number(generations.value) + 1;
            
            var genotype = jQuery.data(sourceCanvas, "genotype");
            if(genotype != null) {
                var childGenotype = genotype.reproduce(targetCanvas);
                jQuery.data(targetCanvas, 'genotype', childGenotype);
                childGenotype.develop(); 
            }
            else  
                alert("Genotype is null");
        },


        produceKthOffspring: function (numBoxes, midBox, k, midCanvasDivPosition, recursive) {
            if(k < numBoxes) {
                var sourceCanvas = $(this.element).find('.midBox').get(0);
                var targetCanvas = $(this.element).find('canvas').get(k);
                $(targetCanvas).css({ left: "0px", top: "0px" });
                if (k != midBox) {
                    var position = $(targetCanvas).parent().position();
                    var deltaX = midCanvasDivPosition.left - position.left;
                    var deltaY = midCanvasDivPosition.top - position.top;
                    // Move the target canvas to the centre
                    $(targetCanvas).css({ left: deltaX, top: deltaY});
                    // Grow the offspring on the target canvas
                    this.doReproduce(sourceCanvas, targetCanvas);
                    if(recursive) { // one at a time
                        this.sparkLine(targetCanvas);
                        // Move the target canvas back into its home position
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0
                        }, { duration: 200, 
                            easing: 'easeOutExpo',
                            complete: function() {
                                var overlayCanvas = $(targetCanvas).parents('.watchmakerView').find('.overlayCanvas')[0];
                                
                                eraseCanvasNoCenter(overlayCanvas);
                                var breedingBoxes = $(targetCanvas).parent().breedingBox("option", "breedingBoxes");
                                breedingBoxes.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                            }});
                    } else { // Explosive breeding
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0,
                        }, { queue: true, duration: 2000,
                            easing: 'easeOutExpo',
                            complete: function() {
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
            var breedingView = $(this.element).closest('.breedingView')
            console.log(breedingView)
            var explosiveBreeding = breedingView.find('.explosiveBreeding').get(0)
            var recursive = ! explosiveBreeding.checked;
            if(recursive) {
                this.produceKthOffspring(numBoxes, midBox, 0, midCanvasDivPosition, recursive);
            } else {
                for (k = 0; k < numBoxes; k++) {
                    this.produceKthOffspring(numBoxes, midBox, k, midCanvasDivPosition, recursive);
                }
            }

        },

        // The constructor
        _create: function(options) {
            var session = this.options.session
            var species = this.options.session.species
            var boxes = this.element
            $(boxes).attr('id', 'boxes').addClass('boxes')
            this.element.append(boxes)
            var numBoxes = this.options.numBoxes
            var midBox = Math.trunc(numBoxes / 2)
            for (j = 0; j < numBoxes; j++) {
                var isMidBox = j == midBox
                var canvasDiv = $("<div></div>").breedingBox({ 
                    boxIndex: j, 
                    isMidBox: isMidBox, 
                    species: species,
                    breedingBoxes: this}).appendTo(boxes)
                if(isMidBox) {
                    // Create a biomorph and render it on the middle canvas.
                    this.options.midCanvasDiv = canvasDiv
                    var canvas = $(canvasDiv).find('canvas').get(0)
                    var biomorph = _speciesFactorySingleton.getSpecies(
                            species, session, canvas)
                    if(this.options.biomorph) {
                        this.options.biomorph.copyBiomorph(biomorph)
                    } else {
                        biomorph.doPerson(session.options.defaultBasicType)
                    }
                    $(canvas).data('genotype', biomorph)        
                    biomorph.develop()
                }
            }

            this._refresh()
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
            this._superApply( arguments )
            this._refresh()
        },

        // _setOption is called for each individual option that is changing
        _setOption: function( key, value ) {
            this._super( key, value );
        }
    });
} );
function Breeding() {}

Breeding.createTimingDialog = function(appendTo, positionOf)  {
    var div = $('<div>');
    var button = $('<button class="startAutoReproduce">Start</button>');
    div.append(button);

    $(button).click(function(event) {
        $(event.target).closest('.breedingView').breedingView('startAutoBreeding')
    });
    var string = '<span> autobreeding every <input type="text"\
        class="autoReproduceInterval" size="5" maxlength="10" value="5000" />\
        ms.</span>';

    $(string).appendTo(div)
    $("<br>").appendTo(div)
    
    var useFitness = $('<span><input type="checkbox" class="useFitness" /> Use Fitness</span>')
    $(useFitness).tooltip();
    $(useFitness).attr('title', 'Breed based on how well biomorph fits its box');
    $(useFitness).appendTo(div)
    $("<br>").appendTo(div)
    var explosiveBreeding = $('<span><input type="checkbox" checked class="explosiveBreeding" /> Explosive\
    Breeding</span>')

    div.append(explosiveBreeding);
    $(explosiveBreeding).tooltip();
    $(explosiveBreeding).attr('title', 'Whether breeding happens all-at-once or one-at-a time. Uncheck for classic Blind Watchmaker breeding animation');
    $(div).dialog({
        width: 400,
        position: {
            my: 'left top',
            at: 'left+20px top+20px',
            of: positionOf
        },
        appendTo: appendTo,
        autoOpen: false,
        modal: false,
        classes: {"ui-dialog": "breedingTiming"},
        title: 'Timing',            
        offset: {
            left:20,
            right:20
        },
        startButton: null,
        generationsPreviousSecond: 0});
    console.log(div)

    return div
}

function getBiomorphFromCanvas(canvas) {
    var biomorph = jQuery.data(canvas, 'genotype');
    return biomorph;
}

$( function() {
    $.widget( "dawk.breedingOffspringCounter", {

        _create: function() {
            $(this.element).addClass('breedingOffspringCounter');
            var string = '<span>Offspring count: <input type="number" value="0" class="generations" />\
                Offspring per second: <input type="number" value="0"\
                class="generationRate" />\
                </span>'
                var div = $.parseHTML(string);
            this.element.append(div);
        }
    });
});


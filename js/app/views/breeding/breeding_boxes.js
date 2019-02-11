/*
 * breedingBoxes widget definition
 */

//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
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
                            let overlayCanvas = $(targetCanvas).parents('.watchmakerView').find('.overlayCanvas')[0];
                            let ctx = overlayCanvas.getContext('2d')
                            ctx.beginPath()
                            ctx.clearRect(0,0, overlayCanvas.width, overlayCanvas.height)
                            ctx.closePath()
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
        if(this.options.session.fossilizing) {
            let biomorph = $(this.element).find('.midBox').data('genotype')
            console.log('recording')
            console.log(this.options.session.fossilrecord)
            this.options.session.fossilrecord.push(biomorph)
        }
        let midCanvasDiv = this.options.midCanvasDiv;
        let midCanvasDivPosition = midCanvasDiv.position();
        let breedingView = $(this.element).closest('.breedingView')
        let explosiveBreeding = breedingView.find('.explosiveBreeding').get(0)
        let recursive = ! explosiveBreeding.checked;
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
        $(boxes).addClass('boxes')
        this.element.append(boxes)
        var numBoxes = this.options.numBoxes
        var midBox = Math.trunc(numBoxes / 2)
        for (j = 0; j < numBoxes; j++) {
            var isMidBox = j == midBox
            var canvasDiv = $("<div></div>").breedingBox({ 
                boxIndex: j, 
                isMidBox: isMidBox, 
                species: species,
                breedingBoxes: this}).appendTo(boxes);
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

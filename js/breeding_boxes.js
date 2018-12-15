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

        sparkLine: function(destinationCanvas) {
            var canvas = document.getElementById('overlayCanvas');
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
            var breedingWindow = $(sourceCanvas).parents('.breedingWindow').get(0);
            var generations = $(breedingWindow).find('.generations').get(0);
            generations.value = Number($(generations).attr('value')) + 1;
            
            var genotype = jQuery.data(sourceCanvas, "genotype");
            if(genotype != null) {
                var childGenotype = reproduce(genotype);
                jQuery.data(targetCanvas, 'genotype', childGenotype);
                develop(childGenotype, targetCanvas, drawCrossHairs); 
            }
            else  
                alert("Genotype is null");
            return genotype;
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
//                  console.log('offspring ' + targetId + ' offSet ' + deltaX + ',' + deltaY);
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
                            progress: function(animation, progress, msRemaining) {
                                var context = $(targetCanvas)[0].getContext("2d");

//                              $('#progress').html(targetCanvas.attr('width') + " " + (100 * progress) + "%");
                            },
                            complete: function() {
                                eraseCanvasNoCenter(document.getElementById('overlayCanvas'));
                                var breedingBoxes = $(targetCanvas).parent().breedingBox("option", "breedingBoxes");
                                breedingBoxes.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
//                                console.log('finished recursive animate Offspring ' + k);
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

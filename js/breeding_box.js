var stillBreeding = false;

$( function() {
    $.widget('dawk.breedingBox', {
        options: {
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
            this.options.canvas = canvas;
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
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
            var parentBreedingWindow = this.element.parents('.breedingWindow').get(0);
            var geneboxes = $(parentBreedingWindow)
                .find('.monochromeGeneboxes').get(0);
            $(geneboxes).monochrome_geneboxes('updateFromCanvas', this.options.canvas);
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
                var breedingWindowCanvases = $(canvas).parents('.boxes').find('canvas');
                $(breedingWindowCanvases).each(function(index) {
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
                            console.log(midCanvas);
//                            jQuery.data(midCanvas, 'genotype', genotype);
                            $(midCanvas).css({left:0,top:0});
                            var midCanvasPos = $(midCanvas).position();
                            develop(genotype, midCanvas,
                                    drawCrossHairs);
                            breedingBoxes.produceLitter(numBoxes, midBox);
                        } });
                } else {
                    breedingBoxes.produceLitter(numBoxes, midBox);
                }
            } else {
                console.log("Genotype was null");
            } 
            // Update the geneboxes with the genes of the new parent.
            $(midCanvasDiv).trigger("mouseover");
            return false;
        },
    });
});
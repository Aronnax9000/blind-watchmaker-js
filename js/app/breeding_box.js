var stillBreeding = false;

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
});
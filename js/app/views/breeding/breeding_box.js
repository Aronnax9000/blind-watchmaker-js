
$.widget('dawk.breedingBox', {
    options: {
        species: null,
        canvas: null,
        boxIndex: null,
        isMidBox: false,
        breedingBoxes: null,
        width: 200,
        height: 200,
        parentOptions: null,
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
        if($(this.options.canvas).data('genotype') != null) {
            var geneboxes = this.element.parents('.watchmakerView').find('.geneboxes').get(0);
            _speciesFactorySingleton.updateFromCanvas(
                    this.options.species,
                    geneboxes, this.options.canvas)
        }
    },
    _doCanvasClicked: function(event) {
        let target = event.target
        let view = $(target).closest('.watchmakerView')
        if(view.find('.activeBreeding').length != 0) {
            return
        }
        
        let highlighting = $(view).breedingView('option','highlighting')
        let genotype = $(target).data('genotype')
        if(genotype == null) {
            return
        }
        event.stopPropagation()
        
        if(highlighting) {
            this._doCanvasClickedHighlighting(view, target)
        } else {
            this._doCanvasClickedBreed(view, target)
        }
    },
    _doCanvasClickedHighlighting: function(view, target) {
        view.find('.highlighted').removeClass('highlighted')
        $(target).closest('div').addClass('highlighted')
    },
    _doCanvasClickedBreed: function(view, target) {
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
        var biomorph = $(target).data('genotype');
        var breedingBoxes = this.options.breedingBoxes;
        var clickedBoxIndex =  this.options.boxIndex;
        if (biomorph != null) {
            if(this.options.parentOptions.newRandomStart) {
                var watchmakerSessionTab = $(event.target).closest('.watchmakerSessionTab').eq(0)
                $(watchmakerSessionTab).watchmakerSessionTab(
                        "newBreedingView", biomorph, false);
            } else {
                view.find('.box').addClass('activeBreeding')
                // erase the other canvases
                var breedingViewCanvases = $(canvas).parents('.boxes').find('canvas');
                $(breedingViewCanvases).each(function(index) {
                    if(index != clickedBoxIndex) {
                        let ctx = this.getContext('2d')
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        ctx.clearRect(0,0, this.width, this.height)
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
                            jQuery.data(midCanvas, 'genotype', biomorph)
                            $(midCanvas).removeClass('activeBreeding')
                            let ctx = this.getContext('2d')
                            ctx.beginPath()
                            ctx.clearRect(0,0, this.width, this.height)
                            ctx.closePath()
                            // Inform the genotype that it now draws on a different
                            // canvas
                            biomorph.drawer = midCanvas
                            $(midCanvas).css({left:0,top:0})
                            biomorph.develop()
                            breedingBoxes.produceLitter(numBoxes, midBox)
                        } });
                } else {
                    $(midCanvas).removeClass('activeBreeding')
                    breedingBoxes.produceLitter(numBoxes, midBox);
                }
            }
        } else {
            // Genotype was null, newRandomStart in boxes should take care of it
        } 
        // Update the geneboxes with the genes of the new parent.
        $(midCanvasDiv).trigger("mouseover");
    },
});

$( function() {
    $.widget('dawk.breedingBox', {
        options: {
            boxIndex: null,
            isMidBox: false,
            breedingBoxes: null,
        },
        _create: function() {
            var canvasId = "canvas" + this.options.boxIndex;
            var canvas = this.element;
            canvas.attr("id", canvasId);
            canvas.attr('width', 200);
            canvas.attr('height', 200);
            canvas.addClass('box');

            if (this.options.isMidBox) {
                canvas.addClass('midBox');
            }

            this._on( this.element, {
                click: "_doCanvasClicked",
                mouseover: "_doMouseOver"
            });
        },
        _doMouseOver: function(event) {
            var id = this.element.attr("id");
//            console.log('mouseover ' + id);
            var geneboxes = $('body').find('.monochromeGeneboxes');
            geneboxes.monochrome_geneboxes('updateFromCanvas', id);
        },
        _doCanvasClicked: function(event) {
//            console.log('canvas clicked: ' + this.options.boxIndex);
            var boxes = this.options.breedingBoxes;
//            console.log("boxes " + boxes);
            var numBoxes = boxes.options.numBoxes;
            var midBox = Math.trunc(numBoxes / 2);
            
//            console.log("numBoxes "+ numBoxes + " midBox " + midBox);
            var midCanvas = document.getElementById('canvas' + midBox);
            
            var genotype = jQuery.data(event.target, 'genotype');
            if (genotype != null) {
                if (! this.options.isMidBox) {
//                    console.log("midcanvas width " + $(midCanvas).width() 
//                            + " id " + $(midCanvas).attr('id')
//                            );
                    jQuery.data(midCanvas, 'genotype', genotype);
//                    console.log("midcanvas geneotype " + 
//                            jQuery.data(midCanvas,'genotype').toString());
                    
                    develop(genotype, midCanvas,
                            drawCrossHairs);
                }
                for (k = 0; k < numBoxes; k++) {
                    if (k != midBox) {
//                        console.log("calling doReproduce " + k);
                        var sourceId = 'canvas' + midBox;
                        var targetId = 'canvas' + k; 
                        doReproduce(sourceId, targetId);
                    }
                }
            } else {
                console.log("Genetype was null");
            } 
            // Update the geneboxes with the genes of the new parent.
            $(midCanvas).trigger("mouseover");
            return false;
        },
    });
});
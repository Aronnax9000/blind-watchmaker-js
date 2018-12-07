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
            canvas.attr("id", canvasId);
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
            var id = this.options.canvas.attr("id");
            var position = this.element.position();
            var midCanvasDiv = this.options.breedingBoxes.options.midCanvasDiv;
            var midCanvasDivPosition = midCanvasDiv.position();
//            console.log('mouseover ' + id + " " + position.left + ',' + position.top);
//            console.log('midBox ' + midCanvasDivPosition.left + ',' + midCanvasDivPosition.top);
            var deltaX = midCanvasDivPosition.left - position.left;
            var deltaY = midCanvasDivPosition.top - position.top;
//            console.log('offSet ' + deltaX + ',' + deltaY);
            var geneboxes = $('body').find('.monochromeGeneboxes');
            geneboxes.monochrome_geneboxes('updateFromCanvas', id);
        },
        _doCanvasClicked: function(event) {
            var canvas = this.options.canvas;
            var id = canvas.attr("id");
            console.log('canvas clicked: ' + id);
            var position = this.element.position();
            var midCanvasDiv = this.options.breedingBoxes.options.midCanvasDiv;
            var midCanvasDivPosition = midCanvasDiv.position();
            var deltaX = midCanvasDivPosition.left - position.left;
            var deltaY = midCanvasDivPosition.top - position.top;
            console.log('offSet ' + deltaX + ',' + deltaY);
            var boxes = this.options.breedingBoxes;
//            console.log("boxes " + boxes);
            var numBoxes = boxes.options.numBoxes;
            var midBox = Math.trunc(numBoxes / 2);
            
//            console.log("numBoxes "+ numBoxes + " midBox " + midBox);
            var midCanvas = document.getElementById('canvas' + midBox);
            var genotype = jQuery.data(event.target, 'genotype');
            var breedingBoxes = this.options.breedingBoxes;
            
            if (genotype != null) {
                // erase the other canvases
                for(k = 0; k < numBoxes; k++) {
                    var candidateIdForErasure = "canvas" + k;
                    if(candidateIdForErasure != id) {
                        console.log('id is ' + id + ' erasing ' + candidateIdForErasure);
                        eraseCanvas(document.getElementById(candidateIdForErasure));
                        $("#" + candidateIdForErasure).css({left: midCanvasDivPosition.left, top: midCanvasDivPosition.top});
                    }
                }
                
                if (! this.options.isMidBox) {
                    $( canvas ).animate({
                        left: "+=" + deltaX,
                        top: "+=" + deltaY
                      }, 1000, function() {
                          jQuery.data(midCanvas, 'genotype', genotype);
                          console.log('develop midcanvas ' + midCanvas.id);
                          develop(genotype, midCanvas,
                                  drawCrossHairs);
                          breedingBoxes.produceLitter(numBoxes, midBox);
                      });
                } else {
                    this.options.breedingBoxes.produceLitter(numBoxes, midBox);
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
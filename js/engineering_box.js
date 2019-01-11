$( function() {
    $.widget('dawk.engineeringBox', {
        options: {
            species: null,
            canvas: null,
            width: 200,
            height: 200,
        },
        _create: function() {
            this.element.addClass('engineeringBox');
            this.element.addClass('boxDiv');
            var canvas = $("<canvas></canvas>");
            this.options.canvas = canvas;
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
            canvas.addClass('midBox');

            this.element.append(canvas);

            this._on( canvas, {
                click: "_doCanvasClicked",
                mouseover: "_doMouseOver"
            });
        },
        _doMouseOver: function(event) {
            var parentbreedingView = this.element.parents('.engineeringView').get(0);
            var geneboxes = $(parentbreedingView)
                .find('.geneboxes').get(0);
            _speciesFactorySingleton.updateFromCanvas(this.options.species, geneboxes,
                    this.options.canvas.get(0))
        },
        _doCanvasClicked: function(event) {
            // raise hypo dialog here.
            var hypo = $("<div><span><img  src='img/Hypodermic_PICT_03937_32x32.png'></span>\
            		<span style='float:none; display: inline' >\
                    The hypodermic is just for show!<br>Move the mouse up into the 'chromosome'\
                    		<br>to get a usable cursor. If in doubt pull down<br>'Help with current operation'</span></div>")
            $(hypo).dialog({
                dialogClass: "no-close",
                resizeable: false,
                modal: true,
                
                position: { my: "left top", at: "left+312 top+104", of: this.element },
                width: 450,
                buttons: [
                    {
                      text: "Okay",
                      click: function() {
                        $( this ).dialog( "close" );
                      }
                    }
                  ],
                }
            )
            return false;
        },
    });
});
/*
 * Engineering box
 */

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
        var parentView = this.element.parents('.watchmakerView').get(0);
        var geneboxes = $(parentView)
        .find('.geneboxes').get(0);
        _speciesFactorySingleton.updateFromCanvas(this.options.species, geneboxes,
                this.options.canvas.get(0))
    },
    _doCanvasClicked: function(event) {
        // raise hypo dialog here.
        var hypo = $("<div><span><img  src='img/Hypodermic_PICT_03937_16x16.png'></span>\
                <span style='float:none; display: inline' >\
                The hypodermic is just for show!<br>Move the mouse up into the 'chromosome'\
        <br>to get a usable cursor. If in doubt hover<br>over a gene for instructions.</span></div>")
        $(hypo).dialog({
            dialogClass: "dialogNoTitle",
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

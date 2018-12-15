$( function() {
    $.widget('dawk.engineeringBox', {
        options: {
            canvas: null,
            width: 200,
            height: 200,
        },
        _create: function() {
            this.element.addClass('boxDiv');
            var canvas = $("<canvas></canvas>");
            this.options.canvas = canvas;
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
            this.element.append(canvas);

            this._on( canvas, {
                click: "_doCanvasClicked",
                mouseover: "_doMouseOver"
            });
        },
        _doMouseOver: function(event) {
            var parentBreedingWindow = this.element.parents('.engineeringWindow').get(0);
            var geneboxes = $(parentBreedingWindow)
                .find('.monochromeGeneboxes').get(0);
            console.log(geneboxes);
            $(geneboxes).monochrome_geneboxes('updateFromCanvas', this.options.canvas);
        },
        _doCanvasClicked: function(event) {
            // Raise the hypodermic message TODO
            return false;
        },
    });
});
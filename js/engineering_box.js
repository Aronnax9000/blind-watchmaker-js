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
//            // console.log(geneboxes);
            _speciesFactorySingleton.updateFromCanvas(this.options.species, geneboxes,
                    this.options.canvas.get(0))
        },
        _doCanvasClicked: function(event) {
            // raise hypo dialog here.
            return false;
        },
    });
});
/*
 * drift box
 */
$( function() {
    $.widget('dawk.driftBox', {
        options: {
            species: null,
            canvas: null,
            width: 200,
            height: 200,
        },
        _create: function() {
            this.element.addClass('driftBox');
            this.element.addClass('boxDiv');
            var canvas = $("<canvas>");
            this.options.canvas = canvas[0];
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
            canvas.addClass('midBox');

            this.element.append(canvas);
            

        },
        doDrift: function() {
            let canvas = this.options.canvas
            console.log(canvas)
            let biomorph = $(canvas).data('genotype').reproduce(canvas)
            $(canvas).data('genotype', biomorph)
            biomorph.develop()
            this.update()
            this._delay(this.doDrift, 0);
        },
        update: function() {
            var parentView = this.element.closest('.watchmakerView')[0];
            var geneboxes = $(parentView)
                .find('.geneboxes').get(0);
            let canvas = $(this.element).find('canvas')[0]
            _speciesFactorySingleton.updateFromCanvas(this.options.species, geneboxes,
                    canvas)
        },
    });
});

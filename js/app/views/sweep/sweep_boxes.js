/*
 * sweep box
 */

$.widget('dawk.sweepBoxes', {
    options: {
        index: 0,
        species: null,
        canvas: null,
        width: 200,
        height: 200,
        dodrift: false
    },
    _create: function() {
        this.element.addClass("boxes")

        for(let i = 0; i < 15; i++) {
            var canvas = $("<canvas class='boxDiv'>");
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
            canvas.addClass('midBox');
            this.element.append(canvas);
        }

    },
    doDrift: function() {
        if(this.options.dodrift) {
            let index = this.options.index
            let canvases = $(this.element).find('canvas')
            let parentCanvas = canvases[index]
            $(parentCanvas).removeClass('midBox')
            index = (index + 1) % 15

            let daughterCanvas = canvases[index]
            $(daughterCanvas).addClass('midBox')
            let biomorph = $(parentCanvas).data('genotype').reproduce(daughterCanvas)
            $(daughterCanvas).data('genotype', biomorph)
            biomorph.develop()

            this.update()
            this.options.index = index
            this._delay(this.doDrift, 0);
        } 
    },
    stopDrift: function() {
        this.options.dodrift = false
    },
    startDrift: function() {
        if(! this.options.dodrift) {
            this.options.dodrift = true
            this.doDrift()
        }
    },
    update: function() {
        var parentView = this.element.closest('.watchmakerView')[0];
        var geneboxes = $(parentView)
        .find('.geneboxes').get(0);
        let canvas = $(this.element).find('canvas')[this.options.index]
        _speciesFactorySingleton.updateFromCanvas(this.options.species, geneboxes,
                canvas)
    },
});

$.widget('dawk.arthromorph_geneboxes', $.dawk.geneboxes, {
    options : {
        numGeneBoxes : 0,
    },

    updateFromCanvas: function(canvas) {
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.genebox');
        var genebox = geneboxes.eq(0);
        // Recurse the arthromorph's genome,
        // updating the forest of user interface elements,
        // Abandon hope, all ye who enter here.

    },
    _create : function(options) {
        this._super(options)
        this.element.addClass("arthromorphGeneboxes");
        let template = '<div></div>'
    },
    _destroy : function() {
        this.element.removeClass("arthromorphGeneboxes").text("");
    }

});

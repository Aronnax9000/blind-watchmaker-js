/**
 * Triay Biomorph Genebox
 */

$.widget("dawk.triay_biomorph_genebox", $.dawk.biomorph_genebox, {
    refreshGradient: function() {
        if(this.options.hasGradient) {
            var gradientImg = this.element.find('.gradientGene');
            switch (this.options.gradientValue) {
            case "Swell":
                gradientImg.removeClass('gradientSame gradientShrink');
                gradientImg.addClass('gradientSwell');
                break;
            case "Shrink":
                gradientImg.removeClass('gradientSame gradientSwell');
                gradientImg.addClass('gradientShrink');
                break;
            case "Same":
                gradientImg.removeClass('gradientShrink gradientSwell');
                gradientImg.addClass('gradientSame');
                break;
            default:
            }
        }
    },
});


$.widget( "dawk.triay_biomorph_gene1to9box", $.dawk.triay_biomorph_genebox, {
    options: {
        hasGradient: true
    },
});

$.widget( "dawk.triay_biomorph_segNoGenebox", $.dawk.triay_biomorph_genebox, {
    options: {
        showSign: true
    },
    refresh: function() {
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
});

$.widget( "dawk.triay_biomorph_segDistGenebox", $.dawk.triay_biomorph_genebox, {
    options: {
        hasGradient: true,
        showSign: true
    },
})

$.widget( "dawk.triay_biomorph_completenessGenebox", $.dawk.triay_biomorph_genebox, {
    _init : function() {
        this.element.attr('title', 'Completeness');
        this.options.hasMid = false;
        this._super();
    },
    refresh: function() {
        this.element.find('.geneValue').text(
                this.options.value ? 'Bilat' : 'Asym');
    },
})

$.widget( "dawk.triay_biomorph_spokesGenebox", $.dawk.triay_biomorph_genebox, {
    options: {
        hasMid: true  
    },
    refresh: function() {
        this.element.find('.geneValue').text(this.options.value);
    },
});

$.widget('dawk.triay_biomorph_geneboxes', {
    options : {
        engineering: true,
        numGeneBoxes : 16,
        biomorph: null,
    },

    updateFromCanvas: function(canvas) {

        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;

        biomorph = biomorph.triay_biomorph

        geneboxes = $(this.element).find('.genebox');
        var genebox;
        for(let i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.triay_biomorph_gene1to9box("updateValue", biomorph.genes[i], biomorph.dGenes[i]);
        }
        genebox = geneboxes.eq(9);
        genebox.triay_biomorph_segNoGenebox("updateValue", biomorph.segNoGene);
        genebox = geneboxes.eq(10);
        genebox.triay_biomorph_segDistGenebox("updateValue", biomorph.segDistGene, biomorph.dGenes[9]);
        genebox = geneboxes.eq(11);
        genebox.triay_biomorph_completenessGenebox("updateValue", biomorph.symmetrical);
        genebox = geneboxes.eq(12);
        genebox.triay_biomorph_spokesGenebox("updateValue", biomorph.spokesGene);
        genebox = geneboxes.eq(13);
        genebox.triay_biomorph_segNoGenebox("updateValue", biomorph.trickleGene);
        genebox = geneboxes.eq(14);
        genebox.triay_biomorph_segNoGenebox("updateValue", biomorph.mutSizeGene);
        genebox = geneboxes.eq(15);
        genebox.triay_biomorph_segNoGenebox("updateValue", biomorph.mutProbGene);
    },
    _create : function(options) {
        this._super(options)

        this.element.addClass("monochromeGeneboxes");
        this.element.addClass("geneboxes");
        let template = '<div></div>';

        for(let i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            $(template).triay_biomorph_gene1to9box({
                geneboxCollection: this, 
                geneboxIndex: i + 1,
                title: geneBoxTitle}).appendTo(this.element);
        }

        $(template).triay_biomorph_segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 10,
            title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096'
        }).appendTo(this.element);

        $(template).triay_biomorph_segDistGenebox({
            geneboxCollection: this, 
            geneboxIndex: 11,
            title: 'Segment Distance and Gradient Gene 10'}).appendTo(this.element);

        $(template).triay_biomorph_completenessGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
        }).appendTo(this.element);

        $(template).triay_biomorph_spokesGenebox({
            geneboxCollection: this,
            geneboxIndex: 13,
        }).appendTo(this.element);

        $(template).triay_biomorph_segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 14,
            title: 'Trickle'}).appendTo(this.element);

        $(template).triay_biomorph_segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 15,
            title: 'Mutation Size'}).appendTo(this.element);

        $(template).triay_biomorph_segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 16,
            title: 'Mutation Probability'}).appendTo(this.element);
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) {
        this.options.biomorph.manipulation(geneboxIndex, leftRightPos, rung);
        var canvas = $(this.element).parent().find('canvas').get(0);
        this.updateFromCanvas(canvas);
        this.options.biomorph.develop();
    },
    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }

});

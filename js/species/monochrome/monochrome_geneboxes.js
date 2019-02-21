

/*
 * Monochrome geneboxes
 */

$.widget('dawk.monochrome_geneboxes', $.dawk.geneboxes, {
    options : {
        numGeneBoxes : 16,
    },

    updateFromCanvas: function(canvas) {
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            if(this.options.biomorph == null) {
                return
            } else {
                biomorph = this.options.biomorph
            }
        } else {
            this.options.biomorph = biomorph;
        }
        geneboxes = $(this.element).find('.genebox');
        var genebox;
        for(let i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.gene1to9box("updateValue", biomorph.gene[i], biomorph.dGene[i]);
        }
        genebox = geneboxes.eq(9);
        genebox.segNoGenebox("updateValue", biomorph.segNoGene);
        genebox = geneboxes.eq(10);
        genebox.segDistGenebox("updateValue", biomorph.segDistGene, biomorph.dGene[9]);
        genebox = geneboxes.eq(11);
        genebox.completenessGenebox("updateValue", biomorph.completenessGene);
        genebox = geneboxes.eq(12);
        genebox.spokesGenebox("updateValue", biomorph.spokesGene);
        genebox = geneboxes.eq(13);
        genebox.trickleGenebox("updateValue", biomorph.trickleGene);
        genebox = geneboxes.eq(14);
        genebox.mutSizeGenebox("updateValue", biomorph.mutSizeGene);
        genebox = geneboxes.eq(15);
        genebox.mutProbGenebox("updateValue", biomorph.mutProbGene);

    },
    _create : function(options) {
        this._super(options)
        
        this.element.addClass("monochromeGeneboxes");
        let template = '<div></div>'
        for(let i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            $(template).gene1to9box({
                geneboxCollection: this, 
                geneboxIndex: i + 1,
                title: geneBoxTitle}).appendTo(this.element)
        }
        
        let genebox = $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 10,
            title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096',
            });
        if(! this.options.session.options.genes[0]) {
             genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)
        genebox = $(template).segDistGenebox({
            geneboxCollection: this, 
            geneboxIndex: 11,
            title: 'Segment Distance and Gradient Gene 10'});
        if(! this.options.session.options.genes[0]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        
        genebox = $(template).completenessGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
        });
        
        if(! this.options.session.options.genes[2]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)
        
        genebox = $(template).spokesGenebox({
            geneboxCollection: this,
            geneboxIndex: 13,
            });
        if(! this.options.session.options.genes[3]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)
        
        genebox = $(template).trickleGenebox({
            geneboxCollection: this, 
            geneboxIndex: 14,
            title: 'Trickle'});
        if(! this.options.session.options.genes[4]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).mutSizeGenebox({
            geneboxCollection: this, 
            geneboxIndex: 15,
            title: 'Mutation Size'});
        if(! this.options.session.options.genes[5]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).mutProbGenebox({
            geneboxCollection: this, 
            geneboxIndex: 16,
            title: 'Mutation Probability'});
        if(! this.options.session.options.genes[6]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)
    },
    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }

});


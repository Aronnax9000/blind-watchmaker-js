


$.widget('dawk.colour_geneboxes', $.dawk.geneboxes, {
    options : {
        numGeneBoxes : 28,
    },

    updateFromCanvas: function(canvas) {

        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;
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
        genebox = geneboxes.eq(16);
        genebox.thicknessGenebox("updateValue", biomorph.thicknessGene);
        genebox = geneboxes.eq(17);
        genebox.limbShapeGenebox("updateValue", biomorph.limbShapeGene);
        genebox = geneboxes.eq(18);
        genebox.limbFillGenebox("updateValue", biomorph.limbFillGene);

        let colors = biomorph.session.options.palette.colors

        genebox = geneboxes.eq(19);
        genebox.backgroundColourGenebox("updateValue", colors[biomorph.backColorGene]);
        genebox = geneboxes.eq(20);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[0]]);
        genebox = geneboxes.eq(21);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[1]]);
        genebox = geneboxes.eq(22);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[2]]);
        genebox = geneboxes.eq(23);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[3]]);
        genebox = geneboxes.eq(24);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[4]]);
        genebox = geneboxes.eq(25);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[5]]);
        genebox = geneboxes.eq(26);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[6]]);
        genebox = geneboxes.eq(27);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[7]]);
    },
    _create : function(options) {
        this._super(options)

        this.element.addClass("colourGeneboxes");
        let template = '<div></div>';
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

        let genes = this.options.session.options.genes
        
        let genebox = $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 10,
            title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096',
            });
        if(! genes[0]) {
             genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)
        genebox = $(template).segDistGenebox({
            geneboxCollection: this, 
            geneboxIndex: 11,
            title: 'Segment Distance and Gradient Gene 10'});
        if(! genes[0]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        
        genebox = $(template).completenessGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
        });
        
        if(! genes[2]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)
        
        genebox = $(template).spokesGenebox({
            geneboxCollection: this,
            geneboxIndex: 13,
            });
        if(! genes[3]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).trickleGenebox({
            geneboxCollection: this, 
            geneboxIndex: 14,
            title: 'Trickle'});
        if(! genes[4]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).mutSizeGenebox({
            geneboxCollection: this, 
            geneboxIndex: 15,
            title: 'Mutation Size'});
        if(! genes[5]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).mutProbGenebox({
            geneboxCollection: this, 
            geneboxIndex: 16,
            title: 'Mutation Probability'});
        if(! genes[6]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).thicknessGenebox({
            geneboxCollection: this, 
            geneboxIndex: 17,
            title: 'Thickness',
        })
        if(! genes[11]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).limbShapeGenebox({
            geneboxCollection: this,
            geneboxIndex: 18,
        })
        if(! genes[7]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).limbFillGenebox({
            geneboxCollection: this,
            geneboxIndex: 19,
        })
        if(! genes[8]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        let colors = this.options.session.options.palette.colors

        genebox = $(template).backgroundColourGenebox({
            geneboxCollection: this,
            geneboxIndex: 20,
            colors: colors,
            title: 'Background Colour'});
        if(! genes[10]) {
            genebox.addClass('geneboxHidden')
        }
        
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 21,
            colors: colors,
            title: 'Colour Gene 1'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }        
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 22,
            colors: colors,
            title: 'Colour Gene 2'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 23,
            colors: colors,
            title: 'Colour Gene 3'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 24,
            colors: colors,
            title: 'Colour Gene 4'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 25,
            colors: colors,
            title: 'Colour Gene 5'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 26,
            colors: colors,
            title: 'Colour Gene 6'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 27,
            colors: colors,
            title: 'Colour Gene 7'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 28,
            colors: colors,
            title: 'Colour Gene 8'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

    },
    _destroy : function() {
        this.element.removeClass("colourGeneboxes").text("");
    },

});

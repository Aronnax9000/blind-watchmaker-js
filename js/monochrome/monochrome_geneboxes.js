
$.widget('dawk.monochrome_geneboxes', {
    options : {
        engineering: true,
        numGeneBoxes : 16,
        biomorph: null,
    },

    updateFromCanvas: function(canvas) {
        
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            // console.log('updateFromCanvas: no biomorph on canvas.')
            // console.log(canvas);
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.monochromeGenebox');
//        // console.log('update from canvas:  nGeneboxes ' + geneboxes.length + ' biomorph ' + biomorph);
        var genebox;
        for(let i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.gene1to9box("option", "value", biomorph.gene[i]);
            genebox.gene1to9box("option", "gradientValue", biomorph.dGene[i]);
            genebox.gene1to9box("refresh");
        }
        genebox = geneboxes.eq(9);
        genebox.segNoGenebox("option", "value", biomorph.segNoGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(10);
        genebox.segDistGenebox("option", "value", biomorph.segDistGene);
        genebox.segDistGenebox("option", "gradientValue", biomorph.dGene[9]);
        genebox.segDistGenebox("refresh");
        genebox = geneboxes.eq(11);
        genebox.completenessGenebox("option", "value", biomorph.completenessGene);
        genebox.completenessGenebox("refresh");
        genebox = geneboxes.eq(12);
        genebox.spokesGenebox("option", "value", biomorph.spokesGene);
        genebox.spokesGenebox("refresh");
        genebox = geneboxes.eq(13);
        genebox.segNoGenebox("option", "value", biomorph.trickleGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(14);
        genebox.segNoGenebox("option", "value", biomorph.mutSizeGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(15);
        genebox.segNoGenebox("option", "value", biomorph.mutProbGene);
        genebox.segNoGenebox("refresh");
        
    },
    _create : function(options) {
        this._setOptions(options);

        this.element.addClass("monochromeGeneboxes");
        
        for(let i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            var geneBox = $("<div></div>").gene1to9box({
                geneboxCollection: this, 
                title: geneBoxTitle});
            geneBox.gene1to9box("option", "geneboxIndex", i + 1);
            this.element.append(geneBox);
        }
        var geneBox;
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 10);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segDistGenebox({geneboxCollection: this, title: 'Segment Distance and Gradient Gene 10'});
        geneBox.segDistGenebox("option", "geneboxCollection", this);
        geneBox.segDistGenebox("option", "geneboxIndex", 11);
        this.element.append(geneBox);
        geneBox = $("<div></div>").completenessGenebox({geneboxCollection: this});
        geneBox.completenessGenebox("option", "geneboxCollection", this);
        geneBox.completenessGenebox("option", "geneboxIndex", 12);
        this.element.append(geneBox);
        geneBox = $("<div></div>").spokesGenebox({geneboxCollection: this});
        geneBox.spokesGenebox("option", "geneboxCollection", this);
        geneBox.spokesGenebox("option", "geneboxIndex", 13);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Trickle'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 14);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Mutation Size'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 15);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Mutation Probability'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 16);
        this.element.append(geneBox);
        
        this.refresh();
    },
    _setOption : function(key, value) {
//        // // console.log('setOption ' + key + ": " + value);
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    refresh : function() {
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) {
//       // console.log('geneboxes widget calling manipulate on geneboxIndex ' + geneboxIndex);
       this.options.biomorph.manipulation(geneboxIndex, leftRightPos, rung);
       var canvas = $(this.element).parent().find('canvas').get(0);
       this.updateFromCanvas(canvas);
       this.options.biomorph.develop();
    },
    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }
    
});

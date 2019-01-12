
$.widget( "dawk.limbShapeGenebox", $.dawk.biomorph_genebox, {
    _init : function() {
        this.element.attr('title', 'Limb Shape');
        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasGradient = false;
        this.options.hasColor = true;
        this._super();
    },
    refresh: function() {
        var str = this.options.value;
        var properties = LimbType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.name);
        }
    },
} );
$.widget( "dawk.limbFillGenebox", $.dawk.biomorph_genebox, {
    _init : function() {
        this.element.attr('title', 'Limb Fill');
        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        var str = this.options.value;
        console.log("LimbFillType " + str)
        var properties = LimbFillType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.name);
        }
    },
} );

$.widget( "dawk.colourGenebox", $.dawk.biomorph_genebox, {
    _init : function() {
        this.options.showSign = false;
        this.options.hasLeftRight = false;
        this.options.hasMid = true;
        this.options.hasGradient = false;
        this.options.hasColor = true;
        this._super();
    },
} );

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
        genebox = geneboxes.eq(16);
        genebox.segNoGenebox("option", "value", biomorph.thicknessGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(17);
        genebox.limbShapeGenebox("option", "value", biomorph.limbShapeGene);
        genebox.limbShapeGenebox("refresh");
        genebox = geneboxes.eq(18);
        genebox.limbFillGenebox("option", "value", biomorph.limbFillGene);
        genebox.limbFillGenebox("refresh");
        
        let colors = biomorph.session.options.palette.colors
        
        genebox = geneboxes.eq(19);
        genebox.colourGenebox("option", "value", colors[biomorph.backColorGene]);
        genebox.colourGenebox("refresh");
        genebox = geneboxes.eq(20);
        genebox.colourGenebox("option", "value", colors[biomorph.colorGene[0]]);
        genebox.colourGenebox("refresh");
        genebox = geneboxes.eq(21);
        genebox.colourGenebox("option", "value", colors[biomorph.colorGene[1]]);
        genebox.colourGenebox("refresh");
        genebox = geneboxes.eq(22);
        genebox.colourGenebox("option", "value", colors[biomorph.colorGene[2]]);
        genebox.colourGenebox("refresh");
        genebox = geneboxes.eq(23);
        genebox.colourGenebox("option", "value", colors[biomorph.colorGene[3]]);
        genebox.colourGenebox("refresh");
        genebox = geneboxes.eq(24);
        genebox.colourGenebox("option", "value", colors[biomorph.colorGene[4]]);
        genebox.colourGenebox("refresh");
        genebox = geneboxes.eq(25);
        genebox.colourGenebox("option", "value", colors[biomorph.colorGene[5]]);
        genebox.colourGenebox("refresh");
        genebox = geneboxes.eq(26);
        genebox.colourGenebox("option", "value", colors[biomorph.colorGene[6]]);
        genebox.colourGenebox("refresh");
        genebox = geneboxes.eq(27);
        genebox.colourGenebox("option", "value", colors[biomorph.colorGene[7]]);
        genebox.colourGenebox("refresh");
    },
    _create : function(options) {
        this._super(options)
        this.element.addClass("colourGeneboxes");

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
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Thickness'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 17);
        this.element.append(geneBox);

        geneBox = $("<div></div>").limbShapeGenebox({geneboxCollection: this});
        geneBox.limbShapeGenebox("option", "geneboxCollection", this);
        geneBox.limbShapeGenebox("option", "geneboxIndex", 18);
        this.element.append(geneBox);

        geneBox = $("<div></div>").limbFillGenebox({geneboxCollection: this});
        geneBox.limbFillGenebox("option", "geneboxCollection", this);
        geneBox.limbFillGenebox("option", "geneboxIndex", 19);
        this.element.append(geneBox);

        geneBox = $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 20,
            title: 'Background Colour'});
        this.element.append(geneBox);

        $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 21,
            title: 'Colour Gene 1'}).appendTo(this.element)

        $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 22,
            title: 'Colour Gene 2'}).appendTo(this.element)

        $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 23,
            title: 'Colour Gene 3'}).appendTo(this.element)

        $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 24,
            title: 'Colour Gene 4'}).appendTo(this.element)

        $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 25,
            title: 'Colour Gene 5'}).appendTo(this.element)

        $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 26,
            title: 'Colour Gene 6'}).appendTo(this.element)

        $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 27,
            title: 'Colour Gene 7'}).appendTo(this.element)

        $("<div></div>").colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 28,
            title: 'Colour Gene 8'}).appendTo(this.element)
        
        this.refresh();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    refresh : function() {
    },

    _destroy : function() {
        this.element.removeClass("colourGeneboxes").text("");
    }

});

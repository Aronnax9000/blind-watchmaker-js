$.widget( "dawk.colourGenebox", $.dawk.biomorph_genebox, {
    _init : function() {
        this.options.showSign = false;
        this.options.hasLeftRight = false;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = true;
        this._super();
    },
    _launchPicker: function() {
        $('<div class="colourGenebox"></div>').colourPicker({
            colourGenebox: this.element,
            colors: this.options.colors,
            title: this.options.title,
            value: this.options.value,
            appendTo: this.element
            })
    },
    manipulate: function(event) {
        let value = $(event.target).data("value")
        $(this.element).parents('.colourGeneboxes').eq(0).colour_geneboxes(
                "manipulate",
                this.options.geneboxIndex, 
                value, 0)
        return false;
        
    },    
} );

$.widget('dawk.colourPicker', {
    options: {
        colourGenebox: null,
        value: '',
        title: 'Untitled Colour Picker',
        colors: []
    },
    _create: function() {
        $(this.element).addClass('colourPicker')
        this.element.attr('title', this.options.title)
        
        let colors = this.options.colors
        let value = this.options.value
        
        let colourSwatchTemplate = '<div class="colourPickerCubeSwatch"></div>'; 

        let counterFloor = 0

        let cubeDiv = $('<div class="colourPickerCubeDiv"></div>').appendTo(this.element)
        for(let cubeRow = 0; cubeRow < 6; cubeRow++) {
            let templateSlice = $('<div class="colourPickerCubeDivSlice"></div>').appendTo(cubeDiv)
            for(let i = counterFloor; i < counterFloor + 36; i++) {
                let colorswatch = $(colourSwatchTemplate)
                $(templateSlice).append(colorswatch)
                let color = colors[i]
                $(colorswatch).css('background-color', color)
                $(colorswatch).data('value', i)
                this._on(colorswatch, {click: "_colorSwatchClicked"})
                if(color == value) {
                    $(colorswatch).addClass('selected')
                }
            }
            counterFloor += 36
        }
        
        colourSwatchTemplate = '<div class="colourPickerRampSwatch"></div>'; 
        template = $('<div class="colourPickerRampDiv"></div>').appendTo(this.element)
        for(let i = 216; i < 256; i++) {
            let colorswatch = $(colourSwatchTemplate)
            $(template).append(colorswatch)
            let color = colors[i]
            $(colorswatch).css('background-color', color)
            $(colorswatch).data('value', i)
            this._on(colorswatch, {click: "_colorSwatchClicked"})
            if(color == value) {
                $(colorswatch).addClass('colourPickerSelected')
            }
        }
        $(this.element).append(template)

        console.log(this.options.title)
        $(this.element).dialog({
            width: 400,
            height: 400,
            title: this.options.title,
            draggable: true,
            modal: true,
            appendTo: this.options.appendTo
        })

    },
    _colorSwatchClicked: function(event) {
        $(this.options.colourGenebox).colourGenebox("manipulate", event)
    }
});

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
        if(properties != null) 
            this.element.find('.geneValue').text(properties.name);
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
        var properties = LimbFillType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.name);
        }
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

        $(template).segNoGenebox({
            geneboxCollection: this, 
            title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096',
            geneboxIndex: 10
        }).appendTo(this.element)

        $(template).segDistGenebox({
            geneboxCollection: this, 
            title: 'Segment Distance and Gradient Gene 10',
            geneboxIndex: 11
        }).appendTo(this.element)

        $(template).completenessGenebox({
            geneboxCollection: this,
            geneboxIndex: 12
        }).appendTo(this.element)

        $(template).spokesGenebox({
            geneboxCollection: this,
            geneboxIndex: 13
        }).appendTo(this.element)

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 14,
            title: 'Trickle',
        }).appendTo(this.element)

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 15,
            title: 'Mutation Size',
        }).appendTo(this.element)

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 16,
            title: 'Mutation Probability',
        }).appendTo(this.element)

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 17,
            title: 'Thickness',
        }).appendTo(this.element)

        $(template).limbShapeGenebox({
            geneboxCollection: this,
            geneboxIndex: 18,
        }).appendTo(this.element)

        $(template).limbFillGenebox({
            geneboxCollection: this,
            geneboxIndex: 19,
        }).appendTo(this.element)

        let colors = this.options.session.options.palette.colors
        
        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 20,
            colors: colors,
            title: 'Background Colour'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 21,
            colors: colors,
            title: 'Colour Gene 1'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 22,
            colors: colors,
            title: 'Colour Gene 2'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 23,
            colors: colors,
            title: 'Colour Gene 3'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 24,
            colors: colors,
            title: 'Colour Gene 4'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 25,
            colors: colors,
            title: 'Colour Gene 5'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 26,
            colors: colors,
            title: 'Colour Gene 6'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 27,
            colors: colors,
            title: 'Colour Gene 7'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 28,
            colors: colors,
            title: 'Colour Gene 8'}).appendTo(this.element);
    },
    _destroy : function() {
        this.element.removeClass("colourGeneboxes").text("");
    },

});

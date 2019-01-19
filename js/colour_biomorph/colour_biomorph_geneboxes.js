$.widget( "dawk.colourGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasLeftRight: false,
        hasColor: true
    },
    _launchPicker: function() {
        $(this.element).tooltip('disable')
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
        let engineeringBox = $(this.options.appendTo).parents('.engineeringView').find('.engineeringBox').eq(0)
        $(this.element).dialog({
            width: 220,
            height: 230,
            title: this.options.title,
            draggable: true,
            modal: true,
            appendTo: this.options.appendTo,
            close: function(event, ui) {
                let colourGenebox = $(event.target).dialog("option", "appendTo")
                $(colourGenebox).tooltip('enable')    
            },
            position: {
                my: 'left top',
                at: 'left+20px top+20px',
                of: engineeringBox
            },
            offset: {
                left:20,
                right:20
            }
        })
    },
    _colorSwatchClicked: function(event) {
        $(this.options.colourGenebox).colourGenebox("manipulate", event)
    }
});

$.widget( "dawk.limbShapeGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasMid: true
    },
    refresh: function() {
        var str = this.options.value;
        var properties = LimbType.properties[str];
        if(properties != null) 
            this.element.find('.geneValue').text(properties.name);
    },
} );

$.widget( "dawk.limbFillGenebox", $.dawk.biomorph_genebox, {
    options: {
        title: 'Limb Fill'

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
        genebox.segNoGenebox("updateValue", biomorph.trickleGene);
        genebox = geneboxes.eq(14);
        genebox.segNoGenebox("updateValue", biomorph.mutSizeGene);
        genebox = geneboxes.eq(15);
        genebox.segNoGenebox("updateValue", biomorph.mutProbGene);
        genebox = geneboxes.eq(16);
        genebox.segNoGenebox("updateValue", biomorph.thicknessGene);
        genebox = geneboxes.eq(17);
        genebox.limbShapeGenebox("updateValue", biomorph.limbShapeGene);
        genebox = geneboxes.eq(18);
        genebox.limbFillGenebox("updateValue", biomorph.limbFillGene);

        let colors = biomorph.session.options.palette.colors

        genebox = geneboxes.eq(19);
        genebox.colourGenebox("updateValue", colors[biomorph.backColorGene]);
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

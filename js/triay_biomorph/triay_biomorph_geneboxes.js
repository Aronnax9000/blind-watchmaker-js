//Globals, lines 205-206
//TYPE
//HorizPos = (LeftThird, MidThird, RightThird);
//VertPos = (TopRung, MidRung, BottomRung);



$.widget("dawk.triay_biomorph_genebox", {
    options : {
        geneboxCollection: null,
        geneboxIndex : 0,
        value : 0,
        gradientValue : "Same", // Same
        hasMid: true,
        hasGradient: true,
        hasLeftRight: true,
        hasColor: false,
        showSign: false,
        title: ''
    },
    _create : function(options) {
        this._setOptions(options);

        this.element.addClass("genebox");
        $(this.element).tooltip();
        this.element.attr('title', this.options.title);
    },
    _init: function() {
        // HTML template for the manipulation areas of the genebox.
        var str =  '\
            <div class="geneboxInfo"> \
            <img src="img/swellcircle.png" class="gradientGene gradientSame" /> \
            <span class="geneValue"></span> \
            </div>';
        var engineering = this.options.geneboxCollection.options.engineering;
        if(engineering) {
            str += '<div class="geneboxNavi">';
            if(this.options.hasLeftRight) {
                str += '<div class="geneboxLeft"></div>';
            }
            str += '<div class="geneboxMid"> ';
            if(this.options.hasGradient) {
                str += 
                    '<div class="geneboxUp"></div> \
                    <div class="geneboxEquals"></div> \
                    <div class="geneboxDown"></div>';
            }
            else {
                str += '<div class="geneboxEquals"></div>';
            }
            str += '</div>';

            if(this.options.hasLeftRight) {
                str += '<div class="geneboxRight"></div>';
            }
            str +='</div>';
        }
        this.element.append($.parseHTML(str));
        if(engineering) this._on( $(this.element).find('.geneboxLeft, .geneboxMid, .geneboxUp, .geneboxEquals, .geneboxDown, .geneboxRight'), {
            click: "_manipulate"
        });

        this.refresh();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },

    refreshValue: function() {
        var str = this.options.value;
        if(this.options.showSign) {
            str = "+s+" + String(str);
        }
        this.element.find('.geneValue').text(str);

    },

    refreshColor: function() {
        this.element.find('.geneValue').text(this.options.value);
        if(this.options.hasColor) {
            $(this.element).css('background-color', str);
        }

    },

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
                console.error('Illegal gradientValue: '+ this.options.gradientValue + " genbox " + this.options.geneboxIndex);
            }
        }
    },

    refresh : function() {
        this.refreshValue();
        this.refreshColor();
        this.refreshGradient();
    },
    _constrain : function(value) {
        if (value > 100) {
            value = 100;
        }
        if (value < 0) {
            value = 0;
        }
        return value;
    },
    _manipulate: function(event) {
        var target = $(event.target);
        var leftRightPos;
        var rung;
        if(target.hasClass('geneboxLeft')) {
            leftRightPos = HorizPos.LeftThird;
        } else if(target.hasClass('geneboxRight')) {
            leftRightPos = HorizPos.RightThird;
        } else if(target.hasClass('geneboxMid')) {
            leftRightPos = HorizPos.MidThird;
        }

        if(target.hasClass('geneboxUp')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.TopRung;
        } else if(target.hasClass('geneboxEquals')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.MidRung;
        } else if(target.hasClass('geneboxDown')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.BottomRung;
        }

        this.options.geneboxCollection.manipulate(this.options.geneboxIndex, leftRightPos, rung)
        return false;
    }

});

$.widget( "dawk.triay_biomorph_gene1to9box", $.dawk.triay_biomorph_genebox, {
    _init : function() {

        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    }

} );

$.widget( "dawk.triay_biomorph_segNoGenebox", $.dawk.triay_biomorph_genebox, {
    _init : function() {
        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasColor = false;
        this.options.hasGradient = false;
        this._super();
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
} );

$.widget( "dawk.triay_biomorph_segDistGenebox", $.dawk.triay_biomorph_genebox, {
    _init : function() {
        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasGradient = true;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
} );


$.widget( "dawk.triay_biomorph_completenessGenebox", $.dawk.triay_biomorph_genebox, {
    _init : function() {
        this.element.attr('title', 'Completeness');

        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.element.find('.geneValue').text(
                this.options.value ? 'Bilat' : 'Asym');
    },
} );

$.widget( "dawk.triay_biomorph_spokesGenebox", $.dawk.triay_biomorph_genebox, {
    _init : function() {
        this.element.attr('title', 'Spokes');
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.element.find('.geneValue').text(this.options.value);
    },
} );

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
            genebox.triay_biomorph_gene1to9box("option", "value", biomorph.genes[i]);
            genebox.triay_biomorph_gene1to9box("option", "gradientValue", biomorph.dGenes[i]);
            genebox.triay_biomorph_gene1to9box("refresh");
        }
        genebox = geneboxes.eq(9);
        genebox.triay_biomorph_segNoGenebox("option", "value", biomorph.segNoGene);
        genebox.triay_biomorph_segNoGenebox("refresh");
        genebox = geneboxes.eq(10);
        genebox.triay_biomorph_segDistGenebox("option", "value", biomorph.segDistGene);
        genebox.triay_biomorph_segDistGenebox("option", "gradientValue", biomorph.dGenes[9]);
        genebox.triay_biomorph_segDistGenebox("refresh");
        genebox = geneboxes.eq(11);
        genebox.triay_biomorph_completenessGenebox("option", "value", biomorph.symmetrical);
        genebox.triay_biomorph_completenessGenebox("refresh");
        genebox = geneboxes.eq(12);
        genebox.triay_biomorph_spokesGenebox("option", "value", biomorph.spokesGene);
        genebox.triay_biomorph_spokesGenebox("refresh");
        genebox = geneboxes.eq(13);
        genebox.triay_biomorph_segNoGenebox("option", "value", biomorph.trickleGene);
        genebox.triay_biomorph_segNoGenebox("refresh");
        genebox = geneboxes.eq(14);
        genebox.triay_biomorph_segNoGenebox("option", "value", biomorph.mutSizeGene);
        genebox.triay_biomorph_segNoGenebox("refresh");
        genebox = geneboxes.eq(15);
        genebox.triay_biomorph_segNoGenebox("option", "value", biomorph.mutProbGene);
        genebox.triay_biomorph_segNoGenebox("refresh");

    },
    _create : function(options) {
        this._super(options)

        this.element.addClass("monochromeGeneboxes");
        this.element.addClass("geneboxes");
        let template = '<div></div>'

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

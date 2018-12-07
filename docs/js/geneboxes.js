// Globals, lines 205-206
// TYPE
//        HorizPos = (LeftThird, MidThird, RightThird);
//        VertPos = (TopRung, MidRung, BottomRung);



$.widget("dawk.monochrome_genebox", {
    options : {
        geneboxCollection: null,
        geneboxIndex : 0,
        value : 0,
        gradientValue : SwellType.Same,
        hasMid: true,
        hasGradient: true,
        hasLeftRight: true,
        hasColor: false,
        showSign: false,
        title: ''
    },
    _create : function(options) {
        this._setOptions(options);
        
        this.element.addClass("monochromeGenebox");
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
//        console.log('genebox set options' + options);
        this.refresh();
    },

    refreshValue: function() {
        var str = this.options.value;
        if(this.options.showSign) {
            // console.log("Showsign " + this.options.showSign);
            str = "+s+" + String(str);
            // console.log(str);
        }
        // console.log(str);
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
    //        // console.log("gradientValue " + this.options.gradientValue);
            switch (this.options.gradientValue) {
            case SwellType.Swell:
    //            // console.log('refresh finds Swell');
                gradientImg.removeClass('gradientSame gradientShrink');
                gradientImg.addClass('gradientSwell');
                break;
            case SwellType.Shrink:
    //            // console.log('refresh finds Shrink');
                gradientImg.removeClass('gradientSame gradientSwell');
                gradientImg.addClass('gradientShrink');
                break;
            case SwellType.Same:
    //            // console.log('refresh finds Same');
                gradientImg.removeClass('gradientShrink gradientSwell');
                gradientImg.addClass('gradientSame');
                break;
            default:
                // console.log('Illegal gradientValue: '+ this.options.gradientValue);
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
//        HorizPos = (LeftThird, MidThird, RightThird);
//        VertPos = (TopRung, MidRung, BottomRung);
        var target = $(event.target);
        var leftRightPos;
        var rung;
        // console.log(target.attr('class'));
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

$.widget( "dawk.gene1to9box", $.dawk.monochrome_genebox, {
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

$.widget( "dawk.segNoGenebox", $.dawk.monochrome_genebox, {
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

$.widget( "dawk.segDistGenebox", $.dawk.monochrome_genebox, {
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


$.widget( "dawk.completenessGenebox", $.dawk.monochrome_genebox, {
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
        this.refreshGradient();
        var str = this.options.value;
        // console.log(str);
        var properties = CompletenessType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
} );


$.widget( "dawk.spokesGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.element.attr('title', 'Spokes');
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        // console.log(str);
        var properties = SpokesType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
} );


$.widget('dawk.monochrome_geneboxes', {
    options : {
        engineering: true,
        numGeneBoxes : 16,
        genotype: null,
    },

    updateFromCanvas: function(id) {
        var canvas = $("#" + id);
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.genotype = biomorph;
//        console.log('update from ' + id + ' biomorph ' + biomorph);
        geneboxes = $(this.element).find('.monochromeGenebox');
//        console.log('update from ' + id + ' nGeneboxes ' + geneboxes.length + ' biomorph ' + biomorph);
        var genebox;
        for(i = 0; i < 9; i++) {
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
//        for (var k in this.options){
//            if (typeof this.options[k] !== 'function') {
//                 console.log("Key is " + k + ", value is" + this.options[k]);
//            }
//        }
        this.element.addClass("monochromeGeneboxes");
        var i;
        for (i = 0; i < 9; i++) {
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
//        // console.log('setOption ' + key + ": " + value);
        this._super(key, value);
    },
    _setOptions : function(options) {
        console.log('geneboxes setting options');
        this._super(options);
        console.log('geneboxCollection:' + this.options.geneboxCollection);
        this.refresh();
    },
    refresh : function() {
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) {
       this.options.genotype.manipulation(geneboxIndex, leftRightPos, rung);
       this.updateFromCanvas('canvas0');
       var midCanvasDiv = document.getElementById('canvas0');
       develop(this.options.genotype, midCanvasDiv,
               drawCrossHairs);
    },
    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }
    
});

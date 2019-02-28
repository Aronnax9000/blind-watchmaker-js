$.widget("dawk.biomorph_genebox", {
    options : {
        hasMid: false,
        hasGradient: false,
        hasLeftRight: true,
        hasColor: false,
        showSign: false,
    },
    _create : function(options) {
        this._setOptions(options);
        this.element.addClass("genebox");
        $(this.element).tooltip();
        this.element.attr('title', this.options.title);
    },
    _init: function() {
        let options = this.options;
        // HTML template for the manipulation areas of the genebox.
        var str =  '\
            <div class="geneboxInfo"> \
            <img src="img/swellcircle.png" class="gradientGene gradientSame" /> \
            <span class="geneValue"></span> \
            </div>';
        var engineering = options.geneboxCollection.options.engineering;
        if(engineering) {
            if(options.hasLeftRight && (options.hasMid || options.hasGradient)) {
                str += '<div class="geneboxNaviThirds">'
            } else if(options.hasLeftRight){
                str += '<div class="geneboxNaviHalves">'
            } else {
                str += '<div class="geneboxNaviWhole">'
            } 

            if(options.hasLeftRight) {
                str += '<div class="geneboxLeft"></div>';
            }


            if(options.hasGradient) {
                str += '<div class="geneboxMidThirds">';
                str += 
                    '<div class="geneboxUp"></div> \
                    <div class="geneboxEquals"></div> \
                    <div class="geneboxDown"></div>';
                str += '</div>';
            } else if(options.hasMid) {
                str += '<div class="geneboxMidWhole">\
                    <div class="geneboxEquals"></div>\
                    </div>';
            }

            if(options.hasLeftRight) {
                str += '<div class="geneboxRight"></div>';
            }
            str +='</div>';
        }
        this.element.append($.parseHTML(str));
        if(engineering) {
            this._on( $(this.element).find('.geneboxLeft, .geneboxMid, .geneboxUp, .geneboxEquals, .geneboxDown, .geneboxRight'), {
                click: "_manipulate"
            });
            this._on( $(this.element).find('.geneboxNaviWhole'), {
                click: "_launchPicker"
            });
        }
        this.refresh();
    },
    _launchPicker: function() {
        console.error('Launch picker has no picker to launch: override in the genebox definition.')
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    updateValue: function(newValue, newGradientValue) {
        let options = this.options
        options.value = newValue
        if(options.hasGradient) {
            options.gradientValue = newGradientValue
        }
        this.refresh();
    },
    refreshValue: function() {
        var str = this.options.value;
        if(this.options.showSign) {
            str = "+" + String(str);
        }
        this.element.find('.geneValue').text(str);

    },

    refreshColor: function() {

        if(this.options.hasColor) {
            $(this.element).css('background-color', this.options.value);
        }

    },

    refreshGradient: function() {
        if(this.options.hasGradient) {
            var gradientImg = this.element.find('.gradientGene');
            switch (this.options.gradientValue) {
            case SwellType.Swell:
                gradientImg.removeClass('gradientSame gradientShrink');
                gradientImg.addClass('gradientSwell');
                break;
            case SwellType.Shrink:
                gradientImg.removeClass('gradientSame gradientSwell');
                gradientImg.addClass('gradientShrink');
                break;
            case SwellType.Same:
                gradientImg.removeClass('gradientShrink gradientSwell');
                gradientImg.addClass('gradientSame');
                break;
            default:
            }
        }
    },

    refresh : function() {
        this.refreshValue();
        let options = this.options
        if(options.hasColor) {
            this.refreshColor()
        }

        if(options.hasGradient) {  
            this.refreshGradient()
        }
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
        } else if(target.hasClass('geneboxUp')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.TopRung;
        } else if(target.hasClass('geneboxEquals')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.MidRung;
        } else if(target.hasClass('geneboxDown')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.BottomRung;
        } else if(target.hasClass('geneboxNaviWhole')) {
            // geneboxNaviWhole in rung calculation. Picker related? Probably not a problem.
        }
        let options = this.options
        options.geneboxCollection.manipulate(options.geneboxIndex, leftRightPos, rung)
        return false;
    }

});


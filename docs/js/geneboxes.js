$.widget("dawk.monochrome_genebox", {
    options : {
        geneboxIndex : 0,
        value : 0,
        gradientValue : SwellType.Same,
    },
    _create : function() {
        this.options.value = this._constrain(this.options.value);
        this.element.addClass("monochromeGenebox");
        var geneboxInfo = $("<div></div>").addClass("geneboxInfo");

        var geneValueSpan = geneboxInfo.append(
                $("<img>").attr("src", "img/swellcircle.png").addClass(
                "gradientGene")).append(
                        $("<span></span>").addClass('geneValue'));

        var geneboxNavi = $("<div></div>").addClass('geneboxNavi');
        var geneboxLeft = $("<div></div>").addClass('geneboxLeft');
        var geneboxMid = $("<div></div>").addClass('geneboxMid')
        .append($("<div></div>").addClass('geneboxUp')).append(
                $("<div></div>").addClass('geneboxEquals'))
                .append($("<div></div>").addClass('geneboxDown'));
        var geneboxRight = $("<div></div>").addClass('geneboxRight');

        geneboxNavi.append(geneboxLeft).append(geneboxMid).append(
                geneboxRight);

        this.element.append(geneboxInfo).append(geneboxNavi);

        this.refresh();
    },
    _setOption : function(key, value) {
//        console.log('setOption ' + key + ": " + value);
        if (key === "value") {
            value = this._constrain(value);
        }
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    refresh : function() {
        this.element.find('.geneValue').text(this.options.value);
        var gradientImg = this.element.find('.gradientGene');
//        console.log("gradientValue " + this.options.gradientValue);
        switch (this.options.gradientValue) {
        case SwellType.Swell:
//            console.log('refresh finds Swell');
            gradientImg.removeClass('gradientSame gradientShrink');
            gradientImg.addClass('gradientSwell');
            break;
        case SwellType.Shrink:
//            console.log('refresh finds Shrink');
            gradientImg.removeClass('gradientSame gradientSwell');
            gradientImg.addClass('gradientShrink');
            break;
        case SwellType.Same:
//            console.log('refresh finds Same');
            gradientImg.removeClass('gradientShrink gradientSwell');
            gradientImg.addClass('gradientSame');
            break;
        default:
            console.log('Illegal gradientValue: '
                    + this.options.gradientValue);
        }
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
    _destroy : function() {
        this.element.removeClass("monochromeGenebox").text("");
    }
});



$.widget('dawk.monochrome_geneboxes', {
    options : {
        numGeneBoxes : 16
    },
    _create : function() {
        this.element.addClass("monochromeGeneboxes");
        for (i = 0; i < this.options.numGeneBoxes; i++) {
            var geneBox = $("<div></div>").monochrome_genebox({});
            geneBox.monochrome_genebox("option", "value", Math.trunc(Math
                    .random() * 10));
            switch (Math.trunc(Math.random() * 3)) {
            case 0:
                geneBox.monochrome_genebox("option", "gradientValue",
                        SwellType.Swell);
                break;
            case 1:
                geneBox.monochrome_genebox("option", "gradientValue",
                        SwellType.Shrink);
                break;
            case 2:
                geneBox.monochrome_genebox("option", "gradientValue",
                        SwellType.Same);
                break;
            }
            this.element.append(geneBox);
        }
        this.refresh();
    },
    _setOption : function(key, value) {
//        console.log('setOption ' + key + ": " + value);
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    refresh : function() {
    },
    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }
});

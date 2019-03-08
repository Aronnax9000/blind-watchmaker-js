
var HorizPos = {
        LeftThird: 1,
        MidThird: 2,
        RightThird: 3,
        properties: {
            1: {name: "LeftThird"},
            2: {name: "MidThird"},
            3: {name: "RightThird"}
        }
};

var VertPos = {
        TopRung: 1,
        MidRung: 2,
        BottomRung: 3,
        properties: {
            1: {name: "TopRung"},
            2: {name: "MidRung"},
            3: {name: "BottomRung"}
        }
};

$.widget('dawk.geneboxes', {
    options : {
        engineering: true,
        session: null,
        numGeneBoxes : 16,
        biomorph: null,
    },    
    _create: function(options) {
        this._setOptions(options);
        $(this.element).addClass('geneboxes')
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) { 
        let options = this.options
        options.biomorph.manipulation(geneboxIndex, leftRightPos, rung);
        var canvas = $(this.element).parent().find('canvas').get(0);
        this.updateFromCanvas(canvas);
        options.biomorph.develop();
    },
})


/**
 * Spokes genebox
 */

$.widget( "dawk.spokesGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasMid: true,
        title: 'Spokes'
    },
    _create: function() {
        this.element.addClass('spokesGenebox')
        return this._super()
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        var properties = SpokesType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
});

$.widget( "dawk.gene1to9box", $.dawk.biomorph_genebox, {
    options: {
        hasGradient: true
    },
    _create: function() {
        this.element.addClass('gene1to9box')
        return this._super()
    },

});

$.widget( "dawk.segNoGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
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
    _create: function() {
        this.element.addClass('segNoGenebox')
        return this._super()
    },
});

$.widget( "dawk.segDistGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasGradient: true,
        showSign: true
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
    _create: function() {
        this.element.addClass('segDistGenebox')
        return this._super()
    },
} );


$.widget( "dawk.completenessGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
    },
    refresh: function() {
        var properties = CompletenessType.properties[this.options.value];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
    _create: function() {
        this.element.addClass('completenessGenebox')
        return this._super()
    },
} );


$.widget( "dawk.trickleGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
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
    _create: function() {
        this.element.addClass('trickleGenebox')
        return this._super()
    },
});

$.widget( "dawk.thicknessGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
    },
    refresh: function() {
        var str = this.options.value;
        this.element.find('.geneValue').text(str);
    },
    _create: function() {
        this.element.addClass('thicknessGenebox')
        return this._super()
    },
});

$.widget( "dawk.mutSizeGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
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
    _create: function() {
        this.element.addClass('mutSizeGenebox')
        return this._super()
    },
});

$.widget( "dawk.mutProbGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
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
    _create: function() {
        this.element.addClass('mutProbGenebox')
        return this._super()
    },
});

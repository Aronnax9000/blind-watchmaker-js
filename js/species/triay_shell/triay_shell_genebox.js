// Number.parseFloat(x).toFixed(2);
$.widget( "dawk.floatGenebox", $.dawk.biomorph_genebox, {
    _create: function(options) {
        this._super(options)
    },
    _init : function() {
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    refresh: function() {
        this.element.find('.geneValue')
        .text(String(Number.parseFloat(this.options.value).toFixed(2)));
    },    

} );

$.widget( "dawk.handednessGenebox", $.dawk.biomorph_genebox, {
    _create: function(options) {
        this._super(options)
    },
    _init : function() {
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    refresh: function() {
        this.element.find('.geneValue')
        .text(this.options.value == -1 ? 'Left' : 'Right');
    },    
} );

$.widget('dawk.engineeringWindow', {
    options: {},
    _create: function() {
        $(this.element).addClass('engineeringWindow');
        var geneboxes = $("<div></div>").monochrome_geneboxes({
            engineering : true
        });
        this.element.append(geneboxes);
        var engineeringDiv = $("<div></div>").engineeringBox({ 
            height: 600,
            width: 1000});
        this.element.append(engineeringDiv);
        doPerson("BasicTree", $(engineeringDiv).find('canvas').get(0));
    },

    // Called when created, and later when changing options
    _refresh: function() {
    },

    _destroy: function() {
    },

    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
    },

    // _setOption is called for each individual option that is changing
    _setOption: function( key, value ) {
        this._super( key, value );
    }
});
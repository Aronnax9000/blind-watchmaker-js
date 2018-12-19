
$.widget('dawk.engineeringWindow', $.dawk.watchmakerView, {
    options: {},
    _create: function() {
        this._super("_create");
        $(this.element).addClass('engineeringWindow');
        var speciesFactory = this.options.speciesFactory;
        var geneboxes_options = {
            engineering : true,
            speciesFactory: speciesFactory,
        }
        var geneboxes = $("<div></div>");
        speciesFactory.geneboxes.call(geneboxes, geneboxes_options);
        this.element.append(geneboxes);
        var engineeringDiv = $("<div></div>").engineeringBox({ 
            height: 600,
            width: 1000});
        this.element.append(engineeringDiv);
        speciesFactory.doPerson("BasicTree", $(engineeringDiv).find('canvas').get(0));
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
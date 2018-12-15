$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.engineeringBoxes", {
        // default options
        options: {
        },

        // The constructor
        _create: function() {
            var boxes = this.element;

            $(boxes).attr('id', 'boxes').addClass('engineering');
            var canvas = $("<div></div>").breedingBox({ 
                boxIndex: 0, 
                isMidBox: true,
                height: 600,
                width: 1000,
                breedingBoxes: this}).appendTo(boxes);
            this.options.midCanvasDiv = canvas;
        
            this._refresh();
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
} );

$.widget('dawk.engineeringWindow', {
    options: {},
    _create: function() {
        var geneboxes = initGeneboxes(this.element, {
            engineering : true
        });
        var boxes = $("<div></div>").engineeringBoxes({
            numBoxes : 1,
            cols : 1
        }).appendTo(this.element);
        doPerson("BasicTree", 'canvas0');
    }
});
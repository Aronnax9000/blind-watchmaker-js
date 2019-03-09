$.widget('dawk.engineeringView', $.dawk.watchmakerView, {
    _create: function() {
        this._super("_create")
        $(this.element).addClass('engineeringView')
        var species = this.options.session.species

        var geneboxes_options = {
            engineering : true,
            session: this.options.session
        }
        var geneboxes = $("<div></div>")
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes)
        var engineeringDiv = $("<div></div>").engineeringBox({ 
            species: species,
            height: 600,
            width: 1000})
            this.element.append(engineeringDiv)
            var canvas = $(engineeringDiv).find('canvas').get(0)
            var biomorph = _speciesFactorySingleton.getSpecies(species, this.options.session, canvas)
            if(this.options.biomorph) {
                this.options.biomorph.copyBiomorph(biomorph)
            } else {
                biomorph.doPerson(this.options.session.options.defaultBasicType)
            }
        this.options.menuHandler.nextMenuHandler = new EngineeringMenuHandler()

        jQuery.data(canvas, 'genotype', biomorph)
        biomorph.develop()
        $(canvas).trigger('mouseover')

    },
    viewGainedFocus: function(event) {
        let session = $(this).engineeringView("option", "session")
        $(this).engineeringView("updateMenus", session, this)
        session.updateMenus(session, this)
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



function EngineeringMenuHandler() {
}

EngineeringMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'HelpWithCurrentOperation':
        $("<div>").helpDialog({helpkey: 'ENGINEERING_HELP', appendTo: $(target).closest('.watchmakerView')})
    }
    return true;
}


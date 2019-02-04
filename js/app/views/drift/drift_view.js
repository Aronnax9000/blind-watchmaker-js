$.widget('dawk.driftView', $.dawk.watchmakerView, {
    _create: function() {
        this._super("_create")
        $(this.element).addClass('driftView')
        var species = this.options.session.species
        
        var geneboxes_options = {
            engineering : false,
            session: this.options.session
        }
        var geneboxes = $("<div>")
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes)
        var driftDiv = $("<div>").driftBox({ 
            species: species,
            height: 600,
            width: 1000})
        this.element.append(driftDiv)
        var canvas = $(driftDiv).find('canvas').get(0)
        var biomorph = _speciesFactorySingleton.getSpecies(species, this.options.session, canvas)
        if(this.options.biomorph) {
            this.options.biomorph.copyBiomorph(biomorph)
        } else {
            biomorph.doPerson("BasicTree")
        }
            
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        $(driftDiv).driftBox('doDrift')
        
    },
    viewGainedFocus: function(event) {
        let session = $(this).driftView("option", "session")
        session.viewGainedFocus(session, this)
    },
    // Called when created, and later when changing options
    _refresh: function() {
    },

    _destroy: function() {
    },


});
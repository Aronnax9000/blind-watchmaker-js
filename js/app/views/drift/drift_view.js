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
        $(driftDiv).driftBox('update')
        $(driftDiv).driftBox('startDrift')
        
    },
    viewGainedFocus: function(event, ui) {
        console.log('drift view gained focus')
        console.log(ui)
        driftDiv = $(ui.newPanel).find('.driftBox') 
        $(driftDiv).driftBox("startDrift")
    },
    viewLostFocus: function(event, ui) {
        console.log('drift view lost focus')
        console.log(ui.oldPanel)
        driftDiv = $(ui.oldPanel).find('.driftBox') 
        $(driftDiv).driftBox("stopDrift")
        
    },

    // Called when created, and later when changing options
    _refresh: function() {
    },

    _destroy: function() {
    },


});
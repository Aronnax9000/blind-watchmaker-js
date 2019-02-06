$.widget('dawk.sweepView', $.dawk.watchmakerView, {
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
        
        
        let container = $("<div class='container'>")
        this.element.append(container)

        var sweepDiv = $("<div>").sweepBoxes({ 
            species: species,
            height: 200,
            width: 200})
       
        container.append(sweepDiv)
        var canvas = $(sweepDiv).find('canvas').get(0)
        var biomorph = _speciesFactorySingleton.getSpecies(species, this.options.session, canvas)
        if(this.options.biomorph) {
            this.options.biomorph.copyBiomorph(biomorph)
        } else {
            biomorph.doPerson("BasicTree")
        }
           
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        $(sweepDiv).sweepBoxes('update')
        $(sweepDiv).sweepBoxes('startDrift')
        
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
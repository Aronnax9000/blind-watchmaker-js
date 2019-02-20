
function WatchmakerSession(species) {
    this.options = []
    this.albums = []
    this.album = new Album('Session Album', this)
    this.myPenSize = 1;
    this.trianglable = false
    this.arrayable = false
    this.driftsweep = false
    this.buildMenus = function(menu) {}
    this.updateMenus = function(session, view) {}
    this.species = species
    this.fossilizing = false
    this.fossilrecord = null
    _speciesFactorySingleton.initializeSession(species, this)
}

WatchmakerSession.prototype.getModel = function() {
    return {options: this.options, 
        myPenSize: this.myPenSize, 
        trianglable: this.trianglable,
        arrayable: this.arrayable,
        driftsweep: this.driftsweep,
        species: this.species,
        fossilizing: this.fossilizing
    }
}

WatchmakerSession.prototype.menuclick = function(event) {
    console.log('WatchmakerSession menuclick')
    return true
}



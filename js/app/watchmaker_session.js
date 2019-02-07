
function WatchmakerSession(species) {
    this.options = []
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

WatchmakerSession.prototype.menuclick = function(event) {
    console.log('WatchmakerSession menuclick')
    return true
}



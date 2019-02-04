
function WatchmakerSession(species) {
    this.options = []
    this.myPenSize = 1;
    this.trianglable = false
    this.arrayable = false
    this.species = species
    _speciesFactorySingleton.initializeSession(species, this)
}

WatchmakerSession.prototype.menuclick = function(event) {
    console.log('WatchmakerSession menuclick')
    return true
}

WatchmakerSession.prototype.buildMenus = function(menu) {
    
}

WatchmakerSession.prototype.viewGainedFocus = function(view) {

}

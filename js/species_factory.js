function SpeciesFactory() {
    this.constructorFunctions = {}
    this.sessionInitializers = {}
    this.geneboxesWidgets = {}
    this.geneboxesCallbacks = {}
}

SpeciesFactory.prototype.registerSpeciesType = function(speciesType, 
        constructorFunction, 
        sessionInitializer,
        geneboxesWidget,
        geneboxesCallback) {
    this.constructorFunctions[speciesType] = constructorFunction
    this.sessionInitializers[speciesType] = sessionInitializer
    this.geneboxesWidgets[speciesType] = geneboxesWidget
    this.geneboxesCallbacks[speciesType] = geneboxesCallback
     console.log("Registered Species Type " + speciesType);
    // console.log("Constructor")
    // console.log(this.constructorFunctions[speciesType])
    // console.log("Session initializer ")
    // console.log(this.sessionInitializers[speciesType])
}

SpeciesFactory.prototype.getSpecies = function(speciesFactoryType, session, canvas) {
    var species = null;
    try {
        species = this.constructorFunctions[speciesFactoryType](session, canvas)
    } catch (err) {
        console.error(err)
        console.error("SpeciesFactory can't find a registered species for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        console.error('session')
        console.error(session)
        console.error('drawer')
        console.error(drawer)
        console.error('geneboxes')
        console.error(geneboxes)
        for(let propt in this.constructorFunctions) {
            // console.log(propt + ': ' + this.constructorFunctions[propt]);
        }
        
    }
    if(species != null)
        // console.log("Got species for " + speciesFactoryType);
    return species;
}
SpeciesFactory.prototype.initializeSession = function(speciesFactoryType, session) {
    var species = null;
    try {
        species = this.sessionInitializers[speciesFactoryType](session);
    } catch (err) {
        console.error("SpeciesFactory can't find a registered session initializer for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        for(let propt in this.sessionInitializers){
            // console.log(propt + ': ' + this.sessionInitializers[propt]);
        }
        // console.log("err: " + err);
    }
    if(species != null)
        // console.log("Got session initializer for " + speciesFactoryType);
    return species;
}

SpeciesFactory.prototype.geneboxes = function(speciesFactoryType, 
        geneboxes, geneboxes_options) {
    var species = null;
    try {
        species = this.geneboxesWidgets[speciesFactoryType](geneboxes, geneboxes_options);
    } catch (err) {
        console.error("SpeciesFactory can't find a registered geneboxes widget for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        for(let propt in this.sessionInitializers){
            // console.log(propt + ': ' + this.sessionInitializers[propt]);
        }
        // console.log("err: " + err);
    }
    if(species != null)
        // console.log("Got session initializer for " + speciesFactoryType);
    return species;
}

SpeciesFactory.prototype.updateFromCanvas = function(speciesFactoryType, 
        geneboxes, canvas) {
    var species = null;
    try {
        species = this.geneboxesCallbacks[speciesFactoryType](geneboxes, canvas);
    } catch (err) {
        console.error("SpeciesFactory can't find a registered geneboxes callback for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        for(let propt in this.geneboxesCallbacks){
            // console.log(propt + ': ' + this.geneboxesCallbacks[propt]);
        }
        // console.log("err: " + err);
    }
    if(species != null)
        // console.log("Got sgeneboxes callback for " + speciesFactoryType);
    return species;
}

var _speciesFactorySingleton = new SpeciesFactory();

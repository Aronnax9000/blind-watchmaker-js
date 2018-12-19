function speciesFactory_registerSpeciesType(speciesType, constructorFunction) {
    this.properties[speciesType] = constructorFunction;
    console.log("Registered Species Type " + speciesType);
}

function speciesFactory_getSpecies(speciesFactoryType) {
    var species = null;
    try {
        species = this.properties[speciesFactoryType]();
    } catch (err) {
        console.error("SpeciesFactory can't find a registered species for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        for(var propt in this.properties){
            console.log(propt + ': ' + this.properties[propt]);
        }
        console.log("err: " + err);
    }
    if(species != null)
        console.log("Got species for " + speciesFactoryType);
    return species;
}

function SpeciesFactory() {
    this.properties = {};
    this.registerSpeciesType = speciesFactory_registerSpeciesType;
    this.getSpecies = speciesFactory_getSpecies;
}


var _speciesFactorySingleton = new SpeciesFactory();

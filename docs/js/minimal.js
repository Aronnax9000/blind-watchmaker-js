/*
 * Constructor for the Minimal biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort of drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property of
 * 'species', a string containing the name of the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */
function MinimalSpecies(session, drawer) {
    console.log('new MinimalSpecies')
    this.session = session
    this.drawer = drawer
}

MinimalSpecies.initializeSession = function(session) {
    console.log('MinimalSpecies.initializeSession')
}

$.widget('dawk.minimalspecies_geneboxes', {
    options : {
        engineering: true,
        biomorph: null,
    },
    updateFromCanvas: function(canvas) {
    },
});

// initializes the biomorph's genotype as one of a named set of types.
MinimalSpecies.prototype.doPerson = function(morphType) {
    console.log('MinimalSpecies doPerson ' + morphType)
} 
MinimalSpecies.prototype.doSaltation = function() {
    console.log('MinimalSpecies.doSaltation')
}
// initializes the biomorph's genotype to a random set of values
// causes the biomorph's genotype to undergo a random mutation
MinimalSpecies.prototype.mutate = function() {
    console.log('MinimalSpecies.mutate')
}
//creates and returns a new, mutated copy of the biomorph.
MinimalSpecies.prototype.reproduce = function(element) {
    return new MinimalSpecies(this.session, element)
}
// called when it is time for the biomorph to draw itself. 
MinimalSpecies.prototype.develop = function() {
    console.log('MinimalSpecies.develop')
}
MinimalSpecies.prototype.manipulate = function(geneboxIndex, leftRightPos, rung) {
    console.log('MinimalSpecies.manipulate')
}

//Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("MinimalSpecies", 
        (function(session, drawer) { return new MinimalSpecies(session, drawer)}),
        (function(session) { MinimalSpecies.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.minimalspecies_geneboxes.call(geneboxes, geneboxes_options) }));


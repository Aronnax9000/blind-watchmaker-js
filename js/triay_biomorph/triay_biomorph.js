function TriayBiomorphs(session, drawer) {
    console.log('new TriayBiomorphs')
    this.session = session
    this.drawer = drawer
}

TriayBiomorphs.initializeSession = function(session) {
    console.log('TriayBiomorphs.initializeSession')
}

// initializes the biomorph's genotype as one of a named set of types.
TriayBiomorphs.prototype.doPerson = function(morphType) {
    console.log('TriayBiomorphs doPerson ' + morphType)
    var drawer = this.drawer
    this.triay_biomorph = new Biomorph(drawer.getContext('2d'), 
            drawer.width,
            drawer.height,
            null)
    // Artificially jacked up for demonstration purposes. Normal value is 10. -- ABC
//    this.triay_biomorph.mutProbGene = 100

} 
TriayBiomorphs.prototype.doSaltation = function() {
    console.log('TriayBiomorphs.doSaltation')
    this.triay_biomorph.randomize()
}
// initializes the biomorph's genotype to a random set of values
// causes the biomorph's genotype to undergo a random mutation
TriayBiomorphs.prototype.mutate = function() {
    console.log('TriayBiomorphs.mutate')
}
//creates and returns a new, mutated copy of the biomorph.
TriayBiomorphs.prototype.reproduce = function(element) {
    var child = new TriayBiomorphs(this.session, element)
    child.triay_biomorph = this.triay_biomorph.breed(element)
    return child
}
// called when it is time for the biomorph to draw itself. 
TriayBiomorphs.prototype.develop = function() {
    console.log('TriayBiomorphs.develop')
    this.triay_biomorph.ctx = this.drawer.getContext('2d')
    this.triay_biomorph.drawWithImages()
}
TriayBiomorphs.prototype.manipulate = function(geneboxIndex, leftRightPos, rung) {
    console.log('TriayBiomorphs.manipulate')
}

//Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Triay Biomorph", 
        (function(session, drawer) { return new TriayBiomorphs(session, drawer)}),
        (function(session) { TriayBiomorphs.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.triay_biomorph_geneboxes.call(geneboxes, geneboxes_options) }),
        (function(geneboxes, canvas) { 
            $(geneboxes).triay_biomorph_geneboxes('updateFromCanvas', canvas)}));


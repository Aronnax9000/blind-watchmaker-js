function TriayBiomorphs(session, drawer) {
    this.session = session
    this.drawer = drawer
//    this.full = null
}

TriayBiomorphs.prototype.copyBiomorph = function(child) {
    child.triay_biomorph = new Biomorph (child.drawer.getContext('2d'), 
            child.drawer.width, child.drawer.height, this.triay_biomorph)

}

TriayBiomorphs.initializeSession = function(session) {
    session.options.sessionIcon = 'img/BWSpiderLogoMono_ICNO_23096_32x32.png'
        session.options.basicTypes = ['Hopeful Monster',
            'BasicTree',
            'Chess',
            'Insect']
            session.options.defaultBasicType = 'Hopeful Monster'
            session.options.hopefulMonsterBasicType = 'Hopeful Monster'
}

/*
 * Triay monochrome biomorph bounding box calculations.
 * Triay monochrome biomorphs store this as a Rect-like
 * structure in the this.biomorph.box property
 */

TriayBiomorphs.prototype.dummydraw = function() {
    var tempDrawer = this.drawer
    this.drawer = Document.createElement('canvas')
    this.develop()
    this.drawer = tempDrawer
}

TriayBiomorphs.prototype.getWidth = function() {
    if(this.triay_biomorph.box == null) {
        dummydraw()
    }
    let margin = this.triay_biomorph.box
    return margin.right - margin.left
}
TriayBiomorphs.prototype.getHeight = function() {
    if(this.triay_biomorph.box == null) {
        dummydraw()
    }
    let margin = this.triay_biomorph.box
    return margin.bottom - margin.top
}
TriayBiomorphs.prototype.getRect = function() {
    if(this.triay_biomorph.box == null) {
        dummydraw()
    }
    let margin = this.triay_biomorph.box
    return new Rect(0,0, margin.right - margin.left,
            margin.bottom - margin.top)
}


TriayBiomorphs.prototype.doSaltation = function() {
    this.triay_biomorph.randomize()
}
// initializes the biomorph's genotype to a random set of values
// causes the biomorph's genotype to undergo a random mutation
TriayBiomorphs.prototype.mutate = function() {
}
//creates and returns a new, mutated copy of the biomorph.
TriayBiomorphs.prototype.reproduce = function(element) {
    var child = new TriayBiomorphs(this.session, element)
    child.triay_biomorph = this.triay_biomorph.breed(element)
    return child
}
// called when it is time for the biomorph to draw itself. 
TriayBiomorphs.prototype.develop = function() {
    this.triay_biomorph.ctx = this.drawer.getContext('2d')
    this.triay_biomorph.generate()
    this.triay_biomorph.drawWithImages()
}


//Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Triay Biomorph", 
        (function(session, drawer) { return new TriayBiomorphs(session, drawer)}),
        (function(session) { TriayBiomorphs.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.triay_biomorph_geneboxes.call(geneboxes, geneboxes_options) }),
        (function(geneboxes, canvas) { 
            $(geneboxes).triay_biomorph_geneboxes('updateFromCanvas', canvas)}));


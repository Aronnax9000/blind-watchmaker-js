/*
 * Constructor for the Monochrome biomorph species.
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
function Monochrome(session, drawer) {
    this.session = session
    this.drawer = drawer
    // Hang the new biomorph off of the drawing element as a data attribute,
    // so the GUI can shift focus from one biomorph to another in response
    // to GUI events, such as mouseover in breeding view.
    this.gene = chromosome()
    this.dGene = new Array(10)
    for(let i = 0; i < 10; i++) {
        this.dGene[i] = SwellType.Same
    }
    this.segNoGene = 0
    this.segDistGene = 0
    this.completenessGene = CompletenessType.Single
    this.spokesGene = SpokesType.NorthOnly
    this.trickleGene = TRICKLE
    this.mutSizeGene = 0
    this.mutProbGene = 0
    this.pic = new Pic(this, drawer)
}

// Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Monochrome", 
        (function(session, drawer) { return new Monochrome(session, drawer);}),
        (function(session) { Monochrome.initializeMut(session);}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.monochrome_geneboxes.call(geneboxes, geneboxes_options) }));

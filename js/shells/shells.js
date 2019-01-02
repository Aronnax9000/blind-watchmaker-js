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
function Shells(session, drawer) {
    console.log('new Shells')
    this.session = session
    this.drawer = drawer
}

Shells.initializeSession = function(session) {
    console.log('Shells.initializeSession')
}

$.widget('dawk.shells_geneboxes', {
    options : {
        engineering: true,
        biomorph: null,
    },
    _create : function(options) {
        this._setOptions(options);

        this.element.addClass("monochromeGeneboxes");
        
        for(let i = 0; i < 4; i++) {
            var geneBoxTitle = 'Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Floating point';
            }
            var geneBox = $("<div></div>").gene1to9box({
                geneboxCollection: this, 
                title: geneBoxTitle});
            geneBox.gene1to9box("option", "geneboxIndex", i + 1);
            this.element.append(geneBox);
        }
        
        this.refresh();
    },

    updateFromCanvas: function(canvas) {
    },
});

// initializes the biomorph's genotype as one of a named set of types.
Shells.prototype.doPerson = function(morphType) {
    console.log('Shells doPerson ' + morphType)
    var drawer = this.drawer
    this.shell = new Shell(drawer.getContext('2d'), 
            drawer.width,
            drawer.height,
            null)
    // Artificially jacked up for demonstration purposes. Normal value is 10. -- ABC
//    this.shell.mutProbGene = 100

} 
Shells.prototype.doSaltation = function() {
    console.log('Shells.doSaltation')
    this.shell.randomize()
}
// initializes the biomorph's genotype to a random set of values
// causes the biomorph's genotype to undergo a random mutation
Shells.prototype.mutate = function() {
    console.log('Shells.mutate')
}
//creates and returns a new, mutated copy of the biomorph.
Shells.prototype.reproduce = function(element) {
    var child = new Shells(this.session, element)
    child.shell = this.shell.breed(element)
    return child
}
// called when it is time for the biomorph to draw itself. 
Shells.prototype.develop = function() {
    console.log('Shells.develop')
    this.shell.ctx = this.drawer.getContext('2d')
    this.shell.draw()
}
Shells.prototype.manipulate = function(geneboxIndex, leftRightPos, rung) {
    console.log('Shells.manipulate')
}

//Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Shells", 
        (function(session, drawer) { return new Shells(session, drawer)}),
        (function(session) { Shells.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.shells_geneboxes.call(geneboxes, geneboxes_options) }),
        (function(geneboxes, canvas) { 
            $(geneboxes).shells_geneboxes('updateFromCanvas', canvas)}));



/*
 * Constructor for the Colour biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort) { drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property) {
 * 'species', a string containing the name) { the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */
function ColourBiomorph(session, drawer) {
    this.session = session
    this.drawer = drawer
    this.gene = chromosome()
    this.dGene = new Array(10)
    for(let i = 0; i < 10; i++) {
        this.dGene[i] = SwellType.Same
    }
    this.segNoGene = 0
    this.segDistGene = 0
    this.completenessGene = CompletenessType.Single
    this.spokesGene = SpokesType.NorthOnly
    this.trickleGene = session.options.trickle
    this.mutSizeGene = 0
    this.mutProbGene = 0
    this.colorGene = [0,0,0,0,0,0,0,0]
    this.backColorGene = 0
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Open;
    this.thicknessGene = 1
    this.pic = new ColourPic(this)

}



ColourBiomorph.Rainbow = 256

ColourBiomorph.prototype.randomForeColour = function() {
    for(let j = 0; j < 8; j++) {
        this.colorGene[j] = Monochrome.randInt(ColourBiomorph.Rainbow)
    }
}

ColourBiomorph.prototype.randomBackColour = function() {
    this.backColorGene = Monochrome.randInt(ColourBiomorph.Rainbow)
}
ColourBiomorph.prototype.direction = function() {
    if(Monochrome.randInt(2) == 2) { 
        return this.mutSizeGene
    } else {
        return -this.mutSizeGene
    }
}

ColourBiomorph.prototype.direction9 = function() {
    return Monochrome.randInt(2) == 2 ? 1 : -1
}



//creates and returns a new, mutated copy) { the biomorph.
ColourBiomorph.prototype.reproduce = function(element) {
    let child = new ColourBiomorph(this.session, element);
    this.copyBiomorph(child);
    child.mutate();
    return child;
    
}


//Register the Colour biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Colour", 
        (function(session, drawer) { return new ColourBiomorph(session, drawer)}),
        (function(session) { ColourBiomorph.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.colour_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).colour_geneboxes('updateFromCanvas', canvas)}));


ColourBiomorph.prototype.tree = function(x, y, lgth, dir, dx, dy, color, oddOne, order) {
    if(dir < 0)
        dir = dir + 8
    if(dir >= 8)
        dir = dir - 8

    var xnew = x + Math.trunc(lgth * dx[dir] / this.trickleGene);
    var ynew = y + Math.trunc(lgth * dy[dir] / this.trickleGene);

    // Classic had +1 for 1-based arrays
    let subscript = (this.gene[9] - lgth) % 8;
    
    this.pic.picLine(x, y, xnew, ynew, this.colorGene[subscript]);

    if(lgth > 1)
        if(oddOne) {
            this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, color, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, color, oddOne, order);
        } else {
            this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, color, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, color, oddOne, order);
        }
} // {tree}

// Classic used 0-based arrays for dx and dy, and 1-based for gene.
ColourBiomorph.prototype.plugIn = function(gene, dx, dy) {
    let order = gene[8];
    dx[3] = gene[0];
    dx[4] = gene[1];
    dx[5] = gene[2];
    dy[2] = gene[3];
    dy[3] = gene[4];
    dy[4] = gene[5];
    dy[5] = gene[6];
    dy[6] = gene[7];
    dx[1] = -dx[3];
    dy[1] = dy[3];
    dx[0] = -dx[4];
    dy[0] = dy[4];
    dx[7] = -dx[5];
    dy[7] = dy[5];
    dx[2] = 0;
    dx[6] = 0;
    return order;
}

//called when it is time for the biomorph to draw itself. 
ColourBiomorph.prototype.develop = Biomorphs.prototype.develop

/*
 * Colour biomorph bounding box calculations.
 * Colour biomorphs store this as a Rect
 * in the this.pic.margin property
 * 
 * Colour Biomorphs have Monochrome biomorphs as ancestors
 */

ColourBiomorph.prototype.dummydraw = Biomorphs.prototype.dummydraw 
ColourBiomorph.prototype.getWidth = Biomorphs.prototype.getWidth
ColourBiomorph.prototype.getHeight = Biomorphs.prototype.getHeight
ColourBiomorph.prototype.getRect = Biomorphs.prototype.getRect


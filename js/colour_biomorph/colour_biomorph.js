// type
//            SwellType = (Swell, Same, Shrink);
//            chromosome = array[1..9] of INTEGER;
//            CompletenessType = (Single, Double);
//            SpokesType = (NorthOnly, NSouth, Radial);
//            LimbType = (Stick, Oval, Rectangle);
//            LimbFillType = (Open, Filled);
//            person = record
//                    gene: chromosome;
//                    colorgene: array[1..8] of Longint;{index in clut}
//                    BackColorGene: LongInt;{index in clut}
//                    dgene: array[1..10] of SwellType;
//                    SegNoGene: INTEGER;
//                    SegDistGene: INTEGER;
//                    CompletenessGene: CompletenessType;
//                    SpokesGene: SpokesType;
//                    tricklegene, mutsizegene, mutprobgene: INTEGER;
//                    LimbShapeGene: LimbType;
//                    LimbFillGene: LimbFillType;
//                    ThicknessGene: INTEGER;
//                    bioPicture: picHandle;
//            end;
var LimbType = {
        Stick: 1,
        Oval: 2,
        Rectangle: 3,
        properties: {
            1: {name: "Stick"},
            2: {name: "Oval"},
            3: {name: "Rectangle"}
        }
}

var LimbFillType = {
        Open: 1,
        Filled: 2,
        properties: {
            1: {name: "Open"},
            2: {name: "Filled"},
        }
}

/*
 * Constructor for the Colour biomorph species.
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
function ColourBiomorph(session, drawer) {
    console.log('new ColourBiomorph')
    this.session = session
    this.drawer = drawer
    this.gene = chromosome()
    this.dGene = new Array(10)
    for(let i = 0; i < 10; i++) {
        this.dGene[i] = SwellType.Same
    }
    this.segNoGene = 0
    this.segDistGene = 0
    this.completenessGene = CompletenessType.Sbingle
    this.spokesGene = SpokesType.NorthOnly
    this.trickleGene = TRICKLE
    this.mutSizeGene = 0
    this.mutProbGene = 0
    this.colorGene = [0,0,0,0,0,0,0,0]
    this.backColorGene = 0
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Open;
    this.thicknessGene = 1
    this.pic = new ColourPic(this)
    
}

ColourBiomorph.initializeSession = function(session) {
    console.log('ColourBiomorph.initializeSession')
}

$.widget('dawk.colourbiomorph_geneboxes', {
    options : {
        engineering: true,
        biomorph: null,
    },
    updateFromCanvas: function(canvas) {
    },
});

// initializes the biomorph's genotype as one of a named set of types.
ColourBiomorph.prototype.doPerson = function(morphType) {
    console.log('ColourBiomorph doPerson ' + morphType)
} 
ColourBiomorph.prototype.doSaltation = function() {
    console.log('ColourBiomorph.doSaltation')
}
// initializes the biomorph's genotype to a random set of values
// causes the biomorph's genotype to undergo a random mutation
ColourBiomorph.prototype.mutate = function() {
    console.log('ColourBiomorph.mutate')
}
//creates and returns a new, mutated copy of the biomorph.
ColourBiomorph.prototype.reproduce = function(element) {
    return new ColourBiomorph(this.session, element)
}
// called when it is time for the biomorph to draw itself. 
ColourBiomorph.prototype.develop = function() {
    console.log('ColourBiomorph.develop')
}
ColourBiomorph.prototype.manipulate = function(geneboxIndex, leftRightPos, rung) {
    console.log('ColourBiomorph.manipulate')
}

//Register the Colour biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Colour", 
        (function(session, drawer) { return new ColourBiomorph(session, drawer)}),
        (function(session) { ColourBiomorph.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.colourbiomorph_geneboxes.call(geneboxes, geneboxes_options) }),
        (function(geneboxes, canvas) { 
            $(geneboxes).colourbiomorph_geneboxes('updateFromCanvas', canvas)}));


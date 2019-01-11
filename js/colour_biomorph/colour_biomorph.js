//type
//SwellType = (Swell, Same, Shrink);
//chromosome = array[1..9]) { INTEGER;
//CompletenessType = (Single, Double);
//SpokesType = (NorthOnly, NSouth, Radial);
//LimbType = (Stick, Oval, Rectangle);
//LimbFillType = (Open, Filled);
//person = record
//gene: chromosome;
//this.colorGene: array[1..8]) { Longint;{index in clut}
//this.backColorGene: LongInt;{index in clut}
//this.dGene: array[1..10]) { SwellType;
//this.segNoGene: INTEGER;
//this.segDistGene: INTEGER;
//this.CompletenessGene: CompletenessType;
//this.spokesGene: SpokesType;
//tricklegene, mutsizegene, mutprobgene: INTEGER;
//this.limbShapeGene: LimbType;
//this.limbFillGene: LimbFillType;
//this.thicknessGene: INTEGER;
//bioPicture: picHandle;
//};
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
    this.completenessGene = CompletenessType.Sbingle
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

ColourBiomorph.initializeMut = function(session) {
    var mut = []
    for(let i = 0; i < 13; i++) {
        mut.push(true)
    }
    session.options.mut = mut
}


ColourBiomorph.initializeSession = function(session) {
    session.options.sessionIcon = 'img/BWTreeLogoBlueThin_icl4_17669_32x32.png'
    session.options.trickle = 10
    session.options.palette = new Palette()
    session.options.basicTypes = ["BasicTree", "Chess", "Insect", "New Random Start"]
    session.options.defaultBasicType = ["New Random Start"]
    session.options.hopefulMonsterBasicType = ["New Random Start"]
    
    ColourBiomorph.initializeMut(session)
}

$.widget('dawk.colourbiomorph_geneboxes', {
    options : {
        engineering: true,
        biomorph: null,
    },
    updateFromCanvas: function(canvas) {
    },
});

ColourBiomorph.randLimbType = function() {
    switch(Monochrome.randInt(3)) {
    case 0:
        return LimbType.Stick
    case 1:
        return LimbType.Oval
    case 2:
        return LimbType.Rectangle
    }
}

ColourBiomorph.randLimbFill = function() {
    switch(Monochrome.randInt(2)) {
    case 0:
        return LimbFillType.Open
    case 1:
        return LimbFillType.Filled
    }
}

ColourBiomorph.prototype.makeGenes = function(a, b, c, d, e, f, g, h, i) {
    var trickle = this.session.options.trickle
    for(let j = 0; j < 10; j++) {
        this.dGene[j] = SwellType.Same
    }
    this.segNoGene = 1;
    this.segDistGene = 1;
    this.completenessGene = CompletenessType.Double;
    this.spokesGene = SpokesType.NorthOnly;
    this.trickleGene = trickle;
    this.mutSizeGene = Math.trunc(trickle / 2);
    this.mutProbGene = 10;
    var gene = this.gene
    gene[1] = a
    gene[2] = b
    gene[3] = c
    gene[4] = d
    gene[5] = e
    gene[6] = f
    gene[7] = g
    gene[8] = h
    gene[9] = i
}

ColourBiomorph.prototype.chess = function() {
    var trickle = this.session.options.trickle
    this.makeGenes(-trickle, 3 * trickle, -3 * trickle, -3 * trickle, trickle, -2 * trickle, 6 * trickle, -5 * trickle, 7)
    for(let j = 0; j < 8; j++) {
        this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2);
    }
    this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3);
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
    this.thicknessGene = 1;
}

ColourBiomorph.prototype.basicTree = function() {
    var trickle = this.session.options.trickle
    this.makeGenes(-trickle, -trickle, -trickle, -trickle, -trickle, 0, trickle, trickle, 6);
    for(let j = 0; j < 8; j++) {
        this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
    }
    this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    this.limbShapeGene = LimbType.Stick
    this.limbFillGene = LimbFillType.Filled
    this.thicknessGene = 1
}

ColourBiomorph.prototype.insect = function() {
    var trickle = this.session.options.trickle
    this.makeGenes(trickle, 
            trickle, 
            -4 * trickle, 
            trickle, 
            -trickle, 
            -2 * trickle, 
            8 * trickle, 
            -4 * trickle, 
            6)
    for(let j = 0; j < 8; j++)
        this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
    this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
    this.thicknessGene = 1
}



//initializes the biomorph's genotype as one) { a named set) { types.
ColourBiomorph.prototype.doPerson = function(biomorphType) {
    if(biomorphType) {
        switch(biomorphType) {
        case "Chess": this.chess(); break;
        case "BasicTree": this.basicTree(); break;
        case "Insect": this.insect(); break;
        case "New Random Start":
        default: 
            this.basicTree()
            this.doSaltation()
            break;
        }
    } else {
        this.basicTree()
        this.doSaltation()
    }
    return this;
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

//Unlike Pascal original, uses 0-based arrays.
ColourBiomorph.prototype.doSaltation = function() {
    var mut = this.session.options.mut
    if(mut[0]) {
        this.segNoGene = Monochrome.randInt(6)
        this.segDistGene = Monochrome.randInt(20)
    } else {            
        this.segNoGene  = 1
        this.segDistGene = 1
    }
    var r = Monochrome.randInt(100)
    this.completenessGene = CompletenessType.Double
    if(mut[2]) {
        if(r < 50) 
            this.completenessGene = CompletenessType.Single
            else 
                this.completenessGene = CompletenessType.Double
    }
    r = Monochrome.randInt(100)
    if(mut[3]) {
        if(r < 33)
            this.spokesGene = SpokesType.Radial
            else if(r < 66) 
                this.spokesGene = SpokesType.NSouth
                else 
                    this.spokesGene = SpokesType.NorthOnly
    } else {
        this.spokesGene = SpokesType.NorthOnly
    }
    if(mut[4]) {
        this.trickleGene = 1 + Math.trunc(Monochrome.randInt(100) / 10)
        if(this.trickleGene > 1)
            this.mutSizeGene = this.trickleGene % 2
    }
    if(mut[9]) {
        this.randomForeColour()
    }
    if(mut[7]) {
        this.limbShapeGene = ColourBiomorph.randLimbType()
    }
    if(mut[8]) {
        this.limbFillGene = ColourBiomorph.randLimbFill()
    }
    if(mut[10]) {
        this.randomBackColour()
    }
    if(mut[11]) {
        this.thicknessGene = Monochrome.randInt(3)
    }

    var maxGene

    // Nested do straight outta Roger Emanuel Kaufman -- ABC
    for(let j = 0; j < 8; j++) do {
        if(mut[12]) {
            this.gene[j] = this.mutSizeGene * (Monochrome.randInt(19) - 10)
        }
        if(mut[1]) {
            this.dGene[j] = Monochrome.randSwell(this.dGene[j])
        } else {
            this.dGene[j] = SwellType.Same
        }
        switch(this.dGene[j]) {
        case SwellType.Shrink: {
            factor = 1
            break
        }
        case SwellType.Same: { 
            factor = 0
            break
        }
        case SwellType.Swell: {
            factor = 1
            break
        }
        }
        maxGene = this.gene[j] * this.segNoGene * factor
    } while ((maxGene > 9 * this.trickleGene) 
            || (maxGene < -9 * this.trickleGene));

    do {
        if(mut[1]) {
            this.dGene[9] = Monochrome.randSwell(this.dGene[9])
        } else {
            this.dGene[9] = SwellType.Same
        }

        var factor

        //  Pascal version used dGene[j] here, past the loop, 
        //  which is bad practice as the value of j
        //  is undefined past the loop. In fact, 
        //  in Mac Pascal, j = 9 past the loop, here
        //  decremented to 8 for 0-based arrays.
        switch(this.dGene[8]) {
        case SwellType.Shrink: {
            factor = 1
            break
        }
        case SwellType.Same: {
            factor = 0
            break
        }
        case SwellType.Swell: { 
            factor = 1
            break
        }
        }
        maxGene = this.segDistGene * this.segNoGene * factor
    } while((maxGene > 100) || (maxGene < -100));

    do {
        this.gene[8] = Monochrome.randInt(6)
    } while(this.gene[8] <= 1)
        this.dGene[8] = SwellType.Same;

}

ColourBiomorph.prototype.direction = function() {
    if(Monochrome.randInt(2) == 2) { 
        return this.mutSizegene
    } else {
        return -this.MutSizegene
    }
}

ColourBiomorph.prototype.direction9 = function() {
    return Monochrome.randInt(2) == 2 ? 1 : -1
}

//initializes the biomorph's genotype to a random set) { values
//causes the biomorph's genotype to undergo a random mutation
ColourBiomorph.prototype.mutate = function() {
    var mut = this.session.options.mut
    if(mut[6]) {
        if(Monochrome.randInt(100) < this.mutProbGene) {
            this.mutProbGene = this.mutProbGene + this.direction9();
            if(this.mutProbGene < 1) {
                this.mutProbGene = 1
            }
            if(this.mutProbGene > 100) {
                this.mutProbGene = 100
            }
        }
    }
    if(mut[12]) {
        for(let j = 0; j < 8; j++) {
            if(Monochrome.randInt(100) < this.mutProbGene)
                this.gene[j] += this.direction();
        }
        if(Monochrome.randInt(100) < this.mutProbGene)
            this.gene[8] += this.direction9();
        if(this.gene[8] < 1)
            this.gene[8] = 1;
        if(this.gene[8] > 8)
            this.gene[8] = 8;
    }
    if(mut[9]) {
        for(let j = 0; j < 8; j++)
            if(Monochrome.randInt(100) < this.mutProbGene)
            {
                this.colorGene[j] = this.colorGene[j] + this.direction9();
                if((this.colorGene[j] >= ColourBiomorph.Rainbow))
                    this.colorGene[j] = ColourBiomorph.Rainbow - 1;
                if((this.colorGene[j] < 0))
                    this.colorGene[j] = 0;
            }
    }
    if(mut[7]) {
        if(Monochrome.randInt(100) < this.mutProbGene)
            this.limbShapeGene = ColourBiomorph.randLimbType();

    }
    if(mut[8]) {
        if(Monochrome.randInt(100) < this.mutProbGene)
            this.limbFillGene = ColourBiomorph.randLimbFill();
    }
    if(mut[10]) {
        if(Monochrome.randInt(100) < this.mutProbGene) {
            this.backColorGene = this.backColorGene + this.direction9()
            if(this.backColorGene >= ColourBiomorph.Rainbow) {
                this.backColorGene = ColourBiomorph.Rainbow - 1
            }
            if(this.backColorGene < 0) {
                this.backColorGene = 0
            }
        }
    }
    if(mut[11]) {
        if(Monochrome.randInt(100) < this.mutProbGene)
            this.thicknessGene += this.direction9();
        if(this.thicknessGene < 1)
            this.thicknessGene = 1;
    }
    if(mut[0]) {
        if(Monochrome.randInt(100) < this.mutProbGene)
            this.segNoGene = this.segNoGene + this.direction9();
    }
    if(this.segNoGene < 1) {
        this.segNoGene = 1;
    }
    if(mut[1] && this.segNoGene > 1) {
        for(let j = 0; j < 8; j++)
            if(Monochrome.randInt(100) < this.mutProbGene / 2)
                this.dGene[j] = Monochrome.randSwell(this.dGene[j]);
        if(Monochrome.randInt(100) < this.mutProbGene / 2)
            this.dGene[9] = Monochrome.randSwell(this.dGene[9]);
    }
    if(mut[0] && this.segNoGene > 1) {
        if(Monochrome.randInt(100) < this.mutProbGene)
            this.segDistGene = this.segDistGene + this.direction9()
    }
    if(mut[2]) {
        if(Monochrome.randInt(100) < this.mutProbGene / 2) {
            if(this.CompletenessGene == CompletenessType.Single) {
                this.CompletenessGene = CompletenessType.Double
            } else {
                this.CompletenessGene = CompletenessType.Single
            }
        }
    }
    if(mut[3]) {
        if(Monochrome.randInt(100) < this.mutProbGene / 2)
            switch(this.spokesGene) {
            case SpokesType.NorthOnly: 
                this.spokesGene = SpokesType.NSouth
                break
            case SpokesType.NSouth: 
                if(this.direction9() == 1) {
                    this.spokesGene = SpokesType.Radial
                } else {
                    this.spokesGene = SpokesType.NorthOnly
                }
                break
            case SpokesType.Radial: 
                this.spokesGene = SpokesType.NSouth
                break
            }
    }
    if(mut[4]) {
        if(Monochrome.randInt(100) < this.mutProbGene)
        {
            this.trickleGene = this.trickleGene + this.direction9();
            if(this.trickleGene < 1)
                this.trickleGene = 1
        }
    }
    if(mut[5]) {
        if(Monochrome.randInt(100) < this.mutProbGene)
        {
            this.mutSizeGene = this.mutSizeGene + this.direction9()
            if(this.mutSizeGene < 1)
                this.mutSizeGene = 1
        }
    }
}

ColourBiomorph.prototype.copyBiomorph = function(child) {
    child.gene = this.gene.slice();
    child.dGene = this.dGene.slice();
    child.segNoGene = this.segNoGene;
    child.segDistGene = this.segDistGene;
    child.completenessGene = this.completenessGene;
    child.spokesGene = this.spokesGene;
    child.trickleGene = this.trickleGene;
    child.mutSizeGene = this.mutSizeGene;
    child.mutProbGene = this.mutProbGene;
    child.colorGene = this.colorGene.slice();
    child.backColorGene = this.backColorGene;
    child.limbShapeGene = this.limbShapeGene;
    child.limbFillGene = this.limbFillGene;
    child.thicknessGene = this.thicknessGene;
    return child;
}

//creates and returns a new, mutated copy) { the biomorph.
ColourBiomorph.prototype.reproduce = function(element) {
    let child = new ColourBiomorph(this.session, element);
    this.copyBiomorph(child);
    child.mutate();
    return child;
    
}

ColourBiomorph.prototype.manipulate = function(geneboxIndex, leftRightPos, rung) {
}

//Register the Colour biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Colour", 
        (function(session, drawer) { return new ColourBiomorph(session, drawer)}),
        (function(session) { ColourBiomorph.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.colourbiomorph_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).colourbiomorph_geneboxes('updateFromCanvas', canvas)}));


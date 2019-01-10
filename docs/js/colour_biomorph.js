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
ColourBiomorph.prototype.develop = Monochrome.prototype.develop

function Palette(name, colors) {
    if(name) {
        this.name = name
        if(colors) {
            this.colors = colors
        } else {
            this.colors = Palette.generateMacPalette()
        }
    } else {
        this.name = 'Classic Mac'
        this.colors = Palette.generateMacPalette()
    }
} 

Palette.allowedLevels = [ 0, 51, 102, 153, 204, 255 ]

Palette.toHex = function (number) {
    let hex = number.toString(16).toUpperCase()
    return number < 16 ? "0" + hex : hex
}

Palette.toHtmlColor = function(triple) {
    return "#" + Palette.toHex(triple[0]) + Palette.toHex(triple[1]) + Palette.toHex(triple[2]);
}

Palette.generateMacPalette = function() {
        
    var colors = []
    
    // 6x6x6 color cube
    var allowedLevels = Palette.allowedLevels
    for (let i = 0; i < 216; i++) {
        let r = Math.trunc(i / 36);
        let g = Math.trunc((i - (36 * r)) / 6);
        let b = Math.trunc(i % 6);
        colors.push(Palette.toHtmlColor([
            allowedLevels[r], 
            allowedLevels[g],
            allowedLevels[b]]));
    }
    // Red ramp
    for (let i = 216; i < 226; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([singleColorIntensity, 0, 0]))
    }
    // Green ramp
    for (let i = 226; i < 236; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([0, singleColorIntensity, 0]))
    }
    // Blue ramp
    for (let i = 236; i < 246; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([0, 0, singleColorIntensity]))
    }
    // White ramp
    for (let i = 246; i < 256; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([singleColorIntensity,
                singleColorIntensity, singleColorIntensity]))
    }
    return colors
}
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
//  console.log('new ColourBiomorph')
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
    this.makeGenes(genotype, -trickle, 3 * trickle, -3 * trickle, -3 * trickle, trickle, -2 * trickle, 6 * trickle, -5 * trickle, 7);
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
        this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2);
    }
    this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3);
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
    this.thicknessGene = 1;
}

ColourBiomorph.prototype.insect = function() {
    var trickle = this.session.options.trickle
    makeGenes(trickle, 
            trickle, 
            -4 * trickle, 
            trickle, 
            -trickle, 
            -2 * trickle, 
            8 * trickle, 
            -4 * trickle, 
            6);
    for(let j = 0; j < 8; j++)
        this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2);
    this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3);
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
    this.thicknessGene = 1;
}



//initializes the biomorph's genotype as one) { a named set) { types.
ColourBiomorph.prototype.doPerson = function(biomorphType) {
    if(biomorphType) {
        switch(biomorphType) {
        case "Chess": this.chess(); break;
        case "BasicTree": this.basicTree(); break;
        case "Insect": this.insect(); break;
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
    console.log('mutate')
    var mut = this.session.options.mut
    console.log(mut)
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
//  console.log('ColourBiomorph.manipulate')
}

//Register the Colour biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Colour", 
        (function(session, drawer) { return new ColourBiomorph(session, drawer)}),
        (function(session) { ColourBiomorph.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.colourbiomorph_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).colourbiomorph_geneboxes('updateFromCanvas', canvas)}));

/*
 * Lin = RECORD
 *     StartPt, EndPt: Point;
 *     Col: INTEGER;
 * END;
 * LinPtr = ^Lin;
 * LinHandle = ^LinPtr;
 */

function ColourLin(x, y, xnew, ynew, col) {
    this.startPt = new Point(x,y);
    this.endPt = new Point(xnew,ynew);
    this.col = col;
    this.nextLin = null;    
}

ColourLin.prototype.toString = function() {
    return "ColourLin " + this.startPt.toString() + " -> " + this.endPt.toString() + " color " + this.col;
}


/*
 * Globals, line 253.
 *     ColourPic = RECORD
 *          BasePtr: Ptr;
 *          MovePtr: LinPtr;
 *          Origin: Point;
 *          PicSize: Integer;
 *          PicPerson: person
 *      END;
 *      
 * 
 */
function ColourPic(biomorph) {
    this.palette = biomorph.session.options.palette
    this.basePtr = null // The first ColourLin
    this.movePtr = null // The current ColourLin (used in walking the array)
    this.origin = new Point(0,0) // a Point
    this.picSize = 0 // Number of Lins
    this.picPerson = biomorph // the biomorph that this is a picture of.
    this.margin = new Rect() // bounding rectangle
}


/*
 PROCEDURE ZeroPic (VAR thisPic: ColourPic; Here: Point);
    BEGIN
        WITH thisPic DO
            BEGIN
                MovePtr = LinPtr(BasePtr);
                PicSize = 0;
                Origin = Here
            END
    END; {ZeroPic}
 */
ColourPic.prototype.zeroPic = function (here) {
    if(this.basePtr != null) { 
        // ColourPic has lines. Walk the singly linked list all the way to the end,
        // disconnect each ColourLin from the next.
        var walkPtr = this.basePtr;
        while(walkPtr != null) {
            // Gotta grab a reference to the next element in the list 
            // before we disconnect it from the current one.
            var nextLin = walkPtr.nextLin
            walkPtr.nextLin = null;
            walkPtr = nextLin;
        }
        this.picSize = 0;
        this.origin = here;

    }
    this.margin = new Rect()
    this.basePtr = null
    this.movePtr = null
    // console.log('zeroPic') 
    // console.log(this)
}

ColourPic.prototype.picLine = function(x, y, xnew, ynew, color) {
    if(this.picSize >= PICSIZEMAX) {
        alert('Biomorph too Large. No recovery possible')
        return
    } else {
        newLin = new ColourLin(x, y, xnew, ynew, color)
        if(this.basePtr == null) { // First ColourLin in the ColourPic.
            this.basePtr = newLin; // set the base pointer to the new ColourLin
        } else { // ColourPic already has at least one ColourLin.
            // Link the new ColourLin onto the ColourLin at end of the ColourPic
            this.movePtr.nextLin = newLin; 
        }
        this.movePtr = newLin; // Point to the new end of the list

        var margin = this.margin;
        if(x < margin.left)
            margin.left = x;
        else if(x > margin.right)
            margin.right = x;
        if(y > margin.bottom)
            margin.bottom = y;
        else if(y < margin.top)
            margin.top = y;
        if(xnew < margin.left)
            margin.left = xnew;
        else if(xnew > margin.right)
            margin.right = xnew;
        if(ynew > margin.bottom)
            margin.bottom = ynew;
        else if(ynew < margin.top)
            margin.top = ynew;

    }
} // {PicLine}


ColourPic.prototype.picToHtml = function() {
    var html = PicStyleType.properties[this.picStyle].name;
    return html;
}


ColourPic.prototype.actualLine = function(picStyle, orientation) {
    var origin = this.origin;
    var movePtr = this.movePtr;
    var drawer = this.drawer;

    var x0;
    var x1;
    var y0;
    var y1;
    var startPt = movePtr.startPt;
    var endPt = movePtr.endPt;
    if(orientation == Compass.NorthSouth) {
        y0 = startPt.v;
        y1 = endPt.v;
        x0 = startPt.h;
        x1 = endPt.h;
    } else {
        y0 = startPt.h;
        y1 = endPt.h;
        x0 = startPt.v;
        x1 = endPt.v;
    }
    drawer.setColor(this.palette.colors[movePtr.col])
    switch(picStyle) {
    case PicStyleType.LF: 
        this.limb(x0, y0, x1, y1);
        break;
    case PicStyleType.RF: 
        this.limb(-x0, y0, -x1, y1);
        break;
    case PicStyleType.FF: 
        this.limb(x0, y0, x1, y1);
        this.limb(-x0, y0, -x1, y1);
        break;
    case PicStyleType.LUD: 
        this.limb(x0, y0, x1, y1);
        this.limb(-x0, -y0, -x1, -y1);
        break;
    case PicStyleType.RUD: 
        this.limb(-x0, y0, -x1, y1);
        this.limb(x0, -y0, x1, -y1);
        break;
    case PicStyleType.FUD: 
        this.limb(x0, y0, x1, y1);
        this.limb(-x0, y0, -x1, y1);
        this.limb(x0, -y0, x1, -y1);
        this.limb(-x0, -y0, -x1, -y1);
        break;
    } // {CASES}
} // {ActualLine}

//{ColourPic already contains its own origin, meaning the coordinates at which}
//{ it was originally drawn. Now draw it at place}

ColourPic.prototype.limb = function(x0, y0, x1, y1) {

    var limbShapeGene = this.picPerson.limbShapeGene
    var limbFillGene = this.picPerson.limbFillGene
    var square = new Rect();
    if(limbShapeGene == LimbType.Oval || limbShapeGene == LimbType.Rectangle) {
        if(x0 < x1) {
            if(y0 > y1) {
                square.setRect(x0, y1, x1, y0)
            } else {
                square.setRect(x0, y0, x1, y1)
            }
        } else {
            if(y0 > y1) {
                square.setRect(x1, y1, x0, y0)
            } else {
                square.setRect(x1, y0, x0, y1)
            }
        }
    }
    var drawer = this.drawer
    drawer.penSize(this.picPerson.thicknessGene)
    if(limbShapeGene == LimbType.Oval) {
        drawer.frameOval(square);
        if(limbFillGene == LimbFillType.Filled) {
            drawer.paintOval(square)
        }
    } else if(limbShapeGene == LimbType.Rectangle) {
        drawer.frameRect(square);
        if(limbFillGene == LimbType.Filled) {
            drawer.paintRect(square)
        }
    }
    drawer.moveTo(x0, y0);
    drawer.lineTo(x1, y1);
    // PenSize(MyPenSize, MyPenSize)
}


ColourPic.prototype.drawPic = function(place) {
    var biomorph = this.picPerson
    this.drawer = _drawerFactorySingleton.getDrawer('canvas2d', biomorph.drawer);
    var drawer = this.drawer
    var bgcolor = this.palette.colors[biomorph.backColorGene]
    if(bgcolor === undefined) {
        alert('bgcolor is undefined')
    }
    

    drawer.save()
    drawer.translate(-place.h,-place.v);
    drawer.setColor(bgcolor)
    var halfWidth = drawer.drawingObject.width / 2
    var halfHeight = drawer.drawingObject.height / 2
    var margin = this.margin
    drawer.paintRect(new Rect(
            -halfWidth + margin.left, 
            -halfHeight + margin.top, 
            halfWidth + margin.right, 
            halfHeight + margin.bottom))
    if(false) { // draw bounding rectangle for debugging centring
        drawer.setColor("red");
        drawer.frameRect(margin);
    }

    var picStyle = PicStyleType.FF; 
    switch(biomorph.completenessGene) {
    case CompletenessType.Single: 
        switch(biomorph.spokesGene) {
        case SpokesType.NorthOnly: 
            picStyle = PicStyleType.LF;
            break;
        case SpokesType.NSouth: 
            picStyle = PicStyleType.LUD;
            break;
        case SpokesType.Radial: 
            picStyle = PicStyleType.LUD;
            break;
        }
        break;
    case CompletenessType.Double: 
        switch(biomorph.spokesGene) {
        case SpokesType.NorthOnly: 
            picStyle = PicStyleType.FF;
            break;
        case SpokesType.NSouth: 
            picStyle = PicStyleType.FUD;
            break;
        case SpokesType.Radial: 
            picStyle = PicStyleType.FUD;
            break;
        }
        break;
    }
    drawer.penSize(biomorph.session.options.myPenSize);
    // {reposition at base of grabbed space}
    this.movePtr = this.basePtr;

    while(true) {
        this.actualLine(picStyle, Compass.NorthSouth); // {sometimes rangecheck error}
        if(biomorph.spokesGene == SpokesType.Radial) 
            if(biomorph.completenessGene = CompletenessType.Single) 
                this.actualLine(PicStyleType.RUD, Compass.EastWest);
            else
                this.actualLine(picStyle, Compass.EastWest);
        if(this.movePtr.nextLin == null)
            break; // Leave iteration with thisPic.movePtr pointing to the last ColourLin.
        // Advance to next ColourLin.
        this.movePtr = this.movePtr.nextLin;
    }
    drawer.penSize(1);
    // ForeColor(blackcolor)

} // {DrawPic}

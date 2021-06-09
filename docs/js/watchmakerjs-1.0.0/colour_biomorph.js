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
        if(limbFillGene == LimbFillType.Filled) {
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
        console.error('bgcolor is undefined for backcolorgene ' + biomorph.backColorGene)
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
            if(biomorph.completenessGene == CompletenessType.Single) 
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
//this.completenessGene: CompletenessType;
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


ColourBiomorph.randLimbType = function() {
    switch(Monochrome.randInt(3)) {
    case 1:
        return LimbType.Stick
    case 2:
        return LimbType.Oval
    case 3:
        return LimbType.Rectangle
    }
}

ColourBiomorph.randLimbFill = function() {
    switch(Monochrome.randInt(2)) {
    case 1:
        return LimbFillType.Open
    case 2:
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
    let mut = this.session.options.mut
    let genes = this.session.options.genes

    this.makeGenes(-trickle, 3 * trickle, -3 * trickle, -3 * trickle, trickle, -2 * trickle, 6 * trickle, -5 * trickle, 7)
    for(let j = 0; j < 8; j++) {
        if(genes[9] && mut[9]) {
            this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
        } else {
            this.colorGene[j] = 0
        }
    }
    if(genes[10] && mut[10]) {
        this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    } else {
        this.backColorGene = 215 // white
    }

    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
    this.thicknessGene = 1;
}

ColourBiomorph.prototype.basicTree = function() {
    var trickle = this.session.options.trickle
    let mut = this.session.options.mut
    let genes = this.session.options.genes
    
    this.makeGenes(-trickle, -trickle, -trickle, -trickle, -trickle, 0, trickle, trickle, 6);
    for(let j = 0; j < 8; j++) {
        if(genes[9] && mut[9]) {
            this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
        } else {
            this.colorGene[j] = 0
        }
    }
    if(genes[10] && mut[10]) {
        this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    } else {
        this.backColorGene = 215 // white
    }
    this.limbShapeGene = LimbType.Stick
    this.limbFillGene = LimbFillType.Filled
    this.thicknessGene = 1
}

ColourBiomorph.prototype.insect = function() {
    var trickle = this.session.options.trickle
    let mut = this.session.options.mut
    let genes = this.session.options.genes
    this.makeGenes(trickle, 
            trickle, 
            -4 * trickle, 
            trickle, 
            -trickle, 
            -2 * trickle, 
            8 * trickle, 
            -4 * trickle, 
            6)
            for(let j = 0; j < 8; j++) {
                if(genes[9] && mut[9]) {
                    this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
                } else {
                    this.colorGene[j] = 0
                }
            }
    if(genes[10] && mut[10]) {
        this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    } else {
        this.backColorGene = 215 // white
    }
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
        case "Hopeful Monster":
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

//Unlike Pascal original, uses 0-based arrays.
ColourBiomorph.prototype.doSaltation = function() {
    var mut = this.session.options.mut
    var genes = this.session.options.genes

    if(mut[0] && genes[0]) {
        this.segNoGene = Monochrome.randInt(6)
        this.segDistGene = Monochrome.randInt(20)
    } else {            
        this.segNoGene  = 1
        this.segDistGene = 1
    }
    var r = Monochrome.randInt(100)
    this.completenessGene = CompletenessType.Double
    if(mut[2] && genes[2]) {
        if(r < 50) 
            this.completenessGene = CompletenessType.Single
            else 
                this.completenessGene = CompletenessType.Double
    }
    r = Monochrome.randInt(100)
    if(mut[3] && genes[3]) {
        if(r < 33)
            this.spokesGene = SpokesType.Radial
            else if(r < 66) 
                this.spokesGene = SpokesType.NSouth
                else 
                    this.spokesGene = SpokesType.NorthOnly
    } else {
        this.spokesGene = SpokesType.NorthOnly
    }
    if(mut[4] && genes[0]) {
        this.trickleGene = 1 + Math.trunc(Monochrome.randInt(100) / 10)
        if(this.trickleGene > 1)
            this.mutSizeGene = Math.trunc(this.trickleGene / 2)
    }
    if(mut[9] && genes[9]) {
        this.randomForeColour()
    } else {
        for(let j = 0; j < 8; j++) {
            this.colorGene[j] = 0
        }
    }
    if(mut[7] && genes[7]) {
        this.limbShapeGene = ColourBiomorph.randLimbType()
    } else {
        this.limbShapeGene = LimbType.Stick
    }
    if(mut[8] && genes[8]) {
        this.limbFillGene = ColourBiomorph.randLimbFill()
    } else {
        this.limbFillGene = LimbFillType.Filled
    }
    if(mut[10] && genes[10]) {
        this.randomBackColour()
    } else {
        this.backColorGene = 215 // White
    }
    if(mut[11] && genes[11]) {
        this.thicknessGene = Monochrome.randInt(3)
    } else {
        this.thicknessGene = 1
    }

    var maxGene

    // Nested do straight outta Roger Emanuel Kaufman -- ABC
    for(let j = 0; j < 8; j++) do {
        if(mut[12]) {
            this.gene[j] = this.mutSizeGene * (Monochrome.randInt(19) - 10)
        }
        if(mut[1] && genes[1]) {
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
        if(mut[1] && genes[1]) {
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
    } while(maxGene > 100 || maxGene < -100);

    do {
        this.gene[8] = Monochrome.randInt(6)
    } while(this.gene[8] <= 1);

    this.dGene[8] = SwellType.Same;

}

ColourBiomorph.buildMenus = function(menu) {
    $("<li>").colour_biomorph_genesmenu().insertBefore($(menu).find('.menuPedigree')[0])
    $("<li>").colour_biomorph_mutationsmenu().insertBefore($(menu).find('.menuPedigree')[0])
}

ColourBiomorph.updateMenus = function(session, view) {
    let mut = session.options.mut
    Monochrome.updateMutCheckbox(mut, view, 0, 'Segmentation')
    Monochrome.updateMutCheckbox(mut, view, 1, 'Gradient')
    Monochrome.updateMutCheckbox(mut, view, 2, 'Asymmetry')
    Monochrome.updateMutCheckbox(mut, view, 3, 'RadialSym')
    Monochrome.updateMutCheckbox(mut, view, 4, 'ScalingFactor')
    Monochrome.updateMutCheckbox(mut, view, 5, 'MutationSize')
    Monochrome.updateMutCheckbox(mut, view, 6, 'MutationRate')
    Monochrome.updateMutCheckbox(mut, view, 7, 'LimbShape')
    Monochrome.updateMutCheckbox(mut, view, 8, 'LimbFill')
    Monochrome.updateMutCheckbox(mut, view, 9, 'Colour')
    Monochrome.updateMutCheckbox(mut, view, 10, 'BackgroundColour')
    Monochrome.updateMutCheckbox(mut, view, 11, 'Thickness')
    Monochrome.updateMutCheckbox(mut, view, 12, 'Gene9')
    Monochrome.updateMutCheckbox(mut, view, 13, 'Gene9CanBeZero')

    let genes = session.options.genes
    Monochrome.updateMutCheckbox(genes, view, 0, 'ShowSegmentation')
    Monochrome.updateMutCheckbox(genes, view, 1, 'ShowGradient')
    Monochrome.updateMutCheckbox(genes, view, 2, 'ShowAsymmetry')
    Monochrome.updateMutCheckbox(genes, view, 3, 'ShowRadialSym')
    Monochrome.updateMutCheckbox(genes, view, 4, 'ShowScalingFactor')
    Monochrome.updateMutCheckbox(genes, view, 5, 'ShowMutationSize')
    Monochrome.updateMutCheckbox(genes, view, 6, 'ShowMutationRate')
    Monochrome.updateMutCheckbox(genes, view, 7, 'ShowLimbShape')
    Monochrome.updateMutCheckbox(genes, view, 8, 'ShowLimbFill')
    Monochrome.updateMutCheckbox(genes, view, 9, 'ShowColour')
    Monochrome.updateMutCheckbox(genes, view, 10, 'ShowBackgroundColour')
    Monochrome.updateMutCheckbox(genes, view, 11, 'ShowThickness')
}

ColourBiomorph.updateAllGeneboxes = function(species, target) {
    $(target).closest('.watchmakerSessionTab').find('.geneboxes').each(
            function() {
                _speciesFactorySingleton.updateFromCanvas(species, this, null)
            });
}

ColourBiomorph.menuclick = function(event) {
    let options = this.options
    let target = event.target
    let menuid = $(target).data('menuid')
    let mut = options.mut
    let genes = options.genes

    switch(menuid) {
        
    case 'ShowSegmentation':
        Monochrome.toggleMut(genes, 0, target)
        if(! genes[0]) {
            // Set SegNoGene to 1 for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.segNoGene = 1
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.segNoGenebox').addClass('geneboxHidden')
            $(target).closest('.watchmakerSessionTab').find('.segDistGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.segNoGenebox').removeClass('geneboxHidden')
            $(target).closest('.watchmakerSessionTab').find('.segDistGenebox').removeClass('geneboxHidden')
        }

        return false 
    case 'ShowGradient':
        Monochrome.toggleMut(genes, 1, target)
        if(! genes[1]) {
            // Set Gradient to Same for genes 1-9 on all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    for(let i = 0; i < 9; i++) {
                        biomorph.dGene[i] = SwellType.Same
                    }
                    biomorph.develop()
                }
            })
        }
        ColourBiomorph.updateAllGeneboxes(this.species, event.target)
        return false 
    case 'ShowAsymmetry':
        Monochrome.toggleMut(genes, 2, target)
        if(! genes[2]) {
            // Set SegNoGene to 1 for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.completenessGene = CompletenessType.Double
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.completenessGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.completenessGenebox').removeClass('geneboxHidden')
        }
        return false 
    case 'ShowRadialSym':
        Monochrome.toggleMut(genes, 3, target)
        if(! genes[3]) {
            // Set SegNoGene to 1 for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.spokesGene = SpokesType.NorthOnly
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.spokesGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.spokesGenebox').removeClass('geneboxHidden')

        }
        return false 
    case 'ShowScalingFactor':
        Monochrome.toggleMut(genes, 4, target)
        if(! genes[4]) {
            // Set SegNoGene to 1 for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.trickleGene = TRICKLE
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.trickleGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.trickleGenebox').removeClass('geneboxHidden')
        }
        return false 
    case 'ShowMutationSize':
        Monochrome.toggleMut(genes, 5, target)
        if(! genes[5]) {
            // Set Mutation Size for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.mutSizeGene = Math.trunc(TRICKLE/2); // Trickle div 2;
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.mutSizeGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.mutSizeGenebox').removeClass('geneboxHidden')
        }
        return false 
    case 'ShowMutationRate':
        Monochrome.toggleMut(genes, 6, target)
        if(! genes[6]) {
            // Set Mutation Size for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.mutProbGene = 10; // Trickle div 2;
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.mutProbGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.mutProbGenebox').removeClass('geneboxHidden')
        }
        return false 
    case 'ShowLimbShape':
        Monochrome.toggleMut(genes, 7, target)
        if(! genes[7]) {
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.limbShapeGene = LimbType.Stick
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.limbShapeGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.limbShapeGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'ShowLimbFill':
        Monochrome.toggleMut(genes, 8, target)
        if(! genes[8]) {
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.limbFillGene = LimbFillType.Filled
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.limbFillGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.limbFillGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'ShowColour':
        Monochrome.toggleMut(genes, 9, target)
		let backgroundMenuItem = $(target)
			.closest('.watchmakerSessionTab')
			.find('.menuitemShowBackgroundColour')
			.children('a')
        if(! genes[9]) { // if turning off, assign black to all colour genes
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.colorGene = [0,0,0,0,0,0,0,0]
					if( genes[10]) { // turn off background color if it's on
						setTimeout(function(){ // wait a jiffy
							backgroundMenuItem.click()
							backgroundMenuItem.hide()
					    },17)
					}                    
					biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.colourGenebox').addClass('geneboxHidden')
        } else {
			backgroundMenuItem.show()
            $(target).closest('.watchmakerSessionTab').find('.colourGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'ShowBackgroundColour':
        Monochrome.toggleMut(genes, 10, target)
        if(! genes[10]) { // If turning off, assign white to background colour
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.backColorGene = 215 // White, opposite corner of the 6x6x6 color cube
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.backgroundColourGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.backgroundColourGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'ShowThickness':
        Monochrome.toggleMut(genes, 11, target)
        if(! genes[11]) {
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.thicknessGene = 1 // 
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.thicknessGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.thicknessGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'Segmentation':
        Monochrome.toggleMut(mut, 0, target)
        return false 
    case 'Gradient':
        Monochrome.toggleMut(mut, 1, target)
        return false 
    case 'Asymmetry':
        Monochrome.toggleMut(mut, 2, target)
        return false 
    case 'RadialSym':
        Monochrome.toggleMut(mut, 3, target)
        return false 
    case 'ScalingFactor':
        Monochrome.toggleMut(mut, 4, target)
        return false 
    case 'MutationSize':
        Monochrome.toggleMut(mut, 5, target)
        return false 
    case 'MutationRate':
        Monochrome.toggleMut(mut, 6, target)
        return false 
    case 'LimbShape': // mut[7]
        Monochrome.toggleMut(mut, 7, target)
        return false 
    case 'LimbShape': // mut[8]
        Monochrome.toggleMut(mut, 8, target)
        return false 
    case 'Colour': // mut[9]
        Monochrome.toggleMut(mut, 9, target)
        return false 
    case 'BackgroundColour': // mut[10]
        Monochrome.toggleMut(mut, 10, target)
        return false 
    case  'Thickness': // mut[11] 
        Monochrome.toggleMut(mut, 11, target)
        return false 
    case 'Gene9': // mut[12]
        Monochrome.toggleMut(mut, 12, target)
        return false 
    case  'Gene9CanBeZero': // mut[13]
        Monochrome.toggleMut(mut, 13, target)
        return false 

    }
    return true // Event not processed
}

ColourBiomorph.initializeMut = function(session) {
    var mut = []
    for(let i = 0; i < 14; i++) {
        mut.push(true)
    }
    session.options.mut = mut
}

ColourBiomorph.initializeGenes = function(session) {
    var genes = []

    genes.push(true) // Segmentation // {** changed 1.1 **}
    genes.push(true) // Gradient {** changed 1.1 **}
    genes.push(true) // Asymmetry {** changed 1.1 **}
    genes.push(true) // Radial Sym {** changed 1.1 **}
    genes.push(true) // Scaling Factor {** changed 1.1 **}
    genes.push(true) // Mutation Size
    genes.push(true) // Mutation Rate
    genes.push(true) // Limb Shape
    genes.push(true) // Limb Fill
    genes.push(true) // Colour
    genes.push(true) // Background Colour
    genes.push(true) // Thickness
    
    session.options.genes = genes
}


ColourBiomorph.initializeSession = function(session) {
    ColourBiomorph.initializeMut(session)
    ColourBiomorph.initializeGenes(session)
    session.options.sessionIcon = 'img/BWTreeLogoBlueThin_icl4_17669_16x16.png';
    session.options.trickle = 10
    session.options.palette = new Palette()
    session.options.basicTypes = ["BasicTree", "Chess", "Insect", "Hopeful Monster"]
    session.options.defaultBasicType = ["Hopeful Monster"]
    session.options.hopefulMonsterBasicType = ["Hopeful Monster"]
    session.options.defaultView = 'NewRandomStart';
    session.updateMenus = ColourBiomorph.updateMenus
    session.buildMenus = ColourBiomorph.buildMenus
    session.menuclick = ColourBiomorph.menuclick

    session.serializationSize = 55
}
ColourBiomorph.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
    var str = "Manipulation geneBoxIndex:" + geneboxIndex;
    let options = this.session.options
    let mut = options.mut
    let genes = options.genes

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
    switch(geneboxIndex) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(mut[12]) {
                this.gene[geneboxIndex - 1] -= this.mutSizeGene;
            }
            break;
        case HorizPos.RightThird: 
            if(mut[12]) {
                this.gene[geneboxIndex - 1] += this.mutSizeGene;
            }
            break;
        case HorizPos.MidThird: 
            if(genes[1]) {
                switch(rung) {
                case VertPos.TopRung: 
                    this.dGene[geneboxIndex - 1] = SwellType.Swell;
                    break;
                case VertPos.MidRung: 
                    this.dGene[geneboxIndex - 1] = SwellType.Same;
                    break;
                case VertPos.BottomRung: 
                    this.dGene[geneboxIndex - 1] = SwellType.Shrink;
                    break;
                }
            }
            break;
        }
        break;
    case 9:
        if(mut[13]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.gene[8]--;
                let gene8Limit = mut[14] ? 0 : 1;
                if(this.gene[8] < gene8Limit) 
                    this.gene[8] = gene8Limit;
                break;
            case HorizPos.RightThird: 
                // The Pascal original incremented gene 9 unconditionally,
                // then backed off the change if the 2^gene9 times the segment
                // number gene value exceeded 4095.
                // This version does the test first, then increments gene 9 only
                // if it is safe to do so.
                var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8] + 1);
                if(sizeWorry <= WORRYMAX)
                    this.gene[8]++;
                break;
            case HorizPos.MidThird:
                if(genes[1]) {
                    switch(rung) {
                    case VertPos.TopRung: 
                        this.dGene[8] = SwellType.Swell;
                        break;
                    case VertPos.MidRung: 
                        this.dGene[8] = SwellType.Same;
                        break;
                    case VertPos.BottomRung: 
                        this.dGene[8] = SwellType.Shrink;
                        break;
                    }
                }
                break;
            }
        }
        break;
    case 10: 
        if(genes[0] && mut[0]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.segNoGene--;
                break;
            case HorizPos.MidThird: 
                break; //{No Action}
            case HorizPos.RightThird: 
                var sizeWorry = (this.segNoGene + 1) * Monochrome.twoToThe(this.gene[8]);
                if(sizeWorry <= WORRYMAX) {
                    this.segNoGene++;
                }
                break;
            }
        }
        break;
    case 11: 
        if(genes[0] && mut[0]) {

            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.segDistGene -= this.trickleGene;
                break;
            case HorizPos.MidThird:
                if(genes[1] && mut[1]) {
                    switch(rung) {
                    case VertPos.TopRung: 
                        this.dGene[9] = SwellType.Swell;
                        break;
                    case VertPos.MidRung: 
                        this.dGene[9] = SwellType.Same;
                        break;
                    case VertPos.BottomRung: 
                        this.dGene[9] = SwellType.Shrink;
                        break;
                    }
                }
                break;
            case HorizPos.RightThird: 
                this.segDistGene += this.trickleGene;
                break;
            }
        }
        break;
    case 12: 
        if(mut[2]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.completenessGene = CompletenessType.Single;
                break;
            case HorizPos.MidThird: 
                break; // {No Action}
            case HorizPos.RightThird: 
                this.completenessGene = CompletenessType.Double;
                break;
            }
        }
        break;
    case 13: 
        if(mut[2]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.spokesGene = SpokesType.NorthOnly;
                break;
            case HorizPos.MidThird: 
                this.spokesGene = SpokesType.NSouth;
                break;
            case HorizPos.RightThird: 
                this.spokesGene = SpokesType.Radial;
                break;
            }
        }
        break;
    case 14: 
        if(mut[4]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                if(this.trickleGene > 1)
                    this.trickleGene--;
                break;
            case HorizPos.RightThird: 
                this.trickleGene++;
                break;
            case HorizPos.MidThird: 
                break;// {No action}
            }
        }
        break;
    case 15: 
        if(mut[5]) {

            switch(leftRightPos) {
            case HorizPos.LeftThird:
                if(this.mutSizeGene > 1)
                    this.mutSizeGene--;
                break;
            case HorizPos.RightThird: 
                this.mutSizeGene++;
                break;
            case HorizPos.MidThird: 
                break; // {No action}
            }
        }
        break;
    case 16: 
        if(mut[6]) {

            switch(leftRightPos) {
            case HorizPos.LeftThird:
                if(this.mutProbGene > 1) {
                    this.mutProbGene--;
                }
                break;
            case HorizPos.RightThird: 
                if(this.mutProbGene < 100)
                    this.mutProbGene++;
                break;
            case HorizPos.MidThird: 
                break; // {No action}
            }
        }

        break
    case 17:
        if(mut[11]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                if(this.thicknessGene > 1) {
                    this.thicknessGene--;
                }
                break;
            case HorizPos.RightThird: 
                if(this.thicknessGene < 100)
                    this.thicknessGene++;
                break;
            case HorizPos.MidThird: 
                break; // {No action}
            }
        }
        break
    case 18:
        if(mut[7]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.limbShapeGene = LimbType.Stick;
                break;
            case HorizPos.RightThird: 
                this.limbShapeGene = LimbType.Rectangle;
                break;
            case HorizPos.MidThird: 
                this.limbShapeGene = LimbType.Oval;
                break; // {No action}
            }
        }
        break
    case 19: // limbFillGene
        if(mut[8]) {

            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.limbFillGene = LimbFillType.Open
                break;
            case HorizPos.RightThird: 
                this.limbFillGene = LimbFillType.Filled
                break;
            }
        }
        break;
    case 20: // backColorGene
        if(mut[10]) {
            this.backColorGene = leftRightPos
        }
        break;
    case 21: 
        if(mut[9]) {
            this.colorGene[0] = leftRightPos
        }
        break;
    case 22: 
        if(mut[9]) {
            this.colorGene[1] = leftRightPos
        }
        break;
    case 23: 
        if(mut[9]) {
            this.colorGene[2] = leftRightPos
        }
        break;
    case 24: 
        if(mut[9]) {
            this.colorGene[3] = leftRightPos
        }
        break;
    case 25: 
        if(mut[9]) {
            this.colorGene[4] = leftRightPos
        }
        break;
    case 26: 
        if(mut[9]) {
            this.colorGene[5] = leftRightPos
        }
        break;
    case 27: 
        if(mut[9]) {
            this.colorGene[6] = leftRightPos
        }
        break;
    case 28: 
        if(mut[9]) {
            this.colorGene[7] = leftRightPos
        }
        break;
    }


    let gene8Limit = mut[14] ? 0 : 1;
    if(this.gene[8] < gene8Limit) {
        this.gene[8] = gene8Limit;
    }

    if(this.segNoGene < 1) {
        this.segNoGene = 1;
    }
//  Alert subscribers that the genome has changed here.
}
//initializes the biomorph's genotype to a random set of values
//causes the biomorph's genotype to undergo a random mutation
ColourBiomorph.prototype.mutate = function() {

    var mut = this.session.options.mut
    var genes = this.session.options.genes

    if(mut[6] && genes[6] && Monochrome.randInt(100) < this.mutProbGene) {
        this.mutProbGene += this.direction9();
        if(this.mutProbGene < 1) {
            this.mutProbGene = 1
        } else if(this.mutProbGene > 100) {
            this.mutProbGene = 100
        }
    }

    if(mut[12]) {
        for(let j = 0; j < 8; j++) 
            if(Monochrome.randInt(100) < this.mutProbGene) 
                this.gene[j] += this.direction();

        if(Monochrome.randInt(100) < this.mutProbGene)
            this.gene[8] += this.direction9();

        if(this.gene[8] < 1)
            this.gene[8] = 1;
        else if(this.gene[8] > 8)
            this.gene[8] = 8;
    }
    if(mut[9] && genes[9]) {
        for(let j = 0; j < 8; j++)
            if(Monochrome.randInt(100) < this.mutProbGene) {
                this.colorGene[j] = this.colorGene[j] + this.direction9();
                if((this.colorGene[j] >= ColourBiomorph.Rainbow))
                    this.colorGene[j] = ColourBiomorph.Rainbow - 1;
                if((this.colorGene[j] < 0))
                    this.colorGene[j] = 0;
            }
    }

    if(mut[7] && genes[7] && Monochrome.randInt(100) < this.mutProbGene)
        this.limbShapeGene = ColourBiomorph.randLimbType();

    if(mut[8] && genes[8] && Monochrome.randInt(100) < this.mutProbGene)
        this.limbFillGene = ColourBiomorph.randLimbFill();

    if(mut[10] && genes[10] && Monochrome.randInt(100) < this.mutProbGene) {
        this.backColorGene = this.backColorGene + this.direction9()

        if(this.backColorGene >= ColourBiomorph.Rainbow) 
            this.backColorGene = ColourBiomorph.Rainbow - 1
        
        if(this.backColorGene < 0) 
            this.backColorGene = 0
    }

    if(mut[11] && genes[11]  && Monochrome.randInt(100) < this.mutProbGene) {
        this.thicknessGene += this.direction9();
        if(this.thicknessGene < 1)
            this.thicknessGene = 1;
    }

    if(mut[0] && genes[0] && Monochrome.randInt(100) < this.mutProbGene) {
        this.segNoGene = this.segNoGene + this.direction9();
        if(this.segNoGene < 1) {
            this.segNoGene = 1;
        }
    }

    if(mut[1] && genes[1] && this.segNoGene > 1) {
        for(let j = 0; j < 8; j++)
            if(Monochrome.randInt(100) < this.mutProbGene / 2)
                this.dGene[j] = Monochrome.randSwell(this.dGene[j]);
        if(Monochrome.randInt(100) < this.mutProbGene / 2)
            this.dGene[9] = Monochrome.randSwell(this.dGene[9]);
    }

    if(mut[0] && genes[0] && this.segNoGene > 1 && Monochrome.randInt(100) < this.mutProbGene) {
        this.segDistGene = this.segDistGene + this.direction9()
    }


    if(mut[2] && genes[2] && Monochrome.randInt(100) < this.mutProbGene / 2) {
        if(this.completenessGene == CompletenessType.Single) {
            this.completenessGene = CompletenessType.Double
        } else {
            this.completenessGene = CompletenessType.Single
        }
    }

    if(mut[3] && genes[3] && Monochrome.randInt(100) < this.mutProbGene / 2) 
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

    if(mut[4] && genes[4] && Monochrome.randInt(100) < this.mutProbGene) {
        this.trickleGene = this.trickleGene + this.direction9();
        if(this.trickleGene < 1)
            this.trickleGene = 1
    }
    if(mut[5] && genes[5] && Monochrome.randInt(100) < this.mutProbGene) {
        this.mutSizeGene = this.mutSizeGene + this.direction9()
        if(this.mutSizeGene < 1)
            this.mutSizeGene = 1
    }
}
$.widget( "dawk.colourGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasLeftRight: false,
        hasColor: true,
		extraClass: null
    },
    _launchPicker: function() {
        $(this.element).tooltip('disable')
        $('<div class="colourGenebox"></div>').colourPicker({
            colourGenebox: this.element,
            colors: this.options.colors,
            title: this.options.title,
            value: this.options.value,
            appendTo: this.element
        })

    },
    manipulate: function(event) {
        let value = $(event.target).data("value")
        $(this.element).parents('.colourGeneboxes').eq(0).colour_geneboxes(
                "manipulate",
                this.options.geneboxIndex, 
                value, 0)
                return false;

    },  
    _create: function() {
        this.element.addClass('colourGenebox')
		if (this.options.extraClass != null) {
			this.element.addClass(this.options.extraClass)
		}
        return this._super()
    },    
} );
$.widget('dawk.colourPicker', {
    options: {
        colourGenebox: null,
        value: '',
        title: 'Untitled Colour Picker',
        colors: []
    },
    _create: function() {
        $(this.element).addClass('colourPicker')
        this.element.attr('title', this.options.title)

        let colors = this.options.colors
        let value = this.options.value

        let colourSwatchTemplate = '<div class="colourPickerCubeSwatch"></div>'; 

        let counterFloor = 0

        let cubeDiv = $('<div class="colourPickerCubeDiv"></div>').appendTo(this.element)
        for(let cubeRow = 0; cubeRow < 6; cubeRow++) {
            let templateSlice = $('<div class="colourPickerCubeDivSlice"></div>').appendTo(cubeDiv)
            for(let i = counterFloor; i < counterFloor + 36; i++) {
                let colorswatch = $(colourSwatchTemplate)
                $(templateSlice).append(colorswatch)
                let color = colors[i]
                $(colorswatch).css('background-color', color)
                $(colorswatch).data('value', i)
                this._on(colorswatch, {click: "_colorSwatchClicked"})
                if(color == value) {
                    $(colorswatch).addClass('selected')
                }
            }
            counterFloor += 36
        }

        colourSwatchTemplate = '<div class="colourPickerRampSwatch"></div>'; 
        template = $('<div class="colourPickerRampDiv"></div>').appendTo(this.element)
        for(let i = 216; i < 256; i++) {
            let colorswatch = $(colourSwatchTemplate)
            $(template).append(colorswatch)
            let color = colors[i]
            $(colorswatch).css('background-color', color)
            $(colorswatch).data('value', i)
            this._on(colorswatch, {click: "_colorSwatchClicked"})
            if(color == value) {
                $(colorswatch).addClass('colourPickerSelected')
            }
        }
        $(this.element).append(template)

        let engineeringBox = $(this.options.appendTo).parents('.engineeringView').find('.engineeringBox').eq(0)
        $(this.element).dialog({
            width: 220,
            height: 230,
            title: this.options.title,
            draggable: true,
            modal: true,
            appendTo: this.options.appendTo,
            close: function(event, ui) {
                let colourGenebox = $(event.target).dialog("option", "appendTo")
                $(colourGenebox).tooltip('enable')    
            },
            position: {
                my: 'left top',
                at: 'left+20px top+20px',
                of: engineeringBox
            },
            offset: {
                left:20,
                right:20
            }
        })
    },
    _colorSwatchClicked: function(event) {
        $(this.options.colourGenebox).colourGenebox("manipulate", event)

    }
});



$.widget( "dawk.limbShapeGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasMid: true
    },
    refresh: function() {
        var str = this.options.value;
        var properties = LimbType.properties[str];
        if(properties != null) 
            this.element.find('.geneValue').text(properties.name);
    },
    _create: function() {
        this.element.addClass('limbShapeGenebox')
        return this._super()
    },
    
} );

$.widget( "dawk.limbFillGenebox", $.dawk.biomorph_genebox, {
    options: {
        title: 'Limb Fill'

    },
    refresh: function() {
        var str = this.options.value;
        var properties = LimbFillType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.name);
        }
    },  
    _create: function() {
        this.element.addClass('limbFillGenebox')
        return this._super()
    },
} );



$.widget('dawk.colour_geneboxes', $.dawk.geneboxes, {
    options : {
        numGeneBoxes : 28,
    },

    updateFromCanvas: function(canvas) {

        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.genebox');
        var genebox;
        for(let i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.gene1to9box("updateValue", biomorph.gene[i], biomorph.dGene[i]);
        }
        genebox = geneboxes.eq(9);
        genebox.segNoGenebox("updateValue", biomorph.segNoGene);
        genebox = geneboxes.eq(10);
        genebox.segDistGenebox("updateValue", biomorph.segDistGene, biomorph.dGene[9]);
        genebox = geneboxes.eq(11);
        genebox.completenessGenebox("updateValue", biomorph.completenessGene);
        genebox = geneboxes.eq(12);
        genebox.spokesGenebox("updateValue", biomorph.spokesGene);
        genebox = geneboxes.eq(13);
        genebox.trickleGenebox("updateValue", biomorph.trickleGene);
        genebox = geneboxes.eq(14);
        genebox.mutSizeGenebox("updateValue", biomorph.mutSizeGene);
        genebox = geneboxes.eq(15);
        genebox.mutProbGenebox("updateValue", biomorph.mutProbGene);
        genebox = geneboxes.eq(16);
        genebox.thicknessGenebox("updateValue", biomorph.thicknessGene);
        genebox = geneboxes.eq(17);
        genebox.limbShapeGenebox("updateValue", biomorph.limbShapeGene);
        genebox = geneboxes.eq(18);
        genebox.limbFillGenebox("updateValue", biomorph.limbFillGene);

        let colors = biomorph.session.options.palette.colors

        genebox = geneboxes.eq(19);
        genebox.colourGenebox("updateValue", colors[biomorph.backColorGene]);
        genebox = geneboxes.eq(20);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[0]]);
        genebox = geneboxes.eq(21);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[1]]);
        genebox = geneboxes.eq(22);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[2]]);
        genebox = geneboxes.eq(23);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[3]]);
        genebox = geneboxes.eq(24);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[4]]);
        genebox = geneboxes.eq(25);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[5]]);
        genebox = geneboxes.eq(26);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[6]]);
        genebox = geneboxes.eq(27);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[7]]);
    },
    _create : function(options) {
        this._super(options)

        this.element.addClass("colourGeneboxes");
        let template = '<div></div>';
        for(let i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            $(template).gene1to9box({
                geneboxCollection: this, 
                geneboxIndex: i + 1,
                title: geneBoxTitle}).appendTo(this.element)
        }

        let genes = this.options.session.options.genes
        
        let genebox = $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 10,
            title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096',
            });
        if(! genes[0]) {
             genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)
        genebox = $(template).segDistGenebox({
            geneboxCollection: this, 
            geneboxIndex: 11,
            title: 'Segment Distance and Gradient Gene 10'});
        if(! genes[0]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        
        genebox = $(template).completenessGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
        });
        
        if(! genes[2]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)
        
        genebox = $(template).spokesGenebox({
            geneboxCollection: this,
            geneboxIndex: 13,
            });
        if(! genes[3]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).trickleGenebox({
            geneboxCollection: this, 
            geneboxIndex: 14,
            title: 'Trickle'});
        if(! genes[4]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).mutSizeGenebox({
            geneboxCollection: this, 
            geneboxIndex: 15,
            title: 'Mutation Size'});
        if(! genes[5]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).mutProbGenebox({
            geneboxCollection: this, 
            geneboxIndex: 16,
            title: 'Mutation Probability'});
        if(! genes[6]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).thicknessGenebox({
            geneboxCollection: this, 
            geneboxIndex: 17,
            title: 'Thickness',
        })
        if(! genes[11]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).limbShapeGenebox({
            geneboxCollection: this,
            geneboxIndex: 18,
        })
        if(! genes[7]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).limbFillGenebox({
            geneboxCollection: this,
            geneboxIndex: 19,
        })
        if(! genes[8]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        let colors = this.options.session.options.palette.colors

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 20,
            colors: colors,
            title: 'Background Colour',
			extraClass: 'backgroundColourGenebox'});
        if(! genes[10]) {
            genebox.addClass('geneboxHidden')
        }
        
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 21,
            colors: colors,
            title: 'Colour Gene 1'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }        
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 22,
            colors: colors,
            title: 'Colour Gene 2'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 23,
            colors: colors,
            title: 'Colour Gene 3'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 24,
            colors: colors,
            title: 'Colour Gene 4'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 25,
            colors: colors,
            title: 'Colour Gene 5'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 26,
            colors: colors,
            title: 'Colour Gene 6'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 27,
            colors: colors,
            title: 'Colour Gene 7'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

        genebox = $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 28,
            colors: colors,
            title: 'Colour Gene 8'});
        if(! genes[9]) {
            genebox.addClass('geneboxHidden')
        }
        genebox.appendTo(this.element)

    },
    _destroy : function() {
        this.element.removeClass("colourGeneboxes").text("");
    },

});
$.widget('dawk.colour_biomorph_genesmenu', $.dawk.sub_menu, {
    options: {
        title: 'Genes'
    },
    _create: function() {
        this._super();
        this.appendcheckboxmenuitem('Segmentation','ShowSegmentation') // genes[0]
        this.appendcheckboxmenuitem('Gradient','ShowGradient') // genes[1]
        this.appendcheckboxmenuitem('Asymmetry','ShowAsymmetry') // genes[2]
        this.appendcheckboxmenuitem('Radial Sym', 'ShowRadialSym') // genes[3]
        this.appendcheckboxmenuitem('Scaling Factor', 'ShowScalingFactor') // genes[4]
        this.appendcheckboxmenuitem('Mutation Size', 'ShowMutationSize') // genes[5]
        this.appendcheckboxmenuitem('Mutation Rate', 'ShowMutationRate') // genes[6]
        this.appendcheckboxmenuitem('Limb Shape', 'ShowLimbShape') // genes[7]
        this.appendcheckboxmenuitem('Limb Fill', 'ShowLimbFill') // genes[8]
        this.appendcheckboxmenuitem('Colour', 'ShowColour') // genes[9]
        this.appendcheckboxmenuitem('Background Colour', 'ShowBackgroundColour') // genes[10]
        this.appendcheckboxmenuitem('Thickness', 'ShowThickness') // genes[11]
    }
})
$.widget('dawk.colour_biomorph_mutationsmenu', $.dawk.sub_menu, {
    options: {
        title: 'Mutations'
    },
    _create: function() {
        this._super();
        this.appendcheckboxmenuitem('Segmentation','Segmentation') // mut[0]
        this.appendcheckboxmenuitem('Gradient','Gradient') // mut[1]
        this.appendcheckboxmenuitem('Asymmetry','Asymmetry') // mut[2]
        this.appendcheckboxmenuitem('Radial Sym', 'RadialSym') // mut[3]
        this.appendcheckboxmenuitem('Scaling Factor', 'ScalingFactor') // mut[4]
        this.appendcheckboxmenuitem('Mutation Size', 'MutationSize') // mut[5]
        this.appendcheckboxmenuitem('Mutation Rate', 'MutationRate') // mut[6]
        this.appendcheckboxmenuitem('Limb Shape', 'LimbShape') // mut[7]
        this.appendcheckboxmenuitem('Limb Fill', 'LimbFill') // mut[8]
        this.appendcheckboxmenuitem('Colour', 'Colour') // mut[9]
        this.appendcheckboxmenuitem('Background Colour', 'BackgroundColour') // mut[10]
        this.appendcheckboxmenuitem('Thickness', 'Thickness') // mut[11] 
        this.appendcheckboxmenuitem('Genes 1 to 8', 'Genes1To8') // mut[12] 
        
        this.appendcheckboxmenuitem('Gene 9', 'Gene9') // mut[13]
        this.appendcheckboxmenuitem('Gene 9 can be Zero', 'Gene9CanBeZero') // mut[14]
    }
})
      
ColourBiomorph.prototype.readFromArrayBuffer = function(arrayBuffer, index) {
    offset = index * this.session.serializationSize
    let view = new DataView(arrayBuffer, offset)
    for(let i = 0; i < 9; i++) {
        this.gene[i] = view.getInt16(i * 2)
    }    
    for(let j = 0; j < 10; j++) {
        this.dGene[j] = view.getInt8(18 + j) + 1
    }    
    this.segNoGene = view.getInt16(28)
    this.segDistGene = view.getInt16(30)
    this.completenessGene = view.getInt8(32) + 1
    this.spokesGene = view.getInt8(33) + 1
    this.trickleGene = view.getInt16(34)
    this.mutSizeGene = view.getInt16(36)
    this.mutProbGene = view.getInt16(38)
    
    this.trickleGene = view.getUint16(40)
    this.colorGene = []
    for(let k = 0; k < 8; k++) {
        this.colorGene.push(view.getUint8(42 + k))
    }
    this.backColorGene = view.getUint8(50)
    this.limbShapeGene = view.getUint8(51) + 1;
    this.limbFillGene = view.getUint8(52) + 1;
    this.thicknessGene = view.getUint16(53)
}


ColourBiomorph.prototype.writeToArrayBuffer = function(arrayBuffer, index) {
    offset = index * this.session.serializationSize
    let view = new DataView(arrayBuffer, offset)
    for(let i = 0; i < 9; i++) {
        view.setInt16(i * 2, this.gene[i])
    }    
    for(let j = 0; j < 10; j++) {
        view.setInt8(18 + j, this.dGene[j] - 1)
    }    
    view.setInt16(28, this.segNoGene)
    view.setInt16(30, this.segDistGene)
    view.setInt8(32, this.completenessGene - 1)
    view.setInt8(33, this.spokesGene - 1)
    view.setInt16(34, this.trickleGene)
    view.setInt16(36, this.mutSizeGene)
    view.setInt16(38, this.mutProbGene)
    
    view.setUint16(40, this.trickleGene)
    
    for(let k = 0; k < 8; k++) {
        view.setUint8(42 + k, this.colorGene[k])
    }
    view.setUint8(50, this.backColorGene)
    view.setUint8(51, this.limbShapeGene - 1);
    view.setUint8(52, this.limbFillGene - 1);
    view.setUint16(53, this.thicknessGene)
}

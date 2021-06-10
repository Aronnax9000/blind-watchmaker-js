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
    this.mutSizeGene = Math.trunc(TRICKLE/2); // Trickle div 2;
    this.mutProbGene = 10;
    this.pic = new Pic(this)

}






const TRICKLE = 10;
const MutTypeNo = 9;

Monochrome.prototype.fitness = function(environment) {
    var targetHeight = environment.height;
    var targetWidth = environment.width;
    
    var margin = this.pic.margin;
    var marginWidth = margin.right - margin.left;
    var marginHeight = margin.bottom - margin.top;
    var widthError = Math.abs(targetWidth - marginWidth) / targetWidth;
    var heightError = Math.abs(targetHeight - marginHeight) / targetHeight;
    var averageError = (widthError + heightError) / 2;
    return averageError;
}



function chromosome() {
    var chrome = new Array(9);
    for(let i = 0; i < 9; i++)
        chrome[i] = 0; // indexed 0-8, unlike Pascal 1-based arrays.
    return chrome;
}



Monochrome.prototype.toString = function() {
    var htmlResult = 
        "Gene: " + this.gene + " DGene: ";
    for(let i = 0; i < 10; i++) {
        htmlResult +=  SwellType.properties[this.dGene[i]].name; 
        if(i<9) htmlResult += ",";
    }
    htmlResult +=  " SegNoGene: " + this.segNoGene +  
    " SegDistGene: " + this.segDistGene +  
    " CompletenessGene: " + CompletenessType.properties[this.completenessGene].name +  
    " SpokesGene: " + SpokesType.properties[this.spokesGene].name +  
    " TrickleGene: " + this.trickleGene +  
    " MutSizeGene: " + this.mutSizeGene +  
    " MutProbGene: " + this.mutProbGene;
    return htmlResult;
}

Monochrome.prototype.toHtml = function() {
    var h4open = "<h4>";
    var h4close = "</h4>";
    var breaktag = "<br />";
    var htmlResult = h4open + name + h4close + 
    "Gene: " + this.gene + breaktag + "DGene: ";
    for(let i = 0; i < 10; i++) {
        htmlResult +=  SwellType.properties[this.dGene[i]].name; 
        if(i<9) htmlResult += ",";
    }
    htmlResult += breaktag + "SegNoGene: " + this.segNoGene +  
    breaktag + "SegDistGene: " + this.segDistGene +  
    breaktag + "CompletenessGene: " + CompletenessType.properties[this.completenessGene].name +  
    breaktag + "SpokesGene: " + SpokesType.properties[this.spokesGene].name +  
    breaktag + "TrickleGene: " + this.trickleGene +  
    breaktag + "MutSizeGene: " + this.mutSizeGene +  
    breaktag + "MutProbGene: " + this.mutProbGene;
    return htmlResult;
}




Monochrome.randInt = function(ceiling) {
    return Math.floor(Math.random() * ceiling) + 1;  
}

Monochrome.prototype.direction = function(child) {
    if(Monochrome.randInt(2) == 2) 
        return child.mutSizeGene;
    else
        return -child.mutSizeGene;
}
Monochrome.prototype.direction9 = function() {
    if(Monochrome.randInt(2) == 2)
        return 1;
    else
        return -1;
}


/*
 * Globals, line 29:
 * 
 * CONST
 *     WorryMax = 4095;
 */
const WORRYMAX = 4095;

Monochrome.twoToThe = function(n) {
    switch(n) {
    case 0: 
        return 1;
    case 1: 
        return 2;
    case 2: 
        return 4;
    case 3: 
        return 8;
    case 4: 
        return 16;
    case 5: 
        return 32;
    case 6: 
        return 64;
    case 7: 
        return 128;
    case 8: 
        return 256;
    case 9: 
        return 512;
    case 10: 
        return 1024;
    case 11: 
        return 2048;
    case 12: 
        return 4096;
    default:
        return 8192;
    }
}
 
Monochrome.randSwell = function(indGene) {
    switch(indGene) {
    case SwellType.Shrink:
        return SwellType.Same;
    case SwellType.Same:
        if(Monochrome.randInt(2) == 1) {
            return SwellType.Shrink;
        } else {
            return SwellType.Swell;
        }
    case SwellType.Swell:
        return SwellType.Same;
    }
}

Monochrome.prototype.reproduce = function(childCanvas) {
    var child = new Monochrome(this.session, childCanvas);
    this.copyBiomorph(child);
    child.mutate();
    return child;
} 





/*
 * Globals, line 247.
 * 
 * Lin = RECORD
 *     StartPt, EndPt: Point;
 *     Thickness: 1..8;
 * END;
 * LinPtr = ^Lin;
 * LinHandle = ^LinPtr;
 */
function Lin(x, y, xnew, ynew, thick) {
    this.startPt = new Point(x,y); // start point of the line segment
    this.endPt = new Point(xnew,ynew); // end point of the line segment
    this.thickness = thick; // thickness of the line segment
    this.nextLin = null; // Pascal had implicit pointer to next element.
}

Lin.prototype.linToString = function() {
    return "Lin " + this.startPt.toString() + " -> " + this.endPt.toString() + " thickness " + this.thickness;
}

var PicStyleType = {LF: 1, RF: 2, FF: 3, LUD: 4, RUD:5, FUD:6, LSW:7, RSW:8, FSW:9,
        properties: {
            1: {name: "LF"},
            2: {name: "RF"},
            3: {name: "FF"},
            4: {name: "LUD"},
            5: {name: "RUD"},
            6: {name: "FUD"},
            7: {name: "LSW"},
            8: {name: "RSW"},
            9: {name: "FSW"}
        }
};
var Compass = {NorthSouth:1, EastWest:2, properties: {
    1: {name: "NorthSouth"}, 2:{name: "EastWest"}
}};


/*
 * Globals, line 253.
 *     Pic = RECORD
 *          BasePtr: Ptr;
 *          MovePtr: LinPtr;
 *          Origin: Point;
 *          PicSize: Integer;
 *          PicPerson: person
 *      END;
 */
function Pic(biomorph) {
    this.basePtr = null // The first Lin
    this.movePtr = null // The current Lin (used in walking the array)
    this.origin = new Point(0,0) // a Point
    this.picSize = 0 // Number of Lins
    this.picPerson = biomorph // the biomorph that this is a picture of.
    this.margin = new Rect() // used to compute bounding rectangle.
}


/*
 PROCEDURE ZeroPic (VAR thisPic: Pic; Here: Point);
    BEGIN
        WITH thisPic DO
            BEGIN
                MovePtr = LinPtr(BasePtr);
                PicSize = 0;
                Origin = Here
            END
    END; {ZeroPic}
 */
Pic.prototype.zeroPic = function (here) {
    if(this.basePtr != null) { 
        // Pic has lines. Walk the singly linked list all the way to the end,
        // disconnect each Lin from the next.
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
/*
 * Globals, line 28.
 */
const PICSIZEMAX = 4095


/*
 * PROCEDURE PicLine (VAR thisPic: Pic; x, y, xnew, ynew, thick: Integer);
    BEGIN
        IF thick > 8 THEN
            thick = 8;
        WITH thisPic DO
            BEGIN
                IF PicSize >= PicSizeMax THEN
                    BEGIN
{Message(GetString(TooLargeString));}
 {used the help dialog! v1.1 changed to alert}
                        DisplayError(-147, 'Biomorph too large, or other problem', ' ', StopError);
                        ExitToShell
                    END
                ELSE
                    WITH MovePtr^ DO
                        BEGIN
                            StartPt.h = x;
                            StartPt.v = y;
                            EndPt.h = xnew;
                            EndPt.v = ynew;
                            Thickness = Thick
                        END;
                MovePtr = linptr(size(MovePtr) + 10);  {advance 'array subscript' by number}
{                                    of bytes occupied by one lin}
                PicSize = PicSize + 1
            END
    END; {PicLine}

 */
Pic.prototype.picLine = function(x, y, xnew, ynew, thick) {
    if(thick > 8)
        thick = 8;
    if(this.picSize >= PICSIZEMAX) {
        // {Message(GetString(TooLargeString));}
        // {used the help dialog! v1.1 changed to alert}
        alert('Biomorph too large, or other problem');
        return
    } else {
        newLin = new Lin(x, y, xnew, ynew, thick)
        if(this.basePtr == null) { // First Lin in the Pic.
            this.basePtr = newLin; // set the base pointer to the new Lin
        } else { // Pic already has at least one Lin.
            // Link the new Lin onto the Lin at end of the Pic
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


Pic.prototype.picToHtml = function() {
    var html = PicStyleType.properties[this.picStyle].name;
    return html;
}


Pic.prototype.actualLine = function(picStyle, orientation) {
    var origin = this.origin;
    var movePtr = this.movePtr;
    var drawer = this.drawer;

    drawer.penSize(movePtr.thickness);
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
    switch(picStyle) {
    case PicStyleType.LF: 
        drawer.drawLine(x0, y0, x1, y1);
        break;
    case PicStyleType.RF: 
        drawer.drawLine(-x0, y0, -x1, y1);
        break;
    case PicStyleType.FF: 
        drawer.drawLine(x0, y0, x1, y1);
        drawer.drawLine(-x0, y0, -x1, y1);
        break;
    case PicStyleType.LUD: 
        drawer.drawLine(x0, y0, x1, y1);
        drawer.drawLine(-x0, -y0, -x1, -y1);
        break;
    case PicStyleType.RUD: 
        drawer.drawLine(-x0, y0, -x1, y1);
        drawer.drawLine(x0, -y0, x1, -y1);
        break;
    case PicStyleType.FUD: 
        drawer.drawLine(x0, y0, x1, y1);
        drawer.drawLine(-x0, y0, -x1, y1);
        drawer.drawLine(x0, -y0, x1, -y1);
        drawer.drawLine(-x0, -y0, -x1, -y1);
        break;
    } // {CASES}
} // {ActualLine}

//{Pic already contains its own origin, meaning the coordinates at which}
//{ it was originally drawn. Now draw it at place}

Pic.prototype.drawPic = function(place) {
    var biomorph = this.picPerson
    this.drawer = _drawerFactorySingleton.getDrawer('canvas2d', biomorph.drawer);

    var drawer = this.drawer
    drawer.save()
    drawer.translate(-place.h,-place.v)
    if(false) { // draw bounding rectangle for debugging centring
        drawer.setColor("red")
        drawer.frameRect(this.margin)
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
    drawer.penSize(biomorph.session.myPenSize);
    // {reposition at base of grabbed space}
    this.movePtr = this.basePtr;
    drawer.setColor("black");

    while(true) {
        this.actualLine(picStyle, Compass.NorthSouth); // {sometimes rangecheck error}
        if(biomorph.spokesGene == SpokesType.Radial) 
            if(biomorph.completenessGene == CompletenessType.Single) 
                this.actualLine(PicStyleType.RUD, Compass.EastWest);
            else
                this.actualLine(picStyle, Compass.EastWest);
        if(this.movePtr.nextLin == null)
            break; // Leave iteration with thisPic.movePtr pointing to the last Lin.
        // Advance to next Lin.
        this.movePtr = this.movePtr.nextLin;
    }
    drawer.penSize(1);
} // {DrawPic}
Monochrome.prototype.tree = function(x, y, lgth, dir, dx, dy, thick, oddOne, order) {
    if(dir < 0)
        dir = dir + 8
    if(dir >= 8)
        dir = dir - 8

    if(this.trickleGene < 1)
        this.trickleGene = 1;

    var xnew = x + Math.trunc(lgth * dx[dir] / this.trickleGene);
    var ynew = y + Math.trunc(lgth * dy[dir] / this.trickleGene);

    if(this.dGene[8] == SwellType.Shrink) 
        thick = lgth;
    else if(this.dGene[8] == SwellType.Swell) 
        thick = 1 + this.gene[8] - lgth; // Make thicker the shorter the segment
    else {
        thick = 1;
    }

    this.pic.picLine(x, y, xnew, ynew, thick * this.session.myPenSize);

    if(lgth > 1)
        if(oddOne) {
            
            this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, thick, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, thick, oddOne, order);
        } else {
            this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, thick, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, thick, oddOne, order);
        }
} // {tree}
/*
 Pascal original has order passed-by-reference.
 Since JavaScript passes simple types by value,
 the dirty workaround (in this and the Java edition) is to 
 return the new value for order, and pray the calling
 routine assigns the return value to order.
 */
Monochrome.prototype.plugIn = function(gene, dx, dy) {
    var order = gene[8]; 
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
} // {PlugIn}

var clipBoarding = false;



var theMode = Mode.Breeding;
Monochrome.prototype.develop = Biomorphs.prototype.develop;




/*
 * Monochrome biomorph bounding box calculations.
 * Monochrome biomorphs store this as a Rect
 * in the this.pic.margin property
 * Colour Biomorphs have Monochrome biomorphs as ancestors
 */

Monochrome.prototype.dummydraw = Biomorphs.prototype.dummydraw 
Monochrome.prototype.getWidth = Biomorphs.prototype.getWidth
Monochrome.prototype.getHeight = Biomorphs.prototype.getHeight
Monochrome.prototype.getRect = Biomorphs.prototype.getRect

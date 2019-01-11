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

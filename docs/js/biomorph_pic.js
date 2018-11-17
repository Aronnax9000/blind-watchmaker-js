

var myPenSize = 1;



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

function linToString() {
	return "Lin " + this.startPt.toString() + " -> " + this.endPt.toString() + " thickness " + this.thickness;
}

function Lin(x, y, xnew, ynew, thick) {
    this.startPt = new Point(x,y);
    this.endPt = new Point(xnew,ynew);
    this.thickness = thick;
    this.nextLin = null;    
    this.toString = linToString;
}

/*
 * Globals, line 253.
 *     Pic = RECORD
 *          BasePtr: Ptr;
 *          MovePtr: LinPtr;
 *          Origin: Point;
 *          PicSize: Integer;
 *          PicPerson: person
 *      END;
 *      
 * 
 */
function Pic() {
    this.basePtr = null; // The first Lin
    this.movePtr = null; // The current Lin (used in walking the array)
    this.origin = new Point(0,0); // a Point
    this.picSize = 0; // Number of Lins
    this.picPerson = null; // the biomorph that this is a picture of.
    this.margin = new Rect();
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
function zeroPic(thisPic, here) {
    if(thisPic.basePtr != null) { 
        // Pic has lines. Walk the singly linked list all the way to the end,
        // disconnect each Lin from the next.
        var walkPtr = thisPic.basePtr;
        while(walkPtr != null) {
            // Gotta grab a reference to the next element in the list 
            // before we disconnect it from the current one.
            var nextLin = walkPtr.nextLin
            walkPtr.nextLin = null;
            walkPtr = nextLin;
        }
        thisPic.picSize = 0;
        thisPic.origin = here;
    }
    thisPic.margin = new Rect();
}
/*
 * Globals, line 28.
 */
const PICSIZEMAX = 4095;


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
function picLine(thisPic, x, y, xnew, ynew, thick) {
//	   // console.log("picLine (" + x + "," + y + ")>(" + xnew + "," + ynew + ")" + " thickness " + thick);
    if(thick > 8)
        thick = 8;
    if(thisPic.PicSize >= PICSIZEMAX) {
        // {Message(GetString(TooLargeString));}
        // {used the help dialog! v1.1 changed to alert}
        alert('Biomorph too large, or other problem');
        return;
    } else {
        newLin = new Lin(x, y, xnew, ynew, thick);
        if(thisPic.basePtr == null) { // First Lin in the Pic.
            thisPic.basePtr = newLin; // set the base pointer to the new Lin
        } else { // Pic already has at least one Lin.
            // Link the new Lin onto the Lin at end of the Pic
            thisPic.movePtr.nextLin = newLin; 
        }
        thisPic.movePtr = newLin; // Point to the new end of the list

        thisPic.picSize++;
        var margin = thisPic.margin;
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

function newFunction() {
	
}

function picToHtml() {
	var html = PicStyleType.properties[this.picStyle].name;
	return html;
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



var orientation = Compass.NorthSouth;



function actualLine(picStyle, orientation, thisPic, drawer) {
    var origin = thisPic.origin;
    var movePtr = thisPic.movePtr;
//    console.log("actualLine Style:" + PicStyleType.properties[picStyle].name + " movePtr:" + movePtr.toString() + " Origin:" + origin.toString() + " Place:" + place.toString());
    
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

function drawPic(thisPic, place, biomorph, drawer, drawMargin) {
//    if(biomorph.dGene[8] == SwellType.Swell) {
//        alert("Gradient Gene 9 is Swell");
//    }
//    console.log('drawPic' + drawer.penSize());
	// {To correct initialisation bug, due to call in DoUpdate}
	drawer.save();
	drawer.translate(-place.h,-place.v);
	if(drawMargin) {
		var margin = thisPic.margin;
		drawer.setColor("red");
		drawer.frameRect(margin);
	}
    var picStyle = PicStyleType.FF; 
    // console.log("Completeness " + CompletenessType.properties[biomorph.completenessGene].name +
//    		"SpokesType " + SpokesType.properties[biomorph.spokesGene].name);
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
    drawer.penSize(myPenSize);
    // {reposition at base of grabbed space}
    thisPic.movePtr = thisPic.basePtr; 
    drawer.setColor("black");

    while(true) {
    	actualLine(picStyle, Compass.NorthSouth, thisPic, drawer); // {sometimes rangecheck error}
        if(biomorph.spokesGene == SpokesType.Radial) 
        	if(biomorph.completenessGene = CompletenessType.Single) 
                actualLine(PicStyleType.RUD, Compass.EastWest, thisPic, drawer);
            else
            	actualLine(picStyle, Compass.EastWest, thisPic, drawer);
        if(thisPic.movePtr.nextLin == null)
        	break; // Leave iteration with thisPic.movePtr pointing to the last Lin.
        // Advance to next Lin.
        thisPic.movePtr = thisPic.movePtr.nextLin;
    }
//    drawer.stroke();
//	drawer.closePath();
//	drawer.penSize(1);
} // {DrawPic}

function Poles() {
    this.northPole = 0
    this.southPole = 0
    this.eastPole = 0
    this.westPole = 0
}

Arthromorph.prototype.dLine = function(drawingContext, x, y, endX, endY, thick, poles) {
    if(endY < poles.northPole) {
        poles.northPole = endY;
    }
    if(endY > poles.southPole) {
        poles.southPole = endY;
    }
    if(endX < poles.westPole) {
        poles.westPole = endX;
    }
    if(endX > poles.eastPole) {
        poles.eastPole = endX;
    }
    if(drawingContext) {
        drawingContext.penSize(thick);
        let halfThick = Math.trunc(thick / 2)
        drawingContext.moveTo(x - halfThick, y - halfThick);
        drawingContext.lineTo(endX - halfThick, endY - halfThick);
        drawingContext.penSize(1);
    }
}

Arthromorph.prototype.drawLine = function(drawingContext, x, y, endX, endY, thick, poles) {
    //console.log('drawLine' + x + ' ' + y + ' ' + endX + ' ' + endY)
    if(this.session.sideways) {
        this.dLine(drawingContext, y, x, endY, endX, thick, poles)
    } else {
        this.dLine(drawingContext, x, y, endX, endY, thick, poles);
    }
}

Arthromorph.prototype.dOval = function(drawingContext, x, y, width, height, poles) {

    let r = new Rect(x, y, x + width, y + height)
    if(r.top < poles.northPole) {
        poles.northPole = r.top;
    }
    if(r.bottom > poles.southPole) {
        poles.southPole = r.bottom;
    }
    if(r.left < poles.westPole) {
        poles.westPole = r.left;
    }
    if(r.right > poles.eastPole) {
        poles.eastPole = r.right;
    }
    if(drawingContext) {
        if(this.session.options.wantColor) {
            drawingContext.backColor("Green");
            drawingContext.eraseOval(r)
        } else {
            drawingContext.fillOval(r, "LightGray");
        }
        drawingContext.penSize(2);
        drawingContext.frameOval(r);
        drawingContext.penSize(1);
        drawingContext.backColor("White");
    }
}

Arthromorph.prototype.drawOval = function(drawingContext, x, y, width, height, poles) {
    if(this.session.options.sideways) {
        this.dOval(drawingContext, y, x, height, width, poles)
    } else {
        this.dOval(drawingContext, x, y, width, height, poles);
    }
}
Arthromorph.prototype.drawSeg = function(drawingContext, x, y, width, height, poles) {
//  {We must adjust the position before drawing the oval}
//  {convert from center of oval to left corner}
    let halfW = Math.round(width / 2);

    this.drawOval(drawingContext, x - halfW, y, Math.round(width), Math.round(height), poles);
    if(drawingContext) {
        drawingContext.foreColor("Black");
    }
}

//{Draw a claw.  Param info is already folded in}
Arthromorph.prototype.drawClaw = function(drawingContext, params, x, y, xCenter, poles) {                

    if(drawingContext) {
        drawingContext.foreColor("Red");
    }
    let oldX = x;
    let oldY = y;
    let ang = params[9] / 2.0;
//  {half claw opening, in radians}
    x = Math.round(x + params[8] * Math.sin(ang)); //{line end point   width*sine(angle)}
    y = Math.round(y + params[8] * Math.cos(ang)); //{line end point}
    thick = 1 + Math.trunc(params[7]); //{1 is minimum thickness}
    this.drawLine(drawingContext, oldX, oldY, x, y, thick, poles); //{right side, top of claw}

    let leftX = xCenter - (x - xCenter); //{do the left side, top of claw}
    let leftOldX = xCenter - (oldX - xCenter);
    this.drawLine(drawingContext, leftOldX, oldY, leftX, y, thick, poles);
//  {Bottom of the claw}
    y = Math.round(y - 2.0 * params[8] * Math.cos(ang));
    this.drawLine(drawingContext, oldX, oldY, x, y, thick, poles); //{right side}
    this.drawLine(drawingContext, leftOldX, oldY, leftX, y, thick, poles); //{left side}
    if(drawingContext) {
        drawingContext.foreColor("Black");
    }
}

//{Starting at the atom 'which', multiply its numbers into the array of params.}
//{At the bottom, draw the part starting at x,y}
//{params accumulates the final Joint width, Claw angle, etc.}
//{params: 1 Seg height, 2 Seg width, 3 (not used), 4 Joint thickness, 5 Joint length, 6 Joint angle,}
//{       7 Claw thickness, 8 Claw length, 9 Claw angle between pincers}
//{x,y are current local point, xCenter is the centerline of the animal (left and right Joints need this)}
//ySeg is returned (static variable in original Pascal)
Arthromorph.prototype.draw = function(drawingContext, which, params, x, y, xCenter, ySeg, poles) {
    myPars = params.slice();
//  {local copy so next segment builds on section above, not this segment}
    let gradientFactor = 0
    let kind = which.kind
    if(kind == AtomKind.AnimalTrunk) {
        gradientFactor = which.nextLikeMe;
        if(gradientFactor > 1000) {
            alert('gradientFactor > 1000')
        }
    }
//  console.log(params)
    paramOffset = this.session.options.paramOffset
    offset = paramOffset[kind];//{where in params to begin, see InitBoneYard}
//  console.log("height " + which.height + "width " + which.width+ "angle " + which.angle + " offset " + offset);

    params[offset] = params[offset] * which.height; //{fold in this atom's params}
    params[offset + 1] = params[offset + 1] * which.width;
    params[offset + 2] = params[offset + 2] * which.angle; //{Must be a real number, even if not used in this Atom}

    if(kind == AtomKind.SectionTrunk) {
        this.overlap = which.angle;//{by convention}
    } else if(kind == AtomKind.SegmentTrunk) {
        if(gradientFactor > 1000) {
            alert('gradientFactor > 1000')
        }
        params[1] += gradientFactor * which.angle;
        params[0] += gradientFactor * which.angle;
        this.drawSeg(drawingContext, x, ySeg, params[1], params[0], poles);
//      {Draw the oval in the right place. 2 = Width , 1 = Height }
        oldY = ySeg; // {Save for next segment} 
        x = x + Math.round(params[1] / 2.0);//{joint starts at the side of the segment}
        y = ySeg + Math.round(params[0] / 2.0);
//      {joint starts half way down the segment }
    } else if(kind == AtomKind.Joint) {
//      console.log(params)
//      {both next joint (NextLikeMe) and claw (FirstBelowMe) want x,y at end of this joint}
        let oldX = x;
        let oldY = y;
        let ang = params[5];
        let jointscale = 0.5
        let xDisp = Math.round(jointscale * params[4] * Math.cos(ang)); //{line end point   width*sine(angle)}
        let yDisp = Math.round(jointscale * params[4] * Math.sin(ang)); //{line end point}
        x += xDisp;
        y += yDisp
        let thick = 1 + Math.trunc(params[3]); //{1 is minimum thickness}
//      console.log('ang ' + ang + ' params4 ' + params[4] + ' jointscale ' + jointscale + ' xDisp ' + xDisp + ' yDisp ' + yDisp);

        this.drawLine(drawingContext, oldX, oldY, x, y, thick, poles); //{right side leg}
        let leftX = xCenter - (x - xCenter); //{do the left side leg}
        let leftOldX = xCenter - (oldX - xCenter);
        this.drawLine(drawingContext, leftOldX, oldY, leftX, y, thick, poles);
        if(drawingContext) {
            drawingContext.foreColor("Black")
        }
    } 

    if(kind == AtomKind.Claw) {
        this.drawClaw(drawingContext, params, x, y, xCenter, poles) //{all work is done in here}
    } else {
//      {TED:  why else?  Presumably because claw is the end of the line?}
        if(which.firstBelowMe) {
            ySeg = this.draw(drawingContext, which.firstBelowMe, params, x, y, xCenter, ySeg, poles); //{build on my cumulative numbers}
        }
        if(which.kind == AtomKind.SegmentTrunk) {
            x = xCenter;
            ySeg = Math.round(oldY + this.overlap * params[0]);//{Seg}
//          {Jump down by height of this segment to the next segment}
        }
        if(which.nextLikeMe) {
            if(kind == AtomKind.AnimalJoint || kind == AtomKind.SectionJoint || kind == AtomKind.SegmentJoint) {
                ySeg = this.draw(drawingContext, which.nextLikeMe, params, x, y, xCenter, ySeg, poles) //{build on me}
            } else if(kind != AtomKind.AnimalTrunk) {
                ySeg = this.draw(drawingContext, which.nextLikeMe, myPars, x, y, xCenter, ySeg, poles);//{build on my parent's numbers}
            }
//          {Note that each Joint builds on the length of the SegJoint, not the joint just before it.}
//          {This is consistant with the way Sections and Segments work.}
        }

    }
    return ySeg
}

//{An example of how to call Draw for an animal}
Arthromorph.prototype.drawAnimal = function(drawingContext, x, y, poles) {
    let params = []
    for(let ii = 0; ii < 9; ii++) {
        params.push(1.0) //{clear it all out}
    }
    ySeg = y;
    ySeg = this.draw(drawingContext, this.trunk, params, x, y, x, ySeg, poles);
//  {x = xCenter when we start}
}

Arthromorph.prototype.drawInBox = function() {

    let boxwidth = this.drawer.width
    let boxheight = this.drawer.height
    let options = this.session.options
    let poles = new Poles()
    let verticalOffset = 0
    let midriff = 0
    let centre = 0
    let start = 0
    if(options.sideways) {
        centre = Math.trunc(boxheight / 2)
        start = Math.trunc(boxwidth / 2)
        poles.westPole = boxwidth
        poles.eastPole = 0
        this.drawAnimal(null, centre, start, poles); //{return with NorthPole and SouthPole updated}
        midriff = poles.westPole + Math.trunc((poles.eastPole - poles.westPole) / 2);
        verticalOffset = start - midriff;
    } else {
        start = Math.trunc(boxheight / 2);
        centre = Math.trunc(boxwidth / 2);
        poles.northPole = this.drawer.height;
        poles.southPole = 0;
        //{Preliminary dummy draw to measure North & South extent of animal}
        this.drawAnimal(null, centre, start, poles);// {return with NorthPole and SouthPole updated}
        midriff = poles.northPole + Math.trunc((poles.southPole - poles.northPole) / 2);
        verticalOffset = start - midriff;
    }
    var drawingContext = _drawerFactorySingleton.getDrawer('canvas2d', this.drawer);

//  this.trunk.printMiddle()
//  console.log(this.trunk)
    this.drawAnimal(drawingContext, centre, start + verticalOffset, poles);
}



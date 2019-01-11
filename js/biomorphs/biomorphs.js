function Biomorphs() {
    
}

Biomorphs.prototype.develop = function() {
    var drawingObject = this.drawer;
    var drawingContext = _drawerFactorySingleton.getDrawer('canvas2d', drawingObject);
    // Use the identity matrix while clearing the canvas
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    drawingContext.clearRect(0, 0, drawingObject.width, drawingObject.height);
    drawingContext.translate(drawingObject.width / 2 + 0.5, drawingObject.height / 2 + 0.5);

    var dx = [0,0,0,0,0,0,0,0];
    var dy = [0,0,0,0,0,0,0,0];

    var x; 
    var y; 
    var seg; 
    var upExtent; 
    var downExtent;
    var wid; 
    var ht; 
    var thick;

    var oldHere;

    clipBoarding = false;
    here = new Point(0,0);
    var centre = here.copy();
    var order = this.plugIn(this.gene, dx, dy); // Pass-by value workaround returns order as result.
    this.pic.zeroPic(here);

    if(this.segNoGene < 1)
        this.segNoGene = 1;

    var extraDistance;
    if(this.dGene[9] == SwellType.Swell)
        extraDistance = this.trickleGene;
    else if(this.dGene[9] == SwellType.Shrink)
        extraDistance = -this.trickleGene;
    else
        extraDistance = 0;

    var running = this.gene.slice();

    var incDistance = 0;
    var segNoGeneLimit = this.segNoGene + 1;
    for(let seg = 1; seg < segNoGeneLimit; seg++) {
        var oddOne = (seg % 2) == 1;
        if(seg > 1) {
            oldHere = here.copy();
            here.v += (this.segDistGene + incDistance)/this.trickleGene>>0;
            incDistance += extraDistance;
            if(this.dGene[8] == SwellType.Shrink)
                thick = this.gene[8];
            else
                thick = 1;

            this.pic.picLine(oldHere.h, oldHere.v, here.h, here.v, thick);
            var dGene = this.dGene;
            for(let  j = 0; j<8; j++) {
                if(dGene[j] == SwellType.Swell) {
                    running[j] += this.trickleGene;
                }
                if(dGene[j] == SwellType.Shrink) {
                    running[j] -= this.trickleGene;
                }
            }
            if(running[8] < 1) {
                running[8] = 1;
            }

            order = this.plugIn(running, dx, dy);
        }       
        var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8]);
        if(sizeWorry > WORRYMAX)
            this.gene[8] = this.gene[8] - 1;
        if(this.gene[8] < 1) {
            this.gene[8] = 1;
        }
        this.tree(here.h, here.v, order, 2, dx, dy, thick, oddOne, order);
    }
    
    var margin = this.pic.margin;

    var spokesGene = this.spokesGene;
    
    if(! (spokesGene == SpokesType.NorthOnly && this.completenessGene == CompletenessType.Single)) {

        if(centre.h - margin.left > margin.right - centre.h)
            margin.right = centre.h + (centre.h - margin.left)
            else
                margin.left = centre.h - (margin.right - centre.h);
        var upExtent = centre.v - margin.top; //{can be zero if biomorph goes down}
        var downExtent = margin.bottom - centre.v;

        if(((spokesGene == SpokesType.NSouth) || (spokesGene == SpokesType.Radial)) || 
                (theMode == Mode.Engineering)) // {Obscurely necessary to cope with erasing last Rect in Manipulation}
            if(upExtent > downExtent)
                margin.bottom = centre.v + upExtent;
            else
                margin.top = centre.v - downExtent;

        if(spokesGene == SpokesType.Radial) {
            wid = margin.right - margin.left;
            ht = margin.bottom - margin.top;
            if(wid > ht) {
                margin.top = centre.v - Math.trunc(wid/2) - 1;
                margin.bottom = centre.v + Math.trunc(wid/2) + 1;
            } else {
                margin.left = centre.h - Math.trunc(ht/2) - 1;
                margin.right = centre.h + Math.trunc(ht/2) + 1;
            }
        }
    }

    var offCentre = new Point((margin.left + margin.right) / 2, (margin.top + margin.bottom) / 2);

    this.pic.drawPic(offCentre);

}// {develop}

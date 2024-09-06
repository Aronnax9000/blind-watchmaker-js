
function Biomorphs() {
    
}


var CompletenessType = {
        Single: 1,
        Double: 2,
        properties: {
            1: {name: "Single", geneboxName: "Asym"},
            2: {name: "Double", geneboxName: "Bilat"}
        }
};


/*
 * Monochrome biomorph bounding box calculations.
 * Monochrome biomorphs store this as a Rect
 * in the this.pic.margin property
 */

Biomorphs.prototype.dummydraw = function() {
    var tempDrawer = this.drawer
    this.drawer = document.createElement('canvas')
	console.log('canvas ' + this.drawer.width + "," + this.drawer.height)
    this.develop()
    this.drawer = tempDrawer
}

Biomorphs.prototype.getWidth = function() {
    if(this.pic.margin == null || this.pic.margin.isDegenerate()) {
        this.dummydraw()
    }
    let margin = this.pic.margin
    return margin.right - margin.left
}
Biomorphs.prototype.getHeight = function() {
    if(this.pic.margin == null || this.pic.margin.isDegenerate()) {
        this.dummydraw()
    }
    let margin = this.pic.margin
    return margin.bottom - margin.top
}
Biomorphs.prototype.getRect = function() {
    if(this.pic.margin == null || this.pic.margin.isDegenerate()) {
        this.dummydraw()
    }
    let margin = this.pic.margin
    return new Rect(0,0, margin.right - margin.left,
            margin.bottom - margin.top)
}


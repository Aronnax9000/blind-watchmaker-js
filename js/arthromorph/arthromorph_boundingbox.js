/*
 * Monochrome Arthromorph bounding box calculations.
 * Monochrome Arthromorphs store this as a Rect
 * in the this.pic.margin property
 */

Arthromorph.prototype.dummydraw = function() {
    var tempDrawer = this.drawer
    this.drawer = Document.createElement('canvas')
    this.develop()
    this.drawer = tempDrawer
}

Arthromorph.prototype.getWidth = function() {
    if(false) {
        dummydraw()
    }
    let margin = new Rect()
    return margin.right - margin.left
}
Arthromorph.prototype.getHeight = function() {
    if(this.pic.margin == null) {
        dummydraw()
    }
    let margin = new Rect()
    return margin.bottom - margin.top
}
Arthromorph.prototype.getRect = function() {
    if(this.pic.margin == null) {
        dummydraw()
    }
    let margin = new Rect()
    return new Rect(0,0, margin.right - margin.left,
            margin.bottom - margin.top)
}
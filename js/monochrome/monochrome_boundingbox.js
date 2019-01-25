/*
 * Monochrome biomorph bounding box calculations.
 * Monochrome biomorphs store this as a Rect
 * in the this.pic.margin property
 */

Monochrome.prototype.dummydraw = function() {
    var tempDrawer = this.drawer
    this.drawer = Document.createElement('canvas')
    this.develop()
    this.drawer = tempDrawer
}

Monochrome.prototype.getWidth = function() {
    if(this.pic.margin == null) {
        dummydraw(this.pic.margin)
    }
    let margin = this.pic.margin
    return margin.right - margin.left
}
Monochrome.prototype.getHeight = function() {
    if(this.pic.margin == null) {
        dummydraw(this.pic.margin)
    }
    let margin = this.pic.margin
    return margin.bottom - margin.top
}
Monochrome.prototype.getRect = function() {
    if(this.pic.margin == null) {
        dummydraw(this.pic.margin)
    }
    let margin = this.pic.margin
    return new Rect(0,0, margin.right - margin.left,
            margin.bottom - margin.top)
}
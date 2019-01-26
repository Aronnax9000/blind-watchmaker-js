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

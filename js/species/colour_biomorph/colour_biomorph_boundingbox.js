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


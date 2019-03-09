/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
$.widget('dawk.about', {
    options: {
        slides: [
            ['About Blind Watchmaker', 'img/AboutBlindWatchmaker_PICT_26817_459x287.png', 459, 287],
            ['About Colour Watchmaker', 'img/AboutColourWatchmaker_PICT_00257_486x352.png', 486, 352],
            ['About Arthromorphs', 'img/AboutArthromorphs284x136.png', 284, 136],
            ['About Blind Watchmaker Suite', 'img/AboutWatchmakerJS468x352.png', 468, 352]
            
        ],
        index: 0,
    },
    _create: function() {
        let slides = this.options.slides
        let index = this.options.index
        let img = $('<img>')
        $(img).attr('src', slides[index][1])
        let dialogdiv = $('<div>')
        $(dialogdiv).addClass('aboutnomarginymcboatface')
        $(dialogdiv).attr('title', slides[index][0])
        $(dialogdiv).append(img)
        $(dialogdiv).dialog({
            width: slides[index][2] + 38, 
            height: slides[index][3] + 52,
            classes: 
            {
                "ui-dialog": "about",
            },
            modal: true,
            appendTo: this.options.appendTo
        })
    }
})



var Mode = {
        // Values not the same as Classic Blind Watchmaker
        Preliminary: 1, 
        Breeding: 2, 
        Albuming: 3, 
        Phyloging: 4, 
        Killing: 5, 
        Moving: 6, 
        Detaching: 7, 
        Randoming: 8, 
        Engineering: 9, 
        Drifting: 10, 
        Highlighting: 11, 
        PlayingBack: 12, 
        Triangling: 13, 
        Sweeping: 14,
        properties: {
            1: {name: "Preliminary"},
            2: {name: "Breeding"},
            3: {name: "Albuming"},
            4: {name: "Phyloging"},
            5: {name: "Killing"},
            6: {name: "Moving"},
            7: {name: "Detaching"},
            8: {name: "Randoming"},
            9: {name: "Engineering"},
            10: {name: "Drifting"},
            11: {name: "Highlighting"},
            12: {name: "PlayingBack"},
            13: {name: "Triangling"},
            14: {name: "Sweeping"},
        },
}

/* 
 * QuickDraw style point, with h (horizontal) and v (vertical) 
 */
class Point {
    constructor(x,y) {
        this.h = x;
        this.v = y;
    }
    toString() {
        return "(" + this.h + "," + this.v + ")";
    }
    copy() {
        var child = new Point(this.h, this.v);
        return child;
    }
}

class Rect {


    /*
     * QuickDraw style Rect, with left, right, top and bottom
     */
    constructor(left, top, right, bottom) {


        if(left) {
            this.left = left;
        } else {
            this.left = 0;
        }
        if(right) {
            this.right = right;
        } else {
            this.right = 0;
        }
        if(top) {
            this.top = top;
        } else {
            this.top = 0;
        }
        if(bottom) {
            this.bottom = bottom;
        } else {
            this.bottom = 0;
        }
    }



    toString() {
        return "Rect (" + this.left + "," + this.top + "),(" + this.right + "," + this.bottom + ")";
    }

    setRect(left, top, right, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }

    ptInRect(pt) {
        return (pt.h >= this.left 
                && pt.h <= this.right 
                && pt.v >= this.top
                && pt.v <= this.bottom)
    }

//  FUNCTION SectRect (srcl,src2: Rect; VAR dstRect: Rect) : BOOLEAN;
//  SectRect calculates the rectangle that's the intersection of the two given rectangles, and returns
//  TRUE if they indeed intersect or FALSE if they don't. Rectangles that "touch" at a line or a point
//  are not considered intersecting, because their intersection rectangle (actually, in this case, an
//  intersection line or point) doesn't enclose any bits in the bit image.
//  If the rectangles don't intersect, the destination rectangle is set to (0,0)(0,0). SectRect works
//  correctly even if one of the source rectangles is also the destination
    sectRect(otherRect, destRect) {
        let x5 = max(this.left, otherRect.left);
        let y5 = max(this.top, otherRect.top);
        let x6 = min(this.right, otherRect.right);
        let y6 = min(this.bottom, otherRect.bottom);
        if(x5 >= x6 || y5 >= y6) {
            destRect.left = 0
            destRect.top = 0
            destRect.right = 0
            destRect.bottom = 0
            return false
        } else {
            destRect.left = x5
            destRect.top = y5
            destRect.right = x6
            destRect.bottom = y6
            return true
        }
    }

//  PROCEDURE InsetRect (VAR r: Rect; dh,dv: INTEGER);
//  InsetRect shrinks or expands the given rectangle. The left and right sides are moved in by the
//  amount specified by dh; the top and bottom are moved toward the center by the amount specified
//  by dv. If dh or dv is negative, the appropriate pair of sides is moved outward instead of inward.
//  The effect is to alter the size by 2*dh horizontally and 2*dv vertically, with the rectangle
//  remaining centered in the same place on the coordinate plane.
//  If the resulting width or height becomes less than 1, the rectangle is set to the empty rectangle
//  (0,0)(0,0). 
    insetRect(dh, dv) {
        this.left += dh
        this.right -= dh
        this.top += dv
        this.bottom -= dv
        if(this.left >= this.right || this.top >= this.bottom) {
            this.left = 0
            this.top = 0
            this.right = 0
            this.bottom = 0
        }
    }

    equalRect(otherRect) {
        return (this.left == otherRect.left &&
                this.right == otherRect.right &&
                this.top == otherRect.top &&
                this.bottom == otherRect.bottom)
    }
    isDegenerate() {
        return (this.left == 0 &&
                this.right == 0 &&
                this.top == 0 &&
                this.bottom == 0 || 
                this.left >= this.right ||
                this.top >= this.bottom)
    }

    getWidth() {
        return this.right - this.left
    }

    getHeight() {
        return this.bottom - this.top
    }
}
function drawerFactory_registerDrawerType(drawerType, constructorFunction) {
    this.properties[drawerType] = constructorFunction;
}

function drawerFactory_getDrawer(drawerFactoryType, drawingObject) {
    var drawer;
    try {
        drawer = this.properties[drawerFactoryType](drawingObject);
    } catch (err) {
        console.error("DrawerFactory can't find a registered drawer for type '" + drawerFactoryType + "'. Valid values are " + this.properties);
        console.error(err);
    }
    return drawer;
}

function DrawerFactory() {
    this.properties = {};
    this.registerDrawerType = drawerFactory_registerDrawerType;
    this.getDrawer = drawerFactory_getDrawer;
}

function testDrawer(drawerType, drawingObject) {
    drawer = _drawerFactorySingleton.getDrawer(drawerType, drawingObject);
    drawer.setColor("black");
    drawer.penSize(1);
    drawer.moveTo(0,0);
    drawer.lineTo(100,100);
    
    drawer.frameRect(new Rect(100,0,200,100));
    drawer.paintRect(new Rect(200,0,300,100));

    drawer.frameRect(new Rect(300,0,400,50));
    drawer.frameOval(new Rect(300,0,400,50));

    drawer.frameRect(new Rect(400,0,500,50));
    drawer.paintOval(new Rect(400,0,500,50));

    drawer.frameRect(new Rect(500,0,600,50));
    drawer.setColor("#00FF00");
    drawer.paintOval(new Rect(500,0,600,50));
    drawer.setColor("#000000");
    drawer.frameOval(new Rect(500,0,600,50));
}    




var _drawerFactorySingleton = new DrawerFactory();
function Canvas2DDrawer(drawingObject) {
    this.drawingObject = drawingObject;
    this.drawingContext = drawingObject.getContext('2d');
    this.bgcolor = 'White' 
}



Canvas2DDrawer.prototype.erase = function() {
    // Store the current transformation matrix
    //drawingContext.save();
    // Use the identity matrix while clearing the canvas
    this.setTransform(1, 0, 0, 1, 0, 0);
    var width = this.getWidth();
    var height = this.getHeight();
    var halfWidth = width / 2;
    var halfHeight = height / 2;

    this.drawingContext.clearRect(0, 0, width, height);
    
    this.drawingContext.translate(halfWidth + 0.5, halfHeight / 2 + 0.5);

}

Canvas2DDrawer.prototype.penSize = function(penSize) {
    if(penSize === undefined) {
        return this.drawingContext.lineWidth// * 2;
    } else {
        this.drawingContext.lineWidth = penSize// / 2;
    }
}

Canvas2DDrawer.prototype.setColor = function(color) {
  this.drawingContext.strokeStyle = color;
  this.drawingContext.fillStyle = color;
}


Canvas2DDrawer.prototype.moveTo = function(x,y) {
    this.drawingContext.beginPath();
    this.drawingContext.moveTo(x,y);
}
Canvas2DDrawer.prototype.lineTo = function(x,y) {
    this.drawingContext.lineTo(x,y);
    this.drawingContext.stroke();
}

Canvas2DDrawer.prototype.scale = function(scale) {
    this.drawingContext.scale(scale, scale)
}

Canvas2DDrawer.prototype.frameOval = function(rect) {
    var cx = (rect.left + rect.right) / 2;
    var cy = (rect.top + rect.bottom) / 2;
    var rx = (rect.right - rect.left) / 2;
    var ry = (rect.bottom - rect.top) / 2;
        
    this.drawingContext.save(); // save state
    this.drawingContext.beginPath();

    this.drawingContext.translate(cx-rx, cy-ry);
    this.drawingContext.scale(rx, ry);
    this.drawingContext.arc(1, 1, 1, 0, 2 * Math.PI, false);

    this.drawingContext.restore(); // restore to original state
    this.drawingContext.stroke();
}

Canvas2DDrawer.prototype.fillOval = function(rect, style) {
    let fillStyle = this.drawingContext.fillStyle
    this.drawingContext.fillStyle = style;
    this.paintOval(rect)
    this.drawingContext.fillStyle = fillStyle
}
Canvas2DDrawer.prototype.eraseOval = function(rect) {
    let fillStyle = this.drawingContext.fillStyle
    this.drawingContext.fillStyle = this.bgcolor
    this.paintOval(rect)
    this.drawingContext.fillStyle = fillStyle
    
}

Canvas2DDrawer.prototype.foreColor = function(color) {
    this.drawingContext.fillStyle = color;
    this.drawingContext.strokeStyle = color;
}

Canvas2DDrawer.prototype.backColor = function(color) {
    this.bgcolor = color;
}



Canvas2DDrawer.prototype.paintOval = function(rect) {
    var cx = (rect.left + rect.right) / 2;
    var cy = (rect.top + rect.bottom) / 2;
    var rx = (rect.right - rect.left) / 2;
    var ry = (rect.bottom - rect.top) / 2;
        
    this.drawingContext.save(); // save state
    this.drawingContext.beginPath();

    this.drawingContext.translate(cx-rx, cy-ry);
    this.drawingContext.scale(rx, ry);
    this.drawingContext.arc(1, 1, 1, 0, 2 * Math.PI, false);

    this.drawingContext.restore(); // restore to original state
    this.drawingContext.fill();
}


Canvas2DDrawer.prototype.paintRect = function(rect) {
    var width = (rect.right - rect.left);
    var height = (rect.bottom - rect.top);
    this.drawingContext.fillRect(rect.left, rect.top, width, height);
}
Canvas2DDrawer.prototype.frameRect = function(rect) {
    var width = (rect.right - rect.left);
    var height = (rect.bottom - rect.top);
    this.drawingContext.strokeRect(rect.left, rect.top, width, height);
}

Canvas2DDrawer.prototype.getHeight = function() {
    return this.drawingObject.height;
}
Canvas2DDrawer.prototype.getWidth = function() {
    return this.drawingObject.width;
}

Canvas2DDrawer.prototype.translate = function(x,y) {
    this.drawingContext.translate(x,y);
}
Canvas2DDrawer.prototype.save = function() {
    this.drawingContext.save();
}
Canvas2DDrawer.prototype.restore = function() {
    this.drawingContext.restore();
}
Canvas2DDrawer.prototype.setTransform = function(x1, x2, x3, x4, x5, x6) {
    this.drawingContext.setTransform(x1, x2, x3, x4, x5, x6);
}
Canvas2DDrawer.prototype.clearRect = function(x1, x2, x3, x4) {
    this.drawingContext.beginPath();
        
    this.drawingContext.clearRect(x1, x2, x3, x4);
}

Canvas2DDrawer.prototype.drawLine = function(x1, y1, x2, y2) {
    var drawingContext = this.drawingContext;
    drawingContext.beginPath();
    drawingContext.moveTo(x1, y1);
    drawingContext.lineTo(x2, y2);
    drawingContext.stroke();
}

Canvas2DDrawer.prototype.stroke = function() {
    this.drawingContext.stroke();
}






_drawerFactorySingleton.registerDrawerType("canvas2d", (
        function(drawingObject) { 
            return new Canvas2DDrawer(drawingObject);}));



/*
 * drawing_context_nop.js
 * 
 * Author: Alan Canon
 * 
 * No-operation implementation of a drawer, for use as a prototype
 * for new drawers.
 */

function nopDrawer_penSize(penSize) {
}

function nopDrawer_setColor(color) {
}

function nopDrawer_moveTo(x,y) {
}

function nopDrawer_lineTo(x,y) {
}

function nopDrawer_frameOval(rect) {
}

function nopDrawer_paintOval(rect) {
}

function nopDrawer_paintRect(rect) {
}

function nopDrawer_frameRect(rect) {
}
function nopDrawer_translate(x,y) {
    
}
function nopDrawer_save() {
}
function nopDrawer_restore() {
}

function nopDrawer_getHeight() {
    return 0;
}
function nopDrawer_getWidth() {
    return 0;
}

function nopDrawer_setTransform(x1, x2, x3, x4, x5, x6) {
    
}

function NopDrawer(drawingObject) {
    this.drawingContext = null;
    this.getHeight = nopDrawer_getHeight;
    this.getWidth = nopDrawer_getWidth;
    this.penSize = nopDrawer_penSize;
    this.moveTo = nopDrawer_moveTo;
    this.lineTo = nopDrawer_lineTo;
    this.frameRect = nopDrawer_frameRect;
    this.paintRect = nopDrawer_paintRect;
    this.frameOval = nopDrawer_frameOval;
    this.paintOval = nopDrawer_paintOval;
    this.setColor = nopDrawer_setColor;
    this.translate = nopDrawer_translate;
    this.save = nopDrawer_save;
    this.restore = nopDrawer_restore;
    this.setTransform = nopDrawer_setTransform;
}

_drawerFactorySingleton.registerDrawerType("nop", (
        function(drawingObject) { 
            return new NopDrawer(drawingObject);}));



/*
 * drawing_context_svg.js
 * 
 * Author: Alan Canon
 * 
 * SVG implementation of a drawer. This drawer appends SVG elements to a dom representing
 * a scalable vector graphics image. Unlike svgDrawer, this drawer is stateful,
 * keeping track of penSize, color, and the last moveTo or lineTo coordinates.
 * 
 */

function svgDrawer_penSize(_penSize) {
    if(_penSize === undefined) {
        return this._penSize;
    } else {
        this._penSize = _penSize;
    }
}

function svgDrawer_setColor(color) {
    this.color = color
}

function svgDrawer_moveTo(x,y) {
    this.x = x;
    this.y = y
}

function svgDrawer_lineTo(x,y) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    element.setAttribute("style", "stroke-width:" + this._penSize + "px;");

    element.setAttribute('x1', this.x);
    element.setAttribute('y1', this.y);
    element.setAttribute('x2', x);
    element.setAttribute('y2', y);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
    
    this.x = x;
    this.y = y;
}

function svgDrawer_frameOval(rect) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    element.setAttribute("stroke-width", this._penSize + "px");
    element.setAttribute("fill", "none");
    
    var cx = (rect.right + rect.left) / 2;
    var cy = (rect.bottom + rect.top) / 2;
    element.setAttribute('cx', cx);
    element.setAttribute('cy', cy);
    element.setAttribute('rx', cx - rect.left);
    element.setAttribute('ry', cy - rect.top);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
}

function svgDrawer_paintOval(rect) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    element.setAttribute("stroke-width", this._penSize + "px");
    element.setAttribute("fill", this.color);
    var cx = (rect.right + rect.left) / 2;
    var cy = (rect.bottom + rect.top) / 2;
    element.setAttribute('cx', cx);
    element.setAttribute('cy', cy);
    element.setAttribute('rx', cx - rect.left);
    element.setAttribute('ry', cy - rect.top);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
}

function svgDrawer_paintRect(rect) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    element.setAttribute("stroke-width", this._penSize + "px");
    element.setAttribute("fill", this.color);

    element.setAttribute('x', rect.left);
    element.setAttribute('y', rect.top);
    element.setAttribute('width', rect.right - rect.left);
    element.setAttribute('height', rect.bottom - rect.top);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
}

function svgDrawer_frameRect(rect) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    element.setAttribute("stroke-width", this._penSize + "px");
    element.setAttribute("fill", "none");

    element.setAttribute('x', rect.left);
    element.setAttribute('y', rect.top);
    element.setAttribute('width', rect.right - rect.left);
    element.setAttribute('height', rect.bottom - rect.top);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
    
}

function svgDrawer_getHeight() {
    return this.height;
}
function svgDrawer_getWidth() {
    return this.width;
}

function svgDrawer_translate(x,y) {
   
}
function svgDrawer_save() {
}
function svgDrawer_restore() {
}


function SVGDrawer(drawingObject) {
    this.drawingContext = drawingObject;
    this.getHeight = svgDrawer_getHeight;
    this.getWidth = svgDrawer_getWidth;
    this.penSize = svgDrawer_penSize;
    this.moveTo = svgDrawer_moveTo;
    this.lineTo = svgDrawer_lineTo;
    this.frameRect = svgDrawer_frameRect;
    this.paintRect = svgDrawer_paintRect;
    this.frameOval = svgDrawer_frameOval;
    this.paintOval = svgDrawer_paintOval;
    this.setColor = svgDrawer_setColor;
    this.translate = svgDrawer_translate;
    this.save = svgDrawer_save;
    this.restore = svgDrawer_restore;    
    this.penSize(1);
}


_drawerFactorySingleton.registerDrawerType("svg", (
        function(drawingObject) { 
            return new SVGDrawer(drawingObject);}));

function WatchmakerSession(species) {
    this.options = []
    this.albums = []
    this.album = new Album('Session Album', this)
    this.myPenSize = 1;
    this.trianglable = false
    this.arrayable = false
    this.driftsweep = false
    this.buildMenus = function(menu) {}
    this.updateMenus = function(session, view) {}
    this.species = species
    this.fossilizing = false
    this.fossilrecord = null
    this.clipboard = null
    _speciesFactorySingleton.initializeSession(species, this)
}

WatchmakerSession.prototype.getModel = function() {
    return {options: this.options, 
        myPenSize: this.myPenSize, 
        trianglable: this.trianglable,
        arrayable: this.arrayable,
        driftsweep: this.driftsweep,
        species: this.species,
        fossilizing: this.fossilizing
    }
}

WatchmakerSession.prototype.menuclick = function(event) {
    return true
}


$.widget('dawk.watchmakerSessionTab', {
    options: {
        species: null,
        session: null,
        name: 'Default Session',
        blindWatchmaker: null
    },
    uuidv4: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    },
    handlekeypress: function(event) {
        let activeTabIdx = $(this.element).tabs('option','active');
        let viewTab = $(this.element).find('.watchmakerView').get(activeTabIdx)
        if($(viewTab).hasClass('engineeringView')) {
            $(viewTab).engineeringView('handlekeypress', event)
        } else if($(viewTab).hasClass('breedingView')) {
            $(viewTab).breedingView('handlekeypress', event)
        } else if($(viewTab).hasClass('albumView')) {
            $(viewTab).albumView('handlekeypress', event)
        } else if($(viewTab).hasClass('pedigreeView')) {
            $(viewTab).pedigreeView('handlekeypress', event)
        } else if($(viewTab).hasClass('triangleView')) {
            $(viewTab).triangleView('handlekeypress', event)
        } else if($(viewTab).hasClass('driftView')) {
            $(viewTab).driftView('handlekeypress', event)
        } else if($(viewTab).hasClass('sweepView')) {
            $(viewTab).sweepView('handlekeypress', event)
        } else if($(viewTab).hasClass('arrayView')) {
            $(viewTab).sweepView('handlekeypress', event)
        } else if($(viewTab).hasClass('fossilsView')) {
            $(viewTab).fossilsView('handlekeypress', event)
        }

        
    },    
    raiseAlert: function(newMenu) {
        var blindWatchmaker = $(this.element).watchmakerSessionTab('option', 'blindWatchmaker');
        $(blindWatchmaker.element).blindWatchmaker('raiseAlert');
    },
    on_activate: function (event, ui) {
        // One of the session's views, like Breeding, has just become active.
        var newlyActiveView = $(ui.newTab).parents('.watchmakerView').get(0);
        $(ui.oldPanel).trigger('viewLostFocus');
        $(ui.newPanel).trigger('viewGainedFocus');
    },   
    getmodel: function() {
        return {
            name: this.options.name, 
            species: this.options.species,
            session: this.options.session.getModel(),
            views: this.getviews()
            }
    },
    getviews: function() {
        let views = []
        let type = 'unknown view'
        let viewmodel = null
        let element = this.element
        $(element).find('.watchmakerView').each(function() {
            if($(element).hasClass('breedingView')) {
                type = 'Breeding';
                model = $(this).breedingView('getmodel')    
            } else if($(element).hasClass('engineeringView')) {
                type = 'Engineering';
                model = $(this).engineeringView('getmodel')    
            } else if($(element).hasClass('pedigreeView')) {
                type = 'Pedigree';
                model = $(this).engineeringView('getmodel')    
            } else if($(element).hasClass('triangleView')) {
                type = 'Triangle';
                model = $(this).engineeringView('getmodel')    
            }
            
        })
    },
    _create: function () {
        let options = this.options
        var species = options.species
        this.element.addClass('watchmakerSessionTab');
        var ul = $('<ul class="watchmakerViewTabs"></ul>');
        this.element.append(ul); 
        this.element.tabs({activate: this.on_activate});
        switch(options.session.options.defaultView) {
        case 'Engineering':
            this.newEngineeringView();
            break
        case 'NewRandomStart':
            this.newBreedingView(null, true)
            break
        case 'Breeding':
        default:
            this.newBreedingView();
        }
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
    },
    newAlbumView: function(album, showImmediately) {
        var alreadyOpen = null
        $(this.element).find('.albumView').each(function() {
            if(album == $(this).data('album')) {
                alreadyOpen = this
            }
        })
        if(alreadyOpen != null) {
        } else {
            this.openAlbumView(album, showImmediately)
        }
    },
    openAlbumView: function(album, showImmediately) {
    
        var species = this.options.species
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconAlbum_ALAN_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" src="' + viewIcon + '">' 
            + album.name
            + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.albumView({
            session: this.options.session, 
            watchmakerSessionTab: this, 
            species: species,
            album: album});
        $(newTabLi).find('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    
        this.element.tabs("refresh");
        if(showImmediately) {
            var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
            this.element.tabs("refresh");
            this.element.tabs("option", "active", tabcount - 1);
        }
    },
    newBreedingView: function(biomorph, newRandomStart) {
        var species = this.options.species
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconFlipBirdToBreedingGrid_ICON_00261_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" src="' + viewIcon + '">' 
            + (newRandomStart ? 'New Random Start' : 'Breeding')
            + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.breedingView({
            newRandomStart: newRandomStart,
            session: this.options.session, 
            watchmakerSessionTab: this, 
            species: species,
            biomorph: biomorph});
        $(newTabLi).find('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    
        this.element.tabs("refresh");
        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);

    },
    newEngineeringView: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/Hypodermic_PICT_03937_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" src="' + viewIcon + '">' 
            + 'Engineering</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.engineeringView({session: this.options.session, 
            biomorph: biomorph,
            watchmakerSessionTab: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    },
    newPlayBackFossils: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconFossilRecord_ALAN_32x32.png';
        var string = '<li><a href="#' + uuid + '">'
        + '<img class="tabicon" src="' + viewIcon + '">' 
        + 'Fossils'
        + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.fossilsView({session: this.options.session, 
            watchmakerSessionTab: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    },
    newDriftView: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconDrift_ALAN_32x32.png';
        var string = '<li><a href="#' + uuid + '">'
        + '<img class="tabicon" src="' + viewIcon + '">' 
        + (this.options.session.options.driftsweep ? 'Drift Sweep': 'Drift')
        + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        if(this.options.session.options.driftsweep) {
            div.sweepView({session: this.options.session, 
                biomorph: biomorph,
                watchmakerSessionTab: this});
        } else {
            div.driftView({session: this.options.session, 
                biomorph: biomorph,
                watchmakerSessionTab: this});
        }
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    },
    newPedigreeView: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/Pedigree_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" class="tabicon" src="' + viewIcon + '">' 
            + 'Pedigree</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.pedigreeView({session: this.options.session, 
            biomorph: biomorph,
            watchmakerSessionTab: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    },    
    newTriangleView: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconTriangle_ALAN_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" src="' + viewIcon + '">' 
            + 'Triangle</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.triangleView({session: this.options.session, 
            watchmakerSessionTab: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    }     
});

/*
 * Blind Watchmaker, the entry point for the application.
 */
$.widget('dawk.blindWatchmaker', {
    options: {
        interval: 1,
        created: null,
        sessionCount: 0,
        closeable: false
    },
    autosave: function() {
        console.log('autosave')
        this.save()
        this._delay(this.autosave, this.options.interval * 5000);
    },
    save: function() {
        let state = JSON.stringify(this.getmodel())
        let stateBase64 = state.toString('base64')
        var wayinfuture = new Date('09 Feb 3859 00:00:00 UTC');
        let expiry = ';expires=' + wayinfuture.toUTCString()
        document.cookie = 'watchmaker_state=' + stateBase64 + expiry
        console.log(state)
        console.log(stateBase64)
    },
    getsessions: function() {
        return $(this.element).find('.watchmakerSessionTab')
    },
    getmodel: function () {
        let model = {
                created: this.options.created,
                sessions: []
        } 
        $(this.getsessions()).each(function() {
            let sessionModel = $(this).watchmakerSessionTab('getmodel')
            model.sessions.push(sessionModel)
        })
        return model
    },
    uuidv4: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    },
    handlekeypress: function(event) {
        let activeTabIdx = $(this.element).tabs('option','active');
        let sessionTab = $('.watchmakerSessionTab').get(activeTabIdx)
        $(sessionTab).watchmakerSessionTab('handlekeypress', event)
        
    },
    _create: function () {
        let query = document.search
        var ul = $('<ul class="watchmakerTabs"></ul>');
        this.element.append(ul);
        this.element.tabs({activate: this.on_activate});
        var availableSpecies = _speciesFactorySingleton.getRegisteredSpecies()
        availableSpecies.forEach(availableSpecie => {
            this.newWatchmakerSession(availableSpecie)
        })
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
        $(document).keypress(function(event) {
            $(document).find('.blindWatchmaker').blindWatchmaker('handlekeypress',event)
        })
//      this.autosave()
    },
    on_activate: function (event, ui) {
    },
    raiseAlert: function() {
    },
    newWatchmakerSession: function(species) {
        var index = this.options.sessionCount;
        this.options.sessionCount++;
        var uuid = this.uuidv4();
        var sessionName = species //+ ' ' + index;
        var newWSession = new WatchmakerSession(species)

        var string = '<li>'
            string += '<a href="#' + uuid + '">';

        var sessionIcon = newWSession.options.sessionIcon
        if(sessionIcon)
            string += '<img class="tabicon" src="' + newWSession.options.sessionIcon + '">'
            string += sessionName + '</a>'
            if(this.options.closeable) {
                string += '<span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
            }
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.watchmakerSessionTab({
            'session': newWSession,
            'name': sessionName, 'blindWatchmaker': this, species: species});
        var tabcount = $(this.element).children('ul.watchmakerTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);

    },
    closeSession: function() {
        var selectedIndex = this.element.tabs('option', 'active');
        var selectedDiv = $(this.element).find('.watchmakerSessionTab').get(selectedIndex);
        var ul = this.element.find('ul.watchmakerTabs').get(0);
        var liToRemove = $(ul).find('li').get(selectedIndex);
        var divToRemove = $(this.element).find('div').get(selectedIndex);
        $(divToRemove).remove();
        $(liToRemove).remove();
        this.element.tabs("refresh");
    }
});

$.widget('dawk.dropdownmenu', {
    options: {
        session: null,
        type: null
    },
    _create: function() {
        let menu = $('<ul>').addClass('sm sm-watchmaker')
        menu.appendTo(this.element)
        $("<li>").filemenu({session: this.options.session, type: this.options.type}).appendTo(menu)
        $("<li>").editmenu({session: this.options.session, type: this.options.type}).appendTo(menu)
        $("<li>").operationmenu({session: this.options.session, type: this.options.type}).appendTo(menu)
        $("<li>").animalmenu({session: this.options.session, type: this.options.type}).appendTo(menu)
        $("<li>").viewmenu({session: this.options.session, type: this.options.type}).appendTo(menu)
        $("<li>").pedigreemenu({session: this.options.session, type: this.options.type}).appendTo(menu)
        $("<li>").helpmenu({session: this.options.session, type: this.options.type}).appendTo(menu)
        this.options.session.buildMenus(menu)
        menu.smartmenus()
    },
    menuclick: function(event) {
        this.options.menuHandler.menuclick(event)
    }
})
$.widget('dawk.sub_menu', {
    options: {
        title: ''
    },
    _create: function() {
        let title = this.options.title
        $(this.element).addClass('menu' + title)
        $(this.element).append(
                $('<a>').text(title),
                $('<ul>').addClass('sub_menu')
        )
    },
    appendcheckboxmenuitem: function(title, menuid, hidden) {
        let a = this.appendmenuitem(title, menuid, hidden).children('a').get(0)
        let checkbox = $("<span class='checkbox'><img src='img/checkbox.png' />&nbsp;</span>")
        checkbox.prependTo(a)
    },
    appendmenuitem: function(title, menuid, hidden, imgsrc) {
        let li = $('<li>')
        li.addClass('menuitem' + menuid)
        if(hidden) {
            $(li).css('display','none')
        }
        let str = '<a>';
        if(imgsrc != null) {
            str+= '<img src="' + imgsrc + '" class="menuicon" />'
        }
        str += title + '</a>'
        let a = $(str)
        li.append(a)
        $(a).data('menuid', menuid)
        this._on(a, {'click': function (event){
            this.menuclick(event)}})
            $(this.element).find('> ul').append(li);
        return li
    },
    menuclick: function(event) {
        $(this.element).closest('.watchmakerMenuBar').dropdownmenu('menuclick', event)
    }

})

function MenuHandler(session) {
    this.session = session
    this.nextMenuHandler = null
}
MenuHandler.prototype.getBiomorph = function(target) {
    let midCanvas = $(target).closest('.watchmakerView').find('.highlighted canvas')
    
    if(midCanvas.length == 0) {
        midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
    } else {
        midCanvas = midCanvas.eq(0)
    }
    let biomorph = $(midCanvas).data('genotype')
    let newBiomorph = _speciesFactorySingleton.getSpecies(
        this.session.species, this.session, null);
    biomorph.copyBiomorph(newBiomorph)

    return newBiomorph
}

MenuHandler.prototype.menuclick = function(event) {
    let result = this.session.menuclick(event)
    if(result) {
        let menuid = $(event.target).data('menuid')
        let target = event.target
        if(menuid.startsWith('Animal')) {
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox')[0]
            let ctx = midCanvas.getContext('2d')
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0,0, midCanvas.width, midCanvas.height)
            let biomorph = $(midCanvas).data('genotype')
            biomorph.doPerson(menuid.substring(6))
            biomorph.develop()
            return false
        }
        return this.handleMenu(menuid, target)
    }
}

MenuHandler.prototype.handleMenu = function(menuid, target) {
    switch(menuid) {
    case 'AddBiomorphToAlbum':
        let biomorphs = this.session.album.biomorphs
        if(biomorphs.length < 60) {
            biomorphs.push(this.getBiomorph(target))
            let watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newAlbumView", this.session.album, false);
        } else {
            var audio = new Audio('sounds/newbip.mp3');
            audio.play();
        }
        return false
    case 'Copy':
        this.session.clipboard = this.getBiomorph(target)
        return false
    case 'Cut': 
        this.session.clipboard = this.getBiomorph(target)
        this.handleMenu('Clear', target)
        return false
    case 'LoadToAlbum':
        $("<div>").fileDialog({session:this.session, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'ShowAlbum':
        if(this.session.album.length != 0) {
            let watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newAlbumView", this.session.album, true);
            
        } else {
            alert('Add Biomorph to Album first.')
        }
        return false
    case 'Breed': 
    case 'NewRandomStart':
         $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newBreedingView", this.getBiomorph(target), menuid == 'NewRandomStart');        
        return false
    case 'Engineering':
        $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newEngineeringView", this.getBiomorph(target));
        return false
    case 'InitializeFossilRecord':
        this.session.fossilrecord = []
        this.session.fossilizing = true
        let recordingFossils = $(target).closest('.watchmakerMenuBar').find('.menuitemRecordingFossils').eq(0)
        $(recordingFossils).addClass('checked')
        $(recordingFossils).find('img').css('display', 'inline-block')
        return false
    case 'MakeTopOfTriangle':
        this.session.options.topOfTriangle = this.getBiomorph(target)
        return false
    case 'MakeLeftOfTriangle':
        this.session.options.leftOfTriangle = this.getBiomorph(target)
        return false
    case 'MakeRightOfTriangle':
        this.session.options.rightOfTriangle = this.getBiomorph(target)
        return false            
    case 'DisplayPedigree':
        $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newPedigreeView", this.getBiomorph(target));
        return false
    case 'Triangle':
        $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newTriangleView");
        return false
    case 'Drift':
        $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newDriftView");
        return false
    case 'PlayBackFossils':
        let fossilrecord = this.session.fossilrecord
        if(fossilrecord != null && fossilrecord.length != 0) {
        
            $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                    "newPlayBackFossils");
        }
        return false
    case 'DriftSweep':
        let options = this.session.options
        options.driftsweep = ! options.driftsweep
        let li = $(target).closest('li')
        if(options.driftsweep) {
            $(li).addClass('checked')
            $(li).find('img').css('display', 'inline-block')
        } else {
            $(li).removeClass('checked')
            $(li).find('img').css('display', 'none')
        }
        return false
    case 'HopefulMonster':
        var biomorph = this.getBiomorph(target)
        biomorph.doPerson(this.session.options.hopefulMonsterBasicType)
        biomorph.develop()
        return false
    case 'AboutClassicBlindWatchmaker':
        $("<div>").about({index:0, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'AboutClassicExhibitionColour':
        $("<div>").about({index:1, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'AboutClassicArthromorphs':
        $("<div>").about({index:2, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'AboutWatchmakerJS':
        $("<div>").about({index:3, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'Donate':
        document.location = 'https://alancanon.net/donate' 
        return false
    case 'Quit':
        document.location = 'https://richarddawkins.net/' 
        return false
    case 'MiscellaneousHelp':
        $("<div>").helpDialog({helpkey: 'MISCELLANEOUS_HELP', appendTo: $(target).closest('.watchmakerView')})
        return false
    }
    // Do generic stuff here
    // Then call view-specific handler
    if(this.nextMenuHandler) {
        this.nextMenuHandler.menuclick(menuid, target)
    }
    return true;

}
$.widget('dawk.filemenu', $.dawk.sub_menu, {
    options: {
        title: 'File'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Load to Album... (L)', 'LoadToAlbum')
        this.appendmenuitem('Load as Fossils... (O)', 'LoadAsFossils')
        this.appendmenuitem('Save Biomorph...', 'SaveBiomorph')
        this.appendmenuitem('Save Fossils... (F)', 'SaveFossils')
        this.appendmenuitem('Save Album... (S)', 'SaveAlbum')
        this.appendmenuitem('Close Album (W)', 'CloseAlbum')
        this.appendmenuitem('Timing', 'Timing')
        this.appendmenuitem('Quit (Q)', 'Quit')
    }
})

$.widget('dawk.editmenu', $.dawk.sub_menu, {
    options: {
        title: 'Edit'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Undo (Z)', 'Undo')
        this.appendmenuitem('----')
        this.appendmenuitem('Cut (X)', 'Cut')
        this.appendmenuitem('Copy (C)', 'Copy')
        this.appendmenuitem('Paste (V)', 'Paste')
        if(this.options.type == 'Album') {
            this.appendmenuitem('Clear', 'Clear')
        }
        this.appendmenuitem('----')
        if(this.options.type == 'Breeding') {
            this.appendcheckboxmenuitem('Highlight Biomorph', 'HighlightBiomorph', false)
        }
        this.appendmenuitem('Add Biomorph to Album (A)', 'AddBiomorphToAlbum')
        this.appendmenuitem('Show Album', 'ShowAlbum')
    }
})

$.widget('dawk.operationmenu', $.dawk.sub_menu, {
    options: {
        title: 'Operation'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Breed (B)', 'Breed', false, 'img/IconFlipBirdToBreedingGrid_ICON_00261_32x32.png')
        this.appendmenuitem('Drift (D)', 'Drift', false, 'img/IconDrift_ALAN_32x32.png')
        this.appendmenuitem('Engineering (E)', 'Engineering', false, 'img/Hypodermic_PICT_03937_32x32.png')
        this.appendmenuitem('New Random Start (N)', 'NewRandomStart', false, 'img/SixSidedDieShowsFiveIcon_ICON_00257_32x32.png')

        this.appendmenuitem('Hopeful Monster (M)', 'HopefulMonster')
        this.appendmenuitem('Initialize Fossil Record (I)', 'InitializeFossilRecord')
        this.appendmenuitem('Play Back Fossils', 'PlayBackFossils', false, 'img/IconFossilRecord_ALAN_32x32.png')
        this.appendcheckboxmenuitem('Recording Fossils (R)', 'RecordingFossils')
        if(this.options.session.trianglable) {
            this.appendmenuitem('Triangle (T)', 'Triangle', false, 'img/IconTriangle_ALAN_32x32.png')
        }
        if(this.options.session.arrayable) {
            this.appendmenuitem('Array', 'Array')
        }
    }
})

$.widget('dawk.animalmenu', $.dawk.sub_menu, {
    options: {
        title: 'Animal'
    },
    _create: function() {
        this._super();
        let basicTypes = this.options.session.options.basicTypes
        for(let i = 0; i < basicTypes.length; i++) {
            this.appendmenuitem(basicTypes[i], 'Animal' + basicTypes[i])
        }
    }
})
$.widget('dawk.helpmenu', $.dawk.sub_menu, {
    options: {
        title: 'Help'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Help with current operation', 'HelpWithCurrentOperation')
        this.appendmenuitem('Miscellaneous Help', 'MiscellaneousHelp')
        this.appendmenuitem('About Classic Blind Watchmaker', 'AboutClassicBlindWatchmaker')
        this.appendmenuitem('About Classic Exhibition Colour', 'AboutClassicExhibitionColour')
        this.appendmenuitem('About Classic Arthomorphs', 'AboutClassicArthromorphs')
        this.appendmenuitem('About WatchmakerJS', 'AboutWatchmakerJS')
        this.appendmenuitem('Donate', 'Donate')
    }
})
$.widget('dawk.pedigreemenu', $.dawk.sub_menu, {
    options: {
        title: 'Pedigree'
    },
    _create: function() {
        this._super();
        $(this).addClass('pedigreeMenu')
        this.appendmenuitem('Display pedigree (1)','DisplayPedigree')
        if(this.options.type == 'Pedigree') {
            this.appendmenuitem('----', 'PedigreeSep')
            this.appendcheckboxmenuitem('Draw Out Offspring (2)','DrawOutOffspring')
            this.appendcheckboxmenuitem('No Mirrors (3)','NoMirrors')
            this.appendcheckboxmenuitem('Single Mirror (4)','SingleMirror')
            this.appendcheckboxmenuitem('Double Mirror (5)','DoubleMirror')
            this.appendmenuitem('----', 'PedigreeSep')
            this.appendcheckboxmenuitem('Move (6)','Move')
            this.appendcheckboxmenuitem('Detach (7)','Detach')
            this.appendcheckboxmenuitem('Kill (8)','Kill')
        }
    }
})
$.widget('dawk.viewmenu', $.dawk.sub_menu, {
    options: {
        title: 'View'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('More Rows', 'MoreRows')
        this.appendmenuitem('Fewer Rows', 'FewerRows')
        this.appendmenuitem('More Columns','MoreColumns')
        this.appendmenuitem('Fewer Columns','FewerColumns')
        this.appendmenuitem('Thicker Pen','ThickerPen')
        this.appendmenuitem('Thinner Pen','ThinnerPen')
        this.appendcheckboxmenuitem('Drift Sweep','DriftSweep')
        if(this.options.session.trianglable) {
            this.appendmenuitem('Make top of triangle','MakeTopOfTriangle', false, 'img/IconTriangleTop_ALAN_32x32.png')
            this.appendmenuitem('Make left of triangle','MakeLeftOfTriangle', false, 'img/IconTriangleLeft_ALAN_32x32.png')
            this.appendmenuitem('Make right of triangle','MakeRightOfTriangle', false, 'img/IconTriangleRight_ALAN_32x32.png')
        }
    }
})

var KeyCodes = {
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        X: 90,
        a: 97,
        b: 98,
        c: 99,
        d: 100,
        e: 101,
        f: 102,
        g: 103,
        h: 104,
        i: 105,
        j: 106,
        k: 107,
        l: 108,
        m: 109,
        n: 110,
        o: 111,
        p: 112,
        q: 113,
        r: 114,
        s: 115,
        t: 116,
        u: 117,
        v: 118,
        w: 119,
        x: 120,
        y: 121,
        z: 122,
        properties: {
        }
}

$.widget('dawk.watchmakerView', {
    options: {
        session: null,
        type: null
    },
    _create: function() {
        $(this.element).addClass('watchmakerView')
        $(this.element).on('viewGainedFocus', this.viewGainedFocus)
        $(this.element).on('viewLostFocus', this.viewLostFocus)
        this.buildMenus()
    },
    handlekeypress: function(event) {
        let menuHandler = this.options.menuHandler
        let target = $(this.element).find('.sm-watchmaker').get(0)
        switch(event.which) {
        case KeyCodes.a:
            menuHandler.handleMenu('AddBiomorphToAlbum', target)
            break
        case KeyCodes.b:
            menuHandler.handleMenu('Breed', target)
            break
        case KeyCodes.c:
            menuHandler.handleMenu('Copy', target)
            break
        case KeyCodes.d: 
            menuHandler.handleMenu('Drift', target)
            break
        case KeyCodes.e: 
            menuHandler.handleMenu('Engineering', target)
            break
        case KeyCodes.f: 
            menuHandler.handleMenu('SaveFossils', target)
            break
        case KeyCodes.i: 
            menuHandler.handleMenu('InitializeFossilRecord', target)
            break
        case KeyCodes.l: 
            menuHandler.handleMenu('LoadToAlbum', target)
            break
        case KeyCodes.m: 
            menuHandler.handleMenu('HopefulMonster', target)
            break
        case KeyCodes.n: 
            menuHandler.handleMenu('NewRandomStart', target)
            break
        case KeyCodes.o: 
            menuHandler.handleMenu('LoadAsFossils', target)
            break
        case KeyCodes.q: 
            menuHandler.handleMenu('Quit', target)
            break
        case KeyCodes.r: 
            menuHandler.handleMenu('RecordingFossils', target)
            break
        case KeyCodes.s: 
            menuHandler.handleMenu('SaveAlbum', target)
            break
        case KeyCodes.t: 
            menuHandler.handleMenu('Triangle', target)
            break
        case KeyCodes.v: 
            menuHandler.handleMenu('Paste', target)
            break
        case KeyCodes.w: 
            menuHandler.handleMenu('CloseAlbum', target)
            break
        case KeyCodes.x: 
            menuHandler.handleMenu('Cut', target)
            break
        case KeyCodes.z: 
            menuHandler.handleMenu('Undo', target)
            break
        case KeyCodes.ONE: 
            menuHandler.handleMenu('DisplayPedigree', target)
            break
        case KeyCodes.TWO: 
            menuHandler.handleMenu('DrawOutOffspring', target)
            break
        case KeyCodes.THREE: 
            menuHandler.handleMenu('NoMirrors', target)
            break
        case KeyCodes.FOUR: 
            menuHandler.handleMenu('SingleMirror', target)
            break
        case KeyCodes.FIVE: 
            menuHandler.handleMenu('DoubleMirror', target)
            break
        case KeyCodes.SIX: 
            menuHandler.handleMenu('Move', target)
            break
        case KeyCodes.SEVEN: 
            menuHandler.handleMenu('Detach', target)
            break
        case KeyCodes.EIGHT: 
            menuHandler.handleMenu('Kill', target)
            break
        }
    },
    buildMenus: function() {
        let menubar = $('<div class="watchmakerMenuBar"></div>')
        $(menubar).appendTo(this.element)
        let menuHandler = new MenuHandler(this.options.session)
        this.options.menuHandler = menuHandler

        $(menubar).dropdownmenu({menuHandler: menuHandler,
            session: this.options.session, type: this.options.type});

        $(menubar).find("ul.dropdown li").hover(function(){

            $(this).addClass("hover");
            $('ul:first',this).css('visibility', 'visible');

        }, function(){

            $(this).removeClass("hover");
            $('ul:first',this).css('visibility', 'hidden');

        });

        $(menubar).find("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");

    },
    _init: function() {
    },
    updateMenus: function(session, view) {
        let menuitem = $(view).find('.menuitemDriftSweep')[0]
        if(session.options.driftsweep) {
            $(menuitem).find('img').css('display', 'inline-block')
        } else {
            $(menuitem).find('img').css('display', 'none')
        }
        menuitem = $(view).find('.menuitemRecordingFossils')[0]
        if(session.fossilizing) {
            $(menuitem).find('img').css('display', 'inline-block')
        } else {
            $(menuitem).find('img').css('display', 'none')
        }
        menuitem = $(view).find('.menuitemHighlightBiomorph')[0]
        if(session.fossilizing) {
            $(menuitem).find('img').css('display', 'inline-block')
        } else {
            $(menuitem).find('img').css('display', 'none')
        }
    },
    viewLostFocus: function(event, ui) {
    },

})
function BiomorphFile(session, file) {
    this.session = session
    this.file = file
    if(file != null) {
        this.biomorphcount = file.size / session.serializationSize
    }
    this.data = null
}

function Album(name, session) {
    this.name = name
    this.session = session
    this.file = new BiomorphFile(session, null)
    this.biomorphs = []
    session.albums.push(this)
}



/*
 * Album view
 */
$.widget( "dawk.albumView", $.dawk.watchmakerView, {
    options: {
        album: null,
        type: 'Album'
    },
    viewGainedFocus: function(event, ui) {
        let session  = $(this).albumView("option", "session")
        $(this).albumView("updateMenus", session, this)
        session.updateMenus(session, this)
        let albumPages = $(this).find('.albumBoxes')
        $(albumPages).each(function() {$(this).albumPageView('developAll')})
    },
    clear: function(target, ui) {
        let div = $(this.element).find('.highlighted')
        let canvas = $(div).find('canvas')[0]
        let biomorph = $(canvas).data('genotype')
        let biomorphs = this.options.album.biomorphs
        for(let i = 0; i < biomorphs.length; i++) {
            if(biomorph == biomorphs[i]) {
                biomorphs.splice(i, 1)
                break
            }
        }
        $(div).remove()
        let albumPages = $(this).find('.albumBoxes')
        $(albumPages).each(function() {$(this).albumPageView('developAll')})
        
    },
    showPage: function(pageNumber) {
        $(this.element).find('.albumBoxes').each(function() {
            
            let candidatePageNo = $(this).albumPageView('option', 'pageNumber')
            
            if(candidatePageNo != pageNumber) {
                $(this).addClass('albumBoxesHidden')
            }
        })
        $(this.element).find('.albumPageContainer').removeClass('albumPageContainerIndex')
        
    },
    savealbum: function() {
        $('<div>').saveDialog({album: this.options.album,
            session: this.options.session,
            appendTo: this.element})
    },
    showindex: function() {
        let albumBoxes = $(this.element).find('.albumBoxes')
        albumBoxes.each(function() {
            $(this).removeClass('albumBoxesHidden')
            $(this).albumPageView('option', 'isIndexView', true)
            $(this).albumPageView('developAll')
        })
        $(this.element).find('.albumPageContainer').addClass('albumPageContainerIndex')
    },
    _create: function() {
        this._super()
        $(this.element).addClass('albumView')
        if(this.options.album == null) {
            this.options.album = this.options.session.album
        }
        $(this.element).data('album', this.options.album)
        var species = this.options.session.species

        var geneboxes_options = {
            engineering : false,
            session: this.options.session
        }
        var geneboxes = $("<div>")
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        $(this.element).append(geneboxes)
        
        let container = $("<div class='albumPageContainer albumPageContainerIndex'>")
        $(this.element).append(container)

        
        for(let i = 0; i < 4; i++) {
            let albumPageView = $('<div>').albumPageView({
                pageNumber: i, 
                'album': this.options.album, 
                session: this.options.session,
                title: this.options.album.name})
            $(container).append(albumPageView)
            $(albumPageView).albumPageView('developAll')
        }
        this.options.menuHandler.nextMenuHandler = new AlbumMenuHandler(this.options.session)
   
    }
})

function AlbumMenuHandler(session) {
    this.session = session
}

AlbumMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'Clear':
        $(target).closest('.albumView').albumView('clear', target, null)
        return false
    case 'Paste':
        if(this.session.clipboard == null) {
            return
        }
        let albumView = $(target).closest('.albumView')
        console.log(albumView)
        let album = albumView.albumView('option', 'album')
        console.log(album)
        let biomorphs = album.biomorphs

        let newBiomorph = _speciesFactorySingleton.getSpecies(
                this.session.species, this.session, null);
        this.session.clipboard.copyBiomorph(newBiomorph)
        if(biomorphs.length < 60) {
            biomorphs.push(newBiomorph)
            albumView.find('.albumBoxes').albumPageView('developAll')
        } else {
            var audio = new Audio('sounds/newbip.mp3');
            audio.play();
        }
        
        $(event.target).closest('.albumView').albumView('clear', event, null)
        return false
    case 'SaveAlbum': 
        let view = $(event.target).closest('.albumView').albumView('savealbum', event, null)
        return false
    case 'HelpWithCurrentOperation':
        console.log('album help')
        $("<div>").helpDialog({helpkey: 'ALBUM_HELP', appendTo: $(target).closest('.watchmakerView')})
        return false
    }
    
    return true;
}
/*
 * Album Page view
 */
$.widget( "dawk.albumPageView", {
    options: {
        pageNumber: 0,
        isIndexView: true,
        album: null,
        title: 'Album'
    },
    _create: function() {
        this._super()
        $(this.element).addClass('albumBoxes')
        this._on(this.element, {'click': function(event) {
            if(this.options.isIndexView) {
                this.options.isIndexView = false
                albumView = $(event.target).closest('.albumView')
                $(albumView).albumView('showPage', this.options.pageNumber)
                this.developAll()
            }
        }})
        return this
    },
    updateGeneboxes: function(target) {
        var geneboxes = $(target).closest('.watchmakerView').find('.geneboxes').get(0);
        _speciesFactorySingleton.updateFromCanvas(this.options.session.species, geneboxes,
                target)

    },
    canvasclicked: function (target) {
        $(this.element).find('.highlighted').removeClass('highlighted')
        $(target).closest('div').addClass('highlighted')
    },
    gotoindex: function() {
        this.options.isIndexView = true
        let albumView = $(this.element).closest('.albumView')[0]
        $(albumView).albumView('showindex')
    },
    developAll: function() {
        $(this.element).empty()
        let p = $("<p class='albumBoxesPageNo'>" + this.options.title + " Page " + (this.options.pageNumber + 1) + "</p>")
        $(p).appendTo(this.element)
        if(! this.options.isIndexView) {
            let indexButton = $("<button>Index</button>")
            $(indexButton).appendTo(p)
            this._on(indexButton, {click: function(event) {
                event.stopPropagation()
                this.gotoindex()
            }})
        }

        biomorphs = this.options.album.biomorphs
        let pageNumber = this.options.pageNumber
        let startIndex = pageNumber * 15
        let endIndex = startIndex + 15
        if(startIndex < biomorphs.length) {
            for(let i = startIndex; i <  endIndex && i < biomorphs.length; i++) {
                let biomorph = biomorphs[i]
                let div = $('<div>')
                div.appendTo(this.element)
                let canvas = $('<canvas class="albumCanvas">')
                if(this.options.isIndexView) {
                    $(div).attr('width', 100)
                    $(div).attr('height', 100)
                    $(canvas).attr('width', 100)
                    $(canvas).attr('height', 100)
                } else {
                    $(div).attr('width', 200)
                    $(div).attr('height', 200)
                    $(canvas).attr('width', 200)
                    $(canvas).attr('height', 200)
                }
                div.append(canvas)

                this._on(canvas, {
                    mouseover: function(event) {
                        this.updateGeneboxes(event.target)
                    },
                    click: function(event) {
                        if(! this.options.isIndexView)
                            event.stopPropagation()
                            this.canvasclicked(event.target)
                    }
                })
                biomorph.drawer = canvas[0]
                $(canvas).data('genotype', biomorph)
               
                if(this.options.isIndexView) {
                    biomorph.develop(0.5)    
                } else {
                    biomorph.develop()
                }
                this.updateGeneboxes(canvas[0])
            }
        }
    },
    viewGainedFocus: function(event, ui) {
        let session  = $(this).albumPageView("option", "session")
        $(this).albumPageView("updateMenus", session, this)
        session.updateMenus(session, this)
    },
})


$.widget('dawk.fileDialog', $.ui.dialog, {
    options: {
        "ui-dialog": "file-dialog",
    },
    _create: function() {

        $(this.element).addClass('fileDialog')
        $(this.element).attr('title', 'Load to Session Album')
        let input = $('<input type="file" class="fileInput" multiple >')
        $(this.element).append(input)       
        let buttonDiv = $('<div class="fileButtonDiv">').appendTo(this.element)
        let addSelectedToSessionAlbum = $('<button class="fileDialogButton fileButtonHidden">Add Biomorph</button>')
        $(buttonDiv).append(addSelectedToSessionAlbum)
        this._on(addSelectedToSessionAlbum, {click: function(event) {this.addbiomorphtoalbum(event)}})
        let addSelectedAlbumToSessionAlbum = $('<button class="fileDialogButton fileButtonHidden">Add All</button>')
        $(buttonDiv).append(addSelectedAlbumToSessionAlbum)
        this._on(addSelectedAlbumToSessionAlbum, {click: function(event) {this.addalbumtoalbum(event)}})
        let openAlbum = $('<button class="fileDialogButton fileButtonHidden">Open Album</button>')
        this._on(openAlbum, {click: function(event) {this.openalbum(event)}})
        $(buttonDiv).append(openAlbum)

        $(this.element).append($("<div class='fileListPreviewHeader'><div>Album Name</div><div>Biomorphs</div></div>"))

        let fileListPreviewFlexDiv = $('<div class="fileListPreviewFlexDiv">')
        $(this.element).append(fileListPreviewFlexDiv)
        let fileList = $('<div>').addClass('fileList')
        $(fileListPreviewFlexDiv).append(fileList)
        this.loadsessionalbums(fileList)
        this._on(input, {change: function(event) {
            this.filechange(event)
        }})
        this.options.width = 450
        this.options.height = 380
        this.options.modal = true
        $(fileListPreviewFlexDiv).append($('<canvas width="200" height="200" class="previewFile">'))
        let slider = $("<div>").slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 0,
            value: 0,
            slide: function( event, ui ) {
                let view = $(event.target).closest('.fileDialog')
                $(view).fileDialog('showalbumitem', ui.value)
            },
            classes: {
                "ui-slider": "file-preview-slider",
            }
        });
        $(fileListPreviewFlexDiv).append(slider)
        $('<div class="status"></status>').appendTo(this.element)
        return this._super()
    },
    updatestatus: function(message) {
        var status = $(this.element).find('.status')
        $(status).text(message)
        setTimeout(function(){ $(status).empty() }, 3000);        
    },
    addbiomorphtoalbum: function(event) {
        let session = this.options.session
        let slider = $(this.element).find('.file-preview-slider').slider("option", "value");
        let canvas = $(this.element).find('canvas')
        let biomorph = $(canvas).data('genotype')
        let newBiomorph = _speciesFactorySingleton.getSpecies(
                session.species, session, canvas[0]);
        biomorph.copyBiomorph(newBiomorph)
        if(session.album.biomorphs.length < 60) {
            session.album.biomorphs.push(newBiomorph)
            this.updatestatus('Added biomorph to session album')
            let watchmakerSessionTab = $(event.target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newAlbumView", session.album, false);
            
        } else {
            this.updatestatus('Session album is full')
            var audio = new Audio('sounds/newbip.mp3');
            audio.play();
        }
    },
    addalbumtoalbum: function(event) {
        let session = this.options.session
        let fileDialog = $(event.target).closest('.fileDialog')
        let selectedAlbum = fileDialog.find('.albumSelected')[0]
        let album = $(selectedAlbum).data('album')
        let biomorphs = album.biomorphs
        let sessionAlbumBiomorphs = session.album.biomorphs
        let canvas = $(fileDialog).find('canvas')[0]
        if(sessionAlbumBiomorphs.length + biomorphs.length > 60) {
            var audio = new Audio('sounds/newbip.mp3');
            audio.play();
            this.updatestatus('Not enough room in session album to add all biomorphs.')
        } else {
            for(let i = 0; i < biomorphs.length; i++) {
                let newBiomorph = _speciesFactorySingleton.getSpecies(
                        session.species, session, canvas);
                biomorphs[i].copyBiomorph(newBiomorph)
                sessionAlbumBiomorphs.push(newBiomorph)
            }
            this.updatestatus('Added all biomorphs to session album')
            let watchmakerSessionTab = $(event.target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newAlbumView", session.album, false);


        }
    },
    openalbum: function(event) {
        let watchmakerSessionTab = $(event.target).closest('.watchmakerSessionTab').eq(0)
        let selectedDiv = $(event.target).closest('.fileDialog').find('.albumSelected')[0]
        let album = $(selectedDiv).data('album')
        $(watchmakerSessionTab).watchmakerSessionTab(
                "newAlbumView", album, true);
        this.close()
    },
    showalbumitem: function(index) {
        let canvas = $(this.element).find('canvas')[0]
        let selectedDiv = $(this.element).find('.albumSelected')[0]
        let biomorph = $(selectedDiv).data('album').biomorphs[index]
        biomorph.drawer = canvas
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
    },
    loadsessionalbums: function(fileList) {
        let sessionAlbums = this.options.session.albums
        for(let j = 0; j < sessionAlbums.length; j++) {
            let album = sessionAlbums[j]
            if(album.file.file != null) {
                let file = album.file.file
                let fileDiv = $('<div class="file fileListElement">' + file.name + '</div>')
                $(fileList).append(fileDiv)
                $(fileDiv).data('album', album)
                this._on(fileDiv, {click: function(event) {this.albumselected(event)}})
                $(fileList).append($('<div class="fileSize">' + album.file.biomorphcount + '</div>'))
            }
        }
    },
    filechange: function(event) {
        let fileDialog = $(event.target).closest('.fileDialog')
        event.stopPropagation()
        event.preventDefault()
        let files = event.target.files
        let str = '';
        let fileList = fileDialog.find('.fileList')
        $(fileList).empty()
        this.loadsessionalbums(fileList)
        let session = this.options.session
        let totalBiomorphs = 0
        for(let i = 0; i < files.length; i++) {
            let file = files[i]
            let fileDiv = $('<div class="file fileListElement">' + file.name + '</div>')
            $(fileList).append(fileDiv)
            let album = new Album(file.name, session)
            let biomorphFile = new BiomorphFile(session, file)
            album.file = biomorphFile
            $(fileDiv).data('album', album)
            this._on(fileDiv, {click: function(event) {this.albumselected(event)}})
            $(fileList).append($('<div class="fileSize">' + biomorphFile.biomorphcount + '</div>'))
            let reader = new FileReader() 
            reader.onload = function(e) {
                biomorphFile.data = reader.result
                
                for(let index = 0; index < biomorphFile.biomorphcount; index++) {
                    let canvas = $('<canvas>')
                    let biomorph = _speciesFactorySingleton.getSpecies(
                            session.species, session, canvas[0]);
                    biomorph.readFromArrayBuffer(reader.result, index)
                    album.biomorphs.push(biomorph)
                }
            }
            reader.readAsArrayBuffer(file)
        }
        this.updatestatus('Loaded biomorphs from ' + files.length + ' files.')

    },
    albumselected: function(event) {
        $(event.target).closest('.fileList').find('.fileListElement').removeClass('albumSelected')
        $(event.target).addClass('albumSelected')
        let album = $(event.target).data('album')
        let file = album.file
        let fileDialog = $(event.target).closest('.fileDialog')
        $(fileDialog).find('.fileDialogButton').removeClass('fileButtonHidden')
        let session = this.options.session // $(fileDialog).fileDialog('option', 'session')
        let canvas = fileDialog.find('canvas.previewFile')[0]
        let biomorph = _speciesFactorySingleton.getSpecies(
                session.species, session, canvas);
        $(canvas).data('genotype', biomorph)

        let slider = $(this.element).find('.file-preview-slider')
        $(slider).slider("option", "max", album.biomorphs.length - 1)
        $(slider).slider("option", "value", 0)
        biomorph.readFromArrayBuffer(file.data, 0)
        biomorph.develop()
    }
})


$.widget('dawk.saveDialog', $.ui.dialog, {
    options: {
        "ui-dialog": "file-dialog",
    },
    _create: function() {

        $(this.element).addClass('saveDialog')
        $(this.element).attr('title', 'Save Album')

        this.options.width = 450
        this.options.height = 350
        this.options.modal = true
        let album = this.options.album
        let biomorphs = album.biomorphs
        let bufferLength = biomorphs.length * this.options.session.serializationSize;
        album.file.data = new ArrayBuffer(bufferLength)
        for(let i = 0; i < biomorphs.length; i++) {
            biomorphs[i].writeToArrayBuffer(album.file.data, i)
        }
        var binary = '';
        var bytes = new Uint8Array( album.file.data );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        let base64 = window.btoa( binary );
        $('<div>WatchmakerJS cannot save files to disk on its own. Click the link below to download, or right click and choose "Save link as...", or whatever is appropriate for your browser.</div>').appendTo(this.element)
        $('<div><a href="data:application/octet-stream;base64,' + base64 + '">Download album</a></div>').appendTo(this.element)
        return this._super()
        
        
    },
})


//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.breedingView", $.dawk.watchmakerView, {
    options: { 
        species: null,
        type: 'Breeding',
        watchmakerSessionTab: null,
        biomorph: null,
        generationsPreviousSecond: 0,
        newRandomStart: false,
        highlighting: false
    },
    viewGainedFocus: function(event, ui) {
        let session  = $(this).breedingView("option", "session")
        $(this).breedingView("updateMenus", session, this)
        session.updateMenus(session, this)
        // resume animation (if enabled) here?
    },
    viewLostFocus: function(event, ui) {
        this._super(event, ui)
        // stop animation here
    },

    _create: function (options) {
        this._super() // "_create"
        var species = this.options.session.species
        $(this.element).addClass('breedingView')
        var geneboxes_options = {
            engineering: false,
            session: this.options.session
        }
        var geneboxes = $("<div>");
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes);
        var container = $("<div>");
        container.addClass('container');
        var boxes = $("<div>").breedingBoxes({session: 
            this.options.session, 
            biomorph: this.options.biomorph,
            newRandomStart: this.options.newRandomStart})
        this.options.boxes = boxes
        var overlay = $("<div>");
        overlay.addClass("overlay");
        container.append(overlay);
        container.append(boxes);

        var overlayCanvas = $('<canvas></canvas>');
        overlayCanvas.attr('width', 1000);
        overlayCanvas.attr('height', 600);
        overlayCanvas.addClass('overlayCanvas');
        overlay.append(overlayCanvas);
        this.element.append(container);

        $("<div>").breedingOffspringCounter().appendTo(this.element)

        this.options.menuHandler.nextMenuHandler = new BreedingMenuHandler(this)
        
        var midCanvas = $(this.element).find('.midBox').get(0);
        this.options.timingDialog = Breeding.createTimingDialog(this.element, boxes.element)
        $(midCanvas).trigger('mouseover');
        if(! this.options.newRandomStart) {
            $(midCanvas).trigger('click');
        }
    },
    startAutoBreeding: function(event) {
        var startButton = $(this.options.timingDialog).find('.startAutoReproduce').get(0);
        var text = $(startButton).text()
        if(text == 'Stop') {
            this.options.autoRunning = false;
            $(startButton).text('Start');
        } else {
            $(startButton).text('Stop');
            this.options.autoRunning = true;
            this.autoBreed();
            var generations = $(this.element).find('.generations').get(0);
            this.measureGenerationRate(Number(generations.value));
        }
    },
    autoBreed: function() {
        var breedingBoxes = $(this.element).closest('.breedingView').find('.boxes').get(0);
        if (this.options.autoRunning) {
            var useFitnessCheckbox = $(this.element).find('.useFitness').get(0)
            var useFitness = false
            if(useFitnessCheckbox) {
                useFitness = useFitnessCheckbox.checked;
            }
            var numBoxes = $(this.options.boxes).breedingBoxes("option", "numBoxes");
            if (useFitness) {
                var canvas = $(breedingBoxes).find('.box').get(0);
                var biomorph = $(canvas).data('genotype');
                var bestSoFar = canvas;

                var errorToBeat = biomorph.fitness(canvas);
                $(breedingBoxes).find('.box').each( function(index) {
                    canvas = this;
                    var currentError = $(canvas).data('genotype').fitness(canvas);
                    if (currentError < errorToBeat) {
                        bestSoFar = canvas;
                        errorToBeat = currentError;
                    }
                });
                $(bestSoFar).trigger('click');
            } else {
                var luckyParent = Math.trunc(Math.random() * numBoxes);
                var luckyCanvas = $(breedingBoxes).find('.box').get(luckyParent);
                $(luckyCanvas).trigger('click');
            }
            let autoReproduceIntervalStr = $(this.element).find('.autoReproduceInterval').get(0).value 
            var interval = Number(autoReproduceIntervalStr);
            this._delay(this.autoBreed, interval);

        }            
    },
    measureGenerationRate: function() {
        var generationCounter = $(this.element).find('.generations').get(0);
        var newGenerationValue = Number(generationCounter.value) + 1;
        generationCounter.value = newGenerationValue;
        var generationRate = $(this.element).find('.generationRate').get(0);

        generationRate.value = newGenerationValue - this.options.generationsPreviousSecond;
        this.options.generationsPreviousSecond = newGenerationValue;
        if(this.options.autoRunning)
            this._delay(this.measureGenerationRate, 1000);
    },
    updateMenus: function(session, view) {
        this._super(session, view)
        let menuitem = $(view).find('.menuitemHighlightBiomorph')[0]
        if(this.options.highlighting) {
            $(menuitem).find('img').css('display', 'inline-block')
        } else {
            $(menuitem).find('img').css('display', 'none')
        }
    },    
})


function BreedingMenuHandler(breedingView) {
    this.breedingView = breedingView
}

BreedingMenuHandler.prototype.menuclick = function(menuid, target) {
    let highlighting = $(this.breedingView.element).breedingView('option', 'highlighting')
    switch(menuid) {
    case 'Timing':
        this.breedingView.options.timingDialog.dialog('open') 
        return false
    case 'HelpWithCurrentOperation':
        if(highlighting) {
            $("<div>").helpDialog({helpkey: 'HIGHLIGHTING_HELP', appendTo: $(target).closest('.watchmakerView')})
        } else {
            $("<div>").helpDialog({helpkey: 'BREEDING_HELP', appendTo: $(target).closest('.watchmakerView')})
        }
        return false    
    case 'HighlightBiomorph':
        highlighting = ! highlighting
        $(this.breedingView.element).breedingView('option', 'highlighting', highlighting)
        let li = $(target).closest('li')
        if(highlighting) {
            $(li).addClass('checked')
            $(li).find('img').css('display', 'inline-block')
        } else {
            $(this.breedingView.element).find('.highlighted').removeClass('highlighted')
            $(li).removeClass('checked')
            $(li).find('img').css('display', 'none')
        }
        return false    
    }
    return true
}
/*
 * breedingBoxes widget definition
 */

//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.breedingBoxes", {
    // default options
    options: {
        cols: 3,
        numBoxes: 15,
        speciesFactory: null,
        newRandomStart: false
    },

    sparkLine: function(destinationCanvas) {
        var canvas = $(this.element).parent().find('.overlayCanvas')[0];

        var context = canvas.getContext('2d');
        var midBox = Math.trunc(this.options.numBoxes / 2);
        var parents = $(destinationCanvas).parent();

        var midCanvas = $(destinationCanvas).parents('.boxes').find('.midBox').get(0);
        var midDiv = $(midCanvas).parent();
        var midPos = $(midDiv).position();
        var destDiv = $(destinationCanvas).parent();
        var destPos = $(destDiv).position();
        var x0 = Math.trunc(midPos.left + midDiv.width() / 2);
        var y0 = Math.trunc(midPos.top + midDiv.height() / 2);
        var x1 = Math.trunc(destPos.left + destDiv.width() / 2);
        var y1 = Math.trunc(destPos.top + destDiv.height() / 2);
        context.strokeStyle = '#000000';
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.closePath();
        context.stroke();
    },

    doReproduce: function (sourceCanvas, targetCanvas) {
        var breedingView = $(sourceCanvas).closest('.breedingView')
        var generations = $(breedingView).find('.generations').get(0)
        generations.value = Number(generations.value) + 1;

        var genotype = jQuery.data(sourceCanvas, "genotype");
        if(genotype != null) {
            var childGenotype = genotype.reproduce(targetCanvas);
            jQuery.data(targetCanvas, 'genotype', childGenotype);
            childGenotype.develop(); 
        }
        else  
            alert("Genotype is null");
    },


    produceKthOffspring: function (numBoxes, midBox, k, midCanvasDivPosition, recursive) {
        if(k < numBoxes) {
            var sourceCanvas = $(this.element).find('.midBox').get(0);
            var targetCanvas = $(this.element).find('canvas').get(k);
            $(targetCanvas).css({ left: "0px", top: "0px" });
            if (k != midBox) {
                var position = $(targetCanvas).parent().position();
                var deltaX = midCanvasDivPosition.left - position.left;
                var deltaY = midCanvasDivPosition.top - position.top;
                // Move the target canvas to the centre
                $(targetCanvas).css({ left: deltaX, top: deltaY});
                // Grow the offspring on the target canvas
                this.doReproduce(sourceCanvas, targetCanvas);
                if(recursive) { // one at a time
                    this.sparkLine(targetCanvas);
                    // Move the target canvas back into its home position
                    $( targetCanvas ).animate({
                        left: 0,
                        top: 0
                    }, { duration: 200, 
                        easing: 'easeOutExpo',
                        complete: function() {
                            let overlayCanvas = $(targetCanvas).parents('.watchmakerView').find('.overlayCanvas')[0];
                            let ctx = overlayCanvas.getContext('2d')
                            ctx.beginPath()
                            ctx.clearRect(0,0, overlayCanvas.width, overlayCanvas.height)
                            ctx.closePath()
                            $(targetCanvas).removeClass('activeBreeding')
                            var breedingBoxes = $(targetCanvas).parent().breedingBox("option", "breedingBoxes");
                            breedingBoxes.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                        }});
                } else { // Explosive breeding
                    $( targetCanvas ).animate({
                        left: 0,
                        top: 0,
                    }, { queue: true, duration: 2000,
                        easing: 'easeOutExpo',
                        complete: function() {
                            $(targetCanvas).removeClass('activeBreeding')
                        }});
                }
            } else { // midbox
                if(recursive) {
                    this.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                }
            }
        } 
    },

    produceLitter: function(numBoxes, midBox) {
        if(this.options.session.fossilizing) {
            let biomorph = $(this.element).find('.midBox').data('genotype')
            this.options.session.fossilrecord.push(biomorph)
        }
        let midCanvasDiv = this.options.midCanvasDiv;
        let midCanvasDivPosition = midCanvasDiv.position();
        let breedingView = $(this.element).closest('.breedingView')
        let explosiveBreeding = breedingView.find('.explosiveBreeding').get(0)
        let recursive = ! explosiveBreeding.checked;
        if(recursive) {
            this.produceKthOffspring(numBoxes, midBox, 0, midCanvasDivPosition, recursive);
        } else {
            for (k = 0; k < numBoxes; k++) {
                this.produceKthOffspring(numBoxes, midBox, k, midCanvasDivPosition, recursive);
            }
        }
    },
    newRandomStart: function(event) {
        if(this.options.newRandomStart) {
            let canvas = $(this.options.midCanvasDiv).find('canvas').get(0)
            let biomorph = $(canvas).data('genotype')
            biomorph.doPerson(this.options.session.options.hopefulMonsterBasicType)
            biomorph.develop()
            $(canvas).trigger("mouseover");
        }
    },
    // The constructor
    _create: function(options) {
        var session = this.options.session
        var species = this.options.session.species
        var boxes = this.element
        $(boxes).addClass('boxes')
        if(this.options.newRandomStart) {
            $(boxes).addClass('newRandomStart')
            this._on(this.element, {click: "newRandomStart"})
        }
        this.element.append(boxes)
        var numBoxes = this.options.numBoxes
        var midBox = Math.trunc(numBoxes / 2)
        for (j = 0; j < numBoxes; j++) {
            var isMidBox = j == midBox
            var canvasDiv = $("<div></div>").breedingBox({ 
                boxIndex: j, 
                isMidBox: isMidBox, 
                species: species,
                breedingBoxes: this,
                parentOptions: this.options}
            ).appendTo(boxes);
            if(isMidBox) {
                this.options.midCanvasDiv = canvasDiv
                var canvas = $(canvasDiv).find('canvas').get(0)

                // Create a biomorph and render it on the middle canvas.
                var biomorph = _speciesFactorySingleton.getSpecies(
                        species, session, canvas)
                        if(this.options.newRandomStart) {
                            biomorph.doPerson(session.options.hopefulMonsterBasicType)
                        } else {
                            if(this.options.biomorph) {
                                this.options.biomorph.copyBiomorph(biomorph)
                            } else {
                                biomorph.doPerson(session.options.defaultBasicType)
                            }
                        }

                $(canvas).data('genotype', biomorph)        
                biomorph.develop()
            }
        }

        this._refresh()
    },

//  Called when created, and later when changing options
    _refresh: function() {
    },

//  A public method to change the color to a random value
//  can be called directly via .colorize( "random" )
    random: function( event ) {
    },

    _destroy: function() {
    },

//  _setOptions is called with a hash of all options that are changing
//  always refresh when changing options
    _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments )
        this._refresh()
    },

//  _setOption is called for each individual option that is changing
    _setOption: function( key, value ) {
        this._super( key, value );
    }
});

$.widget('dawk.breedingBox', {
    options: {
        species: null,
        canvas: null,
        boxIndex: null,
        isMidBox: false,
        breedingBoxes: null,
        width: 200,
        height: 200,
        parentOptions: null,
    },
    _create: function() {
        this.element.addClass('boxDiv');
        var canvasId = "canvas" + this.options.boxIndex;
        var canvas = $("<canvas></canvas>");
        canvas.attr('width', this.options.width);
        canvas.attr('height', this.options.height);
        canvas.addClass('box');
        this.options.canvas = canvas;
        this.element.append(canvas);
        if (this.options.isMidBox) {
            canvas.addClass('midBox');
        }

        this._on( canvas, {
            click: "_doCanvasClicked",
            mouseover: "_doMouseOver"
        });
    },
    _doMouseOver: function(event) {
        if($(this.options.canvas).data('genotype') != null) {
            var geneboxes = this.element.parents('.watchmakerView').find('.geneboxes').get(0);
            _speciesFactorySingleton.updateFromCanvas(
                    this.options.species,
                    geneboxes, this.options.canvas)
        }
    },
    _doCanvasClicked: function(event) {
        console.log('canvas clicked')
        let target = event.target
        let view = $(target).closest('.watchmakerView')
        if(view.find('.activeBreeding').length != 0) {
            return
        }
        
        let highlighting = $(view).breedingView('option','highlighting')
        let genotype = $(target).data('genotype')
        if(genotype == null) {
            return
        }
        event.stopPropagation()
        
        if(highlighting) {
            this._doCanvasClickedHighlighting(view, target)
        } else {
            this._doCanvasClickedBreed(view, target)
        }
    },
    _doCanvasClickedHighlighting: function(view, target) {
        view.find('.highlighted').removeClass('highlighted')
        $(target).closest('div').addClass('highlighted')
    },
    _doCanvasClickedBreed: function(view, target) {
        var canvas = this.options.canvas;
        var position = this.element.position();
        var midCanvasDiv = this.options.breedingBoxes.options.midCanvasDiv;
        var midCanvasDivPosition = midCanvasDiv.position();
        var deltaX = midCanvasDivPosition.left - position.left;
        var deltaY = midCanvasDivPosition.top - position.top;
        var boxes = this.options.breedingBoxes;
        var numBoxes = boxes.options.numBoxes;
        var midBox = Math.trunc(numBoxes / 2);
        var midCanvas = $(this.element).parent().find('.midBox').get(0);
        var biomorph = $(target).data('genotype');
        var breedingBoxes = this.options.breedingBoxes;
        var clickedBoxIndex =  this.options.boxIndex;
        if (biomorph != null) {
            if(this.options.parentOptions.newRandomStart) {
                var watchmakerSessionTab = $(event.target).closest('.watchmakerSessionTab').eq(0)
                $(watchmakerSessionTab).watchmakerSessionTab(
                        "newBreedingView", biomorph, false);
            } else {
                view.find('.box').addClass('activeBreeding')
                // erase the other canvases
                var breedingViewCanvases = $(canvas).parents('.boxes').find('canvas');
                $(breedingViewCanvases).each(function(index) {
                    if(index != clickedBoxIndex) {
                        let ctx = this.getContext('2d')
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        ctx.clearRect(0,0, this.width, this.height)
                        $(this).css({left: midCanvasDivPosition.left, top: midCanvasDivPosition.top});
                    }
                });
    
                if (! this.options.isMidBox) {
                    $( canvas ).animate({
                        left: "+=" + deltaX,
                        top: "+=" + deltaY
                    }, { duration: 1000,                               
                        easing: 'easeOutExpo',
                        complete: function() {
                            // Hand the biomorph off to the middle canvas
                            jQuery.data(canvas, 'genotype', null)
                            jQuery.data(midCanvas, 'genotype', biomorph)
                            $(midCanvas).removeClass('activeBreeding')
                            let ctx = this.getContext('2d')
                            ctx.beginPath()
                            ctx.clearRect(0,0, this.width, this.height)
                            ctx.closePath()
                            // Inform the genotype that it now draws on a different
                            // canvas
                            biomorph.drawer = midCanvas
                            $(midCanvas).css({left:0,top:0})
                            biomorph.develop()
                            breedingBoxes.produceLitter(numBoxes, midBox)
                        } });
                } else {
                    $(midCanvas).removeClass('activeBreeding')
                    breedingBoxes.produceLitter(numBoxes, midBox);
                }
            }
        } else {
            // Genotype was null, newRandomStart in boxes should take care of it
        } 
        // Update the geneboxes with the genes of the new parent.
        $(midCanvasDiv).trigger("mouseover");
    },
});
function Breeding() {}

Breeding.createTimingDialog = function(appendTo, positionOf)  {
    var div = $('<div>');
    var button = $('<button class="startAutoReproduce">Start</button>');
    div.append(button);

    $(button).click(function(event) {
        $(event.target).closest('.breedingView').breedingView('startAutoBreeding')
    });
    var string = '<span> autobreeding every <input type="text"\
        class="autoReproduceInterval" size="5" maxlength="10" value="5000" />\
        ms.</span>';

    $(string).appendTo(div)
    $("<br>").appendTo(div)
    
    var useFitness = $('<span><input type="checkbox" class="useFitness" /> Use Fitness</span>')
    $(useFitness).tooltip();
    $(useFitness).attr('title', 'Breed based on how well biomorph fits its box');
    $(useFitness).appendTo(div)
    $("<br>").appendTo(div)
    var explosiveBreeding = $('<span><input type="checkbox" checked class="explosiveBreeding" /> Explosive\
    Breeding</span>')

    div.append(explosiveBreeding);
    $(explosiveBreeding).tooltip();
    $(explosiveBreeding).attr('title', 'Whether breeding happens all-at-once or one-at-a time. Uncheck for classic Blind Watchmaker breeding animation');
    $(div).dialog({
        width: 400,
        position: {
            my: 'left top',
            at: 'left+20px top+20px',
            of: positionOf
        },
        appendTo: appendTo,
        autoOpen: false,
        modal: false,
        classes: {"ui-dialog": "breedingTiming"},
        title: 'Timing',            
        offset: {
            left:20,
            right:20
        },
        startButton: null,
        generationsPreviousSecond: 0});

    return div
}
$.widget( "dawk.breedingOffspringCounter", {

    _create: function() {
        $(this.element).addClass('breedingOffspringCounter');
        var string = '<span>Offspring count: <input type="number" value="0" class="generations" />\
            Offspring per second: <input type="number" value="0"\
            class="generationRate" />\
            </span>'
            var div = $.parseHTML(string);
        this.element.append(div);
    }
});$.widget('dawk.driftView', $.dawk.watchmakerView, {
    _create: function() {
        this._super("_create")
        $(this.element).addClass('driftView')
        var species = this.options.session.species
        
        var geneboxes_options = {
            engineering : false,
            session: this.options.session
        }
        var geneboxes = $("<div>")
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes)
        var driftDiv = $("<div>").driftBox({ 
            species: species,
            height: 600,
            width: 1000})
        this.element.append(driftDiv)
        var canvas = $(driftDiv).find('canvas').get(0)
        var biomorph = _speciesFactorySingleton.getSpecies(species, this.options.session, canvas)
        if(this.options.biomorph) {
            this.options.biomorph.copyBiomorph(biomorph)
        } else {
            biomorph.doPerson("BasicTree")
        }
            
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        $(driftDiv).driftBox('update')
        $(driftDiv).driftBox('startDrift')
        this.options.menuHandler.nextMenuHandler = new DriftMenuHandler()

        
    },
    viewGainedFocus: function(event, ui) {
        let session = $(this).driftView('option', 'session')
        session.updateMenus(session)
        $(this).driftView("updateMenus", session, this)
        driftDiv = $(this).find('.driftBox') 
        $(driftDiv).driftBox("startDrift")
    },
    viewLostFocus: function(event, ui) {
        driftDiv = $(this).find('.driftBox') 
        $(driftDiv).driftBox("stopDrift")
    },

    // Called when created, and later when changing options
    _refresh: function() {
    },

    _destroy: function() {
    },


});



function DriftMenuHandler() {
}

DriftMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'HelpWithCurrentOperation':
        $("<div>").helpDialog({helpkey: 'DRIFT_HELP', appendTo: $(target).closest('.watchmakerView')})
    }
    
    return true;
}

/*
 * drift box
 */
$.widget('dawk.driftBox', {
    options: {
        species: null,
        canvas: null,
        width: 200,
        height: 200,
        dodrift: false
    },
    _create: function() {
        this.element.addClass('driftBox');
        this.element.addClass('boxDiv');
        var canvas = $("<canvas>");
        this.options.canvas = canvas[0];
        canvas.attr('width', this.options.width);
        canvas.attr('height', this.options.height);
        canvas.addClass('box');
        canvas.addClass('midBox');

        this.element.append(canvas);


    },
    doDrift: function() {
        if(this.options.dodrift) {
            let canvas = this.options.canvas
            let biomorph = $(canvas).data('genotype').reproduce(canvas)
            $(canvas).data('genotype', biomorph)
            biomorph.develop()
            this.update()
            this._delay(this.doDrift, 0);
        } 
    },
    stopDrift: function() {
        this.options.dodrift = false
    },
    startDrift: function() {
        if(! this.options.dodrift) {
            this.options.dodrift = true
            this.doDrift()
        }
    },
    update: function() {
        var parentView = this.element.closest('.watchmakerView')[0];
        var geneboxes = $(parentView)
        .find('.geneboxes').get(0);
        let canvas = $(this.element).find('canvas')[0]
        _speciesFactorySingleton.updateFromCanvas(this.options.species, geneboxes,
                canvas)
    },
})
$.widget('dawk.engineeringView', $.dawk.watchmakerView, {
    _create: function() {
        this._super("_create")
        $(this.element).addClass('engineeringView')
        var species = this.options.session.species

        var geneboxes_options = {
            engineering : true,
            session: this.options.session
        }
        var geneboxes = $("<div></div>")
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes)
        var engineeringDiv = $("<div></div>").engineeringBox({ 
            species: species,
            height: 600,
            width: 1000})
            this.element.append(engineeringDiv)
            var canvas = $(engineeringDiv).find('canvas').get(0)
            var biomorph = _speciesFactorySingleton.getSpecies(species, this.options.session, canvas)
            if(this.options.biomorph) {
                this.options.biomorph.copyBiomorph(biomorph)
            } else {
                biomorph.doPerson(this.options.session.options.defaultBasicType)
            }
        this.options.menuHandler.nextMenuHandler = new EngineeringMenuHandler()

        jQuery.data(canvas, 'genotype', biomorph)
        biomorph.develop()
        $(canvas).trigger('mouseover')

    },
    viewGainedFocus: function(event) {
        let session = $(this).engineeringView("option", "session")
        $(this).engineeringView("updateMenus", session, this)
        session.updateMenus(session, this)
    },
    // Called when created, and later when changing options
    _refresh: function() {
    },

    _destroy: function() {
    },

    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
    },

    // _setOption is called for each individual option that is changing
    _setOption: function( key, value ) {
        this._super( key, value );
    }
});



function EngineeringMenuHandler() {
}

EngineeringMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'HelpWithCurrentOperation':
        $("<div>").helpDialog({helpkey: 'ENGINEERING_HELP', appendTo: $(target).closest('.watchmakerView')})
    }
    return true;
}

/*
 * Engineering box
 */

$.widget('dawk.engineeringBox', {
    options: {
        species: null,
        canvas: null,
        width: 200,
        height: 200,
    },
    _create: function() {
        this.element.addClass('engineeringBox');
        this.element.addClass('boxDiv');
        var canvas = $("<canvas></canvas>");
        this.options.canvas = canvas;
        canvas.attr('width', this.options.width);
        canvas.attr('height', this.options.height);
        canvas.addClass('box');
        canvas.addClass('midBox');

        this.element.append(canvas);

        this._on( canvas, {
            click: "_doCanvasClicked",
            mouseover: "_doMouseOver"
        });
    },
    _doMouseOver: function(event) {
        var parentView = this.element.parents('.watchmakerView').get(0);
        var geneboxes = $(parentView)
        .find('.geneboxes').get(0);
        _speciesFactorySingleton.updateFromCanvas(this.options.species, geneboxes,
                this.options.canvas.get(0))
    },
    _doCanvasClicked: function(event) {
        // raise hypo dialog here.
        var hypo = $("<div><span><img  src='img/Hypodermic_PICT_03937_32x32.png'></span>\
                <span style='float:none; display: inline' >\
                The hypodermic is just for show!<br>Move the mouse up into the 'chromosome'\
        <br>to get a usable cursor. If in doubt hover<br>over a gene for instructions.</span></div>")
        $(hypo).dialog({
            dialogClass: "dialogNoTitle",
            resizeable: false,
            modal: true,
            position: { my: "left top", at: "left+312 top+104", of: this.element },
            width: 450,
            buttons: [
                {
                    text: "Okay",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
                ],
        }
        )
        return false;
    },
});
/*
 * Fossils view
 */
$.widget( "dawk.fossilsView", $.dawk.watchmakerView, {
    _create: function(options) {
        this._super("_create")
        $(this.element).addClass('fossilsView')
        let container = $('<div class="container">')
        $(this.element).append(container)
        
        
        let fossilDiv = $('<div class="fossilDiv">')
        container.append(fossilDiv)
        let canvas = $('<canvas width="985" height="600" class="box midBox">')
        fossilDiv.append(canvas)
        let fossilrecord = this.options.session.fossilrecord
        let fossilrecordmax = fossilrecord.length - 1
        let slider = $("<div>").slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: fossilrecordmax,
            value: fossilrecordmax,
            slide: function( event, ui ) {
                let view = $(event.target).closest('.watchmakerView')
                $(view).fossilsView('showfossil', ui.value)
            },
            classes: {
                "ui-slider": "fossil-slider",
              }
        });
        
        container.append(slider)
        this.options.menuHandler.nextMenuHandler = new FossilMenuHandler()

        this.showfossil(fossilrecordmax)
            
    },
    showfossil: function(index) {
        let canvas = $(this.element).find('canvas')[0]
        let biomorph = this.options.session.fossilrecord[index]
        biomorph.drawer = canvas
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        $(this.element).find('.fossil-slider').slider('option', 'max', this.options.session.fossilrecord.length - 1)
    },
    viewGainedFocus: function(event) {
        let session = $(this).fossilsView("option", "session")
        $(this).fossilsView("updateMenus", session, this)
        $(this).find('.fossil-slider').slider('option', 'max', session.fossilrecord.length - 1)
        session.updateMenus(session, this)
    },

})

function FossilMenuHandler() {
}

FossilMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'HelpWithCurrentOperation':
        $("<div>").helpDialog({helpkey: 'PLAYING_BACK_FOSSILS_HELP', appendTo: $(target).closest('.watchmakerView')})
    }
    
    return true;
}
var WatchmakerHelp = {
        BREEDING_HELP: ['Breeding Help', 
            "The parent is in the middle, surrounded by its (mutant) offspring. Breed (asexually) from one by clicking on it.  It glides to the centre and become the parent of the next generation. As the generations go by you'll see evolutionary change.",
            "If you breed a biomorph that you like, you could Save it (File Menu) or put it in an album (Add to Album under Album Menu). The present parent (or a Highlighted biomorph  -  see Album Menu) will be the one selected for this.",
            "Initialize Fossil Record (Operation Menu) and until further notice each (parent) biomorph will be saved in a 'Fossil History'.  Play back the fossil history at any time, again from Operation Menu."],

        MOVING_HELP: [ 'Moving Help', "Without changing a pedigree in any biologically significant way, you can rearrange it more pleasingly on the screen.",
            "Move the hand so that the index finger is in a biomorph's rectangle, press the button, drag the biomorph to your preferred new location and release it there.  The umbilical cord comes too, but all other biomorphs stay still.",
            "Notice that, to save space, you can stack biomorphs up on top of each other.  They then behave like miniature 'Windows', coming to the front when clicked with the finger."],

        COPY_HELP: ['Copy Help', "You can Copy (Edit Menu) a biomorph & Paste it into e.g. MacDraw, presumably via the Scrapbook.  You can also Paste such biomorphs into an Album, but only into a previously Cleared slot."],

        ENGINEERING_HELP: ['Engineering Help', "Rather than Breed from randomly thrown-up mutations, you can intervene directly and induce mutations in any direction.  Move the 'hypodermic' up into the 'chromosome' at the top of the screen.",
            "When it enters a 'gene', the cursor becomes an arrowhead.  The direction of the arrow depends on whether the cursor lies in the 'decreasing' (left) or the 'increasing' (right) zone of the gene.  Click around to see how the value of the gene changes.",
            "Some genes have zones in the vertical plane too.  In many cases this is concerned with segmental gradients (see Manual).\nWhile Engineering, you can change (View Menu) the thickness of the drawing 'pen'."],

        DRIFT_HELP: ['Drift Help', "Drift, here, means 'genetic drift'.  Evolution goes on, step by step, as in Breed, but in Drift there is no selection, no intervention by you.",
            "The only way to stop Drifting is to move the mouse up into the Menu bar.  Then you can choose another option.  If you leave Drift running for a very long time, the biomorphs often become unmanageably large.",
            "There are two ways of viewing Drift: 'Sweep' and 'Cinematic'.  Toggle between them by choosing Sweep in the View Menu."],

        KILLING_HELP: ['Killing Help', "If a Pedigree is becoming large and unwieldy, it is convient to prune it.  Use the gun to shoot not only an individual biomorph on a pedigree but all its descendants (if any).",
            "Just as you can act as a selecting agent in Drawing Out Offspring (birth bias), obviously you can also act as a selecting agent in Killing.",
            "",
            "WARNING: There is no Undo!"],

        PLAYING_BACK_FOSSILS_HELP: ['Playing Back Fossils Help', "'Use the scroll-bar slider to 'sink' down through the fossil strata from the most recent to the earliest of the biomorphs that you have bred.",
            "When the fossil window is displayed, only a few menus are available.  You can either Breed from the currently displayed fossil, or simply remove the Fossil Window and return to the previous activity.",
            "You can also Load as Fossils any collection of biomorphs previously Saved.  A Fossil Window appears, with the most 'recent' biomorph showing (Note: this is not quite as described in the Manual.  The program was improved after the Manual went to press.)"],

        ALBUM_HELP: ['Album Help', "An Album is a collection of biomorphs viewed together on the screen.  An individual member of an album can be selected by clicking, and it then becomes the active biomorphs for subsequenty operations, like Breed.",
            "There can be only one Album active at once, but it can have up to 4 Pages.  View in miniature (Show Album), then Zoom into one page by clicking anywhere in it.\nAdd to Album appends the current biomorph to the current Album.",
            "Albums can be Loaded and Saved in the same way as single biomorphs.  They can also be double-clicked to launch Blind Watchmaker itself.\nSelected Album slots can be Cleared, Copied (to ClipBoard), and Pasted (into a Cleared slot)."],

        PEDIGREE_HELP: ['Pedigree Help', "This is a different way of breeding.  Press the mouse button in the rectangle of any biomorph and 'Draw Out' an umbilical cord.  When you let go, an infant (which may be mutant) will be born at that point.",
            "In this way you build up a complete pedigree, with its own history remaining available to you on the screen.  Not just available to see, but available to breed from.\nTo speed up breeding, use the 'Mirrors' to draw out 2 or 4 offspring simultaneously.",
            "By being selective about which ones you breed from you can influence evolution by 'birth bias'.  You can rearrange an existing pedigree in various ways  -  Kill, Move, Detach.  These options each have their own Help messages."],

        DETACHING_HELP: ['Detaching Help', "Use the scissors (on the biomorph itself, not its umbilical cord!) to Detach a biomorph and all its descendants from the rest of a pedigree  -  as a hived-off sub-clade."],

        TRIANGLE_HELP: ['Triangle Help', "This is a way of representing genetic change as change in 2-dimensional space.  It is explained in the book, The Blind Watchmaker.  Essentially you use the mouse to sample genetic space.",
            "The three biomorphs at the tips of the triangles are 'anchors' defining the particular plane in genetic space.  There are three default anchors.  They can be changed using the appropriate options under the View Menu.",
            "Click the mouse to draw on the screen the biomorph at the current location in genetic space.  As the cursor moves around you can see it changing to (a usually miniature version of) the biomorph at the current location in genetic space."],

        HIGHLIGHTING_HELP: ['Highlighting Help', "When you click on a biomorph it will go black, but no other action is taken.  This is to enable you to use that biomorph in some subsequent action.",
            "For instance, you might Save it, Add to Album, or Copy (to ClipBoard and hence to other applications such as MacDraw).",
            "You can do all these things without first highlighting a biomorph.  But then you will be using the automatically (default) selected biomorph, for instance the one in the centre of the breeding screen."],

        MISCELLANEOUS_HELP: ['Miscellaneous Help', "When Breeding, you can change the numbers of rows or columns (View Menu).",
            "Mutations Menu enables you to toggle on or off various categories of mutation.  When a given category is off (no check mark), evolution is constrained not to vary from the present animal in that respect.",
            "The program described in the book, The Blind Watchmaker, is a subset of the present program.  You can recreate that subset (and the IBM and Nimbus versions of the program) by toggling OFF the first four mutation categories."],

        HOPEFUL_MONSTER_HELP: ['Hopeful Monster Help', "Delivers a biomorph with a randomly chosen genome.  Every time you click, until you exit by choosing another menu option, you get a new random biomorph.",
            "When you exit to another option, the current random biomorph will be the one selected for, e.g. Breeding."],
}


$.widget('dawk.helpDialog', $.ui.dialog, {
    options: {
        "ui-dialog": "help-dialog",
        width: 660,
        height: 480
    },
    _create: function() {
        let helpkey = this.options.helpkey
        let helptextarray = WatchmakerHelp[helpkey]
        this.options.title = helptextarray[0]
        for(let i = 1; i < helptextarray.length; i++) {
            let p = $("<p class='helptext'>")
            p.text(helptextarray[i])
            p.appendTo(this.element)
        }
        return this._super()
    }
})/*
 * Pedigree
 */


function Full(genome, thisFull) {
    this.genome = genome
    genome.full = this
    this.surround = genome.getRect()
    Triangle.atLeast(this.surround);

    this.centre = new Point()

    if(thisFull != null) {
        this.parent = thisFull;
        this.elderSib = thisFull.lastBorn;
        if(this.elderSib != null) {
            this.elderSib.youngerSib = this;
        }
        this.lastBorn = null;
        this.youngerSib = null;
        if(thisFull.lastBorn == null) {
            thisFull.firstBorn = this;
        }
        thisFull.lastBorn = this;

    } else {
        this.parent = null
        this.firstBorn = null
        this.lastBorn = null
        this.elderSib = null
        this.youngerSib = null
    }
}


function God() {
    this.adam = null
    this.previousGod = null
    this.nextGod = null
}


function Pedigree(options) {
    this.options = options
    this.godCounter = 0
    this.rootGod = null
    this.thereAreLines = false
    this.theGod = null
}



Full.prototype.showAsText = function() {
    console.log(this)
}

God.prototype.showAsText = function() {
    console.log(this)
}
var Mirrors = {
        NoMirrors: 1,
        SingleMirror: 2,
        DoubleMirror: 4,
        properties: {
            1: {name: "NoMirrors"},
            2: {name: "SingleMirror"},
            4: {name: "DoubleMirror"}
        },
}

$.widget( "dawk.pedigreeView", $.dawk.watchmakerView, {
    options: { 
        theMode: Mode.Phyloging,
        rays: Mirrors.NoMirrors,
        species: null,
        biomorph: null,
        rootGod: null,
        phyloging: null,
        theGod: null,
        godCounter: 0,
        type: 'Pedigree'
    },
    viewGainedFocus: function(event) {
        let session = $(this).pedigreeView("option", "session")
        $(this).pedigreeView("updateMenus", session, this)
        session.updateMenus(session, this)
    },
    _create: function (options) {
        this._super()

        $(this.element).addClass('pedigreeView')
        var geneboxes_options = {
            engineering: false,
            session: this.options.session
        }
        var geneboxes = $("<div>");
        _speciesFactorySingleton.geneboxes(this.options.session.species, 
                geneboxes, geneboxes_options)
        this.element.append(geneboxes)
        this.options.rootGod = new God()
        this.options.menuHandler.nextMenuHandler = new PedigreeMenuHandler()
        let container = $("<div class='container'>")
        container.appendTo(this.element)
        let div = $("<div class='pedigreeFamilialLineCanvas'>")
        div.appendTo(container)
        let familialLineCanvas = $("<canvas width='1000' height='600'>")
        familialLineCanvas.appendTo(div)

        this.options.familialLineContext = familialLineCanvas[0].getContext('2d')
        div = $("<div class='pedigreeDrawOutLineDiv'>")

        div.appendTo(container)
        let canvas = $("<canvas class='drawOutCanvas' width='1000' height='600'>")
        this.options.drawOutCanvas = canvas[0]
        canvas.appendTo(div)

        let pedigreeDiv = $('<div class="pedigreeDiv pedigreeDrawOutOffspring">')
        pedigreeDiv.addClass('boxes')
        pedigreeDiv.appendTo(container)
        this._on(pedigreeDiv, {
            mouseup: function(event) { this.drawoutmouseup(event) },
            mousemove: function(event) { this.drawoutmousemove(event) },
        })

        this.phylognew(this.options.biomorph)

    },
    buildMenus: function(menu) {
        this._super('buildMenus')
        this.updatePedigreeModeCheckboxes('DrawOutOffspring')
        this.updateMirrorCheckboxes('NoMirrors')
    },
    markIf: function(thisFull) {
        // Remove midBox class from every canvas
        $(this.element).find('canvas').removeClass('midBox')

        if(thisFull != null) {
            // Mark this one as special
            $(thisFull.genome.drawer).addClass('midBox')
            // Move it to the centre
            $(this.element).find('.pedigreeDiv').append(thisFull.genome.drawer)
        }
    },
    phylognew: function(biomorph) {
        let options = this.options
        let tempGod = new God()
        tempGod.nextGod = null;
        this.findLastGod();
        let theGod = options.theGod
        tempGod.previousGod = theGod;
        theGod.nextGod = tempGod;
        theGod = tempGod;
        theGod.adam = new Full(biomorph);
        biomorph.full = theGod.adam
        theGod.adam.surround = biomorph.getRect();
        Triangle.atLeast(theGod.adam.surround);

        let screenRect = $(this.element).find('.pedigreeDiv')[0].getBoundingClientRect()
        let x = Math.trunc(screenRect.width / 2);
        let y = Math.trunc(screenRect.height / 2);

        this.addone(theGod.adam, new Point(x,y))
    },
    morphmouseover: function(event) {
        event.stopPropagation()
        let biomorph = $(event.target).data('genotype')
        if(biomorph != null) {
            var geneboxes = $(event.target).closest('.watchmakerView').find('.geneboxes').get(0);
            _speciesFactorySingleton.updateFromCanvas(
                    this.options.session.species,
                    geneboxes, event.target)
        } 
    },
    addone: function(full, point) {
        let biomorph = full.genome
        let surround = full.surround
        full.centre = point
        let biomorphWidth = surround.right - surround.left
        let biomorphHeight = surround.bottom - surround.top
        let left = point.h - biomorphWidth / 2
        let top = point.v - biomorphHeight / 2
        let canvas = $("<canvas class='pedigreeMorphCanvas'>")
        canvas.attr('height', Math.trunc(biomorphHeight))
        canvas.attr('width', Math.trunc(biomorphWidth))
        canvas.css('left', left)
        canvas.css('top', top)
        canvas.addClass('pedigreeBox midBox')
        $(this.element).find('.pedigreeDiv').append(canvas)
        biomorph.drawer = canvas[0]
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        this._on(canvas, {
            mouseover: function(event) { this.morphmouseover(event) },
            mousedown: function(event) { this.morphmousedown(event) },
            mouseup: function(event) { this.morphmouseup(event) },
            mousemove: function(event) { this.morphmousemove(event) },
        })
        this.allLines(this.options.rootGod)
        $(canvas).trigger('mouseover')
    },
    bumper:  function(current, here) {
        let surround = current.surround
        let height = surround.bottom - surround.top;
        let width = surround.right - surround.left;
        let pedigreeDiv = $(this.element).find('.pedigreeDiv')[0]
        let pRect = new Rect(0, 0, $(pedigreeDiv).width(), $(pedigreeDiv).height())
        let error = here.v - (height / 2)
        if(error < 0) {
            here.v -= error
        } 
        error = here.v + (height / 2) 
        if(error > pRect.bottom) {
            here.v -= error - pRect.bottom
        }
        error = here.h - (width / 2)
        if(error < 0) {
            here.h -= error
        } 
        error = here.h + (width / 2) 
        if(error > pRect.right) {
            here.h -= error - pRect.right
        }
    },

    spawnone: function(thisFull, here) {
        let biomorph = thisFull.genome

        let spawn = biomorph.reproduce(null)
        let current = new Full(spawn, thisFull)
        this.bumper(current, here)
        this.addone(current, here)
        this.markIf(current);
    },
    spawnmany: function(thisFull, point) {
        let target = this.options.phyloging
        let offset = $(target).offset()
        let pedigreeOffset = $(target).parent().offset()
        let x = offset.left - pedigreeOffset.left + target.width / 2;
        let y = offset.top - pedigreeOffset.top + target.height / 2;
        let radients = this.getradiants(new Point(x,y), point, this.options.rays)
        for(i = 0; i < this.options.rays; i++) {
            this.spawnone(thisFull, radients[i])
        }
        this.options.phyloging = null
    },
    getradiants: function(from, goal, spokes) {
        dx = goal.h - from.h;
        dy = goal.v - from.v;
        var here = []
        here.push(new Point(from.h + dx, from.v + dy))
        here.push(new Point(from.h - dx, from.v - dy))
        here.push(new Point(from.h - dy, from.v + dx))
        here.push(new Point(from.h + dy, from.v - dx))
        return here
    },
    radiate: function(from, goal, spokes, ctx) {
        let here = this.getradiants(from, goal, spokes)
        for(let j = 0; j < spokes; j++) {
            ctx.moveTo(from.h, from.v);
            ctx.lineTo(here[j].h, here[j].v)
        }
    }, 
    dragoutline: function(x,y) {
        let canvas = this.options.drawOutCanvas
        let parent = this.options.phyloging
        let parentX = Number($(parent).css('left').replace('px', '')) + parent.width / 2
        let parentY = Number($(parent).css('top').replace('px', '')) + parent.height / 2
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.strokeStyle = "Black";
        ctx.lineWidth = 1
        this.radiate(new Point(parentX, parentY), new Point(x, y), this.options.rays, ctx)
        ctx.closePath()
        ctx.stroke()
    },
    cleardragoutline: function() {
        let canvas = this.options.drawOutCanvas
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.closePath()
    },


    tryGod: function(thisGod) {
        this.options.godCounter++
        if(thisGod.nextGod == null) {
            this.options.theGod = thisGod
        } else {
            this.tryGod(thisGod.nextGod)
        }
    },
    findLastGod: function() { //{Delivers last God in theGod}
        let thisGod = this.options.rootGod
        this.options.godCounter = 1;
        if(thisGod.nextGod == null) {
            this.options.theGod = thisGod
        } else {
            this.tryGod(thisGod)
        } 
    },

//  {Isolates ThisFull from all except its descendants, leaving rest of}
//  {pedigree hierarchical linked list tidied up and pointing elsewhere.}
//  {Does not touch linear Specialfull linked list, since this reflects}
//  {spatial relations on screen, and nonrelatives can cover each other}
    detach: function(thisFull) {
        if(thisFull.parent != null) {
            if(thisFull.parent.lastBorn == thisFull) {
                thisFull.parent.lastBorn = thisFull.elderSib;
            }
            if(thisFull.parent.firstBorn == thisFull) {
                thisFull.parent.firstBorn = thisFull.youngerSib;
            }
        }
        if(thisFull.youngerSib != null) {
            thisFull.youngerSib.elderSib = thisFull.elderSib;
        }
        if(thisFull.elderSib != null) {
            thisFull.elderSib.youngerSib = thisFull.youngerSib;
        }
        thisFull.elderSib = null;
        thisFull.youngerSib = null;
        thisFull.parent = null;
        tempGod = new God()
        tempGod.nextGod = null;
        this.findLastGod()
        tempGod.previousGod = this.options.theGod;
        tempGod.adam = thisFull;
        this.options.theGod.nextGod = tempGod;
        this.options.theGod = tempGod;
        this.allLines(this.options.rootGod);

//      this.markIf(thisFull); //make midBox
    },
    drawLine: function(p1, p2) {
//      let ctx = this.options.familialLineCanvas.getContext('2d')
        let ctx = this.options.familialLineContext
        ctx.strokeStyle = 'Black';
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.moveTo(p1.h, p1.v);
        ctx.lineTo(p2.h, p2.v);
        ctx.closePath()
        ctx.stroke()
    },
    redrawAll: function(thisFull) {
        if(thisFull != null) {
            if(thisFull.parent != null) {
                this.drawLine(
                        thisFull.centre, thisFull.parent.centre)
            }
            if(thisFull.lastBorn != null) {
                this.redrawAll(thisFull.lastBorn);
            }
            if(thisFull.elderSib != null) {
                this.redrawAll(thisFull.elderSib);
            } 
        }
    },
    redrawLines: function(thisFull) {
        if(thisFull != null) {
            if(thisFull.parent != null) {
                drawLine(thisFull.centre, thisFull.parent.centre)
            }
            if(thisFull.lastBorn != null) {
                this.redrawAll(thisFull.lastBorn);
            }
        } 
    },
    eraseLines: function() {
        let ctx = this.options.familialLineContext
        ctx.beginPath()
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.closePath()
    },
    doAllLines: function(theGod) {
        if(theGod != null) {
            if(theGod.adam != null) {
                this.redrawLines(theGod.adam);
            }
            if(theGod.nextGod != null) {
                this.doAllLines(theGod.nextGod)
            }
        }
    },
    allLines: function(theGod) {
        this.eraseLines()
        this.doAllLines(theGod)
    },

    checkAdam: function(thisGod, thisFull) {
        if(thisGod != null) {
            if(thisGod.adam == thisFull) {
                this.options.theGod = thisGod
                return true
            }
            if(thisGod.nextGod != null) {
                return this.checkAdam(thisGod.nextGod, thisFull);
            }
        }
        return false
    },


    //{Returns true if thisFull is an adam}
    isAnAdam: function(thisFull) {
        let tryGod = this.options.rootGod
        if(thisFull != null) {
            return this.checkAdam(tryGod, thisFull)
        } else {
            return false
        } 
    },    
    weedOut: function(thisFull) {
        if(thisFull != null) {
            if(thisFull.parent != null) {
                let onlyChild = (thisFull.youngerSib == null && 
                        thisFull.elderSib == null);
                if(onlyChild) {
                    thisFull.parent.lastBorn = null;
                    thisFull.parent.firstBorn = null
                } else {
                    //{not only child}
                    if(thisFull.youngerSib == null) {
                        thisFull.parent.lastBorn = thisFull.elderSib
                    } else {
                        thisFull.youngerSib.elderSib = thisFull.elderSib;
                    }
                    if(thisFull.elderSib == null) {
                        thisFull.parent.firstBorn = thisFull.youngerSib
                    } else {
                        thisFull.elderSib.youngerSib = thisFull.youngerSib;
                    }

                }
            }
        }
    },
    wipeOut: function(thisFull) {
        $(thisFull.genome.drawer).remove()
    }, 

    //{kill thisFull && all its elder sibs, including all their descendants}
    killAll: function(thisFull) {
        var nextVictim
        var secondVictim
        if(thisFull != null) {
            nextVictim = thisFull.lastBorn;
            secondVictim = thisFull.elderSib;
            this.wipeOut(thisFull);
            if(thisFull == null) {
                alert('BEEP1')
            } else {
                thisFull = null
            }
        }
        if(nextVictim != null) {
            this.killAll(nextVictim);
        }
        if(secondVictim != null) {
            this.killAll(secondVictim);
        }
    }, 

    //{kill this one && all its descendants}
    kill: function(thisFull) {
        var nextVictim
        var secondVictim
        if(thisFull != null) {
            nextVictim = thisFull.lastBorn;
            this.wipeOut(thisFull);
            if(thisFull == null) {
                alert('BEEP2')
            } else {
                thisFull = null
            }
            if(nextVictim != null) {
                this.killAll(nextVictim);
            }
        }
    },
    shoot: function(thisFull) {
        this.findLastGod();
        let yesAdam = this.isAnAdam(thisFull); //{leaves theGod as thisFull's god if any}
        if(! yesAdam) {
            this.weedOut(thisFull);
            this.kill(thisFull)
        } else {
//          {only comes here if trying to kill an adam}
            if(thisFull.parent != null) {
                alert('Trying to shoot an Adam, but it has a parent. And probably a navel, too.');
            }
            if(thisFull.lastBorn != null) {
                this.killAll(thisFull.lastBorn);
                thisFull.firstBorn = null;
                thisFull.lastBorn = null;
            }
            if(thisFull != null) {
                this.wipeOut(thisFull);
                thisFull = null
            }
            if(this.godCounter == 3) {
                this.options.theMode = Mode.Preliminary;
                this.markIf(null)
            }
            let theGod = this.options.theGod
            if(theGod == null) {
                alert('Trying to shoot an Adam, and theGod is null')
            } else {
                if(theGod.previousGod == null) {
                    alert("Trying to shoot an Adam, and Adam's god has no previous god.")
                } else {
                    theGod.previousGod.nextGod = theGod.nextGod;
                }
                if(theGod.nextGod != null) {
                    theGod.nextGod.previousGod = theGod.previousGod;
                }
                this.options.theGod = null
            }

        }
        this.allLines(this.options.rootGod);
    },
    morphmousedown: function(event) {
        let full = $(event.target).data('genotype').full
        this.markIf(full)
        switch(this.options.theMode) {
        case Mode.Phyloging:
            let target = event.target
            // User pressed on a morph. Record it as a potential parent.
            this.options.phyloging = target
            break
        case Mode.Detaching:
            this.detach(full)
            break
        case Mode.Killing:
            this.shoot(full)
            break
        }
    },
    morphmousemove: function(event) {
        if(this.options.theMode == Mode.Phyloging) {
            event.stopPropagation()
            if(this.options.phyloging != null) {
                let target = event.target
                let offset = $(target).offset()
                let pedigreeOffset = $(target).parent().offset()
                let x = offset.left - pedigreeOffset.left;
                let y = offset.top - pedigreeOffset.top;

                let inneroffset = $(event.target).offset()
                let innerx = event.pageX - offset.left;
                let innery = event.pageY - offset.top;
                this.dragoutline(x + innerx, y + innery)
            }
        }
    },
    morphmouseup: function(event) {
        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
            event.stopPropagation()
            if(event.target != this.options.phyloging) {
                this.cleardragoutline()
                let target = event.target
                let offset = $(target).offset()
                let pedigreeOffset = $(target).parent().offset()
                let x = offset.left - pedigreeOffset.left;
                let y = offset.top - pedigreeOffset.top;
                let inneroffset = $(event.target).offset()
                let innerx = event.pageX - offset.left;
                let innery = event.pageY - offset.top;

                thisFull = $(target).data('genotype').full
                this.spawnmany(thisFull, new Point(x + innerx, y + innery))
            } else {
                // Let go inside original morph. Don't reproduce
                this.options.phyloging = null
            }

            break
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
            break
        }
    },

    drawoutmouseup: function(event) {
        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
            this.cleardragoutline()
            if(this.options.phyloging != null) {
                let offset = $(event.target).offset()
                let x = event.pageX - offset.left;
                let y = event.pageY - offset.top;
                thisFull = $(this.options.phyloging).data('genotype').full
                this.spawnmany(thisFull, new Point(x, y))
            }            
            break
        }
    },
    drawoutmousemove: function(event) {

        switch(this.options.theMode) {
        case Mode.Phyloging:
            if(this.options.phyloging != null) {
                let offset = $(event.target).offset()
                let x = event.pageX - offset.left;
                let y = event.pageY - offset.top;
                this.dragoutline(x, y)
            }
            break        }
    },    
    updatePedigreeModeCheckboxes: function(name) {
        let drawOutOffspring = $(this.element).find('.menuitemDrawOutOffspring img')
        let move = $(this.element).find('.menuitemMove img')
        let detach = $(this.element).find('.menuitemDetach img')
        let kill = $(this.element).find('.menuitemKill img')
        let pedigreeDiv = $(this.element).find('.pedigreeDiv')
        switch(name) {
        case 'DrawOutOffspring':
            if(this.options.theMode == Mode.Moving) {
                $(this.element).find('.pedigreeDiv canvas').draggable('destroy')
            }
            this.options.theMode = Mode.Phyloging
            $(pedigreeDiv).removeClass('pedigreeKill pedigreeDetach pedigreeMove')
            $(pedigreeDiv).addClass('pedigreeDrawOutOffspring')

            drawOutOffspring.css('display', 'inline-block')
            move.css('display', 'none')
            detach.css('display', 'none')
            kill.css('display', 'none')
            break
        case 'Move':
            this.options.theMode = Mode.Moving
            $(pedigreeDiv).removeClass('pedigreeKill pedigreeDetach pedigreeDrawOutOffspring')
            $(pedigreeDiv).addClass('pedigreeMove')
            drawOutOffspring.css('display', 'none')
            move.css('display', 'inline-block')
            detach.css('display', 'none')
            kill.css('display', 'none')
            let canvases = $(this.element).find('.pedigreeDiv canvas')
            canvases.draggable({containment: $(pedigreeDiv)[0]})
            this._on(canvases, {drag: function(event) {
                let full = $(event.target).data('genotype').full
                let canvas = full.genome.drawer
                let offset = $(canvas).offset()
                let pedigreeDivOffset = $(event.target).closest('.pedigreeDiv').offset()
                full.centre.h = offset.left - pedigreeDivOffset.left + canvas.width/2
                full.centre.v = offset.top - pedigreeDivOffset.top + canvas.height/2

                this.allLines(this.options.rootGod)
            }})
            break
        case 'Detach':
            if(this.options.theMode == Mode.Moving) {
                $(this.element).find('.pedigreeDiv canvas').draggable('destroy')
            }
            this.options.theMode = Mode.Detaching
            $(pedigreeDiv).removeClass('pedigreeKill pedigreeMove pedigreeDrawOutOffspring')
            $(pedigreeDiv).addClass('pedigreeDetach')
            drawOutOffspring.css('display', 'none')
            move.css('display', 'none')
            detach.css('display', 'inline-block')
            kill.css('display', 'none')
            break
        case 'Kill':
            if(this.options.theMode == Mode.Moving) {
                $(this.element).find('.pedigreeDiv canvas').draggable('destroy')
            }
            this.options.theMode = Mode.Killing
            $(pedigreeDiv).removeClass('pedigreeDetach pedigreeMove pedigreeDrawOutOffspring')
            $(pedigreeDiv).addClass('pedigreeKill')
            drawOutOffspring.css('display', 'none')
            move.css('display', 'none')
            detach.css('display', 'none')
            kill.css('display', 'inline-block')
            break
        }
    },
    updateMirrorCheckboxes: function(name) {
        let noMirrors = $(this.element).find('.menuitemNoMirrors img')
        let singleMirror = $(this.element).find('.menuitemSingleMirror img')
        let doubleMirror = $(this.element).find('.menuitemDoubleMirror img')        
        switch(name) {
        case 'NoMirrors':
            this.options.rays = Mirrors.NoMirrors
            noMirrors.css('display', 'inline-block')
            singleMirror.css('display', 'none')
            doubleMirror.css('display', 'none')
            break
        case 'SingleMirror':
            this.options.rays = Mirrors.SingleMirror
            noMirrors.css('display', 'none')
            singleMirror.css('display', 'inline-block')
            doubleMirror.css('display', 'none')
            break
        case 'DoubleMirror':
            this.options.rays = Mirrors.DoubleMirror
            noMirrors.css('display', 'none')
            singleMirror.css('display', 'none')
            doubleMirror.css('display', 'inline-block')
            break
        }
    }
})


function PedigreeMenuHandler() {
}

PedigreeMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'DrawOutOffspring':
    case 'Move':
    case 'Detach':
    case 'Kill':
        $(target).closest('.pedigreeView').pedigreeView('updatePedigreeModeCheckboxes', menuid)
        return false
    case 'NoMirrors':
    case 'SingleMirror':
    case 'DoubleMirror':
        $(target).closest('.pedigreeView').pedigreeView('updateMirrorCheckboxes', menuid)
        return false
    case 'HelpWithCurrentOperation':
        switch($(target).closest('.pedigreeView').pedigreeView('option', 'theMode')) {
        case Mode.Phyloging:
            $("<div>").helpDialog({helpkey: 'PEDIGREE_HELP', appendTo: $(target).closest('.watchmakerView')})
            return false;
        case Mode.Moving:
            $("<div>").helpDialog({helpkey: 'MOVING_HELP', appendTo: $(target).closest('.watchmakerView')})
            return false;
        case Mode.Detaching:
            $("<div>").helpDialog({helpkey: 'DETACHING_HELP', appendTo: $(target).closest('.watchmakerView')})
            return false;
        case Mode.Killing:
            $("<div>").helpDialog({helpkey: 'KILLING_HELP', appendTo: $(target).closest('.watchmakerView')})
            return false;
        }
        return false
    }
    return true;
}
$.widget('dawk.sweepView', $.dawk.watchmakerView, {
    _create: function() {
        this._super("_create")
        $(this.element).addClass('driftView')
        var species = this.options.session.species
        
        var geneboxes_options = {
            engineering : false,
            session: this.options.session
        }
        var geneboxes = $("<div>")
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes)
        
        
        let container = $("<div class='container'>")
        this.element.append(container)

        var sweepDiv = $("<div>").sweepBoxes({ 
            species: species,
            height: 200,
            width: 200})
       
        container.append(sweepDiv)
        var canvas = $(sweepDiv).find('canvas').get(0)
        var biomorph = _speciesFactorySingleton.getSpecies(species, this.options.session, canvas)
        if(this.options.biomorph) {
            this.options.biomorph.copyBiomorph(biomorph)
        } else {
            biomorph.doPerson("BasicTree")
        }
           
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        $(sweepDiv).sweepBoxes('update')
        $(sweepDiv).sweepBoxes('startDrift')
        
    },
    viewGainedFocus: function(event, ui) {
        let session = $(this).sweepView('option', 'session')
        $(this).sweepView("updateMenus", session, this)
        session.updateMenus(session, this)
        driftDiv = $(this).find('.driftBox') 
        $(driftDiv).driftBox("startDrift")
    },
    viewLostFocus: function(event, ui) {

        driftDiv = $(this).find('.driftBox') 
        $(driftDiv).driftBox("stopDrift")
        
    },

    // Called when created, and later when changing options
    _refresh: function() {
    },

    _destroy: function() {
    },


});/*
 * sweep box
 */

$.widget('dawk.sweepBoxes', {
    options: {
        index: 0,
        species: null,
        canvas: null,
        width: 200,
        height: 200,
        dodrift: false
    },
    _create: function() {
        this.element.addClass("boxes")

        for(let i = 0; i < 15; i++) {
            var canvas = $("<canvas class='boxDiv'>");
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
            canvas.addClass('midBox');
            this.element.append(canvas);
        }

    },
    doDrift: function() {
        if(this.options.dodrift) {
            let index = this.options.index
            let canvases = $(this.element).find('canvas')
            let parentCanvas = canvases[index]
            $(parentCanvas).removeClass('midBox')
            index = (index + 1) % 15

            let daughterCanvas = canvases[index]
            $(daughterCanvas).addClass('midBox')
            let biomorph = $(parentCanvas).data('genotype').reproduce(daughterCanvas)
            $(daughterCanvas).data('genotype', biomorph)
            biomorph.develop()

            this.update()
            this.options.index = index
            this._delay(this.doDrift, 0);
        } 
    },
    stopDrift: function() {
        this.options.dodrift = false
    },
    startDrift: function() {
        if(! this.options.dodrift) {
            this.options.dodrift = true
            this.doDrift()
        }
    },
    update: function() {
        var parentView = this.element.closest('.watchmakerView')[0];
        var geneboxes = $(parentView)
        .find('.geneboxes').get(0);
        let canvas = $(this.element).find('canvas')[this.options.index]
        _speciesFactorySingleton.updateFromCanvas(this.options.species, geneboxes,
                canvas)
    },
});

function Triangle() {}

Triangle.divisibleByEight = function(n) {
    return n % 8 == 0
}

Triangle.atLeast = function(outRect) {
    outRect.insetRect(-3, -3);
    while(! Triangle.divisibleByEight(outRect.left)) {
        outRect.left--
    }
    while(! Triangle.divisibleByEight(outRect.right)) {
        outRect.right++
    }
}

Triangle.triangle = function(screenwidth, screenheight, b, m) {
    // k is the equator of the triangle
    var k = Math.round(200.5 * screenheight / 340); // was 200. 
    // horizontal difference between the mouse and the left of triangle (b)
    // positive if to the right of b, 
    var x = m.h - b.h;
    // (screenheight - m.v) is how high up from the bottom we are
    // (screenheight - b.v) is how high up from the bottom point b is.
    // Difference is how much lower mouse is than b.
    var y = (screenheight - m.v) - (screenheight - b.v);

    var r1 = y / k;
    var r3 = (x - y / 2) / k;
    var r2 = (k - x - y / 2) / k;
    
    return [r1, r2, r3];
}
$.widget( "dawk.triangleView", $.dawk.watchmakerView, {
    options: { 
        theMode: Mode.Triangling,
        species: null,
        biomorph: null,
        topOfTriangle: null,
        leftOfTriangle: null,
        rightOfTriangle: null,
        liveOne: null,
        inhibitspawn: false
    },
    viewGainedFocus: function(event) {
        let session = $(this).triangleView("option", "session")
        $(this).triangleView("updateMenus", session, this)
        session.updateMenus(session, this)
    },
    _create: function (options) {
        this._super()

        $(this.element).addClass('triangleView')
        var geneboxes_options = {
            engineering: false,
            session: this.options.session
        }
        var geneboxes = $("<div>");
        _speciesFactorySingleton.geneboxes(this.options.session.species, geneboxes, geneboxes_options)
        this.element.append(geneboxes);

        this.options.menuHandler.nextMenuHandler = new TriangleMenuHandler()
        let container = $("<div class='container'>")
        container.appendTo(this.element)

        // Draw triangle here
        let triangleDiv = $('<div class="triangleLineDiv"><canvas class="triangleLineCanvas" width="1000" height="600"></canvas></div>')
        triangleDiv.appendTo(container)
        triangleDiv = $('<div class="triangleDiv"><canvas class="triangleLineCanvas" width="1000" height="600"></canvas></div>')
        triangleDiv.appendTo(container)
        this._on(triangleDiv, {
            mousedown: function(event) { this.mousedown(event) },
            mouseup: function(event) { this.mouseup(event) },
            mousemove: function(event) { this.mousemove(event) },
        })
        this.drawTriangle()
        let sessionoptions = this.options.session.options
        this.options.topOfTriangle = sessionoptions.topOfTriangle
        this.addone(this.options.topOfTriangle, this.options.a)
        this.options.leftOfTriangle = sessionoptions.leftOfTriangle
        this.addone(this.options.leftOfTriangle, this.options.b)
        this.options.rightOfTriangle = sessionoptions.rightOfTriangle
        this.addone(this.options.rightOfTriangle, this.options.c)
        this.options.liveone = null
    },
    buildMenus: function(menu) {
        this._super('buildMenus')
    },
    bumper:  function(current, here) {
        let surround = current.surround
        let height = surround.bottom - surround.top;
        let width = surround.right - surround.left;
        let triangleDiv = $(this.element).find('.triangleDiv')[0]
        let pRect = new Rect(0, 0, $(triangleDiv).width(), $(triangleDiv).height())
        let error = here.v - (height / 2)
        if(error < 0) {
            here.v -= error
        } 
        error = here.v + (height / 2) 
        if(error > pRect.bottom) {
            here.v -= error - pRect.bottom
        }
        error = here.h - (width / 2)
        if(error < 0) {
            here.h -= error
        } 
        error = here.h + (width / 2) 
        if(error > pRect.right) {
            here.h -= error - pRect.right
        }
    },
    mousedown: function(event) {
        $(event.target).closest('.watchmakerView').find('canvas').removeClass('midBox')
        $(this.options.liveone).addClass('midBox')
        this.options.liveone = null
        this.options.inhibitspawn = false
    },
    mouseup: function(event) {
    },
    mousemove: function(event) {
        let canvas = this.options.liveone
        if(canvas != null) {
            let triangleDiv = $(this.element).find('.triangleDiv')
            let biomorph = $(canvas).data('genotype')
            let biomorphWidth = $(canvas).width()
            let biomorphHeight = $(canvas).height()
            let x = event.pageX - triangleDiv.offset().left 
            let y = event.pageY - triangleDiv.offset().top 
            if (x < triangleDiv.width() && y < triangleDiv.height() && x > 0 && y > 0) {
                let r = Triangle.triangle(
                        triangleDiv.width(),
                        triangleDiv.height(), 
                        this.options.b, new Point(x,y));
                let options = this.options.session.options
                biomorph.concoct(r, 
                        options.topOfTriangle, 
                        options.leftOfTriangle, 
                        options.rightOfTriangle);
                biomorph.develop()
                let surround = biomorph.getRect()
                $(canvas).attr('width', surround.right - surround.left)
                $(canvas).attr('height', surround.bottom - surround.top)
                biomorph.develop()
                let left = x - biomorphWidth / 2
                let top = y - biomorphHeight / 2
                $(canvas).css('left', left)
                $(canvas).css('top', top)
            }
        } else {
            if(! this.options.inhibitspawn) {
                this.options.inhibitspawn = true
                let triangleDiv = $(this.element).find('.triangleDiv')
                let triangleDivOffset = triangleDiv.offset()
                let x = event.pageX - triangleDivOffset.left
                let y = event.pageY - triangleDivOffset.top
                if(x < triangleDiv.width() && y < triangleDiv.height()
                        && x > 0 && y > 0) {
                    let m = new Point(x,y)
                    let triangleContext = triangleDiv.find('canvas')[0].getContext('2d')
                    let session = this.options.session
                    let biomorph = _speciesFactorySingleton.getSpecies(session.species, session, 
                            document.createElement('canvas'));
    
                    let options = this.options
                    let r = Triangle.triangle(
                            triangleDiv.width(),
                            triangleDiv.height(), 
                            this.options.b, m);
                    biomorph.concoct(r, options.topOfTriangle, options.leftOfTriangle, options.rightOfTriangle)
                    this.addone(biomorph, m)
                }
            }
        }
        var geneboxes = this.element.closest('.watchmakerView').find('.geneboxes').get(0);
        _speciesFactorySingleton.updateFromCanvas(
                this.options.session.species,
                geneboxes, this.options.liveone)

    },
    addone: function(biomorph, point) {
        let surround = biomorph.getRect()
        let biomorphWidth = surround.right - surround.left
        let biomorphHeight = surround.bottom - surround.top
        let left = point.h - biomorphWidth / 2
        let top = point.v - biomorphHeight / 2
        let canvas = $("<canvas class='triangleMorphCanvas'>")
        canvas.attr('height', Math.trunc(biomorphHeight))
        canvas.attr('width', Math.trunc(biomorphWidth))
        canvas.css('left', left)
        canvas.css('top', top)
        canvas.addClass('triangleBox')
        biomorph.drawer = canvas
        $(canvas).data('genotype', biomorph)
        this.options.liveone = canvas
        let triangleDiv = $(this.element).find('.triangleDiv')
        triangleDiv.append(canvas)
        biomorph.drawer = canvas[0]
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
    },
    drawTriangle: function() {
        let triangleCanvas = $(this.element).find('.triangleLineCanvas')
        let screenWidth = triangleCanvas.width()
        let screenHeight = triangleCanvas.height()
        let a = new Point(Math.round(234 * screenWidth / 512), Math.round(51 * screenHeight / 342));
        let b = new Point(Math.round(134 * screenWidth / 512), Math.round(250 * screenHeight / 342));
        let c = new Point(Math.round(333 * screenWidth / 512), Math.round(250 * screenHeight / 342));
        this.options.a = a
        this.options.b = b
        this.options.c = c
        let ctx = triangleCanvas[0].getContext('2d')
        ctx.strokeStyle = 'Black';
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.moveTo(a.h, a.v);
        ctx.lineTo(b.h, b.v);
        ctx.lineTo(c.h, c.v);
        ctx.lineTo(a.h, a.v);
        ctx.closePath()
        ctx.stroke()
    }

})

function TriangleMenuHandler() {
}

TriangleMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'HelpWithCurrentOperation':
        $("<div>").helpDialog({helpkey: 'TRIANGLE_HELP', appendTo: $(target).closest('.watchmakerView')})
        return false
        default:
    }
    return true;
}

/*
 * Species factory
 */

function SpeciesFactory() {
    this.constructorFunctions = {}
    this.sessionInitializers = {}
    this.geneboxesWidgets = {}
    this.geneboxesCallbacks = {}
    this.concoctors = {}
}

SpeciesFactory.prototype.registerSpeciesType = function(speciesType, 
        constructorFunction, 
        sessionInitializer,
        geneboxesWidget,
        geneboxesCallback) {
    this.constructorFunctions[speciesType] = constructorFunction
    this.sessionInitializers[speciesType] = sessionInitializer
    this.geneboxesWidgets[speciesType] = geneboxesWidget
    this.geneboxesCallbacks[speciesType] = geneboxesCallback
}

SpeciesFactory.prototype.getRegisteredSpecies = function() {
    return Object.keys(this.constructorFunctions)
}

SpeciesFactory.prototype.getSpecies = function(speciesFactoryType, session, canvas) {
    var species = null;
    try {
        species = this.constructorFunctions[speciesFactoryType](session, canvas)
    } catch (err) {
        console.error(err)
        console.error("SpeciesFactory can't find a registered species for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        console.error('session')
        console.error(session)
        console.error('drawer')
        console.error(drawer)
        console.error('geneboxes')
        console.error(geneboxes)

    }
    if(species != null)
        return species;
}
SpeciesFactory.prototype.initializeSession = function(speciesFactoryType, session) {
    var species = null;
    try {
        species = this.sessionInitializers[speciesFactoryType](session);
    } catch (err) {
        console.error("SpeciesFactory can't find a registered session initializer for type '" 
                + speciesFactoryType + "'. Valid values are " + 
                Object.keys(this.sessionInitializers));
        console.error(err);
    }
    if(species != null)
        return species;
}

SpeciesFactory.prototype.geneboxes = function(speciesFactoryType, 
        geneboxes, geneboxes_options) {
    var species = null;
    try {
        species = this.geneboxesWidgets[speciesFactoryType](geneboxes, geneboxes_options);
    } catch (err) {
        console.error("SpeciesFactory can't find a registered geneboxes widget for type '" + speciesFactoryType 
                + "'. Valid values are " + Object.keys(this.geneboxesWidgets))
        console.error(err);
    }
    if(species != null) {
        return species;
    }
}


SpeciesFactory.prototype.updateFromCanvas = function(speciesFactoryType, 
        geneboxes, canvas) {
    var species = null;
    try {
        species = this.geneboxesCallbacks[speciesFactoryType](geneboxes, canvas);
    } catch (err) {
        console.error("SpeciesFactory can't find a registered geneboxes callback for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        console.error(err);
    }
    if(species != null) {
        return species
    }
}

var _speciesFactorySingleton = new SpeciesFactory();

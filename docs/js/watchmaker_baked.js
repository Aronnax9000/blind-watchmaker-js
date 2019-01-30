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

var drawCrossHairs = false;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


function startAutoReproduce(canvasId, targetCanvasId) {
    autoRunning = true;
    doRepro(canvasId, targetCanvasId);
    measureGenerationRate(Number(document.getElementById('generations').value));
}

function doRepro(sourceCanvas, targetCanvas) {
    doReproduce(sourceCanvas, targetCanvas);
    if(autoRunning)
        setTimeout(function() { 
            doRepro(sourceCanvas, targetCanvas)}, 
                Number(document.getElementById("autoReproduceInterval").value));
}

function eraseCanvasNoCenter(canvas) {
    var drawingContext = canvas.getContext("2d");
    // Use the identity matrix while clearing the canvas
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    
    drawingContext.clearRect(0, 0, canvas.width, canvas.height);
}

function eraseCanvas(canvas) {
    // Store the current transformation matrix
    //drawingContext.save();
    var drawingContext = canvas.getContext("2d");
    // Use the identity matrix while clearing the canvas
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    drawingContext.clearRect(0, 0, canvas.width, canvas.height);
//    drawingContext.translate(canvas.width / 2 + 0.5, canvas.height / 2 + 0.5);

    if(drawCrossHairs) {
        drawingContext.beginPath();
        // Draw crosshairs
        drawingContext.moveTo(-100, 0);
        drawingContext.lineTo(100,0);
        drawingContext.moveTo(0, -100);
        drawingContext.lineTo(0,100);
        drawingContext.closePath;
        drawingContext.lineWidth = 0.5;
        drawingContext.strokeStyle = "red";
        drawingContext.stroke();
    }
}

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


$.widget('dawk.blindWatchmaker', {
    options: {
        sessionCount: 0,
    } ,
    _create: function () {
        var ul = $('<ul class="watchmakerTabs"></ul>');
        this.element.append(ul);
        this.element.tabs({activate: this.on_activate});
        var availableSpecies = _speciesFactorySingleton.getRegisteredSpecies()
        availableSpecies.forEach(availableSpecie => {
            this.newWatchmakerSession(availableSpecie)
        })
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
    },
    on_activate: function (event, ui) {
    },
    raiseAlert: function() {
    },
    newWatchmakerSession: function(species) {
        var index = this.options.sessionCount;
        this.options.sessionCount++;
        var uuid = uuidv4();
        var sessionName = species //+ ' ' + index;
        var newWSession = new WatchmakerSession(species)

        var string = '<li>'
        string += '<a href="#' + uuid + '">' 
        
        var sessionIcon = newWSession.options.sessionIcon
        if(sessionIcon)
            string += '<img src="' + newWSession.options.sessionIcon + '">'
        string += sessionName + '</a>'
//        string += '<span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
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
});$.widget('dawk.watchmakerSessionTab', {
    options: {
        species: null,
        session: null,
        name: 'Default Session',
        blindWatchmaker: null
    },
    raiseAlert: function(newMenu) {
        var blindWatchmaker = $(this.element).watchmakerSessionTab('option', 'blindWatchmaker');
        $(blindWatchmaker.element).blindWatchmaker('raiseAlert');
    },
    buildMenu: function(menuContents) {
        var li;
        li = $('<li><div>New Breeding</div></li>');
        menuContents.append(li);
        this._on(li, {click: 'newbreedingView'});

        li = $('<li><div>New Engineering</div></li>');
        menuContents.append(li);
        this._on(li, {click: 'newengineeringView'});
        var activeIndex = $(this.element).tabs("option", "active");
        var activeView = $(this.element).find('.watchmakerView').get(activeIndex);

    },
    on_activate: function (event, ui) {
        // One of the session's views, like Breeding, has just become active.
        var newlyActiveView = $(ui.newTab).parents('.watchmakerView').get(0);
//      $(parents).watchmakerView('buildMenu');
        $(ui.newPanel).trigger('dawk:viewGainedFocus');
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
        case 'Breeding':
        default:
            this.newBreedingView();
        }
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
    },
    newBreedingView: function(biomorph) {
        var species = this.options.species
        var uuid = uuidv4();
        var viewIcon = 'img/IconBreedingGridIcon_ICON_00256_32x32.png'
        var string = '<li><a href="#' + uuid + '">'
            + '<img src="' + viewIcon + '">' 
            + 'Breeding</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.breedingView({
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
        var uuid = uuidv4();
        var viewIcon = 'img/Hypodermic_PICT_03937_32x32.png'
        var string = '<li><a href="#' + uuid + '">'
            + '<img src="' + viewIcon + '">' 
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
    newPedigreeView: function(biomorph) {
        var uuid = uuidv4();
        var viewIcon = 'img/Pedigree_32x32.png'
        var string = '<li><a href="#' + uuid + '">'
            + '<img src="' + viewIcon + '">' 
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
    }    
});

function WatchmakerSession(species) {
    this.options = []
    this.myPenSize = 1;
    this.trianglable = false
    this.arrayable = false
    this.species = species
    _speciesFactorySingleton.initializeSession(species, this)
}

WatchmakerSession.prototype.menuclick = function(event) {
    console.log('WatchmakerSession menuclick')
    return true
}

WatchmakerSession.prototype.buildMenus = function(menu) {
    
}

WatchmakerSession.prototype.viewGainedFocus = function(view) {

}
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
})/* 
 * QuickDraw style point, with h (horizontal) and v (vertical) 
 */
function Point(x,y) {
    this.h = x;
    this.v = y;
}

Point.prototype.toString = function() {
    return "(" + this.h + "," + this.v + ")";
}

Point.prototype.copy = function() {
    var child = new Point(this.h, this.v);
    return child;
}

function Rect() {
    this.left = 0
    this.right = 0
    this.top = 0
    this.bottom = 0
}

/*
 * QuickDraw style Rect, with left, right, top and bottom
 */
function Rect(left, top, right, bottom) {
    
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



Rect.prototype.toString = function() {
    return "Rect (" + this.left + "," + this.top + "),(" + this.right + "," + this.bottom + ")";
}

Rect.prototype.setRect = function(left, top, right, bottom) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
}

Rect.prototype.ptInRect = function(pt) {
    return (pt.h >= this.left 
            && pt.h <= this.right 
            && pt.v >= this.top
            && pt.v <= this.bottom)
}

//FUNCTION SectRect (srcl,src2: Rect; VAR dstRect: Rect) : BOOLEAN;
//SectRect calculates the rectangle that's the intersection of the two given rectangles, and returns
//TRUE if they indeed intersect or FALSE if they don't. Rectangles that "touch" at a line or a point
//are not considered intersecting, because their intersection rectangle (actually, in this case, an
//intersection line or point) doesn't enclose any bits in the bit image.
//If the rectangles don't intersect, the destination rectangle is set to (0,0)(0,0). SectRect works
//correctly even if one of the source rectangles is also the destination
Rect.prototype.sectRect = function(otherRect, destRect) {
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

//PROCEDURE InsetRect (VAR r: Rect; dh,dv: INTEGER);
//InsetRect shrinks or expands the given rectangle. The left and right sides are moved in by the
//amount specified by dh; the top and bottom are moved toward the center by the amount specified
//by dv. If dh or dv is negative, the appropriate pair of sides is moved outward instead of inward.
//The effect is to alter the size by 2*dh horizontally and 2*dv vertically, with the rectangle
//remaining centered in the same place on the coordinate plane.
//If the resulting width or height becomes less than 1, the rectangle is set to the empty rectangle
//(0,0)(0,0). 
Rect.prototype.insetRect = function(dh, dv) {
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

Rect.prototype.equalRect = function(otherRect) {
    return (this.left == otherRect.left &&
        this.right == otherRect.right &&
        this.top == otherRect.top &&
        this.bottom == otherRect.bottom)
}
Rect.prototype.isDegenerate = function() {
    return (this.left == 0 &&
        this.right == 0 &&
        this.top == 0 &&
        this.bottom == 0 || 
        this.left >= this.right ||
        this.top >= this.bottom)
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
        return this.drawingContext.lineWidth * 2;
    } else {
        this.drawingContext.lineWidth = penSize / 2;
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
    appendmenuitem: function(title, menuid, hidden) {
        let li = $('<li>')
        li.addClass('menuitem' + menuid)
        if(hidden) {
            $(li).css('display','none')
        }
        let a = $('<a>' + title + '</a>')
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
        this.appendmenuitem('Clear', 'Clear')
        this.appendmenuitem('----')
        this.appendmenuitem('Highlight Biomorph', 'HighlightBiomorph')
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
        this.appendmenuitem('Breed (B)', 'Breed')
        this.appendmenuitem('Drift (D)', 'Drift')
        this.appendmenuitem('Engineering (E)', 'Engineering')
        this.appendmenuitem('Hopeful Monster (M)', 'HopefulMonster')
        this.appendmenuitem('Initialize Fossil Record (I)', 'InitializeFossilRecord')
        this.appendmenuitem('Play Back Fossils', 'PlayBackFossils')
        this.appendmenuitem('Recording Fossils (R)', 'RecordingFossils')
        if(this.options.session.trianglable) {
            this.appendmenuitem('Triangle (T)', 'Triangle')
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
        this.appendmenuitem('Drift Sweep','DriftSweep')
        if(this.options.session.trianglable) {
            this.appendmenuitem('Make top of triangle','MakeTopOfTriangle')
            this.appendmenuitem('Make left of triangle','MakeLeftOfTriangle')
            this.appendmenuitem('Make right of triangle','MakeRightOfTtriangle')
        }
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
        this.appendmenuitem('----', 'PedigreeSep', true)
        this.appendcheckboxmenuitem('Draw Out Offspring (2)','DrawOutOffspring', true)
        this.appendcheckboxmenuitem('No Mirrors (3)','NoMirrors', true)
        this.appendcheckboxmenuitem('Single Mirror (4)','SingleMirror', true)
        this.appendcheckboxmenuitem('Double Mirror (5)','DoubleMirror', true)
        this.appendmenuitem('----', 'PedigreeSep', true)
        this.appendcheckboxmenuitem('Move (6)','Move', true)
        this.appendcheckboxmenuitem('Detach (7)','Detach', true)
        this.appendcheckboxmenuitem('Kill (8)','Kill', true)
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

$.widget('dawk.dropdownmenu', {
    options: {
        session: null
    },
    _create: function() {
        let menu = $('<ul>').addClass('sm sm-watchmaker')
        menu.appendTo(this.element)
        $("<li>").filemenu({session: this.options.session}).appendTo(menu)
        $("<li>").editmenu({session: this.options.session}).appendTo(menu)
        $("<li>").operationmenu({session: this.options.session}).appendTo(menu)
        $("<li>").animalmenu({session: this.options.session}).appendTo(menu)
        $("<li>").viewmenu({session: this.options.session}).appendTo(menu)
        $("<li>").pedigreemenu({session: this.options.session}).appendTo(menu)
        $("<li>").helpmenu({session: this.options.session}).appendTo(menu)
        this.options.session.buildMenus(menu)
        menu.smartmenus()
    },
    appendsubmenu: function(title) {
        let sub_menu = $('<li>').sub_menu({title: title})
        $(this.element).find('> ul').append(sub_menu)
        return sub_menu
    },
    menuclick: function(event) {
        this.options.menuHandler.menuclick(event)
    }
})

$.widget('dawk.watchmakerView', {
    options: {
        session: null,
    },
    _create: function() {
        $(this.element).addClass('watchmakerView')
        this.buildMenus()

    },
    buildMenus: function() {
        let menubar = $('<div class="watchmakerMenuBar"></div>')
        $(menubar).appendTo(this.element)
        let menuHandler = new MenuHandler(this.options.session)
        this.options.menuHandler = menuHandler

        $(menubar).dropdownmenu({menuHandler: menuHandler,
            session: this.options.session});

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
        $(this.element).on('dawk:viewGainedFocus', this.viewGainedFocus)
    },
    viewGainedFocus: function(event) {
    },

})

function MenuHandler(session) {
    this.session = session
    this.nextMenuHandler = null
}

MenuHandler.prototype.menuclick = function(event) {
    console.log('Menuhandler menuclick')
    let result = this.session.menuclick(event)
    console.log(result)
    if(result) {
        let menuid = $(event.target).data('menuid')
        let target = event.target
        console.log('WatchmakerView menu ' + menuid)
        if(menuid.startsWith('Animal')) {
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox')[0]
            console.log(midCanvas)
            eraseCanvas(midCanvas)
            var biomorph = $(midCanvas).data('genotype')
            biomorph.doPerson(menuid.substring(6))
            biomorph.develop()
            return false
        }
        switch(menuid) {
        case 'Breed': 
            console.log('Breeding')
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newBreedingView", biomorph);
            return false
        case 'Engineering':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newEngineeringView", biomorph);
            return false
        case 'DisplayPedigree':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newPedigreeView", biomorph);
            return false
        case 'HopefulMonster':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            console.log(this.session.options.hopefulMonsterBasicType)
            biomorph.doPerson(this.session.options.hopefulMonsterBasicType)
            biomorph.develop()
            return false
        case 'AboutClassicBlindWatchmaker':
            $("<div>").about({index:0, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'AboutClassicExhibitionColour':
            $("<div>").about({index:1, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'AboutClassicArthromorphs':
            $("<div>").about({index:2, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'AboutWatchmakerJS':
            $("<div>").about({index:3, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'Donate':
            document.location = 'https://alancanon.net/donate' 
            return false
        }
        // Do generic stuff here
        // Then call view-specific handler
        if(this.nextMenuHandler) {
            this.nextMenuHandler.menuclick(event)
        }
        return true;
    }
}

var stillBreeding = false;

$( function() {
    $.widget('dawk.breedingBox', {
        options: {
            species: null,
            canvas: null,
            boxIndex: null,
            isMidBox: false,
            breedingBoxes: null,
            width: 200,
            height: 200,
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
            var parentbreedingView = this.element.parents('.breedingView').get(0);
            var geneboxes = $(parentbreedingView)
                .find('.geneboxes').get(0);
            _speciesFactorySingleton.updateFromCanvas(
                    this.options.species,
                    geneboxes, this.options.canvas)
        },
        _doCanvasClicked: function(event) {
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
            var genotype = jQuery.data(event.target, 'genotype');
            var breedingBoxes = this.options.breedingBoxes;
            var clickedBoxIndex =  this.options.boxIndex;
            if (genotype != null) {
                // erase the other canvases
                var breedingViewCanvases = $(canvas).parents('.boxes').find('canvas');
                $(breedingViewCanvases).each(function(index) {
                    if(index != clickedBoxIndex) {
                        eraseCanvas(this);
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
                            jQuery.data(midCanvas, 'genotype', genotype)
                            eraseCanvas(this)
                            console.log('handoff complete')
                            // Inform the genotype that it now draws on a different
                            // canvas
                            genotype.drawer = midCanvas
                            $(midCanvas).css({left:0,top:0})
                            genotype.develop()
                            breedingBoxes.produceLitter(numBoxes, midBox)
                        } });
                } else {
                    breedingBoxes.produceLitter(numBoxes, midBox);
                }
            } else {
                // Genotype was null
            } 
            // Update the geneboxes with the genes of the new parent.
            $(midCanvasDiv).trigger("mouseover");
            return false;
        },
    });
});/*
 * breedingBoxes widget definition
 */
$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingBoxes", {
        // default options
        options: {
            cols: 3,
            numBoxes: 15,
            speciesFactory: null,
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
                                var overlayCanvas = $(targetCanvas).parents('.watchmakerView').find('.overlayCanvas')[0];
                                
                                eraseCanvasNoCenter(overlayCanvas);
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
                            }});
                    }
                } else { // midbox
                    if(recursive) {
                        this.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                    }
                }
            } else {
                stillBreeding = false;
            }
        },

        produceLitter: function(numBoxes, midBox) {
            var midCanvasDiv = this.options.midCanvasDiv;
            var midCanvasDivPosition = midCanvasDiv.position();
            var breedingView = $(this.element).closest('.breedingView')
            console.log(breedingView)
            var explosiveBreeding = breedingView.find('.explosiveBreeding').get(0)
            var recursive = ! explosiveBreeding.checked;
            if(recursive) {
                this.produceKthOffspring(numBoxes, midBox, 0, midCanvasDivPosition, recursive);
            } else {
                for (k = 0; k < numBoxes; k++) {
                    this.produceKthOffspring(numBoxes, midBox, k, midCanvasDivPosition, recursive);
                }
            }

        },

        // The constructor
        _create: function(options) {
            var session = this.options.session
            var species = this.options.session.species
            var boxes = this.element
            $(boxes).attr('id', 'boxes').addClass('boxes')
            this.element.append(boxes)
            var numBoxes = this.options.numBoxes
            var midBox = Math.trunc(numBoxes / 2)
            for (j = 0; j < numBoxes; j++) {
                var isMidBox = j == midBox
                var canvasDiv = $("<div></div>").breedingBox({ 
                    boxIndex: j, 
                    isMidBox: isMidBox, 
                    species: species,
                    breedingBoxes: this}).appendTo(boxes)
                if(isMidBox) {
                    // Create a biomorph and render it on the middle canvas.
                    this.options.midCanvasDiv = canvasDiv
                    var canvas = $(canvasDiv).find('canvas').get(0)
                    var biomorph = _speciesFactorySingleton.getSpecies(
                            species, session, canvas)
                    if(this.options.biomorph) {
                        this.options.biomorph.copyBiomorph(biomorph)
                    } else {
                        biomorph.doPerson(session.options.defaultBasicType)
                    }
                    $(canvas).data('genotype', biomorph)        
                    biomorph.develop()
                }
            }

            this._refresh()
        },

        // Called when created, and later when changing options
        _refresh: function() {
        },

        // A public method to change the color to a random value
        // can be called directly via .colorize( "random" )
        random: function( event ) {
        },

        _destroy: function() {
        },

        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments )
            this._refresh()
        },

        // _setOption is called for each individual option that is changing
        _setOption: function( key, value ) {
            this._super( key, value );
        }
    });
} );
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
    console.log(div)

    return div
}

function getBiomorphFromCanvas(canvas) {
    var biomorph = jQuery.data(canvas, 'genotype');
    return biomorph;
}

$( function() {
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
    });
});


//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.breedingView", $.dawk.watchmakerView, {
    options: { 
        species: null,
        watchmakerSessionTab: null,
        biomorph: null
    },
    viewGainedFocus: function(event) {
        let session = $(this).breedingView("option", "session")
        session.viewGainedFocus(session, this)
    },

    _create: function (options) {
        this._super("_create")
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
        var boxes = $("<div>").breedingBoxes({session: this.options.session, biomorph: this.options.biomorph})
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
        $(midCanvas).trigger('click');
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
            var numBoxes = $(boxes).breedingBoxes("option", "numBoxes");
            if (useFitness) {
                var canvas = $(breedingBoxes).find('.box').get(0);
                var biomorph = getBiomorphFromCanvas(canvas);
                var bestSoFar = canvas;

                var errorToBeat = biomorph.fitness(canvas);
                $(breedingBoxes).find('.box').each( function(index) {
                    canvas = this;
                    var currentError = getBiomorphFromCanvas(canvas).fitness(canvas);
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
            console.log($(this.element).find('.autoReproduceInterval').get(0))
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
    }
})

function BreedingMenuHandler(breedingView) {
    this.breedingView = breedingView
}

BreedingMenuHandler.prototype.menuclick = function(event) {
    let target = event.target
    let menuid = $(target).data('menuid')
    console.log('BreedingMenuHandler '  + menuid)
    switch(menuid) {
    case 'Timing':
        this.breedingView.options.timingDialog.dialog('open') 
        return false    
    }
    return true
}

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
            biomorph.doPerson("BasicTree")
        }
            
        jQuery.data(canvas, 'genotype', biomorph)
        biomorph.develop()
        $(canvas).trigger('mouseover')
        
    },
    viewGainedFocus: function(event) {
        let session = $(this).engineeringView("option", "session")
        session.viewGainedFocus(session, this)
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
});$( function() {
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
            var parentbreedingView = this.element.parents('.engineeringView').get(0);
            var geneboxes = $(parentbreedingView)
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
});
function PedigreeMenuHandler() {
}

PedigreeMenuHandler.prototype.menuclick = function(event) {
    let target = event.target
    let menuid = $(target).data('menuid')
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

    }
    return true;
}
//FullPtr == ^Full;
//FullHandle == ^FullPtr;
//Full == RECORD
//genome;
//surround: Rect;
//origin, centre: Point;
//parent;
//firstBorn;
//lastBorn;
//elderSib;
//youngerSib;
//prec, next;
//damaged{,Blackened}

//snapHandle: Handle;
//snapBytes: Integer;
//snapBounds: Rect;
//}
function Full(genome) {
    this.genome = genome
    this.surround = genome.getRect()
    this.origin = new Point()
    this.centre = new Point()
    this.parent = null
    this.firstBorn = null
    this.lastBorn = null
    this.elderSib = null
    this.youngerSib = null
}

//GodPtr == ^God;
//godHandle == ^GodPtr;
//God == RECORD
//adam;
//previousGod, nextGod;
//}
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


Pedigree.prototype.created = function() {
    return new Full()
}


Pedigree.prototype.checkVictim = function(mLoc, thisFull) {
    if(thisFull.surround.ptInRect(mLoc)) {
        return thisFull 
    } else if(thisFull.next != null) {
        return this.checkVictim(thisFull)
    } else {
        return null
    }
}    

/*
 * Pascal version altered the value of thisFull if a victim was
 * found, && returned true. This version returns the victim && null
 * if no victim found.
 */
Pedigree.prototype.mouseInBox = function(mLoc, thisFull) {
    let victim = null
    if(thisFull != null) {
        victim = this.checkVictim(mLoc, thisFull)
    }
    return victim
}

Pedigree.prototype.invertRect == function(rect) {

}

//{highlights thisFull && its elder sibs, && all their descendants}
Pedigree.prototype.highlightAll = function(thisFull) {
    if(thisFull != null) {
        invertRect(thisFull.surround)
    }
    if(thisFull.lastBorn != null) {
        highlightAll(thisFull.lastBorn);
    }
    if(thisFull.elderSib != null) {
        highlightAll(thisFull.elderSib);
    } 
}


Pedigree.prototype.highlightPedigree = function(thisFull) {
    if(thisFull != null) {
        invertRect(thisFull.surround);
        if(thisFull.lastBorn != null) {
            highlightAll(thisFull.lastBorn);
        }
    }
} 


Pedigree.prototype.tryGod = function(thisGod) {
    godCounter++
    if(thisGod.nextGod == null) {
        return thisGod
    } else {
        return this.tryGod(thisGod.nextGod)
    }
}



Pedigree.prototype.findLastGod = function() { //{Delivers last God in theGod}
    let thisGod = this.rootGod
    this.godCounter = 1;
    if(thisGod.nextGod == null) {
        this.theGod = thisGod
    } else {
        tryGod(thisGod)
    } 
}

Pedigree.prototype.sysBeep = function() {
    alert('BEEP!')
}

Pedigree.prototype.AdamError = function(whichError, thisFull) {
    if(thisFull != null) {
        this.invertRect(thisFull.surround);
    }
    this.sysBeep(1);
    this.sysBeep(1);
    invertRect(thisFull.surround)
}

Pedigree.prototype.checkAdam = function(thisGod) {
    if(thisGod != null) {
        if(thisGod.adam != null) {
            if(thisGod.adam == thisFull) {
                return theGod = thisGod
            }
        }
        if(thisGod.nextGod != null) {
            return checkAdam(thisGod.nextGod);
        }
    }
    return null
}


//{Returns true if thisFull is an adam}
Pedigree.prototype.isAnAdam = function(thisFull) {
    let tryGod = rootGod;
    if(thisFull != null) {
        return checkAdam(tryGod) != null;
    } else {
        return false
    } 
}

Pedigree.prototype.showAllAdams = function(theGod) {
    if(theGod != null) {
        invertRect(theGod.adam.surround);
        if(theGod.nextGod != null) {
            showAllAdams(theGod.nextGod)
        }
    }
}


Pedigree.prototype.showRelatives = function(thisFull) {

    if(thisFull != null) {

        if(thisFull.parent != null) {
            this.frameRect(thisFull.parent.surround);
        }
        if(thisFull.elderSib != null) {
            this.frameRect(thisFull.elderSib.surround);
        }
        if(thisFull.youngerSib != null) {
            this.frameRect(thisFull.youngerSib.surround);
        }
        if(thisFull.lastBorn != null) {
            this.frameRect(thisFull.lastBorn.surround);
        }
        if(thisFull.firstBorn != null) {
            this.frameRect(thisFull.firstBorn.surround);
        }
    }
}


Pedigree.prototype.showAllFulls = function(thisFull) {
    if(thisFull != null) {
        this.frameRect(thisFull.surround);
        showRelatives(thisFull)
    }
    if(thisFull.next != null) {
        showAllFulls(thisFull.next)
    }
}


Pedigree.prototype.markIf = function(thisFull) {
    if(isAnAdam(thisFull)) {
//      FrameInnerRect(thisFull.surround);
    }
}

Pedigree.prototype.markUp = function(thisFull) {
    if(thisFull != null) {
        markIf(thisFull);
    }
    if(thisFull.next != null) {
        markUp(thisFull.next)
    }
} 




Pedigree.prototype.redevelop = function(thisFull) {
    tempSnap = new BitMap();

    if(thisFull != null) {
        tempSnap.baseAddr = thisFull.SnapHandle;
        tempSnap.rowBytes = thisFull.snapBytes;
        tempSnap.Bounds = thisFull.snapBounds;
//      CopyBits(tempSnap, MainPtr^.PortBits, tempSnap.Bounds, thisFull.surround, srcCopy, null);
        markIf(thisFull);
        thisFull.damaged = false;
    }
} 


Pedigree.prototype.CrossOut = function(thisFull, colour) {
    if(thisFull != null) {
//      MoveTo(thisFull.surround.left, thisFull.surround.top);
//      PenPat(colour);
//      LineTo(thisFull.surround.right, thisFull.surround.bottom);
//      PenNormal
    }
}


Pedigree.prototype.SetAllUndamaged = function(thisFull) {
    if(thisFull != null) {
        if(thisFull.damaged) {
            this.crossOut(thisFull, 'White');
            thisFull.damaged = false;
        }
        if(thisFull.next != null) {
            this.setAllUndamaged(thisFull.next)
        } 
    }
}


//{Records whether any intersection between This && Other (or Other's juniors),}
//{    in truth value of Other.damaged && This.damaged}
Pedigree.prototype.juniorIntersection = function(thisFull, otherFull) {
    if(thisFull != null && otherFull != null) {
        if(thisFull != otherFull) {
            if(thisFull.surround.sectRect(otherFull.surround, new Rect())) {
                otherFull.damaged = true;
                thisFull.damaged = true
            }
        }
        if(otherFull.next != null) {
            juniorIntersection(thisFull, otherFull.next);
        }
    }
} 


Pedigree.prototype.Coverer = function(thisFull) {
    if(thisFull != null && thisFull.next != null) {
        juniorIntersection(thisFull, thisFull.next);
    } 
}


//{Records whether any intersection between This && Other (or Other's seniors,}
//{    in truth value of Other.damaged && This.damaged}
Pedigree.prototype.seniorIntersection = function(thisFull, otherFull) {
    if(thisFull != null && otherFull != null) {
        if(thisFull != otherFull) {

            if(thisFull.surround.sectRect(otherFull.surround, new Rect())) {
                return true
            }
        }
        if(otherFull.prec != null) {
            return seniorIntersection(thisFull, otherFull.prec);
        }
    }
    return false
}


//{Returns true if(thisFull is covered by any of its own seniors}
Pedigree.prototype.isCovered = function(thisFull) {
    if(thisFull != null) {
        if(thisFull.prec == null) {
            return false
        } else {
            return seniorIntersection(thisFull, thisFull.prec);
        }
    }
} 




Pedigree.prototype.overEdge = function(thisFull) {
    let destRect = new Rect();
    this.pRect.sectRect(thisFull.surround, destRect);
    overEdge = ! destRect.equalRect(thisFull.surround)
} 


Pedigree.prototype.redrawAll = function(thisFull) {
    if(thisFull != null) {
        this.moveTo(thisFull.centre.h, thisFull.centre.v);
        if(thisFull.parent != null) {
            this.lineTo(thisFull.parent.centre.h, thisFull.parent.centre.v)
        }
        if(thisFull.lastBorn != null) {
            redrawAll(thisFull.lastBorn);
        }
        if(thisFull.elderSib != null) {
            this.redrawAll(thisFull.elderSib);
        } 
    }
}


//{Draws line from each box to its parent, if it has one, treating}
//{original thisFull as adam}
Pedigree.prototype.redrawLines = function(thisFull) {
    if(thisFull != null) {
        MoveTo(thisFull.centre.h, thisFull.centre.v);
        if(thisFull.parent != null) {
            LineTo(thisFull.parent.centre.h, thisFull.parent.centre.v);
        }
        if(thisFull.lastBorn != null) {
            redrawAll(thisFull.lastBorn);
        }
    } 
}


Pedigree.prototype.allLines = function(theGod) {
    if(theGod != null) {
        if(theGod.adam != null) {
            redrawLines(theGod.adam);
        }
        if(theGod.nextGod != null) {
            this.allLines(theGod.nextGod)
        }
    }
}

Pedigree.prototype.connect = function(nucleusFull, orbitFull) {
    if((nucleusFull != null) && (orbitFull != null)) {
        this.moveTo(nucleusFull.centre.h, nucleusFull.centre.v);
        this.thereAreLines = true;
        this.lineTo(orbitFull.centre.h, orbitFull.centre.v);
    }
}


Pedigree.prototype.ChildLine = function(thisFull, child) {
    this.connect(thisFull, child);
    if(child.youngerSib != null) {
        this.childLine(thisFull, child.youngerSib);
    } 
}

Pedigree.prototype.localLines = function(thisFull) {
    if(thisFull.parent != null) {
        this.connect(thisFull, thisFull.parent);
    }
    if(thisFull.firstBorn != null) {
        this.childLine(thisFull, thisFull.firstBorn)
    } 
}


//{incorporates it into clip region so not drawn over in future}
Pedigree.prototype.incorporate = function(thisFull) {
//  RectRgn(Region2, thisFull.surround);
//  DiffRgn(DestRegion, Region2, DestRegion); //{DestRegion now updated to include new box}
//  SetClip(DestRegion)
} 


Pedigree.prototype.withdrawProtection = function(thisFull) {
//  RectRgn(Region2, thisFull.surround);
//  UnionRgn(DestRegion, Region2, DestRegion); {DestRegion now updated to include new box}
//  SetClip(DestRegion)
} 


Pedigree.prototype.protectAll = function(thisFull) {
    if(thisFull != null) {
        this.incorporate(thisFull);
    }
    if(thisFull.next != null) {
        this.protectAll(thisFull.next)
    }
} 


Pedigree.prototype.protect = function() {
//  RectRgn(DestRegion, pRect);
    if(specialFull != null) {
        this.protectAll(specialFull);
    } 
}


Pedigree.prototype.protect = function() {
//  RectRgn(DestRegion, this.pRect);
    if(specialFull != null) {
        protectAll(specialFull);
    } 
}


Pedigree.prototype.repairThis = function(thisFull) {
    if(thisFull != null) {
        if(thisFull.damaged) {
            this.redevelop(thisFull);
            this.incorporate(thisFull);
            thisFull.damaged = false
        }
        if(thisFull.next != null) {
            this.repairThis(thisFull.next)
        }
    }
} 


Pedigree.prototype.repair = function() {
//  RectRgn(DestRegion, this.pRect);
    this.repairThis(specialFull)
}


Pedigree.prototype.WeedOut = function(thisFull) {
    if(thisFull != null) {
        if(thisFull.parent != null) {
            let onlyChild = (thisFull.youngerSib == null) && (thisFull.elderSib == null);
            if(onlyChild) {
                thisFull.parent.lastBorn = null;
                thisFull.parent.firstBorn = null
            }
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


Pedigree.prototype.wipeOut = function(thisFull) {
    let damageRect = thisFull.surround;
    coverer(thisFull);
    if(thisFull == specialFull) {
        oldSpecialFull = specialFull;
        specialFull = thisFull.next;
        thisFull.prec = null;
//      {Corrected by RD Dec 1993 to cure Norton-reported bug, bombing when ancestor Killed}
        thisFull.next = null;
    } else {
        thisFull.prec.next = thisFull.next;
    }
    if(thisFull.next != null) {
        thisFull.next.prec = thisFull.prec;
    }
    this.eraseRect(DamageRect);
} 

//{kill thisFull && all its elder sibs, including all their descendants}
Pedigree.prototype.killAll = function(thisFull) {
    var nextVictim
    var secondVictim
    if(thisFull != null) {
        nextVictim = thisFull.lastBorn;
        secondVictim = thisFull.elderSib;
        this.wipeOut(thisFull);
        if(thisFull == null) {
            this.sysBeep(1)
        } else {
            thisFull = null
        }
    }
    if(nextVictim != null) {
        killAll(nextVictim);
    }
    if(secondVictim != null) {
        killAll(secondVictim);
    }
} 


//{kill this one && all its descendants}
Pedigree.prototype.kill = function(thisFull) {
    var nextVictim
    var secondVictim
    if(thisFull != null) {
        nextVictim = thisFull.lastBorn;
        this.wipeOut(thisFull);
        if(thisFull == null) {
            this.sysBeep(1)
        } else {
            thisFull = null
        }
        if(nextVictim != null) {
            killAll(nextVictim);
        }
    }
} 


Pedigree.prototype.drawWholeLot = function(thisFull) {
    if(thisFull != null) {
        this.redevelop(thisFull);
        this.incorporate(thisFull);
        if(thisFull.next != null) {
            this.drawWholeLot(thisFull.next)
        }
    }
} 


Pedigree.prototype.shoot = function(thisFull) {
    this.findLastGod();
    let yesAdam = isAnAdam(thisFull); //{leaves theGod as thisFull's god if any}
    if(! yesAdam) {

        this.weedOut(thisFull);
        this.kill(thisFull)
    } else {
//      {only comes here if trying to kill an adam}
        if(thisFull.parent != null) {
            this.sysBeep(1);
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
        if(godCounter == 3) {
            this.options.theMode = Preliminary;
            this.special = 0
        }
        if(theGod.previousGod == null) {
            this.sysBeep(1)
        } else {
            theGod.previousGod.nextGod = theGod.nextGod;
        }
        if(theGod.nextGod != null) {
            theGod.nextGod.previousGod = theGod.previousGod;
        }
        theGod.nextGod = null;
        theGod.previousGod = null;
        theGod.adam = null;
        if(theGod == null) {
            this.sysBeep(1)
        } else {
            theGod = null
        }

    }
//  EraseRect(pRect);
//  RectRgn(DestRegion, pRect);
    this.drawWholeLot(specialFull);
    this.allLines(rootGod);
//  ClipRect(pRect);
} 

Pedigree.prototype.shootAll = function(thisGod) {
    if(thisGod != null) {
        if(thisGod.adam != null) {
            shoot(thisGod.adam);
        }
        if(thisGod.nextGod != null) {
            shootAll(thisGod.nextGod)
        }
    }
} 


//{Normally called with specialFull first}
Pedigree.prototype.massacre = function(thisFull) {
    if(thisFull != null) {
        shoot(thisFull);
    }
    if(thisFull.next != null) {
        massacre(thisFull.next)
    } 
}


//{Isolates thisFull from all except its descendants, leaving rest of}
//{pedigree hierarchical linked list tidied up && pointing elsewhere.}
//{Does not touch linear Specialfull linked list, since this reflects}
//{spatial relations on screen, && nonrelatives can cover each other}
Pedigree.prototype.Detach = function(thisFull) {
    if(thisFull.parent != null) {

//      PenPat(White);
//      RectRgn(DestRegion, pRect);
        this.incorporate(thisFull);
        this.incorporate(thisFull.parent);
        this.connect(thisFull, thisFull.parent);
//      PenNormal;
//      ClipRect(pRect);
        if(thisFull.parent.lastBorn == thisFull) {
            thisFull.parent.lastBorn = thisFull.elderSib;
        }
        if(thisFull.parent.firstBorn == thisFull) {
            thisFull.parent.firstBorn = thisFull.youngerSib;
        }
    }// {of whitening line connecting with thisFull's parent}
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
    tempGod.previousGod = theGod;
    tempGod.adam = thisFull;
    theGod.nextGod = tempGod;
    theGod = tempGod;
    markIf(thisFull);
}


Pedigree.prototype.followMouse = function(thisFull) {
//  SetCursor(CursList[WatchCursor]);
    tempSnap.baseAddr = thisFull.snapHandle;
    tempSnap.rowBytes = thisFull.snapBytes;
    tempSnap.Bounds = thisFull.snapBounds;
    if(thisFull.prec == null) {
       // {Chosen one is already in front. No change}
    } else {
        //{Must bring chosen one to front, after isolating it}
        thisFull.prec.next = thisFull.next;
        if(thisFull.next != null) {
            thisFull.next.prec = thisFull.prec;
        }
//      {Chosen one has now been isolated, still called thisFull}
        thisFull.next = specialFull; //{This brings it to front}
        specialFull.prec = thisFull; //{This corrects old specialfull's pointer to prec}
        oldSpecialFull = specialFull;
        specialFull = thisFull; //{This gives the new specialfull its proper name}
        specialFull.prec = null;
    }
    coverer(thisFull); // {Records all damage done by thisFull, now also Specialfull}
    // We will designate the most recently selected or spawned morph canvas as midBox
    //    child[special] = specialFull.genome;
    let wasOverEdge = overEdge(thisFull);
    let width = thisFull.surround.right - thisFull.surround.left;
    let height = thisFull.surround.bottom - thisFull.surround.top;
    let halfWidth = Math.trunc(width / 2);
    let halfHeight = Math.trunc(height / 2);
    let damageRect = thisFull.surround;
    this.protect();
//  PenPat(White);
    this.localLines(thisFull);
//  GetMouse(mous);
    if(thisFull != null) {
        horizOffset = thisFull.centre.h - mous.h;
        vertOffset = thisFull.centre.v - mous.v;
        thisFull.surround.left = thisFull.centre.h - halfWidth;
        thisFull.surround.right = thisFull.surround.left + width;
        thisFull.surround.top = thisFull.centre.v - Halfheight;
        thisFull.surround.bottom = thisFull.surround.top + Height;
        ClipRect(pRect);
        EraseRect(thisFull.surround);
    }
//  CopyBits(MainPtr^.PortBits, MyBitMap, pRect, pRect, srcCopy, null);
//  {store background}
//  CopyBits(tempSnap, MainPtr^.PortBits, tempSnap.Bounds, thisFull.surround, srcCopy, null); {show chosen one in front}
//  PenMode(PatXor); {White is bad because it deletes other lines}
//  PenPat(Black);
    this.protect();
    this.thereAreLines = false;
    this.localLines(thisFull);
//  HideCursor;
    do {
        oldMous = mous;
//      REPEAT
//      GetMouse(mous)
//      UNTIL PtInRect(mous, pRect);
//      ClipRect(thisFull.surround);
//      {Bring on new one}
//      SetClip(DestRegion);
        if(mous.h != oldMous.h || mous.v != oldmous.v || ! stilldown) {
            if(thisFull != null) {
                thatFull = thisFull;
//              ClipRect(pRect);
//              TickValue = TickCount;
//              if(mous.v > 100) {
//              REPEAT
//              UNTIL TickCount != TickValue;
//              {an empirically suggested device for reducing flicker}
//              CopyBits(MyBitMap, MainPtr^.PortBits, thisFull.surround, thisFull.surround, srcCopy, null); {Bring back old}
                thisFull.centre.h = mous.h + horizOffset;
                thisFull.centre.v = mous.v + vertOffset;
                thisFull.surround.left = thisFull.centre.h - halfWidth;
                thisFull.surround.right = thisFull.surround.left + width;
                thisFull.surround.top = thisFull.centre.v - Halfheight;
                thisFull.surround.bottom = thisFull.surround.top + Height;
                if(this.thereAreLines) {
//                  SetClip(DestRegion);
                    this.localLines(thatFull); // {delete old lines}
                }
//              ClipRect(thisFull.surround);
//              CopyBits(tempSnap, MainPtr^.PortBits, tempSnap.Bounds, thisFull.surround, srcCopy, null);
//              {Bring on new one}
                if(this.thereAreLines) {
                    this.protect();
                    localLines(thisFull)
                }
            }
        }
    } while (stillDown);
//  ShowCursor;
//  SetCursor(CursList[HandCursor]);
//  PenNormal;
//  ClipRect(pRect);
    thisFull.origin.h = mous.h + horizOffset;
    thisFull.origin.v = mous.v + vertOffset;
    thisFull.damaged = true; // {WasOverEdge}
//  ClipRect(pRect);
    this.repair();
    this.protect();
    this.allLines(rootGod);
//  ClipRect(pRect);
} 




//current was a VAR. Value is instantiated during the routine
//via created() and returned.
Pedigree.prototype.spawnOne = function(thisFull, here, current) {

//    SetCursor(Curslist[WatchCursor]);
    current = new Full();
    current.genome = thisFull.genome.reproduce();
    current.origin = here;
    current.genome.develop()
    current.surround = current.genome.getRect();
    Triangle.atLeast(current.surround);
    let surround = current.surround
    let height = surround.bottom - surround.top;
    widthBytes = Math.trunc((right - left) / 8)
    if(widthBytes % 2 == 1) {
        widthBytes = widthBytes + 1;
    }
    width = widthBytes * 8;
    voffset = 0;
    let pRect = this.pRect
    if(surroundtop < pRect.top) {
        voffset = pRect.top - top;
        surround.top = pRect.top;
        surround.bottom = surround.top + surround.height;
    }
    if(surround.bottom > pRect.bottom) {
        voffset = pRect.bottom - surround.bottom;
        surround.bottom = pRect.bottom;
        surround.top = surround.bottom - height
    }
    if(surround.left < pRect.left) {
        surround.left = pRect.left;
        surround.right = surround.left + width
    }
    if(surround.right > pRect.right) {
        surround.right = pRect.right;
        surround.left = surround.right - width
    }
//  EraseRect(current.surround);
//  FrameRect(current.surround);

    current.centre.h = surround.left + Math.trunc((surround.right - surround.left) / 2)
    current.centre.v = surround.top + Math.trunc((surround.bottom - surround.top) / 2)

    here.v = current.origin.v + voffset;
    here.h = current.centre.h;
    DrawPic(MyPic, here, current.genome);
    let snapBounds = current.snapBounds

    snapBounds.left = 0;
    snapBounds.right = current.surround.right - current.surround.left;
    snapBounds.top = 0;
    snapBounds.bottom = height
    tempSnap.Bounds = current.snapBounds;
    current.snapBytes = widthBytes;
//  current.snapHandle = NewHandle(SizeNeeded);
//  tempSnap.baseAddr = current.snapHandle;
//  tempSnap.rowBytes = current.snapBytes;
//  CopyBits(MainPtr^.PortBits, tempSnap, current.surround, tempSnap.Bounds, srcCopy, null);
    current.parent = thisFull;
    current.elderSib = thisFull.lastBorn;
    if(current.elderSib != null) {
        current.elderSib.youngerSib = current;
    }
    current.lastBorn = null;
    current.youngerSib = null;
    if(thisFull.lastBorn == null) {
        thisFull.firstBorn = current;
    }
    thisFull.lastBorn = current;
    current.next = specialFull;  //{puts currentfull at head of list}
    specialFull.prec = current;  //{Updates seniority pointer of previous head}
    oldSpecialFull = specialFull;
    specialFull = current; // {Gives new head its proper title}
    specialFull.prec = null; // {Probably unnecessary but good form}
    child[Special] = current.genome;
    markIf(current);
} 


Pedigree.prototype.Radiate = function(from, goal, spokes, here) {
    dx = goal.h - from.h;
    dy = goal.v - from.v;
    here[0].h = from.h + dx;
    here[0].v = from.v + dy;
    here[1].h = from.h - dx;
    here[1].v = from.v - dy;
    here[2].h = from.h - dy;
    here[2].v = from.v + dx;
    here[3].h = from.h + dy;
    here[3].v = from.v - dx;
    for(let j = 0; j < spokes; i++) {
        this.moveTo(from.h, from.v);
        this.lineTo(here[j].h, here[j].v)
    }
} 


Pedigree.prototype.drawOutFrom  = function(thisFull) {
//  SetCursor(CursList[CrossCursor]);
//  ClipRect(pRect);
    if(isCovered(thisFull)) {
        redevelop(thisFull);
    }
    if(thisFull.prec == null) {
//      {Chosen one is already in front. No change}
    } else {
//      {Must bring chosen one to front, after isolating it}
        thisFull.prec.next = thisFull.next;
        if(thisFull.next != null) {
            thisFull.next.prec = thisFull.prec;
//          {Chosen one has now been isolated, still called thisFull}
            thisFull.next = specialFull; //{This brings it to front}
            specialFull.prec = thisFull; //{This corrects old specialfull's pointer to prec}
            oldSpecialFull = specialFull;
            specialFull = thisFull; // {This gives the new specialfull its proper name}
            specialFull.prec = null;
        }
    }
//  GetClip(SaveRegion);
//  RectRgn(DestRegion, pRect);
//  this.protect();
//  PenMode(PatXor);
//  OwnCursor(specialFull.surround, MainPtr^.PortBits, theCursor);
//  SetCursor(theCursor);
//  do {
//  GetMouse(mous);
//  UNTIL (! StillDown) || (! PtInRect(mous, thisFull.surround));
//  PenNormal;
//  FrameRect(thisFull.surround);
    markIf(thisFull);
//  child[special] = thisFull.genome;
//  if(StillDown) {

//  SetClip(DestRegion);
//  PenMode(PatXor);
//  Radiate(thisFull.centre, mous, Rays, here);
    while(stillDown) {

        oldMous = Mous;
        GetMouse(mous);
        if(mous.v < pRect.top) {
            mous.v = pRect.top;
        }
        if(mous.h != oldMous.h || mous.v != oldMous.v) { 

            this.radiate(thisFull.centre, oldMous, Rays, here);
            if(! thisFull.surround.ptInRect(mous)) {
                this.Radiate(thisFull.centre, mous, Rays, here)
            }
        } 
    }
//  {Button just released}
//  {SetCursor(CursList[WatchCursor]);}
    this.radiate(thisFull.centre, mous, rays, here);
//  PenNormal;
    j = Rays;
//  ClipRect(pRect);
    if(! thisFull.surround.ptInRect(mous)) {
        while (j >= 1) {
            theCursor.data = curslist[randcursor].mask;
            theCursor.data[8] = 128; // {make up dot cursor}
            theCursor.mask = theCursor.data;
//          SetCursor(theCursor);
            this.spawnOne(thisFull, here[j], current);
            j--
        }               
    }
    this.protect();
    this.localLines(thisFull);
//  ClipRect(pRect);
//  SetCursor(CursList[DrawOutCursor]);
} // {DrawOutFrom}

Pedigree.prototype.PhylogNew  = function(biomorph) {
    // Erase the Pedigree breeding area
    // EraseRect(pRect);
    tempGod = new God()
    tempGod.nextGod = null;
    this.findLastGod;
    tempGod.previousGod = this.theGod;
    this.theGod.nextGod = tempGod;
    this.theGod = tempGod;
    this.theGod.adam = new Full();
    this.theGod.adam.genome = biomorph;
    let pRect = this.pRect

    theGod.adam.origin.h = Math.trunc((pRect.right - pRect.left) / 2)
    theGod.adam.origin.v = Math.trunc((pRect.bottom - pRect.top) / 2)

    delayvelop(theGod.adam.genome, theGod.adam.origin);
    theGod.adam.surround = Margin;
    Triangle.atLeast(theGod.adam.surround);
    this.frameRect(theGod.adam.surround);
    this.frameInnerRect(theGod.adam.surround);
    let surround = theGod.adam.surround
    let height = surround.bottom - surround.top;
    let width = Math.trunc((surround.right - surround.left) / 8);
    while(width % 2 == 1) {
        width++
    }
    let snapBounds = theGod.adam.snapBounds
    snapBounds.left = 0;
    snapBounds.right = theGod.adam.surround.right - theGod.adam.surround.left;
    snapBounds.top = 0;
    snapBounds.bottom = height
    tempSnap.bounds = theGod.adam.snapBounds;
    theGod.adam.snapBytes = width;
    theGod.adam.snapHandle = new BitMap();
    tempSnap.baseAddr = theGod.adam.snapHandle;
    tempSnap.rowBytes = theGod.adam.snapBytes;
//  CopyBits(MainPtr^.PortBits, tempSnap, theGod.adam.surround, tempSnap.Bounds, srcCopy, null);
    let adam = theGod.adam 
    adam.centre.h = adam.surround.left + Math.trunc((adam.surround.right - adam.surround.left) / 2);
    adam.centre.v = adam.surround.top + Math.trunc((adam.surround.bottom - adam.surround.top) / 2)
    oldSpecialFull = specialFull;
    //{This corrects old specialfull's pointer to prec}
    if(specialFull != null) {
        specialFull.prec = theGod.adam
    }                                                                                        
    theGod.adam.next = specialFull;
    specialFull = theGod.adam;
    specialFull.prec = null;
    // {Changed July 1990}
    this.options.theMode = Mode.Phyloging; 
//  EraseRect(pRect);
//  RectRgn(DestRegion, pRect);
    drawWholeLot(specialFull);
    this.allLines(rootGod);
//  ClipRect(pRect);
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

//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.pedigreeView", $.dawk.watchmakerView, {
    options: { 
        theMode: Mode.Phyloging,
        rays: Mirrors.NoMirrors,
        species: null,
        biomorph: null,
        rootGod: null,
        phyloging: null,
        specialFull: null,
        theGod: null,
        godCounter: 0
    },
    viewGainedFocus: function(event) {
        let session = $(this).pedigreeView("option", "session")
        session.viewGainedFocus(session, this)
    },
    _create: function (options) {
        this._super()

        $(this.element).addClass('pedigreeView')

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
        // Reverse default hidden state to show Pedigree mode.
        $(this.element).find('.menuitemDrawOutOffspring').css('display', 'block')
        $(this.element).find('.menuitemMove').css('display', 'block')
        $(this.element).find('.menuitemDetach').css('display', 'block')
        $(this.element).find('.menuitemKill').css('display', 'block')
        $(this.element).find('.menuitemNoMirrors').css('display', 'block')
        $(this.element).find('.menuitemSingleMirror').css('display', 'block')
        $(this.element).find('.menuitemDoubleMirror').css('display', 'block')       
        $(this.element).find('.menuitemPedigreeSep').css('display', 'block')       
        // Default checked state for new Pedigree views
        $(this.element).find('.menuitemDrawOutOffspring img').css('display', 'inline-block')
        $(this.element).find('.menuitemMove img').css('display', 'none')
        $(this.element).find('.menuitemDetach img').css('display', 'none')
        $(this.element).find('.menuitemKill img').css('display', 'none')
        $(this.element).find('.menuitemNoMirrors img').css('display', 'inline-block')
        $(this.element).find('.menuitemSingleMirror img').css('display', 'none')
        $(this.element).find('.menuitemDoubleMirror img').css('display', 'none')       
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
            mousedown: function(event) { this.morphmousedown(event) },
            mouseup: function(event) { this.morphmouseup(event) },
            mousemove: function(event) { this.morphmousemove(event) },
        })
        this.allLines(this.options.rootGod)
    },
    spawnone: function(thisFull, here) {
        let biomorph = thisFull.genome

        let spawn = biomorph.reproduce(null)
        let current = new Full(spawn)
        spawn.full = current
        current.origin = here    
        current.surround = current.genome.getRect();
        Triangle.atLeast(current.surround);

        let surround = current.surround
        let height = surround.bottom - surround.top;
        let width = surround.right - surround.left;
        console.log('wxh ' + width + 'x' + height)
        let pedigreeDiv = $(this.element).find('.pedigreeDiv')[0]
        let pRect = new Rect(0, 0, $(pedigreeDiv).width(), $(pedigreeDiv).height())
        console.log('pRect')
        console.log(pRect)
        console.log()
        let error = here.v - (height / 2)
        console.log('v error low ' + error)
        if(error < 0) {
            here.v -= error
        } 
        error = here.v + (height / 2) 
        console.log('v error high ' + error)
        if(error > pRect.bottom) {
            here.v -= error - pRect.bottom
        }
        error = here.h - (width / 2)
        console.log('h error low ' + error)
        if(error < 0) {
            here.h -= error
        } 
        error = here.h + (width / 2) 
        console.log('h error high ' + error)
        if(error > pRect.right) {
            here.h -= error - pRect.right
        }

        current.parent = thisFull;
        current.elderSib = thisFull.lastBorn;
        if(current.elderSib != null) {
            current.elderSib.youngerSib = current;
        }
        current.lastBorn = null;
        current.youngerSib = null;
        if(thisFull.lastBorn == null) {
            thisFull.firstBorn = current;
        }
        thisFull.lastBorn = current;
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
        ctx.strokeStyle = "Black"
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
    connect: function(nucleusFull, orbitFull) {
        console.log('connect')
        if(nucleusFull != null && orbitFull != null) {
            let ctx = this.options.familialLineCanvas.getContext('2d')
            ctx.strokeStyle = 'Black';
            ctx.lineWidth = 1;
            ctx.beginPath()
            ctx.moveTo(nucleusFull.centre.h, nucleusFull.centre.v);
            ctx.lineTo(orbitFull.centre.h, orbitFull.centre.v);
            ctx.stroke()
            ctx.closePath()
        }
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
        }// {of whitening line connecting with thisFull's parent}
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
        console.log('finished drawLine ' + p1 + ' -> ' + p2)
        console.log(this.options.familialLineContext)
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
    childLine: function(thisFull, child) {
        this.connect(thisFull, child);
        if(child.youngerSib != null) {
            this.childLine(thisFull, child.youngerSib);
        } 
    },

    localLines: function(thisFull) {
        if(thisFull.parent != null) {
            this.connect(thisFull, thisFull.parent);
        }
        if(thisFull.firstBorn != null) {
            this.childLine(thisFull, thisFull.firstBorn)
        } 
    },
    checkAdam: function(thisGod) {
        if(thisGod != null) {
            if(thisGod.adam != null) {
                if(thisGod.adam == thisFull) {
                    theGod = thisGod
                    return true
                }
            }
            if(thisGod.nextGod != null) {
                return this.checkAdam(thisGod.nextGod);
            }
        }
        return false
    },


    //{Returns true if thisFull is an adam}
    isAnAdam: function(thisFull) {
        let tryGod = this.options.rootGod
        if(thisFull != null) {
            return this.checkAdam(tryGod)
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
                alert('BEEP')
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
                alert('BEEP')
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
                alert('BEEP');
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
            if(theGod.previousGod == null) {
                this.sysBeep(1)
            } else {
                theGod.previousGod.nextGod = theGod.nextGod;
            }
            if(theGod.nextGod != null) {
                theGod.nextGod.previousGod = theGod.previousGod;
            }
            theGod.nextGod = null;
            theGod.previousGod = null;
            theGod.adam = null;
            if(theGod == null) {
                alert('BEEP!')
            } else {
                theGod = null
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
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
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
            break
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
            break
        }
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
            canvases.draggable()
            this._on(canvases, {drag: function(event) {
                let full = $(event.target).data('genotype').full
                let canvas = full.genome.drawer
                let offset = $(canvas).offset()
                console.log('canvas offset ' + offset)
                let pedigreeDivOffset = $(event.target).closest('.pedigreeDiv').offset()
                console.log('pedigreeDiv offset ' + offset)
                console.log(canvas.width + ',' + canvas.height)
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
//    console.log("Registered Species Type " + speciesType)
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

var SwellType = {
    Swell: 1,
    Shrink: 2,
    Same: 3,
    properties: {
        1: {name: "Swell"},
        2: {name: "Shrink"},
        3: {name: "Same"}
    },
    swellType: function(index) {
        switch(index) {
        case 1:
            return SwellType.Swell;
        case 2:
            return SwellType.Shrink;
        case 3:
            return SwellType.Same;
        }
    }
}
var CompletenessType = {
        Single: 1,
        Double: 2,
        properties: {
            1: {name: "Single", geneboxName: "Asym"},
            2: {name: "Double", geneboxName: "Bilat"}
        }
};

var SpokesType = {
        NorthOnly: 1,
        NSouth: 2,
        Radial: 3,
        properties: {
            1: {name: "NorthOnly", geneboxName: "Single"},
            2: {name: "NSouth", geneboxName: "UpDn"},
            3: {name: "Radial", geneboxName: "Radial"}
        }
};

var HorizPos = {
        LeftThird: 1,
        MidThird: 2,
        RightThird: 3,
        properties: {
            1: {name: "LeftThird"},
            2: {name: "MidThird"},
            3: {name: "RightThird"}
        }
};

var VertPos = {
        TopRung: 1,
        MidRung: 2,
        BottomRung: 3,
        properties: {
            1: {name: "TopRung"},
            2: {name: "MidRung"},
            3: {name: "BottomRung"}
        }
};
$.widget("dawk.biomorph_genebox", {
    options : {
        hasMid: false,
        hasGradient: false,
        hasLeftRight: true,
        hasColor: false,
        showSign: false,
    },
    _create : function(options) {
        this._setOptions(options);
        this.element.addClass("genebox");
        $(this.element).tooltip();
        this.element.attr('title', this.options.title);
    },
    _init: function() {
        let options = this.options;
        // HTML template for the manipulation areas of the genebox.
        var str =  '\
            <div class="geneboxInfo"> \
            <img src="img/swellcircle.png" class="gradientGene gradientSame" /> \
            <span class="geneValue"></span> \
            </div>';
        var engineering = options.geneboxCollection.options.engineering;
        if(engineering) {
            if(options.hasLeftRight && (options.hasMid || options.hasGradient)) {
                str += '<div class="geneboxNaviThirds">'
            } else if(options.hasLeftRight){
                str += '<div class="geneboxNaviHalves">'
            } else {
                str += '<div class="geneboxNaviWhole">'
            } 

            if(options.hasLeftRight) {
                str += '<div class="geneboxLeft"></div>';
            }


            if(options.hasGradient) {
                str += '<div class="geneboxMidThirds">';
                str += 
                    '<div class="geneboxUp"></div> \
                    <div class="geneboxEquals"></div> \
                    <div class="geneboxDown"></div>';
                str += '</div>';
            } else if(options.hasMid) {
                str += '<div class="geneboxMidWhole">\
                    <div class="geneboxEquals"></div>\
                    </div>';
            }

            if(options.hasLeftRight) {
                str += '<div class="geneboxRight"></div>';
            }
            str +='</div>';
        }
        this.element.append($.parseHTML(str));
        if(engineering) {
            this._on( $(this.element).find('.geneboxLeft, .geneboxMid, .geneboxUp, .geneboxEquals, .geneboxDown, .geneboxRight'), {
                click: "_manipulate"
            });
            this._on( $(this.element).find('.geneboxNaviWhole'), {
                click: "_launchPicker"
            });
        }
        this.refresh();
    },
    _launchPicker: function() {
        console.error('Launch picker has no picker to launch: override in the genebox definition.')
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    updateValue: function(newValue, newGradientValue) {
        let options = this.options
        options.value = newValue
        if(options.hasGradient) {
            options.gradientValue = newGradientValue
        }
        this.refresh();
    },
    refreshValue: function() {
        var str = this.options.value;
        if(this.options.showSign) {
            str = "+" + String(str);
        }
        this.element.find('.geneValue').text(str);

    },

    refreshColor: function() {

        if(this.options.hasColor) {
            $(this.element).css('background-color', this.options.value);
        }

    },

    refreshGradient: function() {
        if(this.options.hasGradient) {
            var gradientImg = this.element.find('.gradientGene');
            switch (this.options.gradientValue) {
            case SwellType.Swell:
                gradientImg.removeClass('gradientSame gradientShrink');
                gradientImg.addClass('gradientSwell');
                break;
            case SwellType.Shrink:
                gradientImg.removeClass('gradientSame gradientSwell');
                gradientImg.addClass('gradientShrink');
                break;
            case SwellType.Same:
                gradientImg.removeClass('gradientShrink gradientSwell');
                gradientImg.addClass('gradientSame');
                break;
            default:
            }
        }
    },

    refresh : function() {
        this.refreshValue();
        let options = this.options
        if(options.hasColor) {
            this.refreshColor()
        }

        if(options.hasGradient) {  
            this.refreshGradient()
        }
    },
    _manipulate: function(event) {
        var target = $(event.target);
        var leftRightPos;
        var rung;
        if(target.hasClass('geneboxLeft')) {
            leftRightPos = HorizPos.LeftThird;
        } else if(target.hasClass('geneboxRight')) {
            leftRightPos = HorizPos.RightThird;
        } else if(target.hasClass('geneboxMid')) {
            leftRightPos = HorizPos.MidThird;
        } else if(target.hasClass('geneboxUp')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.TopRung;
        } else if(target.hasClass('geneboxEquals')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.MidRung;
        } else if(target.hasClass('geneboxDown')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.BottomRung;
        } else if(target.hasClass('geneboxNaviWhole')) {
            console.log('geneboxNaviWhole in rung calculation. Picker related? Probably not a problem.')
        }
        let options = this.options
        options.geneboxCollection.manipulate(options.geneboxIndex, leftRightPos, rung)
        return false;
    }

});


$.widget('dawk.geneboxes', {
    options : {
        engineering: true,
        session: null,
        numGeneBoxes : 16,
        biomorph: null,
    },    
    _create: function(options) {
        this._setOptions(options);
        $(this.element).addClass('geneboxes')
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) { 
        let options = this.options
        options.biomorph.manipulation(geneboxIndex, leftRightPos, rung);
        var canvas = $(this.element).parent().find('canvas').get(0);
        this.updateFromCanvas(canvas);
        options.biomorph.develop();
    },
})


/**
 * Spokes genebox
 */

$.widget( "dawk.spokesGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasMid: true,
        title: 'Spokes'
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        var properties = SpokesType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
});
/*
 * Monochrome biomorph bounding box calculations.
 * Monochrome biomorphs store this as a Rect
 * in the this.pic.margin property
 */

Biomorphs.prototype.dummydraw = function() {
    var tempDrawer = this.drawer
    this.drawer = document.createElement('canvas')
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
/*
 * Constructor for the Monochrome biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort of drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property of
 * 'species', a string containing the name of the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */
function Monochrome(session, drawer) {
    this.session = session
    this.drawer = drawer
    this.gene = chromosome()
    this.dGene = new Array(10)
    for(let i = 0; i < 10; i++) {
        this.dGene[i] = SwellType.Same
    }
    this.segNoGene = 0
    this.segDistGene = 0
    this.completenessGene = CompletenessType.Single
    this.spokesGene = SpokesType.NorthOnly
    this.trickleGene = TRICKLE
    this.mutSizeGene = 0
    this.mutProbGene = 0
    this.pic = new Pic(this)
}

// Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Monochrome", 
        (function(session, drawer) { return new Monochrome(session, drawer);}),
        (function(session) { Monochrome.initializeSession(session);}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.monochrome_geneboxes.call(geneboxes, geneboxes_options) }),
        (function(geneboxes, canvas) { 
            $(geneboxes).monochrome_geneboxes('updateFromCanvas', canvas)})

);
$.widget('dawk.monochrome_mutationsmenu', $.dawk.sub_menu, {
    options: {
        title: 'Mutations'
    },
    _create: function() {
        this._super();
        this.appendcheckboxmenuitem('Segmentation','Segmentation')
        this.appendcheckboxmenuitem('Gradient','Gradient')
        this.appendcheckboxmenuitem('Asymmetry','Asymmetry')
        this.appendcheckboxmenuitem('Radial Sym', 'RadialSym')
        this.appendcheckboxmenuitem('Scaling Factor', 'ScalingFactor')
        this.appendcheckboxmenuitem('Mutation Size', 'MutationSize')
        this.appendcheckboxmenuitem('Mutation Rate', 'MutationRate')
        this.appendcheckboxmenuitem('Tapering twigs', 'TaperingTwigs')
        this.appendcheckboxmenuitem('Gene 9 Gradient', 'Gene9Gradient')
    }
})

Monochrome.initializeMut = function(session) {
    var mut = []

    mut.push(true)  // Segmentation // {** changed 1.1 **}
    mut.push(true)  // Gradient {** changed 1.1 **}
    mut.push(true)  // Asymmetry {** changed 1.1 **}
    mut.push(true)  // Radial Sym {** changed 1.1 **}
    mut.push(true)  // Scaling Factor {** changed 1.1 **}
    mut.push(false) // Mutation Size
    mut.push(false) // Mutation Rate
    mut.push(true)  // Tapering Twigs
    mut.push(true)  // Gene 9 Gradient (not in Classic Watchmaker)
    session.options.mut = mut
}

//Really belongs on the session
Monochrome.initializeSession = function(session) {
    Monochrome.initializeMut(session)
    session.options.sessionIcon = 'img/BWTreeLogoMonoThin_ICNO_17669_32x32.png';
    session.options.basicTypes = ["BasicTree", "Chess", "Insect", "Hopeful Monster"]
    session.options.defaultBasicType = "BasicTree";
    session.options.hopefulMonsterBasicType = "Hopeful Monster";
    session.viewGainedFocus = Monochrome.viewGainedFocus
    session.menuclick = Monochrome.menuclick
    session.buildMenus = Monochrome.buildMenus
    session.trianglable = true
    session.arrayable = true

}

Monochrome.buildMenus = function(menu) {
    console.log('monochrome mutations menu')
    $("<li>").monochrome_mutationsmenu().insertBefore($(menu).find('.menuPedigree')[0])

}

Monochrome.toggleMut = function(mut, index, target) {
    mut[index] = ! mut[index]
    let li = $(target).closest('li')
    if(mut[index]) {
        $(li).addClass('checked')
        $(li).find('img').css('display', 'inline-block')
    } else {
        $(li).removeClass('checked')
        $(li).find('img').css('display', 'none')
    }
}

Monochrome.menuclick = function(event) {
    console.log('Monochrome menuclick')
    console.log(this)
    let options = this.options
    let target = event.target
    let menuid = $(target).data('menuid')
    console.log('BreedingView menu ' + menuid)
    let mut = options.mut
    switch(menuid) {
    case 'Segmentation':
        Monochrome.toggleMut(mut, 0, target)
        return false 
    case 'Gradient':
        Monochrome.toggleMut(mut, 1, target)
        return false 
    case 'Asymmetry':
        Monochrome.toggleMut(mut, 2, target)
        return false 
    case 'RadialSym':
        Monochrome.toggleMut(mut, 3, target)
        return false 
    case 'ScalingFactor':
        Monochrome.toggleMut(mut, 4, target)
        return false 
    case 'MutationSize':
        Monochrome.toggleMut(mut, 5, target)
        return false 
    case 'MutationRate':
        Monochrome.toggleMut(mut, 6, target)
        return false 
    case 'TaperingTwigs':
        Monochrome.toggleMut(mut, 7, target)
        return false 
    case 'Gene9Gradient':
        Monochrome.toggleMut(mut, 8, target)
        return false 
    }
    console.log('returning true')
    return true // Event not processed
}

Monochrome.updateMutCheckbox = function(mut, view, index, name) {
    let menuitem = $(view).find('.menuitem' + name)[0]
    if(mut[index]) {
        $(menuitem).find('img').css('display', 'inline-block')
    } else {
        $(menuitem).find('img').css('display', 'none')
    }
}

Monochrome.viewGainedFocus = function(session, view) {
    let mut = session.options.mut
    Monochrome.updateMutCheckbox(mut, view, 0, 'Segmentation')
    Monochrome.updateMutCheckbox(mut, view, 1, 'Gradient')
    Monochrome.updateMutCheckbox(mut, view, 2, 'Asymmetry')
    Monochrome.updateMutCheckbox(mut, view, 3, 'RadialSym')
    Monochrome.updateMutCheckbox(mut, view, 4, 'ScalingFactor')
    Monochrome.updateMutCheckbox(mut, view, 5, 'MutationSize')
    Monochrome.updateMutCheckbox(mut, view, 6, 'MutationRate')
    Monochrome.updateMutCheckbox(mut, view, 7, 'TaperingTwigs')
    Monochrome.updateMutCheckbox(mut, view, 8, 'Gene9Gradient')
}

Monochrome.prototype.basicTree = function () {
    this.makeGenes(-10, -20, -20, -15, -15, 0, 15, 15, 7);
    this.segNoGene = 2;
    this.segDistGene = 150;
    this.completenessGene = CompletenessType.Single;
    this.dGene[3] = SwellType.Shrink;
    this.dGene[4] = SwellType.Shrink;
    this.dGene[5] = SwellType.Shrink;
    this.dGene[8] = SwellType.Shrink;
    this.trickleGene = 9;
}

Monochrome.prototype.chess = function () {
    this.makeGenes(-TRICKLE, 
            3 * TRICKLE, 
            -3 * TRICKLE, 
            -3 * TRICKLE, 
            TRICKLE, 
            -2 * TRICKLE, 
            6 * TRICKLE, 
            -5 * TRICKLE, 
            7);
}

Monochrome.prototype.insect = function() {
    this.makeGenes( 
            TRICKLE, 
            TRICKLE, 
            -4 * TRICKLE, 
            TRICKLE, 
            -TRICKLE, 
            -2 * TRICKLE, 
            8 * TRICKLE, 
            -4 * TRICKLE, 
            6);
}




/*
 * PROCEDURE MakeGenes (VAR genotype: person; a, b, c, d, e, f, g, h, i: Integer);
        VAR
                j: Integer;
        BEGIN
                WITH genotype DO
                        BEGIN
                                FOR j := 1 TO 10 DO
                                        dgene[j] := same;
                                SegNoGene := 1;
                                SegDistGene := 150;
                                CompletenessGene := Double;
                                SpokesGene := NorthOnly;
                                TrickleGene := Trickle;
                                MutSizeGene := Trickle DIV 2;
                                MutProbGene := 10;
                                gene[1] := a;
                                gene[2] := b;
                                gene[3] := c;
                                gene[4] := d;
                                gene[5] := e;
                                gene[6] := f;
                                gene[7] := g;
                                gene[8] := h;
                                gene[9] := i;
                        END;
        END; {makegenes}

 */
Monochrome.prototype.makeGenes = function (a, b, c, d, e, f, g, h, i) {
    for(let s = 0; s < 10; s++) {
        this.dGene[s] = SwellType.Same;
    }
    this.segNoGene = 1;
    this.segDistGene = 150;
    this.completenessGene = CompletenessType.Double;
    this.spokesGene = SpokesType.NorthOnly;
    this.trickleGene = TRICKLE;
    this.mutSizeGene = Math.trunc(TRICKLE/2); // Trickle div 2;
    this.mutProbGene = 10;
    this.gene[0] = a;
    this.gene[1] = b;
    this.gene[2] = c;
    this.gene[3] = d;
    this.gene[4] = e;
    this.gene[5] = f;
    this.gene[6] = g;
    this.gene[7] = h;
    this.gene[8] = i;
}

Monochrome.prototype.doPerson = function(biomorphType) {
    switch(biomorphType) {
    case "Chess": this.chess(); break;
    case "Insect": this.insect(); break;
    case "Hopeful Monster": this.doSaltation(); break;
    case "BasicTree": 
    default: 
        this.basicTree()
    }
    return this;
}
Monochrome.force3 = function(r) {
    var i = Math.round(r)
    if(i > 2) { 
        i = 2
    }
    if(i < 0) {
        i = 0
    }
    return i
}

Monochrome.force2 = function(r) {
    var i = Math.round(r)
    if(i > 1) { 
        i = 1
    }
    if(i < 0) {
        i = 0
    }
    return i
}

Monochrome.triangle = function(screenwidth, screenheight, b, m) {
    var k = Math.round(200 * screenheight / 340);
    var x = m.h - b.h;
    var y = (screenheight - m.v) - (screenheight - b.v);
    var r1 = y / k;
    var r3 = (x - y / 2) / k;
    var r2 = (k - x - y / 2) / k;
    return [r1, r2, r3];
}

Monochrome.prototype.concoct = function(r1, r2, r3, a, b, c) {
    var weight
    this.segNoGene = Math.round(r1 * a.segNoGene + r2 * b.segNoGene + r3 * c.segNoGene)

    if(this.segNoGene < 1) {
        this.segNoGene = 1
    }

    this.segDistGene = Math.round(r1 * a.segDistGene + r2 * b.segDistGene + r3 * c.segDistGene);
    this.completenessGene = Monochrome.force2(r1 * a.completenessGene + r2 * b.completenessGene + r3 * c.completenessGene);
    this.spokesGene = Monochrome.force3(r1 * a.spokesGene + r2 * b.spokesGene + r3 * c.spokesGene);
    for(let j = 0; j < 9; j++) {
        this.gene[j] = Math.round(r1 * a.gene[j] + r2 * b.gene[j] + r3 * c.gene[j]);
    }
    var sizeWorry = this.segNoGene * Monochrome.twoToThe(gene[8]);
    if(sizeWorry > WORRYMAX) {
        this.gene[8]--
    }
    if(this.gene[8] < 1) {
        this.gene[8] = 1;
    }

    this.trickleGene = Math.round(r1 * a.trickleGene + r2 * b.trickleGene + r3 * c.trickleGene);
    this.mutSizeGene = Math.round(r1 * a.mutSizeGene + r2 * b.mutSizeGene + r3 * c.mutSizeGene);
    this.mutProbGene = Math.round(r1 * a.mutProbGene + r2 * b.mutProbGene + r3 * c.mutProbGene);

    if(this.mutProbGene < 1) {
        this.mutProbGene = 1
    }
    if(this.mutProbGene > 100) {
        this.mutProbGene = 100
    }
    for(let j = 0; j < 10; j++) {
        this.dGene[j] = Monochrome.force3(r1 * a.dGene[j] 
        + r2 * b.dGene[j] 
        + r3 * c.dGene[j]);
    }

}

Monochrome.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
    var str = "Manipulation geneBoxIndex:" + geneboxIndex;

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
    switch(geneboxIndex) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.gene[geneboxIndex - 1] -= this.mutSizeGene;
            break;
        case HorizPos.RightThird: 
            this.gene[geneboxIndex - 1] += this.mutSizeGene;
            break;
        case HorizPos.MidThird: 
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Shrink;
                break;
            }
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.gene[8]--;
            break;
        case HorizPos.RightThird: 
            // The Pascal original incremented gene 9 unconditionally,
            // then backed off the change if the 2^gene9 times the segment
            // number gene value exceeded 4095.
            // This version does the test first, then increments gene 9 only
            // if it is safe to do so.
            var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8] + 1);
            if(sizeWorry <= WORRYMAX)
                this.gene[8]++;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[8] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[8] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[8] = SwellType.Shrink;
                break;
            }
            break;
        }
        break;
    case 10: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.segNoGene--;
            break;
        case HorizPos.MidThird: 
            break; //{No Action}
        case HorizPos.RightThird: 
            var sizeWorry = (this.segNoGene + 1) * Monochrome.twoToThe(this.gene[8]);
            if(sizeWorry <= WORRYMAX) {
                this.segNoGene++;
            }
            break;
        }
        break;
    case 11: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.segDistGene -= this.trickleGene;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[9] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[9] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[9] = SwellType.Shrink;
                break;
            }
            break;
        case HorizPos.RightThird: 
            this.segDistGene += this.trickleGene;
            break;
        }
        break;
    case 12: 
        console.log('Completeness manipulation')
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.completenessGene = CompletenessType.Single;
            break;
        case HorizPos.MidThird: 
            break; // {No Action}
        case HorizPos.RightThird: 
            this.completenessGene = CompletenessType.Double;
            break;
        }
        break;
    case 13: 
        console.log('Spokes manipulation')
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.spokesGene = SpokesType.NorthOnly;
            break;
        case HorizPos.MidThird: 
            this.spokesGene = SpokesType.NSouth;
            break;
        case HorizPos.RightThird: 
            this.spokesGene = SpokesType.Radial;
            break;
        }
        break;
    case 14: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.trickleGene > 1)
                this.trickleGene--;
            break;
        case HorizPos.RightThird: 
            this.trickleGene++;
            break;
        case HorizPos.MidThird: 
            break;// {No action}
        }
        break;
    case 15: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.mutSizeGene > 1)
                this.mutSizeGene--;
            break;
        case HorizPos.RightThird: 
            this.mutSizeGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
        }
        break;
    case 16: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.mutProbGene > 1) {
                this.mutProbGene--;
            }
            break;
        case HorizPos.RightThird: 
            if(this.mutProbGene < 100)
                this.mutProbGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
            break;
        }
    }
    if(this.gene[8] < 1) {
        this.gene[8] = 1;
    }

    if(this.segNoGene < 1) {
        this.segNoGene = 1;
    }
}

const TRICKLE = 10;
const MutTypeNo = 9;

Monochrome.prototype.fitness = function(environment) {
    var targetHeight = environment.height;
    var targetWidth = environment.width;
    
    var margin = this.pic.margin;
    var marginWidth = margin.right - margin.left;
    var marginHeight = margin.bottom - margin.top;
    var widthError = Math.abs(targetWidth - marginWidth) / targetWidth;
    var heightError = Math.abs(targetHeight - marginHeight) / targetHeight;
    var averageError = (widthError + heightError) / 2;
    return averageError;
}



function chromosome() {
    var chrome = new Array(9);
    for(let i = 0; i < 9; i++)
        chrome[i] = 0; // indexed 0-8, unlike Pascal 1-based arrays.
    return chrome;
}



Monochrome.prototype.toString = function() {
    var htmlResult = 
        "Gene: " + this.gene + " DGene: ";
    for(let i = 0; i < 10; i++) {
        htmlResult +=  SwellType.properties[this.dGene[i]].name; 
        if(i<9) htmlResult += ",";
    }
    htmlResult +=  " SegNoGene: " + this.segNoGene +  
    " SegDistGene: " + this.segDistGene +  
    " CompletenessGene: " + CompletenessType.properties[this.completenessGene].name +  
    " SpokesGene: " + SpokesType.properties[this.spokesGene].name +  
    " TrickleGene: " + this.trickleGene +  
    " MutSizeGene: " + this.mutSizeGene +  
    " MutProbGene: " + this.mutProbGene;
    return htmlResult;
}

Monochrome.prototype.toHtml = function() {
    var h4open = "<h4>";
    var h4close = "</h4>";
    var breaktag = "<br />";
    var htmlResult = h4open + name + h4close + 
    "Gene: " + this.gene + breaktag + "DGene: ";
    for(let i = 0; i < 10; i++) {
        htmlResult +=  SwellType.properties[this.dGene[i]].name; 
        if(i<9) htmlResult += ",";
    }
    htmlResult += breaktag + "SegNoGene: " + this.segNoGene +  
    breaktag + "SegDistGene: " + this.segDistGene +  
    breaktag + "CompletenessGene: " + CompletenessType.properties[this.completenessGene].name +  
    breaktag + "SpokesGene: " + SpokesType.properties[this.spokesGene].name +  
    breaktag + "TrickleGene: " + this.trickleGene +  
    breaktag + "MutSizeGene: " + this.mutSizeGene +  
    breaktag + "MutProbGene: " + this.mutProbGene;
    return htmlResult;
}




Monochrome.randInt = function(ceiling) {
    return Math.floor(Math.random() * ceiling) + 1;  
}

Monochrome.prototype.direction = function(child) {
    if(Monochrome.randInt(2) == 2) 
        return child.mutSizeGene;
    else
        return -child.mutSizeGene;
}
Monochrome.prototype.direction9 = function() {
    if(Monochrome.randInt(2) == 2)
        return 1;
    else
        return -1;
}

Monochrome.prototype.copyBiomorph = function(child) {
    child.gene = this.gene.slice();
    child.dGene = this.dGene.slice();
    child.segNoGene = this.segNoGene;
    child.segDistGene = this.segDistGene;
    child.completenessGene = this.completenessGene;
    child.spokesGene = this.spokesGene;
    child.trickleGene = this.trickleGene;
    child.mutSizeGene = this.mutSizeGene;
    child.mutProbGene = this.mutProbGene;
    return child;
}

/*
 * Globals, line 29:
 * 
 * CONST
 *     WorryMax = 4095;
 */
const WORRYMAX = 4095;

Monochrome.twoToThe = function(n) {
    switch(n) {
    case 0: 
        return 1;
    case 1: 
        return 2;
    case 2: 
        return 4;
    case 3: 
        return 8;
    case 4: 
        return 16;
    case 5: 
        return 32;
    case 6: 
        return 64;
    case 7: 
        return 128;
    case 8: 
        return 256;
    case 9: 
        return 512;
    case 10: 
        return 1024;
    case 11: 
        return 2048;
    case 12: 
        return 4096;
    default:
        return 8192;
    }
}

//Monochrome.prototype.manipulation = _monochrome_manipulation;
Monochrome.randSwell = function(indGene) {
    switch(indGene) {
    case SwellType.Shrink:
        return SwellType.Same;
    case SwellType.Same:
        if(Monochrome.randInt(2) == 1) {
            return SwellType.Shrink;
        } else {
            return SwellType.Swell;
        }
    case SwellType.Swell:
        return SwellType.Same;
    }
}

Monochrome.prototype.reproduce = function(childCanvas) {
    var child = new Monochrome(this.session, childCanvas);
    this.copyBiomorph(child);
    child.mutate();
    return child;
} 




Monochrome.prototype.mutate = function() {
    var mut = this.session.options.mut

    if(mut[6]) 
        if(Monochrome.randInt(100) < this.mutProbGene) 
            do 
                this.mutProbGene += this.direction9();
            while ((Math.abs(this.mutProbGene) > 100) || (this.mutProbGene == 0));
    for(let j = 0; j<8; j++) 
        if(Monochrome.randInt(100) < this.mutProbGene) 
            this.gene[j] += this.direction(this);
    if(Monochrome.randInt(100) < this.mutProbGene) 
        this.gene[8] += this.direction9();
    if(this.gene[8] < 1) 
        this.gene[8] = 1;
    var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8]);
    if(sizeWorry > WORRYMAX) {
        this.gene[8]--; 
    }
    if(mut[0]) 
        if(Monochrome.randInt(100) < this.mutProbGene) {
            var j = this.direction9();
            this.segNoGene += j;
            if(j > 0) {
                sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8]);
                if(sizeWorry > WORRYMAX) 
                    this.segNoGene--;
            }
        }
    if(this.segNoGene < 1) 
        this.segNoGene = 1;
    if((mut[1]) && (this.segNoGene > 1)) {
        for(let j = 0; j<8; j++) 
            if(Monochrome.randInt(100) < this.mutProbGene/2>>0) 
                this.dGene[j] = Monochrome.randSwell(this.dGene[j]);
        if(Monochrome.randInt(100) < this.mutProbGene/2>>0) 
            this.dGene[9] = Monochrome.randSwell(this.dGene[9]);
    }
    if(mut[7])
        if((mut[8] && (Monochrome.randInt(100) < this.mutProbGene))) 
            this.dGene[8] = Monochrome.randSwell(this.dGene[8]);
    if((mut[0]) && (this.segNoGene > 1)) 
        if(Monochrome.randInt(100) < this.mutProbGene) 
            this.segDistGene = this.segDistGene + this.direction9();
    if(mut[2]) 
        if(Monochrome.randInt(100) < this.mutProbGene/2>>0) 
            if(this.completenessGene == CompletenessType.Single) 
                this.completenessGene = CompletenessType.Double;
            else 
                this.completenessGene = CompletenessType.Single;
    if(mut[3]) 
        if(Monochrome.randInt(100) < this.mutProbGene/2>>0) 
            switch(this.spokesGene) {
            case SpokesType.NorthOnly: 
                this.spokesGene = SpokesType.NSouth;
                break;
            case SpokesType.NSouth: 
                if(this.direction9() == 1) 
                    this.spokesGene = SpokesType.Radial;
                else 
                    this.spokesGene = SpokesType.NorthOnly;
                break;
            case SpokesType.Radial: 
                this.spokesGene = SpokesType.NSouth;
                break;
            }
    if(mut[4]) 
        if(Monochrome.randInt(100) < Math.abs(this.mutProbGene)) {
            this.trickleGene += this.direction9();
            if(this.trickleGene < 1) 
                this.trickleGene = 1;
        }
    if(mut[5]) 
        if(Monochrome.randInt(100) < Math.abs(this.mutProbGene)) {
            this.mutSizeGene += this.direction9();
            if(this.mutSizeGene < 1) 
                this.mutSizeGene = 1;
        }
    // Really only supposed to return true if mutation happened
    return true
    
}
Monochrome.prototype.doSaltation = function() {
    // {bomb 5, range check failed, here after killing top Adam}
    var mut = this.session.options.mut
    if(mut[0]) {
        this.segNoGene = Monochrome.randInt(6);
        this.segDistGene = Monochrome.randInt(20);
    } else {
        this.segNoGene = 1;
        this.segDistGene = 1;
    }
    var r = Monochrome.randInt(100);
    this.completenessGene = CompletenessType.Double;
    if(mut[2]) {
        if(r < 50) {
            this.completenessGene = CompletenessType.Single;
        } 
    }
    r = Monochrome.randInt(100);
    if(mut[3]) {
        if(r < 33) {
            this.spokesGene = SpokesType.Radial;
        } else if(r < 66) {
            this.spokesGene = SpokesType.NSouth;
        } else {
            this.spokesGene = SpokesType.NorthOnly;
        }
    } else {
        this.spokesGene = SpokesType.NorthOnly;
    }
    if(mut[4]) {
        this.trickleGene = Monochrome.randInt(10);
        if(this.trickleGene > 1) {
            this.mutSizeGene = Math.trunc(this.trickleGene / 2);
        }
    }
    for(let j = 0; j < 8; j++) {
        var maxGene;
        do {
            this.gene[j] = Math.trunc(this.mutSizeGene * (Monochrome.randInt(19) - 10));
            if(mut[1]) {
                this.dGene[j] = Monochrome.randSwell(this.dGene[j]);
            } else {
                this.dGene[j] = SwellType.Same;
            }
            var factor;
            switch(this.dGene[j]) {
            case SwellType.Shrink:
                factor = 1;
                break;
            case SwellType.Same:
                factor = 0;
                break;
            case SwellType.Swell:
                factor = 1;
                break;
            }
            maxgene = this.gene[j] * this.segNoGene * factor;
        } while(maxgene > 9 * this.trickleGene || maxgene < -9 * this.trickleGene);
    }
    do {
        if(mut[7]) {
            this.dGene[8] = Monochrome.randSwell(this.dGene[8]);
        } else {
            this.dGene[8] = SwellType.Same;
        }
        if(mut[1]) {
            this.dGene[9] = Monochrome.randSwell(this.dGene[8])
        } else {
            this.dGene[9] = SwellType.Same;
        }
        var factor;
        // In the Pascal, the index of the previous for loop, j, is used.
        // the loop ran from 1 to 8.
        // I don't know if the value of the counter in a Pascal for...do loop
        // should
        // to be 9 or 8. I'm guessing 9, and since we use 0-based arrays,
        // using 8 below. Best inform for the guess is that dGene[7] isn't
        // altered within the routine, and using dGene[8] seems to cause endless
        // loops
        switch(this.dGene[8]) {
        case SwellType.Shrink:
            factor = 1;
            break;
        case SwellType.Same:
            factor = 0;
            break;
        case SwellType.Swell:
            factor = 1;
            break;
        }
        maxgene = this.segDistGene * this.segNoGene * factor;
    } while (maxgene > 100 || maxgene < -100);
    this.gene[8] = Monochrome.randInt(6);
}






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
function Lin(x, y, xnew, ynew, thick) {
    this.startPt = new Point(x,y); // start point of the line segment
    this.endPt = new Point(xnew,ynew); // end point of the line segment
    this.thickness = thick; // thickness of the line segment
    this.nextLin = null; // Pascal had implicit pointer to next element.
}

Lin.prototype.linToString = function() {
    return "Lin " + this.startPt.toString() + " -> " + this.endPt.toString() + " thickness " + this.thickness;
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


/*
 * Globals, line 253.
 *     Pic = RECORD
 *          BasePtr: Ptr;
 *          MovePtr: LinPtr;
 *          Origin: Point;
 *          PicSize: Integer;
 *          PicPerson: person
 *      END;
 */
function Pic(biomorph) {
    this.basePtr = null // The first Lin
    this.movePtr = null // The current Lin (used in walking the array)
    this.origin = new Point(0,0) // a Point
    this.picSize = 0 // Number of Lins
    this.picPerson = biomorph // the biomorph that this is a picture of.
    this.margin = new Rect() // used to compute bounding rectangle.
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
Pic.prototype.zeroPic = function (here) {
    if(this.basePtr != null) { 
        // Pic has lines. Walk the singly linked list all the way to the end,
        // disconnect each Lin from the next.
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
/*
 * Globals, line 28.
 */
const PICSIZEMAX = 4095


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
Pic.prototype.picLine = function(x, y, xnew, ynew, thick) {
    if(thick > 8)
        thick = 8;
    if(this.picSize >= PICSIZEMAX) {
        // {Message(GetString(TooLargeString));}
        // {used the help dialog! v1.1 changed to alert}
        alert('Biomorph too large, or other problem');
        return
    } else {
        newLin = new Lin(x, y, xnew, ynew, thick)
        if(this.basePtr == null) { // First Lin in the Pic.
            this.basePtr = newLin; // set the base pointer to the new Lin
        } else { // Pic already has at least one Lin.
            // Link the new Lin onto the Lin at end of the Pic
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


Pic.prototype.picToHtml = function() {
    var html = PicStyleType.properties[this.picStyle].name;
    return html;
}


Pic.prototype.actualLine = function(picStyle, orientation) {
    var origin = this.origin;
    var movePtr = this.movePtr;
    var drawer = this.drawer;

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

Pic.prototype.drawPic = function(place) {
    var biomorph = this.picPerson
    this.drawer = _drawerFactorySingleton.getDrawer('canvas2d', biomorph.drawer);

    var drawer = this.drawer
    drawer.save()
    drawer.translate(-place.h,-place.v)
    if(false) { // draw bounding rectangle for debugging centring
        drawer.setColor("red")
        drawer.frameRect(this.margin)
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
    drawer.penSize(biomorph.session.myPenSize);
    // {reposition at base of grabbed space}
    this.movePtr = this.basePtr;
    drawer.setColor("black");

    while(true) {
        this.actualLine(picStyle, Compass.NorthSouth); // {sometimes rangecheck error}
        if(biomorph.spokesGene == SpokesType.Radial) 
            if(biomorph.completenessGene == CompletenessType.Single) 
                this.actualLine(PicStyleType.RUD, Compass.EastWest);
            else
                this.actualLine(picStyle, Compass.EastWest);
        if(this.movePtr.nextLin == null)
            break; // Leave iteration with thisPic.movePtr pointing to the last Lin.
        // Advance to next Lin.
        this.movePtr = this.movePtr.nextLin;
    }
    drawer.penSize(1);
} // {DrawPic}
Monochrome.prototype.tree = function(x, y, lgth, dir, dx, dy, thick, oddOne, order) {
    if(dir < 0)
        dir = dir + 8
    if(dir >= 8)
        dir = dir - 8

    if(this.trickleGene < 1)
        this.trickleGene = 1;

    var xnew = x + Math.trunc(lgth * dx[dir] / this.trickleGene);
    var ynew = y + Math.trunc(lgth * dy[dir] / this.trickleGene);

    if(this.dGene[8] == SwellType.Shrink) 
        thick = lgth;
    else if(this.dGene[8] == SwellType.Swell) 
        thick = 1 + this.gene[8] - lgth; // Make thicker the shorter the segment
    else {
        thick = 1;
    }

    this.pic.picLine(x, y, xnew, ynew, thick * this.session.myPenSize);

    if(lgth > 1)
        if(oddOne) {
            
            this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, thick, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, thick, oddOne, order);
        } else {
            this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, thick, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, thick, oddOne, order);
        }
} // {tree}
/*
 Pascal original has order passed-by-reference.
 Since JavaScript passes simple types by value,
 the dirty workaround (in this and the Java edition) is to 
 return the new value for order, and pray the calling
 routine assigns the return value to order.
 */
Monochrome.prototype.plugIn = function(gene, dx, dy) {
    var order = gene[8]; 
    dx[3] = gene[0];
    dx[4] = gene[1];
    dx[5] = gene[2];
    dy[2] = gene[3];
    dy[3] = gene[4];
    dy[4] = gene[5];
    dy[5] = gene[6];
    dy[6] = gene[7];
    dx[1] = -dx[3];
    dy[1] = dy[3];
    dx[0] = -dx[4];
    dy[0] = dy[4];
    dx[7] = -dx[5];
    dy[7] = dy[5];
    dx[2] = 0;
    dx[6] = 0;
    return order;
} // {PlugIn}

var clipBoarding = false;



var theMode = Mode.Breeding;
Monochrome.prototype.develop = Biomorphs.prototype.develop;




$.widget( "dawk.gene1to9box", $.dawk.biomorph_genebox, {
    options: {
        hasGradient: true
    }
});

$.widget( "dawk.segNoGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
    },
    refresh: function() {
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
});

$.widget( "dawk.segDistGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasGradient: true,
        showSign: true
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
} );


$.widget( "dawk.completenessGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
    },
    refresh: function() {
        var properties = CompletenessType.properties[this.options.value];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
} );


/*
 * Monochrome geneboxes
 */

$.widget('dawk.monochrome_geneboxes', $.dawk.geneboxes, {
    options : {
        numGeneBoxes : 16,
    },

    updateFromCanvas: function(canvas) {
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.genebox');
        var genebox;
        for(let i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.gene1to9box("updateValue", biomorph.gene[i], biomorph.dGene[i]);
        }
        genebox = geneboxes.eq(9);
        genebox.segNoGenebox("updateValue", biomorph.segNoGene);
        genebox = geneboxes.eq(10);
        genebox.segDistGenebox("updateValue", biomorph.segDistGene, biomorph.dGene[9]);
        genebox = geneboxes.eq(11);
        genebox.completenessGenebox("updateValue", biomorph.completenessGene);
        genebox = geneboxes.eq(12);
        genebox.spokesGenebox("updateValue", biomorph.spokesGene);
        genebox = geneboxes.eq(13);
        genebox.segNoGenebox("updateValue", biomorph.trickleGene);
        genebox = geneboxes.eq(14);
        genebox.segNoGenebox("updateValue", biomorph.mutSizeGene);
        genebox = geneboxes.eq(15);
        genebox.segNoGenebox("updateValue", biomorph.mutProbGene);

    },
    _create : function(options) {
        this._super(options)
        this.element.addClass("monochromeGeneboxes");
        let template = '<div></div>'
        for(let i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            $(template).gene1to9box({
                geneboxCollection: this, 
                geneboxIndex: i + 1,
                title: geneBoxTitle}).appendTo(this.element)
        }
        
        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 10,
            title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096',
            }).appendTo(this.element);
        
        $(template).segDistGenebox({
            geneboxCollection: this, 
            geneboxIndex: 11,
            title: 'Segment Distance and Gradient Gene 10'}).appendTo(this.element);

        $(template).completenessGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
        }).appendTo(this.element);
        
        $(template).spokesGenebox({
            geneboxCollection: this,
            geneboxIndex: 13,
            }).appendTo(this.element);
        
        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 14,
            title: 'Trickle'}).appendTo(this.element);

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 15,
            title: 'Mutation Size'}).appendTo(this.element);

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 16,
            title: 'Mutation Probability'}).appendTo(this.element);
    },
    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }

});
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
        if(limbFillGene == LimbFillType.Filled) {
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
        console.error('bgcolor is undefined for backcolorgene ' + biomorph.backColorGene)
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
            if(biomorph.completenessGene == CompletenessType.Single) 
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
//type
//SwellType = (Swell, Same, Shrink);
//chromosome = array[1..9]) { INTEGER;
//CompletenessType = (Single, Double);
//SpokesType = (NorthOnly, NSouth, Radial);
//LimbType = (Stick, Oval, Rectangle);
//LimbFillType = (Open, Filled);
//person = record
//gene: chromosome;
//this.colorGene: array[1..8]) { Longint;{index in clut}
//this.backColorGene: LongInt;{index in clut}
//this.dGene: array[1..10]) { SwellType;
//this.segNoGene: INTEGER;
//this.segDistGene: INTEGER;
//this.completenessGene: CompletenessType;
//this.spokesGene: SpokesType;
//tricklegene, mutsizegene, mutprobgene: INTEGER;
//this.limbShapeGene: LimbType;
//this.limbFillGene: LimbFillType;
//this.thicknessGene: INTEGER;
//bioPicture: picHandle;
//};
var LimbType = {
        Stick: 1,
        Oval: 2,
        Rectangle: 3,
        properties: {
            1: {name: "Stick"},
            2: {name: "Oval"},
            3: {name: "Rectangle"}
        }
}

var LimbFillType = {
        Open: 1,
        Filled: 2,
        properties: {
            1: {name: "Open"},
            2: {name: "Filled"},
        }
}

/*
 * Constructor for the Colour biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort) { drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property) {
 * 'species', a string containing the name) { the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */
function ColourBiomorph(session, drawer) {
    this.session = session
    this.drawer = drawer
    this.gene = chromosome()
    this.dGene = new Array(10)
    for(let i = 0; i < 10; i++) {
        this.dGene[i] = SwellType.Same
    }
    this.segNoGene = 0
    this.segDistGene = 0
    this.completenessGene = CompletenessType.Single
    this.spokesGene = SpokesType.NorthOnly
    this.trickleGene = session.options.trickle
    this.mutSizeGene = 0
    this.mutProbGene = 0
    this.colorGene = [0,0,0,0,0,0,0,0]
    this.backColorGene = 0
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Open;
    this.thicknessGene = 1
    this.pic = new ColourPic(this)

}



ColourBiomorph.randLimbType = function() {
    switch(Monochrome.randInt(3)) {
    case 1:
        return LimbType.Stick
    case 2:
        return LimbType.Oval
    case 3:
        return LimbType.Rectangle
    }
}

ColourBiomorph.randLimbFill = function() {
    switch(Monochrome.randInt(2)) {
    case 1:
        return LimbFillType.Open
    case 2:
        return LimbFillType.Filled
    }
}

ColourBiomorph.prototype.makeGenes = function(a, b, c, d, e, f, g, h, i) {
    var trickle = this.session.options.trickle
    for(let j = 0; j < 10; j++) {
        this.dGene[j] = SwellType.Same
    }
    this.segNoGene = 1;
    this.segDistGene = 1;
    this.completenessGene = CompletenessType.Double;
    this.spokesGene = SpokesType.NorthOnly;
    this.trickleGene = trickle;
    this.mutSizeGene = Math.trunc(trickle / 2);
    this.mutProbGene = 10;
    var gene = this.gene
    gene[1] = a
    gene[2] = b
    gene[3] = c
    gene[4] = d
    gene[5] = e
    gene[6] = f
    gene[7] = g
    gene[8] = h
    gene[9] = i
}

ColourBiomorph.prototype.chess = function() {
    var trickle = this.session.options.trickle
    this.makeGenes(-trickle, 3 * trickle, -3 * trickle, -3 * trickle, trickle, -2 * trickle, 6 * trickle, -5 * trickle, 7)
    for(let j = 0; j < 8; j++) {
        this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2);
    }
    this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3);
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
    this.thicknessGene = 1;
}

ColourBiomorph.prototype.basicTree = function() {
    var trickle = this.session.options.trickle
    this.makeGenes(-trickle, -trickle, -trickle, -trickle, -trickle, 0, trickle, trickle, 6);
    for(let j = 0; j < 8; j++) {
        this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
    }
    this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    this.limbShapeGene = LimbType.Stick
    this.limbFillGene = LimbFillType.Filled
    this.thicknessGene = 1
}

ColourBiomorph.prototype.insect = function() {
    var trickle = this.session.options.trickle
    this.makeGenes(trickle, 
            trickle, 
            -4 * trickle, 
            trickle, 
            -trickle, 
            -2 * trickle, 
            8 * trickle, 
            -4 * trickle, 
            6)
    for(let j = 0; j < 8; j++)
        this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
    this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
    this.thicknessGene = 1
}



//initializes the biomorph's genotype as one) { a named set) { types.
ColourBiomorph.prototype.doPerson = function(biomorphType) {
    if(biomorphType) {
        switch(biomorphType) {
        case "Chess": this.chess(); break;
        case "BasicTree": this.basicTree(); break;
        case "Insect": this.insect(); break;
        case "New Random Start":
        default: 
            this.basicTree()
            this.doSaltation()
            break;
        }
    } else {
        this.basicTree()
        this.doSaltation()
    }
    return this;
} 
ColourBiomorph.Rainbow = 256

ColourBiomorph.prototype.randomForeColour = function() {
    for(let j = 0; j < 8; j++) {
        this.colorGene[j] = Monochrome.randInt(ColourBiomorph.Rainbow)
    }
}

ColourBiomorph.prototype.randomBackColour = function() {
    this.backColorGene = Monochrome.randInt(ColourBiomorph.Rainbow)
}

//Unlike Pascal original, uses 0-based arrays.
ColourBiomorph.prototype.doSaltation = function() {
    var mut = this.session.options.mut
    if(mut[0]) {
        this.segNoGene = Monochrome.randInt(6)
        this.segDistGene = Monochrome.randInt(20)
    } else {            
        this.segNoGene  = 1
        this.segDistGene = 1
    }
    var r = Monochrome.randInt(100)
    this.completenessGene = CompletenessType.Double
    if(mut[2]) {
        if(r < 50) 
            this.completenessGene = CompletenessType.Single
            else 
                this.completenessGene = CompletenessType.Double
    }
    r = Monochrome.randInt(100)
    if(mut[3]) {
        if(r < 33)
            this.spokesGene = SpokesType.Radial
            else if(r < 66) 
                this.spokesGene = SpokesType.NSouth
                else 
                    this.spokesGene = SpokesType.NorthOnly
    } else {
        this.spokesGene = SpokesType.NorthOnly
    }
    if(mut[4]) {
        this.trickleGene = 1 + Math.trunc(Monochrome.randInt(100) / 10)
        if(this.trickleGene > 1)
            this.mutSizeGene = Math.trunc(this.trickleGene / 2)
    }
    if(mut[9]) {
        this.randomForeColour()
    }
    if(mut[7]) {
        this.limbShapeGene = ColourBiomorph.randLimbType()
    }
    if(mut[8]) {
        this.limbFillGene = ColourBiomorph.randLimbFill()
    }
    if(mut[10]) {
        this.randomBackColour()
    }
    if(mut[11]) {
        this.thicknessGene = Monochrome.randInt(3)
    }

    var maxGene

    // Nested do straight outta Roger Emanuel Kaufman -- ABC
    for(let j = 0; j < 8; j++) do {
        if(mut[12]) {
            this.gene[j] = this.mutSizeGene * (Monochrome.randInt(19) - 10)
        }
        if(mut[1]) {
            this.dGene[j] = Monochrome.randSwell(this.dGene[j])
        } else {
            this.dGene[j] = SwellType.Same
        }
        switch(this.dGene[j]) {
        case SwellType.Shrink: {
            factor = 1
            break
        }
        case SwellType.Same: { 
            factor = 0
            break
        }
        case SwellType.Swell: {
            factor = 1
            break
        }
        }
        maxGene = this.gene[j] * this.segNoGene * factor
    } while ((maxGene > 9 * this.trickleGene) 
            || (maxGene < -9 * this.trickleGene));

    do {
        if(mut[1]) {
            this.dGene[9] = Monochrome.randSwell(this.dGene[9])
        } else {
            this.dGene[9] = SwellType.Same
        }

        var factor

        //  Pascal version used dGene[j] here, past the loop, 
        //  which is bad practice as the value of j
        //  is undefined past the loop. In fact, 
        //  in Mac Pascal, j = 9 past the loop, here
        //  decremented to 8 for 0-based arrays.
        switch(this.dGene[8]) {
        case SwellType.Shrink: {
            factor = 1
            break
        }
        case SwellType.Same: {
            factor = 0
            break
        }
        case SwellType.Swell: { 
            factor = 1
            break
        }
        }
        maxGene = this.segDistGene * this.segNoGene * factor
    } while((maxGene > 100) || (maxGene < -100));

    do {
        this.gene[8] = Monochrome.randInt(6)
    } while(this.gene[8] <= 1)
        this.dGene[8] = SwellType.Same;

}

ColourBiomorph.prototype.direction = function() {
    if(Monochrome.randInt(2) == 2) { 
        return this.mutSizeGene
    } else {
        return -this.mutSizeGene
    }
}

ColourBiomorph.prototype.direction9 = function() {
    return Monochrome.randInt(2) == 2 ? 1 : -1
}


ColourBiomorph.prototype.copyBiomorph = function(child) {
    child.gene = this.gene.slice();
    child.dGene = this.dGene.slice();
    child.segNoGene = this.segNoGene;
    child.segDistGene = this.segDistGene;
    child.completenessGene = this.completenessGene;
    child.spokesGene = this.spokesGene;
    child.trickleGene = this.trickleGene;
    child.mutSizeGene = this.mutSizeGene;
    child.mutProbGene = this.mutProbGene;
    child.colorGene = this.colorGene.slice();
    child.backColorGene = this.backColorGene;
    child.limbShapeGene = this.limbShapeGene;
    child.limbFillGene = this.limbFillGene;
    child.thicknessGene = this.thicknessGene;
    return child;
}

//creates and returns a new, mutated copy) { the biomorph.
ColourBiomorph.prototype.reproduce = function(element) {
    let child = new ColourBiomorph(this.session, element);
    this.copyBiomorph(child);
    child.mutate();
    return child;
    
}


//Register the Colour biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Colour", 
        (function(session, drawer) { return new ColourBiomorph(session, drawer)}),
        (function(session) { ColourBiomorph.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.colour_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).colour_geneboxes('updateFromCanvas', canvas)}));

ColourBiomorph.initializeMut = function(session) {
    var mut = []
    for(let i = 0; i < 13; i++) {
        mut.push(true)
    }
    session.options.mut = mut
}


ColourBiomorph.initializeSession = function(session) {
    session.options.sessionIcon = 'img/BWTreeLogoBlueThin_icl4_17669_32x32.png'
    session.options.trickle = 10
    session.options.palette = new Palette()
    session.options.basicTypes = ["BasicTree", "Chess", "Insect", "New Random Start"]
    session.options.defaultBasicType = ["New Random Start"]
    session.options.hopefulMonsterBasicType = ["New Random Start"]
    
    ColourBiomorph.initializeMut(session)
}
$.widget( "dawk.colourGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasLeftRight: false,
        hasColor: true
    },
    _launchPicker: function() {
        $(this.element).tooltip('disable')
        $('<div class="colourGenebox"></div>').colourPicker({
            colourGenebox: this.element,
            colors: this.options.colors,
            title: this.options.title,
            value: this.options.value,
            appendTo: this.element
        })

    },
    manipulate: function(event) {
        let value = $(event.target).data("value")
        $(this.element).parents('.colourGeneboxes').eq(0).colour_geneboxes(
                "manipulate",
                this.options.geneboxIndex, 
                value, 0)
                return false;

    },    
} );

$.widget('dawk.colourPicker', {
    options: {
        colourGenebox: null,
        value: '',
        title: 'Untitled Colour Picker',
        colors: []
    },
    _create: function() {
        $(this.element).addClass('colourPicker')
        this.element.attr('title', this.options.title)

        let colors = this.options.colors
        let value = this.options.value

        let colourSwatchTemplate = '<div class="colourPickerCubeSwatch"></div>'; 

        let counterFloor = 0

        let cubeDiv = $('<div class="colourPickerCubeDiv"></div>').appendTo(this.element)
        for(let cubeRow = 0; cubeRow < 6; cubeRow++) {
            let templateSlice = $('<div class="colourPickerCubeDivSlice"></div>').appendTo(cubeDiv)
            for(let i = counterFloor; i < counterFloor + 36; i++) {
                let colorswatch = $(colourSwatchTemplate)
                $(templateSlice).append(colorswatch)
                let color = colors[i]
                $(colorswatch).css('background-color', color)
                $(colorswatch).data('value', i)
                this._on(colorswatch, {click: "_colorSwatchClicked"})
                if(color == value) {
                    $(colorswatch).addClass('selected')
                }
            }
            counterFloor += 36
        }

        colourSwatchTemplate = '<div class="colourPickerRampSwatch"></div>'; 
        template = $('<div class="colourPickerRampDiv"></div>').appendTo(this.element)
        for(let i = 216; i < 256; i++) {
            let colorswatch = $(colourSwatchTemplate)
            $(template).append(colorswatch)
            let color = colors[i]
            $(colorswatch).css('background-color', color)
            $(colorswatch).data('value', i)
            this._on(colorswatch, {click: "_colorSwatchClicked"})
            if(color == value) {
                $(colorswatch).addClass('colourPickerSelected')
            }
        }
        $(this.element).append(template)

        console.log(this.options.title)
        let engineeringBox = $(this.options.appendTo).parents('.engineeringView').find('.engineeringBox').eq(0)
        $(this.element).dialog({
            width: 220,
            height: 230,
            title: this.options.title,
            draggable: true,
            modal: true,
            appendTo: this.options.appendTo,
            close: function(event, ui) {
                let colourGenebox = $(event.target).dialog("option", "appendTo")
                $(colourGenebox).tooltip('enable')    
            },
            position: {
                my: 'left top',
                at: 'left+20px top+20px',
                of: engineeringBox
            },
            offset: {
                left:20,
                right:20
            }
        })
    },
    _colorSwatchClicked: function(event) {
        $(this.options.colourGenebox).colourGenebox("manipulate", event)
    }
});

$.widget( "dawk.limbShapeGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasMid: true
    },
    refresh: function() {
        var str = this.options.value;
        var properties = LimbType.properties[str];
        if(properties != null) 
            this.element.find('.geneValue').text(properties.name);
    },
} );

$.widget( "dawk.limbFillGenebox", $.dawk.biomorph_genebox, {
    options: {
        title: 'Limb Fill'

    },
    refresh: function() {
        var str = this.options.value;
        var properties = LimbFillType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.name);
        }
    },
} );


$.widget('dawk.colour_geneboxes', $.dawk.geneboxes, {
    options : {
        numGeneBoxes : 28,
    },

    updateFromCanvas: function(canvas) {

        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.genebox');
        var genebox;
        for(let i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.gene1to9box("updateValue", biomorph.gene[i], biomorph.dGene[i]);
        }
        genebox = geneboxes.eq(9);
        genebox.segNoGenebox("updateValue", biomorph.segNoGene);
        genebox = geneboxes.eq(10);
        genebox.segDistGenebox("updateValue", biomorph.segDistGene, biomorph.dGene[9]);
        genebox = geneboxes.eq(11);
        genebox.completenessGenebox("updateValue", biomorph.completenessGene);
        genebox = geneboxes.eq(12);
        genebox.spokesGenebox("updateValue", biomorph.spokesGene);
        genebox = geneboxes.eq(13);
        genebox.segNoGenebox("updateValue", biomorph.trickleGene);
        genebox = geneboxes.eq(14);
        genebox.segNoGenebox("updateValue", biomorph.mutSizeGene);
        genebox = geneboxes.eq(15);
        genebox.segNoGenebox("updateValue", biomorph.mutProbGene);
        genebox = geneboxes.eq(16);
        genebox.segNoGenebox("updateValue", biomorph.thicknessGene);
        genebox = geneboxes.eq(17);
        genebox.limbShapeGenebox("updateValue", biomorph.limbShapeGene);
        genebox = geneboxes.eq(18);
        genebox.limbFillGenebox("updateValue", biomorph.limbFillGene);

        let colors = biomorph.session.options.palette.colors

        genebox = geneboxes.eq(19);
        genebox.colourGenebox("updateValue", colors[biomorph.backColorGene]);
        genebox = geneboxes.eq(20);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[0]]);
        genebox = geneboxes.eq(21);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[1]]);
        genebox = geneboxes.eq(22);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[2]]);
        genebox = geneboxes.eq(23);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[3]]);
        genebox = geneboxes.eq(24);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[4]]);
        genebox = geneboxes.eq(25);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[5]]);
        genebox = geneboxes.eq(26);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[6]]);
        genebox = geneboxes.eq(27);
        genebox.colourGenebox("updateValue", colors[biomorph.colorGene[7]]);
    },
    _create : function(options) {
        this._super(options)

        this.element.addClass("colourGeneboxes");
        let template = '<div></div>';
        for(let i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            $(template).gene1to9box({
                geneboxCollection: this, 
                geneboxIndex: i + 1,
                title: geneBoxTitle}).appendTo(this.element)
        }

        $(template).segNoGenebox({
            geneboxCollection: this, 
            title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096',
            geneboxIndex: 10
        }).appendTo(this.element)

        $(template).segDistGenebox({
            geneboxCollection: this, 
            title: 'Segment Distance and Gradient Gene 10',
            geneboxIndex: 11
        }).appendTo(this.element)

        $(template).completenessGenebox({
            geneboxCollection: this,
            geneboxIndex: 12
        }).appendTo(this.element)

        $(template).spokesGenebox({
            geneboxCollection: this,
            geneboxIndex: 13
        }).appendTo(this.element)

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 14,
            title: 'Trickle',
        }).appendTo(this.element)

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 15,
            title: 'Mutation Size',
        }).appendTo(this.element)

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 16,
            title: 'Mutation Probability',
        }).appendTo(this.element)

        $(template).segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 17,
            title: 'Thickness',
        }).appendTo(this.element)

        $(template).limbShapeGenebox({
            geneboxCollection: this,
            geneboxIndex: 18,
        }).appendTo(this.element)

        $(template).limbFillGenebox({
            geneboxCollection: this,
            geneboxIndex: 19,
        }).appendTo(this.element)

        let colors = this.options.session.options.palette.colors

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 20,
            colors: colors,
            title: 'Background Colour'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 21,
            colors: colors,
            title: 'Colour Gene 1'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 22,
            colors: colors,
            title: 'Colour Gene 2'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 23,
            colors: colors,
            title: 'Colour Gene 3'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 24,
            colors: colors,
            title: 'Colour Gene 4'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 25,
            colors: colors,
            title: 'Colour Gene 5'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 26,
            colors: colors,
            title: 'Colour Gene 6'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 27,
            colors: colors,
            title: 'Colour Gene 7'}).appendTo(this.element);

        $(template).colourGenebox({
            geneboxCollection: this,
            geneboxIndex: 28,
            colors: colors,
            title: 'Colour Gene 8'}).appendTo(this.element);
    },
    _destroy : function() {
        this.element.removeClass("colourGeneboxes").text("");
    },

});
//initializes the biomorph's genotype to a random set) { values
//causes the biomorph's genotype to undergo a random mutation
ColourBiomorph.prototype.mutate = function() {

    var mut = this.session.options.mut

    if(mut[6] && Monochrome.randInt(100) < this.mutProbGene) {
        this.mutProbGene += this.direction9();
        if(this.mutProbGene < 1) {
            this.mutProbGene = 1
        } else if(this.mutProbGene > 100) {
            this.mutProbGene = 100
        }
    }

    if(mut[12]) {
        for(let j = 0; j < 8; j++) 
            if(Monochrome.randInt(100) < this.mutProbGene) 
                this.gene[j] += this.direction();

        if(Monochrome.randInt(100) < this.mutProbGene)
            this.gene[8] += this.direction9();

        if(this.gene[8] < 1)
            this.gene[8] = 1;
        else if(this.gene[8] > 8)
            this.gene[8] = 8;
    }
    if(mut[9]) 
        for(let j = 0; j < 8; j++)
            if(Monochrome.randInt(100) < this.mutProbGene) {
                this.colorGene[j] = this.colorGene[j] + this.direction9();
                if((this.colorGene[j] >= ColourBiomorph.Rainbow))
                    this.colorGene[j] = ColourBiomorph.Rainbow - 1;
                if((this.colorGene[j] < 0))
                    this.colorGene[j] = 0;
            }

    if(mut[7] && Monochrome.randInt(100) < this.mutProbGene)
        this.limbShapeGene = ColourBiomorph.randLimbType();

    if(mut[8] && Monochrome.randInt(100) < this.mutProbGene)
        this.limbFillGene = ColourBiomorph.randLimbFill();

    if(mut[10] && Monochrome.randInt(100) < this.mutProbGene) {
        this.backColorGene = this.backColorGene + this.direction9()

        if(this.backColorGene >= ColourBiomorph.Rainbow) 
            this.backColorGene = ColourBiomorph.Rainbow - 1
        
        if(this.backColorGene < 0) 
            this.backColorGene = 0
    }

    if(mut[11] && Monochrome.randInt(100) < this.mutProbGene) {
        this.thicknessGene += this.direction9();
        if(this.thicknessGene < 1)
            this.thicknessGene = 1;
    }

    if(mut[0] && Monochrome.randInt(100) < this.mutProbGene) {
        this.segNoGene = this.segNoGene + this.direction9();
        if(this.segNoGene < 1) {
            this.segNoGene = 1;
        }
    }

    if(mut[1] && this.segNoGene > 1) {
        for(let j = 0; j < 8; j++)
            if(Monochrome.randInt(100) < this.mutProbGene / 2)
                this.dGene[j] = Monochrome.randSwell(this.dGene[j]);
        if(Monochrome.randInt(100) < this.mutProbGene / 2)
            this.dGene[9] = Monochrome.randSwell(this.dGene[9]);
    }

    if(mut[0] && this.segNoGene > 1 && Monochrome.randInt(100) < this.mutProbGene) {
        this.segDistGene = this.segDistGene + this.direction9()
    }


    if(mut[2] && Monochrome.randInt(100) < this.mutProbGene / 2) {
        if(this.completenessGene == CompletenessType.Single) {
            this.completenessGene = CompletenessType.Double
        } else {
            this.completenessGene = CompletenessType.Single
        }
    }

    if(mut[3] && Monochrome.randInt(100) < this.mutProbGene / 2) 
        switch(this.spokesGene) {
        case SpokesType.NorthOnly: 
            this.spokesGene = SpokesType.NSouth
            break
        case SpokesType.NSouth: 
            if(this.direction9() == 1) {
                this.spokesGene = SpokesType.Radial
            } else {
                this.spokesGene = SpokesType.NorthOnly
            }
            break
        case SpokesType.Radial: 
            this.spokesGene = SpokesType.NSouth
            break
        }

    if(mut[4] && Monochrome.randInt(100) < this.mutProbGene) {
        this.trickleGene = this.trickleGene + this.direction9();
        if(this.trickleGene < 1)
            this.trickleGene = 1
    }
    if(mut[5] && Monochrome.randInt(100) < this.mutProbGene) {
        this.mutSizeGene = this.mutSizeGene + this.direction9()
        if(this.mutSizeGene < 1)
            this.mutSizeGene = 1
    }
}
function Palette(name, colors) {
    if(name) {
        this.name = name
        if(colors) {
            this.colors = colors
        } else {
            this.colors = Palette.generateMacPalette()
        }
    } else {
        this.name = 'Classic Mac'
        this.colors = Palette.generateMacPalette()
    }
} 

Palette.allowedLevels = [ 0, 51, 102, 153, 204, 255 ]

Palette.toHex = function (number) {
    let hex = number.toString(16).toUpperCase()
    return number < 16 ? "0" + hex : hex
}

Palette.toHtmlColor = function(triple) {
    return "#" + Palette.toHex(triple[0]) + Palette.toHex(triple[1]) + Palette.toHex(triple[2]);
}

Palette.generateMacPalette = function() {
        
    var colors = []
    
    // 6x6x6 color cube
    var allowedLevels = Palette.allowedLevels
    for (let i = 0; i < 216; i++) {
        let r = Math.trunc(i / 36);
        let g = Math.trunc((i - (36 * r)) / 6);
        let b = Math.trunc(i % 6);
        colors.push(Palette.toHtmlColor([
            allowedLevels[r], 
            allowedLevels[g],
            allowedLevels[b]]));
    }
    // Red ramp
    for (let i = 216; i < 226; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([singleColorIntensity, 0, 0]))
    }
    // Green ramp
    for (let i = 226; i < 236; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([0, singleColorIntensity, 0]))
    }
    // Blue ramp
    for (let i = 236; i < 246; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([0, 0, singleColorIntensity]))
    }
    // White ramp
    for (let i = 246; i < 256; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([singleColorIntensity,
                singleColorIntensity, singleColorIntensity]))
    }
    return colors
}
ColourBiomorph.prototype.tree = function(x, y, lgth, dir, dx, dy, color, oddOne, order) {
    if(dir < 0)
        dir = dir + 8
    if(dir >= 8)
        dir = dir - 8

    var xnew = x + Math.trunc(lgth * dx[dir] / this.trickleGene);
    var ynew = y + Math.trunc(lgth * dy[dir] / this.trickleGene);

    // Classic had +1 for 1-based arrays
    let subscript = (this.gene[9] - lgth) % 8;
    
    this.pic.picLine(x, y, xnew, ynew, this.colorGene[subscript]);

    if(lgth > 1)
        if(oddOne) {
            this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, color, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, color, oddOne, order);
        } else {
            this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, color, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, color, oddOne, order);
        }
} // {tree}

// Classic used 0-based arrays for dx and dy, and 1-based for gene.
ColourBiomorph.prototype.plugIn = function(gene, dx, dy) {
    let order = gene[8];
    dx[3] = gene[0];
    dx[4] = gene[1];
    dx[5] = gene[2];
    dy[2] = gene[3];
    dy[3] = gene[4];
    dy[4] = gene[5];
    dy[5] = gene[6];
    dy[6] = gene[7];
    dx[1] = -dx[3];
    dy[1] = dy[3];
    dx[0] = -dx[4];
    dy[0] = dy[4];
    dx[7] = -dx[5];
    dy[7] = dy[5];
    dx[2] = 0;
    dx[6] = 0;
    return order;
}

//called when it is time for the biomorph to draw itself. 
ColourBiomorph.prototype.develop = Biomorphs.prototype.develop

ColourBiomorph.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
    var str = "Manipulation geneBoxIndex:" + geneboxIndex;

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
    switch(geneboxIndex) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.gene[geneboxIndex - 1] -= this.mutSizeGene;
            break;
        case HorizPos.RightThird: 
            this.gene[geneboxIndex - 1] += this.mutSizeGene;
            break;
        case HorizPos.MidThird: 
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Shrink;
                break;
            }
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.gene[8]--;
            break;
        case HorizPos.RightThird: 
            // The Pascal original incremented gene 9 unconditionally,
            // then backed off the change if the 2^gene9 times the segment
            // number gene value exceeded 4095.
            // This version does the test first, then increments gene 9 only
            // if it is safe to do so.
            var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8] + 1);
            if(sizeWorry <= WORRYMAX)
                this.gene[8]++;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[8] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[8] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[8] = SwellType.Shrink;
                break;
            }
            break;
        }
        break;
    case 10: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.segNoGene--;
            break;
        case HorizPos.MidThird: 
            break; //{No Action}
        case HorizPos.RightThird: 
            var sizeWorry = (this.segNoGene + 1) * Monochrome.twoToThe(this.gene[8]);
            if(sizeWorry <= WORRYMAX) {
                this.segNoGene++;
            }
            break;
        }
        break;
    case 11: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.segDistGene -= this.trickleGene;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[9] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[9] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[9] = SwellType.Shrink;
                break;
            }
            break;
        case HorizPos.RightThird: 
            this.segDistGene += this.trickleGene;
            break;
        }
        break;
    case 12: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.completenessGene = CompletenessType.Single;
            break;
        case HorizPos.MidThird: 
            break; // {No Action}
        case HorizPos.RightThird: 
            this.completenessGene = CompletenessType.Double;
            break;
        }
        break;
    case 13: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.spokesGene = SpokesType.NorthOnly;
            break;
        case HorizPos.MidThird: 
            this.spokesGene = SpokesType.NSouth;
            break;
        case HorizPos.RightThird: 
            this.spokesGene = SpokesType.Radial;
            break;
        }
        break;
    case 14: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.trickleGene > 1)
                this.trickleGene--;
            break;
        case HorizPos.RightThird: 
            this.trickleGene++;
            break;
        case HorizPos.MidThird: 
            break;// {No action}
        }
        break;
    case 15: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.mutSizeGene > 1)
                this.mutSizeGene--;
            break;
        case HorizPos.RightThird: 
            this.mutSizeGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
        }
        break;
    case 16: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.mutProbGene > 1) {
                this.mutProbGene--;
            }
            break;
        case HorizPos.RightThird: 
            if(this.mutProbGene < 100)
                this.mutProbGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
        }
        break
    case 17:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.thicknessGene > 1) {
                this.thicknessGene--;
            }
            break;
        case HorizPos.RightThird: 
            if(this.thicknessGene < 100)
                this.thicknessGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
        }
        break
    case 18:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.limbShapeGene = LimbType.Stick;
            break;
        case HorizPos.RightThird: 
            this.limbShapeGene = LimbType.Rectangle;
            break;
        case HorizPos.MidThird: 
            this.limbShapeGene = LimbType.Oval;
            break; // {No action}
        }
        break
    case 19: // limbFillGene
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.limbFillGene = LimbFillType.Open
            break;
        case HorizPos.RightThird: 
            this.limbFillGene = LimbFillType.Filled
            break;
        }
        break;
    case 20: // backColorGene
        this.backColorGene = leftRightPos
        break;
    case 21: 
        this.colorGene[0] = leftRightPos
        break;
    case 22: 
        this.colorGene[1] = leftRightPos
        break;
    case 23: 
        this.colorGene[2] = leftRightPos
        break;
    case 24: 
        this.colorGene[3] = leftRightPos
        break;
    case 25: 
        this.colorGene[4] = leftRightPos
        break;
    case 26: 
        this.colorGene[5] = leftRightPos
        break;
    case 27: 
        this.colorGene[6] = leftRightPos
        break;
    case 28: 
        this.colorGene[7] = leftRightPos
        break;
    }
        
    
    if(this.gene[8] < 1) {
        this.gene[8] = 1;
    }

    if(this.segNoGene < 1) {
        this.segNoGene = 1;
    }
//  Alert subscribers that the genome has changed here.
}
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

// Number.parseFloat(x).toFixed(2);
$.widget( "dawk.floatGenebox", $.dawk.biomorph_genebox, {
    _create: function(options) {
        this._super(options)
    },
    _init : function() {
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    refresh: function() {
        this.element.find('.geneValue')
        .text(String(Number.parseFloat(this.options.value).toFixed(2)));
    },    

} );

$.widget( "dawk.handednessGenebox", $.dawk.biomorph_genebox, {
    _create: function(options) {
        this._super(options)
    },
    _init : function() {
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    refresh: function() {
        this.element.find('.geneValue')
        .text(this.options.value == -1 ? 'Left' : 'Right');
    },    
} );/*
 * Geneboxes for Matthieu Triay's implementation of Blind Watchmaker Shells.
 */
$.widget('dawk.shells_geneboxes', $.dawk.geneboxes, {
    options : {
        engineering: true,
        biomorph: null,
    },
    _create : function(options) {
        this._super(options)
        this._setOptions(options);
        this.element.addClass("shellGeneboxes");
        let template = '<div></div>';

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 1,
            title: 'Opening'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 2,
            title: 'Displacement'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 3,
            title: 'Shape'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 4,
            title: 'Translation (per outline, in the direction orthogonal to that of the parent spirtal)'}).appendTo(this.element);

        $(template).handednessGenebox({
            geneboxCollection: this,
            geneboxIndex: 5,
            title: 'Handedness'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 6,
            title: 'Displacement Mutation Size'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 7,
            title: 'Translation Mutation Size'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 8,
            title: 'Coarsegraininess'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 9,
            title: 'Reach'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 10,
            title: 'Translation gradient'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 11,
            title: 'Shape mutation size'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
            title: 'Reach mutation size'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 13,
            title: 'Mutation Probability'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 14,
            title: 'Pattern'}).appendTo(this.element);
    },

    updateFromCanvas: function(canvas) {
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.genebox');
        var shell = biomorph.shell
        var genebox 
        // Opening
        genebox = geneboxes.eq(0); 
        genebox.floatGenebox("updateValue", shell.opening);
        // Displacement
        genebox = geneboxes.eq(1); 
        genebox.floatGenebox("updateValue", shell.displacement);
        // Shape
        genebox = geneboxes.eq(2); 
        genebox.floatGenebox("updateValue", shell.shape);
        // Translation
        genebox = geneboxes.eq(3); 
        genebox.floatGenebox("updateValue", shell.translation);
        // Handedness
        genebox = geneboxes.eq(4); 
        genebox.handednessGenebox("updateValue", shell.handedness);
        // Displacement mutation size
        genebox = geneboxes.eq(5); 
        genebox.floatGenebox("updateValue", shell.mutSize.displacement);
        // Translation mutation size
        genebox = geneboxes.eq(6); 
        genebox.floatGenebox("updateValue", shell.mutSize.translation);
        // Coarsegraniness
        genebox = geneboxes.eq(7); 
        genebox.biomorph_genebox("updateValue", shell.coarsegraininess);
        // Reach
        genebox = geneboxes.eq(8); 
        genebox.biomorph_genebox("updateValue", shell.reach);
        // Translation gradient
        genebox = geneboxes.eq(9); 
        genebox.floatGenebox("updateValue", shell.translationGradient);
        // Shape mutation size
        genebox = geneboxes.eq(10); 
        genebox.floatGenebox("updateValue", shell.mutSize.shape);
        // Reach mutation size
        genebox = geneboxes.eq(11); 
        genebox.floatGenebox("updateValue", shell.mutSize.reach);
        // Mutation probability
        genebox = geneboxes.eq(12); 
        genebox.biomorph_genebox("updateValue", shell.mutProbGene);
        // Pattern
        genebox = geneboxes.eq(13); 
        genebox.biomorph_genebox("updateValue", shell.pattern);
    },
});
/*
 * Constructor for the Triay Shell biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort of drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property of
 * 'species', a string containing the name of the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */

function Shells(session, drawer) {
    this.session = session
    this.drawer = drawer
}

Shells.initializeSession = function(session) {
    session.options['sessionIcon'] = 'img/SnailLogoBlackBackground_icl4_17669_32x32.png'
    session.options.basicTypes = [
        "Hopeful Monster",
        "BasicSnail",
        "Babylon",
        "Angel",
        "Oyster",
        "Bivalve",
        "Cone",
        "Scallop",
        "Eloise",
        "Gallaghers",
        "Rapa",
        "Fig",
        "RazorShell",
        "JapaneseWonder"]
    session.options.defaultView = 'Engineering'
    session.options.defaultBasicType = "Hopeful Monster"
    session.options.hopefulMonsterBasicType = "Hopeful Monster"

}

//initializes the biomorph's genotype as one of a named set of types.
Shells.prototype.doPerson = function(morphType) {
    var genes = null
    if(morphType) {
        genes = (new ShellHardcodedAnimals())[morphType]
    }
    var drawer = this.drawer
    this.shell = new Shell(drawer.getContext('2d'), 
            drawer.width,
            drawer.height,
            genes)
    // Artificially jacked up for demonstration purposes. Normal value is 10. -- ABC
//  this.shell.mutProbGene = 100

} 
Shells.prototype.doSaltation = function() {
    this.shell.randomize()
}
//initializes the biomorph's genotype to a random set of values
//causes the biomorph's genotype to undergo a random mutation
Shells.prototype.mutate = function() {
}
//creates and returns a new, mutated copy of the biomorph.
Shells.prototype.reproduce = function(element) {
    var child = new Shells(this.session, element)
    child.shell = this.shell.breed(element)
    return child
}
//called when it is time for the biomorph to draw itself. 
Shells.prototype.develop = function() {
//    alert('Shells.develop')
    this.shell.generate()
    this.shell.ctx = this.drawer.getContext('2d')
    this.shell.draw()
}

Shells.prototype.copyBiomorph = function(child) {
    child.shell = new Shell (child.drawer.getContext('2d'), child.drawer.width, child.drawer.height, this.shell)
}

Shells.margarine = function (w, direction) {
    // {we want to change by large amounts when low, small amounts when large}
    var wMutSize = 0.1
    var logged = Math.log(w)
    var logchanged = logged + wMutSize * direction
    if(logchanged > 20) {
        logchanged = 20
    }
    var m = Math.exp(logchanged)

    if(m < 1) {
        m = 1
    }
    return m
}

Shells.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
    // geneboxIndex is one-based
    var str = "Manipulation one-based geneBoxIndex:" + geneboxIndex;

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
    var shell = this.shell
    switch(geneboxIndex) {
    case 1:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.opening = Shells.margarine(shell.opening, -1)
            break;
        case HorizPos.RightThird: 
            shell.opening = Shells.margarine(shell.opening, 1)
            break;
        }
        break;;
    case 2:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.displacement -= shell.mutSize.displacement
            break;
        case HorizPos.RightThird: 
            shell.displacement += shell.mutSize.displacement
            break;
        }
        break;;
    case 3:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.shape -= shell.mutSize.shape
            break;
        case HorizPos.RightThird: 
            shell.shape += shell.mutSize.shape
            break;
        }
        break;;
    case 4:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.translation -= shell.mutSize.translation
            break;
        case HorizPos.RightThird: 
            shell.translation += shell.mutSize.translation
            break;
        }
        break;
    case 5:
        shell.handedness = -shell.handedness
        break;
    case 6:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.mutSize.displacement -= 0.1
            break;
        case HorizPos.RightThird: 
            shell.mutSize.displacement += 0.1
            break;
        }
        break;
    case 7:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.mutSize.translation -= 0.1
            break;
        case HorizPos.RightThird: 
            shell.mutSize.translation += 0.1
            break;
        }
        break;
    case 8:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.coarsegraininess--
            break;
        case HorizPos.RightThird: 
            shell.coarsegraininess++
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.reach > 1) {
                shell.reach--
            }
            break;
        case HorizPos.RightThird: 
            shell.reach++
            break;
        }
        break;
    case 10:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.translationGradient = Shells.margarine(shell.translationGradient, -1)
            break;
        case HorizPos.RightThird: 
            shell.translationGradient = Shells.margarine(shell.translationGradient, 1)
            break;
        }
        break;
    case 11:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.mutSize.shape > 0) {
                shell.mutSize.shape--
            }
            break;
        case HorizPos.RightThird: 
            shell.mutSize.shape++
            break;
        }
        break;
    case 12:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.mutSize.reach > 1) {
                shell.mutSize.reach--
            }
            break;
        case HorizPos.RightThird: 
            shell.mutSize.reach++
            break;
        }
        break;
    case 13:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(shell.mutProbGene > 1) {
                shell.mutProbGene--
            }
            break;
        case HorizPos.RightThird:
            if(shell.mutProbGene < 100) {
                shell.mutProbGene++
            }
            break;
        }
        break;
    case 14:
        var keys = Object.keys(Shell.patterns)
        keys.push('circle')
        var pattern
        for(let i = 0; i < keys.length; i++) {
            if(keys[i] == shell.pattern) {
                pattern = i
                break
            }
        }
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(pattern > -1) {
                pattern--
                if(pattern < 0) {
                    pattern = keys.length - 1
                }
            }
            break;
        case HorizPos.RightThird: 
            if(pattern < keys.length - 1) { 
                pattern++
            } else {
                pattern = 0
            }
            break;
        }
        shell.pattern = keys[pattern]
//        alert("Pattern " + pattern + ":" + shell.pattern)
        break;
    }
    
    if(shell.displacement < 0) {
        shell.displacement = 0
    } else if(shell.displacement > 100) {
        shell.displacement = 100
    }
    
}

//Register the species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Triay Shell", 
        (function(session, drawer) { return new Shells(session, drawer)}),
        (function(session) { Shells.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.shells_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).shells_geneboxes('updateFromCanvas', canvas)}));

//A shell is a set of genes which control roughly what Dawkins called
//flare, spire and verm, as discussed in Climbing Mount Improbable. 
//There are other genes which modify the behaviour of these.
//It's modeled around the idea of a spiraling tube. The genes determine how the 
//spiral unfolds, and at each stop, draws a given pattern (circle, or others).
//The naming comes from the original code
//- pattern: string which says what shape will be repeated and distorted
//- opening: called "flare" in the book, determines the speed at which the tube's diameter expands
//- displacement: called "verm" in the book, determines how close together the tube's whorls are
//- translation: called "spire" in the book, determines how much the tube piles on itself (the height)
//- coarsegraininess: how often is the pattern repeated along the spiral
//- reach: how much the spiral coils
//- handedness: wether the shells faces left or right
//- shape: how much the shell pattern gets distorted
//- translationGradient: modifies the translation's "easing"
//Additionally, we pass in an HTML5 canvas context, and width and height of the canvas
//The genes are optional (you'll get a random shell). 

function Shell (ctx, width, height, genes) {
    this.children = []
    this.canvasWidth = width
    this.canvasHeight = height

    this.centre = { x: Math.round(this.canvasWidth/2), y: Math.round(this.canvasHeight/2) }
    this.origin = { x: this.centre.x, y: this.centre.y }

    // How much and how often the genes mutate is set per shell
    // as it was in the original code
    this.mutProbGene = 10
    this.mutSize = {
            displacement: 0.2,
            translation: 0.8,
            shape: 1,
            reach: 1
    }

    this.segments = []
    this.nbSegments = 0
    this.ctx = ctx

    this.type = 'shell';

    if (genes) {
        this.opening = genes.opening
        this.displacement = genes.displacement
        this.shape = genes.shape
        this.translation = genes.translation
        this.coarsegraininess = genes.coarsegraininess
        this.reach = genes.reach
        this.pattern = genes.pattern
        this.handedness = genes.handedness
        this.translationGradient = genes.translationGradient
        if(genes.mutSize) {
            this.mutSize = {
                    displacement: genes.mutSize.displacement,
                    translation: genes.mutSize.translation,
                    shape: genes.mutSize.shape,
                    reach: genes.mutSize.reach
            }
        }
        this.mutProbGene = genes.mutProbGene
        this.generate()
    }
    else {
        this.randomize()
    }
}

Shell.prototype.randomize = function () {
    var genes = Shell.randomGenes()
    this.opening = genes.opening
    this.displacement = genes.displacement
    this.shape = genes.shape
    this.translation = genes.translation
    this.coarsegraininess = genes.coarsegraininess
    this.reach = genes.reach
    this.pattern = genes.pattern
    this.handedness = genes.handedness
    this.translationGradient = genes.translationGradient

    this.generate()
}

Shell.prototype.resetCentre = function () {
    this.centre = { x: this.origin.x, y: this.origin.y }

}

Shell.random = function(lower, upper) {
    return Math.random() * (upper - lower) + lower
}

Shell.randInt = function(lower, upper) {
    return Math.trunc(Math.random() * (upper - lower)) + lower
}

Shell.randomSign = function() {
    if(Math.random() < 0.5) return -1
    else return 1;
}

function ShellHardcodedAnimals() {

    return {
        BasicSnail: {
            opening: Shell.random(1.5, 6.50),
            displacement: Shell.random(0, 0.1),
            shape: Shell.random(0.8, 1.8),
            translation: Shell.random(0, 4),
            coarsegraininess: Shell.randInt(4, 8),
            reach: Shell.randInt(3, 5),
            pattern: "circle",
            handedness: Shell.randomSign(),
            translationGradient: 1,
        },
        Babylon: {
            opening: Shell.random(100, 1000),
            displacement: Shell.random(0, 0.25),
            shape: Shell.random(2, 5),
            translation:Shell.random(0, 0.3),
            coarsegraininess: Shell.randInt(1, 3),
            reach: Shell.randInt(2, 3),
            pattern: "babylon",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(1, 8),
        },
        Angel: {
            opening: Shell.random(100, 1000),
            displacement: Shell.random(0, 0.25),
            shape: Shell.random(2, 5),
            translation:Shell.random(0, 0.3),
            coarsegraininess: Shell.randInt(1, 3),
            reach: Shell.randInt(2, 3),
            pattern: "angel",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(1, 8),
        },
        Oyster: {
            opening: Shell.random(100, 1000),
            displacement: Shell.random(0, 0.2),
            shape: Shell.random(2, 5),
            translation: Shell.random(0, 1.5),
            coarsegraininess: Shell.randInt(3, 4),
            reach: Shell.randInt(2, 3),
            pattern: "oyster",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(0.5, 1.5),
        },

        // BIVALVE AND BRACHIOPOD Shell.random
        Bivalve: {
            opening: Shell.random(20, 1000),
            displacement: Shell.random(0, 0.25),
            shape: Shell.random(1.5, 4),
            translation:Shell.random(0, 0.3),
            coarsegraininess: Shell.randInt(1, 3),
            reach: Shell.randInt(2, 4),
            pattern: "circle",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(1, 5),
        },
        Cone: {
            opening: Shell.random(1.3, 5),
            displacement: Shell.random(0, 0.5),
            shape: Shell.random(1, 5),
            translation: Shell.random(2.5, 4.5),
            coarsegraininess: Shell.randInt(2, 5),
            reach: Shell.randInt(2, 7),
            pattern: "whelk",
            handedness: Shell.randomSign(),
            translationGradient: 1,
        },
        Scallop: {
            opening: Shell.random(100, 1000),
            displacement: 0,
            shape: Shell.random(1, 6),
            translation: Shell.random(0, 1),
            coarsegraininess: Shell.randInt(2, 4),
            reach: 3,
            pattern: "scallop",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(0, 2),
        },
        Eloise: {
            opening: Shell.random(1.3, 2.5),
            displacement: Shell.random(0, 0.3),
            shape: Shell.random(1.5, 2),
            translation: Shell.random(1.5, 3),
            coarsegraininess: Shell.randInt(2, 5),
            reach: Shell.randInt(2, 5),
            pattern: "eloise",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(1, 2),
        },
        Gallaghers: {
            opening: Shell.random(1.4, 2),
            displacement: Shell.random(0, 0.1),
            shape: Shell.random(1.4, 2),
            translation: Shell.random(2, 6),
            coarsegraininess: Shell.randInt(3, 5),
            reach: Shell.randInt(3, 6),
            pattern: "gallaghers",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(0.5, 1),
        },
        Rapa: {
            opening: Shell.random(1.4, 6),
            displacement: Shell.random(0, 0.12),
            shape: Shell.random(1.8, 2.7),
            translation: Shell.random(0.1, 2.6),
            coarsegraininess: Shell.randInt(3, 6),
            reach: 9,
            pattern: "rapa",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(0.8, 1.5),
        },
        Lightning: {
            opening: Shell.random(1.4, 2.2),
            displacement: Shell.random(0, 0.3),
            shape: Shell.random(2.5, 5),
            translation: Shell.random(2, 4.5),
            coarsegraininess: Shell.randInt(3, 6),
            reach: Shell.randInt(2, 6),
            pattern: "lightning",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(0.8, 1.2),
        },
        Fig: {
            opening: Shell.random(1.5, 4),
            displacement: Shell.random(0, 0.1),
            shape: Shell.random(2, 4),
            translation: Shell.random(0, 4),
            coarsegraininess: Shell.randInt(2, 4),
            reach: Shell.randInt(3, 8),
            pattern: "tun",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(0.9, 1.1),
        },
        RazorShell: {
            opening: Shell.random(100, 1000),
            displacement: -0.15,
            shape: Shell.random(4, 6),
            translation: Shell.random(4, 6.2),
            coarsegraininess: Shell.randInt(2, 3),
            reach: Shell.randInt(1, 3),
            pattern: "razor",
            handedness: Shell.randomSign(),
            translationGradient: 1,
        },
        JapaneseWonder: {
            opening: Shell.random(1.4, 2),
            displacement: Shell.random(-0.2, 0.05),
            shape: Shell.random(1, 3),
            translation: Shell.random(3.5, 6),
            coarsegraininess: Shell.randInt(2, 5),
            reach: Shell.randInt(6, 10),
            pattern: "wonder",
            handedness: Shell.randomSign(),
            translationGradient: Shell.random(0.9, 1.2),
        }
    }
}

//This produces a random set of genes which have visually
//pleasing characteristics (most of the time)
//Each shape has a different set of boundaries to make them look better
Shell.randomGenes = function () {
    var hardcodedAnimals = new ShellHardcodedAnimals()
    var choices = [
        hardcodedAnimals['BasicSnail'], 
        hardcodedAnimals['Babylon'],
        hardcodedAnimals['Angel'],
        hardcodedAnimals['Oyster'],
        hardcodedAnimals['Bivalve'],
        hardcodedAnimals['Cone'],
        hardcodedAnimals['Scallop'],
        hardcodedAnimals['Eloise'], 
        hardcodedAnimals['Gallaghers'], 
        hardcodedAnimals['Rapa'], 
        hardcodedAnimals['Lightning'], 
        hardcodedAnimals['Fig'], 
        hardcodedAnimals['RazorShell'],
        hardcodedAnimals['JapaneseWonder']]
    //Babylon and Angel aren't used because they're very similar to Bivalves
    return choices[Math.trunc(Math.random() * choices.length)]
}

//This is a hash of patterns. Each shape is a set of 2D coordinates relative to the first point.
//There are also w and h which are the original height and width of the shape (to allow scaling)
//These patterns can be used instead of circles to draw the shells.
Shell.patterns = {
        whelk: {points:[[0.22100000000000364,793.123],[79.92,-101.91],[103.64,-230.23],[61.47,-328.6],[91.36,-484.13],[132.64,-522.82],[132.64,-530.73],[169.55,-565.84],[175.71,-565.84],[264.44,-655.47],[361.13,-708.19],[415.59,-793.44],[492.93,-774.98],[499.94,-718.73],[558.82,-637.91],[624.73,-571.11],[637.91,-565.84],[673.02,-445.48],[649.29,-302.24],[594.84,-224.05],[552.66,-180.99],[545.65,-180.15],[504.31,-138.81],[235.44,3.53],[216.99,52.72],[181.88,-8.8],[97.53,-31.63]],w:673.02,h:846.16},
        wonder: {points:[[318.977,-0.3160000000000025],[-59.25,58.5],[-119.25,123.75],[-185.25,245.25],[-209.25,287.25],[-244.5,390],[-269.25,576],[-276,739.5],[-288,779.25],[-318.75,845.25],[-194.25,836.25],[-142.5,821.25],[-120.75,804],[-98.25,776.25],[-53.25,704.25],[15,615.75],[75,537.75],[135,440.25],[195.75,333.75],[249.75,243.75],[284.25,177],[307.5,144],[307.5,134.25],[294,121.5]],w:626.25,h:845.25},
        rapa: {points:[[215.622,22.551000000000002],[30.43,12.48],[83.49,60.09],[83.49,91.3],[72.57,120.95],[29.65,185.72],[-35.89,262.97],[-71.79,355.82],[-88.95,378.45],[-88.95,480.67],[-83.49,493.15],[-88.95,535.29],[-131.87,618],[-144.36,636.73],[-161.52,666.38],[-186.5,726.46],[-209.9,797.48],[-216.93,810.74],[-184.93,822.38],[-120.17,815.42],[-95.98,781.09],[-88.96,741.29],[-66.71,720.23],[-35.12,640.63],[-17.94,624.25],[-17.94,593.03],[-30.43,575.87],[7.02,564.16],[32.77,545.44],[52.28,554.01],[62.42,527.49],[97.54,515.78],[125.63,536.07],[125.63,505.64],[159.96,490.81],[191.95,504.08],[187.14,476.38],[221.61,460.38],[252.04,475.21],[247.36,447.12],[277.79,419.81],[301.98,426.83],[288.71,411.19],[319.14,380.79],[344.11,378.45],[330.44,366.56],[354.26,335.53],[372.99,343.34],[361.28,326.17],[372.99,269.99],[398.74,271.55],[378.45,240.34],[379.23,228.63],[404.2,230.97],[381.57,205.22],[379.23,188.05],[404.2,185.72],[373.77,170.89],[368.3,151.38],[386.25,142.8],[362.06,135.77],[348.02,120.95],[360.5,99.1],[340.21,110.8],[323.05,95.98],[330.85,71.01],[308.22,81.94],[296.52,49.94],[263.74,53.06],[246.58,47.6],[244.24,30.44],[217.7,36.68],[198.98,25.75],[197.42,4.69],[181.81,12.49],[161.52,11.71],[131.09,0],[115.49,-22.87],[100.66,-11.7]],w:621.12,h:845.25},
        tun: {points:[[130.995,-0.3160000000000025],[27.8,22.93],[52.02,40.59],[66.37,65.98],[66.37,134.14],[47.53,191.55],[10.76,247.16],[-24.22,282.13],[-52.92,318.91],[-63.69,339.54],[-71.75,348.51],[-66.38,498.29],[-66.38,696.51],[-85.21,750.32],[-97.77,787.1],[-113.02,807.73],[-119.29,824.77],[-130.95,839.12],[-130.95,845.25],[-109.42,837.32],[-98.66,829.25],[-47.54,819.39],[-32.29,809.52],[-1.8,786.2],[33.18,754.81],[90.59,702.79],[161.44,622.96],[198.22,579.91],[229.6,544.93],[286.11,447.17],[314.81,361.06],[324.68,296.49],[310.33,194.24],[291.49,139.53],[254.72,101.85],[241.27,96.48],[214.36,71.36],[166.82,47.14],[96.87,17.55],[50.23,4.99]],w:455.63,h:845.25},
        gallaghers: {points:[[294.727,-0.0660000000000025],[-60.75,60],[-95.25,122.25],[-109.5,163.5],[-138.75,192],[-157.5,237],[-177,259.5],[-181.5,317.25],[-169.5,409.5],[-174,553.5],[-194.25,615],[-229.5,648],[-243,674.25],[-261.75,717],[-277.5,775.5],[-295.5,796.5],[-295.5,806.25],[-270.75,798],[-219.75,818.25],[-193.5,840.75],[-177,840.75],[-127.5,787.5],[-122.25,774.75],[-102.75,756.75],[-60,733.5],[-30,725.25],[-17.25,719.25],[18.75,684.75],[66,666.75],[83.25,649.5],[127.5,501.75],[143.25,486.75],[143.25,473.25],[135.75,462.75],[162,445.5],[162,413.25],[149.25,402],[150,354],[167.25,337.5],[167.25,312.75],[155.25,299.25],[155.25,288],[167.25,264],[161.25,233.25],[144.75,223.5],[117.75,184.5],[113.25,164.25],[97.5,153],[75.75,84],[69,71.25],[48,49.5],[39.75,23.25],[24,6.75]],w:462.75,h:840.75},
        eloise: {points:[[353.773,-0.09300000000001774],[18.16,70.68],[5.19,211.68],[-19.9,284.34],[-58.82,345.76],[-143.6,455.62],[-226.64,516.17],[-298.44,586.24],[-323.52,642.46],[-341.69,658.9],[-354.66,690.91],[-340.82,740.55],[-269.03,816.34],[-183.39,838.83],[-141,844.29],[-83.91,826.71],[0,780],[49.3,741.72],[132.34,639],[167.81,534.34],[185.11,412.37],[185.11,359.6],[172.13,254.07],[150.51,154.59],[130.62,104.41],[111.59,74.14],[64.01,25.69],[29.41,10.13]],w:539.78,h:844.29},
        scallop: {points:[[-0.35900000000000887,293.629],[22.83,-34.26],[110.72,-58.88],[123.89,-71.16],[163.43,-161.69],[186.26,-185.41],[205.61,-209.14],[251.26,-232.86],[314.53,-267.13],[337.41,-278.56],[427.88,-292.59],[463.93,-293.49],[601.01,-266.23],[695.9,-202.13],[737.18,-165.22],[779.36,-114.24],[846.15,31.64],[846.15,212.62],[791.64,374.32],[715.2,452.5],[702.02,470.05],[568.48,548.29],[504.32,554.41],[417.33,554.41],[285.54,541.23],[241.62,513.13],[204.72,475.33],[159.9,412.96],[126.53,354.97],[109.82,337.41],[28.1,300.51],[22.83,288.17],[0,265.34]],w:846.15,h:847.89},
        lightning: {points:[[144.80399999999997,-0.8640000000000043],[11.7,22.63],[15.61,37.45],[0,87.39],[-24.97,107.68],[-49.16,150.6],[-67.1,181.03],[-84.27,197.41],[-84.27,216.93],[-79.59,235.65],[-97.53,260.62],[-104.56,314.45],[-104.56,337.09],[-80.37,379.22],[-80.37,433.84],[-117.82,551.66],[-132.65,614.87],[-145.13,789.66],[-145.13,847.39],[-133.43,835.7],[-112.36,841.16],[-87.39,832.57],[-78.81,815.4],[-71.78,717.87],[-43.69,604.72],[5.47,479.09],[23.41,448.66],[101.44,371.41],[124.85,329.27],[161.53,281.68],[179.47,189.6],[190.4,122.5],[190.4,79.58],[166.99,60.07],[153.72,65.53],[138.9,49.93],[93.64,35.88],[28.09,0]],w:335.53,h:847.39},
        razor: {points:[[175.09900000000005,-0.09500000000001307],[23.72,19.82],[47.45,106.81],[69.8,233.34],[81.72,358.49],[93.53,582.55],[93.53,781.63],[82.66,799.39],[63.89,816.84],[51.34,823.8],[15.82,836.29],[-20.77,846.52],[-63.27,846.15],[-79.08,832.96],[-93.63,813.57],[-110.4,779.94],[-123.26,748.31],[-134.81,706.13],[-145.98,652.46],[-157.53,574.33],[-166.07,519.29],[-175.35,431.04],[-175.66,251.42],[-169.39,202.34],[-156.53,142.02],[-143.34,104.8],[-128.22,86.04],[-122.94,73.49],[-110.4,67.9],[-104.81,61.31],[-54.09,54.72],[-29.37,42.17],[-8.59,20.77],[-2.32,9.28]],w:269.19,h:846.52},
        babylon: {points:[[261.341,17.070999999999984],[-21.07,23.41],[-34.33,28.09],[-148.26,245.8],[-224.73,407.32],[-243.45,444.77],[-262.18,500.18],[-262.18,531.39],[-252.04,648.43],[-218.49,715.54],[-172.45,763.14],[-117.05,799.03],[43.69,827.13],[81.15,827.13],[170.1,802.16],[321.48,699.93],[409.66,613.32],[455.7,494.71],[462.72,390.93],[451.01,335.53],[403.42,239.55],[351.14,169.33],[280.13,96.76],[266.08,89.73],[240.34,70.23],[213.8,47.6],[146.7,7.02],[109.24,-11.7],[84.27,-17.16],[60.09,-10.14]],w:724.9,h:844.29},
        oyster: {points:[[-0.46699999999998454,42.03999999999998],[39.01,41.36],[73.34,71.01],[81.93,92.07],[110.8,120.17],[137.33,135.77],[175.57,172.44],[205.22,201.32],[231.75,245.8],[240.33,275.44],[236.43,328.51],[203.66,432.29],[175.57,470.52],[145.13,528.26],[126.41,548.55],[101.44,578.98],[71.79,658.58],[88.95,681.2],[95.98,715.53],[84.27,767.82],[66.33,789.66],[66.33,799.03],[108.46,802.16],[230.97,778.74],[317.58,690.57],[348.8,643.75],[414.34,522.8],[442.43,419.8],[461.16,327.72],[451.02,245.01],[419.02,177.91],[390.15,137.34],[354.26,111.58],[295.74,53.84],[177.91,0],[103.78,-29.65],[60.86,-42.13],[34.33,-35.11],[14.04,-18.72]],w:461.16,h:844.29},
        angel: {points:[[582.789,-0.09300000000001774],[-24.22,23.09],[-57.09,47.32],[-179.06,119.98],[-246.53,161.5],[-286.32,185.72],[-377.16,252.32],[-447.22,318.07],[-508.64,375.16],[-519.02,379.48],[-559.68,468.58],[-583.03,530.86],[-576.11,630.34],[-532.86,708.19],[-438.57,804.21],[-352.07,844.29],[-136.68,844.29],[-6.06,820.64],[84.77,765.29],[162.62,686.57],[229.23,610.44],[262.97,506.64],[262.97,400.24],[237.88,303.36],[184.25,207.34],[132.34,139.01],[101.21,104.4]],w:846,h:844.29},
}

//To draw the shell, we first have to generate all the bounding boxes along
//the spiral. The pattern is then scaled to fit these boxes and drawn
//Width and height are optional and useful if the canvas has changed size
Shell.prototype.generate = function (width, height) {

    if (width && height) {

        this.canvasWidth = width
        this.canvasHeight = height

        this.origin.x = Math.round(width/2)
        this.origin.y = Math.round(height/2)
    }

    this.resetCentre()

    this.segments = []

    // The variable naming comes from the original problem
    // Must admit, not everything is clear to me at the moment
    var size = 0.8
    var denom = 136 * size
    var r = 3
    var rad = 100
    var mnx = Math.round(-(100 / denom) * this.centre.x * 1.088)
    var mny = Math.round(-(100 / denom) * this.centre.y * 1.088)
    var rad1 = 1.088 * (rad + rad * this.displacement) / 2
    var rad2 = 1.088 * (rad - rad * this.displacement) / 2
    var start = this.reach * 360 // constant
    var m = start // gets altered on every turn of the loop

    var p, fw, t, i, grunge, xc, yc, xr, yr, h, g, f, k
    var lastH, lastG, lastF, lastK

    // Overview: m is based on the reach, so the number of rotation the spiral will do
    // m is altered on every turn of the loop by removing the coarsegraininess
    // This basically defines how many points we're covering on the spiral
    // This loop builds all the boxes along the spiral with the right amount of
    // distortion and sizing to produce the nice depth effect

    while (m >= 0) {

        p = (start - (start - m) * (1 - this.translationGradient)) / start
        t = this.translation * p

        i = m / 360
        fw = Math.exp(-i * Math.log(this.opening))
        grunge = fw * Math.cos(2 * Math.PI * i)

        xc = this.handedness * (rad1 * grunge)
        yc = -rad1 * t * (1 - fw)
        xr = this.handedness * (rad2 * grunge)
        yr = -rad2 * fw * this.shape // the minus signs are to invert the whole snail

        // We use rounded coordinates to make canvas happier
        h = Math.round(yc - yr - mny)
        g = Math.round(xc - xr - mnx)
        f = Math.round(yc + yr - mny)
        k = Math.round(xc + xr - mnx)

        // There seem to be a lot of repetition at the beginning of the algorithm
        // This skips the same boxes which would be drawn over
        // TODO: ensuite the surface is worth drawing at all!
        if (lastH !== h || lastG !== g || lastF !== f || lastK !== k) {
            this.segments.push({ startX: g, startY: f, endX: k, endY: h })

            lastH = h
            lastG = g
            lastF = f
            lastK = k
        }

        m = m - this.coarsegraininess
    }

    this.nbSegments = this.segments.length

    this.setBoundingBox() // Calculate top/bottom

    this.translate(this.horizontalOffset(), this.verticalOffset()) // recentre shell

    this.scaleToBox(0.8) // Make sure the shell fits in the box
}

//Stretches a shape to make it fit in a rectangle of w x h
//invert = -1 or 1 to invert the coordinates (handedness)
Shell.scaleToRect = function (shape, w, h, invert) {

    // Calculate ratios of sizeWeWant/sizeItWas
    var wRatio = w/shape.w
    var hRatio = h/shape.h

    // Scale every point in the shape by the the ratios (creates a new array)
    var scaled = []

    for(let i = 0; i < shape.points.length; i++) 
        scaled.push([shape.points[i][0] * wRatio * invert, shape.points[i][1] * hRatio])
        return scaled
}

Shell.prototype.verticalOffset = function () {

    var top = this.centre.y - this.box.top
    var bottom = this.box.bottom - this.centre.y

    return (top - bottom)/2
}

Shell.prototype.horizontalOffset = function () {

    var left = this.centre.x - this.box.left
    var right = this.box.right - this.centre.x

    return (left - right)/2
}

Shell.prototype.scaleToBox = function (ratio) {

    if (this.box.width > this.canvasWidth * ratio || this.box.height > this.canvasHeight * ratio) {
        var scale = Math.min((this.canvasWidth * ratio)/this.box.width, (this.canvasHeight * ratio)/this.box.height)
        this.scale(scale)
        this.translate(this.origin.x * (1 - scale), this.origin.y * (1 - scale))

        this.setBoundingBox()
    }
}

Shell.prototype.scale = function (scale) {

    this.centre.x = this.centre.x * scale
    this.centre.y = this.centre.y * scale

    var segment

    for (var i = 0; i < this.segments.length; i++) {
        segment = this.segments[i]

        segment.startX = segment.startX * scale
        segment.startY = segment.startY * scale
        segment.endX = segment.endX * scale
        segment.endY = segment.endY * scale
    }
}

Shell.prototype.translate = function (offsetX, offsetY) {

    var segment

    this.centre.x += offsetX
    this.centre.y += offsetY

    for (var i = 0; i < this.segments.length; i++) {
        segment = this.segments[i]

        segment.startX += offsetX
        segment.startY += offsetY
        segment.endX += offsetX
        segment.endY += offsetY
    }
}

//Calculates the width/height and corner coordinates of the shell
//Useful to place multiple shells on a single canvas
Shell.prototype.setBoundingBox = function () {

    var segment
    var box = {
            left: Math.min(this.segments[0].startX, this.segments[0].endX),
            top: Math.min(this.segments[0].startY, this.segments[0].endY),
            right: Math.max(this.segments[0].startX, this.segments[0].endX),
            bottom: Math.max(this.segments[0].startY, this.segments[0].endY),
    }

    for (var i = 0; i < this.segments.length; i++) {
        segment = this.segments[i]

        if (segment.startX < box.left) {
            box.left = segment.startX
        }
        if (segment.startY < box.top) {
            box.top = segment.startY
        }
        if (segment.startX > box.right) {
            box.right = segment.startX
        }
        if (segment.startY > box.bottom) {
            box.bottom = segment.startY
        }

        if (segment.endX < box.left) {
            box.left = segment.endX
        }
        if (segment.endY < box.top) {
            box.top = segment.endY
        }
        if (segment.endX > box.right) {
            box.right = segment.endX
        }
        if (segment.endY > box.bottom) {
            box.bottom = segment.endY
        }
    }

    box.width = box.right - box.left
    box.height = box.bottom - box.top

    this.halfWidth = box.width/2
    this.halfHeight = box.height/2

    this.box = box
}

//For each box generated, this has to be called to draw the pattern
//with the right dimensions
Shell.prototype.drawPattern = function (segment, index) {

    // Height and width for the box
    // Generates a box and center coord of that box
    var w = Math.abs(segment.endX - segment.startX)
    var h = Math.abs(segment.endY - segment.startY)
    var rX = w/2
    var rY = h/2

    var thinThreshold = Math.floor(this.segments.length * 7 / 8)
    var thin = (w < 20 || h < 20)

    // If the box is too small we're going to draw an ellipse or a line
    // whatever the original pattern we've decided (it would be too small to tell)

    if (this.pattern === "circle" || (index < thinThreshold && thin)) {

        // If there's no width, let's draw a line!
        if (w === 0) {
            this.ctx.moveTo(segment.startX, segment.startY)
            this.ctx.lineTo(segment.endX, segment.endY)
        }
        else {

            // From http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
            var x = Math.min(segment.startX, segment.endX)
            var y = Math.min(segment.startY, segment.endY)
            var kappa = .5522848,
            ox = rX * kappa, // control point offset horizontal
            oy = rY * kappa, // control point offset vertical
            xe = x + w, // x-end
            ye = y + h, // y-end
            xm = x + w / 2, // x-middle
            ym = y + h / 2; // y-middle

            this.ctx.moveTo(x, ym)
            this.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
            this.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
            this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
            this.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
        }
    }
    else {

        // Getting the scaled pattern points
        var invert = segment.endX < segment.startX ? -1 : 1
                var points = Shell.scaleToRect(Shell.patterns[this.pattern], w, h, invert)

                // We're drawing the chosen pattern stretched to fit a box point to point

                points[0] = [segment.startX + points[0][0], segment.startY + points[0][1]]

        this.ctx.moveTo(points[0][0], points[0][1])

        for (var i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[0][0] + points[i][0], points[0][1] + points[i][1])
        }

        this.ctx.closePath()
    }
}

Shell.prototype.draw = function (lofi) {

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    var step = lofi ? 2 : 1

            this.ctx.beginPath()

            for (var i = 0; i < this.nbSegments; i = i+step) {

                this.drawPattern(this.segments[i], i)
            }

    this.ctx.stroke()
}

//Opening is a logarithmic value so it has its own
//function to mutate it which converts it to meaningful values
Shell.mutateOpening = function (opening) {

    var mutSize = 0.4
    var logged = Math.log(opening)
    var logchanged = logged + mutSize * Shell.randomSign()

    if (logchanged > 20) {
        logchanged = 20
    }

    var m = Math.exp(logchanged)

    if (m < 1) {
        m = 1
    }

    return m
}

Shell.prototype.getGenes = function () {
    return {
        'pattern': this.pattern, 
        'shape': this.shape, 
        'displacement': this.displacement, 
        'translation': this.translation, 
        'translationGradient': this.translationGradient, 
        'opening': this.opening, 
        'handedness': this.handedness, 
        'reach': this.reach, 
        'coarsegraininess': this.coarsegraininess, 
        'mutSize': this.mutSize, 
        'mutProbGene': this.mutProbGene
    }
}

Shell.rand100 = function() {
    return Math.trunc(Math.random() * 100)
}


//Shell.randInt = function(lower, upper) {
//return Math.trunc(Math.random() * (upper - lower) + lower)
//}

//The breeding process is relatively straighforward compared to the rest
//It looks at each gene and rolls a D100. If it's under the probability, then
//the gene will mutate by a factor of the mutSize
//The original program's mutations were pretty limited, so to accentuate them
//we've added more parameters and a higher size mutation
Shell.prototype.breed = function (element) {
    var child = this.getGenes()
    if (Shell.rand100() < child.mutProbGene) {
        child.opening = Shell.mutateOpening(child.opening)
    }

    if (Shell.rand100() < child.mutProbGene) {
        child.displacement += Shell.randInt(-2, 2) * child.displacement
        child.displacement = Math.min(Math.max(child.displacement, 0), 1)
    }

    if (Shell.rand100() < child.mutProbGene) {
        child.translation += Shell.randInt(-2, 2) * child.translation
    }

    if (Shell.rand100() < 1) {
        child.handedness = -child.handedness
    }

    // These three are in addition to the original program and offer a 
    // little more visual variety

    if (Shell.rand100() < child.mutProbGene) {
        child.shape += Shell.randomSign() * child.mutSize.shape
    }

    if (Shell.rand100() < child.mutProbGene) {
        child.reach += Shell.randomSign() * child.mutSize.reach
    }
    // Changed threshold to 100 from 5 for demo purposes. 
    if (Shell.rand100() < 100) {
        var patternKeys = Object.keys(Shell.patterns);
        child.pattern = patternKeys[Math.trunc(Math.random() * patternKeys.length)]
    }
    var newShell
    if(element) 
        newShell = new Shell(element.getContext('2d'), element.width, element.height, child)
    else
        newShell = new Shell(this.ctx, this.canvasWidth, this.canvasHeight, child)

    this.children.push(newShell)

    return this.children[this.children.length - 1]

}
/*
 * AtomKind (Ted.pas, line 11)
 * type
 *      AtomKind = (Free, AnimalTrunk, AnimalJoint, AnimalClaw, SectionTrunk, SectionJoint, SectionClaw, SegmentTrunk, SegmentJoint, SegmentClaw, Joint, Claw);
 */
var AtomKind = {
        AnimalTrunk: 0, 
        AnimalJoint: 1, 
        AnimalClaw: 2, 
        SectionTrunk: 3, 
        SectionJoint: 4, 
        SectionClaw: 5, 
        SegmentTrunk: 6, 
        SegmentJoint: 7, 
        SegmentClaw: 8, 
        Joint: 9, 
        Claw: 10,
        Free: 1, 
        properties: {
            0: {name: "AnimalTrunk"},
            1: {name: "AnimalJoint"},
            2: {name: "AnimalClaw"},
            3: {name: "SectionTrunk"},
            4: {name: "SectionJoint"},
            5: {name: "SectionClaw"},
            6: {name: "SegmentTrunk"},
            7: {name: "SegmentJoint"},
            8: {name: "SegmentClaw"},
            9: {name: "Joint"},
            10: {name: "Claw"},
            11: {name: "Free"},
        }
}

var Pressure = {
        Positive: 1, 
        Zero: 2,
        Negative: 3,
        properties: {
            1: {name: 'Positive'},
            2: {name: 'Zero'},
            3: {name: 'Negative'}
        }
}
var Concentration = {
        FirstSegmentOnly: 1,
        LastSegmentOnly: 2,
        AnySegment: 3,
        properties: {
            1: {name: 'FirstSegmentOnly'},
            2:  {name: 'LastSegmentOnly'},
            3:  {name: 'AnySegment'}
        }
}


/*
 * Atom = record
 *     Kind: AtomKind;
 *     Height: real;          {also used for Thickness of a Joint}
 *     Width: real;           {also used for Length of a Joint}
 *     Angle: real;           {also used in an AnimalTrunk to store the number of atoms in the animal}
 *                            {also used in SectionTrunk to store the Overlap of segments}
 *                            {also used in SegmentTrunk to store the rank number of the segment}
 *     NextLikeMe: Integer;   {where to look in the BoneYard for the next atom. 0 means end of chain}
 *                            {Also used in AnimalTrunk to store Gradient gene, slightly more or less than 100.  Treat as Percentage}
 *     FirstBelowMe: Integer; {where to look in the BoneYard for the next atom. 0 means end of chain}
 * end;
 */



function Atom(kind) {
    this.kind = kind
    this.height = 1.0
    this.width = 1.0
    this.angle = 1.0
    this.nextLikeMe = null
    this.firstBelowMe = null
}

//{Destroy this animal.   Mark all of its Atoms as Free again.}
//{Recursively step through the animal}
//Kinda pointless in the JavaScript version
Atom.prototype.kill = function() {
    if(this.firstBelowMe) {
        this.firstBelowMe.kill();
    }
    if(this.nextLikeMe  && this.kind != AtomKind.AnimalTrunk) {
        this.nextLikeMe.kill();
    }
    this.kind = AtomKind.Free //{Free this Atom}
}

//Duplicate this entire animal.   
Atom.copy = function(which) {
    let newPlace = new Atom(which.kind) // {Grab a new atom}
    newPlace.height = which.height
    newPlace.width = which.width
    newPlace.angle = which.angle
    if(which.firstBelowMe) {
        newPlace.firstBelowMe = Atom.copy(which.firstBelowMe);
    }
    if(which.nextLikeMe) {
        if(which.kind == AtomKind.AnimalTrunk) {
            // Pascal original got this for free with an assignment
            newPlace.nextLikeMe = which.nextLikeMe
        } else {
            newPlace.nextLikeMe = Atom.copy(which.nextLikeMe)
        }
    }
    return newPlace; // {Return the new one}
}



//{Duplicate Subtree starting at the atom which, 
//but don't copy NextLikeMe.  Leave old value there}
//{Copy the things I own, but not the things after me}
Atom.copyExceptNext = function(which) {
    let newPlace = new Atom(which.kind) // {Grab a new atom}
    newPlace.height = which.height
    newPlace.width = which.width
    newPlace.angle = which.angle
    if(which.firstBelowMe) {
        // {Normal copy from here on}
        newPlace.firstBelowMe = Atom.copy(which.firstBelowMe); 
    }
    return newPlace // {Return the new one}
}

Atom.countAtoms = function(which) {
    // {travel over the Animal, counting Atoms}
    let count = 1 // {count me}
    if(which.firstBelowMe != null) {
        count += Atom.countAtoms(which.firstBelowMe)
    }

    if (which.nextLikeMe  != null && which.kind != AtomKind.AnimalTrunk) {
        count += Atom.countAtoms(which.nextLikeMe)
    }
    return count
}

//{Delete a section of the animal somewhere near the atom which.}
//{Caller must correct the AtomCount of the whole animal.  Return false if failed}
//{Must have a hold on the atom above what we delete.  If chosen atom is:  }
//{AnimalTrunk   delete first Sec}
//{       AnimalJoint   delete first Sec}
//{       AnimalClaw      delete first Sec}
//{               SectionTrunk    delete next Sec}
//{                       SectionJoint            delete first Seg}
//{                       SectionClaw             delete first Seg}
//{                               SegmentTrunk            delete next Seg}
//{                                       SegmentJoint            delete first Joint}
//{                                       SegmentClaw             delete first Joint}
//{                                               Joint                           delete next Joint}
//{                                               Joint                           delete next Joint}
//{                                               Joint                           delete Claw}
//{                                                       Claw                            fail}
//{Also fail if trying to delete last example of a kind}

Atom.doDelete = function(which) {
//  parent, chain: integer;
//  begin

    let parent = which;
    let doDelete = false; //{unless we actually succeed in killing one}
    if(parent.kind == AtomKind.AnimalTrunk) {
        parent = parent.firstBelowMe; // {AnimalJoint}
    }
    let kind = parent.kind
    if(kind == AtomKind.AnimalJoint 
            || kind == AtomKind.SectionJoint 
            || kind == AtomKind.SegmentJoint) {
        parent = parent.firstBelowMe; // {AnimalClaw is parent}
    }
    if(parent) {
        kind = parent.kind
        if(kind == AtomKind.SectionTrunk 
                || kind == AtomKind.SegmentTrunk 
                || kind == AtomKind.Joint) {
            let nextLikeMe = parent.nextLikeMe
            //{Delete nextLikeMe of parent}
            if(nextLikeMe) {
                chain = nextLikeMe.nextLikeMe; //{May be 0}
                nextLikeMe.nextLikeMe = null; //{So Kill won't get the rest of chain}
                nextLikeMe.kill(); //{won't be killing last one, since parent qualifies as one}
                nextLikeMe = chain;
                doDelete = true;
            }
        } else { 
            let firstBelowMe = parent.firstBelowMe
            //{Try to delete FirstBelow}
            if(firstBelowMe) { //{we know FirstBelow exists}
                chain = firstBelowMe.nextLikeMe; //{Atom after one we will delete}
                firstBelowMe.nextLikeMe = null;
                if(chain) { // {FirstBelow is not only one }
                    firstBelowMe.kill();
                    firstBelowMe = chain;
                    doDelete = true;
                }
            }
        }
    }
    return doDelete
}


Atom.prototype.printAt = function(segmentCounter) {
    var str = this.height.toFixed(2) + '     ' + this.width.toFixed(2) + '     ' + this.angle.toFixed(2) 
    switch(this.kind) {
    case AtomKind.AnimalTrunk: 
        str += 'AnimalTrunk gradientFactor ' + this.nextLikeMe;
        break
    case AtomKind.AnimalJoint: 
        str += '    AnimalJoint';
        break
    case AtomKind.AnimalClaw: 
        str += '    AnimalClaw';
        break
    case AtomKind.SectionTrunk: 
        str += '        SectionTrunk';
        break
    case AtomKind.SectionJoint: 
        str += '            SectionJoint';
        break
    case AtomKind.SectionClaw: 
        str += '            SectionClaw';
        break
    case AtomKind.SegmentTrunk: 
        segmentCounter++;
        str += '                SegmentTrunk ' + segmentCounter;
        break
    case AtomKind.SegmentJoint: 
        str += '                    SegmentJoint';
        break
    case AtomKind.SegmentClaw: 
        str += '                    SegmentClaw';
        break
    case AtomKind.Joint: 
        str += '                        Joint';
        break
    case AtomKind.Claw: 
        str += '                        Claw';
        break
    }
    console.log(str)
    return segmentCounter
}

//{Print this animal}

Atom.prototype.print = function(segmentCounter) {
//  {Recursively step through the animal}
    if(this.kind != AtomKind.Free) {
        segmentCounter = this.printAt(segmentCounter)
    }
    if(this.firstBelowMe) {
        segmentCounter = this.firstBelowMe.print(segmentCounter)
    }
    if(this.nextLikeMe && this.kind != AtomKind.AnimalTrunk) {
        segmentCounter = this.nextLikeMe.print(segmentCounter)
    }
    return segmentCounter
}

Atom.prototype.printMiddle = function() {
    console.log('Height    Width     Angle')
    this.print(0)
}


/*
 * Constructor for the Arthromorph biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort) { drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property) {
 * 'species', a string containing the name) { the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */


function Arthromorph(session, drawer) {
    this.session = session
    this.drawer = drawer
    this.trunk = null
    this.segmentCounter = 0
    this.secondSegmentAtomNo = 0
    this.count = 0
    this.overlap = 0
}

Arthromorph.makeAllBodyMutations = function(session, state) {
    session.options.trunkMut = state;
    session.options.legsMut = state;
    session.options.clawsMut = state;
    session.options.animalTrunkMut = state;
    session.options.animalLegsMut = state;
    session.options.animalClawsMut = state;
    session.options.sectionTrunkMut = state;
    session.options.sectionLegsMut = state;
    session.options.sectionClawsMut = state;
    session.options.segmentTrunkMut = state;
    session.options.segmentLegsMut = state;
    session.options.segmentClawsMut = state;
}

Arthromorph.makeAllAtomMutations = function(session, state) {
    session.options.widthMut = state;
    session.options.heightMut = state;
    session.options.angleMut = state;
    session.options.duplicationMut = state;
    session.options.deletionMut = state;
}
Arthromorph.initializeSession = function(session) {
    // where in a cumParams the Width of an AnimalTrunk gets multiplied in
    let paramOffset = new Array(12)

    paramOffset[AtomKind.AnimalTrunk] = 0;          
    paramOffset[AtomKind.AnimalJoint] = 3;
    paramOffset[AtomKind.AnimalClaw] = 6;
    paramOffset[AtomKind.SectionTrunk] = 0;
    paramOffset[AtomKind.SectionJoint] = 3;
    paramOffset[AtomKind.SectionClaw] = 6;
    paramOffset[AtomKind.SegmentTrunk] = 0;
    paramOffset[AtomKind.SegmentJoint] = 3;
    paramOffset[AtomKind.SegmentClaw] = 6;
    paramOffset[AtomKind.Joint] = 3;
    paramOffset[AtomKind.Claw] = 6;

    session.options.paramOffset = paramOffset

    Arthromorph.makeAllBodyMutations(session, true)
    Arthromorph.makeAllAtomMutations(session, true)
    session.options.mutationPressure = Pressure.Zero;
    session.options.focusOfAttention = Concentration.AnySegment;
    session.options.sideways = false;
    session.options.wantColor = true
    session.options.sessionIcon = 'img/arthromorphs32x32.png';
    session.options.basicTypes = ["Minimal", "Complex"]
    session.options.defaultBasicType = "Minimal"


}

Arthromorph.prototype.doSaltation = function() {
}

Arthromorph.prototype.copyBiomorph = function() {
}

//{travel over the Animal, counting Atoms and return the Nth}
Arthromorph.prototype.findNth = function(which, pick) {
    this.count++;
    if(which.kind == AtomKind.SegmentTrunk) {
        this.segmentCounter++
    }
    if(this.segmentCounter == 2) {
        this.secondSegmentAtomNo = this.count
    }

    var findNth

    if(this.count >= pick) {
        findNth = which //{We are done!}
    } else {
        if(which.firstBelowMe) {
            findNth = this.findNth(which.firstBelowMe, pick);
        }
        if(this.count < pick) {
            if(which.nextLikeMe) {
                findNth = this.findNth(which.nextLikeMe, pick);
            }
        }
        if(this.count < pick) {
            findNth = null //{not there yet}
        }
    }

    return findNth
}

Arthromorph.prototype.countSeg = function(which) {
    if(which.kind == AtomKind.SegmentTrunk) {
        this.segmentCounter++
        which.angle = this.segmentCounter
    }
    if(which.firstBelowMe) {
        this.countSeg(which.firstBelowMe)
    }
    if(which.nextLikeMe && which.kind != AtomKind.AnimalTrunk) {
        this.countSeg(nextLikeMe);
    }
}




Arthromorph.randInt = function(ceiling) {
    return Math.floor(Math.random() * ceiling) + 1;  
}


//{How much to grow or shrink a Length or Height or Angle}
Arthromorph.prototype.getFactor = function() {
    var choose
    switch(this.session.options.mutationPressure) {
    case Pressure.Positive: 
        choose = 2 + Arthromorph.randInt(2)
        break
    case Pressure.Zero: 
        choose = Arthromorph.randInt(4)
        break
    case Pressure.Negative: 
        choose = Arthromorph.randInt(2)
        break
    }
    //{Richard, you can play with these factors}
    switch(choose) {
    case 1:                      
        return 0.50;
    case 2: 
        return 0.9;
    case 3: 
        return 1.1;
    case 4: 
        return 1.5;
    }
}

//creates and returns a new, mutated copy) { the biomorph.
Arthromorph.prototype.reproduce = function(element) {
    

    let child = new Arthromorph(this.session, element);

    //{Reproduce copies an animal and calls Mutate}
    //{Please kill the old animal before calling this.  We may need to use his atoms.}
    let counter = 0;
    child.trunk = Atom.copy(this.trunk);
    let limit = 1000 // 1000
    do {
        counter++
        done = child.mutate() // {If it fails, just try again until we succeed at changing something}
    } while(counter < limit && ! done);
//    console.log('Child')
//    child.trunk.printMiddle()
    if(counter > limit) {
        console.error('Timed out, perhaps attempting impossible duplication or deletion');
        return null
    } else {
//      console.log(child.trunk)
        return child
    }
}


Arthromorph.prototype.develop = function() {
    this.drawInBox()
}


$.widget('dawk.arthromorph_geneboxes', $.dawk.geneboxes, {
    updateFromCanvas: function() {

    }
})

//Register the Colour biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Arthromorph", 
        (function(session, drawer) { return new Arthromorph(session, drawer)}),
        (function(session) { Arthromorph.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.arthromorph_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).arthromorph_geneboxes('updateFromCanvas', canvas)}));

//{I still vote for AnimalJoint . Width = 20 and AnimalJoint . angle = 0.25 
//in the default animal .}

Arthromorph.prototype.minimalAnimal = function() {
    let aa = new Atom(AtomKind.Claw);

    let bb = new Atom(AtomKind.Joint);
    bb.width = 5;
    bb.angle = 2;
    bb.firstBelowMe = aa;

    aa = new Atom(AtomKind.SegmentClaw)
    aa.firstBelowMe = bb;

    bb = new Atom(AtomKind.SegmentJoint)
    bb.nextLikeMe = aa;
    bb.angle = 2;

    aa = new Atom(AtomKind.SegmentTrunk)
    aa.firstBelowMe = bb;

    bb = new Atom(AtomKind.SectionClaw)
    bb.firstBelowMe = aa;

    aa = new Atom(AtomKind.SectionJoint)
    aa.nextLikeMe = bb;

    bb = new Atom(AtomKind.SectionTrunk)
    bb.angle = 0.5; //{Segment overlap, by convention}
    bb.firstBelowMe = aa;

    aa = new Atom(AtomKind.AnimalClaw)
    aa.firstBelowMe = bb;

    bb = new Atom(AtomKind.AnimalJoint)
    bb.nextLikeMe = aa;
    bb.width = 5; //{make it visible}
    bb.angle = 5;

    aa = new Atom(AtomKind.AnimalTrunk)
    aa.firstBelowMe = bb;
    aa.nextLikeMe = -2; // {Gradient, by convention}
    aa.height = 20;
    aa.width = 20;
    aa.angle = Atom.countAtoms(aa);
    this.trunk = aa
}

Arthromorph.prototype.complexAnimal = function() {
//  Height Width Angle
//  01.00 01.00 01.00                       Claw         
    let aa = new Atom(AtomKind.Claw);
//  01.00 05.00 -2.00                       Joint
    let bb = new Atom(AtomKind.Joint);
    bb.width = 5
    bb.angle = -2
    bb.firstBelowMe = aa
//  01.00 05.00 02.00                       Joint
    aa = new Atom(AtomKind.Joint);
    aa.width = 5
    aa.angle = 2
    aa.nextLikeMe = bb
//  01.00 01.00 01.00                     SegmentClaw
    bb = new Atom(AtomKind.SegmentClaw)
    bb.firstBelowMe = aa
    //  01.00 01.00 02.00                     SegmentJoint
    aa = new Atom(AtomKind.SegmentJoint)
    aa.angle = 2
    aa.firstBelowMe = bb
    //  01.00 01.00 03.00                 SegmentTrunk 3
    let st3 = new Atom(AtomKind.SegmentTrunk)
    st3.angle = 3
    st3.firstBelowMe = aa
//  01.00 01.00 01.00                       Claw
    aa = new Atom(AtomKind.Claw);
//  01.00 05.00 -2.00                       Joint
    bb = new Atom(AtomKind.Joint);
    bb.width = 5
    bb.angle = -2
    bb.firstBelowMe = aa
//  01.00 05.00 02.00                       Joint
    aa = new Atom(AtomKind.Joint);
    aa.width = 5
    aa.angle = 2
    aa.nextLikeMe = bb
//  01.00 01.00 01.00                     SegmentClaw
    bb = new Atom(AtomKind.SegmentClaw)
    bb.firstBelowMe = aa
//  01.00 01.00 02.00                     SegmentJoint
    aa = new Atom(AtomKind.SegmentJoint)
    aa.angle = 2
    aa.firstBelowMe = bb
//  01.00 01.00 02.00                 SegmentTrunk 2
    let st2 = new Atom(AtomKind.SegmentTrunk)
    st2.angle = 2
    st2.firstBelowMe = aa
    st2.nextLikeMe = st3
//  01.00 01.00 01.00                       Claw
    aa = new Atom(AtomKind.Claw);
//  01.00 05.00 -2.00                       Joint
    bb = new Atom(AtomKind.Joint);
    bb.width = 5
    bb.angle = -2
    bb.firstBelowMe = aa
//  01.00 05.00 02.00                       Joint
    aa = new Atom(AtomKind.Joint);
    aa.width = 5
    aa.angle = 2
    aa.nextLikeMe = bb
//  01.00 01.00 01.00                     SegmentClaw
    bb = new Atom(AtomKind.SegmentClaw)
    bb.firstBelowMe = aa
//  01.00 01.00 01.79                     SegmentJoint
    aa = new Atom(AtomKind.SegmentJoint)
    aa.angle = 1.79
    aa.firstBelowMe = bb
//  01.00 01.00 01.00                 SegmentTrunk 1
    let st1 = new Atom(AtomKind.SegmentTrunk)
    st1.firstBelowMe = aa
    st1.nextLikeMe = st2

//  01.00 01.00 01.00             SectionClaw
    aa = new Atom(AtomKind.SectionClaw)
    aa.firstBelowMe = st1

    //  01.00 01.00 01.00             SectionJoint
    bb = new Atom(AtomKind.SectionJoint)
    bb.firstBelowMe = st1
//  01.00 01.00 00.50         SectionTrunk
    aa = new Atom(AtomKind.SectionTrunk)
    aa.angle = 0.5
    aa.firstBelowMe = bb
//  01.00 01.00 01.00     AnimalClaw
    bb = new Atom(AtomKind.AnimalClaw)
    bb.firstBelowMe = aa
    //  01.00 05.00 05.00     AnimalJoint
    aa = new Atom(AtomKind.AnimalJoint)
    aa.width = 5
    aa.angle = 5
    aa.firstBelowMe = bb
    //  20.00 20.00 24.00 AnimalTrunk
    bb = new Atom(AtomKind.AnimalTrunk)
    bb.height = 20
    bb.width = 20
    bb.firstBelowMe = aa
    bb.angle = Atom.countAtoms(bb);
    this.trunk = bb
}

Arthromorph.prototype.doPerson = function(type) {
    switch(type) {
    case "Complex":
        this.complexAnimal()
        break
    case "Minimal":
    default:     
        this.minimalAnimal()
    }
    this.trunk.printMiddle()

}

//{Mutate first picks an atom randomly from the Animal.}
//{       From num of atoms, picks one and step down to it}
//{               Flip a coin for what to do: change Height, Width, Angle, Dup part, Delete part, Flip angle}
//{                       Test if legal to do it and do it (else return false)}
//{                               Delete does not delete the first-and-only of its kind}
//{Forbid: Angle mod if none, delete last Section, or Seg }
//{               Delete Animal, Dup Animal,   Delete Claw, Dup Claw}
//{Range limits on some modifications??  Only angles can be negative.}
Arthromorph.prototype.mutate = function() {
    if(this.trunk.kind != AtomKind.AnimalTrunk) {
        console.error('Not an animal');
    }
    this.secondSegmentAtomNo = 0;
    let atomNumber = Atom.countAtoms(this.trunk);
    let lastSegment = this.segmentCounter;
    let size = Math.trunc(this.trunk.angle); //{As a convention, we keep the number of Atoms in this animal in AnimalTrunk's Angle field}
    
    let pick = Arthromorph.randInt(size); //{a number from 1 to size.  Index of the atom we will modify}
    
    this.count = 0;

    
    let targetAtom = this.findNth(this.trunk, pick); // {find the Nth atom}
    if(targetAtom ==  null) console.log('null pick ' + pick + ' of ' + this.trunk.angle + ' size ' + size)
    var kind = targetAtom.kind
//    console.log('Picked ' + AtomKind.properties[kind].name)
    if(targetAtom == null) {
        //{Aren't pick atoms in this Animal}
        console.error('Atom count is wrong.  Fatal.  Quitting');
        return
    }
//  {Decide what to do}
    let change = Arthromorph.randInt(7); //          {seven basic operations}
//  { 1 twiddle Height, 2 twiddle Width, 3 twiddle Angle, 4 Duplicate entire subtree, 5 Delete subtree}
//  { 6 reverse an angle , 7 reverse sign of Gradient}
    if(change == 7 && targetAtom.kind == AtomKind.AnimalTrunk) {
        targetAtom.nextLikeMe *= -1;
    }
    if(change == 4) {
        //  {If Dup and target is second or third part of an Animal, Section, or Segment,}
        //  {Then jump down to the next part of the animal}
        if(kind == AtomKind.AnimalJoint || kind == AtomKind.SectionJoint || kind == AtomKind.SegmentJoint) {
            if(targetAtom.nextLikeMe == null) {
                console.log('mutation expected targetAtom to have a nextLikeMe, and it does not.')
                targetAtom.printMiddle()
                
            }
            targetAtom = targetAtom.nextLikeMe; // {AnimalClaw}
            
            kind = targetAtom.kind

        }
        if(kind == AtomKind.AnimalClaw || kind == AtomKind.SectionClaw || kind == AtomKind.SegmentClaw) {
            targetAtom = targetAtom.firstBelowMe;
            kind = targetAtom.kind
        }
        // {SectionTrunk .. where we want to be }
    }
    let mutOK = false;
    let options = this.session.options
    switch(kind) {
    case AtomKind.AnimalTrunk: 
        if(options.animalTrunkMut) {
            mutOK = true;
        }
        break
    case AtomKind.AnimalJoint: 
        if(options.animalLegsMut) {
            mutOK = true;
        }
        break
    case AtomKind.AnimalClaw: 
        if(options.animalClawsMut) {
            mutOK = true;
        }
        break
    case AtomKind.SectionTrunk: 
        if(options.sectionTrunkMut) {
            mutOK = true;
        }
        break
    case AtomKind.SectionJoint: 
        if(options.sectionLegsMut) {
            mutOK = true;
        }
        break
    case AtomKind.SectionClaw: 
        if(options.sectionClawsMut) {
            mutOK = true;
        }
        break
    case AtomKind.SegmentTrunk: 
        if(options.segmentTrunkMut) {
            mutOK = true;
        }
        break
    case AtomKind.SegmentJoint: 
        if(options.segmentLegsMut) {
            mutOK = true;
        }
        break
    case AtomKind.SegmentClaw: 
        if(options.segmentClawsMut) {
            mutOK = true;
        }
        break
    case AtomKind.Joint: 
        if(options.legsMut) {
            mutOK = true;
        }
        break
    case AtomKind.Claw: 
        if(options.clawsMut) {
            mutOK = true;
        }
        break
    default:
        mutOK = false;
    }

    switch(options.focusOfAttention) {
    case Concentration.FirstSegmentOnly: 
        if(this.secondSegmentAtomNo > 0) {
            if(this.count < this.secondSegmentAtomNo) {
                let couldBe = (kind == AtomKind.SegmentTrunk || kind == AtomKind.SegmentJoint || kind == AtomKind.SegmentClaw || kind == AtomKind.Joint || kind == AtomKind.Claw);
                if(! couldBe) {
                    mutOK = false;
                }
            } else {
                mutOK = false;
            }
            break
        }
    case Concentration.LastSegmentOnly: 
        if(this.segmentCounter != lastSegment) {
            MutOk = false;
        }
        break
    case Concentration.AnySegment: 
        //{No need for action.  mutOK retains its present value}
    }

    // For debugging, make duplications happen more than twice as often as other mutations
//    if(Math.random() < 0.5 )
//        change == 4
    
    let ok = false;
    if(mutOK) { // && kind == AtomKind.Joint
            
        ok = true;
        if((change == 4 || change == 5) 
                && kind == AtomKind.Claw) {
            ok = false; //{Forbid delete or dup of claw}
        }
        if((change == 3 || change == 6) 
                && (kind == AtomKind.AnimalTrunk || kind == AtomKind.SegmentTrunk)) {
            //{These atoms have no Angle part. SectionTrunk does, because 'angle' 
            // is overlap, by convention}
            ok = false; 
        }  
        
        if(ok) {
            if(change == 4) {
                if(options.duplicationMut) {
                    console.log('duplicationMut')
//                    targetAtom.printMiddle()
                    
                    // There is only one AnimalTrunk per animal,
                    // so it doesn't need to use nextLikeMe to hold a reference
                    // to its next sibling. In AnimalTrunk, nextLikeMe is
                    // used to hold gradient factor, instead of to refer to another Atom.
                    //{ Special case, means GradientFactor}
                    if(kind == AtomKind.AnimalTrunk) {
                        targetAtom.nextLikeMe++ // Increment gradient factor, see above
                    } else { 
                        targetAtom.nextLikeMe = Atom.copyExceptNext(targetAtom); // {Insert copy of me after me}
//                      {CopyExceptNext makes sure NextLikeMe of copy now points to old NextLikeMe of target}
//                      {So brothers are kept, and new subtree is inserted}
//                        console.log('copy except next returned: ')
//                        targetAtom.nextLikeMe.printMiddle()
                    }
                    if(kind == AtomKind.Joint && targetAtom.firstBelowMe) { //{last joint has claw.  When duplicate, get rid of extra claw}
//                        alert('duplicating joint')
//                        console.log('duplicated joint deleting claw')
                        extraClaw = targetAtom.firstBelowMe;
                        targetAtom.firstBelowMe = null;
                        extraClaw.kill();
                    }
                    //{A little wasteful to count entire animal again}
                    this.trunk.angle = Atom.countAtoms(this.trunk);  
//                    this.trunk.printMiddle()
                } else {
                    ok = false;
                }
            }
            if(change < 4) {
                let factor = this.getFactor(); //{See table above}
                switch(change) {
                case 1: 
                    if(options.heightMut) {
                        targetAtom.height *= factor
                    } else {
                        ok = false;
                    }
                    break
                case 2: 
                    if(options.widthMut) {
                        targetAtom.width *= factor
                    } else {
                        ok = false;
                    }
                    break
                case 3: 
                    if(options.angleMut) {
                        targetAtom.angle *= factor;
                        if(kind == AtomKind.SectionTrunk) {
                            targetAtom.angle = Math.abs(targetAtom.angle);// {forbid backward overlaps}
                            if(targetAtom.angle > 1) {
                                targetAtom.angle = 1;// {Otherwise disembodied segments}
                            }
                        }
                    } else {
                        ok = false;
                    }
                }
            }
            if(change == 5) {
                if(options.deletionMut) {
                    if(kind == AtomKind.AnimalTrunk) {
                        targetAtom.nextLikeMe--;// {special case. by convention means GradientFactor}
//                      {Delete.  Complex because we need to talk to the atom above where we delete}
                        ok = Atom.doDelete(targetAtom); // {there is a problem here}
                        if(ok) {
//                          {A little wasteful to count entire animal again}
                            this.trunk.angle = Atom.countAtoms(this.trunk)
                        }
                    } 
                } else {
                    ok = false;
                }
            }
            if(change == 6 && kind != AtomKind.SectionTrunk) {
                if(options.angleMut) {
                    targetAtom.angle *= -1.0; //{reverse an angle}
                } else {
                    ok = false;
                }
            }
        }
    }
    return ok && mutOK;
}
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
    let ang = params[8] / 2.0;
//  {half claw opening, in radians}
    x = Math.round(x + params[7] * Math.sin(ang)); //{line end point   width*sine(angle)}
    y = Math.round(y + params[7] * Math.cos(ang)); //{line end point}
    thick = 1 + Math.trunc(params[6]); //{1 is minimum thickness}
    this.drawLine(drawingContext, oldX, oldY, x, y, thick, poles); //{right side, top of claw}

    let leftX = xCenter - (x - xCenter); //{do the left side, top of claw}
    let leftOldX = xCenter - (oldX - xCenter);
    this.drawLine(drawingContext, leftOldX, oldY, leftX, y, thick, poles);
//  {Bottom of the claw}
    y = Math.round(y - 2.0 * params[7] * Math.cos(ang));
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
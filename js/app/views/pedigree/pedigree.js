/*
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
        godCounter: 0
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


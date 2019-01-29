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
        this.options.familialLineCanvas = familialLineCanvas[0]
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
        $(this.element).find('canvas').removeClass('midBox')
        $(thisFull.genome.drawer).addClass('midBox')
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
        if(this.options.specialFull != null) {
            this.options.specialFull.prec = theGod.adam
        }                                                                                        
        theGod.adam.next = this.options.specialFull;
        this.options.specialFull = theGod.adam;
        this.options.specialFull.prec = null;
        
        let screenRect = $(this.element).find('.pedigreeDiv')[0].getBoundingClientRect()
        let x = Math.trunc(screenRect.width / 2);
        let y = Math.trunc(screenRect.height / 2);

        this.addone(theGod.adam, new Point(x,y))
    },
    
    addone: function(full, point) {
        let biomorph = full.genome
        let surround = full.surround
        let biomorphWidth = surround.right - surround.left
        let biomorphHeight = surround.bottom - surround.top
        let left = point.h - biomorphWidth / 2
        let top = point.v - biomorphHeight / 2;
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
        console.log('God')
        console.log(this.options.rootGod)
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
        current.next = this.options.specialFull;  //{puts currentfull at head of list}
        this.options.specialFull.prec = current;  //{Updates seniority pointer of previous head}
//        oldSpecialFull = specialFull; // value never used
        this.options.specialFull = current; // {Gives new head its proper title}
        this.options.specialFull.prec = null; // {Probably unnecessary but good form}
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
        ctx.clearRect(0, 0, canvas.width, canvas.height)
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
        if((nucleusFull != null) && (orbitFull != null)) {
            console.log('connect')
            let ctx = this.options.familialLineCanvas.getContext('2d')
            ctx.strokeStyle = 'Black';
            ctx.lineWidth = 1;
            ctx.beginPath()
            ctx.moveTo(nucleusFull.centre.h, nucleusFull.centre.v);
            this.options.thereAreLines = true;
            ctx.lineTo(orbitFull.centre.h, orbitFull.centre.v);
            ctx.stroke()
            ctx.closePath()
        }
    },
    findLastGod: function() { //{Delivers last God in theGod}
        let thisGod = this.options.rootGod
        this.options.godCounter = 1;
        if(thisGod.nextGod == null) {
            this.options.theGod = thisGod
        } else {
            tryGod(thisGod)
        } 
    },
    
//  {Isolates ThisFull from all except its descendants, leaving rest of}
//  {pedigree hierarchical linked list tidied up and pointing elsewhere.}
//  {Does not touch linear Specialfull linked list, since this reflects}
//  {spatial relations on screen, and nonrelatives can cover each other}
    detach: function(thisFull) {
        if(thisFull.parent != null) {
            this.connect(thisFull, thisFull.parent);
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
        theGod.nextGod = tempGod;
        theGod = tempGod;
        this.markIf(thisFull); //make midBox
    },
    redrawLines: function(thisFull) {
        
        if(thisFull != null) {
            let ctx = this.options.familialLineCanvas.getContext('2d')
            ctx.strokeStyle = 'Black';
            ctx.lineWidth = 1;
            ctx.beginPath()

            if(thisFull.parent != null) {
                ctx.moveTo(thisFull.centre.h, thisFull.centre.v);
                ctx.lineTo(thisFull.parent.centre.h, thisFull.parent.centre.v);
                ctx.stroke()
                ctx.closePath()
            }
            if(thisFull.lastBorn != null) {
//                this.redrawAll(thisFull.lastBorn);
            }
        } 
    },
    allLines: function(theGod) {
        if(theGod != null) {
            if(theGod.adam != null) {
                this.redrawLines(theGod.adam);
            }
            if(theGod.nextGod != null) {
                this.allLines(theGod.nextGod)
            }
        }
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
    kill: function(target) {
        $(target).remove()
    },
    morphmousedown: function(event) {
        // Move the selected morph to the front and make it special
        this.markIf($(event.target).data('genotype').full)
        switch(this.options.theMode) {
        case Mode.Phyloging:
            let target = event.target
            // Bring it to the front
            $(this.element).find('.pedigreeDiv').append(target)
            // User pressed on a morph. Record it as a potential parent.
            this.options.phyloging = target
            break
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
            this.kill(event.target)
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
                this.dragoutline(x, y)
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
                thisFull = $(target).data('genotype').full
                this.spawnmany(thisFull, new Point(x, y))
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
            $(this.element).find('.pedigreeDiv canvas').draggable()
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

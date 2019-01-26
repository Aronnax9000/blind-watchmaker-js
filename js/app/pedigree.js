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



//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.pedigreeView", $.dawk.watchmakerView, {
    options: { 
        theMode: Mode.Phyloging,
        rays: Mirrors.NoMirrors,
        species: null,
        biomorph: null,
        rootGod: null,
    },
    viewGainedFocus: function(event) {
        let session = $(this).pedigreeView("option", "session")
        session.viewGainedFocus(session, this)
    },
    _create: function (options) {
        this._super()

        $(this.element).addClass('pedigreeView')

        this.options.menuHandler.nextMenuHandler = new PedigreeMenuHandler()
        let container = $("<div class='container'>")
        container.appendTo(this.element)
        let div = $("<div class='pedigreeFamilialLineCanvas'>")
        //div.appendTo(container)
        let familialLineCanvas = $("<canvas width='1000' height='600'>")
        //familialLineCanvas.appendTo(div)
        
        div = $("<div class='pedigreeDrawOutLineDiv'>")
        div.appendTo(container)
        let drawOutCanvas = $("<canvas class='drawOutCanvas' width='1000' height='600'>")
        drawOutCanvas.appendTo(div)
        div = $("<div class='pedigreeDrawOutMousingDiv pointerEventsNone'>")
        div.appendTo(container)
        this._on(div, {
            mousedown: function(event) { this.drawoutmousedown(event) },
            mouseup: function(event) { this.drawoutmouseup(event) },
            mousemove: function(event) { this.drawoutmousemove(event) },
            mousedrag: function(event) { this.drawoutmousedrag(event) },
        })
        

        
        
        let biomorph = this.options.biomorph 
        biomorph.full = new Full(biomorph)
        let biomorphWidth = biomorph.getWidth();
        let biomorphHeight = biomorph.getHeight();
        console.log('biomorph ' + biomorphWidth + 'x' + biomorphHeight)

        let pedigreeDiv = $('<div class="pedigreeDiv">')
        pedigreeDiv.addClass('boxes')
        pedigreeDiv.appendTo(container)
        
        let screenRect = pedigreeDiv[0].getBoundingClientRect()
        let screenWidth = screenRect.width;
        let screenHeight = screenRect.height;
        console.log('screen ' + screenWidth + 'x' + screenHeight)
        let left = screenWidth / 2 - biomorphWidth / 2
        let top = screenHeight / 2 - biomorphHeight / 2;
        console.log(left + ',' + top)

        
        
        let canvas = $("<canvas style='position: absolute'>")
        canvas.attr('height', Math.trunc(biomorphHeight))
        canvas.attr('width', Math.trunc(biomorphWidth))
        canvas.css('left', left)
        canvas.css('top', top)
        canvas.addClass('pedigreeBox midBox')
        canvas.appendTo(pedigreeDiv)
        console.log(canvas[0])
        biomorph.drawer = canvas[0]
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        this._on(canvas, {
            mousedown: function(event) { this.morphmousedown(event) },
            mouseup: function(event) { this.morphmouseup(event) },
            mousemove: function(event) { this.morphmousemove(event) },
            mousedrag: function(event) { this.morphmousedrag(event) },
        })
        

        let ctx = drawOutCanvas[0].getContext('2d')
        ctx.strokeStyle = '#000000'
        ctx.moveTo(left, top)
        ctx.lineTo(0,0)
        ctx.stroke()

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
    morphmousedown: function(event) {
        console.log('morphmousedown')

        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
            this.options.phyloging = target
            $(target).closest('.container').find('.pedigreeDrawOutMousingDiv').removeClass('pointerEventsNone')
            console.log('phyloging with target')
            break
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
            break
        }
    },
    morphmousemove: function(event) {
        console.log('morphmousemove')

        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
            break
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
            break
        }
    },
    morphmousedrag: function(event) {
        console.log('morphmousedrag')

        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
            break
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
            break
        }
    },
    morphmouseup: function(event) {
        console.log('morphmouseup')

        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
            // Let go inside morph. Don't reproduce
            this.options.phyloging = null
            $(target).closest('.container').find('.pedigreeDrawOutMousingDiv').addClass('pointerEventsNone')

            break
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
            break
        }
    },
    drawoutmousedown: function(event) {
        console.log('drawoutmousedown')
        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
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
        console.log('drawoutmouseup')
        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
            if(this.options.phyloging != null) {
                console.log('offspring time!')
            }
            $(target).addClass('pointerEventsNone')
            break
        case Mode.Moving:
            break
        case Mode.Detaching:
            break
        case Mode.Killing:
            break
        }
    },
    drawoutmousedrag: function(event) {
        console.log('drawoutmousedrag')
        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
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
        console.log('drawoutmousedrag')
        let target = event.target
        switch(this.options.theMode) {
        case Mode.Phyloging:
            if(this.options.phyloging != null) {
                console.log('draw out lines time!')
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
        switch(name) {
        case 'DrawOutOffspring':
            this.theMode = Mode.Phyloging
            drawOutOffspring.css('display', 'inline-block')
            move.css('display', 'none')
            detach.css('display', 'none')
            kill.css('display', 'none')
            $(this.element).find('.pedigreeDiv canvas').draggable('destroy')
            break
        case 'Move':
            this.theMode = Mode.Moving
            drawOutOffspring.css('display', 'none')
            move.css('display', 'inline-block')
            detach.css('display', 'none')
            kill.css('display', 'none')
            $(this.element).find('.pedigreeDiv canvas').draggable()
            break
        case 'Detach':
            this.theMode = Mode.Detaching
            drawOutOffspring.css('display', 'none')
            move.css('display', 'none')
            detach.css('display', 'inline-block')
            kill.css('display', 'none')
            $(this.element).find('.pedigreeDiv canvas').draggable('destroy')
            break
        case 'Kill':
            this.theMode = Mode.Killing
            drawOutOffspring.css('display', 'none')
            move.css('display', 'none')
            detach.css('display', 'none')
            kill.css('display', 'inline-block')
            $(this.element).find('.pedigreeDiv canvas').draggable('destroy')
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

PedigreeMenuHandler.prototype.menuclick = function(event) {
    let target = event.target
    let menuid = $(target).data('menuid')
    console.log('PedigreeMenuHandler'  + menuid)
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

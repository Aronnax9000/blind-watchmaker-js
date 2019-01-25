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
// Values not the same as Classic Blind Watchmaker
var PedigreeMode = {
        Phyloging: 1,
        Move: 2,
        Detach: 3,
        Kill: 4,
        properties: {
            1: {name: "Phyloging"},
            2: {name: "Move"},
            3: {name: "Detach"},
            4: {name: "Kill"}
        },
}



//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.pedigreeView", $.dawk.watchmakerView, {
    options: { 
        theMode: PedigreeMode.Phyloging,
        rays: Mirrors.NoMirrors,
        species: null,
        biomorph: null
    },
    viewGainedFocus: function(event) {
        let session = $(this).pedigreeView("option", "session")
        session.viewGainedFocus(session, this)
    },
    _create: function (options) {
        this._super()

        this.options.menuHandler.nextMenuHandler = new PedigreeMenuHandler()
        $(this.element).addClass('pedigreeView')
        let biomorph = this.options.biomorph 
        let pedigreeDiv = $('<div class="pedigreeDiv">')
        pedigreeDiv.appendTo(this.element)
        let biomorphWidth = biomorph.getWidth();
        let biomorphHeight = biomorph.getHeight();
        console.log('biomorph ' + biomorphWidth + 'x' + biomorphHeight)
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
        canvas.addClass('pedigreeBox')
        canvas.appendTo(pedigreeDiv)
        canvas.draggable()
        console.log(canvas[0])
        biomorph.drawer = canvas[0]
        $(canvas).data('genotype', biomorph)
        biomorph.develop()

    },
    buildMenus: function(menu) {
        this._super('buildMenus')
        $(this.element).find('.menuitemDrawOutOffspring').css('display', 'inline-block')
        $(this.element).find('.menuitemMove').css('display', 'inline-block')
        $(this.element).find('.menuitemDetach').css('display', 'inline-block')
        $(this.element).find('.menuitemKill').css('display', 'inline-block')
        $(this.element).find('.menuitemNoMirrors').css('display', 'inline-block')
        $(this.element).find('.menuitemSingleMirror').css('display', 'inline-block')
        $(this.element).find('.menuitemDoubleMirror').css('display', 'inline-block')       
        $(this.element).find('.menuitemPedigreeSep').css('display', 'inline-block')       
        
        $(this.element).find('.menuitemDrawOutOffspring img').css('display', 'inline-block')
        $(this.element).find('.menuitemMove img').css('display', 'none')
        $(this.element).find('.menuitemDetach img').css('display', 'none')
        $(this.element).find('.menuitemKill img').css('display', 'none')
        $(this.element).find('.menuitemNoMirrors img').css('display', 'inline-block')
        $(this.element).find('.menuitemSingleMirror img').css('display', 'none')
        $(this.element).find('.menuitemDoubleMirror img').css('display', 'none')       

    },
    updatePedigreeModeCheckboxes: function(name) {
        let drawOutOffspring = $(this.element).find('.menuitemDrawOutOffspring img')
        let move = $(this.element).find('.menuitemMove img')
        let detach = $(this.element).find('.menuitemDetach img')
        let kill = $(this.element).find('.menuitemKill img')
        switch(name) {
        case 'DrawOutOffspring':
            this.theMode = PedigreeMode.DrawOutOffspring
            drawOutOffspring.css('display', 'inline-block')
            move.css('display', 'none')
            detach.css('display', 'none')
            kill.css('display', 'none')
            break
        case 'Move':
            this.theMode = PedigreeMode.Move
            drawOutOffspring.css('display', 'none')
            move.css('display', 'inline-block')
            detach.css('display', 'none')
            kill.css('display', 'none')
            break
        case 'Detach':
            this.theMode = PedigreeMode.Detach
            drawOutOffspring.css('display', 'none')
            move.css('display', 'none')
            detach.css('display', 'inline-block')
            kill.css('display', 'none')
            break
        case 'Kill':
            this.theMode = PedigreeMode.Kill
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

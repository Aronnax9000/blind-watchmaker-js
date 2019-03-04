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

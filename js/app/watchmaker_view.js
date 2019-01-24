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
    appendmenuitem: function(title, menuid) {
        let li = $('<li>')
        li.addClass('menuitem' + menuid)
        let a = $('<a>' + title + '</a>')
        li.append(a)
        $(a).data('menuid', menuid)
        this._on(a, {'click': function (event){
            this.menuclick(event)}})
            $(this.element).find('> ul').append(li)
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
        this.appendmenuitem('Display pedigree (1)','DisplayPedigree')
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
        this.appendmenuitem('----')
        this.appendmenuitem('Draw Out Offspring (2)','DrawOutOffspring')
        this.appendmenuitem('No Mirrors (3)','NoMirrors')
        this.appendmenuitem('Single Mirror (4)','SingleMirror')
        this.appendmenuitem('Double Mirror (5)','DoubleMirror')
        this.appendmenuitem('----')
        this.appendmenuitem('Move (6)','Move')
        this.appendmenuitem('Detach (7)','Detach')
        this.appendmenuitem('Kill (8)','Kill')
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
        this.appendmenuitem('About Blind Watchmaker', 'AboutBlindWatchmaker')
    }
})

$.widget('dawk.dropdownmenu', {
    options: {
        session: null
    },
    _create: function() {
        let menu = $('<ul>').addClass('dropdown')
        menu.appendTo(this.element)
        $("<li>").filemenu({session: this.options.session}).appendTo(menu)
        $("<li>").editmenu({session: this.options.session}).appendTo(menu)
        $("<li>").operationmenu({session: this.options.session}).appendTo(menu)
        $("<li>").animalmenu({session: this.options.session}).appendTo(menu)
        $("<li>").viewmenu({session: this.options.session}).appendTo(menu)
        $("<li>").helpmenu({session: this.options.session}).appendTo(menu)
        this.options.session.buildMenus(menu)
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
        case 'AboutBlindWatchmaker':
            $("<div>").about({appendTo: this.element,
                })
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


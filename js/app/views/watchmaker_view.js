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
    },
    viewLostFocus: function(event, ui) {
    },

})

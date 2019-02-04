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

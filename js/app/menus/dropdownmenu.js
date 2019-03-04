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

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

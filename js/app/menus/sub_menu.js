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
    appendcheckboxmenuitem: function(title, menuid, hidden) {
        let a = this.appendmenuitem(title, menuid, hidden).children('a').get(0)
        let checkbox = $("<span class='checkbox'><img src='img/checkbox.png' />&nbsp;</span>")
        checkbox.prependTo(a)
    },
    appendmenuitem: function(title, menuid, hidden, imgsrc) {
        let li = $('<li>')
        li.addClass('menuitem' + menuid)
        if(hidden) {
            $(li).css('display','none')
        }
        let str = '<a>';
        if(imgsrc != null) {
            str+= '<img src="' + imgsrc + '" class="menuicon" />'
        }
        str += title + '</a>'
        let a = $(str)
        li.append(a)
        $(a).data('menuid', menuid)
        this._on(a, {'click': function (event){
            this.menuclick(event)}})
            $(this.element).find('> ul').append(li);
        return li
    },
    menuclick: function(event) {
        $(this.element).closest('.watchmakerMenuBar').dropdownmenu('menuclick', event)
    }

})


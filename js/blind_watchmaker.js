$.widget('dawk.blindWatchmaker', {
    options: {
        menu: null
    } ,
    _create: function () {
        var ul = $('<ul class="watchmakerTabs"></ul>');
        this.element.append(ul);
        this.element.tabs({activate: this.on_activate});
        
        this.newMonochromeSession();
        this.newMonochromeSession();
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
        this.buildMenu();
    },
    on_activate: function (event, ui) {
        var parents = $(ui.newTab).parents('.blindWatchmaker').get(0);
        $(parents).blindWatchmaker('buildMenu');
    },
    raiseAlert: function() { console.log('Blindwatchmaker callback from view'); },
    
    newMonochromeSession: function() {
        var index = $(this.element).children('ul').find('li').length;
        var uuid = uuidv4();
        
        var string = '<li><a href="#' + uuid + '">' + index + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        var sessionName = 'Monochrome ' + index;
        div.watchmakerSession({'name': sessionName, 'blindWatchmaker': this});
        this.element.tabs("refresh");
    },
    buildMenu: function() {
//        console.log('bw buildMenu');
        $(this.element).find('.watchmakerMenu').each(function() {this.remove();});
        var menu = $('<ul class="watchmakerMenu"></ul>');
        $(this.element).append(menu);
        var liTop = $('<li><div>Menu</div></li>');
        menu.append(liTop);
        var menuContents = $("<ul></ul>");
        liTop.append(menuContents);
        if($(this.element).find('.watchmakerSession').length != 0) {
            var liCloseSession = $('<li><div>Close session</div></li>');
            this._on(liCloseSession, {click: 'closeSession'});
            menuContents.append(liCloseSession);
        }

        
//        console.log($(this.element).tabs("option", "active"));
        var activeIndex = $(this.element).tabs("option", "active");
//        console.log(activeIndex);
        var activeSession = $(this.element).find('.watchmakerSession').get(activeIndex);
        var sessionName = $(activeSession).watchmakerSession('option', 'name');
        var sessionLi = $("<li><div>" + sessionName + "</div></li>")
        menuContents.append(sessionLi);
        var sessionMenu = $('<ul></ul>');
        sessionLi.append(sessionMenu);
        $(activeSession).watchmakerSession('buildMenu', sessionMenu);

        menu.menu().show();
    },
    closeSession: function() {
        var selectedIndex = this.element.tabs('option', 'active');
        console.log('selectedIndex ' + selectedIndex);
        var selectedDiv = $(this.element).find('.watchmakerSession').get(selectedIndex);
        var ul = this.element.find('ul.watchmakerTabs').get(0);
        console.log(ul);
        var liToRemove = $(ul).find('li').get(selectedIndex);
        var divToRemove = $(this.element).find('div').get(selectedIndex);
        console.log(liToRemove);
        console.log(divToRemove);
        $(divToRemove).remove();
        $(liToRemove).remove();
        this.element.tabs("refresh");
    }
});
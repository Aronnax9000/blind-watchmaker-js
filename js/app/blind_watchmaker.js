$.widget('dawk.blindWatchmaker', {
    options: {
        menu: null,
        sessionCount: 0,
    } ,
    _create: function () {
        var ul = $('<ul class="watchmakerTabs"></ul>');
        this.element.append(ul);
        this.element.tabs({activate: this.on_activate});
        var availableSpecies = _speciesFactorySingleton.getRegisteredSpecies()
        availableSpecies.forEach(availableSpecie => {
            this.newWatchmakerSession(availableSpecie)
        })
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
        this.buildMenu();
    },
    on_activate: function (event, ui) {
        var parents = $(ui.newTab).parents('.blindWatchmaker').get(0);
        $(parents).blindWatchmaker('buildMenu');
    },
    raiseAlert: function() {
    },
    newWatchmakerSession: function(species) {
        var index = this.options.sessionCount;
        this.options.sessionCount++;
        var uuid = uuidv4();
        var sessionName = species //+ ' ' + index;
        var newWSession = new WatchmakerSession(species)

        var string = '<li>'
        string += '<a href="#' + uuid + '">' 
        
        var sessionIcon = newWSession.options.sessionIcon
        if(sessionIcon)
            string += '<img src="' + newWSession.options.sessionIcon + '">'
        string += sessionName 
        + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.watchmakerSessionTab({
            'session': newWSession,
            'name': sessionName, 'blindWatchmaker': this, species: species});
        var tabcount = $(this.element).children('ul.watchmakerTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);

    },
    buildMenu: function() {
        $(this.element).find('.watchmakerMenu').each(function() {this.remove();});
        var menu = $('<ul class="watchmakerMenu"></ul>');
        $(this.element).append(menu);
        var liTop = $('<li><div>Menu</div></li>');
        menu.append(liTop);
        var menuContents = $("<ul></ul>");
        liTop.append(menuContents);
        var newSessionMenu;
        newSessionMenu = $("<li><div>New Monochrome session</div></li>");
        menuContents.append(newSessionMenu);
        this._on(newSessionMenu, {click: function(event) { this.newWatchmakerSession("Monochrome");}});
        newSessionMenu = $("<li><div>New Colour session</div></li>");
        menuContents.append(newSessionMenu);
        this._on(newSessionMenu, {click: function(event) { this.newWatchmakerSession("Colour");}});
        newSessionMenu = $("<li><div>New Snails session</div></li>");
        menuContents.append(newSessionMenu);
        this._on(newSessionMenu, {click: function(event) { this.newWatchmakerSession("Snails");}});
        newSessionMenu = $("<li><div>New Arthromorphs session</div></li>");
        menuContents.append(newSessionMenu);
        this._on(newSessionMenu, {click: function(event) { this.newWatchmakerSession("Arthromorphs");}});
        
        if($(this.element).find('.watchmakerSessionTab').length != 0) {
            var liCloseSession = $('<li><div>Close session</div></li>');
            this._on(liCloseSession, {click: 'closeSession'});
            menuContents.append(liCloseSession);
        }

        
        var activeIndex = $(this.element).tabs("option", "active");
        var activeSession = $(this.element).find('.watchmakerSessionTab').get(activeIndex);
        var sessionName = $(activeSession).watchmakerSessionTab('option', 'name');
        var sessionLi = $("<li><div>" + sessionName + "</div></li>")
        menuContents.append(sessionLi);
        var sessionMenu = $('<ul></ul>');
        sessionLi.append(sessionMenu);
        $(activeSession).watchmakerSessionTab('buildMenu', sessionMenu);

        menu.menu().show();
    },
    closeSession: function() {
        var selectedIndex = this.element.tabs('option', 'active');
        var selectedDiv = $(this.element).find('.watchmakerSessionTab').get(selectedIndex);
        var ul = this.element.find('ul.watchmakerTabs').get(0);
        var liToRemove = $(ul).find('li').get(selectedIndex);
        var divToRemove = $(this.element).find('div').get(selectedIndex);
        $(divToRemove).remove();
        $(liToRemove).remove();
        this.element.tabs("refresh");
    }
});
/*
 * Blind Watchmaker, the entry point for the application. ABC
 */
$.widget('dawk.blindWatchmaker', {
    options: {
        interval: 1,
        created: null,
        sessionCount: 0,
        closeable: false
    },
    autosave: function() {
        console.log('autosave')
        this.save()
        this._delay(this.autosave, this.options.interval * 5000);
    },
    save: function() {
        let state = JSON.stringify(this.getmodel())
        let stateBase64 = state.toString('base64')
        var wayinfuture = new Date('09 Feb 3859 00:00:00 UTC');
        let expiry = ';expires=' + wayinfuture.toUTCString()
        document.cookie = 'watchmaker_state=' + stateBase64 + expiry
        console.log(state)
        console.log(stateBase64)
    },
    getsessions: function() {
        return $(this.element).find('.watchmakerSessionTab')
    },
    getmodel: function () {
        let model = {
                created: this.options.created,
                sessions: []
        } 
        $(this.getsessions()).each(function() {
            let sessionModel = $(this).watchmakerSessionTab('getmodel')
            model.sessions.push(sessionModel)
        })
        return model
    },
    uuidv4: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }) 
    },
    handlekeypress: function(event) {
        let activeTabIdx = $(this.element).tabs('option','active');
        let sessionTab = $('.watchmakerSessionTab').get(activeTabIdx)
        $(sessionTab).watchmakerSessionTab('handlekeypress', event)
        
    },
    _create: function () {
        //let query = document.search 
        var ul = $('<ul class="watchmakerTabs"></ul>');
        this.element.append(ul);
        this.element.tabs({activate: this.on_activate});
        var availableSpecies = _speciesFactorySingleton.getRegisteredSpecies()
        availableSpecies.forEach(availableSpecie => {
            this.newWatchmakerSession(availableSpecie)
        })
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
        $(document).keypress(function(event) {
            $(document).find('.blindWatchmaker').blindWatchmaker('handlekeypress',event)
        })
//      this.autosave()
    },
    on_activate: function (event, ui) {
    },
    raiseAlert: function() {
    },
    newWatchmakerSession: function(species) {
        var index = this.options.sessionCount;
        this.options.sessionCount++;
        var uuid = this.uuidv4();
        var sessionName = species //+ ' ' + index;
        var newWSession = new WatchmakerSession(species)

        var string = '<li>'
            string += '<a href="#' + uuid + '">';

        var sessionIcon = newWSession.options.sessionIcon
        if(sessionIcon)
            string += '<img class="tabicon" src="' + newWSession.options.sessionIcon + '">'
            string += sessionName + '</a>'
            if(this.options.closeable) {
                string += '<span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
            }
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


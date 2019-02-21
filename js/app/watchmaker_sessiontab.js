$.widget('dawk.watchmakerSessionTab', {
    options: {
        species: null,
        session: null,
        name: 'Default Session',
        blindWatchmaker: null
    },
    uuidv4: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    },
    handlekeypress: function(event) {
        let activeTabIdx = $(this.element).tabs('option','active');
        let viewTab = $(this.element).find('.watchmakerView').get(activeTabIdx)
        if($(viewTab).hasClass('engineeringView')) {
            $(viewTab).engineeringView('handlekeypress', event)
        } else if($(viewTab).hasClass('breedingView')) {
            $(viewTab).breedingView('handlekeypress', event)
        } else if($(viewTab).hasClass('albumView')) {
            $(viewTab).albumView('handlekeypress', event)
        } else if($(viewTab).hasClass('pedigreeView')) {
            $(viewTab).pedigreeView('handlekeypress', event)
        } else if($(viewTab).hasClass('triangleView')) {
            $(viewTab).triangleView('handlekeypress', event)
        } else if($(viewTab).hasClass('driftView')) {
            $(viewTab).driftView('handlekeypress', event)
        } else if($(viewTab).hasClass('sweepView')) {
            $(viewTab).sweepView('handlekeypress', event)
        } else if($(viewTab).hasClass('arrayView')) {
            $(viewTab).sweepView('handlekeypress', event)
        } else if($(viewTab).hasClass('fossilsView')) {
            $(viewTab).fossilsView('handlekeypress', event)
        }

        
    },    
    raiseAlert: function(newMenu) {
        var blindWatchmaker = $(this.element).watchmakerSessionTab('option', 'blindWatchmaker');
        $(blindWatchmaker.element).blindWatchmaker('raiseAlert');
    },
    on_activate: function (event, ui) {
        // One of the session's views, like Breeding, has just become active.
        var newlyActiveView = $(ui.newTab).parents('.watchmakerView').get(0);
        $(ui.oldPanel).trigger('viewLostFocus');
        $(ui.newPanel).trigger('viewGainedFocus');
    },   
    getmodel: function() {
        return {
            name: this.options.name, 
            species: this.options.species,
            session: this.options.session.getModel(),
            views: this.getviews()
            }
    },
    getviews: function() {
        let views = []
        let type = 'unknown view'
        let viewmodel = null
        let element = this.element
        $(element).find('.watchmakerView').each(function() {
            if($(element).hasClass('breedingView')) {
                type = 'Breeding';
                model = $(this).breedingView('getmodel')    
            } else if($(element).hasClass('engineeringView')) {
                type = 'Engineering';
                model = $(this).engineeringView('getmodel')    
            } else if($(element).hasClass('pedigreeView')) {
                type = 'Pedigree';
                model = $(this).engineeringView('getmodel')    
            } else if($(element).hasClass('triangleView')) {
                type = 'Triangle';
                model = $(this).engineeringView('getmodel')    
            }
            
        })
    },
    _create: function () {
        let options = this.options
        var species = options.species
        this.element.addClass('watchmakerSessionTab');
        var ul = $('<ul class="watchmakerViewTabs"></ul>');
        this.element.append(ul); 
        this.element.tabs({activate: this.on_activate});
        switch(options.session.options.defaultView) {
        case 'Engineering':
            this.newEngineeringView();
            break
        case 'NewRandomStart':
            this.newBreedingView(null, true)
            break
        case 'Breeding':
        default:
            this.newBreedingView();
        }
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
    },
    newAlbumView: function(album, showImmediately) {
        var alreadyOpen = null
        $(this.element).find('.albumView').each(function() {
            if(album == $(this).data('album')) {
                alreadyOpen = this
            }
        })
        if(alreadyOpen != null) {
        } else {
            this.openAlbumView(album, showImmediately)
        }
    },
    openAlbumView: function(album, showImmediately) {
    
        var species = this.options.species
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconAlbum_ALAN_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" src="' + viewIcon + '">' 
            + album.name
            + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.albumView({
            session: this.options.session, 
            watchmakerSessionTab: this, 
            species: species,
            album: album});
        $(newTabLi).find('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    
        this.element.tabs("refresh");
        if(showImmediately) {
            var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
            this.element.tabs("refresh");
            this.element.tabs("option", "active", tabcount - 1);
        }
    },
    newBreedingView: function(biomorph, newRandomStart) {
        var species = this.options.species
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconFlipBirdToBreedingGrid_ICON_00261_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" src="' + viewIcon + '">' 
            + (newRandomStart ? 'New Random Start' : 'Breeding')
            + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.breedingView({
            newRandomStart: newRandomStart,
            session: this.options.session, 
            watchmakerSessionTab: this, 
            species: species,
            biomorph: biomorph});
        $(newTabLi).find('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    
        this.element.tabs("refresh");
        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);

    },
    newEngineeringView: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/Hypodermic_PICT_03937_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" src="' + viewIcon + '">' 
            + 'Engineering</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.engineeringView({session: this.options.session, 
            biomorph: biomorph,
            watchmakerSessionTab: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    },
    newPlayBackFossils: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconFossilRecord_ALAN_32x32.png';
        var string = '<li><a href="#' + uuid + '">'
        + '<img class="tabicon" src="' + viewIcon + '">' 
        + 'Fossils'
        + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.fossilsView({session: this.options.session, 
            watchmakerSessionTab: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    },
    newDriftView: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconDrift_ALAN_32x32.png';
        var string = '<li><a href="#' + uuid + '">'
        + '<img class="tabicon" src="' + viewIcon + '">' 
        + (this.options.session.options.driftsweep ? 'Drift Sweep': 'Drift')
        + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        if(this.options.session.options.driftsweep) {
            div.sweepView({session: this.options.session, 
                biomorph: biomorph,
                watchmakerSessionTab: this});
        } else {
            div.driftView({session: this.options.session, 
                biomorph: biomorph,
                watchmakerSessionTab: this});
        }
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    },
    newPedigreeView: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/Pedigree_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" class="tabicon" src="' + viewIcon + '">' 
            + 'Pedigree</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.pedigreeView({session: this.options.session, 
            biomorph: biomorph,
            watchmakerSessionTab: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    },    
    newTriangleView: function(biomorph) {
        var uuid = this.uuidv4();
        var viewIcon = 'img/IconTriangle_ALAN_32x32.png'
            var string = '<li><a href="#' + uuid + '">'
            + '<img class="tabicon" src="' + viewIcon + '">' 
            + 'Triangle</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.triangleView({session: this.options.session, 
            watchmakerSessionTab: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    }     
});


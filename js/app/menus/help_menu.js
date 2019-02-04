$.widget('dawk.helpmenu', $.dawk.sub_menu, {
    options: {
        title: 'Help'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Help with current operation', 'HelpWithCurrentOperation')
        this.appendmenuitem('Miscellaneous Help', 'MiscellaneousHelp')
        this.appendmenuitem('About Classic Blind Watchmaker', 'AboutClassicBlindWatchmaker')
        this.appendmenuitem('About Classic Exhibition Colour', 'AboutClassicExhibitionColour')
        this.appendmenuitem('About Classic Arthomorphs', 'AboutClassicArthromorphs')
        this.appendmenuitem('About WatchmakerJS', 'AboutWatchmakerJS')
        this.appendmenuitem('Donate', 'Donate')
    }
})

$.widget('dawk.blindWatchmaker', {
    options: {

    } ,
    _create: function () {
        var ul = $('<ul></ul>');
        this.element.append(ul);
        this.element.tabs();
        this.newMonochromeSession();
        this.newMonochromeSession();
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");

    },
    newMonochromeSession: function() {
        var uuid = uuidv4();
        var string = '<li><a href="#' + uuid + '">Monochrome</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.watchmakerSession();
        this.element.tabs("refresh");
    },

});
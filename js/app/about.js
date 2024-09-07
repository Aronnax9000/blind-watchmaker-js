// About
$.widget('dawk.about', {
    options: {
        slides: [
            ['About Blind Watchmaker', 'img/AboutBlindWatchmaker_PICT_26817_459x287.png', 459, 287],
            ['About Colour Watchmaker', 'img/AboutColourWatchmaker_PICT_00257_486x352.png', 486, 352],
            ['About Arthromorphs', 'img/AboutArthromorphs284x136.png', 284, 136],
            ['About Blind Watchmaker Suite', 'img/AboutWatchmakerJS468x352.png', 468, 352]
            
        ],
        index: 0,
    },
    _create: function() {
        let slides = this.options.slides
        let index = this.options.index
        let img = $('<img>')
        $(img).attr('src', slides[index][1])
        let dialogdiv = $('<div>')
        $(dialogdiv).addClass('aboutnomarginymcboatface')
        $(dialogdiv).attr('title', slides[index][0])
        $(dialogdiv).append(img)
        $(dialogdiv).dialog({
            width: slides[index][2] + 38, 
            height: slides[index][3] + 52,
            classes: 
            {
                "ui-dialog": "about",
            },
            modal: true,
            appendTo: this.options.appendTo
        })
    }
})



/*
 * Drift view
 */
$.widget( "dawk.fossilsView", $.dawk.watchmakerView, {
    _create: function(options) {
        this._super("_create")
        $(this.element).addClass('fossilsView')
        let container = $('<div class="container">')
        $(this.element).append(container)
        
        let fossilDiv = $('<div class="fossilDiv">')
        container.append(fossilDiv)
        let canvas = $('<canvas width="985" height="600" class="box midBox">')
        fossilDiv.append(canvas)
        let fossilrecord = this.options.session.fossilrecord
        let fossilrecordmax = fossilrecord.length - 1
        console.log('Fossil record max ' + fossilrecordmax)
        let slider = $("<div>").slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: fossilrecordmax,
            value: fossilrecordmax,
            slide: function( event, ui ) {
                let view = $(event.target).closest('.watchmakerView')
                $(view).fossilsView('showfossil', ui.value)
            },
            classes: {
                "ui-slider": "fossil-slider",
              }
        });
        
        container.append(slider)
        this.showfossil(fossilrecordmax)
            
    },
    showfossil: function(index) {
        let canvas = $(this.element).find('canvas')[0]
        let biomorph = this.options.session.fossilrecord[index]
        biomorph.drawer = canvas
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        $(this.element).find('.fossil-slider').slider('option', 'max', this.options.session.fossilrecord.length - 1)
    },
    viewGainedFocus: function(event) {
        let session = $(this).fossilsView("option", "session")
        $(this).fossilsView("updateMenus", session, this)
        $(this).find('.fossil-slider').slider('option', 'max', session.fossilrecord.length - 1)
        session.updateMenus(session, this)
    },

})

/*
 * Album Page view
 */
$.widget( "dawk.albumPageView", {
    options: {
        pageNumber: 0,
        isIndexView: true
    },
    _create: function() {
        this._super()
        $(this.element).addClass('albumBoxes')
        this._on(this.element, {'click': function(event) {
            if(this.options.isIndexView) {
                this.options.isIndexView = false
                albumView = $(event.target).closest('.albumView')
                $(albumView).albumView('showPage', this.options.pageNumber)
                this.developAll()
            }
        }})
        return this
    },
    updateGeneboxes: function(target) {
        var geneboxes = $(target).closest('.watchmakerView').find('.geneboxes').get(0);
        _speciesFactorySingleton.updateFromCanvas(this.options.session.species, geneboxes,
                target)

    },
    canvasclicked: function (target) {
        console.log('canvas clicked')
        $(this.element).find('canvas').removeClass('midBox')
        $(target).addClass('midBox')
    },
    developAll: function() {
        console.log('developAll')
        $(this.element).empty()
        $("<p class='albumBoxesPageNo'>Album Page " + (this.options.pageNumber + 1) + "</p>").appendTo(this.element)

        album = this.options.session.album
        let pageNumber = this.options.pageNumber
        let startIndex = pageNumber * 15
        let endIndex = pageNumber + 15
        if(startIndex < album.length) {
            for(let i = startIndex; i <  endIndex && i < album.length; i++) {
                let biomorph = album[i]
                let canvas = $('<canvas class="albumCanvas">')
                if(this.options.isIndexView) {
                    $(canvas).attr('width', 100)
                    $(canvas).attr('height', 100)
                } else {
                    $(canvas).attr('width', 200)
                    $(canvas).attr('height', 200)
                }
                this.element.append(canvas)

                this._on(canvas, {
                    mouseover: function(event) {
                        this.updateGeneboxes(event.target)
                    },
                    click: function(event) {
                        if(! this.options.isIndexView)
                            event.stopPropagation()
                            this.canvasclicked(event.target)
                    }
                })
                biomorph.drawer = canvas[0]
                $(canvas).data('genotype', biomorph)
               
                if(this.options.isIndexView) {
                    biomorph.develop(0.5)    
                } else {
                    biomorph.develop()
                }
                this.updateGeneboxes(canvas[0])
            }
        }
    },
    viewGainedFocus: function(event, ui) {
        console.log('albumPageView gained focus')
        let session  = $(this).albumPageView("option", "session")
        $(this).albumPageView("updateMenus", session, this)
        session.updateMenus(session, this)
        // resume animation (if enabled) here?
    },
})

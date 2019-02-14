/*
 * Album Page view
 */
$.widget( "dawk.albumPageView", {
    options: {
        pageNumber: 0,
        isIndexView: true,
        album: null,
        title: 'Album'
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
        $(this.element).find('canvas').removeClass('midBox')
        $(target).addClass('midBox')
    },
    gotoindex: function() {
        console.log('gotoindex')
        this.options.isIndexView = true
        let albumView = $(this.element).closest('.albumView')[0]
        $(albumView).albumView('showindex')
    },
    developAll: function() {
        $(this.element).empty()
        let p = $("<p class='albumBoxesPageNo'>" + this.options.title + " Page " + (this.options.pageNumber + 1) + "</p>")
        $(p).appendTo(this.element)
        if(! this.options.isIndexView) {
            let indexButton = $("<button>Index</button>")
            $(indexButton).appendTo(p)
            this._on(indexButton, {click: function(event) {
                event.stopPropagation()
                this.gotoindex()
            }})
        }

        biomorphs = this.options.album.biomorphs
        let pageNumber = this.options.pageNumber
        let startIndex = pageNumber * 15
        let endIndex = startIndex + 15
        if(startIndex < biomorphs.length) {
            for(let i = startIndex; i <  endIndex && i < biomorphs.length; i++) {
                let biomorph = biomorphs[i]
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
        let session  = $(this).albumPageView("option", "session")
        $(this).albumPageView("updateMenus", session, this)
        session.updateMenus(session, this)
    },
})

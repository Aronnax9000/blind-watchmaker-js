/*
 * Album view
 */
$.widget( "dawk.albumView", $.dawk.watchmakerView, {
    viewGainedFocus: function(event, ui) {
        console.log('albumView gained focus')
        let session  = $(this).albumView("option", "session")
        $(this).albumView("updateMenus", session, this)
        session.updateMenus(session, this)
        console.log(this)
        let albumPages = $(this).find('.albumBoxes')
        console.log(albumPages)
        $(albumPages).each(function() {$(this).albumPageView('developAll')})
    },
    clear: function(event, ui) {
        console.log('clear')
        console.log(this)
        let canvas = $(this.element).find('.midBox')[0]
        console.log(canvas)
        let biomorph = $(canvas).data('genotype')
        console.log('biomorph')
        console.log(biomorph)
        let album = this.options.session.album
        for(let i = 0; i < album.length; album++) {
            if(biomorph == album[i]) {
                console.log('splice ' + i)
                album.splice(i, 1)
                break
            }
        }
        $(canvas).remove()
        let albumPages = $(this).find('.albumBoxes')
        console.log(albumPages)
        $(albumPages).each(function() {$(this).albumPageView('developAll')})
        
    },
    showPage: function(pageNumber) {
        console.log(pageNumber)
        
        $(this.element).find('.albumBoxes').each(function() {
            let candidatePageNo = $(this).albumPageView('option', 'pageNumber')
            console.log('candidatepage' + candidatePageNo)
            if(candidatePageNo != pageNumber) {
                $(this).css('display', 'none')
            }
        })
        $(this.element).find('.albumPageContainer').removeClass('albumPageContainerIndex')
        
    },
    _create: function() {
        this._super()
        $(this.element).addClass('albumView')
        var species = this.options.session.species

        var geneboxes_options = {
            engineering : false,
            session: this.options.session
        }
        var geneboxes = $("<div>")
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        $(this.element).append(geneboxes)
        
        let container = $("<div class='albumPageContainer albumPageContainerIndex'>")
        $(this.element).append(container)

        
        for(let i = 0; i < 4; i++) {
            let albumPageView = $('<div>').albumPageView({pageNumber: i, session: this.options.session})
            $(container).append(albumPageView)
            $(albumPageView).albumPageView('developAll')
        }
        this.options.menuHandler.nextMenuHandler = new AlbumMenuHandler()
   
    }
})

function AlbumMenuHandler() {
}

AlbumMenuHandler.prototype.menuclick = function(event) {
    console.log('Album Menu Clear')
    let target = event.target
    let menuid = $(target).data('menuid')
    switch(menuid) {
    case 'Clear':
        $(event.target).closest('.albumView').albumView('clear', event, null)
        return false
    }
    return true;
}

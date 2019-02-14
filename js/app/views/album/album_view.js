/*
 * Album view
 */
$.widget( "dawk.albumView", $.dawk.watchmakerView, {
    options: {
        album: null
    },
    viewGainedFocus: function(event, ui) {
        let session  = $(this).albumView("option", "session")
        $(this).albumView("updateMenus", session, this)
        session.updateMenus(session, this)
        let albumPages = $(this).find('.albumBoxes')
        $(albumPages).each(function() {$(this).albumPageView('developAll')})
    },
    clear: function(event, ui) {
        let canvas = $(this.element).find('.midBox')[0]
        let biomorph = $(canvas).data('genotype')
        let biomorphs = this.options.album.biomorphs
        for(let i = 0; i < biomorphs.length; i++) {
            if(biomorph == biomorphs[i]) {
                biomorphs.splice(i, 1)
                break
            }
        }
        $(canvas).remove()
        let albumPages = $(this).find('.albumBoxes')
        $(albumPages).each(function() {$(this).albumPageView('developAll')})
        
    },
    showPage: function(pageNumber) {
        console.log('showpage ' + pageNumber)
        $(this.element).find('.albumBoxes').each(function() {
            
            let candidatePageNo = $(this).albumPageView('option', 'pageNumber')
            
            if(candidatePageNo != pageNumber) {
                $(this).addClass('albumBoxesHidden')
            }
        })
        $(this.element).find('.albumPageContainer').removeClass('albumPageContainerIndex')
        
    },
    savealbum: function() {
        $('<div>').saveDialog({album: this.options.album,
            session: this.options.session,
            appendTo: this.element})
    },
    showindex: function() {
        console.log('albumView.showindex')
        let albumBoxes = $(this.element).find('.albumBoxes')
        albumBoxes.each(function() {
            $(this).removeClass('albumBoxesHidden')
            $(this).albumPageView('option', 'isIndexView', true)
            $(this).albumPageView('developAll')
            console.log(this)
        })
        $(this.element).find('.albumPageContainer').addClass('albumPageContainerIndex')
    },
    _create: function() {
        this._super()
        $(this.element).addClass('albumView')
        if(this.options.album == null) {
            this.options.album = this.options.session.album
        }
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
            let albumPageView = $('<div>').albumPageView({
                pageNumber: i, 
                'album': this.options.album, 
                session: this.options.session,
                title: this.options.album.name})
            $(container).append(albumPageView)
            $(albumPageView).albumPageView('developAll')
            
        }
        this.options.menuHandler.nextMenuHandler = new AlbumMenuHandler()
   
    }
})

function AlbumMenuHandler() {
}

AlbumMenuHandler.prototype.menuclick = function(event) {
    let target = event.target
    let menuid = $(target).data('menuid')
    switch(menuid) {
    case 'Clear':
        $(event.target).closest('.albumView').albumView('clear', event, null)
        return false
    case 'SaveAlbum': 
        let view = $(event.target).closest('.albumView').albumView('savealbum', event, null)

        return false
    }
    
    return true;
}

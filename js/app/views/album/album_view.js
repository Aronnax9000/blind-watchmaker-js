/*
 * Album view
 */
$.widget( "dawk.albumView", $.dawk.watchmakerView, {
    options: {
        album: null,
        type: 'Album'
    },
    viewGainedFocus: function(event, ui) {
        let session  = $(this).albumView("option", "session")
        $(this).albumView("updateMenus", session, this)
        session.updateMenus(session, this)
        let albumPages = $(this).find('.albumBoxes')
        $(albumPages).each(function() {$(this).albumPageView('developAll')})
    },
    clear: function(target, ui) {
        let div = $(this.element).find('.highlighted')
        let canvas = $(div).find('canvas')[0]
        let biomorph = $(canvas).data('genotype')
        let biomorphs = this.options.album.biomorphs
        for(let i = 0; i < biomorphs.length; i++) {
            if(biomorph == biomorphs[i]) {
                biomorphs.splice(i, 1)
                break
            }
        }
        $(div).remove()
        let albumPages = $(this).find('.albumBoxes')
        $(albumPages).each(function() {$(this).albumPageView('developAll')})
        
    },
    showPage: function(pageNumber) {
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
        let albumBoxes = $(this.element).find('.albumBoxes')
        albumBoxes.each(function() {
            $(this).removeClass('albumBoxesHidden')
            $(this).albumPageView('option', 'isIndexView', true)
            $(this).albumPageView('developAll')
        })
        $(this.element).find('.albumPageContainer').addClass('albumPageContainerIndex')
    },
    _create: function() {
        this._super()
        $(this.element).addClass('albumView')
        if(this.options.album == null) {
            this.options.album = this.options.session.album
        }
        $(this.element).data('album', this.options.album)
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
        this.options.menuHandler.nextMenuHandler = new AlbumMenuHandler(this.options.session)
   
    }
})

function AlbumMenuHandler(session) {
    this.session = session
}

AlbumMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'Clear':
        $(target).closest('.albumView').albumView('clear', target, null)
        return false
    case 'Paste':
        if(this.session.clipboard == null) {
            return
        }
        let albumView = $(target).closest('.albumView')
        console.log(albumView)
        let album = albumView.albumView('option', 'album')
        console.log(album)
        let biomorphs = album.biomorphs

        let newBiomorph = _speciesFactorySingleton.getSpecies(
                this.session.species, this.session, null);
        this.session.clipboard.copyBiomorph(newBiomorph)
        if(biomorphs.length < 60) {
            biomorphs.push(newBiomorph)
            albumView.find('.albumBoxes').albumPageView('developAll')
        } else {
            var audio = new Audio('sounds/newbip.mp3');
            audio.play();
        }
        
        $(event.target).closest('.albumView').albumView('clear', event, null)
        return false
    case 'SaveAlbum': 
        let view = $(event.target).closest('.albumView').albumView('savealbum', event, null)
        return false
    case 'HelpWithCurrentOperation':
        console.log('album help')
        $("<div>").helpDialog({helpkey: 'ALBUM_HELP', appendTo: $(target).closest('.watchmakerView')})
        return false
    }
    
    return true;
}

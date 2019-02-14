

$.widget('dawk.fileDialog', $.ui.dialog, {
    options: {
        "ui-dialog": "file-dialog",
    },
    _create: function() {

        $(this.element).addClass('fileDialog')
        $(this.element).attr('title', 'Load to Session Album')
        let input = $('<input type="file" class="fileInput" multiple >')
        $(this.element).append(input)       
        let buttonDiv = $('<div class="fileButtonDiv">').appendTo(this.element)
        let addSelectedToSessionAlbum = $('<button class="fileDialogButton fileButtonHidden">Add Biomorph</button>')
        $(buttonDiv).append(addSelectedToSessionAlbum)
        this._on(addSelectedToSessionAlbum, {click: function(event) {this.addbiomorphtoalbum(event)}})
        let addSelectedAlbumToSessionAlbum = $('<button class="fileDialogButton fileButtonHidden">Add All</button>')
        $(buttonDiv).append(addSelectedAlbumToSessionAlbum)
        this._on(addSelectedAlbumToSessionAlbum, {click: function(event) {this.addalbumtoalbum(event)}})
        let openAlbum = $('<button class="fileDialogButton fileButtonHidden">Open Album</button>')
        this._on(openAlbum, {click: function(event) {this.openalbum(event)}})
        $(buttonDiv).append(openAlbum)

        $(this.element).append($("<div class='fileListPreviewHeader'><div>Album Name</div><div>Biomorphs</div></div>"))

        let fileListPreviewFlexDiv = $('<div class="fileListPreviewFlexDiv">')
        $(this.element).append(fileListPreviewFlexDiv)
        let fileList = $('<div>').addClass('fileList')
        $(fileListPreviewFlexDiv).append(fileList)
        this.loadsessionalbums(fileList)
        this._on(input, {change: function(event) {
            this.filechange(event)
        }})
        this.options.width = 450
        this.options.height = 350
        this.options.modal = true
        $(fileListPreviewFlexDiv).append($('<canvas width="200" height="200" class="previewFile">'))
        let slider = $("<div>").slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 0,
            value: 0,
            slide: function( event, ui ) {
                let view = $(event.target).closest('.fileDialog')
                $(view).fileDialog('showalbumitem', ui.value)
            },
            classes: {
                "ui-slider": "file-preview-slider",
            }
        });
        $(fileListPreviewFlexDiv).append(slider)

        return this._super()
    },
    addbiomorphtoalbum: function(event) {
        let session = this.options.session
        let slider = $(this.element).find('.file-preview-slider').slider("option", "value");
        let canvas = $(this.element).find('canvas')
        let biomorph = $(canvas).data('genotype')
        let newBiomorph = _speciesFactorySingleton.getSpecies(
                session.species, session, canvas[0]);
        biomorph.copyBiomorph(newBiomorph)
        if(session.album.biomorphs.length < 60) {
            session.album.biomorphs.push(newBiomorph)
        } else {
            var audio = new Audio('sounds/newbip.mp3');
            audio.play();
        }
    },
    addalbumtoalbum: function(event) {
        let session = this.options.session
        let fileDialog = $(event.target).closest('.fileDialog')
        let selectedAlbum = fileDialog.find('.albumSelected')[0]
        let album = $(selectedAlbum).data('album')
        let biomorphs = album.biomorphs
        let sessionAlbumBiomorphs = session.album.biomorphs
        let canvas = $(fileDialog).find('canvas')[0]
        if(sessionAlbumBiomorphs.length + biomorphs.length > 60) {
            var audio = new Audio('sounds/newbip.mp3');
            audio.play();
        } else {
            for(let i = 0; i < biomorphs.length; i++) {
                let newBiomorph = _speciesFactorySingleton.getSpecies(
                        session.species, session, canvas);
                biomorphs[i].copyBiomorph(newBiomorph)
                sessionAlbumBiomorphs.push(newBiomorph)
            }
        }
    },
    openalbum: function(event) {
        let watchmakerSessionTab = $(event.target).closest('.watchmakerSessionTab').eq(0)
        let selectedDiv = $(event.target).closest('.fileDialog').find('.albumSelected')[0]
        let album = $(selectedDiv).data('album')
        $(watchmakerSessionTab).watchmakerSessionTab(
                "newAlbumView", album);
        this.close()
    },
    showalbumitem: function(index) {
        
        let canvas = $(this.element).find('canvas')[0]
        let selectedDiv = $(this.element).find('.albumSelected')[0]
        let biomorph = $(selectedDiv).data('album').biomorphs[index]
        biomorph.drawer = canvas
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
    },
    loadsessionalbums: function(fileList) {
        let sessionAlbums = this.options.session.albums
        for(let j = 0; j < sessionAlbums.length; j++) {
            let album = sessionAlbums[j]
            if(album.file.file != null) {
                let file = album.file.file
                let fileDiv = $('<div class="file fileListElement">' + file.name + '</div>')
                $(fileList).append(fileDiv)
                $(fileDiv).data('album', album)
                this._on(fileDiv, {click: function(event) {this.albumselected(event)}})
                $(fileList).append($('<div class="fileSize">' + album.file.biomorphcount + '</div>'))
            }
        }
    },
    filechange: function(event) {
        let fileDialog = $(event.target).closest('.fileDialog')
        event.stopPropagation()
        event.preventDefault()
        let files = event.target.files
        let str = '';
        let fileList = fileDialog.find('.fileList')
        $(fileList).empty()
        this.loadsessionalbums(fileList)
        let session = this.options.session
        for(let i = 0; i < files.length; i++) {
            let file = files[i]
            let fileDiv = $('<div class="file fileListElement">' + file.name + '</div>')
            $(fileList).append(fileDiv)
            let album = new Album(file.name, session)
            let biomorphFile = new BiomorphFile(session, file)
            album.file = biomorphFile
            $(fileDiv).data('album', album)
            this._on(fileDiv, {click: function(event) {this.albumselected(event)}})
            $(fileList).append($('<div class="fileSize">' + biomorphFile.biomorphcount + '</div>'))
            let reader = new FileReader() 
            reader.onload = function(e) {
                biomorphFile.data = reader.result
                
                for(let index = 0; index < biomorphFile.biomorphcount; index++) {
                    let canvas = $('<canvas>')
                    let biomorph = _speciesFactorySingleton.getSpecies(
                            session.species, session, canvas[0]);
                    biomorph.readFromArrayBuffer(reader.result, index)
                    album.biomorphs.push(biomorph)
                }
            }
            reader.readAsArrayBuffer(file)
        }
    },
    albumselected: function(event) {
        $(event.target).closest('.fileList').find('.fileListElement').removeClass('albumSelected')
        $(event.target).addClass('albumSelected')
        let album = $(event.target).data('album')
        let file = album.file
        let fileDialog = $(event.target).closest('.fileDialog')
        $(fileDialog).find('.fileDialogButton').removeClass('fileButtonHidden')
        let session = this.options.session // $(fileDialog).fileDialog('option', 'session')
        let canvas = fileDialog.find('canvas.previewFile')[0]
        let biomorph = _speciesFactorySingleton.getSpecies(
                session.species, session, canvas);
        $(canvas).data('genotype', biomorph)

        let slider = $(this.element).find('.file-preview-slider')
        $(slider).slider("option", "max", album.biomorphs.length - 1)
        $(slider).slider("option", "value", 0)
        biomorph.readFromArrayBuffer(file.data, 0)
        biomorph.develop()
    }
})



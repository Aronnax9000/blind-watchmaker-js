function BiomorphFile(session, file) {
    this.session = session
    this.file = file
    this.biomorphcount = file.size / session.serializationSize
    this.data = null
    session.files.push(this)
}


$.widget('dawk.fileDialog', $.ui.dialog, {
    options: {
        "ui-dialog": "file-dialog",
    },
    _create: function() {

        $(this.element).addClass('fileDialog')
        $(this.element).attr('title', 'Load to Album')
        let buttonDiv = $('<div class="fileButtonDiv">').appendTo(this.element)
        let input = $('<input type="file" class="fileInput" multiple >')
        $(buttonDiv).append(input)       
        let addSelectedToSessionAlbum = $('<button class="fileDialogButton fileButtonHidden">Add Biomorph to Session Album</button>')
        $(buttonDiv).append(addSelectedToSessionAlbum)
        this._on(addSelectedToSessionAlbum, {click: function(event) {this.addbiomorphtoalbum(event)}})
        let addSelectedAlbumToSessionAlbum = $('<button class="fileDialogButton fileButtonHidden">Add Album to Session Album</button>')
        $(buttonDiv).append(addSelectedAlbumToSessionAlbum)
        this._on(addSelectedAlbumToSessionAlbum, {click: function(event) {this.addalbumtoalbum(event)}})
        let openAlbum = $('<button class="fileDialogButton fileButtonHidden">Open Album</button>')
        this._on(addSelectedAlbumToSessionAlbum, {click: function(event) {this.openalbum(event)}})
        $(buttonDiv).append(openAlbum)

        $(this.element).append($("<div class='fileListPreviewHeader'><div class='file'>Album Name</div><div class='fileSize'>Biomorphs</div></div>"))

        let fileListPreviewFlexDiv = $('<div class="fileListPreviewFlexDiv">')
        $(this.element).append(fileListPreviewFlexDiv)
        let fileList = $('<div>').addClass('fileList')
        $(fileListPreviewFlexDiv).append(fileList)
        this.loadsessionfiles(fileList)
        this._on(input, {change: function(event) {
            this.filechange(event)
        }})
        this.options.width = 850
        this.options.height = 520
        this.options.modal = true
        $(fileListPreviewFlexDiv).append($('<canvas width="400" height="400" class="previewFile">'))
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
    showalbumitem: function(index) {
        let canvas = $(this.element).find('canvas')[0]
        let biomorph = $(canvas).data('genotype')
        biomorph.readFromArrayBuffer(this.options.result, index)
        biomorph.develop()
    },
    loadsessionfiles: function(fileList) {
        let sessionFiles = this.options.session.files
        for(let j = 0; j < sessionFiles.length; j++) {
            let biomorphFile = sessionFiles[j]
            let file = biomorphFile.file
            let fileDiv = $('<div class="file fileListElement">' + file.name + '</div>')
            $(fileList).append(fileDiv)
            $(fileDiv).data('file', biomorphFile)
            this._on(fileDiv, {click: function(event) {this.fileselected(event)}})
            $(fileList).append($('<div class="fileSize">' + biomorphFile.biomorphcount + '</div>'))
        }
    },
    filechange: function(event) {
        let fileDialog = $(event.target).closest('.fileDialog')
        event.stopPropagation()
        event.preventDefault()
        let files = event.target.files
        let str = ''
        let fileList = fileDialog.find('.fileList')
        $(fileList).empty()
        this.loadsessionfiles(fileList)
        for(let i = 0; i < files.length; i++) {
            let file = files[i]
            let fileDiv = $('<div class="file fileListElement">' + file.name + '</div>')
            $(fileList).append(fileDiv)
            let biomorphFile = new BiomorphFile(this.options.session, file)

            $(fileDiv).data('file', biomorphFile)
            this._on(fileDiv, {click: function(event) {this.fileselected(event)}})
            $(fileList).append($('<div class="fileSize">' + biomorphFile.biomorphcount + '</div>'))
        }


        
    },
    fileselected: function(event) {
        $(event.target).closest('.fileList').find('.fileListElement').removeClass('fileSelected')
        $(event.target).addClass('fileSelected')
        let file = $(event.target).data('file')
        
        console.log('File selected ' + file.file.name)
        let fileDialog = $(event.target).closest('.fileDialog')
        $(fileDialog).find('.fileDialogButton').removeClass('fileButtonHidden')
        let session = this.options.session // $(fileDialog).fileDialog('option', 'session')
        let canvas = fileDialog.find('canvas.previewFile')[0]
        console.log(canvas)
        let biomorph = _speciesFactorySingleton.getSpecies(
                        session.species, session, canvas)
        $(canvas).data('genotype', biomorph)
        let reader = new FileReader() 
        let slider = $(this.element).find('.file-preview-slider')

        reader.onload = function(e) {
            console.log('Reader result:')
            console.log(reader.result)
            $(fileDialog).fileDialog('option', 'result', reader.result)
            console.log(session.serializationSize)
            file.data = reader.result
            let resultcount = file.file.size / session.serializationSize
            $(fileDialog).fileDialog('option', 'resultcount', resultcount)
            file.biomorphcount = resultcount
            console.log('result count ' + resultcount)
                    biomorph.readFromArrayBuffer(reader.result, 0)
            biomorph.develop()
            $(slider).slider('option', 'max', resultcount - 1)
        }

        reader.readAsArrayBuffer(file.file)
    }
})



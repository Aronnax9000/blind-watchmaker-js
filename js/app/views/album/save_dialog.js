$.widget('dawk.saveDialog', $.ui.dialog, {
    options: {
        "ui-dialog": "file-dialog",
    },
    _create: function() {

        $(this.element).addClass('saveDialog')
        $(this.element).attr('title', 'Save Album')

        this.options.width = 450
        this.options.height = 350
        this.options.modal = true
        let album = this.options.album
        let biomorphs = album.biomorphs
        let bufferLength = biomorphs.length * this.options.session.serializationSize;
        console.log(bufferLength)
        album.file.data = new ArrayBuffer(bufferLength)
        for(let i = 0; i < biomorphs.length; i++) {
            biomorphs[i].writeToArrayBuffer(album.file.data, i)
        }
        var binary = '';
        var bytes = new Uint8Array( album.file.data );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        let base64 = window.btoa( binary );
        $('<a href="data:application/octet-stream;base64,' + base64 + '">Download album</a>').appendTo(this.element)
        return this._super()
        
        
    },
})



$.widget('dawk.filemenu', $.dawk.sub_menu, {
    options: {
        title: 'File'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Load to Album... (L)', 'LoadToAlbum')
        this.appendmenuitem('Load as Fossils... (O)', 'LoadAsFossils')
        this.appendmenuitem('Save Biomorph...', 'SaveBiomorph')
        this.appendmenuitem('Save Fossils... (F)', 'SaveFossils')
        this.appendmenuitem('Save Album... (S)', 'SaveAlbum')
        this.appendmenuitem('Close Album (W)', 'CloseAlbum')
        this.appendmenuitem('Timing', 'Timing')
        this.appendmenuitem('Quit (Q)', 'Quit')
    }
})

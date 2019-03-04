
$.widget('dawk.editmenu', $.dawk.sub_menu, {
    options: {
        title: 'Edit'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Undo (Z)', 'Undo')
        this.appendmenuitem('----')
        this.appendmenuitem('Cut (X)', 'Cut')
        this.appendmenuitem('Copy (C)', 'Copy')
        this.appendmenuitem('Paste (V)', 'Paste')
        if(this.options.type == 'Album') {
            this.appendmenuitem('Clear', 'Clear')
        }
        this.appendmenuitem('----')
        if(this.options.type == 'Breeding') {
            this.appendcheckboxmenuitem('Highlight Biomorph', 'HighlightBiomorph', false)
        }
        this.appendmenuitem('Add Biomorph to Album (A)', 'AddBiomorphToAlbum')
        this.appendmenuitem('Show Album', 'ShowAlbum')
    }
})


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
        this.appendmenuitem('Clear', 'Clear')
        this.appendmenuitem('----')
        this.appendmenuitem('Highlight Biomorph', 'HighlightBiomorph')
        this.appendmenuitem('Add Biomorph to Album (A)', 'AddBiomorphToAlbum')
        this.appendmenuitem('Show Album', 'ShowAlbum')
    }
})

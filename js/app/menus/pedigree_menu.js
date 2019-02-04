$.widget('dawk.pedigreemenu', $.dawk.sub_menu, {
    options: {
        title: 'Pedigree'
    },
    _create: function() {
        this._super();
        $(this).addClass('pedigreeMenu')
        this.appendmenuitem('Display pedigree (1)','DisplayPedigree')
        this.appendmenuitem('----', 'PedigreeSep', true)
        this.appendcheckboxmenuitem('Draw Out Offspring (2)','DrawOutOffspring', true)
        this.appendcheckboxmenuitem('No Mirrors (3)','NoMirrors', true)
        this.appendcheckboxmenuitem('Single Mirror (4)','SingleMirror', true)
        this.appendcheckboxmenuitem('Double Mirror (5)','DoubleMirror', true)
        this.appendmenuitem('----', 'PedigreeSep', true)
        this.appendcheckboxmenuitem('Move (6)','Move', true)
        this.appendcheckboxmenuitem('Detach (7)','Detach', true)
        this.appendcheckboxmenuitem('Kill (8)','Kill', true)
    }
})

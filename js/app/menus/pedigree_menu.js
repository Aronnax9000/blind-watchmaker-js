$.widget('dawk.pedigreemenu', $.dawk.sub_menu, {
    options: {
        title: 'Pedigree'
    },
    _create: function() {
        this._super();
        $(this).addClass('pedigreeMenu')
        this.appendmenuitem('Display pedigree (1)','DisplayPedigree')
        if(this.options.type == 'Pedigree') {
            this.appendmenuitem('----', 'PedigreeSep')
            this.appendcheckboxmenuitem('Draw Out Offspring (2)','DrawOutOffspring')
            this.appendcheckboxmenuitem('No Mirrors (3)','NoMirrors')
            this.appendcheckboxmenuitem('Single Mirror (4)','SingleMirror')
            this.appendcheckboxmenuitem('Double Mirror (5)','DoubleMirror')
            this.appendmenuitem('----', 'PedigreeSep')
            this.appendcheckboxmenuitem('Move (6)','Move')
            this.appendcheckboxmenuitem('Detach (7)','Detach')
            this.appendcheckboxmenuitem('Kill (8)','Kill')
        }
    }
})

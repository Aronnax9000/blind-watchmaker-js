//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.pedigreeView", $.dawk.watchmakerView, {
    options: { 
        species: null,
        biomorph: null
    },
    viewGainedFocus: function(event) {
        let session = $(this).pedigreeView("option", "session")
        session.viewGainedFocus(session, this)
    },
    _create: function (options) {
        this._super()
        
        this.options.menuHandler.nextMenuHandler = new PedigreeMenuHandler()
        $(this.element).addClass('pedigreeView')
        let biomorph = this.options.biomorph 
        console.log(this.element.height())
        let pedigreeDiv = $('<div>').appendTo(this.element)
        let canvas = $("<canvas class='midBox'>").attr('height', Math.trunc(this.element.height()))
            .attr('width', Math.trunc(this.element.width())).appendTo(pedigreeDiv);
        console.log(canvas[0])
        biomorph.drawer = canvas[0]
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
            
    },
    buildMenus: function(menu) {
        this._super('buildMenus')
//        let theMenu = $(this.element).find('.dropdown')

//        console.log('Pedigree Buildmenus')
    }

})

function PedigreeMenuHandler() {
    
}

PedigreeMenuHandler.prototype.menuclick = function(event) {
    console.log('PedigreeMenuHandler'  + $(event.target).data('menuid'))
}

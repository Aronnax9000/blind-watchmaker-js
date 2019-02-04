
$.widget('dawk.animalmenu', $.dawk.sub_menu, {
    options: {
        title: 'Animal'
    },
    _create: function() {
        this._super();
        let basicTypes = this.options.session.options.basicTypes
        for(let i = 0; i < basicTypes.length; i++) {
            this.appendmenuitem(basicTypes[i], 'Animal' + basicTypes[i])
        }
    }
})

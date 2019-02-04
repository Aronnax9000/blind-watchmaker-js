$.widget('dawk.viewmenu', $.dawk.sub_menu, {
    options: {
        title: 'View'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('More Rows', 'MoreRows')
        this.appendmenuitem('Fewer Rows', 'FewerRows')
        this.appendmenuitem('More Columns','MoreColumns')
        this.appendmenuitem('Fewer Columns','FewerColumns')
        this.appendmenuitem('Thicker Pen','ThickerPen')
        this.appendmenuitem('Thinner Pen','ThinnerPen')
        this.appendmenuitem('Drift Sweep','DriftSweep')
        if(this.options.session.trianglable) {
            this.appendmenuitem('Make top of triangle','MakeTopOfTriangle')
            this.appendmenuitem('Make left of triangle','MakeLeftOfTriangle')
            this.appendmenuitem('Make right of triangle','MakeRightOfTriangle')
        }
    }
})


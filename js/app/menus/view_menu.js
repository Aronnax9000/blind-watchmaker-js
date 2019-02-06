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
        this.appendcheckboxmenuitem('Drift Sweep','DriftSweep')
        if(this.options.session.trianglable) {
            this.appendmenuitem('Make top of triangle','MakeTopOfTriangle', false, 'img/IconTriangleTop_ALAN_32x32.png')
            this.appendmenuitem('Make left of triangle','MakeLeftOfTriangle', false, 'img/IconTriangleLeft_ALAN_32x32.png')
            this.appendmenuitem('Make right of triangle','MakeRightOfTriangle', false, 'img/IconTriangleRight_ALAN_32x32.png')
        }
    }
})


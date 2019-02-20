$.widget('dawk.monochrome_mutationsmenu', $.dawk.sub_menu, {
    options: {
        title: 'Mutations'
    },
    _create: function() {
        this._super();
        this.appendcheckboxmenuitem('Segmentation','Segmentation')
        this.appendcheckboxmenuitem('Gradient','Gradient')
        this.appendcheckboxmenuitem('Asymmetry','Asymmetry')
        this.appendcheckboxmenuitem('Radial Sym', 'RadialSym')
        this.appendcheckboxmenuitem('Scaling Factor', 'ScalingFactor')
        this.appendcheckboxmenuitem('Mutation Size', 'MutationSize')
        this.appendcheckboxmenuitem('Mutation Rate', 'MutationRate')
        this.appendcheckboxmenuitem('Tapering twigs', 'TaperingTwigs')
    }
})

$.widget('dawk.monochrome_mutationsmenu', $.dawk.sub_menu, {
    options: {
        title: 'Mutations'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Segmentation','Segmentation')
        this.appendmenuitem('Gradient','Gradient')
        this.appendmenuitem('Asymmetry','Asymmetry')
        this.appendmenuitem('Radial Sym', 'RadialSym')
        this.appendmenuitem('Scaling Factor', 'ScalingFactor')
        this.appendmenuitem('Mutation Size', 'MutationSize')
        this.appendmenuitem('Mutation Rate', 'MutationRate')
        this.appendmenuitem('Tapering twigs', 'TaperingTwigs')
        this.appendmenuitem('Gene 9 Gradient', 'Gene9Gradient')
    }
})

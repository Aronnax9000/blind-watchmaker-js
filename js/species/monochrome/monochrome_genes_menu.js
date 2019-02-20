$.widget('dawk.monochrome_genesmenu', $.dawk.sub_menu, {
    options: {
        title: 'Genes'
    },
    _create: function() {
        this._super();
        this.appendcheckboxmenuitem('Segmentation','ShowSegmentation')
        this.appendcheckboxmenuitem('Gradient','ShowGradient')
        this.appendcheckboxmenuitem('Asymmetry','ShowAsymmetry')
        this.appendcheckboxmenuitem('Radial Sym', 'ShowRadialSym')
        this.appendcheckboxmenuitem('Scaling Factor', 'ShowScalingFactor')
        this.appendcheckboxmenuitem('Mutation Size', 'ShowMutationSize')
        this.appendcheckboxmenuitem('Mutation Rate', 'ShowMutationRate')
        this.appendcheckboxmenuitem('Tapering twigs', 'ShowTaperingTwigs')
    }
})

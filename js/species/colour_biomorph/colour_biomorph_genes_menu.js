$.widget('dawk.colour_biomorph_genesmenu', $.dawk.sub_menu, {
    options: {
        title: 'Genes'
    },
    _create: function() {
        this._super();
        this.appendcheckboxmenuitem('Segmentation','ShowSegmentation') // genes[0]
        this.appendcheckboxmenuitem('Gradient','ShowGradient') // genes[1]
        this.appendcheckboxmenuitem('Asymmetry','ShowAsymmetry') // genes[2]
        this.appendcheckboxmenuitem('Radial Sym', 'ShowRadialSym') // genes[3]
        this.appendcheckboxmenuitem('Scaling Factor', 'ShowScalingFactor') // genes[4]
        this.appendcheckboxmenuitem('Mutation Size', 'ShowMutationSize') // genes[5]
        this.appendcheckboxmenuitem('Mutation Rate', 'ShowMutationRate') // genes[6]
        this.appendcheckboxmenuitem('Limb Shape', 'ShowLimbShape') // genes[7]
        this.appendcheckboxmenuitem('Limb Fill', 'ShowLimbFill') // genes[8]
        this.appendcheckboxmenuitem('Colour', 'ShowColour') // genes[9]
        this.appendcheckboxmenuitem('Background Colour', 'ShowBackgroundColour') // genes[10]
        this.appendcheckboxmenuitem('Thickness', 'ShowThickness') // genes[11]
    }
})

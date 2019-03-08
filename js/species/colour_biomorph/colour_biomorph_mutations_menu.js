$.widget('dawk.colour_biomorph_mutationsmenu', $.dawk.sub_menu, {
    options: {
        title: 'Mutations'
    },
    _create: function() {
        this._super();
        this.appendcheckboxmenuitem('Segmentation','Segmentation') // mut[0]
        this.appendcheckboxmenuitem('Gradient','Gradient') // mut[1]
        this.appendcheckboxmenuitem('Asymmetry','Asymmetry') // mut[2]
        this.appendcheckboxmenuitem('Radial Sym', 'RadialSym') // mut[3]
        this.appendcheckboxmenuitem('Scaling Factor', 'ScalingFactor') // mut[4]
        this.appendcheckboxmenuitem('Mutation Size', 'MutationSize') // mut[5]
        this.appendcheckboxmenuitem('Mutation Rate', 'MutationRate') // mut[6]
        this.appendcheckboxmenuitem('Limb Shape', 'LimbShape') // mut[7]
        this.appendcheckboxmenuitem('Limb Fill', 'LimbFill') // mut[8]
        this.appendcheckboxmenuitem('Colour', 'Colour') // mut[9]
        this.appendcheckboxmenuitem('Background Colour', 'BackgroundColour') // mut[10]
        this.appendcheckboxmenuitem('Thickness', 'Thickness') // mut[11] 
        this.appendcheckboxmenuitem('Genes 1 to 8', 'Genes1To8') // mut[12] 
        
        this.appendcheckboxmenuitem('Gene 9', 'Gene9') // mut[13]
        this.appendcheckboxmenuitem('Gene 9 can be Zero', 'Gene9CanBeZero') // mut[14]
    }
})

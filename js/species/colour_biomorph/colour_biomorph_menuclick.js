
ColourBiomorph.updateAllGeneboxes = function(species, target) {
    $(target).closest('.watchmakerSessionTab').find('.geneboxes').each(
            function() {
                _speciesFactorySingleton.updateFromCanvas(species, this, null)
            });
}

ColourBiomorph.menuclick = function(event) {
    let options = this.options
    let target = event.target
    let menuid = $(target).data('menuid')
    let mut = options.mut
    let genes = options.genes

    switch(menuid) {
        
    case 'ShowSegmentation':
        Monochrome.toggleMut(genes, 0, target)
        if(! genes[0]) {
            // Set SegNoGene to 1 for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.segNoGene = 1
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.segNoGenebox').addClass('geneboxHidden')
            $(target).closest('.watchmakerSessionTab').find('.segDistGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.segNoGenebox').removeClass('geneboxHidden')
            $(target).closest('.watchmakerSessionTab').find('.segDistGenebox').removeClass('geneboxHidden')
        }

        return false 
    case 'ShowGradient':
        Monochrome.toggleMut(genes, 1, target)
        if(! genes[1]) {
            // Set Gradient to Same for genes 1-9 on all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    for(let i = 0; i < 9; i++) {
                        biomorph.dGene[i] = SwellType.Same
                    }
                    biomorph.develop()
                }
            })
        }
        ColourBiomorph.updateAllGeneboxes(this.species, event.target)
        return false 
    case 'ShowAsymmetry':
        Monochrome.toggleMut(genes, 2, target)
        if(! genes[2]) {
            // Set SegNoGene to 1 for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.completenessGene = CompletenessType.Double
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.completenessGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.completenessGenebox').removeClass('geneboxHidden')
        }
        return false 
    case 'ShowRadialSym':
        Monochrome.toggleMut(genes, 3, target)
        if(! genes[3]) {
            // Set SegNoGene to 1 for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.spokesGene = SpokesType.NorthOnly
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.spokesGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.spokesGenebox').removeClass('geneboxHidden')

        }
        return false 
    case 'ShowScalingFactor':
        Monochrome.toggleMut(genes, 4, target)
        if(! genes[4]) {
            // Set SegNoGene to 1 for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.trickleGene = TRICKLE
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.trickleGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.trickleGenebox').removeClass('geneboxHidden')
        }
        return false 
    case 'ShowMutationSize':
        Monochrome.toggleMut(genes, 5, target)
        if(! genes[5]) {
            // Set Mutation Size for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.mutSizeGene = Math.trunc(TRICKLE/2); // Trickle div 2;
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.mutSizeGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.mutSizeGenebox').removeClass('geneboxHidden')
        }
        return false 
    case 'ShowMutationRate':
        Monochrome.toggleMut(genes, 6, target)
        if(! genes[6]) {
            // Set Mutation Size for all morphs in the session.
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.mutProbGene = 10; // Trickle div 2;
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.mutProbGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.mutProbGenebox').removeClass('geneboxHidden')
        }
        return false 
    case 'ShowLimbShape':
        Monochrome.toggleMut(genes, 7, target)
        if(! genes[7]) {
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.limbShapeGene = LimbType.Stick
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.limbShapeGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.limbShapeGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'ShowLimbFill':
        Monochrome.toggleMut(genes, 8, target)
        if(! genes[8]) {
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.limbFillGene = LimbFillType.Filled
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.limbFillGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.limbFillGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'ShowColour':
        Monochrome.toggleMut(genes, 9, target)
		let backgroundMenuItem = $(target)
			.closest('.watchmakerSessionTab')
			.find('.menuitemShowBackgroundColour')
			.children('a')
        if(! genes[9]) { // if turning off, assign black to all colour genes
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.colorGene = [0,0,0,0,0,0,0,0]
					if( genes[10]) { // turn off background color if it's on
						setTimeout(function(){ // wait a jiffy
							backgroundMenuItem.click()
							backgroundMenuItem.hide()
					    },17)
					}                    
					biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.colourGenebox').addClass('geneboxHidden')
        } else {
			backgroundMenuItem.show()
            $(target).closest('.watchmakerSessionTab').find('.colourGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'ShowBackgroundColour':
        Monochrome.toggleMut(genes, 10, target)
        if(! genes[10]) { // If turning off, assign white to background colour
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.backColorGene = 215 // White, opposite corner of the 6x6x6 color cube
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.backgroundColourGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.backgroundColourGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'ShowThickness':
        Monochrome.toggleMut(genes, 11, target)
        if(! genes[11]) {
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.thicknessGene = 1 // 
                    biomorph.develop()
                }
            })
            $(target).closest('.watchmakerSessionTab').find('.thicknessGenebox').addClass('geneboxHidden')
        } else {
            $(target).closest('.watchmakerSessionTab').find('.thicknessGenebox').removeClass('geneboxHidden')
        }
        ColourBiomorph.updateAllGeneboxes(event)
        return false 
    case 'Segmentation':
        Monochrome.toggleMut(mut, 0, target)
        return false 
    case 'Gradient':
        Monochrome.toggleMut(mut, 1, target)
        return false 
    case 'Asymmetry':
        Monochrome.toggleMut(mut, 2, target)
        return false 
    case 'RadialSym':
        Monochrome.toggleMut(mut, 3, target)
        return false 
    case 'ScalingFactor':
        Monochrome.toggleMut(mut, 4, target)
        return false 
    case 'MutationSize':
        Monochrome.toggleMut(mut, 5, target)
        return false 
    case 'MutationRate':
        Monochrome.toggleMut(mut, 6, target)
        return false 
    case 'LimbShape': // mut[7]
        Monochrome.toggleMut(mut, 7, target)
        return false 
    case 'LimbShape': // mut[8]
        Monochrome.toggleMut(mut, 8, target)
        return false 
    case 'Colour': // mut[9]
        Monochrome.toggleMut(mut, 9, target)
        return false 
    case 'BackgroundColour': // mut[10]
        Monochrome.toggleMut(mut, 10, target)
        return false 
    case  'Thickness': // mut[11] 
        Monochrome.toggleMut(mut, 11, target)
        return false 
    case 'Gene9': // mut[12]
        Monochrome.toggleMut(mut, 12, target)
        return false 
    case  'Gene9CanBeZero': // mut[13]
        Monochrome.toggleMut(mut, 13, target)
        return false 

    }
    return true // Event not processed
}


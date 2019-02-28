
Monochrome.updateAllGeneboxes = function(species, target) {
    $(target).closest('.watchmakerSessionTab').find('.geneboxes').each(
            function() {
                _speciesFactorySingleton.updateFromCanvas(species, this, null)
            });
}

Monochrome.menuclick = function(event) {
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
        Monochrome.updateAllGeneboxes(this.species, event.target)
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
    case 'ShowTaperingTwigs':
        Monochrome.toggleMut(genes, 7, target)
        if(! genes[7]) {
            let biomorphs = [] 
            $(target).closest('.watchmakerSessionTab').find('canvas').each(function() {
                let biomorph = $(this).data('genotype')
                if(biomorph != null) {
                    biomorph.dGene[9] = SwellType.Same
                    biomorph.develop()
                }
            })
        }
        Monochrome.updateAllGeneboxes(event)
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
    case 'TaperingTwigs':
        Monochrome.toggleMut(mut, 7, target)
        return false 
    case 'Gene9CanBeZero':
        Monochrome.toggleMut(mut, 8, target)
        return false 
    }
    return true // Event not processed
}



Monochrome.updateMenus = function(session, view) {
    let mut = session.options.mut
    Monochrome.updateMutCheckbox(mut, view, 0, 'Segmentation')
    Monochrome.updateMutCheckbox(mut, view, 1, 'Gradient')
    Monochrome.updateMutCheckbox(mut, view, 2, 'Asymmetry')
    Monochrome.updateMutCheckbox(mut, view, 3, 'RadialSym')
    Monochrome.updateMutCheckbox(mut, view, 4, 'ScalingFactor')
    Monochrome.updateMutCheckbox(mut, view, 5, 'MutationSize')
    Monochrome.updateMutCheckbox(mut, view, 6, 'MutationRate')
    Monochrome.updateMutCheckbox(mut, view, 7, 'TaperingTwigs')
    let genes = session.options.genes
    Monochrome.updateMutCheckbox(genes, view, 0, 'ShowSegmentation')
    Monochrome.updateMutCheckbox(genes, view, 1, 'ShowGradient')
    Monochrome.updateMutCheckbox(genes, view, 2, 'ShowAsymmetry')
    Monochrome.updateMutCheckbox(genes, view, 3, 'ShowRadialSym')
    Monochrome.updateMutCheckbox(genes, view, 4, 'ShowScalingFactor')
    Monochrome.updateMutCheckbox(genes, view, 5, 'ShowMutationSize')
    Monochrome.updateMutCheckbox(genes, view, 6, 'ShowMutationRate')
    Monochrome.updateMutCheckbox(genes, view, 7, 'ShowTaperingTwigs')

}

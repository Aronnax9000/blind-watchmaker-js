ColourBiomorph.prototype.copyBiomorph = function(child) {
    child.gene = this.gene.slice();
    child.dGene = this.dGene.slice();
    child.segNoGene = this.segNoGene;
    child.segDistGene = this.segDistGene;
    child.completenessGene = this.completenessGene;
    child.spokesGene = this.spokesGene;
    child.trickleGene = this.trickleGene;
    child.mutSizeGene = this.mutSizeGene;
    child.mutProbGene = this.mutProbGene;
    child.colorGene = this.colorGene.slice();
    child.backColorGene = this.backColorGene;
    child.limbShapeGene = this.limbShapeGene;
    child.limbFillGene = this.limbFillGene;
    child.thicknessGene = this.thicknessGene;
    return child;
}

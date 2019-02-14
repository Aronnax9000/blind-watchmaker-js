      
Monochrome.prototype.readFromArrayBuffer = function(arrayBuffer, index) {
    offset = index * this.session.serializationSize
    let view = new DataView(arrayBuffer, offset)
    for(let i = 0; i < 9; i++) {
        this.gene[i] = view.getInt16(i * 2)
    }    
    for(let j = 0; j < 10; j++) {
        this.dGene[j] = view.getInt8(18 + j) + 1
    }    
    this.segNoGene = view.getInt16(28)
    this.segDistGene = view.getInt16(30)
    this.completenessGene = view.getInt8(32) + 1
    this.spokesGene = view.getInt8(33) + 1
    this.trickleGene = view.getInt16(34)
    this.mutSizeGene = view.getInt16(36)
    this.mutProbGene = view.getInt16(38)
}

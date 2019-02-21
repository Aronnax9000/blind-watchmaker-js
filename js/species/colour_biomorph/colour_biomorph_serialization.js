      
ColourBiomorph.prototype.readFromArrayBuffer = function(arrayBuffer, index) {
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
    
    this.trickleGene = view.getUint16(40)
    this.colorGene = []
    for(let k = 0; k < 8; k++) {
        this.colorGene.push(view.getUint8(42 + k))
    }
    this.backColorGene = view.getUint8(50)
    this.limbShapeGene = view.getUint8(51) + 1;
    this.limbFillGene = view.getUint8(52) + 1;
    this.thicknessGene = view.getUint16(53)
}


ColourBiomorph.prototype.writeToArrayBuffer = function(arrayBuffer, index) {
    offset = index * this.session.serializationSize
    let view = new DataView(arrayBuffer, offset)
    for(let i = 0; i < 9; i++) {
        view.setInt16(i * 2, this.gene[i])
    }    
    for(let j = 0; j < 10; j++) {
        view.setInt8(18 + j, this.dGene[j] - 1)
    }    
    view.setInt16(28, this.segNoGene)
    view.setInt16(30, this.segDistGene)
    view.setInt8(32, this.completenessGene - 1)
    view.setInt8(33, this.spokesGene - 1)
    view.setInt16(34, this.trickleGene)
    view.setInt16(36, this.mutSizeGene)
    view.setInt16(38, this.mutProbGene)
    
    view.setUint16(40, this.trickleGene)
    
    for(let k = 0; k < 8; k++) {
        view.setUint8(42 + k, this.colorGene[k])
    }
    view.setUint8(50, this.backColorGene)
    view.setUint8(51, this.limbShapeGene - 1);
    view.setUint8(52, this.limbFillGene - 1);
    view.setUint16(53, this.thicknessGene)
}

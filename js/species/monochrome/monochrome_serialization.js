      
Monochrome.prototype.readFromArrayBuffer = function(arrayBuffer, index) {

    offset = index * this.session.serializationSize
    let view = new DataView(arrayBuffer, offset)
    for(let i = 0; i < 9; i++) {
        //  public byte[][] gene = new byte[9][2];
        this.gene[i] = view.getInt16(i * 2)
        console.log(this.gene[i])
    }    
    for(let j = 0; j < 10; j++) {
    //  public byte[] dgene = new byte[10];
        this.dGene[j] = view.getInt8(18 + j) + 1
        console.log(this.dGene[j])
    }    
        
        //  public byte[] segNoGene = new byte[2];
    this.segNoGene = view.getInt16(28)
    console.log('SegNoGene ' + this.segNoGene)
    //  public byte[] segDistGene = new byte[2];
    this.segDistGene = view.getInt16(30)
    console.log('SegDistGene ' + this.segDistGene)
//  public byte completenessGene;
    this.completenessGene = view.getInt8(32) + 1
    console.log('completenessGene ' + this.completenessGene)
    
    //  public byte spokesGene;
    this.spokesGene = view.getInt8(33) + 1
    console.log('spokesGene ' + this.spokesGene)

    //  public byte[] tricklegene = new byte[2]; 
    this.trickleGene = view.getInt16(34)
    console.log('trickleGene ' + this.trickleGene)
    //  public byte[] mutsizegene = new byte[2];
    this.mutSizeGene = view.getInt16(36)
    console.log('mutSizeGene ' + this.mutSizeGene)
    //  public byte[] mutprobgene = new byte[2];   
    this.mutProbGene = view.getInt16(38)
    console.log('mutSizeGene ' + this.mutProbGene)
    
}
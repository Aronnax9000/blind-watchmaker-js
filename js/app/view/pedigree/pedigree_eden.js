
function Full(genome, thisFull) {
    this.genome = genome
    genome.full = this
    this.surround = genome.getRect()
    Triangle.atLeast(this.surround);

    this.centre = new Point()

    if(thisFull != null) {
        this.parent = thisFull;
        this.elderSib = thisFull.lastBorn;
        if(this.elderSib != null) {
            this.elderSib.youngerSib = this;
        }
        this.lastBorn = null;
        this.youngerSib = null;
        if(thisFull.lastBorn == null) {
            thisFull.firstBorn = this;
        }
        thisFull.lastBorn = this;

    } else {
        this.parent = null
        this.firstBorn = null
        this.lastBorn = null
        this.elderSib = null
        this.youngerSib = null
    }
}


function God() {
    this.adam = null
    this.previousGod = null
    this.nextGod = null
}


function Pedigree(options) {
    this.options = options
    this.godCounter = 0
    this.rootGod = null
    this.thereAreLines = false
    this.theGod = null
}




// Classic Snailmaker displayed only these:
// Opening
// Displacement
// Shape
// Translation
$.widget('dawk.shells_geneboxes', $.dawk.geneboxes, {
    options : {
        engineering: true,
        biomorph: null,
    },
    _create : function(options) {
        console.log('creating shell geneboxes')
        this._setOptions(options);

        this.element.addClass("monochromeGeneboxes");
        
        var genebox
        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 1,
            title: 'Opening'});
        this.element.append(genebox);

        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 2,
            title: 'Shape'});
        this.element.append(genebox);

        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 3,
            title: 'Displacement'});
        this.element.append(genebox);

        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 4,
            title: 'Translation'});
        this.element.append(genebox);

        genebox = $("<div></div>").handednessGenebox({
            geneboxCollection: this,
            geneboxIndex: 5,
            title: 'Handedness'});
        this.element.append(genebox);

        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 6,
            title: 'Displacement Mutation Size'});
        this.element.append(genebox);

        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 7,
            title: 'Translation Mutation Size'});
        this.element.append(genebox);

        genebox = $("<div></div>").monochrome_genebox({
            geneboxCollection: this,
            geneboxIndex: 8,
            title: 'Coarsegraininess'});
        this.element.append(genebox);

        genebox = $("<div></div>").monochrome_genebox({
            geneboxCollection: this,
            geneboxIndex: 9,
            title: 'Reach'});
        this.element.append(genebox);
        
        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 10,
            title: 'Translation gradient'});
        this.element.append(genebox);

        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 11,
            title: 'Shape mutation size'});
        this.element.append(genebox);

        genebox = $("<div></div>").floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
            title: 'Reach mutation size'});
        this.element.append(genebox);

        genebox = $("<div></div>").monochrome_genebox({
            geneboxCollection: this,
            geneboxIndex: 13,
            title: 'Mutation Probability'});
        this.element.append(genebox);

        genebox = $("<div></div>").monochrome_genebox({
            geneboxCollection: this,
            geneboxIndex: 14,
            title: 'Pattern'});
        this.element.append(genebox);

        
    },

    updateFromCanvas: function(canvas) {
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            // console.log('updateFromCanvas: no biomorph on canvas.')
            // console.log(canvas);
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.monochromeGenebox');
        var shell = biomorph.shell
        var genebox 
        // Opening
        genebox = geneboxes.eq(0); 
        genebox.floatGenebox("option", "value", shell.opening);
        genebox.floatGenebox("refresh");
        // Displacement
        genebox = geneboxes.eq(1); 
        genebox.floatGenebox("option", "value", shell.displacement);
        genebox.floatGenebox("refresh");
        // Shape
        genebox = geneboxes.eq(2); 
        genebox.floatGenebox("option", "value", shell.shape);
        genebox.floatGenebox("refresh");
        // Translation
        genebox = geneboxes.eq(3); 
        genebox.floatGenebox("option", "value", shell.translation);
        genebox.floatGenebox("refresh");
        // Handedness
        genebox = geneboxes.eq(4); 
        genebox.handednessGenebox("option", "value", shell.handedness);
        genebox.handednessGenebox("refresh");
        // Displacement mutation size
        genebox = geneboxes.eq(5); 
        genebox.floatGenebox("option", "value", shell.mutSize.displacement);
        genebox.floatGenebox("refresh");
        // Translation mutation size
        genebox = geneboxes.eq(6); 
        genebox.floatGenebox("option", "value", shell.mutSize.translation);
        genebox.floatGenebox("refresh");
        // Coarsegraniness
        genebox = geneboxes.eq(7); 
        genebox.monochrome_genebox("option", "value", shell.coarsegraininess);
        genebox.monochrome_genebox("refresh");
        // Reach
        genebox = geneboxes.eq(8); 
        genebox.monochrome_genebox("option", "value", shell.reach);
        genebox.monochrome_genebox("refresh");
        // Translation gradient
        genebox = geneboxes.eq(9); 
        genebox.floatGenebox("option", "value", shell.translationGradient);
        genebox.floatGenebox("refresh");
        // Shape mutation size
        genebox = geneboxes.eq(10); 
        genebox.floatGenebox("option", "value", shell.mutSize.shape);
        genebox.floatGenebox("refresh");
        // Reach mutation size
        genebox = geneboxes.eq(11); 
        genebox.floatGenebox("option", "value", shell.mutSize.reach);
        genebox.floatGenebox("refresh");
        // Mutation probability
        genebox = geneboxes.eq(12); 
        genebox.monochrome_genebox("option", "value", shell.mutProbGene);
        genebox.monochrome_genebox("refresh");
        // Pattern
        genebox = geneboxes.eq(13); 
        genebox.monochrome_genebox("option", "value", shell.pattern);
        genebox.monochrome_genebox("refresh");
        
//        this.pattern = genes.pattern
//        this.translationGradient = genes.translationGradient
//        this.mutSize = {
//                displacement: genes.mutSize.displacement,
//                translation: genes.mutSize.translation,
//                shape: genes.mutSize.shape,
//                reach: genes.mutSize.reach
//        }
//        this.mutProbGene = genes.mutProbGene

        

    },
});

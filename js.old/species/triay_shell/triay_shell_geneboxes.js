/*
 * Geneboxes for Matthieu Triay's implementation of Blind Watchmaker Shells.
 */
$.widget('dawk.shells_geneboxes', $.dawk.geneboxes, {
    options : {
        engineering: true,
        biomorph: null,
    },
    _create : function(options) {
        this._super(options)
        this._setOptions(options);
        this.element.addClass("shellGeneboxes");
        let template = '<div></div>';

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 1,
            title: 'Opening'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 2,
            title: 'Displacement'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 3,
            title: 'Shape'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 4,
            title: 'Translation (per outline, in the direction orthogonal to that of the parent spirtal)'}).appendTo(this.element);

        $(template).handednessGenebox({
            geneboxCollection: this,
            geneboxIndex: 5,
            title: 'Handedness'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 6,
            title: 'Displacement Mutation Size'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 7,
            title: 'Translation Mutation Size'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 8,
            title: 'Coarsegraininess'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 9,
            title: 'Reach'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 10,
            title: 'Translation gradient'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 11,
            title: 'Shape mutation size'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
            title: 'Reach mutation size'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 13,
            title: 'Mutation Probability'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 14,
            title: 'Pattern'}).appendTo(this.element);
    },

    updateFromCanvas: function(canvas) {
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.genebox');
        var shell = biomorph.shell
        var genebox 
        // Opening
        genebox = geneboxes.eq(0); 
        genebox.floatGenebox("updateValue", shell.opening);
        // Displacement
        genebox = geneboxes.eq(1); 
        genebox.floatGenebox("updateValue", shell.displacement);
        // Shape
        genebox = geneboxes.eq(2); 
        genebox.floatGenebox("updateValue", shell.shape);
        // Translation
        genebox = geneboxes.eq(3); 
        genebox.floatGenebox("updateValue", shell.translation);
        // Handedness
        genebox = geneboxes.eq(4); 
        genebox.handednessGenebox("updateValue", shell.handedness);
        // Displacement mutation size
        genebox = geneboxes.eq(5); 
        genebox.floatGenebox("updateValue", shell.mutSize.displacement);
        // Translation mutation size
        genebox = geneboxes.eq(6); 
        genebox.floatGenebox("updateValue", shell.mutSize.translation);
        // Coarsegraniness
        genebox = geneboxes.eq(7); 
        genebox.biomorph_genebox("updateValue", shell.coarsegraininess);
        // Reach
        genebox = geneboxes.eq(8); 
        genebox.biomorph_genebox("updateValue", shell.reach);
        // Translation gradient
        genebox = geneboxes.eq(9); 
        genebox.floatGenebox("updateValue", shell.translationGradient);
        // Shape mutation size
        genebox = geneboxes.eq(10); 
        genebox.floatGenebox("updateValue", shell.mutSize.shape);
        // Reach mutation size
        genebox = geneboxes.eq(11); 
        genebox.floatGenebox("updateValue", shell.mutSize.reach);
        // Mutation probability
        genebox = geneboxes.eq(12); 
        genebox.biomorph_genebox("updateValue", shell.mutProbGene);
        // Pattern
        genebox = geneboxes.eq(13); 
        genebox.biomorph_genebox("updateValue", shell.pattern);
    },
});

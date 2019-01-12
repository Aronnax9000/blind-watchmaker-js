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
            title: 'Translation'}).appendTo(this.element);

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
        genebox.biomorph_genebox("option", "value", shell.coarsegraininess);
        genebox.biomorph_genebox("refresh");
        // Reach
        genebox = geneboxes.eq(8); 
        genebox.biomorph_genebox("option", "value", shell.reach);
        genebox.biomorph_genebox("refresh");
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
        genebox.biomorph_genebox("option", "value", shell.mutProbGene);
        genebox.biomorph_genebox("refresh");
        // Pattern
        genebox = geneboxes.eq(13); 
        genebox.biomorph_genebox("option", "value", shell.pattern);
        genebox.biomorph_genebox("refresh");

    },
});

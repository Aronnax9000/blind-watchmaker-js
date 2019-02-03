

$.widget( "dawk.gene1to9box", $.dawk.biomorph_genebox, {
    options: {
        hasGradient: true
    }
});

$.widget( "dawk.segNoGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
    },
    refresh: function() {
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
});

$.widget( "dawk.segDistGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasGradient: true,
        showSign: true
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
} );


$.widget( "dawk.completenessGenebox", $.dawk.biomorph_genebox, {
    options: {
        showSign: true
    },
    refresh: function() {
        var properties = CompletenessType.properties[this.options.value];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
} );



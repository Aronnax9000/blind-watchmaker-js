

$.widget( "dawk.limbShapeGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasMid: true
    },
    refresh: function() {
        var str = this.options.value;
        var properties = LimbType.properties[str];
        if(properties != null) 
            this.element.find('.geneValue').text(properties.name);
    },
    _create: function() {
        this.element.addClass('limbShapeGenebox')
        return this._super()
    },
    
} );

$.widget( "dawk.limbFillGenebox", $.dawk.biomorph_genebox, {
    options: {
        title: 'Limb Fill'

    },
    refresh: function() {
        var str = this.options.value;
        var properties = LimbFillType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.name);
        }
    },  
    _create: function() {
        this.element.addClass('limbFillGenebox')
        return this._super()
    },
} );

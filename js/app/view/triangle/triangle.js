$.widget( "dawk.triangleView", $.dawk.watchmakerView, {
    options: { 
        theMode: Mode.Triangling,
        species: null,
        biomorph: null,
        topOfTriangle: null,
        leftOfTriangle: null,
        rightOfTriangle: null
    },
    viewGainedFocus: function(event) {
        let session = $(this).triangleView("option", "session")
        session.viewGainedFocus(session, this)
    },
    _create: function (options) {
        this._super()

        $(this.element).addClass('triangleView')

        this.options.menuHandler.nextMenuHandler = new TriangleMenuHandler()
        let container = $("<div class='container'>")
        container.appendTo(this.element)
                
        // Draw triangle here
        let triangleDiv = $('<div class="triangleLineDiv"><canvas class="triangleLineCanvas" width="1000" height="600"></canvas></div>')
        triangleDiv.appendTo(container)
        triangleDiv = $('<div class="triangleDiv"><canvas class="triangleLineCanvas" width="1000" height="600"></canvas></div>')
        triangleDiv.appendTo(container)
        this._on(triangleDiv, {
            mousedown: function(event) { this.mousedown(event) },
            mousemove: function(event) { this.mousemove(event) },
        })
        this.drawTriangle()
        let sessionoptions = this.options.session.options
        console.log(sessionoptions)
        this.options.topOfTriangle = sessionoptions.topOfTriangle
        this.addone(this.options.topOfTriangle, this.options.a)
        this.options.leftOfTriangle = sessionoptions.leftOfTriangle
        this.addone(this.options.leftOfTriangle, this.options.b)
        this.options.rightOfTriangle = sessionoptions.rightOfTriangle
        this.addone(this.options.rightOfTriangle, this.options.c)
    },
    buildMenus: function(menu) {
        this._super('buildMenus')
    },
    markIf: function(canvas) {
        // Remove midBox class from every canvas
        $(this.element).find('canvas').removeClass('midBox')

        if(canvas != null) {
            // Mark this one as special
            $(canvas).addClass('midBox')
        }
    },

    bumper:  function(current, here) {
        let surround = current.surround
        let height = surround.bottom - surround.top;
        let width = surround.right - surround.left;
        let triangleDiv = $(this.element).find('.triangleDiv')[0]
        let pRect = new Rect(0, 0, $(triangleDiv).width(), $(triangleDiv).height())
        let error = here.v - (height / 2)
        if(error < 0) {
            here.v -= error
        } 
        error = here.v + (height / 2) 
        if(error > pRect.bottom) {
            here.v -= error - pRect.bottom
        }
        error = here.h - (width / 2)
        if(error < 0) {
            here.h -= error
        } 
        error = here.h + (width / 2) 
        if(error > pRect.right) {
            here.h -= error - pRect.right
        }
    },
    mousedown: function(event) {
        let triangleDiv = $(this.element).find('.triangleDiv')
        let triangleDivOffset = triangleDiv.offset()
        let x = event.pageX - triangleDivOffset.left
        let y = event.pageY - triangleDivOffset.top
        console.log('triangleDivOffset')
        console.log(triangleDivOffset)
        let m = new Point(x,y)
        console.log(m)
        let triangleContext = triangleDiv.find('canvas')[0].getContext('2d')
        triangleContext.strokeStyle = 'Red';
        triangleContext.lineWidth = '1'
        triangleContext.beginPath()
        triangleContext.strokeRect(x-1,y-1,2,2)
        triangleContext.closePath()
        triangleContext.strokeStyle = 'Black';
        console.log("TriangleDivOffset ")
        console.log(triangleDivOffset)
        let r = Triangle.triangle(
                triangleDiv.width(),
                triangleDiv.height(), 
                this.options.b, m);
        console.log(r)
        console.log(r[0] + r[1] + r[2])
        let session = this.options.session
        let biomorph = _speciesFactorySingleton.getSpecies(session.species, session, 
                document.createElement('canvas'));
                
        let options = this.options
        biomorph.concoct(r, options.topOfTriangle, options.leftOfTriangle, options.rightOfTriangle)
        this.addone(biomorph, m)
    },
    mousemove: function(event) {
    },
    addone: function(biomorph, point) {
        let surround = biomorph.getRect()
        let biomorphWidth = surround.right - surround.left
        let biomorphHeight = surround.bottom - surround.top
        let left = point.h - biomorphWidth / 2
        let top = point.v - biomorphHeight / 2
        let canvas = $("<canvas class='triangleMorphCanvas'>")
        canvas.attr('height', Math.trunc(biomorphHeight))
        canvas.attr('width', Math.trunc(biomorphWidth))
        canvas.css('left', left)
        canvas.css('top', top)
        canvas.addClass('triangleBox midBox')
        biomorph.drawer = canvas
        $(canvas).data('genotype', biomorph)

        let triangleDiv = $(this.element).find('.triangleDiv')
        triangleDiv.append(canvas)
        biomorph.drawer = canvas[0]
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
        
        this.markIf(canvas);

    },
    drawTriangle: function() {
        let triangleCanvas = $(this.element).find('.triangleLineCanvas')
        let screenWidth = triangleCanvas.width()
        let screenHeight = triangleCanvas.height()
        console.log("drawTriangle screen dimensions: " + new Point(screenWidth, screenHeight))
        let a = new Point(Math.round(234 * screenWidth / 512), Math.round(51 * screenHeight / 342));
        let b = new Point(Math.round(134 * screenWidth / 512), Math.round(250 * screenHeight / 342));
        let c = new Point(Math.round(333 * screenWidth / 512), Math.round(250 * screenHeight / 342));
        this.options.a = a
        this.options.b = b
        this.options.c = c
        console.log(a + b + c)
        console.log(triangleCanvas[0])
        let ctx = triangleCanvas[0].getContext('2d')
        ctx.strokeStyle = 'Black';
        ctx.lineWidth = 1;
        console.log(ctx)
        ctx.beginPath()
        ctx.moveTo(a.h, a.v);
        ctx.lineTo(b.h, b.v);
        ctx.lineTo(c.h, c.v);
        ctx.lineTo(a.h, a.v);
        ctx.closePath()
        ctx.stroke()
        console.log('finished drawTriangle')
    }

})

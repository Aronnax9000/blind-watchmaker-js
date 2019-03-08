
function Palette(name, colors) {
    if(name) {
        this.name = name
        if(colors) {
            this.colors = colors
        } else {
            this.colors = Palette.generateMacPalette()
        }
    } else {
        this.name = 'Classic Mac'
        this.colors = Palette.generateMacPalette()
    }
} 

Palette.allowedLevels = [ 0, 51, 102, 153, 204, 255 ]

Palette.toHex = function (number) {
    let hex = number.toString(16).toUpperCase()
    return number < 16 ? "0" + hex : hex
}

Palette.toHtmlColor = function(triple) {
    return "#" + Palette.toHex(triple[0]) + Palette.toHex(triple[1]) + Palette.toHex(triple[2]);
}

Palette.generateMacPalette = function() {
        
    var colors = []
    
    // 6x6x6 color cube
    var allowedLevels = Palette.allowedLevels
    for (let i = 0; i < 216; i++) {
        let r = Math.trunc(i / 36);
        let g = Math.trunc((i - (36 * r)) / 6);
        let b = Math.trunc(i % 6);
        colors.push(Palette.toHtmlColor([
            allowedLevels[r], 
            allowedLevels[g],
            allowedLevels[b]]));
    }
    // Red ramp
    for (let i = 216; i < 226; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([singleColorIntensity, 0, 0]))
    }
    // Green ramp
    for (let i = 226; i < 236; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([0, singleColorIntensity, 0]))
    }
    // Blue ramp
    for (let i = 236; i < 246; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([0, 0, singleColorIntensity]))
    }
    // White ramp
    for (let i = 246; i < 256; i++) {
        let indexMinus216 = i - 216;
        let singleColorIntensity = 255 - (indexMinus216 % 10) * 25;
        colors.push(Palette.toHtmlColor([singleColorIntensity,
                singleColorIntensity, singleColorIntensity]))
    }
    return colors
}
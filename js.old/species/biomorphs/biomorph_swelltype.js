var SwellType = {
    Swell: 1,
    Shrink: 2,
    Same: 3,
    properties: {
        1: {name: "Swell"},
        2: {name: "Shrink"},
        3: {name: "Same"}
    },
    swellType: function(index) {
        switch(index) {
        case 1:
            return SwellType.Swell;
        case 2:
            return SwellType.Shrink;
        case 3:
            return SwellType.Same;
        }
    }
}

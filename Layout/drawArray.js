// DrawArray.js
import polygon from './shape/polygon.js';
import canvas from './controller/canvas.js';
import icon from './shape/icon.js';
import drawArray from './Layout/drawArray.js';

class DrawArray {
    constructor(iconClass, polygonClass) {
        this.iconClass = iconClass;
        this.polygonClass = polygonClass;
        this.iconArray = [];
        this.xSpacing = 50;
        this.ySpacing = 50;
    }

    setXSpacing(xSpacing) {
        this.xSpacing = xSpacing;
    }

    setYSpacing(ySpacing) {
        this.ySpacing = ySpacing;
    }

    drawArray(rows, columns) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const x = col * this.xSpacing;
                const y = row * this.ySpacing + (col % 2 === 0 ? this.ySpacing / 2 : 0);

                
            }
        }
    }

    
}

export default DrawArray;

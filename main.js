// Main.js
import polygon from './shape/polygon.js';
import canvas from './controller/canvas.js';
import icon from './shape/icon.js';

// Beispiel: Erstelle ein Canvas-Manager und ein Polygon mit 6 Ecken und einem Copyright-Symbol
const	controller		= new canvas('myCanvas', 'hsl(0, 0.00%, 23.10%)');

const monokaiColors = [
    'hsl(39, 70%, 55%)', // Monokai Yellow
    'hsl(198, 100%, 47%)', // Monokai Blue
    'hsl(154, 56%, 52%)', // Monokai Green
    'hsl(345, 100%, 50%)', // Monokai Pink
    'hsl(14, 100%, 58%)', // Monokai Orange
    'hsl(204, 86%, 53%)', // Monokai Cyan
    'hsl(16, 72%, 51%)', // Monokai Red
    'hsl(209, 56%, 63%)', // Monokai Purple
];

const fontAwesomeSymbols = [
    '\uf2b9', // FontAwesome Symbol 1
    '\uf1f8', // FontAwesome Symbol 2
    '\uf0c8', // FontAwesome Symbol 3
    '\uf17d', // FontAwesome Symbol 4
    '\uf06e', // FontAwesome Symbol 5
    '\uf135', // FontAwesome Symbol 6
    '\uf219', // FontAwesome Symbol 7
    '\uf2dc', // FontAwesome Symbol 8
    '\uf11b', // FontAwesome Symbol 9
    '\uf1c0', // FontAwesome Symbol 10
  ];

const   positionArray = [],     // Array zum Speichern der x- und y-Koordinaten jeder Position
        clustermid = [];        // Array zum Speichern der x- und y-Koordinaten jeder Position

// Funktion, die aufgerufen wird, wenn die Fenstergröße geändert wird
function handleResize() {
    // Hier können Sie den Code platzieren, den Sie ausführen möchten, wenn die Größe geändert wird
    location.reload(); // Das lädt die Seite neu
}

// setInterval, um die Funktion alle 10 Sekunden aufzurufen
// setInterval(handleResize, 1000); // 10000 Millisekunden entsprechen 10 Sekunden

// Ereignislistener für das "resize"-Ereignis hinzufügen
window.addEventListener('resize', handleResize);

createArray(20, 40, 40); 
drawArray();

function createArray (tiltAngle, rowSpace, colSpace) {
    let columeSpace;

    if (colSpace === null) {
        columeSpace = rowSpace / 2;
    } else {
        columeSpace = colSpace / 2;
    }

    const rows = Math.floor(((window.innerHeight / 100) * 125) / rowSpace);
    const columns = Math.floor(((window.innerWidth / 100) * 125) / columeSpace);

    for (let row = -100; row <= rows; row++) {
        for (let col = -100; col <= columns; col++) {
            const angle = tiltAngle * (Math.PI / 180);
            const x = col * columeSpace + (row * columeSpace);
            const y = row * rowSpace;

            const polygonX = x + Math.cos(angle) * columeSpace * col;
            const polygonY = y + Math.sin(angle) * columeSpace * col;

            positionArray.push({
                x: polygonX,
                y: polygonY
            })

            const cluster = 0.01; // Zum Beispiel 20% Chance, dass kein Fill stattfindet        

            if (Math.random() < cluster) {
                clustermid.push({
                    x: polygonX,
                    y: polygonY,
                    generat: false
                })             
            } 
        }    
    }
}



function drawArray () {
    // Prozentuale Chance, dass Polygone nicht eingefärbt werden
    const noFillChanceCol = 0.2; // Zum Beispiel 20% Chance, dass kein Fill stattfindet
    const noFillChanceGra = 0.66; // Zum Beispiel 20% Chance, dass kein Fill stattfindet
    const clusterSize = 200; // px 
    const fadeSize = 250;
    const fadeoffset = 100;

    while(clustermid.length > 0) {
        let cluster = clustermid.shift();

        for(const index in positionArray) {
            const item = positionArray[index];
    
            // Berechnung des Abstands vom angegebenen Punkt
            const distance = Math.sqrt((item.x - cluster.x) ** 2 + (item.y - cluster.y) ** 2);

            // Berechnung des Fade-Offsets, indem fadeDistance vom Abstand subtrahiert wird
            const fadeOffset = Math.max(0, distance - fadeoffset);

            // Setzen der Transparenz basierend auf dem Abstand und Fade-Offset
            let alpha = 1 - fadeOffset / fadeSize; // Ändere den Divisor nach Bedarf

            // Begrenze den Alpha-Wert im Bereich [0, 1]
            alpha = Math.max(0, Math.min(1, alpha));
    
            let randomSymbol = fontAwesomeSymbols[Math.floor(Math.random() * fontAwesomeSymbols.length)];                  
            
            if ((distance < clusterSize || distance < fadeSize) && (item.generat !== true)) {
                if (Math.random() > noFillChanceCol) {
                    if (Math.random() > noFillChanceGra) {
                        let fillColor = `rgba(78, 78, 78, ${alpha})`; // Blau mit variabler Transparenz
                        let symbolIcon = new icon(randomSymbol, 0, `hsla(0, 0.00%, 23.10%, ${alpha})`, 20);
                        
                        new polygon(controller, symbolIcon, 6, item.x, item.y, 15, fillColor, 30);
                    }                     
                } 
        
                else {
                    if (distance < clusterSize) {
                        let fillColor = monokaiColors[Math.floor(Math.random() * monokaiColors.length)];
                        let symbolIcon = new icon(randomSymbol, 0, `hsl(0, 0.00%, 23.10%)`, 20);     
                        
                        new polygon(controller, symbolIcon, 6, item.x, item.y, 15, fillColor, 30); 
                    }           
                } 

                item.generat = true;

            }                
        }
    }
}







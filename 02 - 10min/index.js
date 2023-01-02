import '../template/p5.min.js';


const file = document.getElementById('file');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {

    button.addEventListener('click', () => {
        const url = button.getAttribute('data-filepath');
        createSketch(url);
    })
})

let active;
file.onchange = (f) => {
    const file = f.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        createSketch(e.target.result)
    };
    reader.readAsDataURL(file);
}


function createSketch(url) {
    if (active) active.remove()

    let sketch = (p) => {

        active = p
        let img;
        const smallPoint = 4
        const largePoint = 20;
    
        p.preload = () => {
            img = p.loadImage(url);
        }
    
        p.setup = () => {
            const width = 500 //window.innerWidth
            // const height = window.innerHeight
            img.resize(width, 0)

            p.createCanvas(width, img.height);
            p.imageMode(p.CENTER);
            p.noStroke();
            p.background(255);
            img.loadPixels();
        };
      
        p.draw = () => {
    
    
            const run = () => {
                const random = p.random(1);
                let pointillize = p.map(random, 0, 1, smallPoint, largePoint);
                let x = p.floor(p.random(img.width));
                let y = p.floor(p.random(img.height));
                let pix = img.get(x, y);
                p.fill(pix, 128);
                p.ellipse(x, y, pointillize, pointillize);
            }
    
            for (let i = 0; i < 100; i++) {
                run();
            }
               
        }
    
    };
    
    new p5(sketch);
}
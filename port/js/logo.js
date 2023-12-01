//DRY code, shoutout to Venkat Subramaniam
let start = document.querySelector('#brand');
let ex = 10;
function swing(element) {

    function update(time) {
        
        const x = Math.sin(time / 1231) * ex;
        const y = Math.sin(time / 1458) * ex;

        element.style.transform = [
            `rotateX(${x}deg)`,
            `rotateY(${y}deg)`
        ].join(' ');

        requestAnimationFrame(update);
    }
    update(0); //love your nested functions
}

swing(start);


let start_button = start.querySelector('a');
let og_color = start_button.style.color;
let inter = 0;


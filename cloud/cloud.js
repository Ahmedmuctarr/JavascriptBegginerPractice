// Function to generate random characters from special symbols
function randomText() {
    var text = "!@#$%^&*()";
    var letters = text[Math.floor(Math.random() * text.length)];
    return letters;
}

// Function to simulate the falling raindrops
function rain() {
    let cloud = document.querySelector(".cloud");
    let e = document.createElement('div');
    e.classList.add('drop');
    cloud.appendChild(e);

    let left = Math.floor(Math.random() * 300); // Random horizontal position
    let size = Math.random() * 1.5; // Random size for the drop
    let duration = Math.random() * 1; // Random animation duration

    // Set random character for the raindrop
    e.innerText = randomText();

    // Apply styles for the raindrop
    e.style.left = left + 'px';
    e.style.fontSize = 1.5 + size + 'em';
    e.style.animationDuration = (1 + duration) + 's';

    // Remove the drop after animation is complete
    setTimeout(function() {
        cloud.removeChild(e);
    }, (1000 + duration * 1000)); // Ensuring the drop stays for its animation duration
}

// Set interval to create the rain effect every 300ms (adjust for more/less density)
setInterval(rain, 300);

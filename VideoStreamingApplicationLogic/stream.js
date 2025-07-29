const video = document.getElementById('video');
const progressBar = document.querySelector('.progress');
const loadingMessage = document.querySelector('.loading');

// URL to a sample video (using a CORS proxy)
const videoURL = 'https://static.videezy.com/system/resources/previews/000/004/298/original/22.mp4';

let videoChunkSize = 2 * 1024 * 1024; // 2MB per chunk (simulated)

function loadVideoChunks() {
  let loadedBytes = 0;

  // Function to simulate chunk loading
  function loadChunk() {
    fetch(videoURL)
      .then(response => response.arrayBuffer())
      .then(data => {
        loadedBytes += data.byteLength;
        updateProgress(loadedBytes);

        // Load the chunk to video
        const blob = new Blob([data], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        video.src = url;

        // Check if the video has finished loading
        if (loadedBytes < videoChunkSize) {
          setTimeout(loadChunk, 1000); // Load next chunk every second
        } else {
          loadingMessage.textContent = 'Video is ready to play!';
        }
      })
      .catch(error => {
        console.error('Error loading video chunk:', error);
        loadingMessage.textContent = 'Error loading video.';
      });
  }

  loadChunk();
}

function updateProgress(loadedBytes) {
  const totalBytes = 20 * 1024 * 1024; // Simulated total video size (20MB)
  const percentage = (loadedBytes / totalBytes) * 100;
  progressBar.style.width = percentage + '%';
}

// Start loading video chunks
loadVideoChunks();

class VideoPlayer {
    constructor() {
        // Select elements
        this.previous = document.querySelector('#pre');
        this.play = document.querySelector('#play');
        this.next = document.querySelector('#next');
        this.title = document.querySelector('#title');
        this.recent_volume = document.querySelector('#volume');
        this.mute = document.querySelector('#volume_icon');
        this.volume_show = document.querySelector('#volume_show');
        this.slider = document.querySelector('#duration_slider');
        this.show_duration = document.querySelector('#show_duration');
        this.auto_play = document.querySelector('#auto');
        this.present = document.querySelector('#present');
        this.total = document.querySelector('#total');
        this.favicon = document.getElementById('favicon');
        this.progressBar = document.querySelector('.progress');
        this.loadingMessage = document.querySelector('.loading');

        this.timer = null;
        this.autoplay = 0;
        this.index_no = 0;
        this.Playing_video = false;

        // Create video element only once
        if (!document.getElementById("track_video")) {
            this.video = document.createElement('video');
            this.video.id = "track_video";
            var leftElement = document.querySelector('.left');
            leftElement.insertBefore(this.video, leftElement.firstChild);
        } else {
            this.video = document.getElementById("track_video");
        }

        // URL to a sample video (using a CORS proxy)
        this.videoURL = 'https://cors-anywhere.herokuapp.com/https://www.w3schools.com/html/mov_bbb.mp4';
        
        // Simulated video chunk size (2MB)
        this.videoChunkSize = 2 * 1024 * 1024;
        
        // Placeholder for video list (can be updated dynamically with file input)
        this.All_video = [
            {
                name: "Sample Video",
                path: this.videoURL, // Video URL to be loaded dynamically
            }
        ];

        // Load the first video (or any selected)
        this.load_track(this.index_no);

        // Bind event listeners
        this.play.addEventListener('click', () => this.justplay());
        this.next.addEventListener('click', () => this.next_video());
        this.previous.addEventListener('click', () => this.previous_video());
        this.recent_volume.addEventListener('input', () => this.volume_change());
        this.slider.addEventListener('input', () => this.change_duration());
        this.auto_play.addEventListener('click', () => this.autoplay_switch());

        document.addEventListener('keyup', (event) => this.handleKeyboardInput(event));
        document.querySelector('#fileInput').addEventListener('change', (e) => this.handleFileSelection(e));

        // Call loadChunks() for dynamic chunk loading
        this.loadVideoChunks();
    }

    loadVideoChunks() {
        let loadedBytes = 0;

        // Function to simulate chunk loading
        const loadChunk = () => {
            fetch(this.videoURL)
                .then(response => response.arrayBuffer())
                .then(data => {
                    loadedBytes += data.byteLength;
                    this.updateProgress(loadedBytes);

                    // Load the chunk into the video element
                    const blob = new Blob([data], { type: 'video/mp4' });
                    const url = URL.createObjectURL(blob);
                    this.video.src = url;

                    // Check if the video has finished loading
                    if (loadedBytes < this.videoChunkSize) {
                        setTimeout(loadChunk, 1000); // Load next chunk every second
                    } else {
                        this.loadingMessage.textContent = 'Video is ready to play!';
                    }
                })
                .catch(error => {
                    console.error('Error loading video chunk:', error);
                    this.loadingMessage.textContent = 'Error loading video.';
                });
        };

        loadChunk();
    }

    updateProgress(loadedBytes) {
        const totalBytes = 20 * 1024 * 1024; // Simulated total video size (20MB)
        const percentage = (loadedBytes / totalBytes) * 100;
        this.progressBar.style.width = percentage + '%';
    }

    handleFileSelection(event) {
        const files = event.target.files;
        this.All_video = [];

        // Filter out MP4 and MKV files
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
                const video = {
                    name: file.name,
                    path: URL.createObjectURL(file),
                };
                this.All_video.push(video);
            }
        }

        if (this.All_video.length > 0) {
            this.load_track(0); // Load the first video if there are any
        }
    }

    // Function to load the track
    load_track(index_no) {
        clearInterval(this.timer);
        this.reset_slider();

        if (this.All_video[index_no]) {
            this.video.src = this.All_video[index_no].path;
            this.title.innerHTML = this.All_video[index_no].name;
            this.video.load();
            document.title = this.All_video[index_no].name;
            this.timer = setInterval(() => this.range_slider(), 1000);
            this.total.innerHTML = this.All_video.length;
            this.present.innerHTML = index_no + 1;
        }
    }

    // Mute sound function
    mute_sound() {
        this.video.volume = 0;
        this.recent_volume.value = 0;
        this.volume_show.innerHTML = 0;
    }

    // Check if the video is playing or not
    justplay() {
        if (this.Playing_video == false) {
            this.playvideo();
        } else {
            this.pausevideo();
        }
    }

    // Reset video slider
    reset_slider() {
        this.slider.value = 0;
    }

    // Play video
    playvideo() {
        this.video.play();
        this.Playing_video = true;
        this.play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    }

    // Pause video
    pausevideo() {
        this.video.pause();
        this.Playing_video = false;
        this.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }

    // Next video
    next_video() {
        if (this.index_no < this.All_video.length - 1) {
            this.index_no += 1;
        } else {
            this.index_no = 0;
        }
        this.load_track(this.index_no);
        this.playvideo();
    }

    // Previous video
    previous_video() {
        if (this.index_no > 0) {
            this.index_no -= 1;
        } else {
            this.index_no = this.All_video.length - 1;
        }
        this.load_track(this.index_no);
        this.playvideo();
    }

    // Change volume
    volume_change() {
        this.volume_show.innerHTML = this.recent_volume.value;
        this.video.volume = this.recent_volume.value / 100;
    }

    // Change slider position
    change_duration() {
        const slider_position = this.video.duration * (this.slider.value / 100);
        this.video.currentTime = slider_position;
    }

    // Autoplay function
    autoplay_switch() {
        if (this.autoplay == 1) {
            this.autoplay = 0;
            this.auto_play.style.background = "rgba(255,255,255,0.2)";
        } else {
            this.autoplay = 1;
            this.auto_play.style.background = "#148F77";
        }
    }

    // Update slider position
    range_slider() {
        let position = 0;

        // Update slider position
        if (!isNaN(this.video.duration)) {
            position = this.video.currentTime * (100 / this.video.duration);
            this.slider.value = position;
        }

        // Function will run when the video is over
        if (this.video.ended) {
            this.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
            if (this.autoplay == 1) {
                this.next_video();
            }
        }
    }

    // Handle keyboard input
    handleKeyboardInput(event) {
        if (event.key === 'n' || event.key === 'N') {
            this.next_video();
        } else if (event.key === 'p' || event.key === 'P') {
            this.previous_video();
        } else if (event.key === ' '){
            if (this.Playing_video == true) {
                this.pausevideo();
            } else {
                this.playvideo();
            }
        } else if (event.key === 'm' || event.key === 'M') {
            if (this.video.volume === 0) {
                this.recent_volume.value = 80;
                this.volume_show.innerHTML = this.recent_volume.value;
                this.video.volume = this.recent_volume.value / 100;
            } else {
                this.mute_sound();
            }
        }
    }
}

// Initialize the video player
//const videoPlayer = new VideoPlayer();

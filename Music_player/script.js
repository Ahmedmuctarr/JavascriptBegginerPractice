class MusicPlayer {
    constructor() {
        // Select elements
        this.previous = document.querySelector('#pre');
        this.play = document.querySelector('#play');
        this.next = document.querySelector('#next');
        this.title = document.querySelector('#title');
        this.recent_volume = document.querySelector('#volume');
        this.volume_show = document.querySelector('#volume_show');
        this.slider = document.querySelector('#duration_slider');
        this.show_duration = document.querySelector('#show_duration');
        this.track_image = document.querySelector('#track_image');
        this.auto_play = document.querySelector('#auto');
        this.present = document.querySelector('#present');
        this.total = document.querySelector('#total');
        this.artist = document.querySelector('#artist');
        this.favicon = document.getElementById('favicon');

        this.timer = null;
        this.autoplay = 0;
        this.index_no = 0;
        this.Playing_song = false;

        // Create audio element
        this.track = document.createElement('audio');

        // All songs list
        this.All_song = [
            {
                name: "s-o-to-my-x",
                path: "NewSchool/s-o-to-my-x.mp3",
                img: "img/img1.jpg",
                singer: "Ahmed"
            },
            {
                name: "sincerely-dad",
                path: "NewSchool/sincerely-dad.mp3",
                img: "img/img2.jpg",
                singer: "Tyrell"
            },
            {
                name: "youtube song",
                path: "https://www.youtube.com/watch?v=mAz6_5WJ4nI",
                img: "img/img2.jpg",
                singer: "Youtube"
            }
        ];

        this.load_track(this.index_no);

        // Bind event listeners
        this.play.addEventListener('click', () => this.justplay());
        this.next.addEventListener('click', () => this.next_song());
        this.previous.addEventListener('click', () => this.previous_song());
        this.recent_volume.addEventListener('input', () => this.volume_change());
        this.slider.addEventListener('input', () => this.change_duration());
        this.auto_play.addEventListener('click', () => this.autoplay_switch());

        document.addEventListener('keyup', (event) => this.handleKeyboardInput(event));
        document.querySelector('#fileInput').addEventListener('change', (e) => this.handleFileSelection(e));
    }

    handleFileSelection(event) {
        const files = event.target.files;
        this.All_song = [];

        // Filter out MP3 files
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.name.endsWith('.mp3')) {
                const song = {
                    name: file.name,
                    path: URL.createObjectURL(file), // Create a URL for the local file
                    img: "img/img1.jpg", // Placeholder image or dynamically load a cover if available
                    singer: "Unknown" // You can extract artist info from metadata if needed
                };
                this.All_song.push(song);
            }
        }

        if (this.All_song.length > 0) {
            this.load_track(0); // Load the first song if there are any
        }
    }

    // Function to load the track
    load_track(index_no) {
        clearInterval(this.timer);
        this.reset_slider();

        if (this.All_song[index_no]) {
            this.track.src = this.All_song[index_no].path;
            this.title.innerHTML = this.All_song[index_no].name;
            this.track_image.src = this.All_song[index_no].img;
            this.artist.innerHTML = this.All_song[index_no].singer;
            this.track.load();
            document.title = this.All_song[index_no].name;
            this.favicon.href = this.All_song[index_no].img;
            this.timer = setInterval(() => this.range_slider(), 1000);
            this.total.innerHTML = this.All_song.length;
            this.present.innerHTML = index_no + 1;
        }
    }

    // Mute sound function
    mute_sound() {
        this.track.volume = 0;
        this.recent_volume.value = 0;
        this.volume_show.innerHTML = 0;
    }

    // Check if the song is playing or not
    justplay() {
        if (this.Playing_song == false) {
            this.playsong();
        } else {
            this.pausesong();
        }
    }

    // Reset song slider
    reset_slider() {
        this.slider.value = 0;
    }

    // Play song
    playsong() {
        this.track.play();
        this.Playing_song = true;
        this.play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    }

    // Pause song
    pausesong() {
        this.track.pause();
        this.Playing_song = false;
        this.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }

    // Next song
    next_song() {
        if (this.index_no < this.All_song.length - 1) {
            this.index_no += 1;
        } else {
            this.index_no = 0;
        }
        this.load_track(this.index_no);
        this.playsong();
    }

    // Previous song
    previous_song() {
        if (this.index_no > 0) {
            this.index_no -= 1;
        } else {
            this.index_no = this.All_song.length - 1;
        }
        this.load_track(this.index_no);
        this.playsong();
    }

    // Change volume
    volume_change() {
        this.volume_show.innerHTML = this.recent_volume.value;
        this.track.volume = this.recent_volume.value / 100;
    }

    // Change slider position
    change_duration() {
        const slider_position = this.track.duration * (this.slider.value / 100);
        this.track.currentTime = slider_position;
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
        if (!isNaN(this.track.duration)) {
            position = this.track.currentTime * (100 / this.track.duration);
            this.slider.value = position;
        }

        // Function will run when the song is over
        if (this.track.ended) {
            this.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
            if (this.autoplay == 1) {
                this.next_song();
            }
        }
    }

    // Handle keyboard input
    handleKeyboardInput(event) {
        if (event.key === 'n' || event.key === 'N') {
            this.next_song();
        } else if (event.key === 'p' || event.key === 'P') {
            this.previous_song();
        }else if(event.key === ' '){
			if(Playing_song == true)
			{
				pausesong();
			}else{
				playsong();
			}
			
		} else if (event.key === 'm' || event.key === 'M') {
            if (this.track.volume === 0) {
                this.recent_volume.value = 80;
                this.volume_show.innerHTML = this.recent_volume.value;
                this.track.volume = this.recent_volume.value / 100;
            } else {
                this.mute_sound();
            }
        }
    }
}

// Initialize the music player
//const musicPlayer = new MusicPlayer();

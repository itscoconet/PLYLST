/** added progress bar + volum adjustment slider */
$(document).ready(function() {
    let current = 0;
    const audio = $('#audio')[0]; // Directly access the audio element
    const playlist = $('#playlist');
    const tracks = playlist.find('li a');
    const len = tracks.length;
    const progressBar = $('#progress-bar');
    const progressContainer = $('#progress-container');
    const volumeSlider = $('#volume-slider');  // Get the volume slider element



    CO2PLYLST();

    function CO2PLYLST() {
        audio.volume = 0.2;  // Set the audio's volume to 20
        // Start playback immediately
        audio.play();

        // Handle playlist item clicks
        playlist.find('a').click(function(e) {
            e.preventDefault();
            let link = $(this);
            current = link.parent().index();
            run(link, audio);
            $('a.pause').show();
            $('a.play').hide();
        });

        // Automatically go to next track on end
        audio.addEventListener('ended', function() {
            current = (current + 1) % len; // Loop back to start after last track
            let link = playlist.find('a').eq(current); // Use eq to handle jQuery object directly
            run(link, audio);
        });

        // Setup play/pause functionality
        $('a.pause').hide().click(function() {
            audio.pause();
            $('a.play').show();
            $(this).hide();
        });

        $('a.play').click(function() {
            if (current === 0 && !audio.src) { // Check if there's nothing loaded
                let link = playlist.find('a').eq(current);
                run(link, audio);
            } else {
                audio.play();
            }
            $('a.pause').show();
            $(this).hide();
        });

        audio.addEventListener('timeupdate', updateProgressBar, false);

        progressContainer.click(function(e) {
            // Calculate the new time for the audio
            const clickX = e.pageX - $(this).offset().left;
            const newTime = (clickX / $(this).width()) * audio.duration;
            audio.currentTime = newTime;
        });

        // Handle volume changes
        volumeSlider.on('input change', function() {
            audio.volume = $(this).val();
        });
    }

    function run(link, player) {
        player.src = link.attr('data'); // Assume 'date' holds the media source
        let par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        player.load();
        player.play();
        progressBar.width(0);
    }

    function updateProgressBar() {
        let percentage = Math.floor((100 / audio.duration) * audio.currentTime);
        progressBar.width(percentage + '%');
    }
});

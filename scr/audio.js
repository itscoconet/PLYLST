/*
  CVBE: PLYLST
  simple jquery/javascript music playlist
  https://cvbe.net
  https://github.com/cvbenet/PLYLST
*/

$(document).ready(function(){
    var audio, playlist, tracks, current; // setting global variables
    var controls = document.getElementById("audio");

   cvbePlaylist(); // calling myPlaylist function

    function cvbePlaylist(){
        current = 0; // default value for current - represent the index of song
        audio = $('#audio'); // audio element id <audio id="audio">
        playlist = $('#playlist'); // playlist container
        tracks = playlist.find('li a'); // find() - gets the descendants of the selector/element
        len = tracks.length;  // # of tracks / songs
        audio[0].play();
        playlist.find('a').click(function(e){
            e.preventDefault();
            link = $(this);
            current = link.parent().index();
            run(link, audio[0]);
        });

        audio[0].addEventListener('ended',function(e){
            current++;
            if(current > len){
                current = 0;
                link = playlist.find('a')[0];
            }else{
                link = playlist.find('a')[current];
            }
            run($(link),audio[0]);
        });

        $("a.pause").hide();
        $("a.pause").click(function(){
            controls.pause();
            $('a.play').show(); // when paused is clicked, show play button
            $(this).hide();      // and hide play button
        });

        $('a.play').click(function(){
            // if nothing has been selected,
            // this condition plays first song in the list
            if(current == 0){
              link = playlist.find('a')[current];
              run($(link),audio[0]);
            //otherwise, continue playing any paused song
            }else{
                controls.play();
            }

            $('a.pause').show(); // when play is clicked, show pause button
            $(this).hide();      // and hide play button

        });


        // if back or next button is need
        // ** optional, as you can select songs manually and
        // will autoplay next song

        /*
        $('a.back').on('click', function() {
            current--
            if(current == -1){
                current = len-1;
            }
           link = playlist.find('a')[current];
           run($(link),audio[0]);
        });

        $('a.next').on('click', function(){
            current++
            if(current == len){
                current = 0
            }
            link = playlist.find('a')[current];
            run($(link), audio[0]);
        })
        */

    }


    function run(link, player){
        player.src = link.attr('data');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
    }
});

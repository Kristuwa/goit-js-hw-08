import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (currentTime) {
  // data is an object containing properties specific to that event
  localStorage.setItem(STORAGE_KEY, currentTime.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const timeOnStartPlay = localStorage.getItem(STORAGE_KEY);

player
  .setCurrentTime(timeOnStartPlay)
  .then(function (seconds) {
    console.log(seconds);
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

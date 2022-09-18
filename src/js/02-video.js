import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (currentTime) {
  console.log(currentTime);
  // data is an object containing properties specific to that event
  return currentTime;
};

player.on('timeupdate', onPlay);

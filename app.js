const video = document.querySelector("#hero-video");
if (video) {
  const play = document.querySelector("#play");
  const sync = () => {
    play.textContent = video.paused ? "Play video" : "Pause video";
    play.setAttribute("aria-pressed", String(!video.paused));
  };
  play.addEventListener("click", () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  video.querySelector("source").addEventListener("error", () => {
    document.querySelector(".video-error").hidden = false;
    play.disabled = true;
  });
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
    video.play().catch(sync);
  sync();
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Keep Spotify and film playback exclusive: starting one pauses the others.
const spotifyControllers = new Set();
const mediaElements = [...document.querySelectorAll("audio, video")];
function pauseOtherMedia(active) {
  spotifyControllers.forEach((controller) => {
    if (controller !== active) controller.pause();
  });
  mediaElements.forEach((media) => {
    if (media !== active && !media.paused) media.pause();
  });
}
mediaElements.forEach((media) => {
  media.addEventListener("play", () => pauseOtherMedia(media));
});

const spotifyFrames = [
  ...document.querySelectorAll('iframe[src*="open.spotify.com/embed/"]'),
];
if (spotifyFrames.length) {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    spotifyFrames.forEach((frame) => {
      // Replace the existing embed only after Spotify's control API is ready.
      const url = new URL(frame.src);
      url.pathname = url.pathname.replace("/embed/", "/");
      const title = frame.title;
      const mount = document.createElement("div");
      mount.className = "spotify-player";
      frame.replaceWith(mount);
      IFrameAPI.createController(
        mount,
        {
          url: url.href,
          width: "100%",
          height: 352,
        },
        (controller) => {
          spotifyControllers.add(controller);
          let wasPlaying = false;
          controller.addListener("playback_started", () => {
            wasPlaying = true;
            pauseOtherMedia(controller);
          });
          controller.addListener("playback_update", (event) => {
            const playing = event.data.isPaused === false;
            if (playing && !wasPlaying) pauseOtherMedia(controller);
            wasPlaying = playing;
          });
          controller.addListener("ready", () => {
            const embed = document.querySelector(
              `iframe[src*="${url.pathname.split("/").pop()}"]`,
            );
            if (embed) embed.title = title;
          });
        },
      );
    });
  };
  const spotifyApi = document.createElement("script");
  spotifyApi.src = "https://open.spotify.com/embed/iframe-api/v1";
  spotifyApi.async = true;
  document.head.appendChild(spotifyApi);
}

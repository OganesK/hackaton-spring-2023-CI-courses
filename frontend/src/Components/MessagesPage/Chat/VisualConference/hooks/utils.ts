export default async function getMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 1280,
        height: 720,
      },
    });
    return {
      stream: mediaStream,
      error: null,
    };
  } catch (err) {
    return {
      stream: null,
      error: err,
    };
  }
}

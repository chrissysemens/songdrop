// useTrackPreview.ts
import { useAudioPlayer } from 'expo-audio';

export function useTrackPreview(sourceUrl: string | null) {
  const player = useAudioPlayer(sourceUrl ? { uri: sourceUrl } : undefined);
  
  const replay = async () => {
    await player.seekTo(0);
    await player.play();
  };

  return {
    isPlaying: player.playing,
    play: player.play,
    pause: player.pause,
    replay,
    duration: player.duration,
    position: player.currentTime,
  };
}

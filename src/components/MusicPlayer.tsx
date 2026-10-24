import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc, ExternalLink } from 'lucide-react';
import { GothicStilettoCross } from './GothicIcons';

interface MusicPlayerProps {
  onShowToast?: (msg: string) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onShowToast }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songInfo = {
    title: 'surreal',
    artist: 'ASMODEUS / DEITIES',
    neteaseUrl: 'https://163cn.tv/bjkFFfw3',
  };

  // Attempt autoplay immediately
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without user gesture
          setIsPlaying(false);
        });
    };

    // 1. Initial attempt
    tryPlay();

    // 2. WeChat webview support (WeixinJSBridgeReady allows autoplay on WeChat)
    const handleWechatReady = () => {
      tryPlay();
    };
    document.addEventListener('WeixinJSBridgeReady', handleWechatReady, false);

    // 3. Fallback: on the very first touch/click anywhere on page, trigger playback
    const handleFirstGesture = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {});
      }
      cleanupGestureListeners();
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('click', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true, passive: true });

    return () => {
      document.removeEventListener('WeixinJSBridgeReady', handleWechatReady);
      cleanupGestureListeners();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (onShowToast) onShowToast('音乐已暂停');
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          if (onShowToast) onShowToast('正在播放《surreal》');
        })
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Audio element with local primary asset and online fallback */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="./assets/audio/surreal.mp3" type="audio/mpeg" />
        <source src="/assets/audio/surreal.mp3" type="audio/mpeg" />
        <source
          src="https://music.163.com/song/media/outer/url?id=3342387916.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Floating Gothic Music Player Widget */}
      <div className="fixed bottom-5 left-5 z-40 select-none">
        <div
          className={`relative flex items-center gap-3 bg-[#09090c]/90 border border-zinc-800/90 hover:border-zinc-700/90 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 p-2 sm:px-3 sm:py-2 ${
            isPlaying ? 'ring-1 ring-rose-950/80 shadow-[0_0_20px_rgba(159,18,57,0.25)]' : ''
          }`}
        >
          {/* Spinning Vinyl Disc Button */}
          <button
            onClick={togglePlay}
            title={isPlaying ? '暂停播放' : '继续播放'}
            className="relative w-9 h-9 rounded-full bg-zinc-950 border border-zinc-700/80 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer group shadow"
          >
            {/* Spinning groove pattern */}
            <div
              className={`absolute inset-0 rounded-full border border-dashed border-zinc-700/60 ${
                isPlaying ? 'animate-spin [animation-duration:4s]' : ''
              }`}
            />
            {/* Center label */}
            <div className="w-4 h-4 rounded-full bg-rose-950/80 border border-rose-800/80 flex items-center justify-center z-10">
              {isPlaying ? (
                <Pause className="w-2.5 h-2.5 text-rose-200" />
              ) : (
                <Play className="w-2.5 h-2.5 text-rose-200 translate-x-0.5" />
              )}
            </div>
          </button>

          {/* Song Info (Can be minimized on tiny screens) */}
          <div
            onClick={() => setIsMinimized(!isMinimized)}
            className="flex flex-col cursor-pointer pr-1"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-zinc-100 font-cinzel tracking-wider group-hover:text-rose-200 transition-colors">
                {songInfo.title}
              </span>
              <GothicStilettoCross className="w-2.5 h-2.5 text-rose-500/80" />
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-2.5 ml-1">
                  <span className="w-0.5 h-2 bg-rose-400 animate-pulse" />
                  <span className="w-0.5 h-3 bg-rose-500 animate-pulse [animation-delay:150ms]" />
                  <span className="w-0.5 h-1.5 bg-rose-400 animate-pulse [animation-delay:300ms]" />
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-wider truncate max-w-[130px] sm:max-w-[170px]">
              {songInfo.artist}
            </span>
          </div>

          {/* Controls: Mute & NetEase link */}
          <div className="flex items-center gap-1.5 pl-1 border-l border-zinc-800/80">
            <button
              onClick={toggleMute}
              title={isMuted ? '取消静音' : '静音'}
              className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <a
              href={songInfo.neteaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="在网易云音乐打开单曲《surreal》"
              className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-zinc-900 rounded-full transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Small tip if browser paused autoplay */}
        {!isPlaying && !hasInteracted && (
          <div
            onClick={togglePlay}
            className="mt-1.5 px-2.5 py-1 bg-zinc-950/90 border border-zinc-800 text-[10px] text-rose-300 font-gothic rounded-full shadow cursor-pointer animate-pulse flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5 text-rose-400" />
            <span>点击或触屏即可启播背景音乐</span>
          </div>
        )}
      </div>
    </>
  );
};

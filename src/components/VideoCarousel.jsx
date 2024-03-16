import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'

const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })
    const [loadedData, setLoadedData] = useState([])
    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({...prevVideo, isEnd: true, videoId: i + 1}))
                break;
            case 'video-last':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo: true}))
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo: false, videoId: 0}))
                break;
            case 'play':
                setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
            case 'pause':
                setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;

            default:
                return video;
        }
    }

    const handleLoadedMetadata = (i, e) => {
        setLoadedData((pre) => [...pre, e])
    }

    useEffect(() => {
        if(loadedData.length > 3){
            if (!isPlaying) {
                videoRef.current[videoId]?.pause()
            }else{
                startPlay && videoRef.current[videoId]?.play()
            }
        }

    }, [videoId, loadedData, isPlaying, startPlay])

    useEffect(() => {
        let currProgress = 0
        let span = videoSpanRef.current

        if(span[videoId]){
            // animate progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)

                    if(progress !== currProgress){
                        currProgress = progress

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760
                                ? '10vw'
                                : window.innerWidth < 1200
                                ? '10vw'
                                : '4vw'
                        })

                        gsap.to(span[videoId], {
                            width: `${currProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                onComplete: () => {
                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })

                        gsap.to(span[videoId], {
                            // width: `${currProgress}%`,
                            backgroundColor: '#afafaf'
                        })
                    }
                },
            })


            if(video === 0){
                anim.restart()
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoId]?.currentTime / hightlightsSlides[videoId]?.videoDuration)
            }

            if(isPlaying){
                gsap.ticker.add(animUpdate)
            }else{
                gsap.ticker.remove(animUpdate)
            }
        }

    }, [videoId, startPlay, video, isPlaying])

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })

        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((pre) => ({...pre, startPlay: true, isPlaying: true}))
            },
        })
    }, [isEnd, videoId])

    return <>
        <div className='flex items-center'>
            {hightlightsSlides.map((slide, key) => (
                <div key={key} id="slider" className='sm:pr-20 pr-10'>
                    <div className="video-carousel_container">
                        <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                            <video
                                id="video"
                                playsInline={true}
                                preload='auto'
                                muted
                                ref={(e) => videoRef.current[key] = e}
                                onPlay={() => {
                                    setVideo(prevVideo => ({...prevVideo, isPlaying: true}))
                                }}
                                onEnded={() =>
                                    key !== 3
                                        ? handleProcess("video-end", key)
                                        : handleProcess("video-last")
                                }
                                onLoadedMetadata={(e) => handleLoadedMetadata(e, key)}
                                className={`${slide.id === 2 ? 'translate-x-44' : ''} pointer-events-none`}
                            >
                                <source src={slide.video} type='video/mp4' />
                            </video>
                        </div>

                        <div className='absolute top-12 left-[5%] z-10'>
                            {slide.textLists.map((text, key) => (
                                <p key={key} className='md:text-2xl text-xl font-medium'>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className='w-full relative flex items-center mt-10 justify-center'>
            <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                {videoRef.current.map((_, i) => (
                    <span
                        key={i}
                        ref={(el) => videoDivRef.current[i] = el}
                        className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative'
                    >
                        <span
                            className='absolute h-full w-full rounded-full'
                            ref={(el) => videoSpanRef.current[i] = el}
                        />
                    </span>
                ))}
            </div>

            <button className='control-btn'>
                <img
                    src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                    alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                    onClick={isLastVideo
                        ? () => handleProcess('video-reset')
                        : !isPlaying
                        ? () => handleProcess('play')
                        : () => handleProcess('pause')
                    }
                />
            </button>
        </div>
    </>
}

export default VideoCarousel

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export const animateWithGSAPTimeline = (timeline, rotationRef, rotationState, target1, target2, animationProps) => {
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut'
    })

    timeline.to(target1, {
        ...animationProps,
        ease: 'power2.inOut'
    },
    '<'
    )

    timeline.to(target2, {
        ...animationProps,
        ease: 'power2.inOut'
    },
    '<'
    )
}

export const animateWithGsap = (target, animateProps, scrollProps) => {
    gsap.to(target, {
        ...animateProps,
        scrollTrigger:{
            trigger: target,
            toggleActions: 'restart reverse restart reverse',
            start: 'top 85%',
            ...scrollProps,
        }
    })
}
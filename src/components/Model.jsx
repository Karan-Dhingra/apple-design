import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { yellowImg } from '../utils'
import * as THREE from 'three'
import ModelView from './ModelView'
import { View } from '@react-three/drei'
import { models, sizes } from './../constants/index';
import { Canvas } from '@react-three/fiber'
import { animateWithGSAPTimeline } from '../utils/animations'

const Model = () => {
    const [size, setSize] = useState('small')
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
        img: yellowImg
    })

    // Control Camera
    const cameraControllSmall = useRef()
    const cameraControllLarge = useRef()

    // model
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    // rotation value
    const [smallRotation, setSmallRotation] = useState(0)
    const [largeRotation, setLargeRotation] = useState(0)

    const timeline = gsap.timeline()

    useEffect(() => {
        if(size === 'small') {
            animateWithGSAPTimeline(timeline, large, largeRotation, '#view2', '#view1', {
                transform: 'translateX(0)',
                duration: 2
            })
        }else {
            animateWithGSAPTimeline(timeline, small, smallRotation, '#view1', '#view2', {
                transform: 'translateX(-100%)',
                duration: 2
            })
        }
    }, [largeRotation, size, smallRotation, timeline])

    useGSAP(() => {
        gsap.to('#heading', {y: 0, opacity: 1})
    }, [])

    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>
                    Take a closer look.
                </h1>

                <div className='flex flex-col items-center mt-5'>
                    <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControllSmall}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />
                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControllLarge}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}
                        />

                        <Canvas
                            className='w-full h-full'
                            style={{
                                position: 'fixed',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden',
                            }}
                            eventSource={document.getElementById('root')}
                        >
                            <View.Port />
                        </Canvas>
                    </div>

                    <div className='mx-auto w-full'>
                        <p className='text-sm font-light mb-5 text-center'>{model.title}</p>
                        <div className='flex-center'>
                            <ul className='color-container'>
                                {models.map((model, key) => (
                                    <li key={key} className='w-6 h-6 rounded-full mx-2 cursor-pointer' style={{backgroundColor: model.color[0]}} onClick={() => setModel(model)} />
                                ))}
                            </ul>

                            <button className='size-btn-container'>
                                {sizes.map((item, key) => (
                                    <span key={key} className='size-btn' style={{
                                        backgroundColor: item.value === size ? 'white' : 'transparent',
                                        color: item.value === size ? 'black' : 'white',
                                    }}
                                    onClick={() => {setSize(item.value)}}
                                    >{item.label}</span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model
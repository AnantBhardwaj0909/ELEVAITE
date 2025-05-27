"use client"
import React, { useEffect } from 'react'
import Link from 'next/link';
import { Button } from './button';
import Image from 'next/image';
import { useRef } from 'react';
const HeroSection = () => {
    const imageRef=useRef(null);

    useEffect(()=>{
        const imageElement = imageRef.current;
        const handleScroll=()=>{
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;
            if(scrollPosition>scrollThreshold){
                imageElement.classList.add("scrolled");
            }
            else {
                imageElement.classList.remove("scrolled");
              }
        };
        window.addEventListener("scroll", handleScroll);
    },[])
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
        <div className="flex flex-col items-center justify-center">
            <div className="space-y-6 mx-auto">
            <h1 className="bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 font-extrabold tracking-tighter text-transparent bg-clip-text text-center text-7xl">
  Your AI Guru for <br /> Enhancement
                </h1>
                <p className="text-lg text-muted-foreground text-center">Personalized guidance. Intelligent insights. Limitless growth.</p>
                <p>Let your AI-driven mentor light the way to a brighter, more fulfilling career.</p>
                <p></p>
            </div>
            <div>
                <Link href='/dashboard'>
                <Button size="lg" className="px-30">Enter the Realm</Button>
                </Link>
                {/* <Link href='https://www.naukri.com/code360/home/leaderboards/campus'>
                <Button size="lg" className="px-8">Enter the Realm</Button>
                </Link> */}
            </div>
            <div className='hero-image-wrapper mt-5 md:mt-0'>
                <div ref={imageRef} className='hero-image'>
                    {/* to get access to this div html we use hook */}
                    <Image src="/lolo.jpg"
                    width={1280}
                    height={720}
                    alt="site preview"
                    className='rounded-lg shadow-2xl border mx-auto'
                    priority/>
                </div>
            </div>
            {/* // two divs to add the tilting effect to effect */}
        </div>
    </section>
  )
}

export default HeroSection
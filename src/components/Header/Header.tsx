'use client'
import React, { useEffect, useState } from 'react'
import TextureBG from "@/assets/texture-bg.png";
import { usePathname } from 'next/navigation';
import StoryBookContent from './StoryBookContent';
import DictionaryContent from './DictionaryContent';
import ConversationContent from './ConversationContent';
import GameContent from './GameContent';
import Image from 'next/image';
import WaveIMG from '@/assets/wave.png'
const Header = () => {
   const pathname = usePathname()
    const getColor  =()=>{
        switch (pathname) {
            case '/storybook':
                return 'bg-[#FDDB82]'
                break;
            case '/dictionary':
                return 'bg-list2'
                break;
            case '/conversation':
                return 'bg-list3'
                break;
            case '/game':
                return 'bg-list4'
                break;
            default:
                break;
        }
    }

    const getContent=()=>{
        switch (pathname) {
            case '/storybook':
                return <StoryBookContent/>
                break;
            case '/dictionary':
                return <DictionaryContent/>
                break;
            case '/conversation':
                return <ConversationContent/>
                break;
            case '/game':
                return <GameContent/>
                break;
            default:
                break;
        }
    }
  return (
    <header   style={{ backgroundImage: `url(${TextureBG.src})` }} className={`${getColor()} relative min-h-screen  flex items-center`}>
        <main className='container flex lg:flex-row flex-col-reverse relative items-center justify-between'>
        {getContent()}
        </main>
        <Image src={WaveIMG} alt='wave' className='absolute bottom-0 translate-y-1/4 w-full left-0 z-20' draggable={false} />
    </header>

  )
}

export default Header

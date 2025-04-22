'use client'
import { conversation } from '@/data/convertation'
import { useModalStore } from '@/store/useModalStore';
import React from 'react'

const Page = () => {
  const { onOpen } = useModalStore();
  return (
   <>
  {conversation.map((item, index) => (
       <div key={index} onClick={() => onOpen(item.id,"conversation")}  className="bg-list3 p-4 rounded-md">
        <h3 className="text-xl font-bold text-white2">
          {index+1}. {item.name}
          </h3>
       </div>

      ))}
   </>
  )
}

export default Page

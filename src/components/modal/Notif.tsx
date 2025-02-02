import { useModalStore } from '@/store/useModalStore';
import React from 'react'

const Notif = () => {
    const {onClose,message} =useModalStore()
  return (
    <div
    className="bg-white p-6 mx-auto rounded-lg w-fit shadow-lg text-center"
    onClick={(e) => e.stopPropagation()} 
  >
    <p className="text-2xl font-semibold text-gray-700">{message}</p>
    <button
      onClick={onClose}
      className="mt-4 px-8 text-white border-b-4 border-primary2 py-2 rounded-2xl bg-primary1"
    >
      Close
    </button>
  </div>
  )
}

export default Notif

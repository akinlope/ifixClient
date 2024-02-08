import React from 'react'
import { useRouter } from 'next/navigation'
// logo import
import Image from 'next/image'

export default function Logo() {
  const router = useRouter()
  return (
    <div>
        <Image 
        onClick={()=> {router.push("/"); console.log("clicked");}}
        className=''
        src={"/ifix_logo.png"}
        width={50}
        height={50}
        alt='ifix logo'
        />
    </div>
  )
}

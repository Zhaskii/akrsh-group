import React from 'react'
import Image from 'next/image'

const LoginLogo = () => {
  return (
    <>
      <Image
        src="/logo.jpg" 
        alt="Arksh Group Logo"
        width={180}
        height={60}
        priority
      />
    </>
  )
}

export default LoginLogo

import React from 'react'
import Image from 'next/image'

const Icon = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Image
        src="/icon-flexrr.png"
        alt="Flexrr Icon"
        width={24}
        height={24}
        style={{
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}

export default Icon

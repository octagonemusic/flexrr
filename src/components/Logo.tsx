import React from 'react'
import Image from 'next/image'

// Just use React.FC type instead
const Logo: React.FC = () => {
  return (
    <div style={{ padding: '6px 0', position: 'relative', width: '150px', height: '40px' }}>
      {/* Using Next/Image instead of img tag to fix the LCP warning */}
      <Image
        src="/logo-flexrr.png"
        alt="Flexrr Logo"
        fill
        style={{
          objectFit: 'contain',
          objectPosition: 'left',
        }}
        priority
      />
    </div>
  )
}

// Use a more specific type assertion to avoid 'any' warning
export default Logo as React.ComponentType<Record<string, unknown>>

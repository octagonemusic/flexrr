import React from 'react'
import './styles.css'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Hello World!</h1>
        <p className="text-xl text-white opacity-80">
          If you can see this styled properly, Tailwind CSS is working! 🎉
        </p>
      </div>
    </div>
  )
}

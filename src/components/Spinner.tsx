'use client'

import React from 'react'

interface SpinnerProps {
  size?: number
  color?: string
  className?: string
}

export default function Spinner({
  size = 70,
  color = '#3498db',
  className = '',
}: SpinnerProps) {
  return (
    <div
      className={`inline-block ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className="rounded-full border-4 border-current animate-spin"
        style={{
          width: size,
          height: size,
          borderColor: `${color}20`,
          borderTopColor: color,
          animationDuration: '0.8s',
        }}
      />
    </div>
  )
}

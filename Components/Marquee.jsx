'use client'

export default function Marquee({ children, speed = 30, reverse = false, className = '' }) {
  const direction = reverse ? 'reverse' : 'normal'
  
  return (
    <div className={`marquee-container overflow-hidden ${className}`}>
      <div
        className="marquee-track flex gap-8 whitespace-nowrap"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction,
        }}
      >
        {children}
        {children}
        {children}
      </div>
    </div>
  )
}

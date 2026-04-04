'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

// Subscribes to pointer: fine media query changes
const subscribePointerFine = (callback: () => void) => {
  const mq = window.matchMedia('(pointer: fine)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

const getPointerFineSnapshot = () => window.matchMedia('(pointer: fine)').matches
const getPointerFineServerSnapshot = () => false

export function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot
  )

  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef<number>(0)
  const isVisibleRef = useRef(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY }

    // Dot follows instantly
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }

    if (!isVisibleRef.current) {
      isVisibleRef.current = true
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    if (!isFinePointer) return

    const handleMouseEnter = () => {
      isVisibleRef.current = true
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      isVisibleRef.current = false
      setIsVisible(false)
    }

    // Detect hover on links and buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      setTimeout(() => setIsClicking(false), 150)
    }

    // Smooth ring animation with lerp via requestAnimationFrame
    const lerpFactor = 0.15
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isFinePointer, handleMouseMove])

  if (!isFinePointer) return null

  const dotSize = isHovering ? 16 : 8
  const ringSize = isHovering ? 56 : 36
  const clickTransform = isClicking ? 'scaleX(1.4) scaleY(0.6)' : ''

  return (
    <>
      {/* Dot - follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: 'var(--green)',
          transition: 'width 200ms ease, height 200ms ease, transform 100ms ease',
          transform: clickTransform || `translate(-100px, -100px) translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: isHovering ? 'difference' : 'normal',
          ...(clickTransform
            ? { transformOrigin: 'center center', transition: 'transform 100ms ease' }
            : {}),
        }}
      />

      {/* Ring - follows with lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          zIndex: 9999,
          width: ringSize,
          height: ringSize,
          border: '1.5px solid var(--green)',
          borderRadius: '50%',
          transition: 'width 250ms ease, height 250ms ease, opacity 250ms ease',
          transform: `translate(-100px, -100px) translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: isHovering ? 'difference' : 'normal',
        }}
      />
    </>
  )
}

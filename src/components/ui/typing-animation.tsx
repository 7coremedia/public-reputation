import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  className?: string
}

const phrases = [
  "Welcome",
  "Find a Business", 
  "Rate your experience",
  "Share your opinion",
  "Get a refund",
  "Get an apology", 
  "This is Transparency",
  "Public Opinions"
]

export function TypingAnimation({ className }: TypingAnimationProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    
    if (isTyping) {
      // Typing animation
      if (displayedText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, 100) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait 8 seconds then start erasing
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 8000)
        return () => clearTimeout(timeout)
      }
    } else {
      // Erasing animation
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 50) // Erasing speed (faster than typing)
        return () => clearTimeout(timeout)
      } else {
        // Finished erasing, move to next phrase
        setIsVisible(false)
        const timeout = setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          setIsTyping(true)
          setIsVisible(true)
        }, 300) // Brief pause between phrases
        return () => clearTimeout(timeout)
      }
    }
  }, [displayedText, isTyping, currentPhraseIndex])

  return (
    <h1 
      className={cn(
        "text-lg font-semibold text-foreground transition-opacity duration-300 ease-out min-h-[28px] flex items-center",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {displayedText}
      <span className="animate-pulse ml-1 text-primary">|</span>
    </h1>
  )
}
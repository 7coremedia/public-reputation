import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { Avatar3D } from "./avatar-3d"
import { TypingAnimation } from "./typing-animation"

interface MobileHeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  className?: string
  useTypingAnimation?: boolean
}

export function MobileHeader({
  title,
  showBack = false,
  onBack,
  className,
  useTypingAnimation = false
}: MobileHeaderProps) {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 bg-background border-b border-border sticky top-0 z-50",
      className
    )}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {useTypingAnimation ? (
          <TypingAnimation />
        ) : (
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        )}
      </div>
      
      <Avatar3D size={36} />
    </div>
  )
}
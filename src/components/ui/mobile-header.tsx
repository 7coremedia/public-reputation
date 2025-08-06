import { cn } from "@/lib/utils"
import { ArrowLeft, LogIn, LogOut } from "lucide-react"
import { Avatar3D } from "./avatar-3d"
import { TypingAnimation } from "./typing-animation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "./button"
import { useNavigate } from "react-router-dom"

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
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
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
      
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Avatar3D size={36} />
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/auth")}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
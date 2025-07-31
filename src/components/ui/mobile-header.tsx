import { cn } from "@/lib/utils"
import { ArrowLeft, Search, MoreVertical } from "lucide-react"

interface MobileHeaderProps {
  title: string
  showBack?: boolean
  showSearch?: boolean
  showMenu?: boolean
  onBack?: () => void
  onSearch?: () => void
  onMenu?: () => void
  className?: string
}

export function MobileHeader({
  title,
  showBack = false,
  showSearch = false,
  showMenu = false,
  onBack,
  onSearch,
  onMenu,
  className
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
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {showSearch && (
          <button 
            onClick={onSearch}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
        {showMenu && (
          <button 
            onClick={onMenu}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
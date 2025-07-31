import { cn } from "@/lib/utils"
import { TrustScore } from "./trust-score"
import { TrustBadge, TrustLevel } from "./trust-badge"
import { Star, MessageCircle } from "lucide-react"

interface BusinessCardProps {
  name: string
  category: string
  trustScore: number
  trustLevel: TrustLevel
  rating?: number
  reviewCount?: number
  image?: string
  isVerified?: boolean
  onClick?: () => void
  className?: string
}

export function BusinessCard({
  name,
  category,
  trustScore,
  trustLevel,
  rating,
  reviewCount,
  image,
  isVerified = false,
  onClick,
  className
}: BusinessCardProps) {
  return (
    <div 
      className={cn(
        "bg-card rounded-2xl p-4 card-shadow border border-card-border cursor-pointer transition-all hover:elevated-shadow",
        className
      )}
      onClick={onClick}
    >
      {/* Header with image and trust badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <span className="text-lg font-bold text-muted-foreground">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground text-sm leading-tight">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </div>
        <TrustBadge level={trustLevel} />
      </div>

      {/* Trust score and rating */}
      <div className="flex items-center justify-between">
        <TrustScore score={trustScore} size="sm" />
        
        {rating && reviewCount && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}/5</span>
            <span>•</span>
            <MessageCircle className="w-3 h-3" />
            <span>{reviewCount}</span>
          </div>
        )}
      </div>
    </div>
  )
}
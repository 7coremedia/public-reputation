import { cn } from "@/lib/utils"

interface TrustScoreProps {
  score: number // 0-100
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

function getTrustColor(score: number) {
  if (score >= 80) return "trust-excellent"
  if (score >= 60) return "trust-good" 
  if (score >= 40) return "trust-okay"
  if (score >= 20) return "trust-poor"
  return "trust-terrible"
}

function getTrustLabel(score: number) {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  if (score >= 40) return "Okay" 
  if (score >= 20) return "Poor"
  return "Terrible"
}

export function TrustScore({ score, size = "md", showLabel = true, className }: TrustScoreProps) {
  const trustColor = getTrustColor(score)
  const trustLabel = getTrustLabel(score)
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm", 
    lg: "w-16 h-16 text-lg"
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-full flex items-center justify-center font-bold",
        `bg-${trustColor} text-white`,
        sizeClasses[size]
      )}>
        {score}
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{score}/100</span>
          <span className={cn("text-xs", `text-${trustColor}`)}>{trustLabel}</span>
        </div>
      )}
    </div>
  )
}
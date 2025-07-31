import { cn } from "@/lib/utils"
import { CheckCircle, Clock, AlertTriangle, Flag } from "lucide-react"

export type TrustLevel = "verified" | "pending" | "under-review" | "flagged"

interface TrustBadgeProps {
  level: TrustLevel
  className?: string
}

const trustConfig = {
  verified: {
    icon: CheckCircle,
    label: "Verified",
    className: "bg-status-verified text-white"
  },
  pending: {
    icon: Clock,
    label: "Pending",
    className: "bg-status-pending text-white"
  },
  "under-review": {
    icon: AlertTriangle,
    label: "Under Review",
    className: "bg-status-under-review text-white"
  },
  flagged: {
    icon: Flag,
    label: "Flagged",
    className: "bg-status-flagged text-white"
  }
}

export function TrustBadge({ level, className }: TrustBadgeProps) {
  const config = trustConfig[level]
  const Icon = config.icon

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
      config.className,
      className
    )}>
      <Icon className="w-3 h-3" />
      {config.label}
    </div>
  )
}
import { CheckCircle, MessageCircle, Flag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Opinion {
  id: number
  type: string
  author: string
  content: string
  status: string
  daysAgo: number
  emoji: string
  priority?: string
  allowContact?: boolean
  resolution?: string
}

interface OpinionItemProps {
  opinion: Opinion
  onViewCase?: (opinion: Opinion) => void
  onRespond?: (opinion: Opinion) => void
  onFlag?: (opinion: Opinion) => void
  className?: string
}

export function OpinionItem({ 
  opinion, 
  onViewCase, 
  onRespond, 
  onFlag,
  className 
}: OpinionItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-status-verified text-white"
      case "pending": return "bg-status-pending text-white"
      case "public": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-white"
      case "medium": return "bg-status-pending text-white"
      case "low": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className={cn("p-4 rounded-2xl cursor-pointer transition-all", className)}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{opinion.emoji}</div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-medium text-sm">{opinion.author}</span>
            <span className="text-xs text-muted-foreground">
              {opinion.daysAgo} days ago
            </span>
            <Badge className={`text-xs ${getStatusColor(opinion.status)}`}>
              {opinion.status}
            </Badge>
            {opinion.priority && (
              <Badge className={`text-xs ${getPriorityColor(opinion.priority)}`}>
                {opinion.priority}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{opinion.content}</p>
          
          {opinion.resolution && (
            <div className="bg-muted/50 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-status-verified" />
                <span className="text-xs font-medium">Resolution</span>
              </div>
              <p className="text-xs text-muted-foreground">{opinion.resolution}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {opinion.allowContact && onRespond && (
              <Button variant="outline" size="sm" onClick={() => onRespond(opinion)}>
                <MessageCircle className="w-3 h-3 mr-1" />
                Respond
              </Button>
            )}
            {onViewCase && (
              <Button variant="outline" size="sm" onClick={() => onViewCase(opinion)}>
                <Eye className="w-3 h-3 mr-1" />
                View Case
              </Button>
            )}
            {onFlag && (
              <Button variant="outline" size="sm" onClick={() => onFlag(opinion)}>
                <Flag className="w-3 h-3 mr-1" />
                Flag
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
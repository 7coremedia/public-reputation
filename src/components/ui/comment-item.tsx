import { useState } from "react"
import { MessageCircle, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar: string
    badges: string[]
    isVerified: boolean
    isModerator: boolean
  }
  content: string
  timestamp: string
  reactions: { agree: number; disagree?: number; hmm: number; suspicious?: number; true: number; cap: number }
  replies: Comment[]
  isEdited: boolean
  isFlagged: boolean
}

interface CommentItemProps {
  comment: Comment
  onReact: (commentId: string, reaction: string) => void
  onReply: (commentId: string, content: string) => void
  onFlag: (commentId: string, reason: string) => void
  isReply?: boolean
}

const reactionEmojis = {
  agree: "👍",
  hmm: "🤔", 
  true: "✅",
  cap: "🧢"
}

const reactionLabels = {
  agree: "Agree",
  hmm: "Hmm",
  true: "True", 
  cap: "Cap"
}

export function CommentItem({ comment, onReact, onReply, onFlag, isReply = false }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [showFlagOptions, setShowFlagOptions] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [reactedReactions, setReactedReactions] = useState<Set<string>>(new Set())

  const handleReaction = (reaction: string) => {
    setReactedReactions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reaction)) {
        newSet.delete(reaction)
      } else {
        newSet.add(reaction)
      }
      return newSet
    })
    onReact(comment.id, reaction)
  }

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent)
      setReplyContent("")
      setShowReplyForm(false)
    }
  }

  const handleFlag = (reason: string) => {
    onFlag(comment.id, reason)
    setShowFlagOptions(false)
  }

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "verified":
        return { icon: "✓", color: "bg-green-500", text: "white" }
      case "top-helper":
        return { icon: "⭐", color: "bg-yellow-500", text: "white" }
      case "watchdog":
        return { icon: "👁", color: "bg-orange-500", text: "white" }
      default:
        return { icon: "", color: "bg-gray-500", text: "white" }
    }
  }

  return (
    <div className={cn("space-y-3", isReply && "ml-8 pl-4 border-l-2 border-muted")}>
      <div className="bg-card rounded-2xl p-4 border">
        <div className="flex items-start gap-3">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-medium text-sm truncate">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              {comment.author.badges.map((badge, index) => {
                const style = getBadgeStyle(badge)
                return (
                  <div
                    key={index}
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      style.color,
                      `text-${style.text}`
                    )}
                    title={badge}
                  >
                    {style.icon}
                  </div>
                )
              })}
            </div>
            
            <p className="text-sm mb-3 break-words">{comment.content}</p>
            
            {/* Reactions */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {Object.entries(comment.reactions).map(([reaction, count]) => (
                <button
                  key={reaction}
                  onClick={() => handleReaction(reaction)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all hover:scale-105",
                    reactedReactions.has(reaction)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  <span className="animate-pulse">{reactionEmojis[reaction as keyof typeof reactionEmojis]}</span>
                  <span>{count}</span>
                  <span className="hidden sm:inline ml-1">{reactionLabels[reaction as keyof typeof reactionLabels]}</span>
                </button>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                Reply
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowFlagOptions(!showFlagOptions)}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Flag className="w-3 h-3" />
                  Flag
                </button>
                
                {showFlagOptions && (
                  <div className="absolute top-6 left-0 bg-popover border rounded-lg shadow-lg z-10 min-w-32">
                    <button
                      onClick={() => handleFlag("spam")}
                      className="block w-full px-3 py-2 text-left text-xs hover:bg-muted rounded-t-lg"
                    >
                      Spam
                    </button>
                    <button
                      onClick={() => handleFlag("inappropriate")}
                      className="block w-full px-3 py-2 text-left text-xs hover:bg-muted"
                    >
                      Inappropriate
                    </button>
                    <button
                      onClick={() => handleFlag("misinformation")}
                      className="block w-full px-3 py-2 text-left text-xs hover:bg-muted rounded-b-lg"
                    >
                      Misinformation
                    </button>
                  </div>
                )}
              </div>
              
              {comment.replies.length > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  <span className="flex items-center gap-1">
                    Replies
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
                      {comment.replies.length}
                    </div>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 ml-11">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="mb-2 text-sm"
              rows={2}
            />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleReplySubmit} disabled={!replyContent.trim()}>
                Reply
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowReplyForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Replies */}
      {showReplies && comment.replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onReact={onReact}
          onReply={onReply}
          onFlag={onFlag}
          isReply={true}
        />
      ))}
    </div>
  )
}
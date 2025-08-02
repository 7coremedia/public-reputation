import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Heart, Flag, MoreVertical, Send, User, Shield, Star, TrendingUp } from "lucide-react"

interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar?: string
    badges: string[]
    isVerified: boolean
    isModerator: boolean
  }
  content: string
  timestamp: string
  reactions: {
    agree: number
    disagree: number
    suspicious: number
    true: number
    cap: number
  }
  replies: Comment[]
  isEdited: boolean
  isFlagged: boolean
}

interface CommentSectionProps {
  opinionId: string
  comments: Comment[]
  onAddComment: (content: string) => void
  onReact: (commentId: string, reaction: string) => void
  onReply: (commentId: string, content: string) => void
  onFlag: (commentId: string) => void
  className?: string
}

export function CommentSection({
  opinionId,
  comments,
  onAddComment,
  onReact,
  onReply,
  onFlag,
  className
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment("")
    }
  }

  const handleSubmitReply = () => {
    if (replyingTo && replyContent.trim()) {
      onReply(replyingTo, replyContent)
      setReplyingTo(null)
      setReplyContent("")
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "moderator": return "bg-status-verified text-white"
      case "verified": return "bg-status-verified text-white"
      case "top-helper": return "bg-yellow-500 text-white"
      case "watchdog": return "bg-orange-500 text-white"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "moderator": return <Shield className="w-3 h-3" />
      case "verified": return <User className="w-3 h-3" />
      case "top-helper": return <Star className="w-3 h-3" />
      case "watchdog": return <TrendingUp className="w-3 h-3" />
      default: return null
    }
  }

  return (
    <div className={className}>
      {/* Comment Input */}
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>🔥 Agree</span>
                <span>🤔 Suspicious</span>
                <span>👌 True</span>
                <span>🥟 Cap</span>
              </div>
              <Button 
                size="sm" 
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReact={onReact}
            onReply={onReply}
            onFlag={onFlag}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            onSubmitReply={handleSubmitReply}
            getBadgeColor={getBadgeColor}
            getBadgeIcon={getBadgeIcon}
          />
        ))}
      </div>
    </div>
  )
}

interface CommentItemProps {
  comment: Comment
  onReact: (commentId: string, reaction: string) => void
  onReply: (commentId: string, content: string) => void
  onFlag: (commentId: string) => void
  replyingTo: string | null
  setReplyingTo: (commentId: string | null) => void
  replyContent: string
  setReplyContent: (content: string) => void
  onSubmitReply: () => void
  getBadgeColor: (badge: string) => string
  getBadgeIcon: (badge: string) => React.ReactNode
}

function CommentItem({
  comment,
  onReact,
  onReply,
  onFlag,
  replyingTo,
  setReplyingTo,
  replyContent,
  setReplyContent,
  onSubmitReply,
  getBadgeColor,
  getBadgeIcon
}: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(false)

  return (
    <Card className="p-4 rounded-2xl">
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          {/* Comment Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm">{comment.author.name}</span>
            {comment.author.isVerified && (
              <User className="w-3 h-3 text-status-verified" />
            )}
            {comment.author.badges.map((badge, index) => (
              <Badge key={index} className={`text-xs ${getBadgeColor(badge)}`}>
                {getBadgeIcon(badge)}
                <span className="ml-1">{badge.replace("-", " ")}</span>
              </Badge>
            ))}
            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            {comment.isEdited && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
            <Button variant="ghost" size="sm" className="ml-auto">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </div>

          {/* Comment Content */}
          <p className="text-sm text-muted-foreground mb-3">{comment.content}</p>

          {/* Reactions */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReact(comment.id, "agree")}
              className="h-6 px-2"
            >
              <span>🔥</span>
              <span className="ml-1">{comment.reactions.agree}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReact(comment.id, "disagree")}
              className="h-6 px-2"
            >
              <span>👎</span>
              <span className="ml-1">{comment.reactions.disagree}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReact(comment.id, "suspicious")}
              className="h-6 px-2"
            >
              <span>🤔</span>
              <span className="ml-1">{comment.reactions.suspicious}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReact(comment.id, "true")}
              className="h-6 px-2"
            >
              <span>👌</span>
              <span className="ml-1">{comment.reactions.true}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReact(comment.id, "cap")}
              className="h-6 px-2"
            >
              <span>🥟</span>
              <span className="ml-1">{comment.reactions.cap}</span>
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="h-6 px-2"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Reply
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFlag(comment.id)}
              className="h-6 px-2"
            >
              <Flag className="w-3 h-3 mr-1" />
              Flag
            </Button>
            {comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplies(!showReplies)}
                className="h-6 px-2"
              >
                {showReplies ? "Hide" : "Show"} {comment.replies.length} replies
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>🔥 Agree</span>
                      <span>🤔 Suspicious</span>
                      <span>👌 True</span>
                      <span>🥟 Cap</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={onSubmitReply}
                        disabled={!replyContent.trim()}
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Replies */}
          {showReplies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3 pl-4 border-l-2 border-muted">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={reply.author.avatar} />
                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-xs">{reply.author.name}</span>
                      {reply.author.isVerified && (
                        <User className="w-2 h-2 text-status-verified" />
                      )}
                      {reply.author.badges.map((badge, index) => (
                        <Badge key={index} className={`text-xs ${getBadgeColor(badge)}`}>
                          {getBadgeIcon(badge)}
                        </Badge>
                      ))}
                      <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{reply.content}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onReact(reply.id, "agree")}
                        className="h-4 px-1"
                      >
                        <span>🔥</span>
                        <span className="ml-1">{reply.reactions.agree}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFlag(reply.id)}
                        className="h-4 px-1"
                      >
                        <Flag className="w-2 h-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 
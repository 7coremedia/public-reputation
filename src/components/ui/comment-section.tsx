import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CommentItem, Comment } from "@/components/ui/comment-item"

export interface CommentSectionProps {
  opinionId: string
  comments: Comment[]
  onAddComment: (content: string) => void
  onReact: (commentId: string, reaction: string) => void
  onReply: (commentId: string, content: string) => void
  onFlag: (commentId: string, reason?: string) => void
}

export function CommentSection({ 
  opinionId, 
  comments, 
  onAddComment, 
  onReact, 
  onReply, 
  onFlag 
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment("")
    }
  }

  return (
    <div className="space-y-4">
      {/* Add new comment */}
      <div className="space-y-3">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="resize-none text-sm"
          rows={3}
        />
        <Button 
          onClick={handleSubmitComment}
          disabled={!newComment.trim()}
          className="w-full rounded-xl"
        >
          Post Comment
        </Button>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReact={onReact}
            onReply={onReply}
            onFlag={onFlag}
          />
        ))}
      </div>
    </div>
  )
}

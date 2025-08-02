import { ArrowLeft, AlertTriangle, Clock, CheckCircle, XCircle, MessageCircle, ThumbsUp, ThumbsDown, Flag, FileText, Camera, Send, MoreVertical, Eye, EyeOff, Calendar, MapPin, User, Shield, DollarSign, Package, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

// Enhanced mock appeal data with trust system features
const mockAppeals = [
  {
    id: "APPEAL-001",
    businessName: "Reflection Beauty Clinic",
    businessId: "biz-123",
    customerName: "Sarah M.",
    title: "Rushed Treatment - Requesting Full Refund",
    description: "I paid ₦25,000 for a full facial treatment but the staff rushed through it in 15 minutes. The treatment was supposed to take 1 hour. I want a full refund and compensation for the wasted time.",
    type: "refund",
    amount: 25000,
    currency: "NGN",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-15T10:30:00Z",
    deadline: "2024-01-20T10:30:00Z",
    daysLeft: 3,
    // Community reactions
    reactions: {
      agree: 45,
      disagree: 8,
      suspicious: 3,
      true: 32,
      cap: 2
    },
    comments: 12,
    // Business response
    businessResponse: "We acknowledge the issue and are reviewing the case. We will respond within the deadline.",
    businessResponseTime: "2024-01-16T14:20:00Z",
    // Proof attachments
    attachments: [
      { id: 1, name: "receipt.jpg", type: "image", url: "/placeholder.svg" },
      { id: 2, name: "chat_screenshot.png", type: "image", url: "/placeholder.svg" },
      { id: 3, name: "appointment_confirmation.pdf", type: "document", url: "/placeholder.svg" }
    ],
    // Timeline
    timeline: [
      {
        id: 1,
        action: "Appeal Submitted",
        description: "Public appeal filed for refund",
        timestamp: "2024-01-15T10:30:00Z",
        completed: true
      },
      {
        id: 2,
        action: "Business Notified",
        description: "Business has been notified of the appeal",
        timestamp: "2024-01-15T11:00:00Z",
        completed: true
      },
      {
        id: 3,
        action: "Business Response",
        description: "Business acknowledged the appeal",
        timestamp: "2024-01-16T14:20:00Z",
        completed: true
      },
      {
        id: 4,
        action: "Resolution Deadline",
        description: "Business must respond by deadline",
        timestamp: "2024-01-20T10:30:00Z",
        completed: false
      }
    ],
    category: "Service Quality",
    location: "Victoria Island, Lagos",
    originalComplaint: "CASE-001"
  },
  {
    id: "APPEAL-002",
    businessName: "Mary's Kitchen & Catering",
    businessId: "biz-456",
    customerName: "John D.",
    title: "Food Poisoning - Medical Compensation",
    description: "Several people got sick after eating food from Mary's Kitchen. Medical bills totaled ₦150,000. Seeking full compensation for medical expenses and damages.",
    type: "compensation",
    amount: 150000,
    currency: "NGN",
    status: "escalated",
    priority: "high",
    createdAt: "2024-01-18T16:45:00Z",
    deadline: "2024-01-23T16:45:00Z",
    daysLeft: 1,
    reactions: {
      agree: 89,
      disagree: 5,
      suspicious: 2,
      true: 67,
      cap: 1
    },
    comments: 23,
    businessResponse: null,
    businessResponseTime: null,
    attachments: [
      { id: 1, name: "medical_report.pdf", type: "document", url: "/placeholder.svg" },
      { id: 2, name: "food_photos.jpg", type: "image", url: "/placeholder.svg" },
      { id: 3, name: "hospital_bills.pdf", type: "document", url: "/placeholder.svg" }
    ],
    timeline: [
      {
        id: 1,
        action: "Appeal Submitted",
        description: "Public appeal filed for compensation",
        timestamp: "2024-01-18T16:45:00Z",
        completed: true
      },
      {
        id: 2,
        action: "Business Notified",
        description: "Business has been notified of the appeal",
        timestamp: "2024-01-18T17:00:00Z",
        completed: true
      },
      {
        id: 3,
        action: "No Response",
        description: "Business has not responded within 48 hours",
        timestamp: "2024-01-20T16:45:00Z",
        completed: true
      },
      {
        id: 4,
        action: "Escalated",
        description: "Case escalated due to no response",
        timestamp: "2024-01-20T16:45:00Z",
        completed: true
      }
    ],
    category: "Food Safety",
    location: "Ikeja, Lagos",
    originalComplaint: "CASE-002"
  }
]

export default function RefundAppeal() {
  const navigate = useNavigate()
  const [selectedAppeal, setSelectedAppeal] = useState(mockAppeals[0])
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [viewMode, setViewMode] = useState<"public" | "private">("public")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-status-verified text-white"
      case "pending": return "bg-status-pending text-white"
      case "escalated": return "bg-destructive text-white"
      case "expired": return "bg-muted text-muted-foreground"
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

  const getDeadlineColor = (daysLeft: number) => {
    if (daysLeft <= 1) return "text-destructive"
    if (daysLeft <= 3) return "text-status-pending"
    return "text-muted-foreground"
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-background z-50">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Public Appeals</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={viewMode === "public" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setViewMode("public")}
            >
              <Eye className="w-4 h-4 mr-2" />
              Public
            </Button>
            <Button
              variant={viewMode === "private" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setViewMode("private")}
            >
              <EyeOff className="w-4 h-4 mr-2" />
              Private
            </Button>
          </div>
        </div>

        {/* Submit New Appeal Button */}
        <div className="px-4 mb-4">
          <Button 
            className="w-full h-12 bg-primary hover:bg-primary/90"
            onClick={() => setShowSubmitForm(true)}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            File New Public Appeal
          </Button>
        </div>

        {/* Appeals List */}
        <div className="px-4 space-y-4">
          {mockAppeals.map((appeal) => (
            <Card 
              key={appeal.id} 
              className={`p-4 rounded-2xl cursor-pointer transition-all ${
                selectedAppeal.id === appeal.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedAppeal(appeal)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{appeal.title}</h3>
                    <Badge className={`text-xs ${getPriorityColor(appeal.priority)}`}>
                      {appeal.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{appeal.businessName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(appeal.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{appeal.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`text-xs ${getStatusColor(appeal.status)}`}>
                    {appeal.status}
                  </Badge>
                  <div className={`text-xs mt-1 ${getDeadlineColor(appeal.daysLeft)}`}>
                    {appeal.daysLeft} days left
                  </div>
                </div>
              </div>

              {/* Amount and Type */}
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-sm">
                  {formatCurrency(appeal.amount, appeal.currency)}
                </span>
                <Badge variant="outline" className="text-xs">
                  {appeal.type}
                </Badge>
              </div>

              {/* Community Reactions */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{appeal.reactions.agree}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="w-3 h-3" />
                  <span>{appeal.reactions.disagree}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🤔 {appeal.reactions.suspicious}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>👌 {appeal.reactions.true}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{appeal.comments}</span>
                </div>
              </div>

              {/* Business Response Status */}
              <div className="flex items-center gap-2">
                {appeal.businessResponse ? (
                  <div className="flex items-center gap-1 text-xs text-status-verified">
                    <CheckCircle className="w-3 h-3" />
                    <span>Business responded</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-status-pending">
                    <Clock className="w-3 h-3" />
                    <span>Awaiting response</span>
                  </div>
                )}
                {appeal.status === "escalated" && (
                  <div className="flex items-center gap-1 text-xs text-destructive">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Escalated</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Appeal Details Modal */}
        {selectedAppeal && (
          <div className="fixed inset-0 bg-background z-50">
            <div className="mobile-container h-full flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => setSelectedAppeal(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-semibold">Appeal Details</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Appeal Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Appeal Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{selectedAppeal.title}</h3>
                    <Badge className={`text-xs ${getPriorityColor(selectedAppeal.priority)}`}>
                      {selectedAppeal.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{selectedAppeal.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Appeal ID: {selectedAppeal.id}</span>
                    <span>Category: {selectedAppeal.category}</span>
                  </div>
                </div>

                {/* Amount and Deadline */}
                <Card className="p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Requested Amount</h4>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(selectedAppeal.amount, selectedAppeal.currency)}
                      </p>
                    </div>
                    <div className="text-right">
                      <h4 className="font-medium">Deadline</h4>
                      <p className={`text-lg font-bold ${getDeadlineColor(selectedAppeal.daysLeft)}`}>
                        {selectedAppeal.daysLeft} days left
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(selectedAppeal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={((5 - selectedAppeal.daysLeft) / 5) * 100} 
                    className="h-2"
                  />
                </Card>

                {/* Timeline */}
                <div>
                  <h4 className="font-medium mb-3">Appeal Timeline</h4>
                  <div className="space-y-4">
                    {selectedAppeal.timeline.map((step, index) => (
                      <div key={step.id} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-status-verified text-white" : "bg-muted"
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-sm">{step.action}</h5>
                            {step.completed && (
                              <Badge className="text-xs bg-status-verified text-white">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{step.description}</p>
                          {step.timestamp && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(step.timestamp).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Response */}
                {selectedAppeal.businessResponse && (
                  <div>
                    <h4 className="font-medium mb-3">Business Response</h4>
                    <Card className="p-4 rounded-xl bg-muted/30">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <p className="text-sm">{selectedAppeal.businessResponse}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(selectedAppeal.businessResponseTime!).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Attachments */}
                {selectedAppeal.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Proof Attachments</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedAppeal.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs truncate">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Community Reactions */}
                <div>
                  <h4 className="font-medium mb-3">Community Reactions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">Agree</span>
                      <span className="font-medium">{selectedAppeal.reactions.agree}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">Disagree</span>
                      <span className="font-medium">{selectedAppeal.reactions.disagree}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">🤔 Suspicious</span>
                      <span className="font-medium">{selectedAppeal.reactions.suspicious}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">👌 True</span>
                      <span className="font-medium">{selectedAppeal.reactions.true}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <h4 className="font-medium">Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12">
                      <Heart className="w-4 h-4 mr-2" />
                      Support Appeal
                    </Button>
                    <Button variant="outline" className="h-12">
                      <Flag className="w-4 h-4 mr-2" />
                      Report Issue
                    </Button>
                  </div>
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/tracker")}
                  >
                    View Original Case
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Appeal Form Modal */}
        {showSubmitForm && (
          <div className="fixed inset-0 bg-background z-50">
            <div className="mobile-container h-full flex flex-col">
              {/* Form Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => setShowSubmitForm(false)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-semibold">File Public Appeal</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Appeal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Business</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="biz-123">Reflection Beauty Clinic</SelectItem>
                          <SelectItem value="biz-456">Mary's Kitchen & Catering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Appeal Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="refund">Refund</SelectItem>
                          <SelectItem value="compensation">Compensation</SelectItem>
                          <SelectItem value="exchange">Exchange</SelectItem>
                          <SelectItem value="apology">Apology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount (NGN)</label>
                      <Input type="number" placeholder="Enter amount" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Title</label>
                      <Input placeholder="Brief title for your appeal" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea 
                        placeholder="Describe what happened and why you're filing this appeal..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Attach Proof</label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Document
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  onClick={() => setShowSubmitForm(false)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Public Appeal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
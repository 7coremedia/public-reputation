import { ArrowLeft, CheckCircle, Clock, AlertTriangle, MessageCircle, Phone, Mail, FileText, Camera, Send, MoreVertical, Eye, EyeOff, Calendar, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

// Enhanced mock case data with trust system features
const mockCases = [
  {
    id: "CASE-001",
    businessName: "Reflection Beauty Clinic",
    businessId: "biz-123",
    type: "complaint",
    title: "Poor service delivery - rushed treatment",
    description: "I paid for a full facial treatment but the staff rushed through it in 15 minutes. Very unprofessional and disappointing experience.",
    status: "in-talks",
    priority: "medium",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-17T14:20:00Z",
    timeline: [
      {
        id: 1,
        status: "submitted",
        title: "Case Submitted",
        description: "Your complaint has been submitted and is under review",
        timestamp: "2024-01-15T10:30:00Z",
        completed: true
      },
      {
        id: 2,
        status: "contacted",
        title: "Business Contacted",
        description: "We've reached out to Reflection Beauty Clinic about your case",
        timestamp: "2024-01-16T09:15:00Z",
        completed: true
      },
      {
        id: 3,
        status: "in-talks",
        title: "In Discussion",
        description: "Business has responded and is working on a resolution",
        timestamp: "2024-01-17T14:20:00Z",
        completed: true
      },
      {
        id: 4,
        status: "resolved",
        title: "Resolution Offered",
        description: "Business has offered a full refund and free treatment",
        timestamp: null,
        completed: false
      }
    ],
    businessResponse: "We apologize for the rushed service. We've identified the issue and will offer a full refund plus a complimentary treatment.",
    resolution: null,
    allowContact: true,
    isPublic: true,
    attachments: [
      { id: 1, name: "receipt.jpg", type: "image", url: "/placeholder.svg" },
      { id: 2, name: "chat_screenshot.png", type: "image", url: "/placeholder.svg" }
    ],
    estimatedResolution: "2024-01-20",
    category: "Service Quality",
    location: "Victoria Island, Lagos"
  },
  {
    id: "CASE-002", 
    businessName: "Mary's Kitchen & Catering",
    businessId: "biz-456",
    type: "complaint",
    title: "Food poisoning from catering service",
    description: "Several people got sick after eating food from Mary's Kitchen. Need immediate attention and compensation.",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
    timeline: [
      {
        id: 1,
        status: "submitted",
        title: "Case Submitted",
        description: "Your complaint has been submitted and is under review",
        timestamp: "2024-01-18T16:45:00Z",
        completed: true
      },
      {
        id: 2,
        status: "contacted",
        title: "Business Contacted",
        description: "We've reached out to Mary's Kitchen about your case",
        timestamp: null,
        completed: false
      }
    ],
    businessResponse: null,
    resolution: null,
    allowContact: false,
    isPublic: true,
    attachments: [
      { id: 1, name: "medical_report.pdf", type: "document", url: "/placeholder.svg" },
      { id: 2, name: "food_photos.jpg", type: "image", url: "/placeholder.svg" }
    ],
    estimatedResolution: "2024-01-25",
    category: "Food Safety",
    location: "Ikeja, Lagos"
  }
]

export default function ResolutionTracker() {
  const navigate = useNavigate()
  const [selectedCase, setSelectedCase] = useState(mockCases[0])
  const [newMessage, setNewMessage] = useState("")
  const [viewMode, setViewMode] = useState<"public" | "private">("public")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-status-verified text-white"
      case "in-talks": return "bg-status-pending text-white"
      case "contacted": return "bg-status-pending text-white"
      case "pending": return "bg-muted text-muted-foreground"
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

  const getProgressPercentage = (timeline: any[]) => {
    const completedSteps = timeline.filter(step => step.completed).length
    return (completedSteps / timeline.length) * 100
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-background z-50">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Case Tracker</h1>
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

        {/* Cases List */}
        <div className="px-4 space-y-4">
          {mockCases.map((caseItem) => (
            <Card 
              key={caseItem.id} 
              className={`p-4 rounded-2xl cursor-pointer transition-all ${
                selectedCase.id === caseItem.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedCase(caseItem)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{caseItem.title}</h3>
                    <Badge className={`text-xs ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{caseItem.businessName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(caseItem.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{caseItem.location}</span>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(caseItem.status)}`}>
                  {caseItem.status.replace("-", " ")}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{Math.round(getProgressPercentage(caseItem.timeline))}%</span>
                </div>
                <Progress value={getProgressPercentage(caseItem.timeline)} className="h-2" />
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Chat
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  Details
                </Button>
                {caseItem.allowContact && (
                  <Button variant="outline" size="sm" className="text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Case Details Modal */}
        {selectedCase && (
          <div className="fixed inset-0 bg-background z-50">
            <div className="mobile-container h-full flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => setSelectedCase(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-semibold">Case Details</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Case Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Case Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{selectedCase.title}</h3>
                    <Badge className={`text-xs ${getPriorityColor(selectedCase.priority)}`}>
                      {selectedCase.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{selectedCase.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Case ID: {selectedCase.id}</span>
                    <span>Category: {selectedCase.category}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-medium mb-3">Case Timeline</h4>
                  <div className="space-y-4">
                    {selectedCase.timeline.map((step, index) => (
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
                            <h5 className="font-medium text-sm">{step.title}</h5>
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
                {selectedCase.businessResponse && (
                  <div>
                    <h4 className="font-medium mb-3">Business Response</h4>
                    <Card className="p-4 rounded-xl bg-muted/30">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <p className="text-sm">{selectedCase.businessResponse}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(selectedCase.updatedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Attachments */}
                {selectedCase.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Attachments</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCase.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs truncate">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Section */}
                {selectedCase.allowContact && (
                  <div>
                    <h4 className="font-medium mb-3">Direct Communication</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Start Chat
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Business
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resolution Actions */}
                <div className="space-y-3">
                  <h4 className="font-medium">Resolution Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Resolution
                    </Button>
                    <Button variant="outline" className="h-12">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Escalate Case
                    </Button>
                  </div>
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/appeals")}
                  >
                    File Public Appeal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
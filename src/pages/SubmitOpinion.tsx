import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MobileHeader } from "@/components/ui/mobile-header"
import { SearchBar } from "@/components/search-bar"
import { 
  Upload, 
  Camera, 
  Image, 
  MessageSquare, 
  ThumbsUp, 
  AlertTriangle,
  Lightbulb,
  X,
  Check
} from "lucide-react"

// Mock business data for search
const mockBusinesses = [
  { id: 1, name: "Reflection Beauty Clinic", category: "Beauty & Health" },
  { id: 2, name: "Mary's Kitchen & Catering", category: "Food & Restaurant" },
  { id: 3, name: "72 Wears", category: "Fashion Vendors" },
  { id: 4, name: "QuickMart Express", category: "POS Agents" },
]

const opinionTypes = [
  { id: "complaint", label: "Complaint", icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50" },
  { id: "praise", label: "Praise", icon: ThumbsUp, color: "text-green-600", bgColor: "bg-green-50" },
  { id: "suggestion", label: "Suggestion", icon: Lightbulb, color: "text-blue-600", bgColor: "bg-blue-50" },
]

const ratingEmojis = [
  { emoji: "😡", label: "Horrible", value: 1 },
  { emoji: "😞", label: "Disappointing", value: 2 },
  { emoji: "😐", label: "Mid", value: 3 },
  { emoji: "🙂", label: "Okay", value: 4 },
  { emoji: "😃", label: "Good", value: 5 },
  { emoji: "🤩", label: "Excellent", value: 6 },
]

export default function SubmitOpinion() {
  const [step, setStep] = useState<"business" | "type" | "details" | "proof" | "rating" | "final">("business")
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [opinionType, setOpinionType] = useState<string>("")
  const [story, setStory] = useState("")
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [allowContact, setAllowContact] = useState(false)
  const [remainAnonymous, setRemainAnonymous] = useState(false)
  const [resolvePrivately, setResolvePrivately] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const filteredBusinesses = mockBusinesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Submitting opinion:", {
      business: selectedBusiness,
      type: opinionType,
      story,
      rating: selectedRating,
      allowContact,
      remainAnonymous,
      resolvePrivately,
      files: uploadedFiles
    })
  }

  const renderBusinessSelection = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="expressive-heading">Select Business</h2>
        <p className="text-muted-foreground">Search for the business you want to review</p>
      </div>

      <SearchBar 
        placeholder="Enter business name..."
        onSearch={setSearchQuery}
      />

      <div className="space-y-3">
        {filteredBusinesses.map((business) => (
          <Card 
            key={business.id}
            className={`cursor-pointer transition-all ${
              selectedBusiness?.id === business.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedBusiness(business)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{business.name}</h3>
                  <p className="text-sm text-muted-foreground">{business.category}</p>
                </div>
                {selectedBusiness?.id === business.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBusinesses.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Business not found?</p>
          <Button variant="outline" onClick={() => console.log("Add new business")}>
            Add this business
          </Button>
        </div>
      )}
    </div>
  )

  const renderTypeSelection = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="expressive-heading">What type of opinion?</h2>
        <p className="text-muted-foreground">Choose the type of feedback you want to share</p>
      </div>

      <div className="space-y-3">
        {opinionTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all ${
                opinionType === type.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setOpinionType(type.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.bgColor}`}>
                    <Icon className={`w-5 h-5 ${type.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.id === "complaint" && "Report an issue or bad experience"}
                      {type.id === "praise" && "Share a positive experience"}
                      {type.id === "suggestion" && "Suggest improvements"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderDetailsForm = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="expressive-heading">Tell your story</h2>
        <p className="text-muted-foreground">Share your experience (140-280 characters)</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Your story</label>
          <Textarea 
            placeholder="Describe what happened..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            maxLength={280}
            className="min-h-[120px]"
          />
          <div className="text-right mt-1">
            <span className="text-xs text-muted-foreground">
              {story.length}/280
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="allowContact"
              checked={allowContact}
              onChange={(e) => setAllowContact(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="allowContact" className="text-sm">
              Allow business to contact me
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="anonymous"
              checked={remainAnonymous}
              onChange={(e) => setRemainAnonymous(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="anonymous" className="text-sm">
              Remain anonymous
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="private"
              checked={resolvePrivately}
              onChange={(e) => setResolvePrivately(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="private" className="text-sm">
              Try to resolve privately first
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProofUpload = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="expressive-heading">Add proof (optional)</h2>
        <p className="text-muted-foreground">Upload receipts, screenshots, or photos</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <Camera className="w-6 h-6" />
            <span className="text-sm">Take Photo</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <Image className="w-6 h-6" />
            <span className="text-sm">Upload Image</span>
          </Button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop files here, or click to browse
          </p>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" size="sm">Choose Files</Button>
          </label>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Uploaded files:</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{file.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderRating = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="expressive-heading">Rate your experience</h2>
        <p className="text-muted-foreground">Choose the emoji that best represents your experience</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {ratingEmojis.map((rating) => (
          <Card 
            key={rating.value}
            className={`cursor-pointer transition-all text-center ${
              selectedRating === rating.value 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedRating(rating.value)}
          >
            <CardContent className="p-4">
              <div className="text-3xl mb-2">{rating.emoji}</div>
              <p className="text-sm font-medium">{rating.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderFinalReview = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="expressive-heading">Review your opinion</h2>
        <p className="text-muted-foreground">Make sure everything looks correct</p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <h4 className="font-medium">Business</h4>
            <p className="text-sm text-muted-foreground">{selectedBusiness?.name}</p>
          </div>
          
          <div>
            <h4 className="font-medium">Type</h4>
            <Badge variant="outline">
              {opinionTypes.find(t => t.id === opinionType)?.label}
            </Badge>
          </div>
          
          <div>
            <h4 className="font-medium">Story</h4>
            <p className="text-sm text-muted-foreground">{story}</p>
          </div>
          
          <div>
            <h4 className="font-medium">Rating</h4>
            <div className="text-2xl">
              {ratingEmojis.find(r => r.value === selectedRating)?.emoji}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit}
        className="w-full h-12 text-lg font-semibold"
      >
        Submit Opinion
      </Button>
    </div>
  )

  const getStepContent = () => {
    switch (step) {
      case "business": return renderBusinessSelection()
      case "type": return renderTypeSelection()
      case "details": return renderDetailsForm()
      case "proof": return renderProofUpload()
      case "rating": return renderRating()
      case "final": return renderFinalReview()
      default: return null
    }
  }

  const canProceed = () => {
    switch (step) {
      case "business": return selectedBusiness
      case "type": return opinionType
      case "details": return story.length >= 10
      case "proof": return true // Optional step
      case "rating": return selectedRating !== null
      case "final": return true
      default: return false
    }
  }

  const handleNext = () => {
    if (step === "final") {
      handleSubmit()
      return
    }
    
    const steps = ["business", "type", "details", "proof", "rating", "final"]
    const currentIndex = steps.indexOf(step)
    setStep(steps[currentIndex + 1] as any)
  }

  const handleBack = () => {
    const steps = ["business", "type", "details", "proof", "rating", "final"]
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1] as any)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="centered-container">
        <MobileHeader 
          title="Submit Opinion"
          showBack={true}
          showSearch={false}
          showMenu={false}
          onBack={() => {
            const steps = ["business", "type", "details", "proof", "rating", "final"]
            const currentIndex = steps.indexOf(step)
            if (currentIndex > 0) {
              setStep(steps[currentIndex - 1] as any)
            }
          }}
        />

        <div className="flex-1 px-4 py-6 space-y-6">
          {/* Progress indicator - centered */}
          <div className="progress-container">
            <div className="flex items-center gap-2">
              {["business", "type", "details", "proof", "rating", "final"].map((stepName, index) => (
                <div key={stepName} className="progress-step flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    ["business", "type", "details", "proof", "rating", "final"].indexOf(step) >= index 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 5 && (
                    <div className={`w-8 h-1 mx-1 ${
                      ["business", "type", "details", "proof", "rating", "final"].indexOf(step) > index ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          {getStepContent()}

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            {step !== "business" && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1"
            >
              {step === "final" ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 
// src/pages/SubmitOpinion.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import useOpinions from "@/hooks/useOpinions";
import { useBusinesses } from "@/hooks/useBusinesses";

const opinionTypes = [
  { id: "complaint", label: "Complaint", description: "Report an issue" },
  { id: "praise", label: "Praise", description: "Share a positive experience" },
  { id: "suggestion", label: "Suggestion", description: "Suggest improvements" },
];

const ratingEmojis = [
  { value: 1, emoji: "😠" },
  { value: 2, emoji: "😞" },
  { value: 3, emoji: "😐" },
  { value: 4, emoji: "😊" },
  { value: 5, emoji: "🤩" },
];

export default function SubmitOpinion() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState("");
  const { opinions, createOpinion } = useOpinions();
  const { businesses, createBusiness } = useBusinesses();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to submit an opinion.");
      navigate("/auth");
      return;
    }

    if (!selectedType || !title || !content || !selectedRating || !businessName) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Find existing business by name (case-insensitive)
      let target = businesses.find(
        (b) => b.name.trim().toLowerCase() === businessName.trim().toLowerCase()
      );
      if (!target) {
        // Create a minimal business locally
        target = await createBusiness({
          name: businessName.trim(),
          category: "Uncategorized",
          description: undefined,
          image_url: "/placeholder.svg",
          website: undefined,
          phone: undefined,
          email: undefined,
          address: undefined,
          city: undefined,
          state: undefined,
          zip_code: undefined,
          latitude: undefined,
          longitude: undefined,
          is_verified: false,
          is_claimed: false,
          claimed_by: undefined,
        });
      }

      // Create the opinion locally
      createOpinion({
        user_id: user.id,
        business_id: target.id,
        type: selectedType as 'complaint' | 'praise' | 'suggestion',
        title,
        content,
        rating: selectedRating,
        status: "pending",
        is_anonymous: false,
        profile: { full_name: user.full_name || undefined },
      });

      toast.success("Opinion submitted successfully!");
      navigate("/business-discovery"); // Redirect to business discovery or relevant page
    } catch (error) {
      console.error("Error submitting opinion:", error);
      toast.error("Failed to submit opinion. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Submit Your Opinion</h1>

      <div className="space-y-6">
        {/* Business Name Input */}
        <div>
          <Label htmlFor="businessName" className="mb-2 block text-lg font-medium">
            Business Name
          </Label>
          <Input
            id="businessName"
            placeholder="e.g., Coffee House Co."
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Opinion Type Selection */}
        <div>
          <Label className="mb-3 block text-lg font-medium">
            What kind of opinion is this?
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opinionTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedType === type.id
                    ? "border-2 border-green-500 shadow-md"
                    : "border border-gray-200"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardContent className="flex items-center space-x-4 p-4"> {/* Increased padding on the left to fix highlight issue */}
                  <div>
                    <h3 className="font-semibold">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Opinion Details */}
        <div>
          <Label htmlFor="title" className="mb-2 block text-lg font-medium">
            Title
          </Label>
          <Input
            id="title"
            placeholder="A concise summary of your opinion"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="content" className="mb-2 block text-lg font-medium">
            Your Opinion
          </Label>
          <Textarea
            id="content"
            placeholder="Share the details of your experience..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full"
          />
        </div>

        {/* Rating Selection */}
        <div>
          <Label className="mb-3 block text-lg font-medium">
            Overall Rating
          </Label>
          <div className="grid grid-cols-5 gap-2">
            {ratingEmojis.map((r) => (
              <Card
                key={r.value}
                className={`cursor-pointer transition-all duration-200 flex items-center justify-center p-4 text-4xl ${
                  selectedRating === r.value
                    ? "border-2 border-green-500 shadow-md"
                    : "border border-gray-200"
                }`}
                onClick={() => setSelectedRating(r.value)}
              >
                {r.emoji}
              </Card>
            ))}
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full h-12 text-lg font-semibold">
          Submit Opinion
        </Button>
      </div>
    </div>
  );
}
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { 
  Store,
  UtensilsCrossed,
  ShoppingBag,
  Car,
  Heart,
  Home,
  Briefcase,
  GraduationCap,
  Smartphone,
  MapPin
} from "lucide-react"

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'UtensilsCrossed': UtensilsCrossed,
  'ShoppingBag': ShoppingBag,
  'Car': Car,
  'Heart': Heart,
  'Home': Home,
  'Briefcase': Briefcase,
  'GraduationCap': GraduationCap,
  'Smartphone': Smartphone,
  'CreditCard': Briefcase,
  'Plane': MapPin,
  'Sparkles': Heart,
  'Zap': Smartphone
}

interface Category {
  id: string
  name: string
  icon?: string
  business_count: number
}

interface CategoryGridProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (category: string) => void
  loading?: boolean
}

export function CategoryGrid({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  loading 
}: CategoryGridProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.icon || 'Store'] || Store
        return (
          <Card 
            key={category.id}
            className={cn(
              "p-4 cursor-pointer transition-all hover:elevated-shadow",
              selectedCategory === category.name && "ring-2 ring-primary"
            )}
            onClick={() => onCategorySelect(category.name)}
          >
            <CardContent className="p-0 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-card-foreground">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.business_count} businesses</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
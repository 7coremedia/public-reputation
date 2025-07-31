import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  onFilter?: () => void
  showFilter?: boolean
}

export function SearchBar({ 
  placeholder = "Search businesses...", 
  onSearch, 
  onFilter,
  showFilter = true 
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={placeholder}
          className="pl-10 bg-muted border-0 rounded-2xl h-12"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      {showFilter && (
        <Button 
          variant="secondary" 
          size="icon"
          className="h-12 w-12 rounded-2xl"
          onClick={onFilter}
        >
          <Filter className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  return (
    <div className="relative sm:block hidden">
      <Search size={20} className='absolute h-4 w-4 top-3 left-4 text-muted-foreground'/>
      <Input placeholder="Type your search..." className='pl-10 bg-primary/10 '/>
    </div>
  );
}

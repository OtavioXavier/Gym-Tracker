import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="relative sm:block hidden">
      <Search
        size={20}
        className="absolute h-4 w-4 top-3 left-4 text-muted-foreground"
      />
      <Input
        placeholder="Type your search..."
        className="pl-10 bg-primary/10 "
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("search", e.target.value)
          );
        }}
      />
    </div>
  );
}

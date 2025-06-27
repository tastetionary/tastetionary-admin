import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <div className="flex items-center rounded-[6px] border border-neutral-200 bg-background gap-[8px] w-full px-3">
      <SearchIcon className="w-4 h-4 text-neutral-400" />

      <input
        type={type}
        className={cn(
          "flex h-[42px] w-full rounded-md bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
SearchInput.displayName = "SearchInput";

export { SearchInput };

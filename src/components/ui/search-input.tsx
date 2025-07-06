import * as React from 'react'

import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex w-full items-center gap-[8px] rounded-[6px] border border-neutral-200 bg-background px-3">
        <SearchIcon className="h-4 w-4 text-neutral-400" />

        <input
          type={type}
          className={cn(
            'flex h-[42px] w-full rounded-md bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'

export { SearchInput }

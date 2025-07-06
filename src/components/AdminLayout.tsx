import React, { type ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export const AdminLayout = React.forwardRef<HTMLDivElement, AdminLayoutProps>(
  ({ children, title, description }, ref) => (
    <div ref={ref} className="w-full bg-[#EDEFF1] p-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h1 className="pretendard text-[30px] font-bold leading-[160%] text-neutral-800">
              {title}
            </h1>
            {description && (
              <p className="pretendard text-[16px] leading-[160%] text-neutral-800">
                {description}
              </p>
            )}
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  )
)
AdminLayout.displayName = 'AdminLayout'

import React from 'react'
import { ICON_COLLECTION } from '../IconCollection'

export const Header = () => {
  return (
    <header className="h-16 bg-theme py-4 px-3 sm:px-12 flex justify-between items-center shadow-sm">
      {/* Icon */}
      <div className="flex gap-x-3 items-center">
        <div className="">{ICON_COLLECTION.logo}</div>
        <h1 className="text-lg text-white-100 font-extrabold">Data Flow</h1>
      </div>
      {/* Profile and drop down */}
      <div className="flex gap-x-3 items-center">
        {/* Profile placeholder */}
        <div className="flex gap-x-1 items-center">
          <div className="h-8 w-8 rounded-sm bg-white-100/80" />
          <p className="text-xs text-white-100 font-medium">Michael Hogan</p>
        </div>

        <div className="text-white-100 w-4">
          {ICON_COLLECTION['chevron-down']}
        </div>
      </div>
    </header>
  )
}

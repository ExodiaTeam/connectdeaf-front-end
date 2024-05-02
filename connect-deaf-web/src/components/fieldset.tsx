import React from 'react'

interface FieldsetProps {
  title: string
  children: React.ReactNode
}

export function Fieldset(data: FieldsetProps) {
  return (
    <fieldset className="flex h-full content-center rounded border border-disabled-500 px-3 pb-4 pt-2">
      <legend className="px-1 text-xs">{data.title}</legend>
      {data.children}
    </fieldset>
  )
}

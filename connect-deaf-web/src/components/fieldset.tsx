import React from 'react'

interface FieldsetProps {
  title: string
  children: React.ReactNode
}

export function Fieldset(data: FieldsetProps) {
  return (
    <fieldset className="border-disabled-700 flex h-full w-full max-h-14 content-center rounded border px-3 pb-4 pt-2">
      <legend className="px-1 text-xs">{data.title}</legend>
      {data.children}
    </fieldset>
  )
}

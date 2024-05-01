interface SelectProps {
  children: React.ReactNode
}

export function Select(data: SelectProps) {
  return (
    <select className="h-full w-full border-none bg-transparent text-disabled-500 focus:outline-none">
      {data.children}
    </select>
  )
}

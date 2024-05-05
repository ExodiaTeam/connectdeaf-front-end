interface SelectProps {
  children: React.ReactNode
}

export function Select(data: SelectProps) {
  return (
    <select className="text-disabled-700 h-full w-full border-none bg-transparent focus:outline-none">
      {data.children}
    </select>
  )
}

interface SelectProps {
  children: React.ReactNode
  placeholder: string;
}

export function Select(data: SelectProps) {
  return (
    <select className="h-full w-full border-none bg-transparent text-disabled-500 focus:outline-none">
      <option value="" disabled selected>{data.placeholder}</option>
      {data.children}
    </select>
  )
}

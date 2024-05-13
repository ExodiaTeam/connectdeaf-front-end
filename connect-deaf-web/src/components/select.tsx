interface SelectProps {
  children: React.ReactNode
  placeholder: string;
}

export function Select(data: SelectProps) {
  return (
    <select className="text-disabled-700 h-full w-full border-none bg-transparent focus:outline-none">
      <option value="" disabled selected>{data.placeholder}</option>
      {data.children}
    </select>
  )
}

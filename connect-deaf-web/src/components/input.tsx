import { forwardRef, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = 'text', placeholder = '', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className="h-full w-full border-none bg-transparent placeholder-disabled-500 focus:outline-none"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  )
})

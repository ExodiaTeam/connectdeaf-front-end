import { forwardRef, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = 'text', placeholder = '', children, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className="placeholder-disabled-700 h-full w-full border-none bg-transparent focus:outline-none"
      type={type}
      placeholder={placeholder}
      {...props}
    >
      {children}
    </input>
  )
})

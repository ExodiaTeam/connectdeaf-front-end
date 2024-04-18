import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({ children, type, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="disabled:bg-disabled-500 flex h-[42px] w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white"
    >
      {children}
    </button>
  )
}

import { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({ children, type, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="mb-7 flex h-[42px] w-full items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-white duration-200 ease-in hover:opacity-90 disabled:bg-disabled-500"
    >
      {children}
    </button>
  )
}

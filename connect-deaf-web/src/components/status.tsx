import { Check } from '@phosphor-icons/react'

interface StatusProps {
  step: number
  name: string
  status: 'completed' | 'active' | 'disabled'
}

export function Status(props: StatusProps) {
  return (
    <div className="flex items-center gap-2">
      {props.status === 'completed' && (
        <>
          <div className="align-center flex justify-center rounded-full bg-primary-500 p-1">
            <Check size={16} color="white" weight="regular" />
          </div>

          <p className="text-sm font-medium">{props.name}</p>
        </>
      )}
      {props.status === 'active' && (
        <>
          <span className="h-6 w-6 rounded-full bg-primary-500 text-center text-xs leading-6 text-white">
            {props.step}
          </span>
          <p className="text-sm font-medium">{props.name}</p>
        </>
      )}
      {props.status === 'disabled' && (
        <>
          <span className="h-6 w-6 rounded-full bg-disabled-500 text-center text-xs leading-6 text-white">
            {props.step}
          </span>
          <p className="text-sm font-medium text-disabled-500">{props.name}</p>
        </>
      )}
    </div>
  )
}

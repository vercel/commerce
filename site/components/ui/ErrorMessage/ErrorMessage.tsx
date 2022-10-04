import type { FC } from 'react'

interface ErrorMessageProps {
  error: {
    message: string
    code?: string
    errors?: {
      message: string
    }[]
  }
}

const ErrorMessages: FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="flex flex-col text-red p-5 m-5 border border-solid border-red">
      <span>{error.message}</span>
      {error.errors && error.errors?.length > 0 && (
        <ul>
          {error.errors.map(({ message }, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ErrorMessages

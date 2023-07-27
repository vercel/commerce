import { credentials, credentialsKeys } from "constants/sustainability";

export function SustainabilityInfo() {
  return (
    <>
      <div>
          <p className='font-bold mt-6'>Credentials:</p>
          <ul className='mt-2'>
            {credentialsKeys.map(credential => (
              <li 
              key={credential}
              id={credential}
              >
                {credentials[credential as keyof typeof credentials].title}
              </li>
            ))}
          </ul>
        </div>
    </>
  )
};

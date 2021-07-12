import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'
import useCustomer from '@framework/customer/use-customer'
import useChangePassword from '@framework/auth/use-change-password'

interface Props {
}

const ChangePassword: FC<Props> = () => {
  const changePassword = useChangePassword()
  // return (<div>FOo</div>)
  //
  const { data: customer } = useCustomer()
  //
  if (customer) {
    console.log(customer)
  } else {
    return <></>;
  }


  // Form State
  const [email, _setEmail] = useState(customer.email as string)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()

  const mismatchConfirmation = (newPassword !== confirmPassword) && newPassword !== ''

  // // const login = useLogin()
  //
  const handleChangePassword = async (e: React.SyntheticEvent<EventTarget>) => {
    console.log('handleChangePassword');
    e.preventDefault()

    // if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    // }

    if (newPassword !== confirmPassword) {
      setDisabled(true)
      setMessage('Passwords must match!')
      return;
    } else {


    }

    try {
      setLoading(true)
      setMessage('')
      await changePassword({
        email,
        currentPassword,
        newPassword,
        confirmPassword
      })
      setLoading(false)
      closeModal()
    } catch (error) {
      console.dir(error);
      const { errors } = error;
      console.dir(errors);
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  // Halt unless the password is valid, and both new password fields match!
  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled( !validPassword || newPassword != confirmPassword )
    }
  }, [newPassword, confirmPassword, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <form
      onSubmit={handleChangePassword}
      className='w-80 flex flex-col justify-between p-3'
    >
      <div className='flex justify-center pb-12 '>
        <Logo width='64px' height='64px' />
      </div>
      <div className='flex flex-col space-y-3'>
        {message && (
          <div className='text-red border border-red p-3'>
            {message}
          </div>
        )}
        <Input type='email' disabled={true} value={email} />
        <Input type='password' autoComplete={'current-password'} placeholder='Current Password' onChange={setCurrentPassword} />
        <Input type='password' autoComplete={'new-password'} placeholder='New Password' onChange={setNewPassword} />
        <Input type='password' autoComplete={'new-password'} placeholder='Confirm new Password' onChange={setConfirmPassword} />
        { mismatchConfirmation && 'New password and confirmation must match.' }

        <Button
          variant='slim'
          type='submit'
          loading={loading}
          disabled={disabled || mismatchConfirmation}
        >
          Change Password
        </Button>

      </div>
    </form>
  )
}




export default ChangePassword

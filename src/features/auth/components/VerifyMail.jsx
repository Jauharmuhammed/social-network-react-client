import { useVerifyMailMutation } from 'app/api/authApiSlice'
import BackdropSpinner from 'components/BackdropSpinner'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import errorToast from 'utils/toasts/errorToast'
import successToast from 'utils/toasts/successToast'
import { setCredentials } from '../services/authSlice'


const VerifyMail = () => {
  const [verifyMail, {isLoading}] = useVerifyMailMutation() 
  const dispatch = useDispatch()
  const { uid, token } = useParams();
  const navigate = useNavigate()

  console.log(uid, token);

  const verify = async () => {
    try{

      const response = await verifyMail({uidb64:uid, token:token}).unwrap()
      console.log(response);
      dispatch(setCredentials(response));
      successToast('Email verified successfully')
      navigate('/')
    }
    catch {
      navigate('/')
      errorToast('Verification failed, Please contact customer support')
    }
  }

  useEffect(() => {
    verify()
  }, [])
  
  return (
    <>
    { isLoading && <BackdropSpinner/>}
    </>
  )
}

export default VerifyMail
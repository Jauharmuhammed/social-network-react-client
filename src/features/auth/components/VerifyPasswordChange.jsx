import { useForgotPassowrdVerifyMutation } from 'app/api/authApiSlice';
import BackdropSpinner from 'components/BackdropSpinner';
import ChangePasswordModal from 'features/auth/components/ChangePasswordModal';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { openChangePassword } from '../services/authModalSlice';

const VerifyPasswordChange = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [id, setId] = useState(null)
  
      const [verifyForgotPassword, {isLoading}] = useForgotPassowrdVerifyMutation()


  const verify = async () => {
    try{
      const response = await verifyForgotPassword({uidb64:uid, token:token}).unwrap()
      setId(response);
      dispatch(openChangePassword())
    }
    catch {
      navigate('/')
      toast.error("Verification failed, Please contact customer support", {
        style: {
          borderRadius: "10px",
        },
      });
    }
  }

  useEffect(() => {
    verify()
  }, [])

  return (
    <>
    { isLoading && <BackdropSpinner/> 
    }
    <ChangePasswordModal uid={id}/>
    </>
  )
}

export default VerifyPasswordChange
'use client'


import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/app/features/user/userSlices';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebaseConfig';

const UserLoader = () => {
  const dispatch = useDispatch();
  // const authenticatedUser = auth.currentUser

  useEffect(() => {
    //@ts-expect-error expected
    dispatch(fetchUser());
    console.log('foioioioi')

  }, [dispatch]);

  // useEffect(() => {
  //   if(authenticatedUser) {
  //     dispatch(fetchUser());
  //     console.log('foioioio')
  //   }
  // }, [authenticatedUser])

  return null; // Componente que não renderiza nada
};

export default UserLoader;
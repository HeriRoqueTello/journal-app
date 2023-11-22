import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/router/JournalRoutes'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks/useCheckAuth'

export const AppRouter = () => {


  const { status } = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        (status === 'authenticated')
         ? <Route path='/*' element={ <JournalRoutes /> }/> 
         : <Route path='auth/*' element={ <AuthRoutes /> }/>
      }

      <Route path='/*' element={ <Navigate to={`/auth/login`} /> } />
      {/* <Route path='auth/*' element={ <AuthRoutes /> }/> */}

      {/* <Route path='/*' element={ <JournalRoutes /> }/> */}
    </Routes>
  )
}

import SignUp from "./SignUp";
import { useState } from "react"
import SignIn from "./SignIn";


export default function Auth() {
  const [pageType, setPageType] = useState('signIn')
  const handlePageType = () => {
    setPageType(pageType === 'signIn' ? 'signUp' : 'signIn')
  }
  return (
    <>
      {
        pageType === 'signUp' ? <SignUp handlePageType={handlePageType} /> : <SignIn handlePageType={handlePageType} />
      }
    </>
  )
}

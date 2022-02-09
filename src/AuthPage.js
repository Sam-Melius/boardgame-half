import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { signIn, signUp } from './services/fetch-utils.js';

export default function AuthPage({ setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // you'll need to track the form state of the email and password

  async function handleSignIn(e) {
    e.preventDefault();
    const user = await signIn(email, password);  
    // sign the user in using the form state
    setCurrentUser(user);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
  }
    
  async function handleSignUp() {
    const user = await signUp(email, password);
    // sign the user up using the form state
    setCurrentUser(user);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
  }

  return (
    <div className='auth'>
      <h1><em>Boardzo</em></h1>
      {/* on submit, sign the user in using the function defined above */}
      <form onSubmit={handleSignIn}>
        <label>
            Email
          {/* on change, update the form state for email */}
          <input required type="email" onChange={e => setEmail(e.target.value)} name="email" />
        </label>
        <label>
            Password
          {/* on change, update the form state for password */}
          <input required type="password" onChange={e => setPassword(e.target.value)} name="password" />
        </label>
        <button>Sign In</button>
        {/* on clicking sign up, sign the user up using the function defined above */}
        <button type="button" onClick={handleSignUp} >Sign Up</button>
      </form>
    </div>
  );
}

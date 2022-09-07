import React, { useState } from 'react';

// LoginView is a child component of MainView and is rendered as a child of MainView when the user is not logged in (i.e. when the user is not authenticated) and the state of the user is set to null.
export function LoginView({ onLoggedIn }) { 
  const [username, setUsername] = useState(''); // initial value of username is an empty string
  const [password, setPassword] = useState(''); // initial value of password is an empty string

  // handleSubmit is a function that is called when the user clicks the submit button. It calls the onLoggedIn function that was passed to the LoginView component as a prop. The onLoggedIn function is defined in MainView and updates the user state to the username that was entered in the form.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    onLoggedIn(username);
  };

  return (
    <form>
      <label>
        Username:{' '}
        {/* empty string to add a space between the label and the input field */}
        <input
          type='text'
          value={username} // value of the input field is bound to the username state
          onChange={(e) => setUsername(e.target.value)} // when a user types in the input field, the setUsername function is called to update the username state to the value of the input field (e.target.value)
        />
      </label>
      <label>
        Password:{' '}
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

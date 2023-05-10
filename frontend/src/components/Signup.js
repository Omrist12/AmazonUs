import React, { useState } from "react";
import styles from "./Signup.module.css";
import { initializeApp } from "firebase/app";
import { useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//connecting to the firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAbr6iHHVwQ9BxycwDdkqeQLLD0kk3twgs",
  authDomain: "us-184db.firebaseapp.com",
  projectId: "us-184db",
  storageBucket: "us-184db.appspot.com",
  messagingSenderId: "310053069316",
  appId: "1:310053069316:web:d22c8f84679e2aa1cc4b51",
  measurementId: "G-S1343SSKC3",
};

//initialazing firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [region, setRegion] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const userData = { email, firstName, lastName, region, telephone };

  //handling the signup to the system
  const handleSignUp = (event) => {
    event.preventDefault();
    //taking the user email and password for the signup
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem("isLoggedIn", true);
        // redirecting the page to the customerMain page after login
        history.push("/customerMain");
        history.go(0);
      })
      .then(console.log(userData))
      //catching errors
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className={styles["login-form"]}>
      <h1>Create Account</h1>
      <form className="login-form" onSubmit={handleSignUp}>
        <input
          type="first name"
          placeholder="First Name"
          className={styles["login-form__input"]}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="last name"
          placeholder="Last Name"
          className={styles["login-form__input"]}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles["login-form__input"]}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles["login-form__input"]}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <select
          className={styles["login-form__input"]}
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        >
          <option value="">Select your region</option>
          <option value="Hamerkaz">Hamerkaz</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Jerusalem area">Jerusalem area</option>
          <option value="Eilat">Eilat</option>
        </select>
        <input
          type="telephone"
          placeholder="telephone"
          className={styles["login-form__input"]}
          value={telephone}
          onChange={(event) => setTelephone(event.target.value)}
        />
        {error && <div className={styles["login-form__error"]}>{error}</div>}
        <button type="submit" className={styles["login-form__submit"]}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
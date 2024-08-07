import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './authConfig';

// Reset password
const reset = async (email: string) => {
  await sendPasswordResetEmail(auth, email).then(()=> {
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage + " " + errorCode);
  })
}

// Register a new user
const register = async (email: string, password: string, confirm: string) => {
  try {
    if (password == confirm) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      window.location.href = "/";
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

// Login an existing user
const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    window.location.href = "/home";
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// Logout the current user
const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export { register, login, logout, reset };

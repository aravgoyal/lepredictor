import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from './authConfig';
import { FormEvent, useRef } from "react";

function ResetPassword() {
    const emailRef = useRef<HTMLInputElement>(null);

    const handleReset = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (emailRef.current && emailRef.current.value) {
            try {
                await sendPasswordResetEmail(auth, emailRef.current.value);
                alert("Check your email for a password reset link.");
            } catch (err) {
                alert("This Email is not associated with a Momentum account.");
            }
        } else {
            alert("Please enter a valid email address.");
        }
    };

    return (
        <div className="Reset-Password">
            <h1>Forgot Password</h1>
            <form onSubmit={handleReset}>
                <input className = 'register-email' ref={emailRef} placeholder="Enter your email" />
                <button className = 'Reset-button' type="submit">Reset</button>
            </form>
            <div className="register-account">
                <a>Return back to</a>
                <a href="/"> Login</a>
            </div>
        </div>
    );
}

export default ResetPassword;



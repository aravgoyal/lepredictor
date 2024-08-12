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
                alert((err as Error).message);
            }
        } else {
            alert("Please enter a valid email address.");
        }
    };

    return (
        <div className="ResetPassword">
            <h1>Forgot Password</h1>
            <form onSubmit={handleReset}>
                <input name="email" ref={emailRef} placeholder="Enter your email" />
                <button type="submit">Reset</button>
            </form>
        </div>
    );
}

export default ResetPassword;

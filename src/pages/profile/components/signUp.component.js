//signup component
import React, { useState } from "react";
import { signUp } from "../../../integrations/supabase/auth";    

export default function SignUpComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const { user, error } = await signUp(email, password);
        if (error) {
            setError(error.message);
        } else {
            setSuccess("Successfully signed up!");
            // Optionally, you can redirect or fetch user data here
        }    
    };

    return (
        <div className="mt-10">
            <h2 className="text-slate-300 text-2xl font-bold mb-4 text-center">Sign Up</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <input
                            className="input input-bordered p-3 rounded-full text-center max-w-xs shadow-inner bg-slate-200"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            className="input input-bordered p-3 rounded-full text-center max-w-xs shadow-inner bg-slate-200"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary bg-slate-400 rounded-full p-3 w-20"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    );
}
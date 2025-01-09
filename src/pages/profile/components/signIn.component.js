import React, { useState } from "react";
import { signIn } from "/src/integrations/supabase/auth";

const SignInComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validate email and password
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        const { user, error } = await signIn(email, password);
        if (error) {
            setError(error.message);
            console.error("Sign-in error:", error.message);
        } else {
            setSuccess("Successfully signed in!");
            console.log(user);

            const {
                data: { user },
            } = await supabase.auth.getUser();
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-slate-300 text-2xl font-bold mb-4 text-center">Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2 text-teal-600">
                    <input
                        className="input input-bordered p-3 rounded-full text-center max-w-xs shadow-inner bg-slate-200"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        className="input input-bordered p-3 rounded-full text-center max-w-xs shadow-inner bg-slate-200"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary bg-slate-400 rounded-full p-3 w-20"
                    >
                        Sign In
                    </button>
                </div>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
};

export default SignInComponent;

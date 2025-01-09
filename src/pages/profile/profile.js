import { useEffect, useState } from "react";
import SignInComponent from "./components/signIn.component";
import SignUpComponent from "./components/signUp.component";
import { supabase } from "/src/integrations/supabase/client";


export default function Profile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const session = supabase.auth.getSession();
        setUser(session?.user || null); // Set user if session exists

        // Subscribe to auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="p-10 flex flex-col items-center text-slate-200">
            <h1 className="text-3xl font-bold text-center text-slate-300">Profile</h1>
            <div className="mt-10 ">
                {!user ? (
                    <>
                        <SignInComponent />
                        <SignUpComponent />
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <p>Welcome, {user.email}!</p>
                        <button
                            className="btn btn-primary bg-red-400 rounded-full p-3 w-40 mt-4"
                            onClick={() => supabase.auth.signOut()}
                            
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

import { supabase } from "/src/integrations/supabase/client.js"; 

//sign up user
export const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });
    return { user, error };
};

//sign in user
export const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { user, error };
};

//sign out user
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};



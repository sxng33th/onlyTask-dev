import { supabase } from "/src/integrations/supabase/client.js";

export const createTodo = async (task) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;

    const { data, error } = await supabase
        .from("todos")
        .insert([
            {
                task,
                completed:false,
                user_id: user.id
            },
        ])
        .select();
};

export const getTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*");
    return { data, error };
};
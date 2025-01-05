import { supabase } from "/src/integrations/supabase/client.js";

export const createTodo = async (task) => {
    const { data, error } = await supabase
        .from("todos")
        .insert([
            {
                task,completed:false
            },
        ])
        .select();
};
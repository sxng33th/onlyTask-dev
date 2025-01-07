import { supabase } from "/src/integrations/supabase/client.js";

export const createTodo = async (task) => {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            console.error("User is not authenticated or error fetching user:", userError);
            return null;
        }

        const { data, error } = await supabase
            .from('todos')
            .insert([{ task, user_id: user.id }])
            .select();

        if (error) {
            console.error("Error inserting todo:", error);
            return null;
        }

        return data[0];
    } catch (error) {
        console.error("Error in createTodo:", error);
        return null;
    }
};

export const getTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*");
    return { data, error };
};

export const deleteTodo = async (id) => {
    try {
        console.log("Attempting to delete todo with id:", id);
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting todo:", error);
            return { success: false, error };
        }

        console.log("Todo deleted successfully");
        return { success: true };
    } catch (error) {
        console.error("Error in deleteTodo:", error);
        return { success: false, error };
    }
};

export const updateTodo = async (id, updatedTask) => {
    try {
        const { data, error } = await supabase
            .from('todos')
            .update({ task: updatedTask })
            .eq('id', id)
            .select();

        if (error) {
            console.error("Error updating todo:", error);
            return { success: false, error };
        }

        if (!data || data.length === 0) {
            console.error("No data returned after update");
            return { success: false, error: "No data returned" };
        }

        console.log("Todo updated successfully:", data);
        return { success: true, data: data[0] };
    } catch (error) {
        console.error("Error in updateTodo:", error);
        return { success: false, error };
    }
};
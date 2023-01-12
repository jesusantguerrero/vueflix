import { createClient } from "@supabase/supabase-js";
import { reactive } from "vue";

console.log(import.meta.env.SUPABASE_URL);
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const AuthState = reactive({
  user: null,
});

export const useAuth = () => {
  const resolveUser = ({ data, error }) => {
    if (error) {
      throw new Error(error.message());
    }
    const { user } = data ?? { user: null };
    return user;
  };

  const login = async ({ email, password }) => {
    return resolveUser(
      await supabase.auth.signInWithPassword({
        email,
        password,
      })
    );
  };

  const signup = async ({ email, password }) => {
    return resolveUser(await supabase.auth.signUp({ email, password }));
  };

  const logout = async () => {
    return resolveUser(await supabase.auth.signOut());
  };

  const isAuthenticated = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session ?? { user: null };
    return user;
  };

  return {
    signup,
    login,
    logout,
    isAuthenticated,
  };
};

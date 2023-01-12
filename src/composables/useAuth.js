import { createClient } from "@supabase/supabase-js";
import { reactive } from "vue";

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
      throw new Error(error);
    }
    const { user } = data ?? { user: null };
    return user;
  };

  const login = async ({ email, password }) => {
    const user = resolveUser(
      await supabase.auth.signInWithPassword({
        email,
        password,
      })
    );

    AuthState.user = user;
    return user;
  };

  const register = async ({ email, password }) => {
    return resolveUser(await supabase.auth.signUp({ email, password }));
  };

  const logout = async () => {
    resolveUser(await supabase.auth.signOut());
    AuthState.user = null;
    return;
  };

  const isAuthenticated = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session ?? { user: null };
    return user;
  };

  return {
    register,
    login,
    logout,
    isAuthenticated,
  };
};

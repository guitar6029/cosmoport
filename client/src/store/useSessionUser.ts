import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "../lib/supabase";
import type { Role } from "../types/Role";
import type { SessionUser } from "../types/User";
import type { Profile } from "../types/Profile";

export const useSessionUser = defineStore("sessionUser", () => {
  const loading = ref(true);
  const user = ref<SessionUser | null>(null);
  const profile = ref<Profile | null>(null);
  let unsub: (() => void) | null = null;

  // ===== Getters =====
  const isAuthed = computed(() => !!user.value);
  const role = computed<Role | null>(() => profile.value?.role ?? null);
  const avatarUrl = computed(() => profile.value?.avatar_url ?? null);
  const displayName = computed(() => profile.value?.display_name ?? null);

  // ===== Actions =====
  async function init() {
    console.log("[Auth] Initializing session...")
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      user.value = {
        id: data.session.user.id,
        email: data.session.user.email ?? null,
      };
      console.log("found the user from supabase", user.value.email);
      await fetchProfile();
    }
    if (!unsub) {
      const { data: sub } = supabase.auth.onAuthStateChange(
        async (_evt, session) => {
          if (session?.user) {
            user.value = {
              id: session.user.id,
              email: session.user.email ?? null,
            };
            profile.value = null;
            await fetchProfile();
          } else {
            clear();
          }
        }
      );
      unsub = () => sub.subscription.unsubscribe();
    }
    loading.value = false;
    return unsub;
  }

  async function fetchProfile() {
    console.log("fetching profile...")
    if (!user.value) {
      console.log("No user found")
      profile.value = null;
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .select("id, display_name, avatar_url, role")
      .eq("id", user.value.id)
      .single();
    if (!error && data) {
      profile.value = data as Profile;
      console.log("Profile data:", profile.value)
    } else {
        console.log("Error fetching user roles:", error)
      profile.value = null;
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    clear();
    if (unsub) {
      unsub();
      unsub = null;
    }
  }

  function clear() {
    user.value = null;
    profile.value = null;
  }

  return {
    // state
    loading,
    user,
    profile,
    // getters
    isAuthed,
    role,
    avatarUrl,
    displayName,
    // actions
    init,
    fetchProfile,
    signOut,
    clear,
  };
});

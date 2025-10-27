import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "../lib/supabase";
import type { Role } from "../types/Role";
import type { SessionUser } from "../types/User";
import type { Profile } from "../types/Profile";

export const useSessionUser = defineStore("sessionUser", () => {
  // ===== State =====
  const loading = ref(true); // controls global loading state (session/profile fetch)
  const user = ref<SessionUser | null>(null);
  const profile = ref<Profile | null>(null);
  let unsub: (() => void) | null = null;

  // ===== Getters =====
  const isAuthed = computed(() => !!user.value);
  const role = computed<Role | null>(() => profile.value?.role ?? null);
  const avatarUrl = computed(() => profile.value?.avatar_url ?? null);
  const displayName = computed(() => profile.value?.display_name ?? null);

  // Optional “ready” computed you can use in components
  const ready = computed(() => {
    if (loading.value) return false;
    return isAuthed.value ? !!profile.value : true;
  });

  // ===== Actions =====

  // Initialize the user session and profile
  async function init() {
    console.log("[Auth] Initializing session...");
    const { data } = await supabase.auth.getSession();

    // --- Restore existing session ---
    if (data.session?.user) {
      user.value = {
        id: data.session.user.id,
        email: data.session.user.email ?? null,
      };
      console.log("[Auth] Found user from Supabase:", user.value.email);
      await fetchProfile();
    }

    // --- Listen for auth changes (sign-in/out, refresh) ---
    if (!unsub) {
      const { data: sub } = supabase.auth.onAuthStateChange(
        async (_evt, session) => {
          if (session?.user) {
            // user logged in or refreshed
            user.value = {
              id: session.user.id,
              email: session.user.email ?? null,
            };

            // ⚠️ Don't clear profile mid-refresh to prevent UI flicker
            loading.value = true;
            await fetchProfile();
            loading.value = false;
          } else {
            // user logged out
            clear();
          }
        }
      );
      unsub = () => sub.subscription.unsubscribe();
    }

    loading.value = false; // session initialization complete
    return unsub;
  }

  // Fetch the user's profile from the "users" table
  async function fetchProfile() {
    console.log("[Profile] Fetching profile...");
    if (!user.value) {
      console.log("[Profile] No user found");
      profile.value = null;
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, display_name, avatar_url, role")
      .eq("id", user.value.id)
      .maybeSingle(); // ✅ safer than .single(), won’t throw if row doesn’t exist

    if (!error && data) {
      profile.value = data as Profile;
      console.log("[Profile] Data loaded:", profile.value);
    } else {
      console.warn("[Profile] Error fetching user profile:", error);
      // ⚠️ Optionally keep old profile to avoid flicker on transient errors
      // profile.value = null;
    }
  }

  // Sign out and cleanup
  async function signOut() {
    await supabase.auth.signOut();
    clear();
    if (unsub) {
      unsub();
      unsub = null;
    }
  }

  // Clear local user/profile data
  function clear() {
    user.value = null;
    profile.value = null;
    loading.value = false; // ✅ ensure loading resets after logout
  }

  // ===== Expose store =====
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
    ready,
    // actions
    init,
    fetchProfile,
    signOut,
    clear,
  };
});

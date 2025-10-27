import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "../lib/supabase";
import type { Role } from "../types/Role";
import type { SessionUser } from "../types/User";
import type { Profile } from "../types/Profile";

export const useSessionUser = defineStore("sessionUser", () => {
  // ===== State =====
  const loading = ref(true);
  const user = ref<SessionUser | null>(null);
  const profile = ref<Profile | null>(null);
  let unsub: (() => void) | null = null;

  // internal ready promise (set once)
  let _ready: Promise<void> | null = null;

  // ===== Getters =====
  const isAuthed = computed(() => !!user.value);
  const role = computed<Role | null>(() => profile.value?.role ?? null);
  const avatarUrl = computed(() => profile.value?.avatar_url ?? null);
  const displayName = computed(() => profile.value?.display_name ?? null);

  // Optional boolean for components; guards should await readyPromise instead
  const ready = computed(() =>
    loading.value ? false : isAuthed.value ? !!profile.value : true
  );

  // ===== Actions =====

  // Initialize once; safe to call multiple times.
  function init() {
    if (_ready) return _ready; // idempotent

    loading.value = true;
    _ready = (async () => {
      // --- Restore existing session ---
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        user.value = {
          id: data.session.user.id,
          email: data.session.user.email ?? null,
        };
        await fetchProfile(); // ensure first paint has profile if possible
      }

      // --- Listen for auth changes (sign-in/out, refresh) ---
      if (!unsub) {
        const { data: sub } = supabase.auth.onAuthStateChange(
          async (_evt, session) => {
            if (session?.user) {
              user.value = {
                id: session.user.id,
                email: session.user.email ?? null,
              };
              // avoid flicker during refresh
              loading.value = true;
              await fetchProfile();
              loading.value = false;
            } else {
              clear();
            }
          }
        );
        unsub = () => sub.subscription.unsubscribe();
      }

      loading.value = false; // session initialization complete
    })();

    return _ready;
  }

  // Fetch the user's profile from the "users" table
  async function fetchProfile() {
    if (!user.value) {
      profile.value = null;
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, display_name, avatar_url, role")
      .eq("id", user.value.id)
      .maybeSingle();

    if (!error && data) {
      profile.value = data as Profile;
    } else {
      console.warn("[Profile] Error fetching user profile:", error);
      // keep previous profile on transient errors to avoid UI flicker
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
    loading.value = false;
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

    // awaitable promise for router/navbars to block on
    get readyPromise() {
      return _ready ?? Promise.resolve();
    },

    // optional helper if you prefer a method
    awaitReady() {
      return _ready ?? Promise.resolve();
    },
  };
});

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { supabase } from '../lib/supabase'
import space_station from '../assets/img/station_1.jpg'

const loading = ref(false)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = reactive({
    email: '',
    password: '',
})

async function fetchUserAndRoles(userId: string) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, display_name, avatar_url, role')
            .eq('id', userId)
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.error('Error fetching user roles:', err)
        return null
    }
}

async function signInWithEmail() {
    loading.value = true
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        })

        if (error) throw error

        // ✅ login success → get user details
        const userProfile = await fetchUserAndRoles(data.user.id)
        console.log('Auth data:', data)
        console.log('Profile data:', userProfile)

        // here you can later save both to Pinia store
        // sessionStore.setUser({ ...data.user, ...userProfile })

    } catch (err) {
        console.error('Login failed:', err)
    } finally {
        loading.value = false
    }
}



const canSubmit = computed(() => {
    const emailInput = form.email.trim()
    const passwordInput = form.password.trim()
    const legitEmail = emailRegex.test(emailInput)
    return legitEmail && passwordInput.length > 0
})

</script>

<template>
    <form @submit.prevent="signInWithEmail()">
        <div class="hero bg-base-200">
            <div class="hero-content flex flex-col md:flex-row items-center gap-2">
                <img :src="space_station" alt="space station" class="rounded-lg shadow-2xl size-48">
                <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl flex flex-col gap-2">
                    <div class="card-body">
                        <fieldset class="fieldset">
                            <label class="label">Email</label>
                            <input type="email" class="input" placeholder="Email" v-model="form.email" required />
                            <label class="label">Password</label>
                            <input type="password" class="input" placeholder="Password" v-model="form.password"
                                required />
                            <!-- <div><a class="link link-hover">Forgot password?</a></div> -->
                            <button :disabled="!canSubmit" type="submit" class="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
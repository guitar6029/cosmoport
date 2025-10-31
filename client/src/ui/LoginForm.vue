<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import starlingCourier from '../assets/img/ships/starling-courier-1.png'
const loading = ref(false)
const router = useRouter()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = reactive({
    email: '',
    password: '',
})

async function signInWithEmail() {
    loading.value = true
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        })

        if (error) throw error
        //now redirect to dashboard
        router.push({ name: 'Dashboard' })

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
        <div class="hero bg-transparent">
            <div class="hero-content flex flex-col md:flex-row items-center gap-2">
                <img :src="starlingCourier" alt="ship" class="size-48 bg-transparent">
                <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl flex flex-col gap-2">
                    <div class="card-body">
                        <fieldset class="fieldset">
                            <label class="label">Email</label>
                            <input type="email" class="input" placeholder="Email" v-model="form.email" required />
                            <label class="label">Password</label>
                            <input type="password" class="input" placeholder="Password" v-model="form.password"
                                required />

                            <button :disabled="!canSubmit" type="submit" class="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
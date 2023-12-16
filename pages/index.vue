<template>
    <div class="bg-slate-100">
        <div class="container max-w-md mx-auto p-4 min-h-screen flex flex-col justify-center items-center space-y-4">
            <div class="w-36">
                <IslamiLogo />
            </div>
            <div class="rounded bg-white p-8 space-y-6 text-center">
                <h1 class="font-bold text-3xl">Selamat datang!</h1>
                <div class="space-y-4">
                    <p>Silakan isi formulir berikut untuk mendapatkan QR Code!</p>
                    <div class="">
                        <form @submit.prevent="checkRegistrant" class="space-y-3 w-full">
                            <input class="rounded-lg px-5 py-3 border border-dashed block border-red-600 w-full" type="text" v-model="form.email" placeholder="Email kamu sesuai pendaftaran">
                            <div v-show="error" class="text-sm text-red-500">
                                {{ error }}
                            </div>
                            <button type="submit" class="px-4 py-2 rounded-lg bg-red-500 text-white block w-full">Selanjutnya</button>
                        </form>
                    </div>
                </div>
                <p>Setelah itu klik "Lanjutkan", silakan tunjukkan hasil QR tersebut kepada Tim Gate kami</p>
            </div>
            <div class="text-sm text-slate-500">Powered by <NuxtLink class="text-red-800" to="https://islami.co" :external="true">islami.co</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import QRCode from "qrcode";

const router = useRouter();

const form = reactive({
    email: ''
});

const error = ref('')

const checkRegistrant = async () => {
    error.value = '';
    const { data } = await useFetch('/api/check', {
        lazy: true,
        method: 'post',
        body: {
            email: form.email
        }
    })
    if (data.value) {
        router.push({
            path: '/register',
            query: {
                email: data.value.id,
                name: data.value.name
            }
        })
    } else {
        error.value = 'Maaf, kayaknya email yang kamu input salah, soalnya nggak ada di data kami.'
    }
}
</script>
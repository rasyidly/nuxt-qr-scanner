<template>
    <div class="bg-slate-100">
        <div class="container max-w-md mx-auto p-4 min-h-screen flex flex-col justify-center items-center space-y-4">
            <div class="w-36">
                <IslamiLogo />
            </div>
            <div class="rounded bg-white p-8 space-y-6 text-center">
                <h1 class="font-bold text-3xl">Selamat {{ registrant?.name }}</h1>
                <div class="space-y-4">
                    <p>Berikut adalah QR Code Kamu!</p>
                    <div class="rounded-lg px-2 py-2 border border-dashed font-bold text-red-600 border-red-600">
                        Silakan Screenshot dan bawa ke lokasi Festival SATF
                    </div>
                    <div id="qrcode">
                        <img v-if="qr" :src="qr" class="w-48 h-48" alt="">
                        <div v-else class="w-48 h-48 grid place-items-center mx-auto">
                            <svg class="animate-spin" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                                        <stop stop-color="#000" stop-opacity="0" offset="0%" />
                                        <stop stop-color="#000" stop-opacity=".631" offset="63.146%" />
                                        <stop stop-color="#000" offset="100%" />
                                    </linearGradient>
                                </defs>
                                <g fill="none" fill-rule="evenodd">
                                    <g transform="translate(1 1)">
                                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                                            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
                                        </path>
                                        <circle fill="#000" cx="36" cy="18" r="1">
                                            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
                                        </circle>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <p>Sampai ketemu di <NuxtLink class="text-red-800" to="https://maps.app.goo.gl/RJiJ9Aovqh54NMMg8" target="_blank" :external="true">Balai Sarbini</NuxtLink> :))</p>
            </div>
            <div class="text-sm text-slate-500">Powered by <NuxtLink class="text-red-800" to="https://islami.co" :external="true">islami.co</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import QRCode from "qrcode";

const route = useRoute();
const qr = ref('')

const { data: registrant } = await useFetch('/api/register', {
    method: 'post',
    body: {
        email: route.query.email,
        name: route.query.name,
    }
});

onMounted(() => {
    QRCode.toDataURL(registrant.value.id, (e, url) => {
        qr.value = url
    });
})
</script>
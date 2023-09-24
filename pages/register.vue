<template>
    <div class="bg-slate-100">
        <div class="container max-w-md mx-auto p-4 min-h-screen grid place-items-center">
            <div class="rounded bg-white p-8 space-y-8 text-center">
                <h1 class="font-bold text-3xl">Selamat {{ registrant.name }}</h1>
                <div>
                    <p>Berikut adalah QR Code Kamu!</p>
                    <div id="qrcode">
                        <img :src="image" class="w-48 h-48" alt="">
                    </div>
                </div>
                <p>Silakan screenshot dan bawa besok ke lokasi</p>
            </div>
        </div>
    </div>
</template>

<script setup>
// import JSONdb from 'simple-json-db';
import QRCode from 'qrcode';

const route = useRoute();
const image = ref('')
const registrant = ref({
    id: route.query.email,
    name: route.query.name,
    p: false
})

QRCode.toDataURL(registrant.value.id, (e, url) => image.value = url);
console.log(image.value)

// const db = new JSONdb('db/satfest.json', {
//     asyncWrite: true
// });
// const registrants = await db.get("registrants");

// if (registrants.map(r => r.id).indexOf(registrant.value.id) < 0) {
//     registrants.push(registrant.value)
// await db.set("registrants", registrants);
// }
</script>
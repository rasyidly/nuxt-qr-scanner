<template>
    <div class="space-y-2 text-center max-w-xl mx-auto w-full flex flex-col justify-between h-screen gap-y-8">
        <div class="min-h-[400px] grid place-items-center p-4">
            <div v-show="scanner" class=" rounded !border-0 w-full" id="reader"></div>
            <div v-show="!scanner" class="rounded border-4 border-dashed px-4 py-2">
                <div class="py-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#000000" viewBox="0 0 256 256" class="mx-auto">
                        <path
                            d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm0,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48ZM200,40H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-64,72V144a8,8,0,0,1,16,0v32a8,8,0,0,1-16,0Zm80-16a8,8,0,0,1-8,8H184v40a8,8,0,0,1-8,8H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,160Zm0,32v16a8,8,0,0,1-16,0V192a8,8,0,0,1,16,0Z">
                        </path>
                    </svg>
                </div>
                <button class="px-4 py-2 rounded border border-red-500 " @click="openScanner">Luncurkan scanner</button>
            </div>
        </div>
        <div class="p-4 bg-slate-100 flex-grow h-full grid place-items-center">
            <form @submit.prevent="markAsPresent" class="space-y-3 w-full">
                <h1 class="text-2xl font-bold h-12">{{ name || 'Scan dulu bos' }}</h1>
                <input class="block border bg-slate-50 w-full px-4 py-2 text-center" type="text" v-model="id" placeholder="Silakan isi email atau scan menggunakan QR">
                <button type="submit" class="px-4 py-2 rounded bg-red-500 text-white">Tandai sebagai hadir</button>
            </form>
        </div>
    </div>
</template>


<style>
img[alt="Info icon"] {
    display: none !important;
}

canvas#qr-canvas-visible {
    width: 100% !;
}
</style>

<script setup>
import { Html5QrcodeScanner } from "html5-qrcode";
import { useFetch } from "nuxt/app";

const registrant = ref({});

const scanner = ref(false);
const name = ref('');
const id = ref('');

const openScanner = async (status = true) => {
    scanner.value = status;
    let s = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 240, height: 240 } }, false);
    s.render(async (text, object) => {
        const { data } = await useFetch('/api/scan', {
            method: 'post',
            body: {
                email: text
            }
        });
        s.clear();
        scanner.value = false;
        if (data.value.id) {
            name.value = data.value.name;
            id.value = data.value.id;
        };
    }, (e) => console.log(e));
}

const markAsPresent = async (email) => {
    const { data } = await useFetch('/api/scan', {
        method: 'post',
        body: {
            email: id,
            p: true
        }
    });
    name.value = 'OK, makasih, selanjutnya.';
    id.value = '';
}
</script>
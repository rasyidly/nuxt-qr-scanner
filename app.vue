<template>
  <div>
    <main class="space-y-2 text-center w-full flex flex-col justify-between h-screen gap-y-8">
      <div class="min-h-[400px] grid place-items-center p-4">
        <div v-show="scanner" class=" rounded !border-0 w-full" id="reader"></div>
        <button v-if="!scanner" class="px-4 py-2 rounded border" @click="openScanner">Buka Scanner</button>
      </div>
      <div class="p-4 bg-slate-100 flex-grow h-full grid place-items-center">
        <form @submit.prevent="markAsPresent" class="space-y-3 w-full">
          <h1 class="text-2xl font-bold h-12">{{ result || 'Scan dulu bos' }}</h1>
          <input class="block border bg-slate-50 w-full px-4 py-2 text-center" type="text" v-model="result" placeholder="Silakan isi email atau scan menggunakan QR">
          <button type="submit" class="px-4 py-2 rounded bg-teal-500 text-white">Tandai sebagai hadir</button>
        </form>
      </div>
    </main>
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
import QRCode from 'qrcode';
import { Html5QrcodeScanner } from "html5-qrcode";

const getUser = async (email) => {
  return {
    name: "Rasyid Ridho",
    email: "rasyid@sekeco.id"
  }
};
const markAsPresent = async (email) => {
  result.value = '';
}
const scanner = ref(false);
const result = ref('');

const openScanner = async (status = true) => {
  scanner.value = status;
  let s = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 240, height: 240 } }, false);
  s.render((text, object) => {
    result.value = text;
  }, (e) => console.log(e));
}
</script>
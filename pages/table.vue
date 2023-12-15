<template>
    <table>
        <tbody>
            <tr v-for="(registrant, i) of registrants">
                <td>{{ i + 1 }}</td>
                <td>{{ registrant.id }}</td>
                <td>{{ registrant.name }}</td>
                <td>{{ registrant.p }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { registrants } from '~/db/pulangkampus'
</script>
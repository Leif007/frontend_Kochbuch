<script setup>
import {loadThings} from "@/components/script.js";

loadThings ()
{
    const endpoint = "https://meinkochbuch-backend.onrender.com/kochbuch"
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(thing => {
            this.items.push(thing)
        }))
        .catch(error => console.log('error', error))
}
</script>

<template>

</template>

<style scoped>

</style>
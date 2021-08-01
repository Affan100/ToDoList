<template>
<div>
    <Nuxt />
    <div>
    </div>
</div>
</template>

<script>

export default {
    computed: {
        getToken() {
            return this.$store.getters["login/gettersToken"]
        }
    },

    async mounted() {
        await this.$store.dispatch("login/setToken")
        this.$axios.setToken(this.getToken, 'Bearer')
        // console.log("Token",this.getToken);
    },

}
</script>

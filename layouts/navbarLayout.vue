<template>
  <div class="bg-gray-700 overflow-hidden">
    <div class="p-2">
      <NuxtLink
        class="
          p-2
          border-2
          rounded-lg
          hover:text-white
          text-red-400
          border-red-400
          hover:bg-red-400
          transition
          duration-700
          ease-in-out
        "
        to="/marvel"
        >Click to marvel</NuxtLink
      >
    </div>

    <div class="flex justify-end">
      <div class="">
        <div class="text-white">Welcome, {{ UserData.firstname }}</div>
        <div class="flex justify-center w-1/2">
          <button
            class="
              p-1
              border-2
              rounded-lg
              hover:text-white
              text-red-400
              border-red-400
              hover:bg-red-400
              transition
              duration-700
              ease-in-out
            "
            @click="logout()"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserData: {
        user_id: 0,
        firstname: '-',
        lastname: '-',
      },
    }
  },
  computed: {
    username() {
      return this.$store.getters['login/gettersUsername']
    },
  },
  watch: {
    username(value) {
      this.UserData = value
    },
  },
  created() {
    // this.$store.dispatch("auth/getUsernameFromApi");
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.go('/login')
    },
  },
}
</script>

<style scoped>
</style>

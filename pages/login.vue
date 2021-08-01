<template>
  <div class="bg h-screen">
    <div
      class="
        h-full
        flex
        justify-center
        items-center
        bg-gray-700
        from-purple-300
        via-pink-300
        to-red-300
      "
    >
      <div class="w-1/2 bg-white shadow rounded-lg">
        <div class="flex justify-center py-8">
          <h1 class="text-5xl text-gray-700 font-bold p-5">Login</h1>
        </div>
        <!-- <input type="text" placeholder='Input Me'> -->

        <ValidationObserver ref="form">
          <ValidationProvider
            v-slot="{ errors }"
            name="username"
            rules="required"
          >
            <div class="flex justify-center">
              <input
                v-model="user.username"
                type="text"
                placeholder="Username"
                class="w-10/12 shadow mb-2 px-5 p-2"
              />
            </div>
            <div
              v-if="errors && errors.length > 0"
              class="flex justify-center mb-3 text-red-500"
            >
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="password"
            rules="required"
          >
            <div class="flex justify-center">
              <input
                v-model="user.password"
                type="password"
                placeholder="Password"
                class="w-10/12 md-2 shadow px-5 p-2"
                @keypress.enter="login()"
              />
            </div>
            <div
              v-if="errors && errors.length > 0"
              class="flex justify-center text-red-500"
            >
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <div class="flex justify-center p-4">
            <div class="flex justify-center">
              <button
                class="
                  p-1
                  border-2
                  rounded-lg
                  hover:text-white
                  text-indigo-400
                  border-indigo-400
                  hover:bg-indigo-400
                  transition
                  duration-700
                  ease-in-out
                "
                type="submit"
                @click="login()"
              >
                Login
              </button>
            </div>
          </div>

          <div class="flex justify-center text-sm mb-4">
            <p>
              <span class="text-gray-500">Not registed? </span>
              <span class="text-gray-700 font-bold">
                <NuxtLink to="/register">Create account</NuxtLink>
              </span>
            </p>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'unAuth',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },

  computed: {
    isAccess() {
      return this.$cookie.getters['login/gettersIsAccess']
    },
  },
  methods: {
    async login() {
     await this.$refs.form.validate().then((success) => {
        if (!success) {
          alert('Username or Password Incorrect')
          return
        }
        this.$store.dispatch('login/loginApi', this.user).then(() => {
          this.$router.go('/')
        })
      })
    },
  },
}
</script>

<style scoped>
.heading-primary {
  font-size: 2.5rem;
  font-weight: 800;
  background-image: linear-gradient(to right bottom, #aab7b8, #212f3c);
  -webkit-background-clip: text;
  color: transparent;
  text-transform: uppercase;
}
</style> 

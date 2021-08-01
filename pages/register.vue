<template>
  <div class="bg h-screen">
    <div class="h-full flex justify-center items-center bg-gray-700 shadow">
      <div class="w-1/2 bg-white rounded-lg">
        <div class="flex justify-center py-8">
          <h1 class="text-5xl text-gray-700 font-bold p-5">Register</h1>
        </div>
        <!-- <input type="text" placeholder='Input Me'> -->

        <ValidationObserver ref="form">
          <!-- Input firstname -->
          <ValidationProvider
            v-slot="{ errors }"
            name="firsname"
            rules="required"
          >
            <div class="flex justify-center mb-2">
              <input
                id="firsname"
                v-model="user.firsname"
                type="text"
                name=""
                placeholder="Firstname"
                class="w-10/12 md-2 shadow px-5 p-2"
              />
            </div>
            <div
              v-if="errors && errors.length > 0"
              class="flex justify-center mb-3 text-red-500"
            >
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <!-- Input lastname -->
          <ValidationProvider
            v-slot="{ errors }"
            name="lastname"
            rules="required"
          >
            <div class="flex justify-center mb-2">
              <input
                id="lastname"
                v-model="user.lastname"
                type="text"
                name=""
                placeholder="Lastname"
                class="w-10/12 md-2 shadow px-5 p-2"
              />
            </div>
            <div
              v-if="errors && errors.length > 0"
              class="flex justify-center mb-3 text-red-500"
            >
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <!-- Input Username -->
          <ValidationProvider
            v-slot="{ errors }"
            name="username"
            rules="required"
          >
            <div class="flex justify-center mb-2">
              <input
                v-model="user.username"
                type="text"
                placeholder="Username"
                class="w-10/12 md-2 shadow px-5 p-2"
              />
            </div>
            <div
              v-if="errors && errors.length > 0"
              class="flex justify-center mb-3 text-red-500"
            >
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <!-- Input Confirmed -->
          <ValidationProvider v-slot="{ errors }" vid="confirmation">
            <div class="flex justify-center mb-2">
              <input
                id="password"
                v-model="user.setPassword"
                name=""
                type="password"
                placeholder="Set your password"
                class="w-10/12 md-2 shadow px-5 p-2"
              />
            </div>
            <div
              v-if="errors && errors.length > 0"
              class="flex justify-center mb-3 text-red-500"
            >
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <!-- Input Confirmed -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="confirmed:confirmation"
          >
            <div class="flex justify-center mb-2">
              <input
                id="password"
                v-model="user.confrimPassword"
                name=""
                type="password"
                placeholder="Confrim your password"
                class="w-10/12 md-2 shadow px-5 p-2"
              />
            </div>
            <div
              v-if="errors && errors.length > 0"
              class="flex justify-center mb-3 text-red-500"
            >
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <div class="flex justify-center">
            <div class="flex justify-center">
              <button
                class="
                  mt-2
                  p-2
                  border-2
                  rounded-lg
                  hover:text-white
                  text-yellow-400
                  border-yellow-400
                  hover:bg-yellow-400
                  transition
                  duration-700
                  ease-in-out
                "
                type="submit"
                @click="Submit()"
              >
                <p>Sign Up</p>
              </button>
            </div>
          </div>

          <div class="flex justify-center m-4 text-sm">
            <p>
              <span class="text-gray-500">You already have an account</span>
              <span class="text-gray-700 font-bold">
                <NuxtLink to="/login">Click here!</NuxtLink>
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
  data() {
    return {
      user: {
        firsname: '',
        lastname: '',
        username: '',
        setPassword: '',
        confrimPassword: '',
      },
      submitted: false,
    }
  },
  methods: {
    Submit() {
      this.$refs.form.validate().then((submit) => {
        if (!submit) {
          alert('Incorrect information')
          return
        }
        this.$store.dispatch('register/registerApi', this.user).then(() => {
          this.$router.push('/login')
        })
      })
    },
  },
}
</script>

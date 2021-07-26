<template>
<div class="bg h-screen">
    <div class="h-full flex justify-center items-center">
        <div class="w-1/2 bg-white shadow rounded-sm ">
            <div class="flex justify-center py-8">
                <h1 class="heading-primary">Register</h1>
            </div>
            <!-- <input type="text" placeholder='Input Me'> -->

            <ValidationObserver v-slot="{ handleSub }">
                <from @submit.prevent="handleSub(Submit())">
                    <!-- Input Username -->
                    <ValidationProvider 
                    v-slot="{ error }" 
                    name="firstname" 
                    reules="required"
                    >
                        <div class="flex justify-center">
                            <input 
                            id="firstname" 
                            v-model="user.firstname" 
                            type="text" 
                            name="" 
                            placeholder="Firstname" 
                            class="w-10/12 ">
                        </div>
                        <div v-if="error.length > 0" class="flex justify-center text-red-500">
                            <p>{{ error[0] }}</p>
                        </div>
                    </ValidationProvider>

                    <!-- Input Password -->
                    <ValidationProvider v-slot="{ error }" name="username" reules="required">
                        <div class="flex justify-center">
                            <input v-model="user.password" type="password" placeholder="Password" class="w-10/12 ">
                        </div>
                        <div v-if="error.length > 0" class="flex justify-center text-red-500">
                            <p>{{ error[0] }}</p>
                        </div>
                    </ValidationProvider>
                    <div>
                        <button type="submit">
                            Login
                        </button>
                    </div>
                    <div>
                        <p>
                            <span class="text-gray-500">Not registed</span>Î
                            <span class="text-green">
                                <NuxtLink to="/register">Create account</NuxtLink>
                            </span>Î
                        </p>
                    </div>
                </from>
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
                firstname: "",
                lastname: "",
                username: "",
                setPassword: "",
                confrimPassword: ""
            },
            submitted: false
        };
    },
    methods: {
        Submit() {
            this.$store.dispatch("register/registerApi", this.user)
        }
    }

}
</script>

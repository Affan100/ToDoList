import Vue from 'vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

extend("required", {
    ...rules.required,
    message: "Fill out the information completely."
});

extend('email', rules.email);

extend('confirmed', {
    ...rules.confirmed,
    message: "Incorrect password"
})

extend("alpha", {
    ...rules.alpha,
    message: "This field must only contain alphabetic characters"
});

// Export
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
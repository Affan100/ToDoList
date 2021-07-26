export const state = () => ({

});
export const mutations = {};

export const actions = {
    registerApi(state, payload) {
        this.$axios.$post("/api/register", {
            username: payload.username,
            password: payload.setPassword,
            firsname: payload.firsname,
            lastname: payload.lastname
        }, {
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            alert("Register Successfully")
        })
    }
}
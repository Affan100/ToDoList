export const state = () => ({
    is_access: false,
    username: {
        id_user: 0,
        firstname: "",
        lastname: "",
    },
    access_token: "",
});

export const mutations = {
    Set_Access(state, data) {
        state.is_access = data;
    },
    Set_UserName_From_API(state, data) {
        state.username = data;
    },

    SET_TOKEN(state, data) {
        state.access_token = data;
        // console.log(data);
    },

};
export const actions = {
    async loginApi(state, payload) {
        await this.$axios
            // add
            .$post("http://localhost:8080/api/login", {
                username: payload.username,
                password: payload.password
            }, { headers: { "Content-Type": "application/json" } })
            .then(res => {
                if (res) {
                    // console.log(res.token)
                    localStorage.setItem("accessToken", res.token);
                    state.commit("Set_Access", true);
                }
            }).catch(error => {
                console.log(error);
                alert("username or password Incorrect");
            });
    },
    setToken(state) {
        const accessToken = localStorage.getItem("accessToken");
        state.commit("SET_TOKEN", accessToken)
    },

    async getUserNameFromApi(state, payload) {
        // const accessToken = localStorage.getItem("accessToken");
        await this.$axios
            .$get("http://localhost:8080/api/account", {})
            .then(res => {
                state.commit("Set_UserName_From_API", res);
                // console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export const getters = {
    gettersToken: state => state.access_token,
    gettersIsAccess: state => state.is_access,
    gettersUsername: state => state.username,
}
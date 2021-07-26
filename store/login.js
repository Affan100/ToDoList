export const state = () => ({
    is_access: false,
    username: {
        id_user: 0,
        firstname: "",
        lastname: "",
    },
});

export const mutations = {
    Set_Access(state, data) {
        state.is_access = data;
    },
    Set_UserName_From_API(state, data) {
        state.username = data;
    }
};
export const actions = {
    loginApi(state, payload) {

    },
    getUserNameFromApi(state, payload) {

    }
};

export const getters = {
    gettersIsAccess: state => state.is_access,
    gettersUsername: state => state.username,
}
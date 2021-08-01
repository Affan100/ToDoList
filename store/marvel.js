const md5 = require('md5');

export const state = () => ({
    marvelData: [],
})

export const mutations = {
    SHOW_INFOMATION(state, payload) {
        state.marvelData = payload
    }
}

export const actions = {
    getMarvel(state) {
        const timeStampInMs = Math.round(+new Date() / 1000);

        const publickey = "e6af85a6f1c1abced9a9125e2ce05f18";
        const privatekey = "656cd31cb3c84d54cf3e1cbafe5d709777d9a9cb";
        const result = timeStampInMs + privatekey + publickey;
        const hashapi = md5(result.toString());

        const param = {
            ts: timeStampInMs.toString(),
            apikey: "e6af85a6f1c1abced9a9125e2ce05f18",
            hash: hashapi,
            // limit: 15,
            // offset: 20
        }

        this.$axios
            .$get(`http://gateway.marvel.com/v1/public/characters`, { params: param })
            .then(res => {
                const infomation = res.data.results;
                state.commit("SHOW_INFOMATION", infomation)
                console.log("SHOW Response", infomation);
            })
    },
}
export const getters = {
    gettersMarvel: (state) => state.marvelData
}
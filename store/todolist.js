export const state = () => ({

    todos:
        [
            {
                isEdit: false,
                isChack: false,
                tesk: "Work",
            },
            {
                isEdit: false,
                isChack: false,
                tesk: "Computers",
            },
        ]
})

export const mutations = {

    addTodo(state, payload) {
        const result = { isEdit: false, tesk: payload }
        state.todos.push(result)
        alert("Add Task complete")
    },

    removeTodo(state, payload) {

        state.todos.splice(payload, '1');
    },

    editTodo(state, payload) {
        state.todos = payload

    },
    chackTodo(state, payload){
        state.todos = payload
    }


}
export const getters = {
    gettersTodo: (state) => state.todos
}

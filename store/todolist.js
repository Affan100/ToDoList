// const access_Token = localStorage.getItem("access_Token");

export const state = () => ({
    todos: []
})

export const mutations = {

    addTodo(state, payload) {
        const result = { isEdit: false, tesk: payload }
        state.todos.push(result)
    },

    removeTodo(state, payload) {

        state.todos.splice(payload, '1');
    },

    editTodo(state, payload) {
        const editToDoList = state.todos.map((thing, index) => {
            if (index === payload) {
                return (thing = {
                    is_edited: !thing.is_edited
                })
            } else {
                return thing
            }
        });
        state.todos = editToDoList;
    },

    chackTodo(state, payload) {
        state.todos = payload
    },

    setTaskFromAPI(state, data) {
        if (data !== null) {
            const mutantData = data.map(thing => {
                return (thing = {
                    content: thing.content,
                    is_checked: thing.is_checked,
                    task_id: thing.task_id,
                    is_edited: false
                });
            });
            state.todos = mutantData;
        }
    },
};

export const actions = {
    getToDoListFromAPI(state) {
        this.$axios
            .$get(`/api/dashboard/14`, {
                headers: {
                    Authorization: `Bearer aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
                }
            })
            .then(res => {
                state.commit("setTaskFromAPI", res.data);
            })
    },

    setToDoListFromAPI(state, data) {
        const newtodo = data.newTodos;
        const newTodo = newtodo.map(thing => {
            return (thing = {
                content: thing.content,
                is_checked: thing.is_checked,
            });
        });

        this.$axios
            .$post(`/api/dashboard/14`, {
                data: newTodo
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
                }
            }).then(res => {
                // alert("Add Task Complete")
            })
    },
    async deleteToDoListFromAPI(state, payload) {
        await this.$axios.$delete("api/dashboard/" + payload, {
            headers: {
                Authorization: `Bearer aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
            }
        });
    },
};

export const getters = {
    gettersTodo: (state) => state.todos
}
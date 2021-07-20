<template>
<!-- <Tutorial /> -->
<div class="container">
    <div class="d-flex flex-row justify-content mx-auto">
        <div class="col-md-8">
            <form @submit.prevent="sub">
                <div class="text-center">
                    <h1>TO DO LIST</h1>
                    <input v-model="todo" type="text" placeholder="Add a Todo" class="form-control" />
                    <button type="submit">Add tesk</button>
                </div>
            </form>

            <div class="flex text-center flex-col w-full">
                <div v-for="(todos, index) in todolist" :key="index">
                    <!-- {{ todos.isEdit }} -->

                    <div v-if="todos.isEdit">
                        <input v-model="update" type="text" />
                    </div>

                    <div v-else>
                        <label>{{ todos.tesk }}</label>
                    </div>

                    <!-- Check Function -->
                    <!-- <div v-if="!todos.isChack">
                            <div @click="chackTodo(index)">
                                <i class="fas fa-check"></i>
                            </div>
                        </div> -->
                    <button class="ml-5" @click="editTodo(index, update, todos.isEdit)">Edit</button>
                    <button class="ml-2" @click="removeTodo(index)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    // layout: 'default',
    data() {
        return {
            todo: '',
            isEdit: false,
            isChack: false,
            update: null,
        }
    },
    computed: {
        todolist() {
            return this.$store.getters['todolist/gettersTodo']
        },
    },

    created() {
        // this.todolist = this.$store.getters['todolist/gettersTodo']
    },

    mounted() {},

    methods: {
        sub() {
            if (this.todo) {
                this.$store.commit('todolist/addTodo', this.todo)
                this.todo = ''
            }
        },
        removeTodo(index) {
            this.$store.commit('todolist/removeTodo', index)
        },

        chackTodo(taskindex, todo, chack) {
            const chackToDoList = this.todolist.map((thing, index) => {
                if (index === taskindex) {
                    return (thing = {
                        tesk: todo,
                        isChack: !chack,
                    });
                } else {
                    return thing;
                }
            });
            this.$store.commit('todolist/chackTodo', chackToDoList)

        },

        editTodo(taskindex, todo, edit) {
            this.isEdit = !this.isEdit
            // console.log(edit)
            const editToDoList = this.todolist.map((thing, index) => {
                if (index === taskindex) {
                    return (thing = {
                        tesk: todo,
                        isEdit: !edit,
                    })
                } else {
                    return thing
                }
            })
            // console.log(editToDoList)
            this.$store.commit('todolist/editTodo', editToDoList)
            this.update = null;
        },
    },
}
</script>

<style scoped>
.add {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

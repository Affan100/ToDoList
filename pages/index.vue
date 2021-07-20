<template>
<!-- <Tutorial /> -->
<div class="container p-2">
    <div class="d-flex flex-row justify-content mx-auto">
        <div class="col-md-8">
            <form @submit.prevent="sub">
                <div class="text-center">
                    <h1 class="text-3xl">TO DO LIST</h1>
                    <div class="mb-3 mt-3">
                        <input v-model="todo" type="text" placeholder="Add a Todo" class="rounded form-control bg-gray-200 mt-2 p-1" />
                        <button type="submit" class="rounded bg-blue-500 text-white text-xl p-1">Add tesk</button>
                    </div>
                </div>
            </form>
            <div class="flex justify-center">
                <div class="flex flex-col w-1/2 justify-center  shadow-md bg-blue-50">
                    <div v-for="(todos, index) in todolist" :key="index">
                        <!-- {{ todos.isEdit }} -->
                        <input v-if="todos.isEdit" v-model="update" type="text" class="bg-blue-50 w-3/4"/>
                        <label v-else class="w-3/4">{{ todos.tesk }}</label>
                        <button class="ml-5" @click="editTodo(index, update, todos.isEdit)">Edit</button>
                        <button class="ml-2" @click="removeTodo(index)">Delete</button>
                        
                        
                        
                        
                        <!-- Check Function -->
                        <!-- <div v-if="!todos.isChack">
                        <div @click="chackTodo(taskindex)">
                            <i class="fas fa-check">

                            </i>
                        </div>
                    </div> -->
                        <!-- <button class="ml-5" @click="chackTodo(taskindex, chack)">Check</button> -->
                    </div>
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
            alert("Delete Successfully")
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

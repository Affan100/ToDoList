<template>
  <!-- <Tutorial /> -->
  <div class="container">
    <div class="d-flex flex-row justify-content mx-auto">
      <div class="col-md-8">
        <form @submit.prevent="addTodo">
          <div class="text-center">
            <h1 class="text-3xl">TO DO LIST</h1>
            <div class="mb-3 mt-3">
              <input
                v-model="todo"
                type="text"
                placeholder="Add a Todo"
                class="rounded form-control bg-gray-200 mt-2 p-1"
              />
              <button
                type="submit"
                class="rounded bg-blue-500 text-white text-xl p-1"
              >
                Add tesk
              </button>
            </div>
          </div>
        </form>
        <div class="flex justify-center">
          <div
            class="
              flex flex-col
              w-1/2
              justify-center
              text-center
              shadow-md
              bg-blue-50
            "
          >
            <div v-for="(todos, index) in todolist" :key="index">
              <input
                v-if="todos.is_edited"
                v-model="update"
                type="text"
                class="bg-blue-50 w-3/4"
                @keypress.enter="editTodo(index)"
              />
              <label v-else class="w-3/4">{{ todos.content }}</label>
              <button
                class="ml-3 bg-green-200 rounded"
                @click="editTodo(index)"
              >
                Edit
              </button>

              <button
                class="ml-3 bg-green-200 rounded"
                @click="toggleEdit(index)"
              >
                OpenEdit
              </button>

              <button
                class="ml-2 bg-red-500 rounded"
                @click="removeTodo(todos.task_id)"
              >
                Delete
              </button>

              <!-- Check Function -->
              <!-- <div v-if="!todos.isCheck">
                            <div @click="checkTodo(taskindex)">
                                <i class="fas fa-check"></i>
                            </div>
                        </div>

                        <button class="" @click="checkTodo(taskindex, check)">Check</button>
                    </div> -->
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
      isCheck: false,
      update: null,
    }
  },
  computed: {
    todolist() {
      return this.$store.getters['todolist/gettersTodo']
    },
  },

  async created() {
    await this.getTask()
  },

  methods: {
    async getTask() {
      await this.$store.dispatch('todolist/getToDoListFromAPI')
    },

    async addTodo() {
      const newtodo = {
        content: this.todo,
        is_checked: false,
        is_edited: false,
      }
      const newtodos = [...this.todolist, newtodo]
      if (this.todo) {
        await this.$store.dispatch('todolist/setToDoListFromAPI', {
          newTodos: newtodos,
        })
        await this.getTask()
      }
    },

  async removeTodo(taskindex) {
      await this.$store.dispatch('todolist/deleteToDoListFromAPI', taskindex)
      await this.getTask()
      alert('Delete Successfully')
    },

    // checkTodo(taskindex, todo, check) {
    //     const checkToDoList = this.todolist.map((thing, index) => {
    //         if (index === taskindex) {
    //             return (thing = {
    //                 tesk: todo,
    //                 isCheck: !thing.check,
    //             });
    //         } else {
    //             return thing;
    //         }
    //     });
    //     this.$store.commit('todolist/chackTodo', checkToDoList)

    // },

    async editTodo(taskindex) {
      const editToDoList = this.todolist.map((thing, index) => {
        if (index === taskindex) {
          return (thing = {
            content: this.update,
            is_checked: thing.is_checked,
          })
        } else {
          return thing
        }
      })
      if (this.update) {
        await this.$store.dispatch('todolist/setToDoListFromAPI', {
          newTodos: editToDoList,
        })
      }
    },
    toggleEdit(index) {
      this.$store.commit('todolist/editTodo', index)
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

<template>
  <div
    class="w-full h-screen bg-gray-700 from-purple-300 via-pink-300 to-red-300"
  >
    <!-- Box ToDo App -->
    <div class="d-flex">
      <div class="col-md-8">
        <form @submit.prevent="addTodo">
          <div class="text-center">
            <!-- Title -->
            <h1 class="text-3xl text-gray-300 font-bold p-5">TODO APP</h1>
            <div class="mb-3 mt-3">
              <input
                v-model="todo"
                type="text"
                placeholder="Add a Todo"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-1/2
                  py-2
                  px-3
                  mr-2
                  text-grey-darker
                  focus:outline-none
                  focus:ring
                  focus:border-blue-300
                "
              />
              <div class="pt-3">
                <button
                  type="submit"
                  class="
                    w-1/2
                    p-1
                    border-2
                    rounded
                    border-indigo-400
                    bg-indigo-400
                    text-gray-700
                    antialiased
                    font-bold
                  "
                >
                  Add Todo
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="flex justify-center mt-8 mb-4">
          <h2>ToDo List</h2>
        </div>

        <!-- Output List : Task -->
        <div class="flex justify-center mt-9 w-full">
          <div class="w-1/2 justify-center overflow-y-auto scroll_h">
            <div
              v-for="(todos, index) in todolist"
              :key="index"
              class="
                flex
                mb-4
                items-center
                appearance-none
                border border-gray-300 border-solid
                rounded
                text-gray-300
                py-2
                px-3
                mr-2
                text-grey-darker
                font-semibold
              "
            >
              <input
                v-if="todos.is_edited"
                v-model="update"
                type="text"
                class="
                  w-full
                  p-2
                  rounded-lg
                  text-black
                  focus:outline-none
                  focus:ring
                  focus:border-blue-300

                "
                :placeholder="todos.content"
                @keypress.enter="editTodo(index)"
              />
              <div
                v-else
                class="w-full appearance-none"
                @click="toggleCheck(index)"
              >
                <label :class="`${todos.is_checked ? 'line-through' : ''}`">{{
                  todos.content
                }}</label>
              </div>

              <div v-if="!todos.is_edited">
                <div v-if="!todos.is_checked">
                  <button
                    class="
                      p-1
                      border-2
                      rounded-lg
                      hover:text-white
                      text-indigo-400
                      border-indigo-400
                      hover:bg-indigo-400
                      transition
                      duration-700 ease-in-out
                    "
                    @click="toggleEdit(index)"
                  >
                    OpenEdit
                  </button>
                </div>
              </div>

              <div v-else class="flex">
                <button
                  class="
                    p-1
                    ml-3
                    border-2
                    rounded-lg
                    text-green-400
                    border-green-400
                    hover:text-white
                    hover:bg-green-400
                    transition
                    duration-700
                    ease-in-out
                  "
                  @click="editTodo(index)"
                >
                  Edit
                </button>

                <button
                  class="
                    p-1
                    ml-2
                    border-2
                    rounded-lg
                    hover:text-white
                    text-yellow-400
                    border-yellow-400
                    hover:bg-yellow-400
                    transition
                    duration-700
                    ease-in-out
                  "
                  @click="toggleEdit(index)"
                >
                  Cancel
                </button>
              </div>

              <button
                class="
                  p-1
                  ml-2
                  scale-150
                  rounded
                  text-red-400
                  hover:text-white
                  border-red-400
                  hover:bg-red-400
                  transition
                  ease-in
                  duration-700
                "
                @click="removeTodo(todos.task_id)"
              >
                <!-- Bin -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- template Popup -->
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navbarLayout',
  // middleware: "isAuth",
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
    await this.getUser()
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
          newTodosFormAPI: newtodos,
        })
        await this.getTask()
      }
      this.todo = null
    },

    async removeTodo(taskindex) {
      await this.$store.dispatch('todolist/deleteToDoListFromAPI', taskindex)
      await this.getTask()
      alert('Delete Successfully')
    },

    async toggleCheck(taskindex) {
      const checkTodo = this.todolist.map((thing, index) => {
        if (index === taskindex) {
          if (!thing.is_checked) {
            return (thing = {
              content: thing.content,
              is_edited: thing.is_edited,
              is_checked: !thing.is_checked,
              task_id: thing.task_id,
            })
          } else return thing
        } else {
          return thing
        }
      })
      await this.$store.dispatch('todolist/setToDoListFromAPI', {
        newTodosFormAPI: checkTodo,
      })
      this.getTask()
    },

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
          newTodosFormAPI: editToDoList,
        })
      }
      this.toggleEdit(taskindex)
      this.getTask()
      this.update = null
    },

    toggleEdit(index) {
      this.update = ''
      this.$store.commit('todolist/editedTodo', index)
    },
    getUser(){
      this.$store.dispatch('login/getUserNameFromApi')
    }
  },
}
</script>

<style scoped>
h2 {
  width: 50%;
  display: flex;
  font-size: 22px;
  border-bottom: 2px solid rgba(209, 213, 219);
  padding-bottom: 6px;
  color: rgba(209, 213, 219);
  font-weight: 400;
}
.scroll_h{
    height: 50vh;
}
</style>

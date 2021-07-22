<template>
  <!-- <Tutorial /> -->
  <div class="w-full">
    <div class="d-flex flex-row justify-content mx-auto">
      <div class="col-md-8">
        <form @submit.prevent="addTodo">
          <div class="text-center">
            <h1 class="text-3xl text-grey-darkest p-5">TODO APP</h1>
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
                    border-blue-500
                    text-white
                    bg-blue-500
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

        <div class="flex justify-center mt-9">
          <div class="flex flex-col w-1/2 justify-center">
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
                py-2
                px-3
                mr-2
                text-grey-darker
              "
            >
              <input
                v-if="todos.is_edited"
                v-model="update"
                type="text"
                class="
                  w-full
                  p-2
                  rounded
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
                      rounded
                      hover:text-white
                      text-green-400
                      border-green-400
                      hover:bg-green-400
                      transition
                      duration-700
                      ease-in-out
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
                    rounded
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
                    rounded
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

        <!-- <TransitionRoot as="template" :show="open">
          <Dialog
            as="div"
            static
            class="fixed z-10 inset-0 overflow-y-auto"
            @close="open = false"
            :open="open"
          >
            <div
              class="
                flex
                items-end
                justify-center
                min-h-screen
                pt-4
                px-4
                pb-20
                text-center
                sm:block
                sm:p-0
              "
            >
              <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <DialogOverlay
                  class="
                    fixed
                    inset-0
                    bg-gray-500 bg-opacity-75
                    transition-opacity
                  "
                />
              </TransitionChild>
              <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
                >&#8203;</span
              >
              <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 translate-y-0 sm:scale-100"
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div
                  class="
                    inline-block
                    align-bottom
                    bg-white
                    rounded-lg
                    text-left
                    overflow-hidden
                    shadow-xl
                    transform
                    transition-all
                    sm:my-8
                    sm:align-middle
                    sm:max-w-lg
                    sm:w-full
                  "
                >
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div
                        class="
                          mx-auto
                          flex-shrink-0 flex
                          items-center
                          justify-center
                          h-12
                          w-12
                          rounded-full
                          bg-red-100
                          sm:mx-0
                          sm:h-10
                          sm:w-10
                        "
                      >
                        <ExclamationIcon
                          class="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div
                        class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                      >
                        <DialogTitle
                          as="h3"
                          class="text-lg leading-6 font-medium text-gray-900"
                        >
                          Deactivate account
                        </DialogTitle>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      bg-gray-50
                      px-4
                      py-3
                      sm:px-6
                      sm:flex sm:flex-row-reverse
                    "
                  >
                    <button
                      type="button"
                      class="
                        w-full
                        inline-flex
                        justify-center
                        rounded-md
                        border border-transparent
                        shadow-sm
                        px-4
                        py-2
                        bg-red-600
                        text-base
                        font-medium
                        text-white
                        hover:bg-red-700
                        focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                        sm:ml-3
                        sm:w-auto
                        sm:text-sm
                      "
                      @click="open = false"
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      class="
                        mt-3
                        w-full
                        inline-flex
                        justify-center
                        rounded-md
                        border border-gray-300
                        shadow-sm
                        px-4
                        py-2
                        bg-white
                        text-base
                        font-medium
                        text-gray-700
                        hover:bg-gray-50
                        focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                        sm:mt-0
                        sm:ml-3
                        sm:w-auto
                        sm:text-sm
                      "
                      @click="open = false"
                      ref="cancelButtonRef"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </TransitionChild>
            </div>
          </Dialog>
        </TransitionRoot> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  },
}
</script>

<style scoped>
.add {
  margin-top: 10px;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  width: 50%;
  display: flex;
  font-size: 22px;
  border-bottom: 2px solid gray;
  padding-bottom: 6px;
  color: black;
}
</style>

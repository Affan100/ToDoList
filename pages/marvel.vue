<template>
  <div class="container_bg w-full h-screen">
    <div class="cards p-5">
      <div v-for="(information, index) in inforMation" :key="index">
        <div class="">
          <img
            class="thumbsize rounded-lg"
            :src="information.thumbnail"
            alt=""
          />
        </div>
        <div class="p-4">
          <div
            class="
              uppercase
              tracking-wide
              text-lg text-indigo-500
              font-semibold
            "
          >
            {{ information.name }}
          </div>
          <p class="text-gray-500">
            {{ information.description }}
          </p>
        </div>
      </div>
    </div>
    <!-- pagination -->
    <div class="bg-gray-500 flex justify-center text-white">
      <button type="button">...</button>
      <button type="button" class="ml-4">1</button>
      <button type="button" class="ml-4">>></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inforMation: [],
      page: 1,
      perPage: 9,
      pages: [],
    }
  },

  computed: {
    informations() {
      return this.$store.getters['marvel/gettersMarvel']
    },
  },
  watch: {
    informations(data) {
      this.inforMation = data.map((res) => {
        return {
          characters: res.characters,
          name: res.name,
          thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
          description: res.description,
        }
      })
    },
  },

  async created() {
    await this.getMarvel()
  },

  methods: {
    async getMarvel() {
      await this.$store.dispatch('marvel/getMarvel').then(() => {
        this.inforMation = this.$store.getters['marvel/gettersMarvel']
        console.log('INFORMATION', this.inforMation)
      })
    },

    setPages() {
      const numberOfpages = Math.ceil(this.inforMation.length / this.perPage)
      for (let index = 1; index <= numberOfpages; index++) {
        this.pages.push(index)
      }
    },
  },
}
</script>

<style scoped>
.container_bg {
  background: linear-gradient(to bottom, #1f1f1f, #1b1a1a);
  width: 100%;
  height: 100%;
}
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  padding: 50px;
}
.thumbsize {
  width: 100%;
}
.thumb {
  opacity: 1;
  transform: translateY(0);
}
.thumb::before {
  background-image: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.15) 50%,
    transparent 50%
  );
  content: '';
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 2;
}
.thumb_mask {
  transform: scaleY(0) translate3d(0, 0, 0);
}
</style>
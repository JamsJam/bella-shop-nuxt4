<template>
  <div class="category_header">
    <img v-if="category.image" :src="category.image" alt="" />

    <div v-if="category.name" class="category_header_title">
      <h2>{{ category.name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      currentRoute: '',
    }
  },

  mounted() {
    this.updateHeaderInfo()
  },
  methods: {
    updateHeaderInfo() {
      this.currentRoute = this.$route.path
    },
  },
  computed: {
    categoryLogoPath() {
      return this.images[this.currentRoute] || ''
    },
    pageTitle() {
      return this.titles[this.currentRoute] || "Cette catégorie n'existe pas"
    },
    category() {
      const categoryId = this.$route.query.category_id
      return (
        this.categories.find((cat) => cat.id.toString() === categoryId) || {}
      )
    },
  },
  watch: {
    $route(to, from) {
      this.updateHeaderInfo()
    },
  },
}
</script>

<!-- <style scoped lang="scss">

@use "../../sass/base/" as *;
@use "../../sass/utils/" as *;


.category_header{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 19;
  background-color: #ffffff;
  width: 100%;
  height: 13vh;
  overflow: hidden;

  @media (max-width: 900px) {
    margin-top: 5vh;
  }

  img{
    height: 150%;
    object-fit: cover;
  }
  
  &_title{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: $brown, $alpha: 0.65);

    h2{
      text-transform: uppercase;
      color: $white;
      font-weight: 600;
      line-height: 0.8;
      transition: all ease 0.3s;
      font-size: 3.2vh;
      font-family: 'Montserrat', 'sans-serif';
    }
  }

}

</style> -->

<template>

    <section class="welcome_page" :class="{ 'welcome_page--fullscreen': landing.isFullscreen }">



      <div class="welcome_page_content">

        <div class="welcome_page_content_avatar">
          <div class="welcome_page_content_avatar_image">
            <img :src="landing.image" alt="Avatar bella par defaut">
          </div>
          <div class="welcome_page_content_avatar_bc"></div>
        </div>


        <div class="welcome_page_content_title">
          
          <h1>
            <span>{{ landing.title }}</span>
            <br>
              {{ landing.subtitle }} 
          </h1>

          <p class="welcome_page_content_text" v-html="landing.text"></p>
          <a href="/clothes" class="button--primary">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 19" fill="none">
              <path d="M4.1665 9.5H15.8332M15.8332 9.5L10.8332 4.75M15.8332 9.5L10.8332 14.25"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Commence ton shopping
          </a>

        </div>



      </div>





      

    
    </section>
    

</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { HomepageLandingDTO } from '#shared/dto/homepage.dto.ts'
export default {
  components: {},
  props: {
    section: {
      type: Object as PropType<HomepageLandingDTO | null>,
      default: null,
    },
  },
  computed: {
    landing() {
      return {
        isFullscreen: false,
        title: 'Shop like Bella',
        subtitle: '\n Un personnage à ton image',
        text: 'Découvre notre univers et crée des looks qui te ressemblent.',
        image: '/images/homepage/default_avatar_bella.png',
        ...this.section,
      }
    },
    titleLines() {
      return this.landing.title.split('\n').filter(Boolean)
    },
    subtitleLines() {
      return this.landing.subtitle.split('\n').filter(Boolean)
    },
    textLines() {
      return (this.landing.text ?? '').split('\n').filter(Boolean)
    },
  },
};
</script>

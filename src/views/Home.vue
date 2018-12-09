<template>
    <div class="home">
        <sectors
                v-if="show"
                :categories="categories"
                :lines="lines"
                :seats="seats"
                :sectors="sectors"
        ></sectors>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Sectors from '../components/selectors/Selectors.vue';

  @Component({
    components: {
      sectors: Sectors,
    },

    data() {
      return {
        categories: [],
        lines: [],
        seats: [],
        sectors: [],
        show: false,
      }
    },

    async created() {
      this.resource = this.$resource('js/front/data.js');
      const response = await this.resource.get();
      const result: {
        errorCode: number,
        response: {
          categories: any,
          lines: any,
          seats: any,
          sectors: any
        }
      } = response.body;

      if (result.errorCode === 0) {
        const { categories, lines, seats, sectors } = result.response;
        this.categories = categories;
        this.lines = lines;
        this.seats = seats;
        this.sectors = sectors;
        this.show = true;
      }
    }
  })
  export default class Home extends Vue {
  }
</script>

<template>
    <div class="home">

    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    components: {},

    data() {
      return {
        categories: [],
        lines: [],
        seats: [],
        sectors: []
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
        console.log(categories, lines, seats, sectors);
      }
    }
  })
  export default class Home extends Vue {
  }
</script>

<template>
  <v-select
    class="picker"
    label="display_name"
    :filterable="false"
    :options="options"
    @search="onSearch"
    :value="value"
    @input="onSelect"
  >
    <template slot="no-options">
      type to search for a location
    </template>
    <template slot="option" slot-scope="option">
      {{ option.display_name }}
    </template>
    <template slot="selected-option" slot-scope="option">
      {{ option.display_name }}
    </template>
  </v-select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { debounce } from "lodash";

export interface NominatimResult {
  boundingbox?: Array<string>;
  class?: string;
  display_name: string;
  icon?: string;
  importance?: number;
  lat: string;
  licence?: string;
  lon: string;
  osm_id?: number;
  osm_type?: string;
  place_id?: number;
  type?: string;
}

@Component
export default class LocationPicker extends Vue {
  options: Array<NominatimResult> = [];

  @Prop()
  value: any;

  onSelect(x: NominatimResult) {
    this.$emit("input", x);
  }

  onSearch(search: string, loading: (loading: boolean) => {}) {
    loading(true);
    this.search(loading, search, this);
  }

  search = debounce((loading, search, vm) => {
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&city=${escape(
        search
      )}`
    ).then(res => {
      res.json().then(json => {
        vm.options = json;
      });
      loading(false);
    });
  }, 350);
}

// export Vue.component('location-picker')
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.picker {
  width: 100%;
  min-width: 200px;
  max-width: 50ch;
  margin: 1em;
  flex-grow: 1;
}
</style>

<template>
  <div class="container">
    <h1><span>Sunsets</span> <span>Overlap</span></h1>
    <p>
      Are you living far away from someone but like the romantic idea of
      watching the very same sunset? Enter your location and the location of the
      other person below and you will get a list of the sunsets that both of you
      can watch while being on the phone. All times are displayed in the local
      time of your browser.
    </p>
    <div class="location-pickers">
      <location-picker v-model="firstLocation"></location-picker>

      <location-picker v-model="secondLocation"></location-picker>
    </div>

    <div class="results" v-if="intervals.length">
      Found {{ intervals.length }} shared sunsets:

      <ul>
        <li
          v-for="interval in intervals"
          v-bind:key="interval.start.toLocaleString()"
        >
          {{ interval.start.toLocaleString() }} :
          {{ interval.start.toLocaleString(DateTime.TIME_24_SIMPLE) }} -
          {{ interval.end.toLocaleString(DateTime.TIME_24_SIMPLE) }}
        </li>
      </ul>
    </div>

    <div class="results no-results" v-if="!intervals.length">
      Unfortunately, there are no shared sunsets for theses locations. <br />
      Maybe it is time for one of you to visit the other?
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { calculateDays, Location } from "@/calc";
import { Interval, DateTime } from "luxon";
import LocationPicker, {
  NominatimResult
} from "@/components/LocationPicker.vue";

@Component({
  components: { LocationPicker }
})
export default class SunsetsApp extends Vue {
  intervals: Array<Interval>;
  DateTime: typeof DateTime;
  firstLocation: NominatimResult = {
    display_name: "Berlin, Germany",
    lat: "52.4642",
    lon: "13.3494"
  };
  secondLocation: NominatimResult = {
    display_name: "Saint Denis, Réunion, France",
    lat: "-21.098",
    lon: "55.4397"
  };

  constructor() {
    super();
    this.intervals = [];
    this.DateTime = DateTime;
  }

  @Watch("firstLocation")
  @Watch("secondLocation")
  onLocationsChanged(): void {
    if (
      !this.firstLocation ||
      !this.firstLocation.lat ||
      !this.secondLocation ||
      !this.secondLocation.lat
    ) {
      return;
    }

    const firstCoordinates: [number, number] = [
      parseFloat(this.firstLocation.lat),
      parseFloat(this.firstLocation.lon)
    ];
    const secondCoordinates: [number, number] = [
      parseFloat(this.secondLocation.lat),
      parseFloat(this.secondLocation.lon)
    ];

    this.intervals = calculateDays(firstCoordinates, secondCoordinates);
  }

  created(): void {
    this.onLocationsChanged();
  }
}
</script>

<style scoped>
.container {
  max-width: 120ch;
}
h3 {
  margin: 40px 0 0;
}

.location-pickers {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

h1 {
  font-size: 3em;
  background: -webkit-linear-gradient(#6b35a2, #f6e260);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1 span:nth-child(2) {
  margin-left: -0.5ch;
}

p {
  max-width: 60ch;
}

.results {
  margin-top: 1em;
}

.results ul {
  column-width: 30ch;
}

.no-results {
  max-width: 60ch;
}
</style>

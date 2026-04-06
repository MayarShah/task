import { defineStore } from "pinia";
import type { Color } from "~/types/Color";
import type { Motiv } from "~/types/Motiv";

export const useOrderStore = defineStore("order", {
  state: () => ({
    color: null as Color | null,
    motiv: null as Motiv | null,
    colors: [] as Color[],
    motives: [] as Motiv[],
    initialized: false,
  }),

  getters: {
    totalPrice: (state): number => {
      const total = (state.color?.price ?? 0) + (state.motiv?.price ?? 0);
      return Math.round(total * 100) / 100;
    },
  },

  actions: {
    setColor(color: Color) {
      this.color = color;
    },

    setMotiv(motiv: Motiv) {
      this.motiv = motiv;
    },

    setColors(colors: Color[]) {
      this.colors = colors;
    },

    setMotives(motives: Motiv[]) {
      this.motives = motives;
    },

    async init() {
      if (this.initialized) return;

      const [{ data: colorsData }, { data: motivesData }] = await Promise.all([
        useFetch<Color[]>("/api/colors"),
        useFetch<Motiv[]>("/api/motives"),
      ]);

      if (colorsData.value && motivesData.value) {
        this.setColors(colorsData.value);
        this.setMotives(motivesData.value);

        this.setColor(colorsData.value[0]);
        this.setMotiv(motivesData.value[0]);

        this.initialized = true;
      }
    },

    resetOrder() {
      this.color = this.colors[0] ?? null;
      this.motiv = this.motives[0] ?? null;
    },
  },
});

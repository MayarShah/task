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
    resetOrder() {
      this.color = this.colors[0] ?? null;
      this.motiv = this.motives[0] ?? null;
    },
  },
});

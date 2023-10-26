export interface Param {
  title: string;
  value: string;
  options: {
    type: "number" | "select" | "slider" | "boolean";
    values?: string[];
    min?: number;
    max?: number;
  };
}

export const params: Param[] = [
  {
    title: "Girar",
    value: "flip",
    options: { type: "select", values: ["h", "v", "hv"] },
  },
  {
    title: "Orientación",
    value: "orient",
    options: {
      type: "select",
      values: ["1", "2", "3", "4", "5", "6", "7", "8", "90", "180", "270"],
    },
  },
  {
    title: "Rotación",
    value: "rot",
    options: { type: "slider", min: 0, max: 365 },
  },
  {
    title: "Brillo",
    value: "bri",
    options: { type: "slider", min: -100, max: 100 },
  },
  {
    title: "Contraste",
    value: "con",
    options: { type: "slider", min: -100, max: 100 },
  },
  {
    title: "Exposición",
    value: "exp",
    options: { type: "slider", min: -100, max: 100 },
  },
  {
    title: "Gama",
    value: "gam",
    options: { type: "slider", min: -100, max: 100 },
  },
  {
    title: "Highlight",
    value: "high",
    options: { type: "slider", min: -100, max: 0 },
  },
  {
    title: "Hue",
    value: "hue",
    options: { type: "slider", min: 0, max: 359 },
  },
  {
    title: "Invertir",
    value: "invert",
    options: { type: "boolean" },
  },
  {
    title: "Saturación",
    value: "sat",
    options: { type: "slider", min: -100, max: 100 },
  },
  {
    title: "Sombra",
    value: "shad",
    options: { type: "slider", min: 0, max: 100 },
  },
  {
    title: "Sharpen",
    value: "sharp",
    options: { type: "slider", min: 0, max: 100 },
  },
  {
    title: "Unsharp Mask",
    value: "usm",
    options: { type: "slider", min: -100, max: 100 },
  },
  {
    title: "Unsharp Mask Radius",
    value: "usmrad",
    options: { type: "slider", min: 0, max: 500 },
  },
  {
    title: "Vibrance",
    value: "vib",
    options: { type: "slider", min: -100, max: 100 },
  },
];

// Tailwind CSS plugin for Spindrift
module.exports = function spindriftPlugin({ addComponents }) {
  addComponents({
    ".spindrift": {
      "@apply border border-dashed border-red-500": {},
      "--spindrift-borders": "1",
    },
    ".spindrift *": {
      "@apply border border-dashed border-red-500": {},
    },
    ".spindrift-stop": {
      "--spindrift-borders": "0",
    },
    ".spindrift-stop *": {
      border: "none !important",
    },
  });
};

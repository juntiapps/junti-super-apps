export const display = (x) => {
  if (x) return "Rp " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const displayInput = (x) => {
  if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

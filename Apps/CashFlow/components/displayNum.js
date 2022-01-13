export const display = (x) => {
  if (x!==0) return "Rp " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  else return 0
};

export const displayInput = (x) => {
  if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

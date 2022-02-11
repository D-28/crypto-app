export const formatNumber = (stringNumber) => {
  return (
    "$" +
    Number(stringNumber)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
};

export const formatDate = (epoch) => {
  return new Date(epoch * 1000).toLocaleString().split(",")[0];
};

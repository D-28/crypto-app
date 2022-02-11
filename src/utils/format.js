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

export const getMonthFromDate = (epoch) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return month[new Date(epoch * 1000).getMonth()];
};

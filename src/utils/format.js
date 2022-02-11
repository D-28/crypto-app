import _ from "lodash";

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

export const aggregateMonthlyIntervals = (data) => {
  var monthNames = [
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

  var map_result = _.map(data, function (item) {
    var d = new Date(new Number(item.date * 1000));
    var month = monthNames[d.getMonth()] + ", " + d.getFullYear();
    return {
      Month: month,
      totalLiquidityUSD: Number(item.totalLiquidityUSD),
    };
  });
  var result_temp = _.reduce(
    map_result,
    function (memo, item) {
      if (memo[item.Month] === undefined) {
        memo[item.Month] = Number(item.totalLiquidityUSD);
      } else {
        memo[item.Month] += Number(item.totalLiquidityUSD);
      }
      return memo;
    },
    {}
  );
  var result = _.map(result_temp, function (value, key) {
    return {
      Month: key,
      totalLiquidityUSD: value,
    };
  });
  return result;
};

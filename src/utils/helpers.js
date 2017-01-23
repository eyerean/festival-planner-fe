const getCurrentFiscalYear = () => {
  const today = new Date();
  const curr_year = today.getFullYear();
  const curr_month = today.getMonth() + 1;
  return (curr_month < 5 ? curr_year - 1 : curr_year);
}

export default {
  getCurrentFiscalYear
};
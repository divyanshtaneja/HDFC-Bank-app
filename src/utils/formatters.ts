export const formatIndianCurrency = (amount: string | number): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
  const [wholePart, decimalPart] = numAmount.toFixed(2).split('.');
  
  if (numAmount < 1000) {
    // For amounts less than 1000, don't use any separators
    return `₹ ${wholePart}.${decimalPart}`;
  }

  const lastThree = wholePart.substring(wholePart.length - 3);
  const otherNumbers = wholePart.substring(0, wholePart.length - 3);
  const formattedWholePart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  return `₹ ${formattedWholePart}.${decimalPart}`;
}

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
}

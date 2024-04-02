export function formatPrice(
  price: number,
  options: {
    currency?: "USD" | "INR" | "EUR" | "GBP";
    notation?: Intl.NumberFormatOptions["notation"];
  }
) {
  const { currency = "USD", notation = "compact" } = options;

  const numberPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: notation,
    maximumFractionDigits: 2,
  }).format(numberPrice);
}

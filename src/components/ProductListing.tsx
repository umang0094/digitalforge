"use client";
import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "./config";
import { formatPrice } from "@/lib/customUtils";
import ImageSlider from "./ImageSlider";

interface ProductListingProps {
  product: Product | null;
  index: number;
}
const ProductListing = (props: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, props.index * 75);

    return () => clearTimeout(timer);
  }, [props.index]);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === props.product?.category
  )?.label;

  const imageUrls = props.product?.images
    .map(({ image }) => (typeof image == "string" ? image : image.url))
    .filter(Boolean);

  if (!props.product || !isVisible) return <ProductPlaceHolder />;

  if (isVisible && props.product) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group-main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/product/${props.product.id}`}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={imageUrls as string[]} />
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {props.product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(props.product.price, {})}
          </p>
        </div>
      </Link>
    );
  }
};

const ProductPlaceHolder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-50 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};
export default ProductListing;

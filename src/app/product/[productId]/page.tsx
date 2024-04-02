import AddToCartButton from "@/components/AddToCartButtom";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/components/config";
import { getPlayloadClient } from "@/get-Playload-Client";
import { formatPrice } from "@/lib/customUtils";
import { ArrowLeft, Check, ChevronRight, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string;
  };
}
const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 1, name: "Products", href: "/product" },
];
const Page = async ({ params }: PageProps) => {
  const payload = await getPlayloadClient({});
  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: params.productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });
  const [product] = products;

  if (!product) return notFound();
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value == product?.category
  )?.label;
  const imageUrls = product?.images
    .map(({ image }) => (typeof image == "string" ? image : image.url))
    .filter(Boolean);
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((item, i) => (
                <li key={i}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={item.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tighter text-gray-90 sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <section className="mt-6">
              <div className="flex items-center">
                <p className="font-medium text-gray-700">
                  {formatPrice(product.price, {})}
                </p>

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-3 text-sm text-muted-foreground">
                  eligible for instant delivery
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={imageUrls as string[]} />
            </div>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div className="mt-10">
              <AddToCartButton product={product} />
            </div>
            <div className="mt-6 text-center">
              <div className="group inline-flex text-sm text-medium">
                <Shield
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                />
                <span className="text-muted-foreground hover:text-gray-700">
                  30 day return Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${label}`}
        description={`Browser similar high quality ${label} just like ${product.name}`}
      />
    </MaxWidthWrapper>
  );
};

export default Page;

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Stripe from "stripe";

export default function HeroBanner({
  products,
}: {
  products: Stripe.Product[];
}) {
  return (
    <section className="relative w-full bg-gradient-to-br from-neutral-50 to-neutral-200">
      <div className="container mx-auto flex flex-col-reverse items-center px-6 py-12 md:flex-row md:gap-16">
        {/* Left: Text + CTA */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 leading-tight">
            Wear Your Style
          </h1>
          <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-md mx-auto md:mx-0">
            Explore our latest collection of premium t-shirts in timeless black
            & white. Comfortable, stylish, and made to last.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-base md:text-lg font-medium text-white hover:bg-neutral-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>

        {/* Right: Carousel */}
        <div className="flex-1 flex justify-center items-center w-full mb-8 md:mb-0">
          <Carousel
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={product.id} className="flex justify-center">
                  <Link
                    href={`/products/${product.id}`}
                    className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[500px] md:w-[500px] block"
                  >
                    <Image
                      src={product.images?.[0]}
                      alt={product.name}
                      fill
                      className="object-cover drop-shadow-xl rounded-lg"
                      priority={index === 0}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

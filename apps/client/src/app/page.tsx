import ProductList from "@/components/ProductList";
import Image from "next/image";
import { Store } from "lucide-react";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      {/* Virtual Mall CTA Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-6 px-4 mb-8 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Store className="w-8 h-8 animate-pulse" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Experience Virtual Shopping
              </h2>
              <p className="text-sm md:text-base text-white/90">
                Try on products in our immersive 3D mall experience
              </p>
            </div>
          </div>
          <a
            href="https://virtualtryonv.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 px-8 py-3 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center gap-2 whitespace-nowrap"
          >
            <Store className="w-5 h-5" />
            Enter the Mall
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Featured Product Banner */}
      <div className="relative aspect-3/1 mb-12 rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/featured2.png"
          alt="Featured Product"
          fill
          className="object-cover"
        />
      </div>

      {/* Product List */}
      <ProductList category={category} params="homepage" />
    </div>
  );
};

export default Homepage;
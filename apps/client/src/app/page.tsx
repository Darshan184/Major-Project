import ProductList from "@/components/ProductList";
import Image from "next/image";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      <div className="relative aspect-3/1 mb-12">
        <Image src="/featured2.png" alt="Featured Product" fill />
      </div>
      <ProductList category={category} params="homepage" />
      <a href="https://wearversetryon.netlify.app/">Enter the Mall</a>
    </div>
  );
};

export default Homepage;

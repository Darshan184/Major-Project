import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

const products = [
    {
        name: "Gryffindor Wizard Robe",
        shortDescription: "Classic wizard robe with Gryffindor house colors",
        description: "Classic wizard robe with Gryffindor house colors - burgundy and gold trim. Perfect for magical adventures.",
        price: 12999, // Price in cents (129.99)
        sizes: ["S", "M", "L", "XL"],
        colors: ["burgundy", "gold"],
        images: {
            burgundy: "/products/dress1.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },
    /*{
        name: "Professional Business Dress",
        shortDescription: "Elegant two-tone dress for office wear",
        description: "Elegant two-tone dress with white blouse top and black pencil skirt. Perfect for office wear.",
        price: 8999,
        sizes: ["XS", "S", "M", "L"],
        colors: ["black", "white"],
        images: {
            blackwhite: "/products/dress2.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },*/
    {
        name: "Plaid Casual Dress",
        shortDescription: "Stylish plaid shirt dress with denim skirt",
        description: "Stylish plaid shirt dress with denim skirt combination. Comfortable for everyday wear.",
        price: 7999,
        sizes: ["S", "M", "L"],
        colors: ["plaid", "denim"],
        images: {
            plaid: "/products/dress3.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },
    {
        name: "Classic Business Casual Set",
        shortDescription: "Professional white shirt with navy chinos",
        description: "Professional white button-down shirt with navy blue chinos. Perfect for business casual settings.",
        price: 9599,
        sizes: ["S", "M", "L", "XL"],
        colors: ["white", "navy"],
        images: {
            white: "/products/dress4.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },
    {
        name: "Floral Summer Co-ord Set",
        shortDescription: "Light and breezy floral print set",
        description: "Light and breezy floral print crop top and shorts set. Perfect for summer outings.",
        price: 5499,
        sizes: ["XS", "S", "M"],
        colors: ["floral", "white"],
        images: {
            floral: "/products/dress5.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },
    /*{
        name: "Athletic Varsity Outfit",
        shortDescription: "Sporty varsity jacket with joggers",
        description: "Sporty varsity jacket with white body and black sleeves paired with blue joggers.",
        price: 10999,
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["white", "black", "blue"],
        images: {
            varsity: "/products/dress6.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },*/
    {
        name: "Office Professional Dress",
        shortDescription: "Sophisticated gray blazer-style dress",
        description: "Sophisticated gray blazer-style dress with black skirt. Elegant and professional.",
        price: 9999,
        sizes: ["XS", "S", "M", "L"],
        colors: ["gray", "black"],
        images: {
            gray: "/products/dress7.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },
    {
        name: "Casual Leather Jacket Set",
        shortDescription: "Trendy brown leather jacket set",
        description: "Trendy brown leather jacket with white tee and black pants. Perfect for casual outings.",
        price: 14999,
        sizes: ["S", "M", "L", "XL"],
        colors: ["brown", "white", "black"],
        images: {
            brown: "/products/female1.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },
    {
        name: "All Black Casual Set",
        shortDescription: "Sleek all-black minimalist outfit",
        description: "Sleek all-black outfit with long shirt and fitted pants. Minimalist and stylish.",
        price: 8499,
        sizes: ["S", "M", "L", "XL"],
        colors: ["black"],
        images: {
            black: "/products/female2.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "clothing" },
                create: { name: "Clothing", slug: "clothing" }
            }
        }
    },
    {
        name: "Medical Scrubs Set",
        shortDescription: "Professional navy blue medical scrubs",
        description: "Professional navy blue medical scrubs with comfortable fit. Perfect for healthcare workers.",
        price: 6499,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["navy"],
        images: {
            navy: "/products/female3.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "uniforms" },
                create: { name: "Uniforms", slug: "uniforms" }
            }
        }
    },
    /* {
         name: "Urban Streetwear Set",
         shortDescription: "Modern streetwear with hooded jacket",
         description: "Modern streetwear with black and gray hooded jacket and pants. Comfortable and stylish.",
         price: 11999,
         sizes: ["M", "L", "XL", "XXL"],
         colors: ["black", "gray"],
         images: {
             blackgray: "/products/female4.jpg"
         },
         category: {
             connectOrCreate: {
                 where: { slug: "clothing" },
                 create: { name: "Clothing", slug: "clothing" }
             }
         }
     },*/
    {
        name: "Jedi Master Tunic",
        shortDescription: "Traditional Jedi-style cream tunic",
        description: "Traditional Jedi-style cream tunic with brown belt and burgundy boots. May the Force be with you!",
        price: 13999,
        sizes: ["M", "L", "XL"],
        colors: ["cream", "brown"],
        images: {
            cream: "/products/female5.jpg"
        },
        category: {
            connectOrCreate: {
                where: { slug: "costumes" },
                create: { name: "Costumes", slug: "costumes" }
            }
        }
    }
];

async function main() {
    console.log('🗑  Clearing existing products...');

    // Delete all products first
    await prisma.product.deleteMany();
    console.log('✅ Cleared all products');
    console.log('🌱 Starting to seed products...');

    for (const product of products) {
        try {
            await prisma.product.create({
                data: product
            });
            console.log(`✅ Created: ${product.name}`);
        } catch (error) {
            console.error(`❌ Failed to create ${product.name}:`, error);
        }
    }

    console.log(`✅ Seeding complete! Added ${products.length} products.`);
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
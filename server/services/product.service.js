import axios from "axios";

// export const fetchProducts = async (searchQuery) => {
//   try {
//     console.log("🔥 API SEARCH QUERY:", searchQuery);

//     const response = await axios.get(
//       "https://clarins-australia-product-data-api.p.rapidapi.com/clarins/search",
//       {
//         params: {
//           query: searchQuery,
//           page: 1,
//           limit: 20,
//           sort: "relevance",
//         },
//         headers: {
//           "X-RapidAPI-Key": process.env.RAPID_API_KEY,
//           "X-RapidAPI-Host":
//             "clarins-australia-product-data-api.p.rapidapi.com",
//         },
//       }
//     );

//     console.log("🔥 RAW API RESPONSE:", response.data);

//     const products = response.data?.results || [];

//     console.log("🔥 TOTAL PRODUCTS FOUND:", products.length);

//     // ✅ CORRECT MAPPING
//     const normalizedProducts = products.map((p, index) => ({
//       id: p.id || index,
//       name: p.name || "No name",
//       price: p.price || 0,
//       image: p.image || "",
//       rating: p.rating || 0,
//       brand: p.brand || "Unknown",
//       description: p.slug || "",
//       url: p.source_url || "",
//     }));

//     console.log("🔥 FINAL NORMALIZED PRODUCTS:", normalizedProducts);

//     return normalizedProducts;
//   } catch (error) {
//     console.log("❌ RapidAPI Product Error:", error.message);
//     return [];
//   }
// };

// import axios from "axios";


export const fetchAmazonProducts = async (query) => {
  try {
    const res = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "amazon",
        k: query,
        api_key: process.env.SERP_API_KEY,
        amazon_domain: "amazon.in", // 🔥 IMPORTANT for India
      },
    });

    const results = res.data.organic_results || [];

    return results.map((p) => ({
      id: p.position,
      name: p.title,
      price: parseFloat(p.price?.replace(/[^\d.]/g, "")) || 0,
      image: p.thumbnail,
      rating: p.rating || 0,
      brand: p.brand || "Unknown",
      description: p.title,
      url: p.link,
    }));
  } catch (err) {
    console.log("❌ Amazon API Error:", err.response?.data || err.message);
    return [];
  }
};

/* ------------------ PRICE CLEANER ------------------ */
function extractPrice(priceString) {
  if (!priceString) return 0;

  const num = priceString.replace(/[^\d]/g, "");
  return Number(num) || 0;
}
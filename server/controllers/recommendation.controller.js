import User from "../models/user.model.js";
import RecommendationHistory from "../models/history.model.js";
import { openai } from "../utils/openai.js";
import Routine from "../models/routine.model.js";
import { getWeather, getForecast } from "../services/weather.service.js";
import { fetchAmazonProducts } from "../services/product.service.js"; // RapidAPI
import { getAQI } from "../services/aqi.service.js";
import { getCoordinates } from "../services/location.service.js";



// const productSynonyms = {
//   sunscreen: ["spf", "sunblock", "uv protection", "day cream"],
//   moisturizer: ["cream", "lotion", "hydrating", "gel"],
//   serum: ["essence", "concentrate"],
//   cleanser: ["face wash", "foam", "face cleanser"],
//   "hair care": ["shampoo", "conditioner", "hair treatment", "hair mask"],
//   "skin care": ["face cream", "body lotion", "skin treatment"]
// };

// function filterByConcern(products, recommendation) {
//   const productType = recommendation.productType?.toLowerCase() || "";
//   const ingredients = recommendation.ingredients || [];
  
//   if (!products || products.length === 0) return [];
  
//   return products.filter((p) => {
//     const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
    
//     // product type match
//     const typeMatch = productType && text.includes(productType);
    
//     // ingredient match
//     const ingredientMatch = ingredients.some((ing) => {
//       const ingName = ing.name?.toLowerCase() || '';
//       return ingName && text.includes(ingName);
//     });
    
//     return typeMatch || ingredientMatch;
//   });
// }

// function buildSearchQuery(recommendation) {
//   const productType = recommendation.productType?.toLowerCase() || "skincare";
  
//   let queryParts = [productType];
  
//   // synonyms
//   if (productSynonyms[productType]) {
//     queryParts.push(...productSynonyms[productType]);
//   }
  
//   // ingredients (top 3)
//   const ingredients = recommendation.ingredients
//     ?.slice(0, 3)
//     .map((i) => i.name?.toLowerCase())
//     .filter(Boolean);
  
//   if (ingredients?.length) {
//     queryParts.push(...ingredients);
//   }
  
//   // Remove duplicates and join
//   const uniqueParts = [...new Set(queryParts)];
//   return uniqueParts.join(" ");
// }

// function filterByGender(products, gender = "unisex") {
// //   console.log(" Applying Gender Filter:", gender);
  
//   if (!products || products.length === 0) return [];
  
//   if (gender === "male") {
//     const maleProducts = products.filter((p) => {
//       const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
//       return text.includes("men") || text.includes("male") || text.includes("for him");
//     });
    
//     // console.log("👨 Male Products Found:", maleProducts.length);
    
//     // 🔥 If 0 found → fallback to all products
//     return maleProducts.length > 0 ? maleProducts : products;
//   }
  
//   if (gender === "female") {
//     const femaleProducts = products.filter((p) => {
//       const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
//       // Exclude products specifically for men
//       return !text.includes("men") && !text.includes("male") && !text.includes("for him");
//     });
    
//     // console.log("👩 Female Products Found:", femaleProducts.length);
    
//     // 🔥 If 0 found → fallback to all products
//     return femaleProducts.length > 0 ? femaleProducts : products;
//   }
  
//   return products;
// }

// function filterByBudget(products, budget) {
//   if (!budget || !products || products.length === 0) return products;
  
//   const budgetNum = Number(budget);
//   if (isNaN(budgetNum)) return products;
  
//   return products.filter((p) => {
//     const price = p.price ? Number(p.price) : Infinity;
//     return price <= budgetNum;
//   });
// }

// export const getSkincareRecommendation = async (req, res) => {
//   const userId = req.userId;

//   try {
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const {
//       location,
//       skinType,
//       budget,
//       concerns,
//       category,
//       productGoal,
//       gender,
//     } = req.body;

//     // Validate required fields
//     if (!location || !skinType || !concerns || !concerns.length) {
//       return res.status(400).json({
//         message: "location, skinType and concerns are required",
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { lat, lon } = await getCoordinates(location);

//     const [weather, forecast, aqiData] = await Promise.all([
//       getWeather(location),
//       getForecast(location),
//       getAQI({ lat, lon }),
//     ]);

//     const aqi = aqiData?.aqi || 50;

//     const aiPrompt = {
//       weather: weather,
//       aqi: aqi,
//       skinType: skinType,
//       concerns: concerns,
//       productGoal: productGoal || [],
//       gender: gender || "unisex",
//       category: category || "skin care"
//     };

//     // console.log("AI Prompt:", JSON.stringify(aiPrompt, null, 2));

//     const aiResponse = await openai.chat.completions.create({
//       model: "meta-llama/llama-3-8b-instruct",
//       messages: [
//         {
//           role: "system",
//           content: `
// You are a skincare and haircare expert.

// Return STRICT JSON ONLY with NO markdown, NO extra text:

// {
//   "productType": "string (e.g., moisturizer, serum, sunscreen, shampoo, conditioner)",
//   "ingredients": [
//     { "name": "string", "why": "string" }
//   ],
//   "avoid": [
//     { "name": "string", "whyAvoid": "string" }
//   ],
//   "homeRemedies": [
//     {
//       "name": "string",
//       "steps": ["string", "string", "string"],
//       "benefits": "string",
//       "whyItWorks": "string"
//     }
//   ]
// }
//           `,
//         },
//         {
//           role: "user",
//           content: JSON.stringify(aiPrompt),
//         },
//       ],
//     });

//     let recommendation = {};

//     try {
//       let text = aiResponse.choices[0].message.content || "";
//       console.log("🤖 Raw AI Response:", text);

//       text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      
//       const start = text.indexOf("{");
//       const end = text.lastIndexOf("}");
      
//       if (start !== -1 && end !== -1) {
//         recommendation = JSON.parse(text.slice(start, end + 1));
//       }
//     } catch (parseError) {
//       console.error("Failed to parse AI response:", parseError);
//       recommendation = {};
//     }

//     recommendation = {
//       productType: recommendation.productType || productGoal?.[0] || "moisturizer",
//       ingredients: (recommendation.ingredients || []).map((i) =>
//         typeof i === "string"
//           ? { name: i, why: "Good for your skin condition" }
//           : { name: i.name || "", why: i.why || "Beneficial for your skin" }
//       ),
//       avoid: (recommendation.avoid || []).map((i) =>
//         typeof i === "string"
//           ? { name: i, whyAvoid: "May harm your skin" }
//           : { name: i.name || "", whyAvoid: i.whyAvoid || "May cause irritation" }
//       ),
//       homeRemedies: (recommendation.homeRemedies || []).map((r) => ({
//         name: r.name || "",
//         steps: Array.isArray(r.steps) ? r.steps : [],
//         benefits: r.benefits || "",
//         whyItWorks: r.whyItWorks || "",
//       })),
//     };

//     const searchQuery = buildSearchQuery({
//       ...recommendation,
//       productType: recommendation.productType,
//     });
    
//     console.log("🔍 FINAL SEARCH QUERY:", searchQuery);

//     let products = await fetchAmazonProducts(searchQuery);
//     console.log(`📦 Fetched ${products?.length || 0} products from Amazon`);

//     if (!products || products.length === 0) {
//       console.log("⚠️ No products found, trying fallback...");
//       products = await fetchFallbackProducts(searchQuery);
//     }

//     if (!products || products.length === 0) {
//       return res.json({
//         weather,
//         aqi,
//         recommendation,
//         products: [],
//         message: "No products found matching your criteria"
//       });
//     }

//     let filteredProducts = [...products];

//     // 1. Filter by concern/ingredients
//     filteredProducts = filterByConcern(filteredProducts, recommendation);
//     console.log(`🎯 After concern filter: ${filteredProducts.length} products`);

//     // 2. Fallback if no products match
//     if (filteredProducts.length === 0) {
//       console.log("⚠️ No products after concern filter, using all products");
//       filteredProducts = [...products];
//     }

//     // 3. Filter by gender
//     filteredProducts = filterByGender(filteredProducts, gender);
//     console.log(`👥 After gender filter: ${filteredProducts.length} products`);

//     // 4. Filter by budget
//     filteredProducts = filterByBudget(filteredProducts, budget);
//     console.log(`💰 After budget filter: ${filteredProducts.length} products`);

//     // 5. Sort by rating and price
//     const finalProducts = filteredProducts
//       .sort((a, b) => {
//         // Sort by rating (higher first), then by price (lower first)
//         const ratingDiff = (b.rating || 0) - (a.rating || 0);
//         if (ratingDiff !== 0) return ratingDiff;
//         return (a.price || Infinity) - (b.price || Infinity);
//       })
//       .slice(0, 10);

//     console.log(`✅ Final products: ${finalProducts.length} products returned`);

//     /* ------------------ SAVE TO HISTORY ------------------ */
//     await RecommendationHistory.create({
//       userId,
//       input: {
//         location,
//         skinType,
//         concerns,
//         budget: budget || null,
//         category: category || null,
//         gender: gender || null,
//         productGoal: productGoal || []
//       },
//       environment: { weather, forecast, aqi },
//       result: recommendation,
//       searchQuery,
//       productsCount: finalProducts.length
//     });

//     /* ------------------ RESPONSE ------------------ */
//     return res.json({
//       success: true,
//       weather,
//       aqi,
//       recommendation,
//       searchQuery,
//       products: finalProducts,
//       totalProductsFound: products.length,
//       filtersApplied: {
//         concern: filteredProducts.length !== products.length,
//         gender: gender !== "unisex",
//         budget: !!budget
//       }
//     });

//   } catch (error) {
//     console.error(" Error in getSkincareRecommendation:", error);
//     return res.status(500).json({ 
//       message: error.message,
//       success: false 
//     });
//   }
// };

const productSynonyms = {
  sunscreen: ["spf", "sunblock", "uv protection", "day cream"],
  moisturizer: ["cream", "lotion", "hydrating", "gel"],
  serum: ["essence", "concentrate"],
  cleanser: ["face wash", "foam", "face cleanser"],
  "hair care": ["shampoo", "conditioner", "hair treatment", "hair mask"],
  "skin care": ["face cream", "body lotion", "skin treatment"]
};

function filterByConcern(products, recommendation) {
  const productType = recommendation.productType?.toLowerCase() || "";
  const ingredients = recommendation.ingredients || [];
  
  if (!products || products.length === 0) return [];
  
  return products.filter((p) => {
    const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
    
    // product type match
    const typeMatch = productType && text.includes(productType);
    
    // ingredient match
    const ingredientMatch = ingredients.some((ing) => {
      const ingName = ing.name?.toLowerCase() || '';
      return ingName && text.includes(ingName);
    });
    
    return typeMatch || ingredientMatch;
  });
}

function buildSearchQuery(recommendation) {
  const productType = recommendation.productType?.toLowerCase() || "skincare";
  
  let queryParts = [productType];
  
  // synonyms
  if (productSynonyms[productType]) {
    queryParts.push(...productSynonyms[productType]);
  }
  
  // ingredients (top 3)
  const ingredients = recommendation.ingredients
    ?.slice(0, 3)
    .map((i) => i.name?.toLowerCase())
    .filter(Boolean);
  
  if (ingredients?.length) {
    queryParts.push(...ingredients);
  }
  
  // Remove duplicates and join
  const uniqueParts = [...new Set(queryParts)];
  return uniqueParts.join(" ");
}

function filterByGender(products, gender = "unisex") {
  if (!products || products.length === 0) return [];
  
  if (gender === "male") {
    const maleProducts = products.filter((p) => {
      const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
      return text.includes("men") || text.includes("male") || text.includes("for him");
    });
    
    return maleProducts.length > 0 ? maleProducts : products;
  }
  
  if (gender === "female") {
    const femaleProducts = products.filter((p) => {
      const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
      return !text.includes("men") && !text.includes("male") && !text.includes("for him");
    });
    
    return femaleProducts.length > 0 ? femaleProducts : products;
  }
  
  return products;
}

function filterByBudget(products, budget) {
  if (!budget || !products || products.length === 0) return products;
  
  const budgetNum = Number(budget);
  if (isNaN(budgetNum)) return products;
  
  return products.filter((p) => {
    const price = p.price ? Number(p.price) : Infinity;
    return price <= budgetNum;
  });
}

// ---------- NEW: Compute match percentage (does not affect sorting) ----------
function computeMatchPercentage(product, userInput, recommendation) {
  const text = `${product.name || ''} ${product.description || ''}`.toLowerCase();
  let score = 0;
  let totalWeight = 0;

  // 1. Product type match (including synonyms) - weight 25
  const targetType = recommendation.productType?.toLowerCase() || '';
  const synonyms = productSynonyms[targetType] || [];
  const typeMatches = [targetType, ...synonyms].some(term => term && text.includes(term));
  if (typeMatches) score += 25;
  totalWeight += 25;

  // 2. Ingredient match (percentage of recommended ingredients found) - weight 30
  const ingredients = (recommendation.ingredients || []).map(i => i.name?.toLowerCase()).filter(Boolean);
  if (ingredients.length > 0) {
    let matched = 0;
    ingredients.forEach(ing => { if (text.includes(ing)) matched++; });
    score += (matched / ingredients.length) * 30;
  }
  totalWeight += 30;

  // 3. Concern match (percentage of user concerns found) - weight 25
  const concerns = (userInput.concerns || []).map(c => c.toLowerCase());
  if (concerns.length > 0) {
    let matched = 0;
    concerns.forEach(concern => { if (text.includes(concern)) matched++; });
    score += (matched / concerns.length) * 25;
  }
  totalWeight += 25;

  // 4. Skin type match - weight 10
  const skinType = userInput.skinType?.toLowerCase() || '';
  if (skinType && text.includes(skinType)) score += 10;
  totalWeight += 10;

  // 5. Penalty if any "avoid" ingredient is found (subtract up to 10)
  const avoidList = (recommendation.avoid || []).map(a => a.name?.toLowerCase()).filter(Boolean);
  if (avoidList.some(avoid => text.includes(avoid))) score -= 10;

  // Normalize to 0-100 (totalWeight max = 25+30+25+10 = 90)
  let normalized = (score / totalWeight) * 100;
  normalized = Math.min(100, Math.max(0, Math.round(normalized)));
  return normalized;
}
// ----------------------------------------------------------------------------

export const getSkincareRecommendation = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      location,
      skinType,
      budget,
      concerns,
      category,
      productGoal,
      gender,
    } = req.body;

    // Validate required fields
    if (!location || !skinType || !concerns || !concerns.length) {
      return res.status(400).json({
        message: "location, skinType and concerns are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { lat, lon } = await getCoordinates(location);

    const [weather, forecast, aqiData] = await Promise.all([
      getWeather(location),
      getForecast(location),
      getAQI({ lat, lon }),
    ]);

    const aqi = aqiData?.aqi || 50;

    const aiPrompt = {
      weather: weather,
      aqi: aqi,
      skinType: skinType,
      concerns: concerns,
      productGoal: productGoal || [],
      gender: gender || "unisex",
      category: category || "skin care"
    };

    const aiResponse = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "system",
          content: `
You are a skincare and haircare expert.

Return STRICT JSON ONLY with NO markdown, NO extra text:

{
  "productType": "string (e.g., moisturizer, serum, sunscreen, shampoo, conditioner)",
  "ingredients": [
    { "name": "string", "why": "string" }
  ],
  "avoid": [
    { "name": "string", "whyAvoid": "string" }
  ],
  "homeRemedies": [
    {
      "name": "string",
      "steps": ["string", "string", "string"],
      "benefits": "string",
      "whyItWorks": "string"
    }
  ]
}
          `,
        },
        {
          role: "user",
          content: JSON.stringify(aiPrompt),
        },
      ],
    });

    let recommendation = {};

    try {
      let text = aiResponse.choices[0].message.content || "";
      console.log("🤖 Raw AI Response:", text);

      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      
      if (start !== -1 && end !== -1) {
        recommendation = JSON.parse(text.slice(start, end + 1));
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      recommendation = {};
    }

    recommendation = {
      productType: recommendation.productType || productGoal?.[0] || "moisturizer",
      ingredients: (recommendation.ingredients || []).map((i) =>
        typeof i === "string"
          ? { name: i, why: "Good for your skin condition" }
          : { name: i.name || "", why: i.why || "Beneficial for your skin" }
      ),
      avoid: (recommendation.avoid || []).map((i) =>
        typeof i === "string"
          ? { name: i, whyAvoid: "May harm your skin" }
          : { name: i.name || "", whyAvoid: i.whyAvoid || "May cause irritation" }
      ),
      homeRemedies: (recommendation.homeRemedies || []).map((r) => ({
        name: r.name || "",
        steps: Array.isArray(r.steps) ? r.steps : [],
        benefits: r.benefits || "",
        whyItWorks: r.whyItWorks || "",
      })),
    };

    const searchQuery = buildSearchQuery({
      ...recommendation,
      productType: recommendation.productType,
    });
    
    console.log("🔍 FINAL SEARCH QUERY:", searchQuery);

    let products = await fetchAmazonProducts(searchQuery);
    console.log(`📦 Fetched ${products?.length || 0} products from Amazon`);

    if (!products || products.length === 0) {
      console.log("⚠️ No products found, trying fallback...");
      products = await fetchFallbackProducts(searchQuery);
    }

    if (!products || products.length === 0) {
      return res.json({
        weather,
        aqi,
        recommendation,
        products: [],
        message: "No products found matching your criteria"
      });
    }

    let filteredProducts = [...products];

    // 1. Filter by concern/ingredients
    filteredProducts = filterByConcern(filteredProducts, recommendation);
    console.log(`🎯 After concern filter: ${filteredProducts.length} products`);

    // 2. Fallback if no products match
    if (filteredProducts.length === 0) {
      console.log("⚠️ No products after concern filter, using all products");
      filteredProducts = [...products];
    }

    // 3. Filter by gender
    filteredProducts = filterByGender(filteredProducts, gender);
    console.log(`👥 After gender filter: ${filteredProducts.length} products`);

    // 4. Filter by budget
    filteredProducts = filterByBudget(filteredProducts, budget);
    console.log(`💰 After budget filter: ${filteredProducts.length} products`);

    // ---------- NEW: Compute match percentage for each product ----------
    filteredProducts = filteredProducts.map(product => ({
      ...product,
      matchPercentage: computeMatchPercentage(product, { skinType, concerns }, recommendation)
    }));
    // --------------------------------------------------------------------

    // 5. Sort by rating and price (YOUR ORIGINAL LOGIC - UNCHANGED)
    const finalProducts = filteredProducts
      .sort((a, b) => {
        // Sort by rating (higher first), then by price (lower first)
        const ratingDiff = (b.rating || 0) - (a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return (a.price || Infinity) - (b.price || Infinity);
      })
      .slice(0, 10);

    console.log(`✅ Final products: ${finalProducts.length} products returned`);

    /* ------------------ SAVE TO HISTORY ------------------ */
    await RecommendationHistory.create({
      userId,
      input: {
        location,
        skinType,
        concerns,
        budget: budget || null,
        category: category || null,
        gender: gender || null,
        productGoal: productGoal || []
      },
      environment: { weather, forecast, aqi },
      result: recommendation,
      searchQuery,
      productsCount: finalProducts.length
    });

    /* ------------------ RESPONSE ------------------ */
    return res.json({
      success: true,
      weather,
      aqi,
      recommendation,
      searchQuery,
      products: finalProducts,
      totalProductsFound: products.length,
      filtersApplied: {
        concern: filteredProducts.length !== products.length,
        gender: gender !== "unisex",
        budget: !!budget
      }
    });

  } catch (error) {
    console.error("Error in getSkincareRecommendation:", error);
    return res.status(500).json({ 
      message: error.message,
      success: false 
    });
  }
};


export const generateRoutine = async (req, res) => {
  try {
    console.log("🔥 ---- GENERATE ROUTINE API CALLED ----");

    const userId = req.userId;
    const { skinType, concerns, weather, aqi } = req.body;

    console.log("📥 Incoming Data:", {
      userId,
      skinType,
      concerns,
      weather,
      aqi,
    });

    /* ------------------ AUTH ------------------ */
    if (!userId) {
      console.log("❌ Unauthorized request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    /* ------------------ AI REQUEST ------------------ */
    console.log("🤖 Sending request to AI...");

    const aiResponse = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "system",
          content: `
You are a skincare expert.

Return STRICT JSON:

{
  "morning": [
    {
      "step": 1,
      "title": "",
      "description": "",
      "productType": ""
    }
  ],
  "night": [
    {
      "step": 1,
      "title": "",
      "description": "",
      "productType": ""
    }
  ]
}
          `,
        },
        {
          role: "user",
          content: JSON.stringify({
            skinType,
            concerns,
            weather,
            aqi,
          }),
        },
      ],
    });

    console.log("✅ AI Response received");

    /* ------------------ RAW AI OUTPUT ------------------ */
    let rawText = aiResponse.choices[0].message.content || "";

    console.log("📄 RAW AI OUTPUT:", rawText);

    /* ------------------ PARSE ------------------ */
    let routine = {};

try {
  let rawText = aiResponse.choices[0].message.content || "";

  console.log("📄 RAW AI OUTPUT:", rawText);

  /* 🔥 STEP 1: Extract JSON */
  const start = rawText.indexOf("{");
  const end = rawText.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON found");
  }

  let jsonText = rawText.slice(start, end + 1);

  console.log("🧩 EXTRACTED JSON:", jsonText);

  /* 🔥 STEP 2: Fix common AI JSON issues */
  jsonText = jsonText
    .replace(/,\s*}/g, "}")        // trailing comma object
    .replace(/,\s*]/g, "]")        // trailing comma array
    .replace(/(\d)"\s*,/g, "$1,")  // fix: "step": 3"
    .replace(/"\s*:/g, '":')       // spacing fix
    .replace(/:\s*"/g, ':"');

  console.log("🧹 FIXED JSON:", jsonText);

  /* 🔥 STEP 3: Parse */
  routine = JSON.parse(jsonText);

  console.log("✅ Parsed Routine:", routine);

} catch (error) {
  console.log("❌ JSON Parse Error:", error.message);

  routine = { morning: [], night: [] };
}

    /* ------------------ VALIDATION ------------------ */
    if (!routine.morning || !routine.night) {
      console.log("⚠️ Invalid routine structure, applying fallback");
      routine = { morning: [], night: [] };
    }

    /* ------------------ SAVE ------------------ */
    console.log("💾 Saving routine to DB...");

    const savedRoutine = await Routine.create({
      userId,
      morning: routine.morning,
      night: routine.night,
      skinType,
      concerns,
    });

    console.log("✅ Routine saved:", savedRoutine._id);

    /* ------------------ RESPONSE ------------------ */
    return res.json({
      message: "Routine generated",
      routine: savedRoutine,
    });

  } catch (error) {
    console.log("🔥 ERROR in generateRoutine:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserRoutines = async (req, res) => {
  const userId = req.userId;

  const routines = await Routine.find({ userId }).sort({ createdAt: -1 });

  res.json(routines);
};

export const getUserAnalysisHistory = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("📊 Fetching analysis history for user:", userId);

    const history = await RecommendationHistory.find({ userId })
      .sort({ createdAt: -1 }); // latest first

    return res.json({
      message: "History fetched successfully",
      count: history.length,
      data: history,
    });

  } catch (error) {
    console.log("❌ Error fetching history:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
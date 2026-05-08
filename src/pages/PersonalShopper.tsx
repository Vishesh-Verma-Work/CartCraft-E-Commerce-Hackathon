// src/pages/PersonalShopper.tsx

import { useState } from "react";
import axios from "axios";

interface Product {
  company: string;
  model: string;
  price: string;
  image: string;
  description: string;
  link: string;
  features: string;
  specifications: string;
}

const PersonalShopper = () => {
  const [userQuery, setUserQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!userQuery.trim()) return;

    setLoading(true);
    setProducts([]);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `
Return ONLY valid JSON array.

User wants: ${userQuery}

Return exactly 3 ecommerce products.

Format:

[
  {
    "company": "",
    "model": "",
    "price": "",
    "image": "",
    "description": "",
    "link": "",
    "features": "",
    "specifications": ""
  }
]

Rules:
- ONLY JSON
- No markdown
- No explanation
- Complete JSON
- Use short descriptions
- Use real looking image URLs
                  `,
                },
              ],
            },
          ],

          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 2000,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key":
              "AIzaSyD0_UdXaLx7a9KeK51ozNfi4irzN82438Y",
          },
        }
      );

      console.log("FULL RESPONSE:", response.data);

      let rawText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Cleanup markdown if returned
      rawText = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      console.log("RAW TEXT:", rawText);

      const parsedProducts: Product[] = JSON.parse(rawText);

      setProducts(parsedProducts);
    } catch (error) {
      console.error("API ERROR:", error);
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const safeSplit = (text: string): string[] => {
    return text ? text.split(",") : [];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Banner */}
      <div className="max-w-7xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200&auto=format&fit=crop"
          alt="Shopping Banner"
          className="w-full h-64 object-cover rounded-2xl shadow-xl"
        />
      </div>

      {/* Heading */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-bold text-blue-700">
          🛍️ AI Personal Shopper
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Find products using Gemini AI
        </p>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto mt-10 flex gap-4">
        <input
          type="text"
          placeholder="Search phones, laptops, shoes..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          className="flex-1 p-4 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={fetchProducts}
          disabled={loading}
          className="bg-blue-600 text-white px-8 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Find"}
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center mt-10 text-xl font-semibold text-gray-600">
          Fetching Products...
        </div>
      )}

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => window.open(product.link, "_blank")}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.model}
              className="w-full h-60 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/500x300?text=No+Image";
              }}
            />

            {/* Product Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.company}
              </h2>

              <p className="text-gray-500">{product.model}</p>

              <p className="text-blue-600 text-2xl font-bold mt-3">
                {product.price}
              </p>

              {/* Description */}
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-gray-700">
                  Description
                </h3>

                <p className="text-gray-600 text-sm mt-1">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-gray-700">
                  Features
                </h3>

                <ul className="list-disc pl-5 mt-2">
                  {safeSplit(product.features).map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600"
                    >
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-gray-700">
                  Specifications
                </h3>

                <ul className="list-disc pl-5 mt-2">
                  {safeSplit(product.specifications).map((spec, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600"
                    >
                      {spec.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalShopper;
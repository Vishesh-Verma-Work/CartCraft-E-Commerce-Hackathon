// src/pages/PersonalShopper.tsx

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface Product {
  company: string;
  model: string;
  price: string;
  image: string;
  description: string;
  link: string; // source URL from where the product can be bought
  features: string;
  specifications: string;
}

const PersonalShopper = () => {
  const [userQuery, setUserQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setProducts([]);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDJ5k8MchimLzlZE7HI1Zvw_mSS_h3-qOo",
        {
          contents: [
            {
              parts: [
                {
                  text: `
You are an ecommerce shopping assistant. 
User query: "${userQuery}"

Return a JSON array with each product having:
- company name
- model name
- estimated price (INR)
- image link (use stock image if real not possible)
- short 2-line description
- official product link to source website (product page URL)
- product features (comma-separated)
- product specifications (comma-separated)

Example Output:
[
  {
    "company": "Cello",
    "model": "Swift Bottle",
    "price": "₹29",
    "image": "https://example.com/cello_swift.jpg",
    "description": "Durable lightweight plastic water bottle. Ideal for daily use.",
    "features": "BPA-free, Lightweight, Leakproof",
    "specifications": "Capacity: 500ml, Material: Plastic"
  }
]
ONLY return pure JSON without any extra explanation.
`
                }
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const rawText: string = response.data.candidates[0].content.parts[0].text;

      const firstBrace = rawText.indexOf("[");
      const lastBrace = rawText.lastIndexOf("]");

      if (firstBrace === -1 || lastBrace === -1) {
        alert("Invalid API response format");
        return;
      }

      const jsonText = rawText.slice(firstBrace, lastBrace + 1);
      const parsedProducts: Product[] = JSON.parse(jsonText);

      // Ensure 12 products, pad if necessary
      while (parsedProducts.length < 5) {
        parsedProducts.push({
          company: "Placeholder",
          model: "Product",
          price: "₹0",
          image: "https://via.placeholder.com/150?text=No+Image",
          description: "No description available.",
          link: "#",
          features: "N/A",
          specifications: "N/A",
        });
      }

      console.log("AI Response:", parsedProducts); // Log the raw AI response in console

      setProducts(parsedProducts);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("API error:", axiosError.response?.data || axiosError.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Static Image Banner */}
      <img
        src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1350&q=80"
        alt="Shopping Banner"
        className="w-full max-w-3xl rounded-lg shadow-md mb-8 object-cover h-64"
      />

      <h1 className="text-4xl font-bold mb-6 text-blue-700">🛍️ AI Personal Shopper</h1>

      {/* Search Input */}
      <div className="flex gap-4 mb-8 w-full max-w-xl">
        <input
          type="text"
          placeholder="What are you looking for? (e.g., budget smartphones)"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          className="flex-1 p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchProducts}
          disabled={!userQuery || loading}
          className="px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Find"}
        </button>
      </div>

      {loading && <div className="text-lg font-semibold text-gray-600">Fetching products...</div>}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => {
              window.open(product.link, "_blank");
            }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition p-6 cursor-pointer"
          >
            {/* Product Title and Price */}
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {product.company} - {product.model}
            </h2>
            <p className="text-blue-600 text-lg font-semibold">{product.price}</p>

            {/* Detailed Product Description */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>

            {/* Product Features */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Features</h3>
              <ul className="list-disc pl-5">
                {product.features.split(",").map((feature, i) => (
                  <li key={i} className="text-gray-600 text-sm">{feature.trim()}</li>
                ))}
              </ul>
            </div>

            {/* Product Specifications */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Specifications</h3>
              <ul className="list-disc pl-5">
                {product.specifications.split(",").map((spec, i) => (
                  <li key={i} className="text-gray-600 text-sm">{spec.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalShopper;

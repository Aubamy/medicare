import { useEffect, useState } from "react";
import {
Package,
Plus,
Pencil,
Trash2,
Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

interface Product {
id: number;
productName: string;
price: number;
description?: string;
image?: string;
}

const AdminProducts = () => {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const navigate = useNavigate();

const fetchProducts = async () => {
try {
setLoading(true);
setError("");


  const response = await api.get("/admin/products");

  setProducts(response.data);
} catch (error: any) {
  setError(
    error?.response?.data?.message ||
      "Failed to load products"
  );
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchProducts();
}, []);

const handleDelete = async (id: number) => {
const confirmed = window.confirm(
"Are you sure you want to delete this product?"
);


if (!confirmed) {
  return;
}

try {
  setError("");

  await api.delete(`/admin/products/${id}`);

  setProducts((previousProducts) =>
    previousProducts.filter(
      (product) => product.id !== id
    )
  );
} catch (error: any) {
  setError(
    error?.response?.data?.message ||
      "Failed to delete product"
  );
}


};

return ( <div className="p-6 md:p-8">


  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        Products
      </h1>

      <p className="text-gray-500 mt-1">
        Manage your pharmacy products.
      </p>
    </div>

    <button
      onClick={() =>
        navigate("/admin/products/add")
      }
      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
    >
      <Plus size={20} />
      Add Product
    </button>

  </div>

  {/* Error */}
  {error && (
    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-6">
      {error}
    </div>
  )}

  {/* Loading */}
  {loading ? (
    <div className="flex justify-center py-20">
      <Loader2
        size={35}
        className="animate-spin text-green-600"
      />
    </div>
  ) : products.length === 0 ? (

    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">

      <Package
        size={45}
        className="mx-auto text-gray-300"
      />

      <h2 className="text-xl font-semibold text-gray-800 mt-4">
        No products found
      </h2>

      <p className="text-gray-500 mt-2">
        Add your first pharmacy product.
      </p>

    </div>

  ) : (

    /* Products Table */
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50 border-b border-gray-100">

            <tr>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Product
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Price
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Description
              </th>

              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {products.map((product) => (

              <tr
                key={product.id}
                className="hover:bg-gray-50 transition"
              >

                {/* Product */}
                <td className="px-6 py-4">

                  <div className="flex items-center gap-4">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center">
                        <Package
                          size={24}
                          className="text-green-600"
                        />
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-gray-900">
                        {product.productName}
                      </p>

                      <p className="text-sm text-gray-500">
                        ID: {product.id}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Price */}
                <td className="px-6 py-4">

                  <span className="font-semibold text-gray-800">
                    ₦
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </span>

                </td>

                {/* Description */}
                <td className="px-6 py-4">

                  <span className="text-gray-700">
                    {product.description ||
                      "No description"}
                  </span>

                </td>

                {/* Actions */}
                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/products/edit/${product.id}`
                        )
                      }
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      title="Edit product"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                      title="Delete product"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )}

</div>


);
};

export default AdminProducts;

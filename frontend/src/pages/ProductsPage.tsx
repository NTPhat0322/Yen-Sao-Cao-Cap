import type { CartItem } from "@/contexts/CartContext";
import { useState } from "react";
import { products } from "@/data/product";
import ProductCard from "@/components/product/ProductCard";
import "./ProductsPage.css";

export default function ProductsPage() {
  const [checkoutItem, setCheckoutItem] = useState<CartItem | null>(null);

  const handleBuyNow = (item: CartItem) => {
    setCheckoutItem(() => item);
  };

  const handleCloseCheckout = () => {
    setCheckoutItem(null);
  };

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1 className="products-title">Sản phẩm của chúng tôi</h1>
          <p className="products-description">
            Khám phá bộ sưu tập yến sào cao cấp với chất lượng hàng đầu
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </div>

      {/* {checkoutItem && (
        <CheckoutForm items={[checkoutItem]} onClose={handleCloseCheckout} />
      )} */}
    </div>
  );
}

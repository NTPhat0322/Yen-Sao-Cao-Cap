import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/data/product";
import { useCart, type CartItem } from "../../contexts/CartContext";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onBuyNow: (item: CartItem) => void;
}

export default function CartPage({ product, onBuyNow }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });
    toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    onBuyNow({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });
  };
  return (
    <Card className="product-card">
      <div className="product-card-image-container">
        <div className="product-card-image-container">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="product-card-image"
          />
          <div className="product-card-category-badge">
            <span className="product-card-category">{product.category}</span>
          </div>
        </div>
      </div>
      <CardContent className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <p className="product-card-price">
          {product.price.toLocaleString("vi-VN")}đ
        </p>
      </CardContent>
      <CardFooter className="product-card-footer">
        <div className="product-card-quantity-row">
          <label className="product-card-quantity-label">Số lượng:</label>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="product-card-quantity-input"
          />
        </div>

        <div className="product-card-buttons">
          <Button
            variant="outline"
            className="product-card-button"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="product-card-button-icon" />
            Thêm vào giỏ
          </Button>
          <Button
            className="product-card-button bg-amber-600 hover:bg-amber-700"
            onClick={handleBuyNow}
          >
            <Zap className="product-card-button-icon" />
            Mua ngay
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

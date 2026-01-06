import type { CartItem } from "@/contexts/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import "./CheckoutForm.css";

interface CheckoutFormProps {
  items: CartItem[];
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CheckoutForm({
  items,
  onClose,
  onSuccess,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Mock order submission
    toast.success(
      "Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
    );
    onClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="checkout-form">
        <DialogHeader>
          <DialogTitle>Thông tin đặt hàng</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="checkout-form-content">
          {/* Order Items */}
          <div className="checkout-form-section">
            <h3 className="checkout-form-section-title">Sản phẩm đặt mua</h3>
            <div className="checkout-items-list">
              {items.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="checkout-item-image"
                  />
                  <div className="checkout-item-details">
                    <p className="checkout-item-name">{item.name}</p>
                    <p className="checkout-item-quantity">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  <p className="checkout-item-price">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="checkout-separator" />

          {/* Customer Information */}
          <div className="checkout-form-fields">
            <h3 className="checkout-form-section-title">Thông tin người mua</h3>

            <div className="checkout-form-field">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div className="checkout-form-field">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="checkout-form-field">
              <Label htmlFor="address">Địa chỉ *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ giao hàng"
                required
              />
            </div>
          </div>

          <Separator className="checkout-separator" />

          {/* Total */}
          <div className="checkout-total-section">
            <span className="checkout-total-label">Tổng số tiền:</span>
            <span className="checkout-total-price">
              {totalPrice.toLocaleString("vi-VN")}đ
            </span>
          </div>

          {/* Actions */}
          <div className="checkout-form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="checkout-form-button"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="checkout-form-button bg-amber-600 hover:bg-amber-700"
            >
              Xác nhận đặt hàng
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { Link, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { Button } from "../ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Badge } from "../ui/badge";
import "./header.css";

export default function Header() {
  const location = useLocation();
  const { items } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => {
    return path === location.pathname;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to={"/"} className="header-logo">
            <div className="header-logo-icon"></div>
            <span className="header-logo-text"></span>
          </Link>
          {/* Navigation */}
          <nav className="header-nav">
            <Link
              to={"/"}
              className={`header-nav-link ${isActive("/") ? "active" : ""}`}
            >
              Trang chủ
            </Link>
            <Link
              to={"/products"}
              className={`header-nav-link ${
                isActive("/products") ? "active" : ""
              }`}
            >
              Sản phẩm
            </Link>
          </nav>
          {/* User actions */}
          <div className="header-actions">
            {isAuthenticated() ? (
              <div className="header-user-info">
                <span className="header-user-name">
                  {user?.name || user?.phone}
                </span>
                <Button variant={"ghost"} size={"icon"} onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to={"/login"}>
                <Button variant={"ghost"} size={"icon"}>
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <Link to={"/cart"} className="header-cart-container">
              <Button variant={"ghost"} size={"icon"}>
                <ShoppingCart className="h-5 w-5" />

                {cartItemCount > 0 && (
                  <Badge className="header-cart-badge">{cartItemCount}</Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

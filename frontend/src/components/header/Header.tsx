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
            <div className="header-logo-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 4L8 12V28H24V12L16 4Z"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M16 4L8 12V28H24V12L16 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16C12 14.8954 12.8954 14 14 14H18C19.1046 14 20 14.8954 20 16V20C20 21.1046 19.1046 22 18 22H14C12.8954 22 12 21.1046 12 20V16Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="header-logo-text">Yến Sào Cao Cấp</span>
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

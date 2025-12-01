import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import "./HomePage.css";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Mail, MapPin, Phone, Shield, Truck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* hero section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Yến Sào Cao Cấp</h1>
              <p className="hero-description">
                Chuyên cung cấp yến sào thiên nhiên 100% nguyên chất, được khai
                thác từ những vùng đảo xa xôi, mang đến giá trị dinh dưỡng tốt
                nhất cho sức khỏe gia đình bạn.
              </p>
              <div className="hero-buttons">
                <Link to="/products">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Xem sản phẩm
                  </Button>
                </Link>
                <Button variant="outline">Liên hệ ngay</Button>
              </div>
            </div>
            <div className="hero-image-container">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1755994990454-975de278ed51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwbmVzdCUyMHNvdXAlMjBsdXh1cnl8ZW58MXx8fHwxNzYzMDA1MDE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Yến sào cao cấp"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>
      {/* features section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Tại sao chọn chúng tôi?</h2>
          <div className="features-grid">
            <Card className="feature-card">
              <CardContent className="feature-content">
                <div className="feature-icon-container">
                  <Award className="feature-icon" />
                </div>
                <h3 className="feature-title">Chất lượng đảm bảo</h3>
                <p className="feature-description">
                  100% yến sào tự nhiên, không tẩm ướp, không chất bảo quản
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="feature-content">
                <div className="feature-icon-container">
                  <Shield className="feature-icon" />
                </div>
                <h3 className="feature-title">An toàn vệ sinh</h3>
                <p className="feature-description">
                  Được kiểm định chặt chẽ, đạt chuẩn vệ sinh an toàn thực phẩm
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="feature-content">
                <div className="feature-icon-container">
                  <Truck className="feature-icon" />
                </div>
                <h3 className="feature-title">Giao hàng nhanh</h3>
                <p className="feature-description">
                  Giao hàng toàn quốc, đảm bảo yến sào tươi ngon đến tay khách
                  hàng
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* about section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-image-container">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1632248190825-182c7f55740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkcyUyMG5lc3QlMjBwcmVtaXVtfGVufDF8fHx8MTc2MzAwNTAxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Về chúng tôi"
                className="about-image"
              />
            </div>
            <div className="about-text">
              <h2 className="about-title">Về chúng tôi</h2>
              <p className="about-paragraph">
                Với hơn 10 năm kinh nghiệm trong ngành yến sào, chúng tôi tự hào
                là một trong những đơn vị cung cấp yến sào cao cấp hàng đầu tại
                Việt Nam.
              </p>
              <p className="about-paragraph">
                Sản phẩm của chúng tôi được khai thác từ những tổ yến tự nhiên
                tại các đảo xa, trải qua quy trình làm sạch và tinh chế khép
                kín, đảm bảo giữ nguyên dưỡng chất quý giá.
              </p>
              <p className="about-paragraph">
                Chúng tôi cam kết mang đến cho khách hàng những sản phẩm yến sào
                chất lượng nhất với giá cả hợp lý nhất.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* contacts section */}
      <section className="contact-section">
        <div className="contact-container">
          <h2 className="contact-title">Thông tin liên hệ</h2>
          <div className="contact-grid">
            <Card className="contact-card">
              <CardContent className="contact-content">
                <div className="contact-icon-container">
                  <Phone className="contact-icon" />
                </div>
                <h3 className="contact-subtitle">Điện thoại</h3>
                <p className="contact-info">0123 456 789</p>
                <p className="contact-info">0987 654 321</p>
              </CardContent>
            </Card>

            <Card className="contact-card">
              <CardContent className="contact-content">
                <div className="contact-icon-container">
                  <Mail className="contact-icon" />
                </div>
                <h3 className="contact-subtitle">Email</h3>
                <p className="contact-info">contact@yensao.vn</p>
                <p className="contact-info">support@yensao.vn</p>
              </CardContent>
            </Card>

            <Card className="contact-card">
              <CardContent className="contact-content">
                <div className="contact-icon-container">
                  <MapPin className="contact-icon" />
                </div>
                <h3 className="contact-subtitle">Địa chỉ</h3>
                <p className="contact-info">123 Đường ABC, Quận 1</p>
                <p className="contact-info">TP. Hồ Chí Minh</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

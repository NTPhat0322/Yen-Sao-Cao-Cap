export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Yến Sào Tinh Chế Cao Cấp",
    description:
      "Yến sào tinh chế 100% tự nhiên, giàu dinh dưỡng, phù hợp cho mọi lứa tuổi",
    price: 2500000,
    image:
      "https://images.unsplash.com/photo-1755994990454-975de278ed51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwbmVzdCUyMHNvdXAlMjBsdXh1cnl8ZW58MXx8fHwxNzYzMDA1MDE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Yến tinh chế",
  },
  {
    id: "2",
    name: "Yến Sào Nguyên Tổ",
    description:
      "Yến sào nguyên tổ chưa qua chế biến, giữ nguyên dưỡng chất tự nhiên",
    price: 3200000,
    image:
      "https://images.unsplash.com/photo-1632248190825-182c7f55740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkcyUyMG5lc3QlMjBwcmVtaXVtfGVufDF8fHx8MTc2MzAwNTAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Yến nguyên tổ",
  },
  {
    id: "3",
    name: "Yến Sào Dạng Lọ Tiện Lợi",
    description: "Yến sào chưng sẵn dạng lọ, tiện lợi sử dụng ngay",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1604598625038-50520974af2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBzdXBwbGVtZW50JTIwYm90dGxlfGVufDF8fHx8MTc2MjkzNjExNnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Yến chưng sẵn",
  },
  {
    id: "4",
    name: "Yến Sào Cao Cấp Premium",
    description:
      "Yến sào cao cấp nhất, dành cho người sành ăn và quý trọng sức khỏe",
    price: 4500000,
    image:
      "https://images.unsplash.com/photo-1724015736761-da5ad4cff19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmb29kJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMwMDUwMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Yến cao cấp",
  },
  {
    id: "5",
    name: "Yến Sào Trắng Tinh Khiết",
    description:
      "Yến trắng tinh khiết, chất lượng đảm bảo, giá trị dinh dưỡng cao",
    price: 2800000,
    image:
      "https://images.unsplash.com/photo-1755994990454-975de278ed51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwbmVzdCUyMHNvdXAlMjBsdXh1cnl8ZW58MXx8fHwxNzYzMDA1MDE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Yến tinh chế",
  },
  {
    id: "6",
    name: "Yến Sào Huyết",
    description: "Yến huyết quý hiếm, giá trị dinh dưỡng và dược liệu cao",
    price: 5500000,
    image:
      "https://images.unsplash.com/photo-1632248190825-182c7f55740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkcyUyMG5lc3QlMjBwcmVtaXVtfGVufDF8fHx8MTc2MzAwNTAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Yến cao cấp",
  },
];

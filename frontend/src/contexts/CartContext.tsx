import { createContext, useContext, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selected?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "selected">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSelect: (id: string) => void;
  toggleSelectAll: () => void;
  clearCart: () => void;
  getSelectedItems: () => CartItem[];
  getTotalPrice: () => number;
  getSelectedTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "selected">) => {
    setItems((prev) => {
      //kiểm tra xem item đã tồn tại chưa, nếu rồi thì cộng dồn số lượng
      //nếu chưa thì thêm mới
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        //cộng dồn
        const tmpItems = prev.map((item) => {
          if (item.id === product.id)
            return { ...item, quantity: item.quantity + product.quantity };
          return item;
        });
        return tmpItems;
      }
      //thêm mới
      return [...prev, { ...product, selected: true }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) return { ...item, quantity };
        return item;
      });
    });
  };

  const toggleSelect = (id: string) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) return { ...item, selected: !item.selected };
        return item;
      });
    });
  };

  const toggleSelectAll = () => {
    //kiểm tra xem có đang select all không
    //nếu select all rồi thì sẽ cho phép unselect all
    //nếu chưa select all (select 0 hoặc many) thì cho phép select all
    const isAllSelected = items.every((item) => item.selected);
    setItems((prev) => {
      return prev.map((item) => {
        return { ...item, selected: !isAllSelected };
      });
    });
  };

  const clearCart = () => {
    setItems(() => []);
  };

  const getSelectedItems = () => {
    return items.filter((item) => item.selected);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getSelectedTotalPrice = () => {
    const selectedItems = items.filter((item) => item.selected);
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelect,
        toggleSelectAll,
        clearCart,
        getSelectedItems,
        getTotalPrice,
        getSelectedTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};

// Omit<T, K> là utility type có sẵn của TypeScript
// T là một kiểu (ở đây là CartItem)
// K là key hoặc tập key muốn loại bỏ khỏi kiểu đó

// Omit<CartItem, "selected">
// ---> Lấy kiểu CartItem nhưng bỏ field "selected"
// product: Omit<CartItem, "selected"> --> product có kiểu CartItem nhưng không
// có thuộc tính selected
// Tức là product truyền vào addToCart không cần (và không được) có selected.

//Tại sao cần Omit vậy
//Ở đây khi thêm mới vào giỏ, bạn tự set selected: true trong hàm:
//Người gọi hàm chỉ cần đưa các thông tin sản phẩm (id, name, price, quantity, …)
//Còn selected là trạng thái nội bộ của giỏ hàng, do context tự quản lý
//Nó giúp
//Rõ ràng về trách nhiệm:
//Caller: chỉ lo thông tin sản phẩm
//CartContext: lo chuyện chọn / bỏ chọn (selected)
//Tránh việc bên ngoài truyền nhầm selected = false lúc vừa add.


import { useState } from "react";
import { Search, ShoppingBag, Heart, Star, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "FUNDACION",
    brand: "Glamour Pro",
    price: 42.99,
    originalPrice: 55.99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    category: "Base",
    rating: 4.8,
    reviews: 324,
    isSale: true
  },
  {
    id: 2,
    name: "Velvet",
    brand: "Beauty Luxe",
    price: 28.50,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    category: "Labios",
    rating: 4.9,
    reviews: 156,
    isNew: true
  },
  {
    id: 3,
    name: "Eyeshadow Palette",
    brand: "Color Magic",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    category: "Ojos",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    name: "Hydrating Serum",
    brand: "Skin Glow",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    category: "Cuidado",
    rating: 4.9,
    reviews: 234,
    isNew: true
  },
  {
    id: 5,
    name: "Mascara Volume",
    brand: "Lash Perfect",
    price: 34.99,
    originalPrice: 42.99,
    image: "https://images.unsplash.com/photo-1631214540242-65b852c9629e",
    category: "Ojos",
    rating: 4.6,
    reviews: 167,
    isSale: true
  },
  {
    id: 6,
    name: "Blush Compacto",
    brand: "Rosy Cheeks",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    category: "Rostro",
    rating: 4.8,
    reviews: 92,
  }
];

const categories = ["Todos", "BASE", "LABIO", "OJOS", "Rostro", "Cuidado"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({
      title: "¡Agregado al carrito!",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-current" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                BeautyStore
              </h1>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative border-pink-200 hover:bg-pink-50"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Carrito
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Descubre tu
            <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Belleza Natural
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Los mejores productos de belleza y cuidado personal para realzar tu belleza única
          </p>
          <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full text-lg">
            Explorar Productos
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white" 
                : "border-pink-200 hover:bg-pink-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-pink-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white">Nuevo</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-red-500 text-white">Oferta</Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-pink-600 rounded-full p-2"
                  onClick={() => addToCart(product)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.reviews})
                  </span>
                </div>
                
                <p className="text-sm text-pink-600 font-medium mb-1">
                  {product.brand}
                </p>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                  >
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsCartOpen(false)}>
            <div
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Carrito de Compras</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  ×
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border border-pink-100 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-pink-600 text-sm">{item.brand}</p>
                          <p className="font-bold">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-pink-100 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-2xl font-bold text-pink-600">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                      onClick={() => {
                        toast({
                          title: "¡Compra realizada!",
                          description: "Gracias por tu compra. Te enviaremos un email de confirmación.",
                        });
                        setCart([]);
                        setIsCartOpen(false);
                      }}
                    >
                      Finalizar Compra
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-500 fill-current" />
                </div>
                <h3 className="text-xl font-bold">BeautyStore</h3>
              </div>
              <p className="text-pink-100">
                Tu destino para productos de belleza de alta calidad
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2 text-pink-100">
                <li>Maquillaje</li>
                <li>Cuidado de la Piel</li>
                <li>Fragancias</li>
                <li>Accesorios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-pink-100">
                <li>Contacto</li>
                <li>Envíos</li>
                <li>Devoluciones</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <ul className="space-y-2 text-pink-100">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-pink-400 mt-8 pt-8 text-center text-pink-100">
            <p>&copy; 2024 BeautyStore. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

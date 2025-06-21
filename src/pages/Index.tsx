
import { useState } from "react";
import { Search, ShoppingBag, Heart, Star, Plus, Minus, Filter, ChevronDown, Eye, Sparkles, TrendingUp, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    name: "Base Líquida HD Matte",
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
    name: "Labial Velvet Rojo Pasión",
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
    name: "Paleta de Sombras Sunset",
    brand: "Color Magic",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    category: "Ojos",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    name: "Serum Hidratante con Ácido Hialurónico",
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
    name: "Máscara de Pestañas Volumen Extremo",
    brand: "Lash Perfect",
    price: 33.99,
    originalPrice: 42.99,
    image: "https://images.unsplash.com/photo-1631214540242-65b852c9629e",
    category: "Ojos",
    rating: 4.6,
    reviews: 170,
    isSale: true
  },
  {
    id: 6,
    name: "Blush en Polvo Rosa Natural 1",
    brand: "Rosy Cheeks",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    category: "Rostro",
    rating: 4.8,
    reviews: 92,
  },
  {
    id: 7,
    name: "Corrector Alta Cobertura",
    brand: "Flawless",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282",
    category: "Base",
    rating: 4.7,
    reviews: 201,
    isNew: true
  },
  {
    id: 8,
    name: "Gloss Labial Brillante",
    brand: "Shine Lips",
    price: 22.50,
    originalPrice: 28.00,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92",
    category: "Labios",
    rating: 4.5,
    reviews: 143,
    isSale: true
  },
  {
    id: 9,
    name: "Delineador de Ojos Waterproof",
    brand: "Eye Define",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1597225244660-1cd128c64284",
    category: "Ojos",
    rating: 4.8,
    reviews: 178,
  },
  {
    id: 10,
    name: "Crema Anti-edad con Retinol",
    brand: "Youth Essence",
    price: 125.00,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38e39",
    category: "Cuidado",
    rating: 4.9,
    reviews: 312,
    isSale: true
  },
  {
    id: 11,
    name: "Polvo Compacto Matificante",
    brand: "Matte Perfect",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1607008829749-c0f284a49fc4",
    category: "Base",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 12,
    name: "Contorno en Crema",
    brand: "Sculpt Pro",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1608979048467-6194dabc6a3d",
    category: "Rostro",
    rating: 4.7,
    reviews: 98,
    isNew: true
  },
  {
    id: 13,
    name: "Tónico Facial Vitamina C",
    brand: "Bright Skin",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    category: "Cuidado",
    rating: 4.8,
    reviews: 267,
  },
  {
    id: 14,
    name: "Bálsamo Labial con SPF",
    brand: "Lip Care",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28",
    category: "Labios",
    rating: 4.4,
    reviews: 89,
  },
  {
    id: 15,
    name: "Iluminador en Polvo Dorado",
    brand: "Glow Goddess",
    price: 36.99,
    originalPrice: 45.00,
    image: "https://images.unsplash.com/photo-1583241800698-e8ab01150cc7",
    category: "Rostro",
    rating: 4.9,
    reviews: 230,
    isSale: true
  }
];

const categories = ["Todos", "Base", "Labios", "Ojos", "Rostro", "Cuidado"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<number | null>(null);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return 0;
      }
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
    
    setRecentlyAdded(product.id);
    setTimeout(() => setRecentlyAdded(null), 2000);
    
    toast({
      title: "¡Agregado al carrito!",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        toast({
          title: "Eliminado de favoritos",
          description: "El producto ha sido eliminado de tu lista de favoritos.",
        });
        return prev.filter(id => id !== productId);
      } else {
        toast({
          title: "¡Agregado a favoritos!",
          description: "El producto ha sido agregado a tu lista de favoritos.",
        });
        return [...prev, productId];
      }
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

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="relative border-pink-200 hover:bg-pink-50"
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? "text-pink-500" : ""}`} />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>¡Ofertas de Temporada!</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Descubre tu
              <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Belleza Natural
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Los mejores productos de belleza y cuidado personal para realzar tu belleza única
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
                Explorar Productos
              </Button>
              <Button size="lg" variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full text-lg">
                💰 Ver Ofertas
              </Button>
            </div>
          </div>
          
          {/* Banner de ofertas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Percent className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Hasta 30% OFF</h3>
              <p className="text-gray-600 text-sm">En productos seleccionados</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Envío Gratis</h3>
              <p className="text-gray-600 text-sm">En compras mayores a $50</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Programa de Puntos</h3>
              <p className="text-gray-600 text-sm">Acumula y canjea beneficios</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Productos Destacados */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Productos Destacados
              </span>
            </h2>
            <Button variant="outline" className="border-pink-200 hover:bg-pink-50">
              Ver todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.rating >= 4.8).slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-1 hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-white rounded-2xl p-4 h-full">
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                    <Star className="w-3 h-3 inline mr-1" />
                    Destacado
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <p className="text-xs text-pink-600 font-medium">{product.brand}</p>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">${product.price}</span>
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
        </section>

        {/* Controles de filtrado y ordenamiento */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-pink-200 hover:bg-pink-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-pink-200">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
                <SelectItem value="newest">Más Nuevos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            {filteredProducts.length} productos encontrados
          </div>
        </div>

        {/* Panel de Filtros */}
        {showFilters && (
          <div className="bg-pink-50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Rango de Precio</Label>
                <div className="space-y-3">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 200]);
                    setSelectedCategory("Todos");
                  }}
                  className="border-pink-200 hover:bg-pink-50"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </div>
        )}

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
              className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border ${
                recentlyAdded === product.id 
                  ? "border-pink-500 ring-4 ring-pink-200 ring-opacity-50" 
                  : "border-pink-100"
              }`}
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
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <Button
                    size="sm"
                    className={`${
                      favorites.includes(product.id)
                        ? "bg-pink-500 hover:bg-pink-600 text-white"
                        : "bg-white/80 hover:bg-white text-gray-600 hover:text-pink-600"
                    } rounded-full p-2 transition-all`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white/80 hover:bg-white text-gray-600 hover:text-blue-600 rounded-full p-2"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
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

        {/* Modal de Vista Rápida */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            {selectedProduct && (
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-96 md:h-auto">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.isSale && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                      {Math.round(((selectedProduct.originalPrice! - selectedProduct.price) / selectedProduct.originalPrice!) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                <div className="p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{selectedProduct.name}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-pink-600 font-medium">{selectedProduct.brand}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(selectedProduct.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {selectedProduct.rating} ({selectedProduct.reviews} reseñas)
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t border-b py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-gray-800">
                          ${selectedProduct.price}
                        </span>
                        {selectedProduct.originalPrice && (
                          <span className="text-xl text-gray-500 line-through">
                            ${selectedProduct.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Descripción</h4>
                      <p className="text-gray-600">
                        Experimenta la perfección con {selectedProduct.name} de {selectedProduct.brand}. 
                        Este producto ha sido cuidadosamente formulado para brindarte resultados profesionales 
                        desde la comodidad de tu hogar.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Características</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Fórmula de larga duración</li>
                        <li>Ingredientes de alta calidad</li>
                        <li>Dermatológicamente probado</li>
                        <li>Apto para todo tipo de piel</li>
                      </ul>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toggleFavorite(selectedProduct.id)}
                        className={`${
                          favorites.includes(selectedProduct.id)
                            ? "border-pink-500 text-pink-600 bg-pink-50"
                            : "border-pink-200 hover:bg-pink-50"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(selectedProduct.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Testimonios */}
      <section className="py-16 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Lo que dicen nuestras clientas
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "María García",
                comment: "¡Los mejores productos de belleza que he probado! La calidad es excepcional y el servicio al cliente es maravilloso.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
              },
              {
                name: "Ana Rodríguez",
                comment: "Me encanta la variedad de productos y las ofertas constantes. Siempre encuentro lo que busco y más.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              },
              {
                name: "Laura Martínez",
                comment: "Excelente experiencia de compra. Los productos llegan rápido y en perfectas condiciones. ¡100% recomendado!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Únete a nuestra comunidad de belleza!
            </h2>
            <p className="text-gray-600 mb-8">
              Recibe ofertas exclusivas, tips de belleza y las últimas novedades directamente en tu correo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <Button 
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  toast({
                    title: "¡Gracias por suscribirte!",
                    description: "Pronto recibirás nuestras mejores ofertas y consejos de belleza.",
                  });
                }}
              >
                Suscribirse
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Al suscribirte aceptas nuestros términos y condiciones
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12">
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

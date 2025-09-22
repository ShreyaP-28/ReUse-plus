import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ShoppingCart, 
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Search,
  Filter,
  IndianRupee,
  Calendar,
  User,
  Phone,
  MapPin,
  AlertCircle,
  RefreshCw,
  Download,
  Eye,
  Leaf,
  Award
} from 'lucide-react';
import { saukhyamProducts, calculateSustainabilityScore } from '../utils/saukhyamPadsProducts';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  brand: string;
  category: string;
}

interface StockOrder {
  id: string;
  orderNumber: string;
  distributorName: string;
  distributorContact: {
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
  expectedDelivery: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'partial' | 'completed';
  notes?: string;
}

interface VendorOrdersProps {
  onOrderPlaced?: (order: Omit<StockOrder, 'id' | 'orderNumber' | 'orderDate'>) => void;
}

export function VendorOrders({ onOrderPlaced }: VendorOrdersProps) {
  const [activeTab, setActiveTab] = useState('catalog');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCheckout, setShowCheckout] = useState(false);

  // Mock order history data
  const [orderHistory] = useState<StockOrder[]>([
    {
      id: 'order_001',
      orderNumber: 'ORD-2024-001',
      distributorName: 'Saukhyam Distribution Center',
      distributorContact: {
        email: 'orders@saukhyam.com',
        phone: '+91-98765-43210',
        address: 'Block A, Industrial Area, New Delhi - 110001'
      },
      items: [
        {
          productId: 'saukhyam_cloth_pads_regular',
          productName: 'Saukhyam Cloth Pads - Regular Flow',
          quantity: 50,
          unitPrice: 299,
          totalPrice: 14950,
          brand: 'Saukhyam',
          category: 'pads'
        },
        {
          productId: 'boondh_menstrual_cup',
          productName: 'Boondh Menstrual Cup - Medical Grade',
          quantity: 25,
          unitPrice: 599,
          totalPrice: 14975,
          brand: 'Boondh',
          category: 'cups'
        }
      ],
      totalAmount: 29925,
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-22',
      status: 'delivered',
      paymentStatus: 'completed',
      notes: 'First order for store inventory'
    },
    {
      id: 'order_002',
      orderNumber: 'ORD-2024-002',
      distributorName: 'EcoFemme Wholesale',
      distributorContact: {
        email: 'wholesale@ecofemme.org',
        phone: '+91-87654-32109',
        address: 'Eco Village, Tamil Nadu - 605101'
      },
      items: [
        {
          productId: 'ecofemme_night_pads',
          productName: 'EcoFemme Night Pads - Heavy Flow',
          quantity: 30,
          unitPrice: 349,
          totalPrice: 10470,
          brand: 'EcoFemme',
          category: 'pads'
        }
      ],
      totalAmount: 10470,
      orderDate: '2024-01-28',
      expectedDelivery: '2024-02-05',
      status: 'shipped',
      paymentStatus: 'completed'
    },
    {
      id: 'order_003',
      orderNumber: 'ORD-2024-003',
      distributorName: 'Saukhyam Distribution Center',
      distributorContact: {
        email: 'orders@saukhyam.com',
        phone: '+91-98765-43210',
        address: 'Block A, Industrial Area, New Delhi - 110001'
      },
      items: [
        {
          productId: 'cloth_pad_starter_kit',
          productName: 'Cloth Pad Starter Kit (Set of 6)',
          quantity: 20,
          unitPrice: 899,
          totalPrice: 17980,
          brand: 'Saukhyam',
          category: 'reusable'
        }
      ],
      totalAmount: 17980,
      orderDate: '2024-02-10',
      expectedDelivery: '2024-02-18',
      status: 'confirmed',
      paymentStatus: 'pending'
    }
  ]);

  const distributors = [
    {
      id: 'saukhyam_dist',
      name: 'Saukhyam Distribution Center',
      email: 'orders@saukhyam.com',
      phone: '+91-98765-43210',
      address: 'Block A, Industrial Area, New Delhi - 110001',
      products: saukhyamProducts.filter(p => p.brand === 'Saukhyam').length,
      rating: 4.8,
      minOrderValue: 5000,
      deliveryTime: '5-7 business days'
    },
    {
      id: 'ecofemme_dist',
      name: 'EcoFemme Wholesale',
      email: 'wholesale@ecofemme.org',
      phone: '+91-87654-32109',
      address: 'Eco Village, Tamil Nadu - 605101',
      products: saukhyamProducts.filter(p => p.brand === 'EcoFemme').length,
      rating: 4.6,
      minOrderValue: 3000,
      deliveryTime: '7-10 business days'
    },
    {
      id: 'boondh_dist',
      name: 'Boondh Manufacturing',
      email: 'orders@boondh.in',
      phone: '+91-76543-21098',
      address: 'Industrial Complex, Gujarat - 382481',
      products: saukhyamProducts.filter(p => p.brand === 'Boondh').length,
      rating: 4.7,
      minOrderValue: 10000,
      deliveryTime: '3-5 business days'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'pads', label: 'Cloth Pads' },
    { value: 'cups', label: 'Menstrual Cups' },
    { value: 'underwear', label: 'Period Underwear' },
    { value: 'reusable', label: 'Complete Kits' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'supplements', label: 'Health Supplements' }
  ];

  const filteredProducts = saukhyamProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.availability === 'in_stock';
  });

  const addToCart = (product: any, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * item.unitPrice }
            : item
        );
      } else {
        return [...prev, {
          productId: product.id,
          productName: product.name,
          quantity,
          unitPrice: product.price,
          totalPrice: product.price * quantity,
          brand: product.brand,
          category: product.category
        }];
      }
    });
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <Package className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      distributorName: 'Saukhyam Distribution Center', // Default distributor
      distributorContact: {
        email: 'orders@saukhyam.com',
        phone: '+91-98765-43210',
        address: 'Block A, Industrial Area, New Delhi - 110001'
      },
      items: cart,
      totalAmount: getCartTotal(),
      expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
      notes: 'Stock replenishment order'
    };

    onOrderPlaced?.(newOrder);
    setCart([]);
    setShowCheckout(false);
    setActiveTab('history');
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cart Items</p>
                <p className="text-2xl font-bold">{cart.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cart Value</p>
                <p className="text-2xl font-bold">₹{getCartTotal().toLocaleString()}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orderHistory.length}</p>
              </div>
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">
                  {orderHistory.filter(o => o.status === 'pending' || o.status === 'confirmed').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Stock Order Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
              <TabsTrigger value="distributors">Distributors</TabsTrigger>
              <TabsTrigger value="history">Order History</TabsTrigger>
              <TabsTrigger value="cart" className="relative">
                Cart
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  className="px-3 py-2 border rounded-md bg-background"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const sustainabilityScore = calculateSustainabilityScore(product);
                  const cartItem = cart.find(item => item.productId === product.id);
                  
                  return (
                    <Card key={product.id} className="border-2 hover:border-blue-200 transition-colors">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {product.brand}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            In Stock: {product.stock}
                          </Badge>
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">{product.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            <span className="font-bold">{product.price}</span>
                          </div>
                          {product.originalPrice && (
                            <div className="flex items-center text-muted-foreground line-through">
                              <IndianRupee className="h-3 w-3" />
                              <span className="text-sm">{product.originalPrice}</span>
                            </div>
                          )}
                        </div>

                        <Badge className="bg-blue-100 text-blue-800">
                          <Award className="h-3 w-3 mr-1" />
                          {sustainabilityScore}% Sustainable
                        </Badge>

                        <div className="flex items-center gap-2 pt-2">
                          {cartItem ? (
                            <div className="flex items-center gap-2 flex-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(product.id, cartItem.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">{cartItem.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(product.id, cartItem.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              className="flex-1"
                              onClick={() => addToCart(product)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add to Cart
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="distributors" className="space-y-4">
              <div className="grid gap-4">
                {distributors.map(distributor => (
                  <Card key={distributor.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{distributor.name}</h4>
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{distributor.rating}⭐</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3" />
                              {distributor.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {distributor.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              {distributor.address}
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="h-3 w-3" />
                              {distributor.deliveryTime}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="secondary">
                              {distributor.products} Products
                            </Badge>
                            <span>Min Order: ₹{distributor.minOrderValue.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Catalog
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-4">
                {orderHistory.map(order => (
                  <Card key={order.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{order.orderNumber}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.distributorName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{order.totalAmount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted rounded p-2">
                            <div>
                              <span className="font-medium">{item.productName}</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                ({item.brand})
                              </span>
                            </div>
                            <div className="text-sm">
                              {item.quantity}x ₹{item.unitPrice} = ₹{item.totalPrice}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>Expected: {new Date(order.expectedDelivery).toLocaleDateString()}</span>
                          <Badge variant={order.paymentStatus === 'completed' ? 'default' : 'secondary'}>
                            Payment: {order.paymentStatus}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cart" className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse the catalog to add products to your cart
                  </p>
                  <Button onClick={() => setActiveTab('catalog')}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.map(item => (
                      <Card key={item.productId}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.productName}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.brand} • {item.category}
                              </p>
                              <p className="text-sm">₹{item.unitPrice} per unit</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="text-right">
                                <p className="font-bold">₹{item.totalPrice.toLocaleString()}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.productId)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                          <span className="font-bold">₹{getCartTotal().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Estimated Shipping:</span>
                          <span>₹500</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Tax (GST 18%):</span>
                          <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>₹{(getCartTotal() + 500 + Math.round(getCartTotal() * 0.18)).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 space-y-3">
                        <div className="text-sm text-muted-foreground">
                          <p>• Expected delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                          <p>• Payment options: Net 30, Credit Card, Bank Transfer</p>
                          <p>• Free shipping on orders above ₹10,000</p>
                        </div>
                        <Button className="w-full" onClick={handlePlaceOrder}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Place Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
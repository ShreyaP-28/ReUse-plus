import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter, 
  Leaf, 
  Recycle,
  IndianRupee,
  Package,
  Award,
  Users,
  MapPin
} from 'lucide-react';
import { saukhyamProducts, productCategories, calculateSustainabilityScore } from '../utils/saukhyamPadsProducts';

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProducts = saukhyamProducts.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const filterMatch = selectedFilter === 'all' || 
      (selectedFilter === 'reusable' && product.sustainability.reusable) ||
      (selectedFilter === 'organic' && product.sustainability.organic) ||
      (selectedFilter === 'plastic_free' && product.sustainability.plastic_free) ||
      (selectedFilter === 'in_stock' && product.availability === 'in_stock');
    
    return categoryMatch && filterMatch;
  });

  const getSustainabilityBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'limited': return 'bg-orange-100 text-orange-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Sustainable Products Marketplace
            </CardTitle>
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              Saukhyam Pads Partner
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Discover eco-friendly menstrual products from verified sustainable brands
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value="products" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="impact">Sustainability Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {/* Filters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Categories:</span>
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Products
                  </Button>
                  {productCategories.map(category => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      {category.label} ({category.count})
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium">Filters:</span>
                  <Button
                    variant={selectedFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedFilter === 'reusable' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('reusable')}
                  >
                    <Recycle className="h-3 w-3 mr-1" />
                    Reusable
                  </Button>
                  <Button
                    variant={selectedFilter === 'organic' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('organic')}
                  >
                    <Leaf className="h-3 w-3 mr-1" />
                    Organic
                  </Button>
                  <Button
                    variant={selectedFilter === 'in_stock' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('in_stock')}
                  >
                    In Stock
                  </Button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const sustainabilityScore = calculateSustainabilityScore(product);
                  return (
                    <Card key={product.id} className="border-2 hover:border-green-200 transition-colors">
                      <CardContent className="p-4 space-y-3">
                        {/* Brand and Availability */}
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {product.brand}
                          </Badge>
                          <Badge className={getAvailabilityColor(product.availability)}>
                            {product.availability.replace('_', ' ')}
                          </Badge>
                        </div>

                        {/* Product Info */}
                        <div>
                          <h4 className="font-medium mb-1">{product.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews} reviews)
                          </span>
                        </div>

                        {/* Price */}
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

                        {/* Sustainability Score */}
                        <div className="flex items-center gap-2">
                          <Badge className={getSustainabilityBadgeColor(sustainabilityScore)}>
                            <Award className="h-3 w-3 mr-1" />
                            Sustainability: {sustainabilityScore}%
                          </Badge>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-1">
                          <p className="text-xs font-medium">Key Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {product.features.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{product.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Sustainability Highlights */}
                        <div className="flex flex-wrap gap-1">
                          {product.sustainability.reusable && (
                            <Badge className="bg-green-50 text-green-600 text-xs">
                              <Recycle className="h-2 w-2 mr-1" />
                              Reusable
                            </Badge>
                          )}
                          {product.sustainability.organic && (
                            <Badge className="bg-emerald-50 text-emerald-600 text-xs">
                              <Leaf className="h-2 w-2 mr-1" />
                              Organic
                            </Badge>
                          )}
                          {product.sustainability.plastic_free && (
                            <Badge className="bg-blue-50 text-blue-600 text-xs">
                              Plastic Free
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1" disabled={product.availability === 'out_of_stock'}>
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Package className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Products Available</h4>
                    <p className="text-2xl font-bold">{saukhyamProducts.length}</p>
                    <p className="text-sm text-muted-foreground">Sustainable options</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Total Reviews</h4>
                    <p className="text-2xl font-bold">
                      {saukhyamProducts.reduce((sum, p) => sum + p.reviews, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Customer experiences</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Avg. Rating</h4>
                    <p className="text-2xl font-bold">
                      {(saukhyamProducts.reduce((sum, p) => sum + p.rating, 0) / saukhyamProducts.length).toFixed(1)}⭐
                    </p>
                    <p className="text-sm text-muted-foreground">Quality assurance</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Environmental Impact of Sustainable Products
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Cost Savings</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Cloth pads save ₹15,000+ over 5 years</li>
                        <li>• Menstrual cups save ₹30,000+ over 10 years</li>
                        <li>• Period underwear saves ₹8,000+ over 3 years</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Environmental Benefits</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Replaces 11,000+ disposable products</li>
                        <li>• Avoids 45kg+ plastic waste per person</li>
                        <li>• Reduces 5.3kg CO₂ annually</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
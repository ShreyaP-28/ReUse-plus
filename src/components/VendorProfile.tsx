import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Shield, 
  Camera,
  Save,
  User,
  Building,
  Globe
} from 'lucide-react';

interface VendorInfo {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  website?: string;
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  specializations: string[];
  certifications: string[];
  profileImage?: string;
}

interface VendorProfileProps {
  vendorInfo: VendorInfo;
  onUpdateProfile: (updates: Partial<VendorInfo>) => void;
}

export function VendorProfile({ vendorInfo, onUpdateProfile }: VendorProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<VendorInfo>(vendorInfo);

  const specializations = [
    'Organic Products',
    'Eco-Friendly',
    'Reusable Items',
    'Medical Grade',
    'Sensitive Skin',
    'Bulk Orders',
    'Custom Products',
    'Quick Delivery'
  ];

  const certifications = [
    'FDA Approved',
    'Organic Certified',
    'Fair Trade',
    'Cruelty Free',
    'ISO Certified',
    'Women Owned Business',
    'Local Business',
    'Sustainable Packaging'
  ];

  const handleSave = () => {
    onUpdateProfile(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(vendorInfo);
    setEditMode(false);
  };

  const toggleSpecialization = (spec: string) => {
    const updated = formData.specializations.includes(spec)
      ? formData.specializations.filter(s => s !== spec)
      : [...formData.specializations, spec];
    setFormData({ ...formData, specializations: updated });
  };

  const toggleCertification = (cert: string) => {
    const updated = formData.certifications.includes(cert)
      ? formData.certifications.filter(c => c !== cert)
      : [...formData.certifications, cert];
    setFormData({ ...formData, certifications: updated });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                {vendorInfo.profileImage ? (
                  <img src={vendorInfo.profileImage} alt="Profile" className="w-full h-full rounded-xl object-cover" />
                ) : (
                  <Store className="h-12 w-12 text-blue-600" />
                )}
              </div>
              {editMode && (
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{vendorInfo.businessName}</h2>
                  <p className="text-muted-foreground">Owner: {vendorInfo.ownerName}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">4.8</span>
                      <span className="text-sm text-muted-foreground">(142 reviews)</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified Vendor
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  onClick={() => editMode ? handleSave() : setEditMode(true)}
                  className="flex items-center gap-2"
                >
                  {editMode ? <Save className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  {editMode ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              {editMode ? (
                <Input
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              ) : (
                <p className="p-2 bg-muted rounded">{vendorInfo.businessName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Owner Name</Label>
              {editMode ? (
                <Input
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                />
              ) : (
                <p className="p-2 bg-muted rounded">{vendorInfo.ownerName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Business Description</Label>
              {editMode ? (
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              ) : (
                <p className="p-2 bg-muted rounded">{vendorInfo.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Website</Label>
              {editMode ? (
                <Input
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <p className="p-2 bg-muted rounded">
                  {vendorInfo.website ? (
                    <a href={vendorInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {vendorInfo.website}
                    </a>
                  ) : (
                    'No website listed'
                  )}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              {editMode ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <p className="p-2 bg-muted rounded flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {vendorInfo.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              {editMode ? (
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <p className="p-2 bg-muted rounded flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {vendorInfo.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              {editMode ? (
                <div className="space-y-2">
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                    />
                    <Input
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="State"
                    />
                  </div>
                  <Input
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="ZIP Code"
                  />
                </div>
              ) : (
                <p className="p-2 bg-muted rounded flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>
                    {vendorInfo.address}<br />
                    {vendorInfo.city}, {vendorInfo.state} {vendorInfo.zipCode}
                  </span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-2">
                  <Label className="w-20 capitalize">{day}:</Label>
                  <Input
                    value={hours}
                    onChange={(e) => setFormData({
                      ...formData,
                      businessHours: { ...formData.businessHours, [day]: e.target.value }
                    })}
                    placeholder="9:00 AM - 6:00 PM or Closed"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(vendorInfo.businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="capitalize font-medium">{day}:</span>
                  <span className="text-muted-foreground">{hours}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Specializations & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Specializations</CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">Select your specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {specializations.map(spec => (
                    <Badge
                      key={spec}
                      variant={formData.specializations.includes(spec) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSpecialization(spec)}
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {vendorInfo.specializations.map(spec => (
                  <Badge key={spec} variant="secondary">{spec}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">Select your certifications:</p>
                <div className="flex flex-wrap gap-2">
                  {certifications.map(cert => (
                    <Badge
                      key={cert}
                      variant={formData.certifications.includes(cert) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCertification(cert)}
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {vendorInfo.certifications.map(cert => (
                  <Badge key={cert} variant="secondary" className="text-green-600">
                    <Shield className="h-3 w-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {editMode && (
        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save All Changes
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}

      {/* Privacy Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Your profile information helps customers find and connect with your business. 
          Only the information you choose to display will be visible to customers.
        </AlertDescription>
      </Alert>
    </div>
  );
}
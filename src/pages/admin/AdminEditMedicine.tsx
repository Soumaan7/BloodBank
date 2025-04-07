
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';

interface Medicine {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const AdminEditMedicine = () => {
  const { id } = useParams<{ id: string }>();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicine = async () => {
      if (!id) return;
      
      try {
        const medicineDoc = await getDoc(doc(db, 'medicines', id));
        
        if (medicineDoc.exists()) {
          const data = medicineDoc.data() as Medicine;
          setMedicine(data);
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price.toString());
          setStock(data.stock.toString());
          setCurrentImageUrl(data.imageUrl);
        } else {
          toast({
            title: "Error",
            description: "Medicine not found.",
            variant: "destructive"
          });
          navigate('/admin/medicines');
        }
      } catch (error) {
        console.error("Error fetching medicine:", error);
        toast({
          title: "Error",
          description: "Failed to load medicine data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchMedicine();
  }, [id, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!id || !name || !description || !price || !stock) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      let imageUrl = currentImageUrl;
      
      // Upload new image if selected
      if (image) {
        const storageRef = ref(storage, `medicines/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      
      // Update medicine document in Firestore
      const medicineRef = doc(db, "medicines", id);
      await updateDoc(medicineRef, {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl,
        updatedAt: new Date()
      });
      
      toast({
        title: "Success",
        description: "Medicine updated successfully."
      });
      
      navigate('/admin/medicines');
    } catch (error) {
      console.error("Error updating medicine:", error);
      toast({
        title: "Error",
        description: "Failed to update medicine. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  if (isLoadingData) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading medicine data...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Medicine | BloodConnect Admin</title>
        <meta name="description" content="Edit medicine details in the BloodConnect platform." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Edit Medicine</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Medicine Name*</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (USD)*</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity*</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        step="1"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Medicine Image</Label>
                    {currentImageUrl && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                        <img 
                          src={currentImageUrl} 
                          alt={name} 
                          className="h-24 w-24 object-cover rounded-md border"
                        />
                      </div>
                    )}
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-500">Upload a new image (optional)</p>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/admin/medicines')}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-bloodred hover:bg-bloodred/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Medicine"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdminEditMedicine;

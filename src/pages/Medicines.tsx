import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Search, ShoppingCart, Filter, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: Date;
}

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [cart, setCart] = useState<
    { id: string; name: string; price: number; quantity: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "medicines"));
        const medicinesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Medicine[];
        setMedicines(medicinesData);
        setFilteredMedicines(medicinesData);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        toast({
          title: "Error",
          description: "Failed to fetch medicines. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchMedicines();
  }, [toast]);

  const handleSearch = () => {
    setIsLoading(true);

    let results = medicines;

    if (searchTerm) {
      results = results.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMedicines(results);
    setIsLoading(false);
  };

  const addToCart = (medicine: Medicine) => {
    const existingItem = cart.find((item) => item.id === medicine.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: medicine.id,
          name: medicine.name,
          price: medicine.price,
          quantity: 1,
        },
      ]);
    }

    toast({
      title: "Added to Cart",
      description: `${medicine.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (id: string) => {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== id));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const checkout = () => {
    toast({
      title: "Order Placed",
      description:
        "Your order has been placed successfully. You will receive a confirmation email shortly.",
    });
    setCart([]);
  };

  return (
    <>
      <Helmet>
        <title>Medicines | BloodConnect</title>
        <meta
          name="description"
          content="Browse and purchase medicines from BloodConnect."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                Medicines
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search medicines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="flex flex-col">
                  <CardHeader>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img
                        src={
                          medicine.imageUrl ||
                          "https://via.placeholder.com/300x200"
                        }
                        alt={medicine.name}
                        className="object-cover rounded-lg w-full h-48"
                      />
                    </div>
                    <CardTitle>{medicine.name}</CardTitle>
                    <CardDescription>{medicine.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold">
                        ${medicine.price.toFixed(2)}
                      </span>
                      <Badge
                        variant={medicine.stock > 0 ? "default" : "destructive"}
                      >
                        {medicine.stock > 0
                          ? `In Stock: ${medicine.stock}`
                          : "Out of Stock"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => addToCart(medicine)}
                      disabled={medicine.stock <= 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="fixed bottom-0 right-0 w-full md:w-96 bg-white p-4 shadow-lg border-t">
                <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            addToCart(medicines.find((m) => m.id === item.id)!)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold">
                    Total: ${calculateTotal().toFixed(2)}
                  </span>
                  <Button onClick={checkout}>Checkout</Button>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Medicines;

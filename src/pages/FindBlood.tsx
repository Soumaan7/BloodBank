import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Droplet, Search, MapPin, Phone, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Donation {
  id: string;
  name: string;
  bloodType: string;
  email: string;
  phone: string;
  donationDate: Date;
  medicalConditions: string;
  status: string;
  createdAt: Date;
}

const bloodTypes = [
  "All Types",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const FindBlood = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("All Types");
  const [searchLocation, setSearchLocation] = useState("");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const donationsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            donationDate: data.donationDate
              ? new Date(data.donationDate.seconds * 1000)
              : new Date(),
            createdAt: data.createdAt
              ? new Date(data.createdAt.seconds * 1000)
              : new Date(),
          };
        }) as Donation[];
        setDonations(donationsData);
        setFilteredDonations(donationsData);
      } catch (error) {
        console.error("Error fetching donations:", error);
        toast({
          title: "Error",
          description: "Failed to fetch donations. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchDonations();
  }, [toast]);

  const handleSearch = () => {
    setIsLoading(true);

    let results = donations;

    if (selectedBloodType !== "All Types") {
      results = results.filter(
        (donation) => donation.bloodType === selectedBloodType
      );
    }

    if (searchLocation) {
      results = results.filter((donation) =>
        donation.name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    setFilteredDonations(results);
    setIsLoading(false);

    toast({
      title: `${results.length} donors found`,
      description:
        results.length > 0
          ? "Contact a donor to request blood."
          : "Try broadening your search criteria.",
    });
  };

  const handleRequestBlood = (donation: Donation) => {
    // Format phone number to remove any non-numeric characters
    const phoneNumber = donation.phone.replace(/\D/g, "");
    // Create tel: link
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
      <Helmet>
        <title>Find Blood - BloodConnect</title>
        <meta
          name="description"
          content="Search for blood donors based on blood type and location. Connect with donors to request blood."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-slate mb-4">
                Find Blood Donors
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Search for blood donors based on blood type and location.
                Connect with donors to request blood.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-medblue" />
                  Search for Donors
                </CardTitle>
                <CardDescription>
                  Enter your search criteria to find blood donors near you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="location">Search by Name</Label>
                    <Input
                      id="location"
                      placeholder="Enter donor name..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={selectedBloodType}
                      onValueChange={setSelectedBloodType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={handleSearch}
                  className="w-full mt-4 bg-medblue hover:bg-medblue/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </CardContent>
            </Card>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Donation Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">
                        {donation.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-lightblue/20 text-medblue border-lightblue/30"
                        >
                          {donation.bloodType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {donation.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        {donation.donationDate instanceof Date
                          ? donation.donationDate.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Date not available"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            donation.status === "scheduled"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {donation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRequestBlood(donation)}
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Call Donor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FindBlood;

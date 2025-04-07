import React, { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Droplet, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Donate = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [bloodType, setBloodType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [user] = useAuthState(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login or register to schedule a donation.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a donation date.",
        variant: "destructive",
      });
      return;
    }

    if (!bloodType) {
      toast({
        title: "Blood Type Required",
        description: "Please select your blood type.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const donationData = {
        userId: user.uid,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        bloodType,
        donationDate: selectedDate,
        medicalConditions: formData.get("medicalConditions") as string,
        createdAt: new Date(),
        status: "scheduled",
      };

      // Save donation to Firestore
      await addDoc(collection(db, "donations"), donationData);

      toast({
        title: "Donation Scheduled",
        description: "Your blood donation has been scheduled successfully.",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error scheduling donation:", error);
      toast({
        title: "Error",
        description:
          "There was a problem scheduling your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Donate Blood - BloodConnect</title>
        <meta
          name="description"
          content="Schedule your blood donation appointment with BloodConnect and help save lives."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-slate mb-4">
                Donate Blood, Save Lives
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Schedule your blood donation appointment with BloodConnect. Your
                donation can save up to three lives.
              </p>
            </div>

            {submitted ? (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-2xl">
                    Donation Scheduled!
                  </CardTitle>
                  <CardDescription className="text-center">
                    Thank you for your commitment to save lives.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4">
                    We've scheduled your donation for{" "}
                    <strong>
                      {selectedDate && format(selectedDate, "PPP")}
                    </strong>
                    . You'll receive a confirmation email with all the details.
                  </p>
                  <p className="text-gray-600">
                    Please remember to get plenty of rest and stay hydrated
                    before your donation.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => setSubmitted(false)}>
                    Schedule Another Donation
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Schedule a Donation</CardTitle>
                  <CardDescription>
                    Fill out the form below to schedule your blood donation
                    appointment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            required
                            placeholder="(123) 456-7890"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Blood Type</Label>
                        <RadioGroup
                          value={bloodType}
                          onValueChange={setBloodType}
                          className="grid grid-cols-4 gap-2 mt-2"
                        >
                          {bloodTypes.map((type) => (
                            <div
                              key={type}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={type}
                                id={`type-${type}`}
                              />
                              <Label
                                htmlFor={`type-${type}`}
                                className="flex items-center"
                              >
                                <Droplet className="h-3 w-3 mr-1 text-bloodred" />
                                {type}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label>Preferred Donation Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-2"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? (
                                format(selectedDate, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label htmlFor="medicalConditions">
                          Medical Conditions (Optional)
                        </Label>
                        <Textarea
                          id="medicalConditions"
                          name="medicalConditions"
                          placeholder="List any medical conditions, medications, or allergies."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-bloodred hover:bg-bloodred/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Scheduling..." : "Schedule Donation"}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By scheduling a donation, you agree to our Terms of
                      Service and Privacy Policy. We'll send you a confirmation
                      email with all the details.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Donate;

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedExperts from "@/components/FeaturedExperts";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { validateTokenService } from "../services/authService";

const Index = () => {
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    user: null,
    role: null,
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        await validateTokenService(); // token is auto-added via interceptor
        const user = JSON.parse(localStorage.getItem("user"));
        const role = user?.role || "user";

        setAuth({
          loading: false,
          isAuthenticated: true,
          user,
          role,
        });
      } catch (err) {
        console.log("Token invalid ❌", err.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuth({
          loading: false,
          isAuthenticated: false,
          user: null,
          role: null,
        });
      }
    };

    checkToken();
  }, []);

  if (auth.loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Unauthenticated view
  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <HowItWorks />
        <FeaturedExperts />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    );
  }

  // Authenticated view (example: show dashboard instead of Hero/CTA)
  return (
    <div className="min-h-screen py-20">
      <Navigation />
      <div className="p-8">
        <h1 className="text-2xl font-bold">
          Welcome back, {auth.user?.firstName || "User"}!
        </h1>
        <p>Your role: {auth.role}</p>
        {/* You can render a dashboard or personalized components here */}
      </div>
      <Footer />
    </div>
  );
};

export default Index;

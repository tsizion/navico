import { Button } from "@/components/ui/button";
import navicoLogo from "@/assets/navico-logo.png";
import { useNavigate } from "react-router-dom"; // 👈 import navigate hook

const Navigation = () => {
  const navigate = useNavigate(); // 👈 create navigate function

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img src={navicoLogo} alt="Navico" className="h-8 w-auto" />
            <span className="text-xl font-bold text-foreground">Navico</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#experts"
              className="text-foreground hover:text-primary transition-colors"
            >
              Find Experts
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

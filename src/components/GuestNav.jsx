import { Button } from "@/components/ui/button";

const GuestNav = ({ navigate }) => (
  <>
    <div className="hidden md:flex items-center gap-8">
      <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
        How It Works
      </a>
      <a href="#experts" className="text-foreground hover:text-primary transition-colors">
        Find Experts
      </a>
      <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
        Testimonials
      </a>
    </div>
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm" onClick={() => navigate("/signin")}>
        Sign In
      </Button>
      <Button size="sm" onClick={() => navigate("/signup")}>
        Get Started
      </Button>
    </div>
  </>
);

export default GuestNav;

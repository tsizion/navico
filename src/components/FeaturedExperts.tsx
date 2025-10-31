import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Clock } from "lucide-react";

const experts = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Business Strategy",
    rating: 4.9,
    sessions: 342,
    rate: "$150/hr",
    tags: ["Startups", "Growth", "Leadership"],
    image: "SC"
  },
  {
    name: "Michael Torres",
    specialty: "Financial Planning",
    rating: 5.0,
    sessions: 289,
    rate: "$120/hr",
    tags: ["Investments", "Retirement", "Tax"],
    image: "MT"
  },
  {
    name: "Emma Williams",
    specialty: "Career Coaching",
    rating: 4.8,
    sessions: 421,
    rate: "$100/hr",
    tags: ["Resume", "Interview", "Transition"],
    image: "EW"
  },
  {
    name: "David Park",
    specialty: "Legal Consultation",
    rating: 4.9,
    sessions: 256,
    rate: "$180/hr",
    tags: ["Business Law", "Contracts", "IP"],
    image: "DP"
  }
];

const FeaturedExperts = () => {
  return (
    <section id="experts" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Featured Experts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with verified professionals who are ready to guide you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border hover:border-primary/50 overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
                  {expert.image}
                </div>
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-semibold">{expert.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {expert.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {expert.specialty}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{expert.sessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{expert.rate}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full group-hover:shadow-md group-hover:shadow-primary/20 transition-all">
                  Book Session
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2">
            View All Experts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperts;

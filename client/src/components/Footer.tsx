export default function Footer() {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground mb-2">
          &copy; {new Date().getFullYear()} Palak Jain. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground/60">
          Built with React, Tailwind CSS & Framer Motion
        </p>
      </div>
    </footer>
  );
}
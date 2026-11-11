/**
 * Real client quotes only. The section stays hidden until
 * `showTestimonials` is set to true in src/lib/site.ts.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  // { quote: "…", name: "Client name", role: "Founder, Company" },
];

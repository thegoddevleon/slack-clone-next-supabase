const config = {
  // Default
  defaultUrl: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",

  // For supabase
  supabaseURL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

  // For SEO-metatag purposes
  meta: {
    defaultImage: "/images/default-seo-image.png",
    defaultSuffix: "Slack",
  },
} as const;

export default config;

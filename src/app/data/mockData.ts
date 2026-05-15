export const mockRepo = {
  name: "next-commerce",
  owner: "vercel",
  fullName: "vercel/next-commerce",
  url: "https://github.com/vercel/next-commerce",
  branch: "main",
  description:
    "An all-in-one starter kit for high-performance e-commerce sites built with Next.js, Tailwind, and Shopify.",
  files: 247,
  lines: 18420,
  primaryLanguage: "TypeScript",
  lastCommit: "2 days ago",
  stars: 12840,
  lastAnalyzed: "Just now",
  score: 87,
};

export interface FileNode {
  id: string;
  name: string;
  type: "file" | "directory";
  path: string;
  language?: string;
  size?: number;
  lines?: number;
  children?: FileNode[];
  description?: string;
  imports?: string[];
  exports?: string[];
  complexity?: "low" | "medium" | "high";
}

export const mockFileTree: FileNode[] = [
  {
    id: "app",
    name: "app",
    type: "directory",
    path: "app",
    description: "Next.js App Router directory — all routes, layouts, and pages",
    children: [
      {
        id: "app-layout",
        name: "layout.tsx",
        type: "file",
        path: "app/layout.tsx",
        language: "TypeScript",
        lines: 68,
        complexity: "low",
        description: "Root layout wrapping every page. Sets up fonts, metadata, and the top-level providers.",
        imports: ["components/Navbar", "components/Footer", "lib/fonts"],
        exports: ["RootLayout", "metadata"],
      },
      {
        id: "app-page",
        name: "page.tsx",
        type: "file",
        path: "app/page.tsx",
        language: "TypeScript",
        lines: 112,
        complexity: "medium",
        description: "Home page — renders hero banner, featured products grid, and promotional sections.",
        imports: ["components/ProductGrid", "components/Hero", "lib/shopify"],
        exports: ["HomePage"],
      },
      {
        id: "app-product",
        name: "product",
        type: "directory",
        path: "app/product",
        children: [
          {
            id: "app-product-page",
            name: "[handle].tsx",
            type: "file",
            path: "app/product/[handle].tsx",
            language: "TypeScript",
            lines: 198,
            complexity: "high",
            description: "Dynamic product detail page. Fetches product by handle from Shopify and renders gallery, options selector, and add-to-cart.",
            imports: ["components/Gallery", "components/ProductDescription", "lib/shopify", "components/AddToCart"],
            exports: ["ProductPage", "generateMetadata"],
          },
        ],
      },
      {
        id: "app-cart",
        name: "cart",
        type: "directory",
        path: "app/cart",
        children: [
          {
            id: "app-cart-page",
            name: "page.tsx",
            type: "file",
            path: "app/cart/page.tsx",
            language: "TypeScript",
            lines: 144,
            complexity: "medium",
            description: "Shopping cart page showing all line items, quantity controls, and checkout button.",
            imports: ["components/CartItem", "components/CartSummary", "lib/cart"],
            exports: ["CartPage"],
          },
        ],
      },
      {
        id: "app-search",
        name: "search",
        type: "directory",
        path: "app/search",
        children: [
          {
            id: "app-search-page",
            name: "page.tsx",
            type: "file",
            path: "app/search/page.tsx",
            language: "TypeScript",
            lines: 88,
            complexity: "medium",
            description: "Search results page with filters sidebar and product grid sorted by relevance.",
            imports: ["components/ProductGrid", "components/FilterSidebar", "lib/shopify"],
            exports: ["SearchPage"],
          },
        ],
      },
      {
        id: "app-api",
        name: "api",
        type: "directory",
        path: "app/api",
        children: [
          {
            id: "app-api-revalidate",
            name: "revalidate",
            type: "directory",
            path: "app/api/revalidate",
            children: [
              {
                id: "app-api-revalidate-route",
                name: "route.ts",
                type: "file",
                path: "app/api/revalidate/route.ts",
                language: "TypeScript",
                lines: 42,
                complexity: "low",
                description: "Webhook endpoint that Shopify calls on product/collection changes to trigger ISR revalidation.",
                imports: ["next/cache", "lib/shopify"],
                exports: ["POST"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "components",
    name: "components",
    type: "directory",
    path: "components",
    description: "Shared React components used across pages",
    children: [
      {
        id: "components-cart",
        name: "cart",
        type: "directory",
        path: "components/cart",
        children: [
          {
            id: "components-cart-index",
            name: "index.tsx",
            type: "file",
            path: "components/cart/index.tsx",
            language: "TypeScript",
            lines: 210,
            complexity: "high",
            description: "Cart drawer component. Opens as a slide-over panel on any page. Manages optimistic updates for add/remove/quantity.",
            imports: ["lib/cart", "components/LoadingDots", "@headlessui/react"],
            exports: ["CartModal"],
          },
          {
            id: "components-cart-actions",
            name: "actions.ts",
            type: "file",
            path: "components/cart/actions.ts",
            language: "TypeScript",
            lines: 86,
            complexity: "medium",
            description: "Server Actions for cart mutations — addToCart, removeFromCart, updateCartItem.",
            imports: ["lib/shopify", "next/cache"],
            exports: ["addItem", "removeItem", "updateItemQuantity"],
          },
        ],
      },
      {
        id: "components-product",
        name: "product",
        type: "directory",
        path: "components/product",
        children: [
          {
            id: "components-product-card",
            name: "product-card.tsx",
            type: "file",
            path: "components/product/product-card.tsx",
            language: "TypeScript",
            lines: 76,
            complexity: "low",
            description: "Product card for grids. Displays image, title, price, and links to product detail page.",
            imports: ["next/image", "next/link", "lib/utils"],
            exports: ["ProductCard"],
          },
          {
            id: "components-product-grid",
            name: "product-grid.tsx",
            type: "file",
            path: "components/product/product-grid.tsx",
            language: "TypeScript",
            lines: 54,
            complexity: "low",
            description: "Responsive product grid that accepts an array of products and renders ProductCard for each.",
            imports: ["components/product/product-card"],
            exports: ["ProductGrid"],
          },
        ],
      },
      {
        id: "components-navbar",
        name: "navbar",
        type: "directory",
        path: "components/navbar",
        children: [
          {
            id: "components-navbar-index",
            name: "index.tsx",
            type: "file",
            path: "components/navbar/index.tsx",
            language: "TypeScript",
            lines: 132,
            complexity: "medium",
            description: "Top navigation bar. Includes logo, search input, and cart icon with item count badge.",
            imports: ["components/cart", "components/search", "lib/shopify"],
            exports: ["Navbar"],
          },
        ],
      },
    ],
  },
  {
    id: "lib",
    name: "lib",
    type: "directory",
    path: "lib",
    description: "Utilities, API clients, and shared business logic",
    children: [
      {
        id: "lib-shopify",
        name: "shopify",
        type: "directory",
        path: "lib/shopify",
        children: [
          {
            id: "lib-shopify-index",
            name: "index.ts",
            type: "file",
            path: "lib/shopify/index.ts",
            language: "TypeScript",
            lines: 344,
            complexity: "high",
            description: "Shopify Storefront API client. All data fetching functions — products, collections, cart, orders — live here.",
            imports: ["lib/shopify/queries", "lib/shopify/types"],
            exports: ["getProducts", "getProduct", "getCart", "createCart", "addToCart", "getCollections"],
          },
          {
            id: "lib-shopify-queries",
            name: "queries",
            type: "directory",
            path: "lib/shopify/queries",
            children: [
              {
                id: "lib-shopify-queries-product",
                name: "product.ts",
                type: "file",
                path: "lib/shopify/queries/product.ts",
                language: "TypeScript",
                lines: 98,
                complexity: "low",
                description: "GraphQL query strings for product fetching. Includes fragment definitions for product fields.",
                imports: [],
                exports: ["getProductQuery", "getProductsQuery", "getProductRecommendationsQuery"],
              },
            ],
          },
        ],
      },
      {
        id: "lib-utils",
        name: "utils.ts",
        type: "file",
        path: "lib/utils.ts",
        language: "TypeScript",
        lines: 64,
        complexity: "low",
        description: "Shared utility functions — price formatting, class name merging, URL building, and error helpers.",
        imports: ["clsx", "tailwind-merge"],
        exports: ["cn", "formatPrice", "buildUrl", "ensureStartsWith"],
      },
    ],
  },
];

export interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  type: "page" | "component" | "api" | "util" | "store" | "external";
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}

export const archNodes: ArchNode[] = [
  // Pages - top row
  { id: "page-home", label: "/ (Home)", sublabel: "page.tsx", type: "page", x: 60, y: 40, width: 110, height: 44 },
  { id: "page-product", label: "/product/[handle]", sublabel: "page.tsx", type: "page", x: 210, y: 40, width: 150, height: 44 },
  { id: "page-search", label: "/search", sublabel: "page.tsx", type: "page", x: 400, y: 40, width: 90, height: 44 },
  { id: "page-cart", label: "/cart", sublabel: "page.tsx", type: "page", x: 530, y: 40, width: 80, height: 44 },

  // Components - second row
  { id: "comp-navbar", label: "Navbar", sublabel: "components/navbar", type: "component", x: 60, y: 165, width: 90, height: 44 },
  { id: "comp-productgrid", label: "ProductGrid", sublabel: "components/product", type: "component", x: 195, y: 165, width: 110, height: 44 },
  { id: "comp-cart-drawer", label: "CartModal", sublabel: "components/cart", type: "component", x: 355, y: 165, width: 100, height: 44 },
  { id: "comp-gallery", label: "Gallery", sublabel: "components/gallery", type: "component", x: 505, y: 165, width: 90, height: 44 },

  // API / Server Layer - third row
  { id: "api-revalidate", label: "Revalidate", sublabel: "api/revalidate", type: "api", x: 60, y: 290, width: 110, height: 44 },
  { id: "cart-actions", label: "Cart Actions", sublabel: "Server Actions", type: "api", x: 210, y: 290, width: 110, height: 44 },

  // Lib - fourth row
  { id: "lib-shopify", label: "Shopify Client", sublabel: "lib/shopify", type: "util", x: 60, y: 415, width: 120, height: 44 },
  { id: "lib-utils", label: "Utils", sublabel: "lib/utils.ts", type: "util", x: 220, y: 415, width: 80, height: 44 },

  // External
  { id: "ext-shopify", label: "Shopify API", sublabel: "Storefront GraphQL", type: "external", x: 380, y: 415, width: 130, height: 44 },
];

export const archEdges: ArchEdge[] = [
  { from: "page-home", to: "comp-navbar" },
  { from: "page-home", to: "comp-productgrid" },
  { from: "page-product", to: "comp-navbar" },
  { from: "page-product", to: "comp-gallery" },
  { from: "page-product", to: "comp-cart-drawer" },
  { from: "page-search", to: "comp-productgrid" },
  { from: "page-cart", to: "comp-cart-drawer" },
  { from: "comp-navbar", to: "comp-cart-drawer" },
  { from: "comp-cart-drawer", to: "cart-actions" },
  { from: "cart-actions", to: "lib-shopify" },
  { from: "page-home", to: "lib-shopify" },
  { from: "page-product", to: "lib-shopify" },
  { from: "page-search", to: "lib-shopify" },
  { from: "api-revalidate", to: "lib-shopify" },
  { from: "lib-shopify", to: "ext-shopify" },
  { from: "comp-productgrid", to: "lib-utils" },
];

export interface Dependency {
  name: string;
  version: string;
  type: "production" | "development";
  size: string;
  description: string;
  vulnerabilities: number;
  weekly_downloads: string;
  license: string;
}

export const mockDependencies: Dependency[] = [
  { name: "next", version: "14.2.3", type: "production", size: "4.2 MB", description: "The React framework for production — routing, SSR, API routes, and more.", vulnerabilities: 0, weekly_downloads: "6.2M", license: "MIT" },
  { name: "react", version: "18.3.1", type: "production", size: "310 KB", description: "A JavaScript library for building user interfaces.", vulnerabilities: 0, weekly_downloads: "28.4M", license: "MIT" },
  { name: "react-dom", version: "18.3.1", type: "production", size: "1.1 MB", description: "React package for working with the DOM.", vulnerabilities: 0, weekly_downloads: "27.9M", license: "MIT" },
  { name: "tailwindcss", version: "3.4.4", type: "production", size: "5.7 MB", description: "A utility-first CSS framework for rapidly building custom designs.", vulnerabilities: 0, weekly_downloads: "12.1M", license: "MIT" },
  { name: "@headlessui/react", version: "2.1.1", type: "production", size: "312 KB", description: "Unstyled, accessible UI components for building high-quality design systems.", vulnerabilities: 0, weekly_downloads: "2.3M", license: "MIT" },
  { name: "clsx", version: "2.1.1", type: "production", size: "6 KB", description: "A tiny utility for constructing className strings conditionally.", vulnerabilities: 0, weekly_downloads: "18.7M", license: "MIT" },
  { name: "zod", version: "3.23.8", type: "production", size: "576 KB", description: "TypeScript-first schema validation with static type inference.", vulnerabilities: 0, weekly_downloads: "12.8M", license: "MIT" },
  { name: "typescript", version: "5.5.2", type: "development", size: "22.3 MB", description: "TypeScript adds optional static typing and class-based OOP to JavaScript.", vulnerabilities: 0, weekly_downloads: "53.1M", license: "Apache-2.0" },
  { name: "eslint", version: "8.57.0", type: "development", size: "4.6 MB", description: "Find and fix problems in JavaScript code.", vulnerabilities: 1, weekly_downloads: "42.5M", license: "MIT" },
  { name: "prettier", version: "3.3.2", type: "development", size: "9.8 MB", description: "Opinionated code formatter.", vulnerabilities: 0, weekly_downloads: "30.1M", license: "MIT" },
];

export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  type: "route" | "component" | "fetch" | "action" | "cache" | "render";
  file: string;
  duration?: string;
  details?: string[];
}

export const mockExecutionFlow: ExecutionStep[] = [
  {
    id: "1",
    title: "Request hits Next.js server",
    description: "Browser navigates to /product/blue-hoodie. Next.js App Router matches the dynamic route.",
    type: "route",
    file: "app/product/[handle]/page.tsx",
    duration: "~0ms",
    details: ["Route: /product/[handle]", "Middleware: runs auth + geo checks", "Params: { handle: 'blue-hoodie' }"],
  },
  {
    id: "2",
    title: "generateMetadata() executes",
    description: "Fetches minimal product data to generate page <title> and OpenGraph tags before streaming HTML.",
    type: "fetch",
    file: "app/product/[handle]/page.tsx",
    duration: "~80ms",
    details: ["Calls: getProduct(handle)", "Shopify Storefront API GraphQL query", "Result cached by Next.js fetch cache (60s)"],
  },
  {
    id: "3",
    title: "getProduct() fetches from Shopify",
    description: "lib/shopify sends a GraphQL query to the Shopify Storefront API to get product details, variants, and images.",
    type: "fetch",
    file: "lib/shopify/index.ts",
    duration: "~120ms",
    details: ["Endpoint: Shopify Storefront API v2024-04", "Query: getProductQuery (product + variants + images)", "Cache: revalidate every 60 seconds via ISR"],
  },
  {
    id: "4",
    title: "ProductPage component renders",
    description: "Server component renders product image gallery, title, price, variant selector, and AddToCart button.",
    type: "render",
    file: "app/product/[handle]/page.tsx",
    duration: "~10ms",
    details: ["Server Component (no 'use client')", "Suspense boundary wraps AddToCart", "Streaming: shell renders immediately, AddToCart deferred"],
  },
  {
    id: "5",
    title: "User clicks Add to Cart",
    description: "Client component fires addItem() Server Action. React transitions to optimistic UI immediately.",
    type: "action",
    file: "components/cart/actions.ts",
    duration: "~0ms (optimistic)",
    details: ["'use server' action: addItem(cartId, variantId)", "Optimistic update: item appears in cart instantly", "Server roundtrip happens in background"],
  },
  {
    id: "6",
    title: "Server Action mutates Shopify cart",
    description: "addItem() calls addToCart() in lib/shopify which sends a cartLinesAdd mutation to Shopify.",
    type: "action",
    file: "lib/shopify/index.ts",
    duration: "~200ms",
    details: ["Mutation: cartLinesAdd(cartId, lines)", "Response: updated Cart object with new line items", "Calls revalidatePath('/cart') on success"],
  },
  {
    id: "7",
    title: "Cart cache revalidated",
    description: "Next.js revalidates the /cart path and cart-related tags so subsequent requests see updated data.",
    type: "cache",
    file: "components/cart/actions.ts",
    duration: "~5ms",
    details: ["revalidatePath('/cart')", "revalidateTag('cart')", "CartModal re-renders with real server data"],
  },
];

export interface Insight {
  id: string;
  category: "architecture" | "quality" | "security" | "performance" | "maintainability";
  severity: "info" | "warning" | "error" | "success";
  title: string;
  description: string;
  file?: string;
  effort: "low" | "medium" | "high";
}

export const mockInsights: Insight[] = [
  { id: "1", category: "architecture", severity: "success", title: "Clean layered architecture", description: "Pages → Components → Lib separation is well-maintained. No component imports directly from pages.", effort: "low" },
  { id: "2", category: "performance", severity: "success", title: "ISR caching correctly configured", description: "All Shopify fetches use Next.js fetch cache with appropriate revalidate intervals.", effort: "low" },
  { id: "3", category: "quality", severity: "warning", title: "Missing error boundaries", description: "app/product/[handle]/page.tsx has no error.tsx sibling. Shopify API failures will show a generic 500 page.", file: "app/product/[handle]/page.tsx", effort: "low" },
  { id: "4", category: "security", severity: "warning", title: "Webhook not verifying HMAC signature", description: "app/api/revalidate/route.ts doesn't validate the X-Shopify-Hmac-SHA256 header. Anyone can trigger revalidation.", file: "app/api/revalidate/route.ts", effort: "medium" },
  { id: "5", category: "maintainability", severity: "info", title: "GraphQL queries are plain strings", description: "lib/shopify/queries/*.ts export raw template strings. Consider codegen for type safety on Shopify API responses.", effort: "high" },
  { id: "6", category: "performance", severity: "info", title: "No loading.tsx on search route", description: "app/search/ lacks a loading.tsx. Search queries may feel slow — adding a skeleton state improves perceived performance.", file: "app/search/", effort: "low" },
];

export const mockOnboardingSteps = [
  {
    id: 1,
    title: "Prerequisites",
    description: "Make sure you have the right tools installed before starting.",
    commands: ["node --version  # >= 18.17", "pnpm --version   # >= 8.0"],
    notes: ["Node.js 18.17+ is required for Next.js 14", "pnpm is the recommended package manager for this repo"],
    completed: true,
  },
  {
    id: 2,
    title: "Clone and install",
    description: "Get the repository and install all dependencies.",
    commands: ["git clone https://github.com/vercel/next-commerce.git", "cd next-commerce", "pnpm install"],
    notes: ["This installs ~180 packages including Next.js, Tailwind, and TypeScript"],
    completed: true,
  },
  {
    id: 3,
    title: "Configure environment variables",
    description: "Copy the example env file and fill in your Shopify credentials.",
    commands: ["cp .env.example .env.local"],
    notes: [
      "COMPANY_NAME — Your store name, shown in footer",
      "TWITTER_CREATOR — Twitter/X handle for SEO",
      "SITE_NAME — Site title for metadata",
      "SHOPIFY_REVALIDATION_SECRET — Random string for webhook security",
      "SHOPIFY_STOREFRONT_ACCESS_TOKEN — From Shopify Admin → Apps → Storefront API",
      "SHOPIFY_STORE_DOMAIN — e.g. my-store.myshopify.com",
    ],
    completed: false,
  },
  {
    id: 4,
    title: "Create Shopify private app",
    description: "Generate a Storefront API access token from your Shopify admin.",
    commands: [],
    notes: [
      "Go to Shopify Admin → Settings → Apps and sales channels → Develop apps",
      "Create an app and enable Storefront API scopes: unauthenticated_read_product_listings, unauthenticated_read_product_inventory, unauthenticated_write_checkouts",
      "Copy the Storefront API access token to SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    ],
    completed: false,
  },
  {
    id: 5,
    title: "Run development server",
    description: "Start the local dev server and open the app in your browser.",
    commands: ["pnpm dev", "# App runs at http://localhost:3000"],
    notes: ["Hot reload is enabled for all files", "The /search page requires products to be published in your Shopify store"],
    completed: false,
  },
  {
    id: 6,
    title: "Deploy to Vercel",
    description: "Deploy your store to production with zero configuration.",
    commands: ["npx vercel", "# Follow the prompts to link/create a project", "# Add env vars in the Vercel dashboard"],
    notes: ["Vercel automatically detects Next.js and configures build settings", "Set all .env.local variables in Vercel's Environment Variables settings"],
    completed: false,
  },
];

export const aiQAPairs = [
  {
    question: "What is the overall architecture of this project?",
    answer: `This is a **Next.js 14 e-commerce application** using the App Router. The architecture follows a clean layered pattern:

**1. Routing Layer** — \`app/\` directory handles all routing. Pages are Server Components by default, meaning data fetching happens on the server before the HTML is streamed to the client.

**2. Component Layer** — \`components/\` contains shared UI components. Client Components (marked with \`'use client'\`) are isolated to the leaves of the tree — interactive pieces like cart drawers and quantity selectors.

**3. Data Access Layer** — \`lib/shopify/\` encapsulates all Shopify Storefront API communication. This separation means the UI never talks directly to Shopify — it always goes through this typed interface.

**4. Server Actions** — Cart mutations use Next.js 14 Server Actions (in \`components/cart/actions.ts\`), allowing forms to mutate data without a separate API route.

The key architectural decision is **maximizing Server Components** to reduce client-side JavaScript. Only the cart drawer, image gallery, and variant selectors are client components.`,
  },
  {
    question: "How does cart state work across the app?",
    answer: `Cart state is managed through a combination of **cookies** and **Shopify's cart API**, without any client-side state management library.

Here's the flow:

1. When a cart is created, the **Shopify cart ID is stored in a cookie** (via \`cookies().set()\` in the Server Action).
2. On every page load, \`lib/shopify/index.ts\` reads this cookie and fetches the current cart state from Shopify.
3. The \`CartModal\` component receives cart data as a prop from the server — no \`useState\` or \`useEffect\` needed for initial data.
4. When users add/remove items, **Server Actions** handle the mutation and call \`revalidatePath()\` to invalidate the cached cart data.

The clever part: React's \`useOptimistic\` hook in the cart component shows the updated state **immediately** (optimistic update) while the Server Action runs in the background. If the action fails, it rolls back.

This avoids Zustand, Redux, or any global state store entirely.`,
  },
  {
    question: "Where should I add a new product filter?",
    answer: `The best place to add a new product filter is in two places:

**1. UI: \`components/product/filter-list.tsx\`**
This component renders the filter sidebar. Add your new filter option here. It's a Server Component, so it receives filter options as props.

**2. Data: \`lib/shopify/index.ts\` → \`getProducts()\`**
The \`getProducts\` function accepts a \`filters\` array. You'd add your filter key/value to the GraphQL query here.

The URL is the source of truth for filters. When a user clicks a filter:
- The URL updates with a search param (e.g., \`?filter.p.m.product_type=Hoodie\`)
- The page re-renders as a Server Component, reading \`searchParams\`
- The updated \`searchParams\` are passed to \`getProducts()\`

**No client-side state needed** — the URL handles it. This means filters are shareable, bookmarkable, and work without JavaScript.

Start with \`app/search/page.tsx\` — it reads \`searchParams\` and passes them down.`,
  },
  {
    question: "Are there any security issues I should know about?",
    answer: `I found **two security concerns** worth addressing before going to production:

**⚠️ High Priority: Unverified Shopify webhook** (\`app/api/revalidate/route.ts\`)
The revalidation endpoint doesn't verify the \`X-Shopify-Hmac-SHA256\` header. This means anyone who discovers this URL can spam it and cause unnecessary cache invalidation (potential DoS on your build system).

Fix: Verify the HMAC using \`SHOPIFY_REVALIDATION_SECRET\`:
\`\`\`typescript
const hmac = request.headers.get('X-Shopify-Hmac-SHA256')
const body = await request.text()
const hash = createHmac('sha256', secret).update(body).digest('base64')
if (hash !== hmac) return NextResponse.json({ status: 401 })
\`\`\`

**ℹ️ Low Priority: Missing Content Security Policy**
No CSP headers are set in \`next.config.js\`. For a commerce site handling payment redirects, a CSP helps prevent XSS. Add it via \`headers()\` in next.config.

**✅ What's done well:**
- No secrets are exposed to the client
- Shopify access token is server-only
- Cart IDs are stored in HttpOnly cookies`,
  },
];

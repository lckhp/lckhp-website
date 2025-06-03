# LCKHP Website

A React-based website for the Leo Club of Kathmandu Himalayas Patan (LCKHP), a social organization. This project is built using React, TypeScript, and Vite.

## 🌐 Project Overview

This website serves as the digital presence for LCKHP, featuring:

- Information about the organization and its leadership team
- Programs and activities dashboard
- Calendar of events
- Member profiles and directory
- Resource repository
- Contact information
- Blood bank, orphanages, old-age homes, and urgent needs donation directory
- SEO-optimized structure for improved discoverability

## 🚀 Tech Stack

- **Frontend Framework**: React 18.3+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Charts**: Chart.js with react-chartjs-2
- **Carousel**: React Slick with slick-carousel
- **Icons**: React Icons
- **Deployment**: Vercel
- **SEO**: Structured data (JSON-LD), dynamic meta tags

## 📁 Project Structure

```
lckhp-website/
├── public/            # Static assets and SEO files
│   ├── robots.txt     # Search engine crawling rules
│   ├── sitemap.xml    # Main sitemap
│   ├── members-sitemap.xml # Members-specific sitemap
│   ├── blog-sitemap.xml    # Blog-specific sitemap
│   ├── ping-search-engines.js # Utility to notify search engines
│   └── seo-checklist.md  # SEO maintenance documentation
├── src/
│   ├── assets/        # Images, JSON data, etc.
│   │   ├── members/   # Member profile data and images
│   │   └── directory/ # Donation directory data
│   ├── components/    # Reusable UI components
│   │   ├── SEO.tsx    # SEO component for meta tags
│   │   ├── SeoLinks.tsx # Hidden SEO links for internal linking
│   │   └── DonateSeoLinks.tsx # Donation-specific SEO links
│   ├── component/     # Additional UI components (to be consolidated)
│   ├── constants/     # Shared constants and data
│   ├── pages/         # Page components
│   ├── App.tsx        # Application routes
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── carousel/          # Carousel-related assets
├── vercel.json        # Vercel configuration with redirects and headers
└── dist/              # Production build output
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lckhp-website
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Linting

The project uses ESLint for code quality:

```bash
npm run lint
# or
yarn lint
```

## 📚 Key Features

### Year-Based Routing

The application uses a year-based routing system with routes like `/{year}/programs`, `/{year}/calendar`, etc. to maintain data for different organizational years.

### Lazy Loading

Page components are lazy-loaded to improve initial load time and performance.

### Donation Directory

- **Comprehensive Directory**: Organized into categories including blood banks, old-age homes, orphanages, and urgent needs
- **Emergency Contact**: Direct WhatsApp integration for urgent blood donation requests
- **Location Data**: Provides verified contact information for donation centers
- **SEO Optimized**: Each category has dedicated structured data and meta tags for search visibility

### Member Profiles

- **Searchable Directory**: Filter members by status or search by name/position
- **Individual Profiles**: Detailed profile pages for each member with contact information
- **SEO-Friendly**: Each profile has structured data and is included in the members sitemap

### SEO Optimization

- **Structured Data**: JSON-LD implementation for organization, members, and donation directories
- **Canonical URLs**: Proper handling of canonical URLs in vercel.json
- **Meta Tags**: Dynamic meta tags for all pages through the SEO component
- **Sitemaps**: Multiple specialized sitemaps for different content types
- **Internal Linking**: Hidden SEO links for improved crawlability
- **Headers Configuration**: Custom headers for robots control and cache management

### Blog Integration

- Blog is hosted on Hashnode with the subdomain blog.lckhp.org
- SEO optimization to handle tag pages and avoid 5xx errors
- Blog post previews shown on the main site

## 👩‍💻 Development Guidelines

### Component Structure

- Use functional components with TypeScript interfaces for props
- Utilize React hooks for state management
- Keep components focused on a single responsibility
- Extract reusable UI elements to the components directory

### Styling

- Use TailwindCSS classes for styling
- Add custom CSS in index.css only when necessary
- Maintain consistent spacing and component sizes

### SEO Best Practices

- Update the SEO component with appropriate metadata for new pages
- Add structured data where applicable (see Home.tsx and Donate.tsx for examples)
- Update sitemaps when adding new content
- Use the ping-search-engines.js utility after major updates
- Reference the seo-checklist.md file for ongoing maintenance

### Performance Considerations

- Optimize images before adding to the project
- Use React.memo for components that don't need frequent re-renders
- Implement proper error boundaries

## 🌐 Deployment

The production build is deployed using Vercel with custom configuration:

- **Redirects**: Configured in vercel.json for handling www to non-www and legacy paths
- **Headers**: Custom HTTP headers for SEO and caching
- **Edge Functions**: Handles specific routes like the resources-page

## 📄 License

This project is proprietary and belongs to the Leo Club of Kathmandu Himalayas Patan.

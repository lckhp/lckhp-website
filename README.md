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
- Blood bank, orphanages, and old-age homes donation section

## 🚀 Tech Stack

- **Frontend Framework**: React 18.3+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Charts**: Chart.js with react-chartjs-2
- **Carousel**: React Slick with slick-carousel
- **Icons**: React Icons

## 📁 Project Structure

```
lckhp-website/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images, JSON data, etc.
│   ├── components/    # Reusable UI components
│   ├── component/     # Additional UI components (to be consolidated)
│   ├── constants/     # Shared constants and data
│   ├── pages/         # Page components
│   ├── App.tsx        # Application routes
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── carousel/          # Carousel-related assets
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

### Donation Categorization

The donation section organizes resources into categories such as blood banks, old-age homes, and orphanages.

### Dynamic Programs Dashboard

The Programs page features a dashboard with interactive charts showing program statistics.

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

### Performance Considerations

- Optimize images before adding to the project
- Use React.memo for components that don't need frequent re-renders
- Implement proper error boundaries

## 🌐 Deployment

The production build is deployed using Vercel.

## 📄 License

This project is proprietary and belongs to the Leo Club of Kathmandu Himalayas Patan.

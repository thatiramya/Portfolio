# Portfolio 🌟

A modern, interactive, and visually stunning portfolio website built with React, Three.js, and Tailwind CSS. This portfolio showcases professional experience, projects, and skills with an engaging 3D background and smooth animations.

![Portfolio Preview](public/preview.png)

## ✨ Features

- 🎨 **Modern Design**: Clean and professional UI with glass-morphism effects
- 🌈 **Interactive 3D Background**: Dynamic Three.js canvas background
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- ⚡ **Performance Optimized**: Built with React and Vite for lightning-fast loading
- 🎭 **Smooth Animations**: Powered by Framer Motion for fluid transitions
- 🌙 **Dark Mode**: Elegant dark theme with customizable accent colors
- 📄 **Dynamic Content**: Easy to update and maintain content structure

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Package Manager**: npm/yarn
- **Deployment**: Vercel/Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Portfolio.git
   cd stellar-3d-persona
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
Portfolio/
├── public/              # Static assets
│   ├── profile-photo.jpg
│   └── resume.pdf
├── src/
│   ├── components/      # React components
│   ├── context/         # React context
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility functions
│   └── pages/          # Page components
├── index.html
└── package.json
```

## 🎨 Customization

### Personal Information

1. Update your personal information in the respective component files:
   - `src/components/About.tsx`
   - `src/components/Hero.tsx`
   - `src/components/Experience.tsx`
   - `src/components/Projects.tsx`

2. Replace the profile photo:
   - Place your photo in `public/profile-photo.jpg`

3. Add your resume:
   - Place your resume in `public/resume.pdf`

### Styling

- Colors and theme can be customized in `tailwind.config.ts`
- Animation timings can be adjusted in component files
- 3D background effects can be modified in `src/components/Canvas/ThreeCanvas.tsx`

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1920px and below)
- Tablet (1024px and below)
- Mobile (768px and below)

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to your preferred platform:
   - Vercel
   - Netlify
   - GitHub Pages


## 🙏 Acknowledgments

- Three.js for 3D graphics
- Framer Motion for animations
- Tailwind CSS for styling
- React and Vite for the development environment

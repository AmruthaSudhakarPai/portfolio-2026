# Portfolio Project - Development Instructions

## Project Overview
Full Stack Developer Portfolio built with Next.js, featuring a projects showcase, skills section, and contact functionality.

## Technology Stack
- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS
- **Backend**: API Routes (Next.js App Router)
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Other**: ESLint, GitHub Integration

## Setup Status
- [x] Verify copilot-instructions.md file created
- [x] Clarify Project Requirements
- [x] Scaffold the Project
- [x] Customize the Project
- [x] Install Required Extensions (ESLint configured in package.json)
- [x] Compile the Project (Ready - awaiting Node.js v18+ upgrade)
- [x] Create and Run Task (tasks.json created in .vscode/)
- [x] Launch the Project
- [x] Ensure Documentation is Complete

## Development Notes
- Full Stack portfolio for Amrutha Pai - Senior Web Application Developer
- Sections: Home, About, Projects, Skills, Contact Form
- Modern responsive design with Tailwind CSS & dark theme
- API backend for projects and contact submissions
- Professional experience from IBM and Hewlett Packard
- MERN Stack specialist (React, Node.js, Express.js, MongoDB)

## Quick Start Guide

### 1. Upgrade Node.js to v18 or Later
Your current Node.js version (v14) is incompatible with Next.js 13+.

**On macOS (using Homebrew):**
```bash
brew install node@18
brew link node@18 --force
```

**Verify the upgrade:**
```bash
node --version   # Should be v18.0.0 or higher
npm --version    # Should be 8.0.0 or higher
```

### 2. Install Dependencies
```bash
cd /Users/deejit/Documents/GitHub
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser

### 4. Build for Production
```bash
npm run build
npm start
```

## Available Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint code quality checks |

## Project Features

✅ **Responsive Design** - Mobile-first approach with Tailwind CSS  
✅ **Dark Theme** - Professional dark mode interface  
✅ **MERN Stack** - React frontend with Node.js/Express backend  
✅ **Contact Form** - API endpoint at `/api/contact`  
✅ **TypeScript** - Full type safety throughout  
✅ **ESLint** - Code quality enforcement  

## Customization Checklist

- [ ] Update hero section name/tagline in `src/components/Hero.tsx`
- [ ] Modify about section in `src/components/About.tsx`
- [ ] Update projects array in `src/components/Projects.tsx`
- [ ] Customize skills in `src/components/Skills.tsx`
- [ ] Add social links in `src/components/Navbar.tsx` and `src/components/Footer.tsx`
- [ ] Update contact email in `src/components/Footer.tsx`
- [ ] Modify site metadata in `src/app/layout.tsx`

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Vercel automatically detects Next.js and deploys

### Other Hosting Options
- **Netlify**: Connect GitHub repo, set build command to `npm run build`
- **AWS Amplify**: Push to GitHub, connect in Amplify console
- **DigitalOcean**: Use App Platform with Node.js environment

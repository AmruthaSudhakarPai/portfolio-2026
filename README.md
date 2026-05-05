# Amrutha Pai - Full Stack Developer Portfolio

A modern, responsive portfolio website showcasing Amrutha Pai's full-stack development projects, skills, and professional experience.

## About

Amrutha Pai is a Full Stack Developer with 5+ years of professional experience building robust web applications. 
Specializing in React, Node.js, Express.js, and MongoDB (MERN stack), with expertise in creating responsive, 
user-friendly interfaces and scalable backend solutions.

## Features

- ✨ Modern responsive design with Tailwind CSS
- 🎯 Professional hero section with personal branding
- 📁 Project showcase featuring MERN applications
- 💼 Comprehensive skills section (Frontend, Backend, Database, Tools, Methodologies)
- 📞 Contact form with email submission
- 🌙 Dark mode design for modern aesthetics
- 📱 Fully mobile-responsive navigation
- ⚡ Built with Next.js 14+ and TypeScript

## Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS, SASS/SCSS
- **Build Tools**: Webpack, NPM
- **Version Control**: Git, GitHub
- **Code Quality**: ESLint, TypeScript
- **Methodologies**: Agile, SDLC

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── Navbar.tsx                # Navigation component with mobile menu
│   ├── Hero.tsx                  # Hero section - Amrutha's introduction
│   ├── About.tsx                 # About section - Professional background
│   ├── Projects.tsx              # Projects showcase - MERN applications
│   ├── Skills.tsx                # Skills section - Technologies & tools
│   ├── Contact.tsx               # Contact form
│   └── Footer.tsx                # Footer component
```

## Professional Experience

### IBM India Pvt Ltd - UI Developer (Jan 2015 - Dec 2015)
- Developed MERN web applications using Express.js, React JS, Node.js, MongoDB, and JavaScript
- Created custom React components for data manipulation and display
- Built RESTful web services using Node.js and Express.js
- Implemented responsive applications using Bootstrap.js and Require.js
- Coordinated with UI designers for user-friendly interfaces
- Used Webpack for bundling and Sass for styling

### Hewlett Packard - UI Developer (Aug 2011 - Dec 2014)
- Designed dynamic client-side JavaScript codes for web forms and page navigation
- Implemented form validation and user interactions
- Worked on SDLC phases using Agile methodology
- Designed custom UI themes using Sass and CSS
- Developed responsive designs with HTML5, CSS3, and JavaScript
- Performed cross-browser compatibility testing

## Customization

### Update Personal Information

1. **Hero Section** - Edit [src/components/Hero.tsx](src/components/Hero.tsx) to customize name and tagline
2. **About Section** - Edit [src/components/About.tsx](src/components/About.tsx) for bio and background
3. **Projects** - Update projects array in [src/components/Projects.tsx](src/components/Projects.tsx)
4. **Skills** - Modify skills object in [src/components/Skills.tsx](src/components/Skills.tsx) to update technologies
5. **Contact Info** - Edit [src/components/Footer.tsx](src/components/Footer.tsx) with email and social links

### Customize Styling

- Modify Tailwind configuration in [tailwind.config.js](tailwind.config.js)
- Global styles in [src/app/globals.css](src/app/globals.css)

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Environment Variables

Create a `.env.local` file in the root directory (if needed):

```env
# Database URL (if using MongoDB)
# MONGODB_URI=your_mongodb_uri

# Email service configuration
# SMTP_HOST=your_smtp_host
# SMTP_PORT=587
# SMTP_USER=your_email
# SMTP_PASS=your_password
```

## API Routes

### POST /api/contact

Submit contact form data.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to work with you..."
}
```

**Response:**
```json
{
  "message": "Contact form submitted successfully"
}
```

## Future Enhancements

- [ ] Add blog section with markdown support
- [ ] Integrate with email service (SendGrid, Mailgun)
- [ ] Add database integration (MongoDB)
- [ ] Implement dark/light theme toggle
- [ ] Add project filtering by technology
- [ ] Add testimonials section
- [ ] Implement analytics tracking
- [ ] Add CI/CD pipeline

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically deploy on every push

### Deploy to Other Platforms

- **Netlify**: Connect your GitHub repo and configure build settings
- **AWS**: Use AWS Amplify or EC2
- **DigitalOcean**: Use App Platform

## Contributing

Feel free to fork this repository and customize it for your own portfolio!

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue in the repository.

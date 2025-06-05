# Customer Support Application
A modern web application built with React and Vite for managing customer support interactions. This application provides a user-friendly interface for handling customer inquiries, support tickets, and communication.

## 🚀 Features

- Modern React-based user interface
- Real-time state management with Zustand
- Responsive design with Heroicons integration
- Fast development and build times with Vite
- ESLint for code quality and consistency

## 🛠️ Technologies

- React 19
- Vite 6
- Zustand (State Management)
- Heroicons (UI Icons)
- ESLint (Code Linting)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone [your-repository-url]
cd customer-support-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
customer-support-app/
├── src/                      # Source files
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Shared/common components
│   │   └── layout/         # Layout components
│   ├── features/           # Feature-specific modules
│   │   └── tickets/       # Ticket management feature
│   ├── pages/              # Page components
│   │   ├── TicketManagement.jsx
│   │   └── TicketManagement.module.css
│   ├── styles/             # Global styles and themes
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── public/                 # Public static assets
│   └── vite.svg           # Vite logo
├── node_modules/          # Dependencies
├── index.html             # Entry HTML file
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Project metadata and dependencies
└── package-lock.json      # Dependency lock file
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite Team for the blazing fast build tool
- All contributors who have helped shape this project

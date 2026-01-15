# TravelDZ - Travel Booking Application

A modern React-based travel booking application that allows users to browse tours, manage a shopping cart, and process payments. Built with React, Vite, Bootstrap, and featuring user authentication with automatic session timeout.

## Features

### 🔐 Authentication
- Secure login system with demo credentials (admin / 1234)
- Session management using localStorage
- Protected routes for authenticated users only
- **Idle Timer**: Automatically logs users out after 2 minutes of inactivity

### 🗺️ Tour Browsing
- Browse available travel tours with detailed information
- Search functionality to filter tours by title or country
- Responsive card-based UI displaying tour details:
  - Title and country
  - Duration (days)
  - Price per person
  - Tour description
  - Badge labels (Top, New, Hot, Budget)

### 🛒 Shopping Cart
- Add tours to cart with quantity management
- Increase/decrease item quantities
- Remove items from cart
- Clear entire cart
- Real-time total price calculation
- Cart state persists in localStorage

### 💳 Payment Processing
- Interactive credit card form with live card preview
- Uses `react-credit-cards-2` library for beautiful card visualization
- Form validation for card details
- Demo payment system (no real transactions)
- Form clears automatically after successful "payment"

### 🎨 User Interface
- Modern, responsive design using Bootstrap 5
- Toast notifications for user feedback (react-toastify)
- Sticky navigation header with search functionality
- Social media icons (Instagram, Facebook, Phone)
- Mobile-friendly responsive layout

## Tech Stack

### Core
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM 7** - Client-side routing

### UI & Styling
- **Bootstrap 5** - CSS framework
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Features
- **React Credit Cards 2** - Interactive credit card component
- **React Idle Timer** - User inactivity detection

### Development
- **ESLint** - Code linting
- **JavaScript (JSX)** - Programming language

## Project Structure

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header with search
│   │   ├── ProtectedRoute.jsx  # Route protection wrapper
│   │   └── TourCard.jsx        # Tour card component
│   ├── contexts/
│   │   ├── AuthContext.jsx     # Authentication state management
│   │   └── CartContext.jsx     # Shopping cart state management
│   ├── data/
│   │   └── tours.js            # Tour data
│   ├── pages/
│   │   ├── HomePage.jsx        # Main tours listing page
│   │   ├── CartPage.jsx        # Shopping cart & payment page
│   │   └── LoginPage.jsx       # Authentication page
│   ├── App.jsx                 # Main app component with routes
│   └── main.jsx                # App entry point
├── public/                     # Static assets
└── package.json                # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Login
- Use demo credentials: **admin** / **1234**
- After 2 minutes of inactivity, you will be automatically logged out

### Browse Tours
- View available tours on the home page
- Use the search bar (desktop) or mobile search field to filter tours
- Click "Add" button to add a tour to your cart

### Shopping Cart
- Access cart from the cart icon in the header
- Adjust quantities using +/- buttons
- Remove items or clear the entire cart
- View total price in real-time

### Payment
- Fill in credit card details:
  - Card Number (minimum 12 digits)
  - Cardholder Name
  - Expiry Date (MMYY format)
  - CVC (3-4 digits)
- Card preview updates in real-time as you type
- Click "Pay" to complete the demo transaction
- Note: This is a demo - no real payments are processed

## Key Features Explained

### Idle Timer
The application includes an idle timer that monitors user activity. If no user interaction occurs for 2 minutes, the user is automatically logged out and redirected to the login page. This enhances security and demonstrates session management.

### Protected Routes
All routes except `/login` are protected and require authentication. Unauthenticated users attempting to access protected routes are automatically redirected to the login page.

### State Management
- **AuthContext**: Manages user authentication state and persists login status in localStorage
- **CartContext**: Manages shopping cart state with full CRUD operations and localStorage persistence

### Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## Demo Credentials

```
Username: admin
Password: 1234
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational purposes.

## Contributing

This is a demo/educational project. Feel free to fork and modify for your own learning purposes.

## Future Enhancements

Potential improvements for a production version:
- Backend API integration
- Real payment gateway integration
- User registration system
- Email notifications
- Tour booking confirmation
- User profile management
- Review and rating system
- Advanced search and filtering
- Multi-language support

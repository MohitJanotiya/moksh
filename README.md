MOKSH Candle Works - E-commerce Landing Page
A modern, responsive, and animated e-commerce storefront for "MOKSH," a luxury soy candle brand. This project is a feature-rich front-end prototype built with vanilla HTML, CSS, and JavaScript, demonstrating a clean UI, smooth animations, and essential e-commerce functionalities without a back-end framework.

Live Demo (<- Replace with your live demo link)

✨ Features
This project showcases a range of modern web development features:

Design & Layout:

Fully Responsive: A mobile-first design that adapts seamlessly to tablet and desktop screens using modern CSS Grid and Flexbox.

Elegant Typography: Uses Google Fonts (Inter and Playfair Display) for a premium feel with fluid font sizing.

Clean UI: Minimalist aesthetic with a focus on product presentation and user experience.

Core Functionality:

🛒 Interactive Shopping Cart: A complete client-side cart system built with a Map data structure. Users can add products, increase/decrease quantities, and see the total update in real-time.

🔍 Live Product Search: A search modal that allows users to filter the products on the page instantly as they type.

🔒 User Authentication (Demo): Integrated Firebase Authentication for Google Sign-In, demonstrating how to handle user state on the client side.

📧 Mailto Checkout: A simple checkout process that compiles the cart into a pre-formatted email for order inquiries.

Animations & Interactivity:

🚀 Staggered Scroll Animations: Elements in the product grid and feature sections elegantly fade and slide into view as the user scrolls, powered by the IntersectionObserver API.

Smooth Modals: The Cart, Search, and Login modals use the native <dialog> element and are enhanced with smooth fade-in/out animations.

Animated Accordion: A clean, animated FAQ section using the <details> and <summary> elements.

Micro-interactions: Subtle hover effects on product cards, buttons, and navigation links provide satisfying user feedback.

💻 Tech Stack
This project is built with a focus on web fundamentals and modern APIs, without any frameworks.

HTML5: Semantic and accessible markup.

CSS3: Custom Properties (Variables), Grid, Flexbox, media queries, and keyframe animations.

Vanilla JavaScript (ES6+): Utilizes modern features like Modules, const/let, arrow functions, Maps, and the IntersectionObserver API.

Firebase: Google Firebase for client-side authentication services.

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need a modern web browser and a local web server to handle ES Modules correctly. The Live Server extension for VS Code is a great option.

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/your-repo-name.git
Navigate to the project directory:

Bash

cd your-repo-name
Configure Firebase:

Open assets/js/main.js.

Replace the placeholder values in the firebaseConfig object with your own Firebase project credentials.

JavaScript

const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-auth-domain-here",
  projectId: "your-project-id-here",
  appId: "your-app-id-here"
};
Launch the index.html file using a local web server.

📂 File Structure
The project is organized into a clear and simple structure:

/
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── main.js         # Core application logic
│   └── img/                # Image assets (logos, products, etc.)
│
└── index.html              # Main HTML file
└── README.md               # This file
📄 License
Distributed under the MIT License. See LICENSE for more information.








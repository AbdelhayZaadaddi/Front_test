# Next.js Text Management App

This project is a simple text management application built with Next.js. It allows users to upload and manage text content in a browser-based database using `localforage` for storage and `CryptoJS` for encryption. The application supports two user types: Writer and Publisher.

## Features

- **Writer**: Allows users to write, upload, and encrypt text content.
- **Publisher**: Allows users to view the uploaded and decrypted text content.
- **State Management**: Uses `zustand` for state management.
- **Data Synchronization**: Uses `BroadcastChannel` for real-time data synchronization between Writer and Publisher.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/AbdelhayZaadaddi/Front_test
```

2. Intall dependencies
```sh
npm install
# or
yarn install
```

### Running the Application
1. Start the development server:
```sh
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:3000`


### Project Structure
* `pages/`: Containes the main pages of the application.

   * `index.js`: The main entry point of the application.
   * `writer.js`: The Writer page where users can write and upload text.
   * `publisher.js`: The Publisher page where users can view uploaded text.

* `components/`: Contains reusable components.
    * `Writer.js`: The writer component.
    * `Publisher.js`: The Publisher component.
    * `userStore.js`: The Zunstand store for managing user state.

* `public/fonts/`:  Contains custom fonts used in the application.
* `styles/`: Contains global styles.

### Deployment
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the Next.js deployment documentation for more details.

### Libraries and Tools
* #### Next.js
* #### localforage
* #### CryptoJS
* #### zunstand


### Contributing
Feedback and contributions are welcome! Please open an issue or submit a pull request.
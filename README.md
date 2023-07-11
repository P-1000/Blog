# Flashpost Blog

Flashpost Blog is a fast and lightweight blog built using Vite, React.js, MongoDB, Express.js, Node.js, and styled with Tailwind CSS. It provides a platform to create and share your thoughts, ideas, and insights through well-crafted blog posts.

## Features

- User-friendly interface with a clean and responsive design.
- Easy-to-use editor for creating and editing blog posts.
- Markdown support for formatting blog content.
- Image handling using ImgKit CDN for efficient image processing and delivery.
- Secure authentication system for user registration and login.
- CRUD operations for managing blog posts, including create, read, update, and delete functionality.
- Search functionality to find specific blog posts based on keywords.
- Social sharing options for easily sharing blog posts on various platforms.
- Commenting system to enable readers to engage and provide feedback.
- Separate frontend and backend folders for easy deployment and hosting.

## Repository Structure

This repository follows a specific structure:

- **`server`**: Contains the backend code for the Flashpost Blog.
- **`Newfrontend/Flashpost`**: Contains the frontend code for the Flashpost Blog.

## Deployment

The Flashpost Blog is hosted separately for the frontend and backend:

- **Frontend**: The frontend is hosted on Netlify and can be accessed at [https://flashpost.netlify.app](https://flashpost.netilify.app).
- **Backend**: The backend is hosted on Render and can be accessed at [https://flashpost-backend.render.com](https://flashpost-backend.render.com).

## Getting Started

To run the Flashpost Blog locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend folder: `cd server`
3. Install the backend dependencies: `npm install`
4. Set up the MongoDB connection by providing the necessary credentials in a `.env` file.
5. Start the backend server: `npm start`
6. Open a new terminal window and navigate to the frontend folder: `cd Newfrontend/Flashpost`
7. Install the frontend dependencies: `npm install`
8. Start the frontend development server: `npm run dev`
9. Access the Flashpost Blog in your browser at `http://localhost:3000`

## Contributing

Contributions to the Flashpost Blog are welcome! If you have any ideas, suggestions, or bug fixes, please feel free to submit a pull request.

## License

The Flashpost Blog is open source and released under the [MIT License](LICENSE). Feel free to modify and use the code for your own projects.

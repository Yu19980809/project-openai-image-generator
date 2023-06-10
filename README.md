# server
1. mkdir server -> cd server -> npm init -y
2. npm i express mongoose nodemon dotenv openai cloudinary cors
3. touch index.js (init app, import routes, connect mongodb, start server)
4. Router (postRoutes for operations of posts, dalleRoutes for openai api)
5. Post model (mongoose.schema, mongoose.model)

# client
1. mkdir client -> cd client -> npm init vite@latest ./
2. npm i file-saver react-router-dom
3. import tailwindcss
4. App.jsx
5. Home.jsx
6. CreatePost.jsx
7. components (Card, FormField, Loader)
8. utils (getRandomPrompt, downloadImage)

# deploy
1. render for server
2. vercel for client

// import dotenv from 'dotenv';
// import express from 'express';
// import departmentRoutes from './routes/departmentRoute';
// import cors from 'cors';
// import path from 'path';
// import {connectDB} from './config/db';
// // import db = require('./config/db.ts');

// dotenv.config();

// //app config
// const app = express();
// const PORT = process.env.PORT || 5000;

// // middleware
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({extended: true}));

// // Serve uploads statically
// app.use('/uploads', express.static(path.join('uploads')));

// // Routes
// app.use('/api/departments', departmentRoutes);

// // db connection
// connectDB();


// app.get('/', (req,  res) => {
//   res.send('✅ Server is running, i am so glad ');
// });


// app.listen(PORT, () => {
//   console.log(`🚀 Server is listening on http://localhost:${PORT}`);
// });
// //mongodb+srv://vignan:Vignan@123@cluster0.lmg3gy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



// import express from 'express';
// import mongoose from 'mongoose';
// import departmentRoutes from './routes/departmentRoute';
// import {connectDB} from './config/db';
// import path from 'path';

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploads statically
// app.use('/uploads', express.static(path.join('uploads')));

// // Routes
// app.use('/api/departments', departmentRoutes);

// // Connect to DB and start server
// // Connect to DB and start server
// mongoose.connect('mongodb://localhost:27017/vignan', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(5000, () => {
//       console.log('Server running on port 5000');
//     });
//   })
//   .catch((err) => {
//     console.log('Mongo error', err);
//   });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import departmentRoutes from './routes/departmentRoute';
import userRoute from './routes/userRoute';
import newsEventsRoute from './routes/newsEventsRoute';
import heroImageRoute from './routes/heroImageRoute';
import announcementRoute from './routes/announcementRoute';
import placementRoute from './routes/placementRoute';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/department', departmentRoutes);
app.use('/api/user',userRoute);
app.use('/api/newsEvents',newsEventsRoute);
app.use('/api/heroImage',heroImageRoute);
app.use("/images",express.static('uploads'));
app.use("/api/announcement",announcementRoute);
app.use("/api/placement",placementRoute);
// app.use('')

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));

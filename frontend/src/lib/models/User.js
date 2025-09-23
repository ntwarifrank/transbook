import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: [true, 'Clerk ID is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true,
       },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't include password in queries by default
    },
    subscriptionPlan: {
        type: String,
        enum: ['FREE', 'BASIC', 'PRO', 'BUSINESS'],
        default: 'FREE'
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive', 'cancelled', 'past_due'],
        default: 'active'
    },
    paddleCustomerId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple null values
    },
    wordCredit: {
        type: Number,
        default: 5000 // Default word credit for the FREE plan
    },
  
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

// Check if the model is already defined before defining it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

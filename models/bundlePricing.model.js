import mongoose, { Schema } from "mongoose";

const bundlePricingSchema = new mongoose.Schema({
    bundleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bundle',
    },
    isBundle: {
        type: Boolean
    },
    planName: {
        type: String,
        required: true,
    },
    planDescription: {
        type: String,
    },
    buyButtonText: {
        type: String,
    },
    pricingType: {
        type: String,
        enum: ["Free", "OneTimePayment", "Subscription", "PaymentPlan"],
    },
    currencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
    },
    currencyValue: {
        type: Number,
    },
    bulletPoints: [
        {
            bulletText: String,
        },
    ],
    enrollment: {
        type: Boolean,
    },
    enrollmentNumber: {
        type: Number,
    },
    availability: {
        type: Boolean,
    },
    availabilityStartDate: {
        type: Date,
        default: Date.now(),
    },
    availabilityEndDate: {
        type: Date,
        default: Date.now(),
    },
    plansValidityInDays: {
        type: Number,
    },
    tiers: {
        type: Boolean,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    isMostPopular: {
        type: Boolean,
    },
    status: {
        type: String,
        enum: ["Active", "InActive"],
    },
    addedAt: {
        type: Date,
        default: Date.now(),
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    // { timestamps: true }
);

const BundlePricing = mongoose.model('BundlePricing', bundlePricingSchema);
export default BundlePricing;
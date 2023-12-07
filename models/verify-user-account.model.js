import mongoose from "mongoose";

const confirmationCodeSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token:{
      type: String,
      required: true,
    },
    expireAt: { type: Date, default: Date.now, expires: 3600 },
    
    
  },
  
);
const Confirmation = mongoose.model("Confirmation", confirmationCodeSchema);
export default Confirmation;

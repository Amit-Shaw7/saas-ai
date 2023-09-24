import mongoose from "mongoose";

const LimitQuerySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    queryCount: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const LimitQuery = mongoose.models.LimitQuery || mongoose.model("LimitQuery", LimitQuerySchema);
export default LimitQuery;
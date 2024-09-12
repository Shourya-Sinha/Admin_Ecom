import moment from "moment";
import mongoose from "mongoose";

const cloudinaryUrlRegex = /^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+\/image\/upload\/v\d+\/[a-zA-Z0-9_\/-]+\.jpg$/;
const cloudinaryPublicIdRegex = /^[a-zA-Z0-9_\/-]+$/;

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "128GB", "256GB", "512GB"
  //price: { type: Number, required: true }, // Price for this specific variant
  price:{
    type: Number,
    required: true,
    min: 0,
    //set: v => parseFloat(v).toFixed(2) 
    //set: v => parseFloat(v.toFixed(2)),
},
  //quantity: { type: Number, required: true }, // Quantity for this specific variant
  quantity:{
    type: Number,
    required: true,
    min: 1,
},
});

const colorSchema = new mongoose.Schema({
  color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' }, // Color ID
  variants: [variantSchema], // Each color can have multiple variants
  images: [{ // Images specific to this color
    secure_url:{
      type: String,
      required: true,
      // validate: {
      //     validator: function(value) {
      //         return cloudinaryUrlRegex.test(value);
      //     },
      //     message: (props) => `Invalid URL format for secure_url ${props.value}`
      // }
  },
    public_id: {
      type: String,
      required: true,
      // validate: {
      //     validator: function(value) {
      //         return cloudinaryPublicIdRegex.test(value);
      //     },
      //     message: (props) => `Invalid public_id format ${props.value}`
      // }
  }
  }]
});


const productSchema = new mongoose.Schema({
  name:{
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Product Name must be at least 3 characters long'],
        maxlength: [300, 'Product Name must be at most 100 characters long'],
        trim: true
    },
    description:{
        type: String,
        required: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [800, 'Description must be at most 500 characters long'],
        trim: true
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
   
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'BrandModel',
        required: true
    },
  //   images: [{
  //     frontImage: {
  //         secure_url: {
  //             type: String,
  //             required: true,
  //             validate: {
  //                 validator: function(value) {
  //                     return cloudinaryUrlRegex.test(value);
  //                 },
  //                 message: (props) => `Invalid URL format for secure_url ${props.value}`
  //             }
  //         },
  //         public_id: {
  //             type: String,
  //             required: true,
  //             validate: {
  //                 validator: function(value) {
  //                     return cloudinaryPublicIdRegex.test(value);
  //                 },
  //                 message: (props) => `Invalid public_id format ${props.value}`
  //             }
  //         }
  //     },
  //     otherImages: [{
  //         secure_url: {
  //             type: String,
  //             required: true,
  //             validate: {
  //                 validator: function(value) {
  //                     return cloudinaryUrlRegex.test(value);
  //                 },
  //                 message: (props) => `Invalid URL format for secure_url ${props.value}`
  //             }
  //         },
  //         public_id: {
  //             type: String,
  //             required: true,
  //             validate: {
  //                 validator: function(value) {
  //                     return cloudinaryPublicIdRegex.test(value);
  //                 },
  //                 message: (props) => `Invalid public_id format ${props.value}`
  //             }
  //         }
  //     }]
  // }],
  colors: [colorSchema],
    tags:{
        type: [String],
        required: true,
        enum: ["Featured","Hot","Trending","Normal"],
        default: ["Normal"],
    },
    sold:{
        type:Number,
        default:0
    },
    totalRatings:{
        type:Number,
        default:0
    },
    ratings:[{
        star: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        revTitle:String,
        comment:String,
        postedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    }],
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date(),
        select: false,
    },
});

productSchema.index({ totalRatings: -1 });

productSchema.methods.updateRating = async function() {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.star, 0);
    this.totalRatings = sum / this.ratings.length;
  } else {
    this.totalRatings = 0;
  }
  await this.save();
};


const Product = mongoose.model('Product', productSchema);

export default Product;
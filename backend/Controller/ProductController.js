import moment from "moment";
import {
  uploadImage,
  uploadProductImages,
} from "../MiddleWares/UploadImages.js";
import Product from "../Model/ProductModel.js";
import User from "../Model/UserModel.js";
import { v2 as cloudinary } from "cloudinary";
import AppError from "../Utills/AppError.js";
//create A product

// const createProduct = async (req, res, next) => {
//     try {
//       const { name, description, category, brand, colorData } = req.body;
//       const colorArray = [];
//       const files = req.files;

//       console.log('Files:', files);

//       for (let i = 0; i < colorData.length; i++) {
//         const { colorId, variants } = colorData[i];
//         const processedImages = [];

//         console.log(`Processing color ${colorId}`);

//         // Assign images to each color
//         for (const file of files[`colorData[${i}][images][]`] || []) {
//           console.log('Processing image:', file.originalname);

//           const uploadResponse = await uploadImage(file);
//           console.log('Upload response:', uploadResponse);

//           processedImages.push({
//             secure_url: uploadResponse.secure_url,
//             public_id: uploadResponse.public_id,
//           });
//         }

//         colorArray.push({
//           color: colorId,
//           variants: variants.map(v => ({
//             name: v.name,
//             price: v.price,
//             quantity: v.quantity,
//           })),
//           images: processedImages,
//         });
//       }

//       const newProduct = await Product.create({
//         name,
//         description,
//         category,
//         brand,
//         colors: colorArray,
//       });

//       console.log('New product created:', newProduct);

//       res.status(201).json(newProduct);
//     } catch (error) {
//       console.error('Error in createProduct:', error);
//       next(error);
//     }
//   };
const createProduct = async (req, res, next) => {
  const localTime = moment();
  const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");
  try {
    const { name, description, category, brand, colorData, tags } = req.body;

    console.log("Received Product Name:", name);

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or missing product name." });
    }
    if (!description || typeof description !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or missing description." });
    }
    if (!category || typeof category !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or missing category." });
    }
    if (!brand || typeof brand !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or missing brand." });
    }
    if (!Array.isArray(colorData) || colorData.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or missing color data." });
    }

    const colorArray = [];

    // Process each color and its variants
    for (let i = 0; i < colorData.length; i++) {
      const { colorId, variants, images } = colorData[i];

      if (!colorId || typeof colorId !== "string") {
        return res
          .status(400)
          .json({ status: "error", message: `Invalid colorId at index ${i}.` });
      }

      if (!Array.isArray(variants) || variants.length === 0) {
        return res.status(400).json({
          status: "error",
          message: `Invalid or missing variants at index ${i}.`,
        });
      }
      const processedImages = [];

      // Process images for this color
      if (req.files[`colorData[${i}][images][]`]) {
        for (const file of req.files[`colorData[${i}][images][]`]) {
          // Upload image and get response
          const uploadResponse = await uploadImage(file);
          processedImages.push({
            secure_url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
          });
        }
      }

      // colorArray.push({
      //   color: colorId,
      //   variants: variants.map((v) => ({
      //     name: String(v.name), // Ensure name is a string
      //     price: parseFloat(v.price), // Ensure price is a number
      //     quantity: parseInt(v.quantity, 10), // Ensure quantity is a number
      //   })),
      //   images: processedImages,
      // });

      colorArray.push({
          color: colorId,
          variants: variants.map(v => {
              if (!v.name || typeof v.name !== 'string') {
                  throw new Error(`Invalid variant name: ${v.name}`);
              }
              if (isNaN(Number(v.price))) {
                  throw new Error(`Invalid variant price: ${v.price}`);
              }
              if (isNaN(Number(v.quantity))) {
                  throw new Error(`Invalid variant quantity: ${v.quantity}`);
              }
              return {
                  name: String(v.name), // Ensure name is a string
                  //price: parseFloat(v.price), // Ensure price is a number
                  price: parseFloat(v.price).toFixed(2),
                  quantity: parseInt(v.quantity, 10) // Ensure quantity is a number
              };
          }),
          images: processedImages,
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      category,
      brand,
      tags: tags,
      createdAt: newTime,
      updatedAt: null,
      colors: colorArray,
    });

    return res.status(201).json({
      status: "success",
      message: "Product created successfully.",
      data: newProduct,
    });
  } catch (error) {
    return next(new AppError(500, "error", error.message));
  }
};

// update a product
const updateProduct = async (req, res, next) => {
  const localTime = moment();
  const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");

  try {
    const { productId } = req.params;
    const { name, description, category, brand, colorData, tags } = req.body;

    console.log("Received Product ID:", productId);
    console.log("Received Product Name:", name);

    // Validation checks
    if (!productId || typeof productId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or missing product ID." });
    }
    // if (!name || typeof name !== "string") {
    //   return res
    //     .status(400)
    //     .json({ status: "error", message: "Invalid or missing product name." });
    // }
    // if (!description || typeof description !== "string") {
    //   return res
    //     .status(400)
    //     .json({ status: "error", message: "Invalid or missing description." });
    // }
    // if (!category || typeof category !== "string") {
    //   return res
    //     .status(400)
    //     .json({ status: "error", message: "Invalid or missing category." });
    // }
    // if (!brand || typeof brand !== "string") {
    //   return res
    //     .status(400)
    //     .json({ status: "error", message: "Invalid or missing brand." });
    // }
    if (!Array.isArray(colorData) || colorData.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or missing color data." });
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found." });
    }
    console.log('colorarray',colorData);
    const colorArray = [];

    // Process each color and its variants
    for (let i = 0; i < colorData.length; i++) {
      const { colorId, variants, images } = colorData[i];

      if (!colorId || typeof colorId !== "string") {
        return res
          .status(400)
          .json({ status: "error", message: `Invalid colorId at index ${i}.` });
      }

      if (!Array.isArray(variants) || variants.length === 0) {
        return res.status(400).json({
          status: "error",
          message: `Invalid or missing variants at index ${i}.`,
        });
      }

      // Remove existing images if they exist
      if (
        product.colors[i] &&
        product.colors[i].images &&
        product.colors[i].images.length > 0
      ) {
        for (const img of product.colors[i].images) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }

      const processedImages = [];

      // Upload new images
      if (req.files[`colorData[${i}][images][]`]) {
        for (const file of req.files[`colorData[${i}][images][]`]) {
          const uploadResponse = await uploadImage(file);
          processedImages.push({
            secure_url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
          });
        }
      }

      colorArray.push({
        color: colorId,
        variants: variants.map((v) => ({
          name: String(v.name), // Ensure name is a string
          price: parseFloat(v.price), // Ensure price is a number
          quantity: parseInt(v.quantity, 10), // Ensure quantity is a number
        })),
        images: processedImages, // Only new images are stored
      });
    }

    // Update the product fields
    product.name = name;
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.tags = tags;
    product.colors = colorArray;
    product.updatedAt = newTime;

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    return next(new AppError(500, "error", error.message));
  }
};

// find a Product by id
const findAProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or missing product ID." });
    }

    const product = await Product.findById(productId)
      .populate("category")
      .populate("brand")
      .populate("colors.color");

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found." });
    }

    return res.status(200).json({
      status: "success",
      message: "Product fetched successfully.",
      data: product,
    });
  } catch (error) {
    return next(new AppError(500, "error", error.message));
  }
};

//find all product
const getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find()
      .populate("category")
      .populate("brand")
      .populate("colors.color");

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Products not found." });
    }

    return res.status(200).json({
      status: "success",
      message: "Products fetched successfully.",
      data: product,
    });
  } catch (error) {
    return next(new AppError(500, "error", error.message));
  }
};

//add to wishlist
const addToWishlist = async (req, res, next) => {
  try {
    const { userId } = req.userId;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError(404, "error", "User not found"));
    }

    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === productId
    );

    if (alreadyAdded) {
      return res.status(400).json({
        status: "error",
        message: "Product already added to wishlist.",
      });
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { wishlist: productId } },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        message: "Product added to wishlist successfully.",
      });
    }
  } catch (error) {
    return next(new AppError(500, "error", error.message));
  }
};
// rate and comment on product
const ratings = async (req, res, next) => {
  try {
    const { userId } = req.userId;

    const { productId, comment, revTitle, star } = req.body;

    const product = await Product.findById(productId);

    let alreadyAdded = product.ratings.find(
      (userId) => userId.postedBy.toString() === __dirname.toString()
    );

    if (alreadyAdded) {
      return res.status(400).json({
        status: "error",
        message: "You have already rated this product.",
      });
    } else {
      const ratedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: userId,
              revTitle: revTitle,
            },
          },
        },
        { new: true }
      );
    }
    const getAllRatings = await Product.findById(productId);
    const totalRating = getAllRatings.ratings.length;
    let ratingsum = getAllRatings.ratings.map((item)=> item.star).reduce((prev,cur)=>prev+cur,0);
    let actualRating = Math.round(ratingsum /totalRating);
    let finalProduct = await Product.findByIdAndUpdate(productId,{totalRatings:actualRating},{new:true});
    return res.status(200).json({
      status: "success",
      message: "Rating and comment added successfully.",
      finalProduct
    });
  } catch (error) {
    return next(new AppError(500, "error", error.message));
  }
};

export {
  createProduct,
  updateProduct,
  findAProduct,
  getAllProduct,
  addToWishlist,
  ratings,
};

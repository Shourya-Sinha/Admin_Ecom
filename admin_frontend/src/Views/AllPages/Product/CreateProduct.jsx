import { RemoveCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNeWProduct,
  getAllBrands,
  getAllCategory,
  getAllColors,
} from "../../../Redux/Slices/DataSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.productData.category || []);
  const allBrands = useSelector((state) => state.productData.brand || []);
  const allColors = useSelector((state) => state.productData.colors || []);
  const { isNewLoading } = useSelector((state) => state.productData);
  const [colors, setColors] = useState([
    {
      colorId: "",
      variants: [{ name: "", price: "", quantity: "" }],
      images: [],
    },
  ]);

  // useEffect(() => {
  //   dispatch(getAllBrands());
  //   dispatch(getAllCategory());
  //   dispatch(getAllColors());
  // }, [dispatch]);

  const handleAddColor = () => {
    setColors([
      ...colors,
      {
        colorId: "",
        variants: [{ name: "", price: "", quantity: "" }],
        images: [],
      },
    ]);
  };

  const handleRemoveColor = (index) => {
    const list = [...colors];
    list.splice(index, 1);
    setColors(list);
  };

  const handleAddVariant = (colorIndex) => {
    const list = [...colors];
    list[colorIndex].variants.push({ name: "", price: "", quantity: "" });
    setColors(list);
  };

  const handleRemoveVariant = (colorIndex, variantIndex) => {
    const list = [...colors];
    list[colorIndex].variants.splice(variantIndex, 1);
    setColors(list);
  };

  const handleColorChange = (index, event) => {
    const { value } = event.target;
    const list = [...colors];
    list[index].colorId = value;
    setColors(list);
  };

  const handleVariantChange = (colorIndex, variantIndex, event) => {
    const { name, value } = event.target;
    const list = [...colors];
    list[colorIndex].variants[variantIndex][name] = value;
    setColors(list);
  };

  const handleImageUpload = (colorIndex, event) => {
    const files = Array.from(event.target.files);
    const list = [...colors];
    list[colorIndex].images = files;
    setColors(list);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create FormData object to send data to the server
    const formData = new FormData();
    const productName = event.target.productname.value;
    formData.append("name", productName);
    //console.log("Product Name:", event.target.productname.value);
    formData.append("description", event.target.description.value);
    formData.append("category", event.target.category.value);
    formData.append("brand", event.target.brand.value);

    colors.forEach((color, colorIndex) => {
      formData.append(`colorData[${colorIndex}][colorId]`, color.colorId);
      color.variants.forEach((variant, variantIndex) => {
        formData.append(
          `colorData[${colorIndex}][variants][${variantIndex}][name]`,
          variant.name
        );
        formData.append(
          `colorData[${colorIndex}][variants][${variantIndex}][price]`,
          variant.price
        );
        formData.append(
          `colorData[${colorIndex}][variants][${variantIndex}][quantity]`,
          variant.quantity
        );
      });
      color.images.forEach((image, imageIndex) => {
        formData.append(`colorData[${colorIndex}][images][]`, image);
      });
    });
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    dispatch(createNeWProduct(formData));
  };
  return (
    <>
      {/* <Container>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField fullWidth label="Product Name" name="name" required />
          <TextField fullWidth label="Product Description" name="description" multiline rows={4} required />
          <TextField fullWidth label="Category" name="category" select defaultValue="" required>
            {allCategory.map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="Brand" name="brand" select defaultValue="" required>
            {allBrands.map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>

          {allColors.map((color, colorIndex) => (
            <Box key={colorIndex} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">Color {colorIndex + 1}</Typography>
              <Stack spacing={2}>
                <TextField fullWidth label="Color ID" name="colorId" value={color.colorId} onChange={(event) => handleColorChange(colorIndex, event)} required />
                {color.variants.map((variant, variantIndex) => (
                  <Box key={variantIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField fullWidth label="Variant Name" name="name" value={variant.name} onChange={(event) => handleVariantChange(colorIndex, variantIndex, event)} required />
                    <TextField fullWidth label="Price" name="price" value={variant.price} onChange={(event) => handleVariantChange(colorIndex, variantIndex, event)} required />
                    <TextField fullWidth label="Quantity" name="quantity" value={variant.quantity} onChange={(event) => handleVariantChange(colorIndex, variantIndex, event)} required />
                    <IconButton onClick={() => handleRemoveVariant(colorIndex, variantIndex)}><RemoveCircle /></IconButton>
                  </Box>
                ))}
                <Button variant="outlined" onClick={() => handleAddVariant(colorIndex)}>Add Variant</Button>
                <input type="file" multiple onChange={(event) => handleImageUpload(colorIndex, event)} />
              </Stack>
              <IconButton onClick={() => handleRemoveColor(colorIndex)}><RemoveCircle /></IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddColor}>Add Color</Button>
          <Button type="submit" variant="contained">Create Product</Button>
        </Stack>
      </form>
    </Container> */}
      <Container>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Product Name"
              name="productname"
              required
            />
            <TextField
              fullWidth
              label="Product Description"
              name="description"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              select
              defaultValue=""
              required
            >
              {allCategory.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.categoryName} - {option.subCategory}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              select
              defaultValue=""
              required
            >
              {allBrands.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>

            {colors.map((color, colorIndex) => (
              <Box key={colorIndex} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">Color {colorIndex + 1}</Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Select Color"
                    name="colorId"
                    select
                    value={color.colorId}
                    onChange={(event) => handleColorChange(colorIndex, event)}
                    required
                  >
                    {allColors.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>

                  {color.variants.map((variant, variantIndex) => (
                    <Box
                      key={variantIndex}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        fullWidth
                        label="Variant Name"
                        name="name"
                        value={variant.name}
                        onChange={(event) =>
                          handleVariantChange(colorIndex, variantIndex, event)
                        }
                        required
                      />
                      <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={variant.price}
                        onChange={(event) =>
                          handleVariantChange(colorIndex, variantIndex, event)
                        }
                        required
                      />
                      <TextField
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        value={variant.quantity}
                        onChange={(event) =>
                          handleVariantChange(colorIndex, variantIndex, event)
                        }
                        required
                      />
                      <IconButton
                        onClick={() =>
                          handleRemoveVariant(colorIndex, variantIndex)
                        }
                      >
                        <RemoveCircle />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={() => handleAddVariant(colorIndex)}
                  >
                    Add Variant
                  </Button>
                  <input
                    type="file"
                    multiple
                    onChange={(event) => handleImageUpload(colorIndex, event)}
                  />
                </Stack>
                <IconButton onClick={() => handleRemoveColor(colorIndex)}>
                  <RemoveCircle />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" onClick={handleAddColor}>
              Add Color
            </Button>
            {isNewLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Button type="submit" variant="contained">
                Create Product
              </Button>
            )}
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default CreateProduct;

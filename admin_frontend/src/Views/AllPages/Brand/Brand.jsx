import { UploadOutlined } from "@ant-design/icons";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { Button as AntButton, Input, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBrand } from "../../../Redux/Slices/DataSlice";

// const fileList = [
//   {
//     uid: "0",
//     name: "xxx.png",
//     status: "uploading",
//     percent: 33,
//   },
//   {
//     uid: "-1",
//     name: "yyy.png",
//     status: "done",
//     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     thumbUrl:
//       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   },
//   {
//     uid: "-2",
//     name: "zzz.png",
//     status: "error",
//   },
// ];

const Brand = () => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const { isNewLoading, isLoading } = useSelector((state) => state.productData);
  const dispatch = useDispatch();
  const handleNameChange = (e) => {
    setBrandName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleUploadChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: brandName,
      description,
      brandlogo: fileList.length > 0 ? fileList[0].originFileObj : null, // Get file object
    };
    dispatch(createNewBrand(formData));
  };
  return (
    <>
      <Container>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Name of Brand"
              id="fullWidth"
              value={brandName}
              onChange={handleNameChange}
            />
          </FormControl>

          <TextField
            fullWidth
            label="Description of Brand"
            id="fullWidth"
            value={description}
            onChange={handleDescription}
          />

          <Upload
            //action=""
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
          >
            <AntButton type="primary" icon={<UploadOutlined />}>
              Choose Image
            </AntButton>
          </Upload>
          <Stack sx={{ alignItems: "end" }}>
            {isNewLoading ? (
              <CircularProgress
                size={24}
                sx={{
                  position: "relative",
                  top: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Create Brand
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Brand;

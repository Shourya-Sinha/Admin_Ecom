import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { Button as AntButton, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewCategory } from "../../../Redux/Slices/DataSlice";

const fileList = [
  {
    uid: "0",
    name: "xxx.png",
    status: "uploading",
    percent: 33,
  },
  {
    uid: "-1",
    name: "yyy.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    uid: "-2",
    name: "zzz.png",
    status: "error",
  },
];

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [fileList, setFileList] = useState([]);
  const { isNewLoading } = useSelector((state) => state.productData);
  const dispatch = useDispatch();

  const handleNamechange = (e) => {
    setCategoryName(e.target.value);
  };
  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };
  const handleuploadChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      categoryName,
      subCategory,
      catPic: fileList.length > 0 ? fileList[0].originFileObj : null,
    };
    dispatch(createNewCategory(formData));
  };
  return (
    <Container>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label="Name of Category"
            id="fullWidth"
            name="categoryName"
            onChange={handleNamechange}
          />
        </FormControl>

        <TextField
          fullWidth
          label="SubCategory Name"
          id="fullWidth"
          name="subCategory"
          onChange={handleSubCategoryChange}
        />

        <Upload
          action=""
          listType="picture"
          fileList={fileList}
          onChange={handleuploadChange}
        >
          <AntButton type="primary" icon={<UploadOutlined />}>
            Choose Image
          </AntButton>
        </Upload>
        <Stack sx={{ alignItems: "end" }}>
          {isNewLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Button variant="contained" onClick={handleSubmit}>
              Create Category
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default CreateCategory;

import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  // const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [category, setCategory] = useState("");
  const [bedcount, setBedcount] = useState("");
  const [nearby, setNearby] = useState("");

  const [bathcount, setBathcount] = useState("");

  const [interested, setInterested] = useState(0);
  const [photo, setPhoto] = useState("");

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("area", area);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("bedcount", bedcount);
      productData.append("bathcount", bathcount);
      productData.append("photo", photo);
      productData.append("nearby", nearby);
      productData.append("shipping", interested);

      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Add Property</h1>
            <div className="m-1 w-75">
              {/* <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select> */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a Property Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={area}
                  placeholder="write the area"
                  className="form-control"
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={bedcount}
                  placeholder="write total number of beds available"
                  className="form-control"
                  onChange={(e) => setBedcount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={nearby}
                  placeholder="write any nearby landmarks"
                  className="form-control"
                  onChange={(e) => setNearby(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={bathcount}
                  placeholder="write number of bathrooms available"
                  className="form-control"
                  onChange={(e) => setBathcount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Booked "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setInterested(value === "yes" ? 1 : 0);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  ADD PROPERTY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

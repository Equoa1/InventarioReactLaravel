import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Typography, Avatar, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import fetchAuthorsTableData from "@/data/Productstable";

export function Tables({ productId }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', quantity: '', price: '' });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ id: '', name: '', description: '', quantity: '', price: '' });
  const [authorsTableData, setAuthorsTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAuthorsTableData();
      setAuthorsTableData(data);
    };

    fetchData();
  }, []);

  const handleOpen = () => setOpen(!open);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/products', formData);
      console.log('Response:', response.data);

      // Actualiza la lista de productos en el estado
      setAuthorsTableData(prevData => [...prevData, response.data]);

      handleOpen();
    } catch (error) {
      console.error('Error adding product:', error);
      console.log('Error details:', error.response);
    }
  };

  const handleEditDialogOpen = () => setEditDialogOpen(true);
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditFormData({ id: '', name: '', description: '', quantity: '', price: '' });
  };

  const handleEditProduct = (id) => {
    const productToEdit = authorsTableData.find((product) => product.id === id);
    console.log('Producto a editar:', productToEdit);
    setEditFormData({ ...productToEdit });
    handleEditDialogOpen();
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/products/${editFormData.id}`, editFormData);
      console.log('Response:', response.data);

      // Actualiza la lista de productos en el estado
      setAuthorsTableData(prevData => prevData.map(product => 
        product.id === editFormData.id ? { ...editFormData } : product
      ));
      
      handleEditDialogClose();
    } catch (error) {
      console.error('Error editing product:', error);
      console.log('Error details:', error.response);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/products/${id}`);
      // Actualiza la lista de productos en el estado
      setAuthorsTableData(prevData => prevData.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      console.log('Error details:', error.response);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 relative">
          <Typography variant="h6" color="white">
            Add Product
          </Typography>
          <PlusIcon
            className="h-6 w-6 text-white absolute top-4 right-4 cursor-pointer"
            onClick={handleOpen}
          />
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Item", "Stock", "Price", "Date of Entry", "Edit", "Delete"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(({ id, img, name, description, quantity, price, date }, key) => {
                const className = `${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"} py-3 px-5`;
                return (
                  <tr key={id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={img} alt={name} size="sm" variant="rounded" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {description}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {quantity}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {"$ " + price}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {date}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                        onClick={() => handleEditProduct(id)}
                      >
                        Edit
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-red-600"
                        onClick={() => handleDeleteProduct(id)}
                      >
                        Delete
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogHeader>New Product</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <div className="input-label">Name:</div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
              className="input-field"
            />
            <div className="input-label">Description:</div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
              className="input-field"
            />
            <div className="input-label">Quantity:</div>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
              className="input-field"
            />
            <div className="input-label">Price:</div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
              className="input-field"
            />
          </div>
        </DialogBody>
        <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={handleEditDialogClose}>
        <DialogHeader>Edit Product</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <div className="input-label">Name:</div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
              className="input-field"
            />
            <div className="input-label">Description:</div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={editFormData.description}
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
              className="input-field"
            />
            <div className="input-label">Quantity:</div>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={editFormData.quantity}
              onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
              className="input-field"
            />
            <div className="input-label">Price:</div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editFormData.price}
              onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                width: '100%',
              }}
              className="input-field"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleEditDialogClose} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleEditSubmit}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
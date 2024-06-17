import axios from 'axios';

const fetchAuthorsTableData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/products');
    const transformedData = response.data.map(product => ({
      img: "/img/Box.jpg",
      id: product.id, 
      name: product.name,
      description: product.description,
      quantity:product.quantity,
      price:product.price,
      online: true,
      date: new Date().toLocaleDateString()
    }));
    return transformedData;
  } catch (error) {
    console.error('Error fetching authors table data:', error);
    return []; 
  }
};

export default fetchAuthorsTableData;

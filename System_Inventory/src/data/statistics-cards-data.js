import axios from 'axios';
import {
  ArchiveBoxXMarkIcon,

} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: ArchiveBoxXMarkIcon,
    title: "Product Count",
    value: " ", 
    footer: {
     
    },
  },
  
];


const updateProductCount = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/product-count');
    const newCount = response.data.product_count;
    statisticsCardsData[0].value = `${newCount}`;
  } catch (error) {
    console.error('Error updating product count:', error);
  }
};


await updateProductCount(); 

export default statisticsCardsData;

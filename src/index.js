import moment from "moment";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const shopifyApiConfig = {
  token: process.env.API_TOKEN,
  shop:  process.env.API_SHOP,
};

const formatDate = (fechaOriginal) => {
  const date = moment(fechaOriginal);
  const formattedDate = date.format('YYYY-DD-MM');
  return formattedDate;
}

const getProducts = async () => {
  const products = await axios.get(
    `https://${shopifyApiConfig.shop}/admin/api/2021-07/products.json`,
    {
      headers: {
        "X-Shopify-Access-Token": shopifyApiConfig.token,
        "Content-Type": "application/json",
      },
    }
  );

  const formattedProducts = products?.data?.products.map((product) => {
    const formattedDate = formatDate(product.created_at);
    return {
      ...product,
      created_at: formattedDate,
    };
  });

  console.log(formattedProducts);

  return formattedProducts;
};

getProducts();

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductInfo from './components/ProductInfo.jsx';
import StyleSelector from './components/StyleSelector.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import Description from './components/Description.jsx';
import AddToCart from './components/AddToCart.jsx';


const Overview = ({reviewMeta}) => {
  
    const [product, setProduct] = useState(null);
    const [currentStyle, setCurrentStyle] = useState(null);
    const [allStyles, setAllStyles] = useState(null);
    

    const getAllProducts = () => {
      axios.get('/products')
      .then((response) => {
        setProduct(response.data[5]);
        getAllStyles(response.data[5].id);
      })
      .catch((error) => {
        console.error('ERROR IN CLIENT GET', error);
      })
    }
    
    const getAllStyles = (productID) => {
      axios.get(`/products/${productID}/styles`)
      .then((response) => {
        //do some other stuff with it
        setAllStyles(response.data.results)
        setCurrentStyle(response.data.results[0])
      })
      .catch((error) => {
        console.error('ERROR IN CLIENT GET', error)
      })
    }
    
    useEffect(() => {
      getAllProducts()
    }, [])
    
  return (
    <div className="Overview">
      <ImageGallery currentStyle={currentStyle} allStyles={allStyles}/>
      <ProductInfo product={product} currentStyle={currentStyle} reviewMeta={reviewMeta}/>
      <StyleSelector allStyles={allStyles} currentStyle={currentStyle} setCurrentStyle={setCurrentStyle}/>
      <Description product={product}/>
      <AddToCart currentStyle={currentStyle}/>
    </div>
  )
}


//getItemsInCart() {
  //  axios.get('/cart')
  //  .then((response) => {
    //    // console.log(response)
    //    //do some other stuff with it
    //  })
    //  .catch((error) => {
      //    console.error('ERROR IN CLIENT GET', error)
      //  })
      //}
      
      //addToCart(productID) {
        //  axios.post(`/cart`, {sku_id: productID})
        //  .then((response) => {
          //    // console.log(response)
          //    //do some other stuff with it
          //  })
          //  .catch((error) => {
            //    console.error('ERROR IN CLIENT GET', error)
            //  })
            //}
            
export default Overview;
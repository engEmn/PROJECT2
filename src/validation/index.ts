
export const Productvalidation = (product: {title: string;description: string;imageURL: string;price: string;
}) => {
  //return obj
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = { title: "", description: "", imageURL: "", price: "" };

  const validurl=/^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL)


  if(!product.title.trim()||product.title.length<10||product.title.length>80){
    errors.title="product title must be between 10 and 80 character!"
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "product description must be between 10 and 80 character!";
  }
  if(!product.imageURL.trim()||!validurl){
    errors.imageURL="vaild image URL is required"
  }
  if(!product.price.trim() || isNaN(Number(product.price))){
    errors.price="vaild price is required"
  }
  return errors;
};
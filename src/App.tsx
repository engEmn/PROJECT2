import ProductCard from "./component/ProductCard";
import { productList, formInputsList, colors, categories } from "./data";
import Model from "./component/UI/Model";
import { useState } from "react";
import { Button } from "@headlessui/react";
import Input from "./component/UI/Input";
import type { IProduct } from "./interfaces";
import { type ChangeEvent, type FormEvent } from "react";
import { Productvalidation } from "./validation";
import Errormsg from "./Errormsg";
import Circlecolor from "./component/Circlecolor";
import { v4 as uuid } from "uuid";
import Select from "./component/UI/Select";
import type { ProductNametype } from "./types";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const defaultproductobj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const [products, setproducts] = useState<IProduct[]>(productList);
  const [product, setproduct] = useState<IProduct>(defaultproductobj);
  const [productedit, setproductedit] = useState<IProduct>(defaultproductobj);
  const [producteditidx, setproducteditidx] = useState<number>(0);
  const [errors, seterror] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempcolor,settempcolor]=useState<string[]>([])
  const [isOpen, setIsOpen] = useState(true);
  const [isOpeneditmodel, setIsOpeneditmodel] = useState(false);
  console.log(tempcolor)
  const [selectcategory, setselectcategory]=useState(categories[0]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);


  //handelr
  function open() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function openedit() {
    setIsOpeneditmodel(true);
  }
  function closeeditModal() {
    setIsOpeneditmodel(false);
  }
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  const onChangeHandel = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setproduct({
      ...product,
      [name]: value,
    });
    seterror({
      ...errors,
      [name]: "",
    });
  };
  const onChangeeditHandel = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setproductedit({
      ...productedit,
      [name]: value,
    });
    seterror({
      ...errors,
      [name]: "",
    });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { title, description, imageURL, price } = product;
    const validationErrors = Productvalidation({
      title,
      description,
      imageURL,
      price,
    });

    seterror(validationErrors);
    console.log("Validation Errors:", validationErrors);


    // لو فيه errors متوقفش عند أول input، اعرض الكل
    const hasErrors = Object.values(validationErrors).some(
      (value) => value !== ""
    );
    if (hasErrors) return;

    // لو مفيش errors
    console.log("Form submitted successfully ✅", product);
    closeModal();
    setproducts((prev) => [
      { ...product, id: uuid(), colors: tempcolor,category:selectcategory },
      ...prev,
    ]);
    setproduct(defaultproductobj)
    settempcolor([])
    closeModal();
    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      }})
  };
  const submiteditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { title, description, imageURL, price } = productedit;
    const validationErrors = Productvalidation({
      title,
      description,
      imageURL,
      price,
    });

    seterror(validationErrors);
    console.log("Validation Errors:", validationErrors);


    // لو فيه errors متوقفش عند أول input، اعرض الكل
    const hasErrors = Object.values(validationErrors).some(
      (value) => value !== ""
    );
    if (hasErrors) return;

    // لو مفيش errors
    console.log("Form submitted successfully ✅", product);
    closeModal();

    const ubdatedproducts=[...products]
    ubdatedproducts[producteditidx]={...productedit,colors:tempcolor.concat(productedit.colors)}; 
    setproducts(ubdatedproducts)

    setproductedit(defaultproductobj)
    settempcolor([])
    closeeditModal();
  };  

  const oncancel = () => {
    setproduct(defaultproductobj);
    closeModal();
  };

  const removeProductHandler=()=>{
    const filtred=products.filter(product=>product.id!==productedit.id)
    setproducts(filtred)
    closeConfirmModal();
    toast("Product has been deleted",{
      icon: "👏",
      style:{backgroundColor:"black",
        color:"white"
    }})
  };
  
//////render
  const renderProductlist = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setproductedit={setproductedit}
      openeditmodel={openedit}
      idx={idx}
      setproducteditidx={setproducteditidx}
      openconfirmmodel={openConfirmModal}
    />
  ));

  const renderformInputsList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandel}
      />
      <Errormsg msg={errors[input.name]} />
    </div>
  ));
  const renderproductcolors=colors.map(color=>(<Circlecolor key={color} color={color} onClick={()=>{
    if(tempcolor.includes(color)){
      settempcolor(prev=>prev.filter(item=>item !==color))
      return
    }
    if(productedit.colors.includes(color)){
      settempcolor(prev=>prev.filter(item=>item !==color))
      return
    }
    settempcolor(prev=>[...prev,color])
  }}/>) )

  const renderproductedit=(id:string,label:string,name:ProductNametype)=>{
    return(
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {/* {input.label} */}
        {label}
      </label>
      <Input
        type="text"
        id={id}
        name={name}
        value={productedit[name]}
        onChange={onChangeeditHandel}
      />
      <Errormsg msg={errors[name]} />
    </div>)
  }
  return (
    <main className="container text-2xl ">
      <div className="flex justify-center">
        <Button
          className="bg-gray-900 hover:bg-gray-800 w-1/3 text-white rounded-lg px-6 py-3"
          onClick={open}
        >
          Build Product
        </Button>
      </div>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductlist}
      </div>
      {/* add model */}
      <Model isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form className="space-y-2" onSubmit={submitHandler}>
          {renderformInputsList}
          <Select selected={selectcategory} setSelected={setselectcategory} />
          <div className="flex items-center my-4 space-x-2">
            {renderproductcolors}
          </div>
          <div className="flex items-center my-4 space-x-2">
            {tempcolor.map((color) => (
              <span key={color} style={{ backgroundColor: color }}>
                {" "}
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-10 justify-around m-5">
            <Button
              className="bg-gray-400 rounded-lg text-white px-3 py-3 duration-200 font-medium w-1/3"
              type="submit"
            >
              Submit
            </Button>
            <Button
              type="button"
              className="bg-gray-900 hover:bg-gray-800 rounded-lg text-white px-3 py-3 duration-200 font-medium w-1/3"
              onClick={oncancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
      {/* edit product model */}
      <Model
        isOpen={isOpeneditmodel}
        closeModal={closeeditModal}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-y-5 px-6 py-4" onSubmit={submiteditHandler}>
          {renderproductedit("title", "product title", "title")}
          {renderproductedit(
            "description",
            "product description",
            "description"
          )}
          {renderproductedit("imageURL", "imageURL", "imageURL")}
          {renderproductedit("price", "product price", "price")}

          <Select
            selected={productedit.category}
            setSelected={(value) =>
              setproductedit({ ...productedit, category: value })
            }
          />
          <div className="flex items-center my-4 space-x-2">
            {renderproductcolors}
          </div>
          <div className="flex items-center my-4 space-x-2">
            {tempcolor.concat(productedit.colors).map((color) => (
              <span key={color} style={{ backgroundColor: color }}>
                {" "}
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-10 justify-around m-5">
            <Button
              className="bg-gray-400 rounded-lg text-white px-3 py-3 duration-200 font-medium w-1/3"
              type="submit"
            >
              Submit
            </Button>
            <Button
              type="button"
              className="bg-gray-900 hover:bg-gray-800 rounded-lg text-white px-3 py-3 duration-200 font-medium w-1/3"
              onClick={closeeditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
      {/* DELETE PRODUCT CONFIRM MODAL */}
      <Model
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center justify-end gap-4 mt-6">
          <Button
            className="bg-[#c2344d] hover:bg-red-800 text-white text-lg px-6 py-3 rounded-lg shadow-sm font-semibold transition duration-200"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-lg px-6 py-3 rounded-lg shadow-sm font-semibold transition duration-200"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Model>

      <Toaster />
    </main>
  );
};

export default App;



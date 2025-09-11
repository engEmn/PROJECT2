import { memo } from "react";
import type { IProduct } from "../interfaces";


import { txtSlices } from "../utils/Function";
import Circlecolor from "./Circlecolor";
import Image from "./Image";
import Button from "./UI/Button";


interface IProps {
  product: IProduct;
  setproductedit: (product: IProduct) => void;
  openeditmodel: () => void;
  idx: number;
  setproducteditidx: (value: number) => void;
  openconfirmmodel:()=>void;
}

const ProductCard = ({
  product,
  setproductedit,
  openeditmodel,
  idx,
  setproducteditidx,
  openconfirmmodel,
}: IProps) => {
  const { title, description, imageURL, price, colors, category } = product;
  const renderproductcolors = colors.map((color) => (
    <Circlecolor key={color} color={color} />
  ));

  const onedit = () => {
    setproductedit(product);
    openeditmodel();
    setproducteditidx(idx);
  };

  const onremove = () => {
    setproductedit(product);
    openconfirmmodel();
  };
  return (
    <div className="w-full sm:w-72 border rounded-md p-4 flex flex-col justify-between">
      <Image
        imageurl={imageURL}
        alt={"product name"}
        className="rounded-md mb-2"
      />

      <h3>{title} </h3>
      <p>{txtSlices(description)}</p>
      <div className="flex items-center my-4 space-x-2">
        {renderproductcolors}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-600 font-semibold">${price}</span>
        <Image
          imageurl={category.imageURL}
          alt={product.category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-700 hover:bg-indigo-800 " onClick={onedit}>
          EDIT
        </Button>
        <Button className="bg-[#c2344d] hover:bg-red-800 " onClick={onremove}>
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default memo(ProductCard);



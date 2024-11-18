import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import { Link } from "react-router-dom";

export default function Card({product}) {
    return (
        <Link to={`/products/${product.slug}` ?? ''} className="flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#2C2C2C] hover:ring-opacity-40 active:ring-5 active:ring-[#9EF40B] hover:ring-4 hover:ring-[#9EF40B] active:ring-2 active:ring-opacity-90 hover:ring-opacity-100" >
        <div className="flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#2C2C2C]" >
            <img src={product.imageUrl ?? ''} alt={product.name ?? 'No name'} className="block max-h-[300px] mb-4 object-cover" />
                <div className="flex flex-col gap-2">
                    <h4 className="font-medium text-[20px] text-white">{product.name ?? 'No Name'}</h4>
                    <span className="block font-medium text-[14px] text-[#eaeaea]">{product.category ?? 'Uncatagorized'}</span>
                    <span className="block font-medium text-[20px] text-white">{formatToIDRCurrency(product.price) ?? 'Not for sale'}</span>
                    <div>
                    {product.stock <= 0 ? (
                        <p className="text-xl font-semibold text-center text-red-500">Out of Stock</p>
                    ) : (product.stock <= 25 && product.stock !== 0) ? (
                        <>
                        <p className="text-xl font-semibold text-center text-yellow-500">Almost Sold Out</p>
                            <Button type="button" className="inline-flex items-center justify-center gap-2 p-4 bg-[#9EF40B] text-center hover:bg-[#7CC500] text-[#212121] active:bg-[#598E00]">
                            <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                            <span>Add to cart</span>
                            </Button>
                        </>
                    
                    ) : (
                        <Button type="button" className="inline-flex items-center justify-center gap-2 p-4 bg-[#9EF40B] text-center hover:bg-[#7CC500] text-[#212121] active:bg-[#598E00]">
                        <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                        <span>Add to cart</span>
                        </Button>
                    )}
                    </div>
                </div>
            </div>
            </Link>
    )
}

Card.propTypes = {
    product: PropTypes.object
}
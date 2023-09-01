import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useCartContext } from '../context/CartContext'
import CartItem from './CartItem';
import { formatCurrency } from '../utlits/formatCurrency';

type Props = {
    isOpen:boolean
}

const CartDrawer = ({isOpen} : Props ) : React.ReactElement => {
   const {closeCart ,cartItems,allItems}= useCartContext();
 
   if(cartItems&&cartItems.length < 0){closeCart()}
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
           <Offcanvas.Title>
                Cart
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {
                cartItems && cartItems.length > 0 &&  cartItems.map((item)=> (
                    <CartItem id={item?.id} quantity={item?.quantity}  key={ item?.id}/>
                ))
            }
            <div className='align-items-end text-end fw-semibold fs-5'>Total : { cartItems && cartItems.length > 0 ? formatCurrency( cartItems.reduce((total, cartItem) => {
                const item = allItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0))  : null}</div>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default CartDrawer
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { formatCurrency } from '../utlits/formatCurrency'
import { useCartContext } from '../context/CartContext'

type Props = {
    id:number, name:string, price:number, imgUrl:string,
}

const StoreItem = ({id, name, price, imgUrl}: Props) => {
 
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      } = useCartContext() ;  
  
      const qty = getItemQuantity(id)
  return (
   <Card className='h-100'>
    <Card.Img variant='top' height={'200px'} src={imgUrl} style={{objectFit:'cover'}}></Card.Img>
    <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        {
            qty === 0 ? 
        
        <Button  onClick={()=>increaseCartQuantity(id)}> + Add to cart</Button>
        :(
            <div
            className="d-flex align-items-center flex-column"
            style={{ gap: ".5rem" }} 
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button 
              onClick={() => decreaseCartQuantity(id)} 
              >-</Button>
              <div>
                <span className="fs-3">{qty}</span> in cart
              </div>
              <Button 
              onClick={() => increaseCartQuantity(id)}
              >+</Button>
            </div>
            <Button
              onClick={() => removeFromCart(id)}
              variant="danger"
              size="sm"
            >
              Remove
            </Button>
          </div>
        )}
        </Card.Body>
   </Card>
  )
}

export default StoreItem
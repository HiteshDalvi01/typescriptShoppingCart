import React from 'react'
import { useCartContext } from '../context/CartContext'
import { Stack, Button } from 'react-bootstrap';
import { formatCurrency } from '../utlits/formatCurrency';

type Props = {
    id : number,
    quantity : number
}

const CartItem = ({id , quantity}: Props) => {
    const {removeFromCart , allItems} = useCartContext();
    let item = allItems.find((item)=> item.id === id)
    if(!item) return null;
    console.log({item})
    return (
        <Stack direction="horizontal" gap={2}>
            <div className="p-2 d-flex col-8"> 
                <img src={item?.image} alt={item?.title  || '-'} height="100px"/>
                <div className="p-2">
                    <div>{item?.title  || '-'} x{quantity  || '-'}</div>
                    <div>{formatCurrency(item?.price) || '-'}</div>
                </div>
            </div>
            <div className="p-2 d-flex col-3 align-items-end">
                <div className="p-2">{formatCurrency(item?.price * quantity)}</div>
                <Button variant='outline-danger'   onClick={()=>removeFromCart(item?.id)}>x</Button>
            </div>
        </Stack>
    )
}

export default CartItem
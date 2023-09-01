import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import StoreItem from '../common/StoreItem';
import { useCartContext } from '../context/CartContext';

type Props = {}

const Store = (props: Props) => {
    const { allItems,  setAllItems } = useCartContext();
    const getProducts=()=>{
        fetch('https://fakestoreapi.com/products?limit=5')
            .then(res=>res.json())
            .then(json=>{
            setAllItems(json)
            })
    }
    useEffect(() => {
        getProducts();
    }, [])
    
  return (
    <>
    <h1>Store</h1>
    <Row md={2} xs={1} lg={3} className='g-3'>
        {
            allItems && allItems.length > 0 && allItems.map(data =>
                <Col key={data.id}>
                    <StoreItem id={data?.id} name={data?.title} price={data?.price} imgUrl={data?.image}/>
                </Col>

             )  
        }

    </Row>
    </>
  )
}

export default Store
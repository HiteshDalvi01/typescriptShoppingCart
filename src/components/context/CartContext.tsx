import React, { ReactNode, createContext, useContext, useState } from 'react'
import CartDrawer from '../common/CartDrawer'
import { useLocalstorage } from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
    children: ReactNode
}
type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    allItems : Array
    setAllItems: () => void
}

const ShoppingCartContext= createContext({} as ShoppingCartContext)

export const useCartContext = () => {
  return useContext(ShoppingCartContext)
}




export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false) 
    const [cartItems, setcartItems] = useLocalstorage<CartItem[]>(
        "shopping-cart",
        []
      )
    
      //  const [cartItems, setcartItems] = useState<CartItem[]>(
        
      //   []
      // )
      const [allItems,  setAllItems]=useState<CartItem[]>([]);
      const cartQuantity = cartItems && cartItems.length > 0 && cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      ) || 
    '-';
    
      const openCart = () => setIsOpen(true)
      const closeCart = () => setIsOpen(false)
      
    const getItemQuantity =(id:number)=>{
        return cartItems.find((item)=> item.id === id)?.quantity || 0
    }
    const increaseCartQuantity =(id:number)=>{
        setcartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
              return [...currItems, { id, quantity: 1 }]
            } else {
              return currItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity + 1 }
                } else {
                  return item
                }
              })
            }
          })
    }
    const decreaseCartQuantity =(id:number)=>{
        setcartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
              return currItems.filter((item)=> item.id !== id)
            } else {
              return currItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity - 1 }
                } else {
                  return item
                }
              })
            }
          })
    }
    const removeFromCart =(id:number)=>{
        setcartItems(currItems=>{
            return currItems.filter((item)=>item.id !== id)
        })
    }
 return(
  <ShoppingCartContext.Provider
  value={{ getItemQuantity, increaseCartQuantity , decreaseCartQuantity , removeFromCart,cartQuantity,cartItems,openCart,closeCart, allItems,  setAllItems}}>
    {children}
    <CartDrawer isOpen={isOpen}/>
  </ShoppingCartContext.Provider>)
}
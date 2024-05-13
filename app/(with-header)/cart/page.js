import dynamic from 'next/dynamic'
const AddCart = dynamic(()=>import('@/components/CartComp/AddCart'))
const CartPage = () => {
  return (
    <>
      <AddCart />
    </>
  )
}

export default CartPage
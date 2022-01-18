import { memo, useState } from 'react'
import {AddProductToWishListProps} from './AddProductToWishList'

// Code splitting
// Poder de importar algum arquivo ou componente somente no momento que for utilizar
import dynamic from 'next/dynamic'

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }

  onAddToWishList: (id: number) => void;
}

// shallow compare => comparação rasa

export function ProductItemComponent({product, onAddToWishList}: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
      {isAddingToWishList && (
        <AddProductToWishList onAddToWishList={() => onAddToWishList(product.id)} onRequestClose={() => setIsAddingToWishList(false)} />
      )}
    </div>
  )
}


export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});


// useMemo:
// Unica funcionalidade: Evitar que alguma coisa que ocupe muito processamento seja refeito toda vez que o componente renderizar
// situações de uso: Calculos pesados ou se a variavel criada é passada para outros componentes


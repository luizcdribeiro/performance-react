import { List, AutoSizer, ListRowRenderer } from 'react-virtualized'
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
  totalPrice: number
}

export function SearchResults({results, onAddToWishList, totalPrice} : SearchResultsProps) {

  const rowRender: ListRowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} onAddToWishList={onAddToWishList} />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}

      />
    </div>
  )
}
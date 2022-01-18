import type { NextPage } from 'next';
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
}



const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const totalPrice = data.reduce((total, product) => {
      return total + product.price
    }, 0)

    setResults({totalPrice, data});
  };

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" onChange={e => setSearch(e.target.value)} />

        <button type='submit'>
          Buscar
        </button>
      </form>

      <SearchResults onAddToWishList={addToWishList} results={results.data} totalPrice={results.totalPrice} />
    </div>
  )
}

export default Home

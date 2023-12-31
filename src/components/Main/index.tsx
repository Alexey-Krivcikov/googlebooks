import React from 'react';
import BookCard from '../BookCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooksData, addItems, fetchNewBooks } from '../../redux/slices/booksSlice';
import { selectSearchData, setStartIndex } from '../../redux/slices/searchSlice';
import styles from './Main.module.scss';

const Main = () => {
  const dispatch = useDispatch();
  const { items, status, totalItems } = useSelector(selectBooksData);
  const { searchQuery, sort, maxResults, startIndex, category } = useSelector(selectSearchData);
  const loadMoreBooks = async () => {
    const nextPage = startIndex + 1;
    dispatch(setStartIndex(nextPage));

    const nextIndex = nextPage * maxResults;
    const selectedCategory = category === 'all' ? '' : category;

    const { payload } = await dispatch(
      // @ts-ignore
      fetchNewBooks({
        searchQuery,
        sort,
        startIndex: nextIndex,
        maxResults,
        selectedCategory,
      }),
    );
    const newItems = payload.items;
    console.log(items);
    console.log(newItems);
    // @ts-ignore
    dispatch(addItems(newItems));
  };
  return (
    <main className={styles.main}>
      {totalItems > 0 && <p>Total items: {totalItems}</p>}
      <div>
        {status === 'loading' && <>Loading...</>}
        {status === 'success' &&
          items.map((obj: any) => (
            <Link to={`/books/${obj.id}`} key={obj.id}>
              <BookCard {...obj} />
            </Link>
          ))}
      </div>
      {totalItems !== items.length && <button onClick={loadMoreBooks}>Load more</button>}
    </main>
  );
};

export default Main;

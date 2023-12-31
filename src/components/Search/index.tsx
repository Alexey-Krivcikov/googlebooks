import React from 'react';
import Category from '../Category';
import Sort from '../Sort';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchData, setSearchQuery } from '../../redux/slices/searchSlice';
import { fetchBooks } from '../../redux/slices/booksSlice';
import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const { searchQuery, sort, category, startIndex, maxResults } = useSelector(selectSearchData);

  const onChangeSearch = (event: any) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const selectedCategory = category === 'all' ? '' : category;

    dispatch(
      // @ts-ignore
      fetchBooks({
        searchQuery,
        sort,
        startIndex,
        maxResults,
        selectedCategory,
      }),
    );
  };

  return (
    <form className={styles.form} id="bookSearchForm">
      <input
        onChange={onChangeSearch}
        type="text"
        id="searchInput"
        name="searchQuery"
        placeholder="Введите название книги..."
        required
      />
      <Category />
      <Sort />
      <button type="submit" onClick={onSubmit}>
        search
      </button>
    </form>
  );
};

export default Search;

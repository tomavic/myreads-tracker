import {
  BookData,
  BookDropResult,
  BookDraggedItem,
  shelves,
} from 'src/app/models/book';
import { DEFAULT_BOOK_COVER, DND } from 'src/app/models/conf';
import { useDrag } from 'react-dnd';
import { useBooksContext } from 'src/app/context/books-context';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../../api/BooksAPI';
import { Card } from '@chakra-ui/react';

type BookProps = {
  book: BookData;
};

export default function Book({ book }: BookProps) {
  // TODO: use dispatch instead to update book shelf
  const { state, dispatch } = useBooksContext();

  const bookCover: string =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : DEFAULT_BOOK_COVER;

  const handleBookDrag = (b: BookData | BookDraggedItem, shelf: string) => {
    const updatedBook: BookData | BookDraggedItem = { ...b, shelf };
    updateBook(updatedBook);
  };

  const updateOnSelect = (shelf: any) => {
    const updatedBook: BookData | BookDraggedItem = { ...book, shelf };
    updateBook(updatedBook);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND.type,
    item: { title: book.title, id: book.id, shelf: book.shelf },
    end: (item, monitor) => {
      const dropResult: BookDropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (item.shelf !== dropResult.id) {
          handleBookDrag(item, dropResult.id);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  const updateBook = async (
    book: BookData | BookDraggedItem
  ): Promise<void> => {
    const existingBook = state.books.find((b) => b.id === book.id);
    try {
      if (existingBook) {
        const shelf = existingBook.shelf;
        if (shelf === book.shelf) {
          //No change
          return;
        } else if (shelf === 'none') {
          //Remove
          await BooksAPI.update(book, book.shelf);
          dispatch({
            type: 'SET_BOOKS',
            payload: state.books.filter((b) => b.id !== existingBook.id),
          });
        } else {
          //Change
          await BooksAPI.update(book, book.shelf);
          Object.assign(existingBook, book);
          dispatch({ type: 'SET_BOOKS', payload: [...state.books] });
        }
      } else {
        await BooksAPI.update(book, book.shelf);
        dispatch({
          type: 'SET_BOOKS',
          payload: [...state.books, book] as BookData[],
        });
      }
    } catch (e) {
      console.log('Error updating book:', e);
    }
  };

  return (
    <Card ref={drag} className="book" style={{ opacity }}>
      hola
    </Card>
  );
}

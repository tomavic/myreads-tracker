import { Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { PATHS } from 'src/app/models/conf';
import Shelf from '../../components/shelf/shelf';
import { shelves } from 'src/app/models/book';
import { useBooksContext } from 'src/app/context/books-context';
import { Player } from '@lottiefiles/react-lottie-player';

import { useEffect } from 'react';
import * as BooksAPI from '../../../app/api/BooksAPI';
import { Box, Container } from '@chakra-ui/react';

export default function HomePage() {
  const { state, dispatch } = useBooksContext();

  useEffect(() => {
    dispatch({ type: 'SET_LOADER', payload: true });
    BooksAPI.getAll()
      .then((res) =>
        res.length > 1
          ? dispatch({ type: 'SET_BOOKS', payload: res })
          : dispatch({ type: 'SET_BOOKS', payload: [] })
      )
      .catch(() => dispatch({ type: 'SET_BOOKS', payload: [] }))
      .finally(() => dispatch({ type: 'SET_LOADER', payload: false }));
  }, [dispatch]);

  return (
    <div className="list-books">
      <Box bg="gray.600" paddingY={'20px'}>
        <Container>
          <img
            src="/favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top rounded"
            alt="MyBooks Tracker"
          />{' '}
          <span className="text-light text-center">MyBooks Tracker</span>
          <Link to={PATHS.search}>
            {/* <FontAwesomeIcon className="text-light" icon={faSearch} /> */}
          </Link>
        </Container>
      </Box>

      <div className="list-books-content mt-5">
        <DndProvider backend={HTML5Backend}>
          {state.loading ? (
            <Player
              src="https://assets4.lottiefiles.com/packages/lf20_4XmSkB.json"
              className="player"
              style={{ height: '60vh', width: '50vw' }}
              loop
              autoplay
            />
          ) : (
            <div>
              <Shelf id={'currentlyReading'} title={shelves.currentlyReading} />
              <Shelf id={'wantToRead'} title={shelves.wantToRead} />
              <Shelf id={'read'} title={shelves.read} />
            </div>
          )}
        </DndProvider>
      </div>
    </div>
  );
}

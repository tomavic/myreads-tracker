import { Box, Button, Container } from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookData } from 'src/app/models/book';
import { PATHS } from 'src/app/models/conf';
import * as BooksAPI from '../../api/BooksAPI';

function BookDetails() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [currentBook, setCurrentBook] = useState<BookData>({} as BookData);

  useEffect(() => {
    if (id) {
      BooksAPI.get(id)
        .then((res) => setCurrentBook(res))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <Box bg="dark">
        <Container>
          <Link title="Back" to={PATHS.list}>
            <Button className="text-nowrap me-4" variant="dark">
              {/* <FontAwesomeIcon className="me-1" icon={faCircleChevronLeft} /> */}
              Back
            </Button>
          </Link>
          <div className="d-flex flex w-100"></div>
        </Container>
      </Box>
      <Container>
        {loading ? (
          <Player
            src="https://assets4.lottiefiles.com/packages/lf20_4XmSkB.json"
            className="player"
            style={{ height: '300px', width: '300px' }}
            loop
            autoplay
          />
        ) : (
          <div className="card my-3">
            <div className="row g-0">
              <div className="col-md-2">
                <img
                  src={currentBook.imageLinks?.thumbnail}
                  className="img-fluid rounded-start"
                  alt="thumbnail"
                />
              </div>
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">{currentBook.title}</h5>
                  <p className="card-text">{currentBook.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default BookDetails;

import { Player } from '@lottiefiles/react-lottie-player';

import { PATHS } from '../models/conf';
import { Link } from 'react-router-dom';
import { Button, Container } from '@chakra-ui/react';

function NotFound() {
  return (
    <Container>
      <Player
        src="https://assets2.lottiefiles.com/packages/lf20_suhe7qtm.json"
        className="player"
        style={{ height: '60vh', width: '600px' }}
        loop
        autoplay
      />
      <Link title="Back" to={PATHS.list}>
        <Button className="w-100 mt-5" variant="success" size="lg">
          {/* <FontAwesomeIcon className="text-light me-1" icon={faHome} /> */}
          Back to Home
        </Button>
      </Link>
    </Container>
  );
}

export default NotFound;

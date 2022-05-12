import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Characters from './Characters.jsx';

it('should render a list of characters', () => {
  const mockCharList = [
    {
      id: 1,
      name: 'Barnaby',
      status: 'Alive',
      species: 'Human',
      image: 'https://website.com/image/barnaby.jpg',
    },
    {
      id: 2,
      name: 'From',
      status: 'Unknown',
      species: 'Alien',
      image: 'https://website.com/image/from.jpg',
    },
    {
      id: 3,
      name: 'Whoknows',
      status: 'Deceased',
      species: 'Robot',
      image: 'https://website.com/image/whoknows.jpg',
    },
  ]
  const { container } = render (
    <MemoryRouter>
      <Characters characters={mockCharList} />
    </MemoryRouter>
  )
})
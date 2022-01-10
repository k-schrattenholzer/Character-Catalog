import { render } from '@testing-library/react';
import Character from './Character.jsx';

it('should render a character detail', () => {
  const mockChar = {
    image: 'http://example.com/image.jpg',
    name: 'Katie',
    species: 'Unknown',
    status: 'Unknown'
  }
  const { container } = render (
    <Character character={mockChar}/>
  )

  expect(container).toMatchSnapshot();
})
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CharacterDetail from './CharacterDetail.jsx';

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        image: 'http://example.com/image.jpg',
        name: 'Katie',
        species: 'Unknown',
        status: 'Unknown'
      })
    );
  })
);

describe('CharacterDetail', () => {
  
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  })
  
  it('should render a character', async () => {
    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Route path="/characters/:id">
          <CharacterDetail />
        </Route>
      </MemoryRouter>
    );
    screen.getByText('Loading character...');
    
    return waitFor(() => {
      screen.getByText('Katie');
    })
  })
})
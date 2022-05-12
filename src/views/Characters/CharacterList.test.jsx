import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CharacterList from './CharacterList.jsx';

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    return res(
      ctx.json({
        "info": {
            "count": 826,
            "pages": 42,
            "next": "https://rickandmortyapi.com/api/character?page=2",
            "prev": null
        },
        "results": [
            {
                "id": 1,
                "name": "Rick Sanchez",
                "status": "Alive",
                "species": "Human",
                "type": "",
                "gender": "Male",
                "origin": {
                    "name": "Earth (C-137)",
                    "url": "https://rickandmortyapi.com/api/location/1"
                },
                "location": {
                    "name": "Citadel of Ricks",
                    "url": "https://rickandmortyapi.com/api/location/3"
                },
                "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                "episode": [
                    "https://rickandmortyapi.com/api/episode/1",
                ],
                "url": "https://rickandmortyapi.com/api/character/1",
                "created": "2017-11-04T18:48:46.250Z"
            }
        ]
    })
    );
  })
);

describe("CharacterList", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  })

  it('should render a list of characters', async () => {
    render(
      <MemoryRouter initialEntries={['/characters']} >
        <Route path='/characters'>
          <CharacterList />
        </Route>
      </MemoryRouter>
    );

    screen.getByAltText(/loading characters/i);

    return waitFor(() => {
      screen.getByText('Rick Sanchez');
    })
  })
})
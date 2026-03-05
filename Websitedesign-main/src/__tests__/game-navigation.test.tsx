import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Home from '../app/pages/Home';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';

// Mock GlobalMap to avoid canvas issues
vi.mock('../app/components/GlobalMap', () => {
  return { GlobalMap: () => <div data-testid="global-map" /> };
});

describe('Game Card Navigation', () => {
  it('navigates to the correct game page when a game card is clicked', async () => {
    // We'll use a wrapper to provide the router context
    const routes = [
      {
        path: '/',
        element: (
          <Home />
        ),
      },
      {
        path: '/games/:gameId',
        element: <div data-testid="game-page">Game Page</div>,
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    // Find the Rust game card (Link)
    const rustCard = screen.getByRole('link', { name: /Rust/i });
    expect(rustCard).toBeInTheDocument();
    expect(rustCard).toHaveAttribute('href', '/games/Rust');

    // Click the card
    await act(async () => {
      fireEvent.click(rustCard);
    });

    // Verify navigation happened
    expect(screen.getByTestId('game-page')).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/games/Rust');
  });

  it('navigates to the Minecraft page when the Minecraft card is clicked', async () => {
    const routes = [
      {
        path: '/',
        element: (
          <Home />
        ),
      },
      {
        path: '/games/:gameId',
        element: <div data-testid="game-page">Game Page</div>,
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    const minecraftCard = screen.getByRole('link', { name: /Minecraft/i });
    
    await act(async () => {
      fireEvent.click(minecraftCard);
    });

    expect(router.state.location.pathname).toBe('/games/Minecraft');
  });
});

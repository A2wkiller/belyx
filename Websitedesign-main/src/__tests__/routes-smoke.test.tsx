import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Layout } from '../app/components/ui/Layout';
import Home from '../app/pages/Home';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';

vi.mock('../app/components/GlobalMap', () => {
  return { GlobalMap: () => null };
});

describe('Routes smoke', () => {
  it('renders Home on /', () => {
    const routes = [
      {
        path: '/',
        element: (
          <Layout />
        ),
        children: [{ index: true, element: <Home /> }],
      },
    ];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    act(() => {
      render(<RouterProvider router={router} />);
    });
    expect(screen.getByText(/Build it, Host it\./i)).toBeInTheDocument();
  });
});

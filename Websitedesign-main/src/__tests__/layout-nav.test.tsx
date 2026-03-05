import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Layout } from '../app/components/ui/Layout';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';

describe('Layout navigation', () => {
  it('shows Client Area button', async () => {
    const routes = [
      {
        path: '/',
        element: (
          <Layout />
        ),
        children: [{ index: true, element: <div /> }],
      },
    ];
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    expect(await screen.findByText('Client Area')).toBeInTheDocument();
  });
});

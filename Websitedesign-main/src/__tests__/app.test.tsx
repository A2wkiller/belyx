import { render, screen } from '@testing-library/react';
import App from '../app/App';
import { vi } from 'vitest';

vi.mock('../app/components/GlobalMap', () => {
  return { GlobalMap: () => null };
});

describe('App', () => {
  it('renders home hero text', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    render(<App />);

    expect(
      screen.getByText(/Build it, Host it\./i)
    ).toBeInTheDocument();
  });
});

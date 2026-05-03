import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../components/Hero';

// Mock framer-motion and lottie to simplify testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => children,
}));

vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-animation" aria-hidden="true" />,
}));

describe('Hero Component', () => {
  const renderHero = () =>
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

  it('renders the main heading', () => {
    renderHero();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders all three CTA buttons', () => {
    renderHero();
    expect(screen.getByText(/Start Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/Take Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulate Voting/i)).toBeInTheDocument();
  });

  it('has a main landmark element for accessibility', () => {
    renderHero();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the Lottie animation placeholder', () => {
    renderHero();
    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument();
  });
});

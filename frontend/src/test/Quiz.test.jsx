import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Quiz from '../components/Quiz';

// Mock canvas-confetti to prevent errors in jsdom environment
vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('Quiz Component', () => {
  const renderQuiz = () =>
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

  it('renders the first question correctly', () => {
    renderQuiz();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders all answer options', () => {
    renderQuiz();
    // There should be 4 option buttons for the first question
    const buttons = screen.getAllByRole('button');
    // Subtract 1 for the back button, so at least 4 option buttons
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it('marks correct answer as correct on click', () => {
    renderQuiz();
    // "NOTA" is the correct answer for the first question
    const notaButton = screen.getByText('NOTA');
    fireEvent.click(notaButton);
    expect(notaButton).toHaveClass('duo-btn-correct');
  });

  it('marks wrong answer on click', () => {
    renderQuiz();
    // "CANCEL" is a wrong answer for the first question
    const wrongButton = screen.getByText('CANCEL');
    fireEvent.click(wrongButton);
    expect(wrongButton).toHaveClass('duo-btn-wrong');
  });

  it('shows a progress bar', () => {
    renderQuiz();
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });
});

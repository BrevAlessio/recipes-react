import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the App component with all sections', async () => {
    await render(<App />);
    expect(screen.getByText(/Get your meal recommendation/i)).toBeTruthy();
  });
});

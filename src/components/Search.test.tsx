import { afterEach, describe, expect, it, vi } from 'vitest';
import Search from './Search';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        meals: [
          { idMeal: '1', strMeal: 'Pasta', strMealThumb: 'image.jpg' },
          { idMeal: '2', strMeal: 'Pizza', strMealThumb: 'image2.jpg' },
        ],
      }),
  }),
);

afterEach(() => {
  vi.clearAllMocks();
});

describe('Search Component', () => {
  it('renders the Search component with input and results', async () => {
    // Test implementation will go here
    await render(<Search />);

    expect(screen.getByText(/Search/i)).toBeTruthy();
  });

  it('triggers search on input change', async () => {
    await render(<Search />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'pasta');
    expect((input as HTMLInputElement).value).toBe('pasta');
    await new Promise((r) => setTimeout(r, 700)); // Wait for debounce
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=pasta',
    );
  });

  it('does not triggers search on input change', async () => {
    await render(<Search />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'p');
    expect((input as HTMLInputElement).value).toBe('p');
    await new Promise((r) => setTimeout(r, 700)); // Wait for debounce
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('displays loading state', async () => {
    global.fetch = vi.fn(() => new Promise(() => {})); // Never resolves to simulate loading
    await render(<Search />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'pasta');
    expect(await screen.findAllByTestId('skeleton')).toHaveLength(5);
  });

  it('displays the results', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            meals: [
              { idMeal: '1', strMeal: 'Pasta', strMealThumb: 'image.jpg' },
              { idMeal: '2', strMeal: 'Pizza', strMealThumb: 'image2.jpg' },
              { idMeal: '3', strMeal: 'Pizza', strMealThumb: 'image3.jpg' },
              { idMeal: '4', strMeal: 'Pizza', strMealThumb: 'image4.jpg' },
              { idMeal: '5', strMeal: 'Pizza', strMealThumb: 'image5.jpg' },
              { idMeal: '6', strMeal: 'Pizza', strMealThumb: 'image6.jpg' },
            ],
          }),
      }),
    );

    await render(<Search />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'pasta');
    await new Promise((r) => setTimeout(r, 700)); // Wait for debounce
    expect(await screen.findAllByTestId('search-result')).toHaveLength(5); // Only 5 results should be shown
  });


  it('handles no results found', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            meals: [
            ],
          }),
      }),
    );

    await render(<Search />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'pasta');
    await new Promise((r) => setTimeout(r, 700)); // Wait for debounce
    expect(await screen.findByText('No results found.')).toBeTruthy();
  });

  it('handles errors', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            meals: [
            ],
          }),
      }),
    );

    await render(<Search />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'pasta');
    await new Promise((r) => setTimeout(r, 700)); // Wait for debounce
    expect(await screen.findByText('Failed to fetch')).toBeTruthy();
  });
});

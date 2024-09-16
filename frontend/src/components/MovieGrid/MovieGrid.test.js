import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import MovieGrid from './index';
import '@testing-library/jest-dom'


// Mock useSelector
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('MovieGrid', () => {
  test('renders movie cards with mock data', () => {
    useSelector.mockReturnValue({
      movies: [
        { imdbID: '1', Poster: 'https://example.com/movie1.jpg', Title: 'Movie 1' },
        { imdbID: '2', Poster: 'https://example.com/movie2.jpg', Title: 'Movie 2' },
      ],
      loading: false,
      error: null,
    });

    render(<MovieGrid />);

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });
  
  test('renders loading state', () => {
    useSelector.mockReturnValue({
      movies: [],
      loading: true,
      error: null,
    });

    render(<MovieGrid />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    useSelector.mockReturnValue({
      movies: [],
      loading: false,
      error: 'Some error occurred',
    });

    render(<MovieGrid />);
    expect(screen.getByText('Error: Some error occurred')).toBeInTheDocument();
  });
});

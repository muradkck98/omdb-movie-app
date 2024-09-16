import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import SearchBar from './index';
import { fetchMoviesRequest } from '../../redux/actions';

// Mock useDispatch and fetchMoviesRequest
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../redux/actions', () => ({
  fetchMoviesRequest: jest.fn(),
}));

describe('SearchBar Component', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
  });

  test('updates input value and dispatches action when length is 3 or more', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText('Search for a movie...');

    fireEvent.change(inputElement, { target: { value: 'Inception' } });
    
    expect(inputElement.value).toBe('Inception');
    expect(dispatch).toHaveBeenCalledWith(fetchMoviesRequest('Inception'));
  });

  test('does not dispatch action when input length is less than 3', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText('Search for a movie...');

    fireEvent.change(inputElement, { target: { value: 'In' } });

    expect(dispatch).not.toHaveBeenCalled();
  });
});

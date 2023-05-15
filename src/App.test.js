import { render, screen } from '@testing-library/react';
import Instapro from './App';

test('renders learn react link', () => {
  render(<Instapro />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

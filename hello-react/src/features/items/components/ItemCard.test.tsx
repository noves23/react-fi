import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ItemCard } from './ItemCard';

const item = {
  id: 'item-1',
  brand: 'Test Brand',
  title: 'Test Item',
  date: '2026-01-01',
  mileage: 1000,
  color: 'Red',
  validPermition: true,
};

test('renders item details and calls action handlers', async () => {
  const user = userEvent.setup();
  const handleEdit = vi.fn();
  const handleDelete = vi.fn();
  const handleUpload = vi.fn();

  render(
    <ItemCard
      item={item}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onUpload={handleUpload}
    />,
  );

  expect(screen.getByText(/title:/i)).toHaveTextContent('Title: Test Item');
  expect(screen.getByText(/brand:/i)).toHaveTextContent('Brand: Test Brand');

  await user.click(screen.getByRole('button', { name: /edit/i }));
  expect(handleEdit).toHaveBeenCalledWith(item);

  await user.click(screen.getByRole('button', { name: /select data/i }));
  expect(handleUpload).toHaveBeenCalled();

  await user.click(screen.getByRole('button', { name: /delete/i }));
  expect(handleDelete).toHaveBeenCalledWith(item.id);
});

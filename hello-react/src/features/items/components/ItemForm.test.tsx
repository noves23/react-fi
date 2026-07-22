import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ItemForm } from './ItemForm';

const mockItem = null;

test('submits new item data and calls onSave', async () => {
  const user = userEvent.setup();
  const onSave = vi.fn();
  const onClose = vi.fn();

  render(<ItemForm item={mockItem} onSave={onSave} onClose={onClose} />);

  await user.type(screen.getByLabelText(/brand/i), 'Test Brand');
  await user.type(screen.getByLabelText(/title/i), 'Test Item');
  await user.type(screen.getByLabelText(/date/i), '2026-01-01');
  await user.clear(screen.getByLabelText(/mileage/i));
  await user.type(screen.getByLabelText(/mileage/i), '500');
  await user.type(screen.getByLabelText(/color/i), 'Blue');
  await user.click(screen.getByRole('switch', { name: /valid permission/i }));

  await user.click(screen.getByRole('button', { name: /save/i }));

  expect(onSave).toHaveBeenCalled();
  expect(onSave.mock.calls[0][0]).toMatchObject({
    brand: 'Test Brand',
    title: 'Test Item',
    date: '2026-01-01',
    mileage: 500,
    color: 'Blue',
    validPermition: true,
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddCardForm, { luhnCheck, isValidExpiry, reducer } from './AddCardForm';
import { CardContext } from '../../contexts/CardContext';

const mockDispatch = vi.fn();

const renderWithContext = () => {
  const onFormSuccess = () => {};

  render(
    <CardContext.Provider value={{ dispatch: mockDispatch, cards: [] }}>
      <AddCardForm onFormSuccess={onFormSuccess} />
    </CardContext.Provider>,
  );
};

describe('AddCardForm component', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
  });

  it('renders all input fields and the submit button', () => {
    renderWithContext();
    expect(screen.getByLabelText(/Cardholder Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiration/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add Card/i }),
    ).toBeInTheDocument();
  });

  it('shows validation errors on empty form submission', () => {
    renderWithContext();
    fireEvent.click(screen.getByRole('button', { name: /Add Card/i }));
    expect(
      screen.getByText(/Cardholder name is required/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Card number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/CVV is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Expiry date is required/i)).toBeInTheDocument();
  });

  it('dispatches ADD_CARD on valid submission', () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/Cardholder Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Card Number/i), {
      target: { value: '4539 1488 0343 6467' },
    }); // valid Visa
    fireEvent.change(screen.getByLabelText(/CVV/i), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByLabelText(/Expiration/i), {
      target: { value: '12/99' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add Card/i }));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch.mock.calls[0][0].type).toBe('ADD_CARD');
  });
});

describe('luhnCheck utility', () => {
  it('validates a correct Visa card number', () => {
    expect(luhnCheck('4539 1488 0343 6467')).toBe(true);
  });

  it('invalidates a wrong card number', () => {
    expect(luhnCheck('1234 5678 9012 3456')).toBe(false);
  });
});

describe('isValidExpiry utility', () => {
  it('validates correct future expiry', () => {
    expect(isValidExpiry('12/99')).toBe(true);
  });

  it('invalidates incorrect format', () => {
    expect(isValidExpiry('13/99')).toBe(false);
    expect(isValidExpiry('12-99')).toBe(false);
  });

  it('invalidates past expiry date', () => {
    expect(isValidExpiry('01/20')).toBe(false);
  });
});

describe('reducer function', () => {
  const createFormData = (
    values: Partial<{
      name: string;
      cardNumber: string;
      cvv: string;
      expiry: string;
    }>,
  ) => {
    const form = new FormData();
    if (values.name) form.set('name', values.name);
    if (values.cardNumber) form.set('cardNumber', values.cardNumber);
    if (values.cvv) form.set('cvv', values.cvv);
    if (values.expiry) form.set('expiry', values.expiry);
    return form;
  };

  it('returns no errors for valid input', () => {
    const form = createFormData({
      name: 'Jane Doe',
      cardNumber: '4539 1488 0343 6467',
      cvv: '123',
      expiry: '12/99',
    });
    const result = reducer({
      state: {
        errors: {},
        values: { name: '', cardNumber: '', cvv: '', expiry: '' },
      },
      formData: form,
    });
    expect(result.errors).toEqual({});
  });

  it('calls success callback on valid data return', () => {
    const onFormSuccess = vi.fn();
    const dispatch = vi.fn();

    const form = createFormData({
      name: 'Jane Doe',
      cardNumber: '4539 1488 0343 6467',
      cvv: '123',
      expiry: '12/99',
    });
    const result = reducer({
      onFormSuccess,
      dispatch,
      state: {
        errors: {},
        values: { name: '', cardNumber: '', cvv: '', expiry: '' },
      },
      formData: form,
    });

    expect(result.errors).toEqual({});
    expect(onFormSuccess).toHaveBeenCalled();
  });

  it('returns errors for missing fields', () => {
    const form = createFormData({});
    const result = reducer({
      state: {
        errors: {},
        values: { name: '', cardNumber: '', cvv: '', expiry: '' },
      },
      formData: form,
    });

    expect(result.errors.name).toBeDefined();
    expect(result.errors.cardNumber).toBeDefined();
    expect(result.errors.cvv).toBeDefined();
    expect(result.errors.expiry).toBeDefined();
  });
});

import { useActionState, type Dispatch, type FC } from 'react';
import { useCardContext } from '../../contexts/CardContext';
import type { CardNumber } from './types';
import type { CardAction } from '../../reducers/cardReducer';

type CardFormValues = {
  name: string;
  cardNumber: string;
  cvv: string;
  expiry: string;
};

type FormProps = {
  onFormSuccess: () => void;
};

type CardFormErrors = Partial<Record<keyof CardFormValues, string>>;

type CardFormState = {
  errors: CardFormErrors;
  values: CardFormValues;
};

// Luhn check for card validation
export const luhnCheck = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, '').split('').reverse();
  const sum = digits.reduce((acc, digit, idx) => {
    let num = parseInt(digit, 10);
    if (idx % 2 === 1) {
      num *= 2;
      if (num > 9) num -= 9;
    }
    return acc + num;
  }, 0);
  return sum % 10 === 0;
};

// Expiry MM/YY format check
export const isValidExpiry = (value: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  const [month, year] = value.split('/').map(Number);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  return year > currentYear || (year === currentYear && month >= currentMonth);
};

const initialState: CardFormState = {
  errors: {},
  values: {
    name: '',
    cardNumber: '',
    cvv: '',
    expiry: '',
  },
};

export function reducer({
  formData,
  dispatch,
  onFormSuccess,
}: {
  state: CardFormState;
  formData: FormData;
  onFormSuccess?: FormProps['onFormSuccess'];
  dispatch?: Dispatch<CardAction>;
}): CardFormState {
  const name = formData.get('name')?.toString().trim() || '';
  const cardNumber = formData.get('cardNumber')?.toString().trim() || '';
  const cvv = formData.get('cvv')?.toString().trim() || '';
  const expiry = formData.get('expiry')?.toString().trim() || '';

  const errors: CardFormErrors = {};

  if (!name) errors.name = 'Cardholder name is required.';
  if (!cardNumber) {
    errors.cardNumber = 'Card number is required.';
  } else if (!luhnCheck(cardNumber)) {
    errors.cardNumber = 'Invalid card number.';
  }

  if (!cvv) {
    errors.cvv = 'CVV is required.';
  } else if (!/^\d{3,4}$/.test(cvv)) {
    errors.cvv = 'CVV must be 3 or 4 digits.';
  }

  if (!expiry) {
    errors.expiry = 'Expiry date is required.';
  } else if (!isValidExpiry(expiry)) {
    errors.expiry = 'Invalid expiry format or expired.';
  }

  if (Object.keys(errors).length === 0 && dispatch) {
    const [firstName, lastName] = name.split(' ');
    const [month, year] = expiry.split('/');
    dispatch({
      type: 'ADD_CARD',
      payload: {
        id: crypto.randomUUID(),
        vendor: 'visa',
        cardHolder: {
          firstName,
          lastName,
        },
        number: cardNumber.replace(/\s+/g, '').match(/.{1,4}/g) as CardNumber,
        cvv: Number(cvv),
        expiry: {
          month: Number(month.trim()),
          year: Number(year.trim()),
        },
        isFrozen: false,
      },
    });

    if (onFormSuccess) {
      onFormSuccess();
    }
  }

  return {
    errors,
    values: { name, cardNumber, cvv, expiry },
  };
}

const AddCardForm: FC<FormProps> = ({ onFormSuccess }) => {
  const { dispatch } = useCardContext();
  const reducerWitDispatch = (state: CardFormState, formData: FormData) => {
    return reducer({ state, formData, dispatch, onFormSuccess });
  };
  const [state, formAction] = useActionState<CardFormState, FormData>(
    reducerWitDispatch,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4 mt-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Cardholder Name
        </label>
        <input
          name="name"
          placeholder="John Doe"
          id="name"
          defaultValue={state.values.name}
          className="border p-2 rounded w-full"
        />
        {state.errors.name && (
          <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium">
          Card Number
        </label>
        <input
          placeholder="1234567890122345"
          maxLength={17}
          name="cardNumber"
          id="cardNumber"
          defaultValue={state.values.cardNumber}
          className="border p-2 rounded w-full"
        />
        {state.errors.cardNumber && (
          <p className="text-sm text-red-500 mt-1">{state.errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="cvv" className="block text-sm font-medium">
          CVV
        </label>
        <input
          name="cvv"
          placeholder="123"
          maxLength={4}
          id="cvv"
          defaultValue={state.values.cvv}
          className="border p-2 rounded w-full"
        />
        {state.errors.cvv && (
          <p className="text-sm text-red-500 mt-1">{state.errors.cvv}</p>
        )}
      </div>

      <div>
        <label htmlFor="expiry" className="block text-sm font-medium">
          Expiration (MM/YY)
        </label>
        <input
          name="expiry"
          id="expiry"
          placeholder="02/25"
          defaultValue={state.values.expiry}
          className="border p-2 rounded w-full"
        />
        {state.errors.expiry && (
          <p className="text-sm text-red-500 mt-1">{state.errors.expiry}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-active text-white px-4 py-2 rounded w-full"
      >
        Add Card
      </button>
    </form>
  );
};

export default AddCardForm;

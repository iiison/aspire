import { useActionState, type FC } from 'react';

type CardFormValues = {
  name: string;
  cardNumber: string;
  cvv: string;
  expiry: string;
};

type CardFormErrors = Partial<Record<keyof CardFormValues, string>>;

type CardFormState = {
  errors: CardFormErrors;
  values: CardFormValues;
};

// Luhn check for card validation
const luhnCheck = (cardNumber: string): boolean => {
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
const isValidExpiry = (value: string): boolean => {
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

function reducer(_: CardFormState, formData: FormData): CardFormState {
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

  return {
    errors,
    values: { name, cardNumber, cvv, expiry },
  };
}

const AddCardForm: FC = () => {
  const [state, formAction] = useActionState<CardFormState, FormData>(
    reducer,
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

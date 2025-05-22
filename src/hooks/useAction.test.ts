import { renderHook, act } from '@testing-library/react';
import { useAction } from './useAction';

describe('useAction', () => {
  it('should handle loading and data correctly', async () => {
    const fakeData = { message: 'hello' };
    const action = vi.fn().mockResolvedValue(fakeData);

    const { result } = renderHook(() => useAction(action));

    // Initial state
    expect(result.current[0]).toBeNull(); // data
    expect(result.current[1]).toBe(true); // loading

    // Wait for async effect
    await act(async () => {
      await Promise.resolve();
    });

    expect(action).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toEqual(fakeData); // data
    expect(result.current[1]).toBe(false); // loading
  });

  it('should allow manual setData update', async () => {
    const action = vi.fn().mockResolvedValue({ value: 42 });

    const { result } = renderHook(() => useAction(action));

    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      result.current[2]({ value: 99 }); // setData
    });

    expect(result.current[0]).toEqual({ value: 99 });
  });
});

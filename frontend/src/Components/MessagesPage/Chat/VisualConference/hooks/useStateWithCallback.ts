/* eslint-disable  @typescript-eslint/no-unsafe-return */
/* eslint-disable  @typescript-eslint/ban-types */

import { useState, useCallback, useRef, useEffect } from 'react';

function useStateWithCallback<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<Function | null>(null);
  type setStateCallback = (prevState: T) => void;
  const updateState = useCallback((newState: T | setStateCallback, cb?: Function) => {
    if (cb) cbRef.current = cb;
    setState(prev => (typeof newState === 'function' ? (newState as Function)(prev) : newState));
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return { state, updateState };
}

export default useStateWithCallback;

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

const COOKIE_NAME = 'age_confirm';

export const useAgeConfirmation = () => {
  const [ageConfirmed, setAgeConfirmed] = useState(true);

  useEffect(() => {
    if (!Cookies.get(COOKIE_NAME)) {
      setAgeConfirmed(false);
    }
  }, []);

  const confirmAge = () => {
    setAgeConfirmed(true);
    Cookies.set(COOKIE_NAME, 'confirmed', { expires: 365 });
  };

  return {
    ageConfirmed,
    onAgeConfirmed: confirmAge
  };
};

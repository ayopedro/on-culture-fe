export const configOptions = () => {
  if (typeof window === 'undefined') return true;

  if (!window.sessionStorage.getItem('isLoggedIn')) return false;

  const accessToken = JSON.parse(
    window.sessionStorage.getItem('isLoggedIn') as string
  );

  if (!!accessToken) {
    return accessToken;
  }
};

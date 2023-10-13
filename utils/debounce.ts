export const debounce = (func: Function, delay = 300) => {
  let timer: number;

  return function (...args: any[]) {
    clearTimeout(timer);

    timer = window.setTimeout(() => func(...args), delay);
  };
};

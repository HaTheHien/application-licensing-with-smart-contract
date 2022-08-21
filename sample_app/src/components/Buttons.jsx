export const FilledButton = ({ children, ...others }) => {
  return (
    <button
      className="flex items-center justify-center px-4 py-2
                text-base font-medium leading-6 whitespace-no-wrap
                bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none hover:shadow-lg 
                transition duration-200 ease-out"
      {...others}
    >
      {children}
    </button>
  );
};

export const OutlinedButton = ({ children, ...others }) => {
  return (
    <button
      className="flex items-center justify-center px-4 py-2
                text-base font-medium leading-6 whitespace-no-wrap
                border-2 border-gray-100
                text-gray-800 rounded-lg shadow-sm hover:bg-blue-300 hover:outline-none hover:shadow-lg
                hover:border-blue-400
                transition duration-200 ease-out"
      {...others}
    >
      {children}
    </button>
  );
};

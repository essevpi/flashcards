const globalStyles = {
  container:
    'bg-neutral-950 flex flex-col items-center justify-center max-w-screen-xl min-h-screen mx-auto',
  lgHeading: 'text-2xl font-bold',
  mdHeading: 'text-2xl font-bold',
  smHeading: 'text-xl font-bold',

  addForm: 'flex gap-2',
  addCardForm: 'flex flex-col gap-2',
  inputField: 'rounded-md p-2 w-full border border-gray-500 focus:border-emerald-400 outline-none transition-colors',
  button: 'bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-900 disabled:text-neutral-400 rounded-md p-2 text-white font-bold transition-colors',

  card: 'bg-emerald-700 rounded-lg p-4',

  modal: 'fixed z-10 inset-0 overflow-y-auto',
  modalContent: 'flex flex-col bg-neutral-900 rounded-lg p-4',
};

export default globalStyles;

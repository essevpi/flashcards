const styles = {
  container: 'bg-transparent w-[300px] h-[200px] [perspective:1000px]',
  wrapper: 'relative w-full h-full text-center transition-transform duration-500 [transform-style:preserve-3d]',
  inner: 'rounded-lg flex items-center justify-center absolute inset-0 w-full h-full bg-emerald-600 [backface-visibility:hidden] [perspective:1000px]',
  title: 'text-4xl font-bold text-white',
  keywords: 'text-2xl font-bold text-white',
};

export default styles;

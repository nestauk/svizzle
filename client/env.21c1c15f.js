const isServerSide = typeof window === 'undefined';

const isClientSide = !isServerSide;

export { isClientSide as a, isServerSide as i };

var isServerSide = typeof window === 'undefined';
var isClientSide = !isServerSide;

export { isClientSide as a, isServerSide as i };

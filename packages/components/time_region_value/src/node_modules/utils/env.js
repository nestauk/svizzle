export const isServerSide = typeof window === 'undefined';

export const isClientSide = !isServerSide;

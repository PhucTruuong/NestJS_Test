import { AddressMiddleware } from './address.middleware';

describe('AddressMiddleware', () => {
  it('should be defined', () => {
    expect(new AddressMiddleware()).toBeDefined();
  });
});

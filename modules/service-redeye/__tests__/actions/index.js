import getReference from '../../src/actions/getReference';

describe('Configuration', () => {
  it('contains all the attributes of the handler', () => {
    expect(getReference.config).toBeTruthy();
    expect(getReference.method).toEqual('GET');
    expect(getReference.path).toEqual('/reference');
    expect(getReference.config.handler).toBeInstanceOf(Function);
  });
});

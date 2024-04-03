import { buildReqestUrl } from '../../../src/utils/buildReqestUrl';

describe('buildReqestUrl', () => {
  const baseUrl = 'https://api.example.com';
  const endpoint = '/data';

  it('should build a URL without parameters', () => {
    const url = buildReqestUrl(baseUrl, endpoint, {});
    expect(url).toBe('https://api.example.com/data');
  });

  it('should build a URL with one parameter', () => {
    const params = { key: 'value' };
    const url = buildReqestUrl(baseUrl, endpoint, params);
    expect(url).toBe('https://api.example.com/data?key=value');
  });

  it('should build a URL with multiple parameters', () => {
    const params = {
      key1: 'value1',
      key2: 'value2',
      key3: 123,
      key4: true
    };
    const url = buildReqestUrl(baseUrl, endpoint, params);
    expect(url).toBe('https://api.example.com/data?key1=value1&key2=value2&key3=123&key4=true');
  });
});

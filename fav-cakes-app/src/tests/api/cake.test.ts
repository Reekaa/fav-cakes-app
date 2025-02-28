import { apiClient } from '../../api/cake';
import axiosMock from 'axios-mock-adapter';
import { getCakes, getCakeById, addCake, deleteCake } from '../../api/cake';
import { Cake } from '../../types/cake';

const mock = new axiosMock(apiClient);

describe('API calls', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('fetches a list of cakes successfully', async () => {
    const mockCakes: Cake[] = [
      { id: 1, name: 'Chocolate Cake', comment: 'Delicious', imageUrl: 'url1', yumFactor: 5 },
      { id: 2, name: 'Vanilla Cake', comment: 'Tasty', imageUrl: 'url2', yumFactor: 1 }
    ];

    mock.onGet('/cakes').reply(200, mockCakes);

    const getSpy = jest.spyOn(apiClient, 'get');

    const cakes = await getCakes();

    expect(cakes).toEqual(mockCakes);
    expect(getSpy).toHaveBeenCalledWith('/cakes');

    getSpy.mockRestore();
  });

  it('fetches a single cake by id successfully', async () => {
    const mockCake: Cake = { id: 1, name: 'Chocolate Cake', comment: 'Delicious', imageUrl: 'url1', yumFactor: 10 };

    mock.onGet('/cakes/1').reply(200, mockCake);

    const getSpy = jest.spyOn(apiClient, 'get');

    const cake = await getCakeById(1);

    expect(cake).toEqual(mockCake);
    expect(getSpy).toHaveBeenCalledWith('/cakes/1');

    getSpy.mockRestore();
  });

  it('adds a new cake successfully', async () => {
    const newCakeData: Omit<Cake, 'id'> = {
      name: 'Strawberry Cake',
      comment: 'Yummy',
      imageUrl: 'url3',
      yumFactor: 8
    };
    const mockCake: Cake = { id: 3, ...newCakeData };

    mock.onPost('/cakes', newCakeData).reply(201, mockCake);

    const postSpy = jest.spyOn(apiClient, 'post');

    const response = await addCake(newCakeData);

    expect(response.status).toBe(201);
    expect(response.data).toEqual(mockCake);
    expect(postSpy).toHaveBeenCalledWith('/cakes', newCakeData);

    postSpy.mockRestore();
  });

  it('deletes a cake successfully', async () => {
    const cakeId = 1;

    mock.onDelete(`/cakes/${cakeId}`).reply(200);

    const deleteSpy = jest.spyOn(apiClient, 'delete');

    await deleteCake(cakeId);

    expect(deleteSpy).toHaveBeenCalledWith(`/cakes/${cakeId}`);

    deleteSpy.mockRestore();
  });

  it('handles error when fetching cakes fails', async () => {
    mock.onGet('/cakes').reply(500);

    await expect(getCakes()).rejects.toThrow('Request failed with status code 500');
  });

  it('handles error when adding a cake fails', async () => {
    const newCakeData: Omit<Cake, 'id'> = {
      name: 'Lemon Cake',
      comment: 'Tangy',
      imageUrl: 'url4',
      yumFactor: 7
    };

    mock.onPost('/cakes', newCakeData).reply(500);

    await expect(addCake(newCakeData)).rejects.toThrow('Request failed with status code 500');
  });

  it('handles error when deleting a cake fails', async () => {
    const cakeId = 1;

    mock.onDelete(`/cakes/${cakeId}`).reply(500);

    await expect(deleteCake(cakeId)).rejects.toThrow('Request failed with status code 500');
  });
});

import { Injectable } from '@nestjs/common';
import Axios, { AxiosResponse } from 'axios';
import { ICheapSharkDealsByIdResponse } from './interfaces/cheapSharkDealsByIdResponse.interface';
import { IGame } from './interfaces/game.interface';

@Injectable()
export class GameService {

  /**
   * Returns list of games
   */
  public async getGames(): Promise<IGame[]> {
    const gamesList = await this.fetchGameInfo();

    const games: IGame[] = gamesList.data.map(
      async (inputDeal: { dealID: string; }) => {
        const decodedDealId = decodeURIComponent(inputDeal.dealID);
        const dealObject = await this.fetchDealsById(decodedDealId);
        
        return {
          name: dealObject.gameInfo.name,
          salePrice: Number(dealObject.gameInfo.salePrice),
          cheapestPrice: Number(dealObject.cheapestPrice.price),
          releaseDate: new Date(dealObject.gameInfo.releaseDate * 1000),
        };
      });
    const output = await Promise.all(games);

    return output;
  }

  private async fetchGameInfo(): Promise<AxiosResponse> {
    const res = await Axios.get('http://www.cheapshark.com/api/1.0/deals?storeID=1&desc=0&title=grand%20theft%20auto&pageSize=20');
    if (res.status === 200) {
      return res;
    }
    throw new Error('Error fetching games data');
  }

  private async fetchDealsById(id: string): Promise<ICheapSharkDealsByIdResponse> {
    const res = await Axios.get('http://www.cheapshark.com/api/1.0/deals', {
      params: {
        id,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
    throw new Error('Error fetching games data');
  }
}

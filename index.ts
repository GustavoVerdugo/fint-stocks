/* definición de la clase stock codigo/identificador y holdings que sería "acciones"  */
class Stock {
  code: string;
  holdings: number;

  constructor(code: string, holdings: number) {
    this.code = code;
    this.holdings = holdings;
  }

  getPrice(date: Date): number {
    /* comparación de fechas estaticamente */
    return date.getFullYear() === 2023 ? 55.90 : 110
  }
}

class Portfolio {
  stocks: Stock[];

  constructor(stocks: Stock[]) {
    this.stocks = stocks;
  }
  /* obtención de profit de stocks entre 2 fechas */
  getProfit(initDate: Date, endDate: Date): number {
    const startValue = this.stocks.reduce((total, stock) => total + stock.holdings * stock.getPrice(initDate), 0);
    const endValue = this.stocks.reduce((total, stock) => total + stock.holdings * stock.getPrice(endDate), 0);
    return endValue - startValue;
  }

  /* retorno anualizado entre 2 fechas */
  annualizedReturn(initDate: Date, endDate: Date): number {
    const profit = this.getProfit(initDate, endDate);
    const startValue = this.stocks.reduce((total, stock) => total + stock.holdings * stock.getPrice(initDate), 0);
    const years = (endDate.getTime() - initDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    return startValue ? ((1 + profit / startValue) ** (1 / years)) - 1 : 0;
  }
}

/* creación de stocks */
const Netflix = new Stock("NFLX", 40);
const CocaCola = new Stock("KO", 41);

/* creación de portfolio y asignación de stocks */
const portfolio = new Portfolio([Netflix, CocaCola]);

/* fecha inicio y fin */
const initDate = new Date(2023, 2, 1);
const endDate = new Date(2024, 6, 1);

/* obtención del profit */
const profit = portfolio.getProfit(initDate, endDate);

/* obtención del retorno anual */
const annualizedReturn = portfolio.annualizedReturn(initDate, endDate);

/* retorno del profit */
console.log(`Profit: ${profit}`);

/* se obtiene el resultado anual en porcentaje */
console.log(`Annualized Return: ${(annualizedReturn * 100).toFixed(2)}%`);
/* definición de la clase stock codigo/identificador y holdings que sería "acciones"  */
var Stock = /** @class */ (function () {
    function Stock(code, holdings) {
        this.code = code;
        this.holdings = holdings;
    }
    Stock.prototype.getPrice = function (date) {
        /* comparación de fechas estaticamente */
        return date.getFullYear() === 2023 ? 55.90 : 110;
    };
    return Stock;
}());
var Portfolio = /** @class */ (function () {
    function Portfolio(stocks) {
        this.stocks = stocks;
    }
    /* obtención de profit de stocks entre 2 fechas */
    Portfolio.prototype.getProfit = function (initDate, endDate) {
        var startValue = this.stocks.reduce(function (total, stock) { return total + stock.holdings * stock.getPrice(initDate); }, 0);
        var endValue = this.stocks.reduce(function (total, stock) { return total + stock.holdings * stock.getPrice(endDate); }, 0);
        return endValue - startValue;
    };
    /* retorno anualizado entre 2 fechas */
    Portfolio.prototype.annualizedReturn = function (initDate, endDate) {
        var profit = this.getProfit(initDate, endDate);
        var startValue = this.stocks.reduce(function (total, stock) { return total + stock.holdings * stock.getPrice(initDate); }, 0);
        var years = (endDate.getTime() - initDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        return startValue ? (Math.pow((1 + profit / startValue), (1 / years))) - 1 : 0;
    };
    return Portfolio;
}());
/* creación de stocks */
var Netflix = new Stock("NFLX", 40);
var CocaCola = new Stock("KO", 41);
/* creación de portfolio y asignación de stocks */
var portfolio = new Portfolio([Netflix, CocaCola]);
/* fecha inicio y fin */
var initDate = new Date(2023, 2, 1);
var endDate = new Date(2024, 6, 1);
/* obtención del profit */
var profit = portfolio.getProfit(initDate, endDate);
/* obtención del retorno anual */
var annualizedReturn = portfolio.annualizedReturn(initDate, endDate);
/* retorno del profit */
console.log("Profit: ".concat(profit));
/* se obtiene el resultado anual en porcentaje */
console.log("Annualized Return: ".concat((annualizedReturn * 100).toFixed(2), "%"));

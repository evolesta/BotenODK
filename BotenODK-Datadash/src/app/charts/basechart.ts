// -- Stratey pattern definities --

export interface IBaseChart {
    // definieer strategy functies
    setChartdata(chartData: chartData): void;
    getBasechart(): void;
    drawChart(): void;
}

// - Data modellen voor het initeren van de grafiekdata -
export class chartData {
    labels: string[];
    datasets: dataset[];
    options?: chartOptions;
    chartType: string;
}

export class dataset {
    data: number[];
    label: string;
}

export class chartOptions {
    yAmountSteps?: number = 10;
    height: number = 600;
}

// Context klasse die aangeroepen wordt door het component
export class Chart {

    private _strategy: IBaseChart; // private global variabele voor de strategy

    // constructor om de eerste strategy te bepalen
    constructor(strategy: IBaseChart) {
        this._strategy = strategy;
    }

    // setter om de strategy later te wijzigen
    public setStrategy(strategy: IBaseChart) {
        this._strategy = strategy;
    }

    public setChartdata(chartData: chartData) {
        this._strategy.setChartdata(chartData);
    }

    // invoker om de strategy uit te voeren
    public drawChart(): void {
        this._strategy.drawChart();
    }
}
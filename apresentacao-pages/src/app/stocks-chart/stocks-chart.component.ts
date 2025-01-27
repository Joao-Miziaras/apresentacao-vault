import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { StocksService } from '../stocks.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stocks-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './stocks-chart.component.html',
  styleUrls: ['./stocks-chart.component.scss'],
})
export class StocksChartComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Stock Price',
        fill: true,
        tension: 0.5,
        borderColor: '#28a745',
        backgroundColor: 'rgba(40,167,69,0.3)',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  latestStockPrice: number = 0;
  variation: number = 0;
  projectedValue: number = 0;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.generateAndLoadStockData();
  }

  generateAndLoadStockData(): void {
    // Primeiro, gera os dados no backend
    this.stocksService.generateStockData(10).subscribe(() => {
      // Após a geração, carrega os dados no gráfico
      this.loadStockData();
    });
  }

  loadStockData(): void {
    this.stocksService.getStocks().subscribe((stocks) => {
      // Reverte a ordem dos registros (do mais antigo para o mais recente)
      stocks.reverse();

      const labels = stocks.map((stock) =>
        new Date(stock.createdAt).toLocaleDateString('pt-BR')
      );
      const prices = stocks.map((stock) => stock.price);

      this.lineChartData.labels = labels;
      this.lineChartData.datasets[0].data = prices;

      // Define os valores finais
      this.latestStockPrice = prices[prices.length - 1];
      this.variation = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;
      this.projectedValue = 1000 + (1000 * this.variation) / 100;

      // Atualiza o gráfico
      this.updateChart();
    });
  }

  updateChart(): void {
    // Força a atualização do gráfico
    this.lineChartData = { ...this.lineChartData };
  }
}

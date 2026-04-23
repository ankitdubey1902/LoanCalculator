import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoanCalculatorComponent,   
    // BrowserModule,
    // BrowserAnimationsModule,    
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('loan-calculator');
}

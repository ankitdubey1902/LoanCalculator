import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-loan-calculator',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatTableModule,
    MatSlideToggleModule],
  templateUrl: './loan-calculator.html',
  styleUrl: './loan-calculator.css',
})
export class LoanCalculatorComponent {
  loanAmount = 100000;
  interestRate = 10;
  tenure = 12;
  currency = 'INR';
  showSchedule = false;

  displayedColumns: string[] = ['month', 'principal', 'interest', 'balance'];
  repaymentSchedule: any[] = [];

  get monthlyInterestRate(): number {
    return this.interestRate / 12 / 100;
  }

  get emi(): number {
    const r = this.monthlyInterestRate;
    const n = this.tenure;
    if (!r || !n) return 0;
    return (this.loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  get totalPayment(): number {
    return this.emi * this.tenure;
  }

  get totalInterest(): number {
    return this.totalPayment - this.loanAmount;
  }

  calculateSchedule() {
    this.repaymentSchedule = [];
    let balance = this.loanAmount;
    for (let m = 1; m <= this.tenure; m++) {
      const interest = balance * this.monthlyInterestRate;
      const principal = this.emi - interest;
      balance -= principal;
      this.repaymentSchedule.push({
        month: m,
        principal,
        interest,
        balance: balance > 0 ? balance : 0
      });
    }
    this.showSchedule = true;
  }

  toggleDarkMode(event: any) {
    if (event.checked) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }



  toggleSchedule() {
    if (this.showSchedule) {
      this.showSchedule = false;
    } else {
      this.calculateSchedule();
    }
  }

}

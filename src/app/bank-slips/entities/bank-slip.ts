export class BankSlip {
  constructor(partial?: Partial<BankSlip>) {
    Object.assign(this, partial);
  }
  static readonly BaseDate = 'October 07, 1997';

  bankCode: string;
  currencyCode: string;
  checkDigit: string;
  dueDateFactor: string;
  amount: string;
  freeField: string;

  getDueDate() {
    const endDate = new Date(BankSlip.BaseDate);
    endDate.setDate(endDate.getDate() + Number(this.dueDateFactor));
    return endDate;
  }

  getValue(): number {
    return Number(this.amount) / 100;
  }
}

export class BankSlip {
  constructor(partial?: Partial<BankSlip>) {
    Object.assign(this, partial);
  }
  static readonly BaseDate = 'October 07, 1997';

  bankCode: string;
  currencyCode: string;
  CheckDigit: string;
  dueDateFactor: string;
  value: string;
  freeField: string;

  getDueDate() {
    const endDate = new Date(BankSlip.BaseDate);
    endDate.setDate(endDate.getDate() + Number(this.dueDateFactor));
    return endDate;

    /* TODO
    !!!!!! A partir de 22.02.2025, o fator retorna para “1000” adicionando-se “1” a cada 
    dia subsequente a este fator
    */
  }

  getValue(): number {
    return Number(this.value) / 100;
  }
}

export class Bills {
  constructor(partial?: Partial<Bills>) {
    Object.assign(this, partial);
  }
  product: string;
  segment: string;
  flagEffectiveValueOrReference: string;
  checkDigit: string;
  value: string;
  company: string;
  cnpjOrMF: string;
  freeField: string;

  getValue(): number {
    return Number(this.value) / 100;
  }
}

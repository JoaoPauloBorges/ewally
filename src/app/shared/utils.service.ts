import { EMessages } from '@app/bank-slips/validators/errorMessages.enum';
import { BadRequestException } from '@nestjs/common';

function* genGetMultiplier(times = 43): Generator<number, any, void> {
  let b = 2;
  while (times >= 0) {
    yield b;
    times--;
    b++;
    if (b === 10) b = 2;
  }
}

export class Utils {
  static validateCheckDigitMod10(value: string[], cdReceived: string) {
    const getMultiplier = (idx: number) => {
      return idx % 2 === 0 ? 2 : 1;
    };
    const stringOfProducts = value.reverse().reduce((acc, curr, idx) => {
      const multiplier = getMultiplier(idx);
      return acc + String(Number(curr) * multiplier);
    }, '');

    const sum = [...stringOfProducts].reduce((acc, curr) => acc + Number(curr), 0);
    const checkDigit = 10 - (sum % 10);

    if (checkDigit !== Number(cdReceived)) {
      throw new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR);
    }
  }

  static validateCheckDigitMod11(value: string[], cdReceived: string, isBillMod11Rule = false) {
    const getMultiplier = genGetMultiplier(value.length);
    try {
      const sum = value.reverse().reduce((acc, curr) => {
        const multiplier = getMultiplier.next().value;
        return acc + Number(curr) * multiplier;
      }, 0);

      const remainder = sum % 11;
      let checkDigit = 11 - remainder;

      if (checkDigit === 10 || checkDigit === 11) {
        /*
             resultado da subtração igual a 10.........{É O MESMO QUE}..... resto da divisão for igual a 1
             resultado da subtração igual a 11..........{É O MESMO QUE}.....resto da divisão for igual a 0
        */

        // for this rule, checkDigit has to become 1 and can not ever become 0;
        checkDigit = 1;

        /*   BankSlip Mod11 Rule
            
        Se o resultado da subtração for:
        I - igual a 0................D.V. igual a 1; //{this case is mathematically impossible (x % 11) will never be 11}
        II - igual a 10..............D.V. igual a 1;
        III - igual a 11.............D.V. igual a 1;
        IV - diferente de 10 e 11....D.V. será o próprio dígito
        OBS: EM NENHUMA HIPOTESE PODERÁ SER UTILIZADO O DÍGITO "0" (ZERO) NA QUINTA POSIÇÃO DO CÓDIGO DE BARRAS.
        */

        if (isBillMod11Rule) {
          // for this rule, checkDigit has to become 0;
          checkDigit = 0;

          /*   Bill Mod11 Rule
            
          A soma dos produtos a multiplicação é dividida por 11,
          obtém-se o resto da divisão, este resto deve ser subtraído de 11,
          o produto da subtração é o DAC.
          
          Observação: 
          Quando o resto da divisão for igual a 0 ou 1,
          atribuí-se ao DV o digito “0”.        
        */
        }
      }

      if (checkDigit !== Number(cdReceived)) {
        throw new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR);
      }
    } finally {
      getMultiplier.return(0);
    }
  }
}

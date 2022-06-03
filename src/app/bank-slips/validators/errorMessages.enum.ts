export enum EMessages {
  NON_NUMERIC_VALUE = 'Non-numeric characters found in barcode',
  LINE_LONGER_THAN_EXPECTED = 'Barcode longer then expected - (44 numbers)',
  LINE_SHORTER_THAN_EXPECTED = 'Barcode shorter then expected - (44 numbers)',
  BARCODE_CHECKDIGIT_ERROR = 'Check digit of the barcode is wrong',
  DIGITABLELINE_CHECKDIGIT_ERROR = 'Some check digit of the digitable line is wrong',
}

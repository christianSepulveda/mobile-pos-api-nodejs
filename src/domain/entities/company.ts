export interface Company {
  id?: string;
  name: string;
  rut: string;
  phoneNumber: string;
  email: string;
  expirationDate: string;
  monthlyPayment: number;
  numberOfRegisters: number;
  adminCode: string;
  active: boolean;
}

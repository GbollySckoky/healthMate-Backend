import { registerAs } from '@nestjs/config';

export default registerAs('paystack', () => ({
  secret: process.env.PAYSTACK_SECRET,
  public: process.env.PAYSTACK_PUBLIC,
  baseUrl: process.env.PAYSTACK_BASE_URL,
  callbackUrl: process.env.PAYSTACK_CALLBACK_URL,
}));


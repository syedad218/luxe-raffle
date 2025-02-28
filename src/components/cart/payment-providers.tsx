import Image from 'next/image';

export default function PaymentProviders() {
  return (
    <div className="flex flex-wrap justify-between">
      <Image src="/icons/visa.svg" alt="Visa" width={40} height={24} />
      <Image
        src="/icons/mastercard.svg"
        alt="Mastercard"
        width={40}
        height={24}
      />
      <Image src="/icons/paypal.svg" alt="PayPal" width={40} height={24} />
      <Image
        src="/icons/amex.svg"
        alt="American Express"
        width={40}
        height={24}
      />
      <Image src="/icons/diners.svg" alt="Diners Club" width={40} height={24} />
    </div>
  );
}

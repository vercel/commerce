import { getCart } from "@/lib/sfcc";
import { CartItem } from "@/lib/sfcc/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Price from "../price";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";

export async function CheckoutCart() {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    return <EmptyCart />;
  }

  const { cost } = cart;

  return (
    <div className="space-y-4">
      {cart.lines.map((line) => (
        <Line key={line.id} line={line} />
      ))}
      <Separator />
      <div className="flex justify-between">
        <span>Taxes</span>
        <Price
          amount={cost.totalTaxAmount.amount}
          currencyCode={cost.totalTaxAmount.currencyCode}
        />
      </div>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <Price
          amount={cost.subtotalAmount.amount}
          currencyCode={cost.subtotalAmount.currencyCode}
        />
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span className="text-gray-400">Calculated during Shipping</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <Price
          amount={cost.totalAmount.amount}
          currencyCode={cost.totalAmount.currencyCode}
        />
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-4">
      <ShoppingCart className="h-16 w-16 text-gray-400" />
      <p className="text-lg font-semibold text-gray-600">Your cart is empty</p>
      <p className="text-center text-sm text-gray-500">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link
        href="/"
        prefetch
        className={buttonVariants({ variant: "outline" })}
      >
        Continue Shopping
      </Link>
    </div>
  );
}

function Line({ line }: { line: CartItem }) {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={line.merchandise.product.featuredImage.url}
        alt={line.merchandise.product.featuredImage.altText}
        width={80}
        height={80}
        className="rounded-md object-cover"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{line.merchandise.title}</h3>
        {/* <p className="text-sm text-gray-500">{line.merchandise.product.description}</p> */}
      </div>
      <div className="text-right">
        <div className="font-semibold">
          <Price
            amount={line.cost.totalAmount.amount}
            currencyCode={line.cost.totalAmount.currencyCode}
          />
        </div>
        <div className="text-sm text-gray-500">Qty: {line.quantity}</div>
      </div>
    </div>
  );
}

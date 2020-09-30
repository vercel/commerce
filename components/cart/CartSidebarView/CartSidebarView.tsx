import React, { FunctionComponent } from "react";
// import s from "./CartSidebarView.module.css";
import { Button } from "@components/ui";
import { Trash } from "@components/icon";

interface Props {}

const CartSidebarView: FunctionComponent<Props> = () => {
  return (
    <>
      <header className="px-4 py-6 sm:px-6 border-b border-gray-200">
        <div className="flex items-start justify-between space-x-3">
          <div className="space-y-1">
            <h2 className="text-lg leading-7 font-medium text-gray-900 uppercase">
              My Cart
            </h2>
          </div>
          <div className="h-7 flex items-center">
            <button
              aria-label="Close panel"
              className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-4">
        <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <li className="flex flex-row space-x-6">
            <div className="h-12 w-12 bg-violet"></div>
            <div className="flex-1 flex flex-col">
              <span>T-Shirt</span>
              <div className="py-2">
                <span>-</span>
                <input
                  className="w-6 border-gray-300 border mx-3 rounded text-center text-sm"
                  value="1"
                />
                <span>+</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span>$50.00</span>
              <span className="flex justify-end">
                <Trash />
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
        <Button>Proceed to Checkout</Button>
      </div>
    </>
  );
};

export default CartSidebarView;

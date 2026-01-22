"use client";

import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MOCK_POSITIONS, TEST_WALLET_ADDRESS } from "@/constants/mockData";
import { apiGetPositions } from "@/services/walletDataApi";
import { useActions } from "@/store/store.utils";
import { useWalletAddress, useWalletStore } from "@/store/walletStore";

function isValidWalletAddress(address: string): boolean {
  // basic address validation
  return address.length === 42 && address.startsWith("0x");
}

function truncateAddress(address: string): string {
  if (!address) return "Connect Wallet";
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function TestAddressButton() {
  const { setWalletAddress, setPositions } = useActions(useWalletStore);

  const handleClick = async () => {
    setWalletAddress(TEST_WALLET_ADDRESS);
    try {
      // const positions = await apiGetPositions(TEST_WALLET_ADDRESS);
      // setPositions(positions);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch positions";
      toast.error(message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs bg-reya-mine-shaft-2 border border-reya-boulder text-reya-athens-gray rounded-lg py-[0.4375rem] px-3 hover:bg-reya-mine-shaft-3 hover:border-reya-gray transition-colors cursor-pointer whitespace-nowrap"
    >
      Use Address from Docs
    </button>
  );
}

function WalletBadge() {
  const walletAddress = useWalletAddress();
  const { setWalletAddress, setPositions } = useActions(useWalletStore);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBadgeClick = () => {
    setInputValue(walletAddress);
    setIsEditing(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setWalletAddress(trimmedValue);
      if (isValidWalletAddress(trimmedValue)) {
        try {
          const positions = await apiGetPositions(trimmedValue);
          setPositions(positions.length > 0 ? positions : MOCK_POSITIONS);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to fetch positions";
          toast.error(message);
        }
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSubmit();
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Enter wallet address"
        className="text-xs font-bold bg-reya-mine-shaft-3 border border-reya-boulder rounded-lg py-[0.4375rem] px-2 text-reya-athens-gray outline-none focus:border-reya-screamin-green w-full max-w-[280px]"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleBadgeClick}
      className="text-xs font-bold bg-reya-mine-shaft-3 border border-reya-boulder rounded-lg py-[0.4375rem] px-2 hover:border-reya-gray transition-colors cursor-pointer whitespace-nowrap"
    >
      {truncateAddress(walletAddress)}
    </button>
  );
}

export function WalletInputSection() {
  return (
    <>
      <div className="justify-self-center">
        <TestAddressButton />
      </div>
      <div className="justify-self-end">
        <WalletBadge />
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "../Modal/Modal";
import { ModalContent, SubscribeResponse } from "@/types/subscribe";

export default function SubscribeForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    header: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:1337/api/subscribes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { email } }),
      });
      const data: SubscribeResponse = await response.json();

      if (!response.ok) {
        // Handle error response from server
        const errorMessage = data?.error?.message || t("subscribeError");
        setModalContent({
          header: t("error"),
          message: errorMessage,
        });
      } else {
        // Show success modal
        setModalContent({
          header: t("success"),
          message: t("subscribeSuccess"),
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setModalContent({
        header: t("error"),
        message: t("subscribeError"),
      });
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 w-full md:w-auto">
      <input
        type="email"
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="w-full sm:w-auto px-4 py-2 bg-white rounded-sm text-[--color-primarycolor] outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-4 py-2 bg-[--color-primarycolor] text-white border border-white rounded-sm hover:bg-white hover:text-[--color-primarycolor] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? t("subscribing") : t("subscribe")}
      </button>

      {showModal && (
        <Modal header={modalContent.header} body={modalContent.message} close={() => setShowModal(false)} />
      )}
    </form>
  );
}

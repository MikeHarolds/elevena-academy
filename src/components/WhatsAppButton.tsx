import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "2348012345678";

  const message = encodeURIComponent(
    "Hello Michael, I would like to make an enquiry."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
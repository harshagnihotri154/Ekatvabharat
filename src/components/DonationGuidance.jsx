import React, { useState } from "react";
const guidance = {
  en: {
    label: "English",
    title: "How to contribute",
    text: "Choose an amount and a cause. Enter your name and email when online checkout is available, then complete payment through Razorpay. Wait for confirmation before paying again. You can also choose bank transfer. For help in Marathi or Hindi, call our Pune team.",
    note: "The payment form and detailed policies are currently in English.",
  },
  hi: {
    label: "हिन्दी",
    title: "योगदान कैसे करें",
    text: "अपनी राशि और उद्देश्य चुनें। ऑनलाइन भुगतान उपलब्ध होने पर अपना नाम और ईमेल दर्ज करें, फिर Razorpay के माध्यम से भुगतान पूरा करें। दोबारा भुगतान करने से पहले पुष्टि की प्रतीक्षा करें। आप बैंक ट्रांसफ़र भी चुन सकते हैं। सहायता के लिए हमारी पुणे टीम को कॉल करें।",
    note: "भुगतान फ़ॉर्म और विस्तृत नीतियाँ फिलहाल अंग्रेज़ी में हैं।",
  },
  mr: {
    label: "मराठी",
    title: "योगदान कसे द्यावे",
    text: "रक्कम आणि उद्देश निवडा. ऑनलाइन पेमेंट उपलब्ध असल्यास तुमचे नाव आणि ईमेल भरा, नंतर Razorpay द्वारे पेमेंट पूर्ण करा. पुन्हा पेमेंट करण्यापूर्वी पुष्टीची वाट पाहा. तुम्ही बँक हस्तांतरणाचाही पर्याय निवडू शकता. मदतीसाठी आमच्या पुणे येथील टीमला फोन करा.",
    note: "पेमेंट फॉर्म आणि सविस्तर धोरणे सध्या इंग्रजीत आहेत.",
  },
};
export default function DonationGuidance() {
  const [language, setLanguage] = useState("en");
  const copy = guidance[language];
  return (
    <div className="donation-guidance">
      <label>
        Contribution guidance / भाषा
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {Object.entries(guidance).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>
      </label>
      <div lang={language}>
        <h3>{copy.title}</h3>
        <p>{copy.text}</p>
        <p className="small-note">{copy.note}</p>
      </div>
      <a className="text-link" href="tel:+919272799605">
        +91 92727 99605
      </a>
    </div>
  );
}

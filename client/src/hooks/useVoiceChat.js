import { useState, useRef, useEffect } from "react";

export function useVoiceChat(mode = "optimal") {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-NG";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = async (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
      await sendToAPI(text);
    };

    recognition.onerror = (e) => {
      setError(`Speech error: ${e.error}`);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      window.speechSynthesis.cancel();
    };
  }, [mode]); // re-init if mode changes

  async function sendToAPI(text) {
    setError("");
    try {
      const res = await fetch("/api/ai/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, mode }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const replyText = data.reply || data.message || "";
      setResponse(replyText);
      speak(replyText);
    } catch (err) {
      setError(err.message);
    }
  }

  function speak(text) {
    if (!text) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-NG";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function startListening() {
    if (!recognitionRef.current) return;
    setTranscript("");
    setResponse("");
    setError("");
    try {
      recognitionRef.current.start();
    } catch (err) {
      // already started — ignore
    }
  }

  function stopListening() {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  }

  return {
    isListening,
    isSpeaking,
    transcript,
    response,
    error,
    startListening,
    stopListening,
  };
}
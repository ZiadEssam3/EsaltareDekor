import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatInterface.css";
import { getAIResponse } from "./ChatbotAPI";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash.debounce";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './ChatInterface.css';
const ChatInterface = () => {
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem("chatMessages")) || [
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = useCallback(debounce(async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, I couldn't fetch a response." }]);
    } finally {
      setIsTyping(false);
    }
  }, 300), [input]);

  const handleQuickReply = (text) => {
    setInput(text);
    handleSendMessage();
  };

  const handleClearChat = () => {
    setMessages([{ sender: "bot", text: "Hello! How can I assist you today?" }]);
    localStorage.removeItem("chatMessages");
  };

  const chatBubbles = useMemo(() => (
    messages.map((msg, index) => (
      <motion.div
        key={index}
        className={`d-flex align-items-start mb-3 ${msg.sender === "user" ? "justify-content-end" : ""}`}
        initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {msg.sender === "bot" && <i className="fas fa-robot chat-bot-icon me-2"></i>}
        <div className={`p-3 rounded ${msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}>
          <p className="mb-0 rounded-5">{msg.text}</p>
        </div>
        {msg.sender === "user" && <i className="fas fa-user chat-user-icon ms-2"></i>}
      </motion.div>
    ))
  ), [messages]);

  return (
    <div>
      {!isOpen && (
        <motion.button
          className="btn position-fixed bottom-0 end-0 m-3 d-flex align-items-center justify-content-center border-0 chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <i className="fas fa-comment fs-5"></i>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="position-fixed bottom-0 end-0 m-3 bg-white rounded shadow p-4 d-flex flex-column chat-window"
          >
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Chat</h5>
              <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-warning btn-sm me-2" onClick={handleClearChat}><i className="fas fa-trash"></i></button>
                <button className="btn btn-danger btn-sm" onClick={() => setIsOpen(false)}><i className="fas fa-times"></i></button>
              </div>
            </div>
            <div className="flex-grow-1 overflow-auto mb-3">
              {chatBubbles}
              {isTyping && <p className="text-muted">Bot is typing...</p>}
              <div ref={messagesEndRef} />
            </div>

            <div className="mt-4 d-flex align-items-center border-top pt-3">
              <textarea
                ref={inputRef}
                placeholder="Type here..."
                onKeyPress={handleKeyPress}
                className="form-control border-1 shadow-none chat-textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="btn ms-2 chat-send-btn"
                onClick={handleSendMessage}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>

            <div className="mt-3 quick-replies">
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("What are the latest home design trends?")}>Latest Trends</button>
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("How can I maximize small spaces?")}>Small Space Solutions</button>
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("Suggest color schemes for a modern home")}>Color Schemes</button>
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("How do I make my home more cozy?")}>Cozy Home Ideas</button>
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("What furniture works best for minimalistic design?")}>Minimalist Furniture</button>
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("How do I create a luxurious home interior?")}>Luxury Interiors</button>
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("Give me DIY home decor ideas")}>DIY Home Decor</button>
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("How can I make my home eco-friendly?")}>Eco-Friendly Design</button>
              <button className="btn btn-sm ED-btn-co" onClick={() => handleQuickReply("What are the best lighting ideas for a home?")}>Lighting Ideas</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;

import { useState } from "react";

import {
  uploadDocument
} from "../../services/documentService";

import MainLayout from "../../layouts/MainLayout";
import {
  Sparkles,
  Send,
  Paperclip,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { sendMessage } from "../../services/aiChatService";

export default function AIChatPage() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI assistant. Ask me anything about business, content, or productivity.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [documentText, setDocumentText] =
    useState("");

  const handleFileUpload =
    async (event) => {
      const file =
        event.target.files[0];
      if (!file) return;
      setSelectedFile(file);
      try {
        const result =
          await uploadDocument(
            file
          );
        setDocumentText(
          result.text
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userInput = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userInput,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const reply =
        await sendMessage(
          userInput,
          documentText
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to contact AI service.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <MainLayout>
      <section className="px-6 pt-16 pb-20">

        <div className="max-w-4xl mx-auto">

          <div className="text-center">

            <p
              className="
              uppercase
              tracking-[6px]
              text-xs
              text-slate-500
              mb-4
              "
            >
              AI CHAT
            </p>

            <h1
              className="
              text-[56px]
              font-bold
              leading-none
              text-slate-900
              "
            >
              Chat with your AI assistant
            </h1>

            <p
              className="
              mt-4
              text-[18px]
              text-slate-500
              "
            >
              General purpose AI assistant for business,
              content & productivity.
            </p>

          </div>

          <div
            className="
            mt-10
            bg-white
            border
            border-slate-200
            rounded-[28px]
            overflow-hidden
            "
          >

            <div
              className="
              flex
              items-center
              gap-4
              p-6
              border-b
              border-slate-200
              "
            >
              <div
                className="
                w-12
                h-12
                rounded-xl
                bg-indigo-50
                flex
                items-center
                justify-center
                text-indigo-600
                "
              >
                <Sparkles size={20} />
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  AI Assistant
                </h3>

                <p className="text-sm text-slate-500">
                  Powered by GPT-OSS-120B
                </p>
              </div>
            </div>

            <div
              className="
              p-6
              min-h-45
              max-h-87.5
              overflow-y-auto
              space-y-4
              "
            >

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-2xl px-4 py-3 max-w-[80%]"
                        : "bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 max-w-[80%]"
                    }
                  >
                    {msg.role === "user" ? (
                      msg.content
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-2xl font-bold mb-3">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-xl font-bold mb-3">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-lg font-semibold mb-2">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="mb-3 leading-7">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-5 mb-3 space-y-1">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-5 mb-3 space-y-1">
                              {children}
                            </ol>
                          ),
                          table: ({ children }) => (
                            <table className="w-full border border-slate-300 my-4 text-sm">
                              {children}
                            </table>
                          ),
                          th: ({ children }) => (
                            <th className="border border-slate-300 px-3 py-2 bg-slate-100 text-left">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="border border-slate-300 px-3 py-2">
                              {children}
                            </td>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                  Thinking...
                </div>
              )}

            </div>

            <div
              className="
              border-t
              border-slate-200
              p-4
              "
            >

              {selectedFile && (
                <div
                  className="
                  px-4
                  pb-3
                  text-sm
                  text-indigo-600
                  "
                >
                  📄 {selectedFile.name}
                </div>
              )}

              <div className="flex gap-3 items-center">
                <label
                  className="
                  w-12
                  h-12
                  border
                  border-slate-200
                  rounded-2xl
                  bg-white
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:border-indigo-400
                  "
                >
                  <Paperclip size={18} />
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={
                      handleFileUpload
                    }
                  />
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder={
                    selectedFile
                      ? "Ask about the uploaded document..."
                      : "Ask anything..."
                  }
                  className="
                  flex-1
                  h-12
                  border
                  border-slate-200
                  rounded-2xl
                  px-5
                  outline-none
                  focus:border-indigo-400
                  "
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="
                  w-12
                  h-12
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  transition
                  "
                >
                  <Send size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </section>
    </MainLayout>
  );
}
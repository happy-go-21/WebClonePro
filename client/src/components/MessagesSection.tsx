import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { apiRequest } from "@/lib/queryClient";
import type { Conversation, Message } from "@shared/schema";

export default function MessagesSection() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
  });

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["/api/conversations", selectedConversation, "messages"],
    enabled: !!selectedConversation,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!selectedConversation) throw new Error("No conversation selected");
      const response = await apiRequest("POST", `/api/conversations/${selectedConversation}/messages`, {
        content,
      });
      return response.json();
    },
    onSuccess: () => {
      setMessageInput("");
      queryClient.invalidateQueries({ queryKey: ["/api/conversations", selectedConversation, "messages"] });
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("failedToSendMessage"),
        variant: "destructive",
      });
    },
  });

  // WebSocket for real-time messaging
  const { lastMessage } = useWebSocket("/ws");

  useEffect(() => {
    if (lastMessage?.type === "new_message") {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
      if (selectedConversation === lastMessage.message.conversationId) {
        queryClient.invalidateQueries({ 
          queryKey: ["/api/conversations", selectedConversation, "messages"] 
        });
      }
    }
  }, [lastMessage, selectedConversation, queryClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      sendMessageMutation.mutate(messageInput.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    searchQuery === "" || 
    conv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold">{t("messages")}</h2>
      </div>
      
      <div className="flex h-96">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-border">
          <div className="p-4">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-3 text-muted-foreground"></i>
              <Input
                type="text"
                placeholder={t("searchConversations")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-conversations"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <i className="fas fa-envelope text-2xl mb-2"></i>
                <p className="text-sm">{t("noConversations")}</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`conversation-item p-4 hover:bg-muted cursor-pointer transition-colors ${
                    selectedConversation === conversation.id
                      ? "border-l-4 border-primary bg-primary/5"
                      : "border-l-4 border-transparent"
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                  data-testid={`conversation-${conversation.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {conversation.buyerId.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {t("conversation")} #{conversation.id.substring(0, 8)}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.productId ? t("aboutProduct") : t("generalChat")}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(conversation.createdAt!).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {selectedConversation.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{t("conversation")} #{selectedConversation.substring(0, 8)}</h4>
                    <p className="text-xs text-muted-foreground">{t("online")}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <i className="fas fa-comments text-4xl mb-4"></i>
                    <p>{t("noMessages")}</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`text-sm p-3 rounded-lg max-w-xs ${
                          message.senderId === "current-user"
                            ? "message-bubble-sent text-white"
                            : "message-bubble-received"
                        }`}
                        data-testid={`message-${message.id}`}
                      >
                        <p>{message.content}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            message.senderId === "current-user"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {new Date(message.createdAt!).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder={t("typeMessage")}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    data-testid="input-message"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim() || sendMessageMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {sendMessageMutation.isPending ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <i className="fas fa-paper-plane"></i>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <i className="fas fa-comments text-6xl mb-4"></i>
                <p className="text-lg font-medium">{t("selectConversation")}</p>
                <p className="text-sm">{t("selectConversationDesc")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

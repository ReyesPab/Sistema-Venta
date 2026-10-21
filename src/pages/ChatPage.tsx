import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageSquare, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de AutoParts Pro. ¿En qué puedo ayudarte hoy? Puedo ayudarte a encontrar partes, verificar disponibilidad, o resolver dudas sobre tu pedido.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('freno') || lower.includes('brake')) {
      return 'Tenemos varias opciones de pastillas de freno disponibles. Las más populares son las cerámicas para Toyota Corolla (RD$3,500) y las semi-metálicas para Honda Civic (RD$2,800). ¿Para qué vehículo las necesitas?';
    }
    if (lower.includes('envío') || lower.includes('envio') || lower.includes('delivery')) {
      return 'Ofrecemos dos opciones de entrega:\n\n🚚 **Envío a domicilio**: 2-5 días hábiles, costo según ubicación\n🏪 **Recoger en tienda**: Gratis, disponible en horario de la tienda\n\n¿Cuál prefieres?';
    }
    if (lower.includes('pago') || lower.includes('tarjeta') || lower.includes('payment')) {
      return 'Aceptamos los siguientes métodos de pago:\n\n💳 Tarjetas de crédito/débito (Visa, MasterCard)\n🏦 Transferencia bancaria\n💵 Pago en tienda (efectivo)\n\nTodos los pagos con tarjeta son procesados de forma segura.';
    }
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto')) {
      return 'Los precios varían según el producto y la tienda. Puedes ver todos los precios en nuestro catálogo. ¿Hay algún producto específico que te interese?';
    }
    if (lower.includes('pedido') || lower.includes('order') || lower.includes('seguimiento')) {
      return 'Puedes ver el estado de tus pedidos en la sección "Mis Pedidos". Los estados posibles son:\n\n⏳ Pendiente - Esperando confirmación\n✅ Confirmado - Siendo preparado\n🚚 Enviado - En camino\n📦 Entregado - ¡Listo!\n\n¿Necesitas ayuda con un pedido específico?';
    }
    if (lower.includes('hola') || lower.includes('hello') || lower.includes('hi')) {
      return '¡Hola! 👋 ¿Cómo estás? Estoy aquí para ayudarte con lo que necesites. Puedo asistirte con:\n\n• Búsqueda de partes\n• Información de productos\n• Estado de pedidos\n• Métodos de pago\n• Políticas de envío\n\n¿En qué te puedo ayudar?';
    }
    if (lower.includes('gracias') || lower.includes('thanks')) {
      return '¡De nada! 😊 Estoy aquí para ayudarte siempre que lo necesites. ¿Hay algo más en lo que pueda asistirte?';
    }
    
    return 'Entiendo tu consulta. Déjame ayudarte con eso. Para brindarte la mejor atención, te recomiendo:\n\n1. Revisar nuestro catálogo de productos\n2. Contactar directamente al vendedor desde su perfil\n3. Revisar la sección de preguntas frecuentes\n\n¿Puedo ayudarte con algo más específico?';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getAIResponse(input),
      sender: 'ai',
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const quickActions = [
    '¿Tienen pastillas de freno?',
    '¿Cuáles son los métodos de pago?',
    '¿Cómo funciona el envío?',
    'Estado de mi pedido'
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 bg-slate-900/50 border border-white/5 rounded-t-2xl">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2">
            Asistente Virtual
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h3>
          <p className="text-xs text-green-400">En línea</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50 border-x border-white/5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white rounded-br-md'
                : 'bg-slate-800 border border-white/5 text-slate-200 rounded-bl-md'
            }`}>
              <p className="text-sm whitespace-pre-line">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200/60' : 'text-slate-500'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-800 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 bg-slate-950/50 border-x border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => { setInput(action); }}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900/50 border border-white/5 rounded-b-2xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-3 bg-blue-500 rounded-xl text-white hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

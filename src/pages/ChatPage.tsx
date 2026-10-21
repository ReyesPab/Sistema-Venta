import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Zap } from 'lucide-react';

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
      text: '¡Hola! 👋 Soy el asistente virtual de AutoParts Pro. Estoy aquí para ayudarte a encontrar las mejores partes para tu vehículo.\n\n¿En qué puedo ayudarte hoy?',
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
      return '🔧 ¡Excelente elección! Tenemos varias opciones de pastillas de freno:\n\n• **Cerámicas para Toyota Corolla** - RD$3,500\n• **Semi-metálicas para Honda Civic** - RD$2,800\n• **Orgánicas para Hyundai Tucson** - RD$3,200\n\n¿Para qué vehículo las necesitas? Así puedo recomendarte la mejor opción.';
    }
    if (lower.includes('envío') || lower.includes('envio') || lower.includes('delivery')) {
      return '🚚 Ofrecemos dos opciones de entrega:\n\n**Envío a domicilio**\n• 2-5 días hábiles\n• Costo según ubicación\n• Seguimiento en tiempo real\n\n**Recoger en tienda**\n• Gratis\n• Disponible en horario de la tienda\n• Listo en 1 hora\n\n¿Cuál prefieres?';
    }
    if (lower.includes('pago') || lower.includes('tarjeta') || lower.includes('payment')) {
      return '💳 Aceptamos los siguientes métodos de pago:\n\n• **Tarjetas de crédito/débito** (Visa, MasterCard, Atlantic)\n• **Transferencia bancaria**\n• **Pago en tienda** (efectivo)\n\nTodos los pagos con tarjeta son procesados de forma segura con encriptación SSL 🔒';
    }
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto')) {
      return '💰 Los precios varían según el producto y la tienda. Puedes ver todos los precios en nuestro catálogo.\n\n¿Hay algún producto específico que te interese? Puedo buscarlo por ti.';
    }
    if (lower.includes('pedido') || lower.includes('order') || lower.includes('seguimiento')) {
      return '📦 Puedes ver el estado de tus pedidos en la sección "Mis Pedidos". Los estados posibles son:\n\n⏳ **Pendiente** - Esperando confirmación\n✅ **Confirmado** - Siendo preparado\n🚚 **Enviado** - En camino\n📦 **Entregado** - ¡Listo!\n\n¿Necesitas ayuda con un pedido específico?';
    }
    if (lower.includes('hola') || lower.includes('hello') || lower.includes('hi') || lower.includes('buenas')) {
      return '¡Hola! 👋 ¿Cómo estás? Estoy aquí para ayudarte con lo que necesites.\n\nPuedo asistirte con:\n\n🔍 Búsqueda de partes\n📋 Información de productos\n📦 Estado de pedidos\n💳 Métodos de pago\n🚚 Políticas de envío\n\n¿En qué te puedo ayudar?';
    }
    if (lower.includes('gracias') || lower.includes('thanks')) {
      return '¡De nada! 😊 Estoy aquí para ayudarte siempre que lo necesites. ¿Hay algo más en lo que pueda asistirte?';
    }
    if (lower.includes('motor') || lower.includes('engine')) {
      return '🔧 Tenemos una amplia variedad de partes de motor:\n\n• Filtros de aceite\n• Bombas de combustible\n• Kits de distribución\n• Radiadores\n• Y mucho más\n\n¿Qué tipo de parte de motor estás buscando?';
    }
    
    return 'Entiendo tu consulta. Déjame ayudarte con eso.\n\nPara brindarte la mejor atención, te recomiendo:\n\n1. Revisar nuestro **catálogo de productos**\n2. Contactar directamente al **vendedor** desde su perfil\n3. Revisar la sección de **preguntas frecuentes**\n\n¿Puedo ayudarte con algo más específico?';
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
    'Estado de mi pedido',
    'Partes de motor'
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto animate-fade-in">
      {/* Chat header */}
      <div className="glass-card rounded-t-2xl p-4 flex items-center gap-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
          <div className="relative w-11 h-11 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="relative flex-1">
          <h3 className="text-white font-bold flex items-center gap-2">
            Asistente Virtual
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </h3>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            En línea
          </p>
        </div>
        <div className="relative glass rounded-lg px-3 py-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 glass border-x border-white/5">
        {messages.map((msg, index) => (
          <div key={msg.id} className={`flex gap-3 animate-slide-up ${msg.sender === 'user' ? 'justify-end' : ''}`} style={{animationDelay: `${index * 50}ms`}}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-md shadow-lg shadow-blue-500/20'
                : 'glass text-slate-200 rounded-bl-md'
            }`}>
              <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
              <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-blue-200/60' : 'text-slate-500'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 animate-slide-up">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 py-3 glass border-x border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => { setInput(action); }}
              className="px-3 py-2 glass rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap border border-white/5 hover:border-white/20"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 glass-card rounded-b-2xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-3 glass rounded-xl text-white placeholder-slate-500 focus:border-blue-400/50 transition-all duration-300"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

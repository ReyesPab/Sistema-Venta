import React from 'react';
import { analyzePasswordStrength, PasswordStrength } from '../utils/crypto';
import { Shield, ShieldCheck, ShieldAlert, ShieldX, Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
  showDetails?: boolean;
}

export default function PasswordStrengthMeter({ password, showDetails = true }: PasswordStrengthMeterProps) {
  if (!password) return null;

  const strength: PasswordStrength = analyzePasswordStrength(password);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'from-red-500 to-red-600';
      case 'orange': return 'from-orange-500 to-amber-500';
      case 'yellow': return 'from-yellow-500 to-amber-400';
      case 'green': return 'from-green-500 to-emerald-500';
      case 'emerald': return 'from-emerald-500 to-teal-400';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getTextColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-400';
      case 'orange': return 'text-orange-400';
      case 'yellow': return 'text-yellow-400';
      case 'green': return 'text-green-400';
      case 'emerald': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  const getIcon = () => {
    switch (strength.level) {
      case 'very_weak': return <ShieldX className="w-4 h-4" />;
      case 'weak': return <ShieldAlert className="w-4 h-4" />;
      case 'fair': return <Shield className="w-4 h-4" />;
      case 'strong': return <ShieldCheck className="w-4 h-4" />;
      case 'very_strong': return <ShieldCheck className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3 animate-slide-up">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1.5 ${getTextColorClass(strength.color)}`}>
            {getIcon()}
            <span className="text-xs font-semibold">{strength.label}</span>
          </div>
          <span className={`text-xs font-bold ${getTextColorClass(strength.color)}`}>
            {strength.score}/100
          </span>
        </div>
        
        {/* Bar */}
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getColorClass(strength.color)} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${strength.score}%` }}
          />
        </div>
        
        {/* Segments */}
        <div className="flex gap-1">
          {[20, 40, 60, 80, 100].map((threshold, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                strength.score >= threshold
                  ? `bg-gradient-to-r ${getColorClass(strength.color)}`
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Checks */}
      {showDetails && (
        <div className="grid grid-cols-2 gap-2">
          <CheckItem 
            passed={strength.checks.minLength} 
            label="8+ caracteres" 
          />
          <CheckItem 
            passed={strength.checks.hasUppercase} 
            label="Mayúsculas (A-Z)" 
          />
          <CheckItem 
            passed={strength.checks.hasLowercase} 
            label="Minúsculas (a-z)" 
          />
          <CheckItem 
            passed={strength.checks.hasNumbers} 
            label="Números (0-9)" 
          />
          <CheckItem 
            passed={strength.checks.hasSpecialChars} 
            label="Especiales (!@#)" 
          />
          <CheckItem 
            passed={strength.checks.noCommonPasswords} 
            label="No es común" 
          />
        </div>
      )}

      {/* Suggestions */}
      {strength.suggestions.length > 0 && showDetails && (
        <div className="glass rounded-lg p-3">
          <p className="text-xs text-slate-400 font-medium mb-1.5">💡 Sugerencias:</p>
          <ul className="space-y-1">
            {strength.suggestions.slice(0, 3).map((suggestion, i) => (
              <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                <span className="text-blue-400 mt-0.5">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CheckItem({ passed, label }: { passed: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${passed ? 'text-emerald-400' : 'text-slate-500'}`}>
      {passed ? (
        <div className="w-3.5 h-3.5 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <Check className="w-2.5 h-2.5" />
        </div>
      ) : (
        <div className="w-3.5 h-3.5 bg-white/5 rounded-full flex items-center justify-center">
          <X className="w-2.5 h-2.5" />
        </div>
      )}
      <span>{label}</span>
    </div>
  );
}

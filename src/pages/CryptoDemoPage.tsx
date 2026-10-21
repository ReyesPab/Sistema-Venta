import React, { useState, useEffect } from 'react';
import { 
  hashPassword, 
  verifyPassword, 
  analyzePasswordStrength, 
  generateSecureToken, 
  generateVerificationCode,
  encryptData,
  decryptData,
  maskPassword,
  maskEmail,
  maskCardNumber,
  generateSalt
} from '../utils/crypto';
import { Shield, Lock, Key, Eye, EyeOff, Copy, Check, RefreshCw, Fingerprint, Hash, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function CryptoDemoPage() {
  const [testPassword, setTestPassword] = useState('MiPassword123!');
  const [showPassword, setShowPassword] = useState(false);
  const [hashResult, setHashResult] = useState<{ hash: string; salt: string } | null>(null);
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [strength, setStrength] = useState(analyzePasswordStrength('MiPassword123!'));
  const [secureToken, setSecureToken] = useState(generateSecureToken());
  const [verificationCode, setVerificationCode] = useState(generateVerificationCode());
  const [encryptInput, setEncryptInput] = useState('Datos sensibles aquí');
  const [encryptKey, setEncryptKey] = useState('my-secret-key');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [copied, setCopied] = useState('');

  // Actualizar hash cuando cambia la contraseña
  useEffect(() => {
    if (testPassword) {
      const result = hashPassword(testPassword);
      setHashResult(result);
      setStrength(analyzePasswordStrength(testPassword));
    }
  }, [testPassword]);

  const handleVerify = () => {
    if (hashResult) {
      const isValid = verifyPassword(verifyInput, hashResult.hash, hashResult.salt);
      setVerifyResult(isValid);
    }
  };

  const handleEncrypt = () => {
    if (encryptInput && encryptKey) {
      const encrypted = encryptData(encryptInput, encryptKey);
      setEncryptedData(encrypted);
      setDecryptedData('');
    }
  };

  const handleDecrypt = () => {
    if (encryptedData && encryptKey) {
      try {
        const decrypted = decryptData(encryptedData, encryptKey);
        setDecryptedData(decrypted);
      } catch {
        setDecryptedData('[Error: Clave incorrecta]');
      }
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const regenerateToken = () => setSecureToken(generateSecureToken());
  const regenerateCode = () => setVerificationCode(generateVerificationCode());

  const getColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-400';
      case 'orange': return 'text-orange-400';
      case 'yellow': return 'text-yellow-400';
      case 'green': return 'text-green-400';
      case 'emerald': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/15 to-cyan-600/20"></div>
        <div className="relative p-6 lg:p-8 border border-emerald-500/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Sistema de Cifrado</h2>
              <p className="text-sm text-slate-400">Demostración interactiva del cifrado de contraseñas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4 card-hover">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-white">SHA-256</span>
          </div>
          <p className="text-xs text-slate-400">Algoritmo criptográfico de hashing irreversible</p>
        </div>
        <div className="glass-card rounded-xl p-4 card-hover">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-white">Salt + Pepper</span>
          </div>
          <p className="text-xs text-slate-400">Protección contra rainbow tables y ataques</p>
        </div>
        <div className="glass-card rounded-xl p-4 card-hover">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-white">Key Stretching</span>
          </div>
          <p className="text-xs text-slate-400">1000 iteraciones para mayor seguridad</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Hashing Demo */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            Hashing de Contraseña
          </h3>
          
          <div>
            <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Contraseña de prueba</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 glass rounded-xl text-white focus:border-blue-400/50 transition-all"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Salt */}
          {hashResult && (
            <div>
              <label className="text-xs text-slate-400 mb-1 block flex items-center justify-between">
                <span className="font-medium uppercase tracking-wider">Salt generado</span>
                <button 
                  onClick={() => copyToClipboard(hashResult.salt, 'salt')}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  {copied === 'salt' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span className="text-xs">{copied === 'salt' ? 'Copiado' : 'Copiar'}</span>
                </button>
              </label>
              <div className="p-3 bg-white/5 rounded-lg font-mono text-xs text-cyan-400 break-all">
                {hashResult.salt}
              </div>
            </div>
          )}

          {/* Hash result */}
          {hashResult && (
            <div>
              <label className="text-xs text-slate-400 mb-1 block flex items-center justify-between">
                <span className="font-medium uppercase tracking-wider">Hash SHA-256 (cifrado)</span>
                <button 
                  onClick={() => copyToClipboard(hashResult.hash, 'hash')}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  {copied === 'hash' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span className="text-xs">{copied === 'hash' ? 'Copiado' : 'Copiar'}</span>
                </button>
              </label>
              <div className="p-3 bg-white/5 rounded-lg font-mono text-xs text-emerald-400 break-all">
                {hashResult.hash}
              </div>
            </div>
          )}

          <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
            <p className="text-xs text-blue-300/70 flex items-start gap-2">
              <Fingerprint className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>El hash es <strong>irreversible</strong>. No se puede recuperar la contraseña original desde el hash. Solo se puede verificar comparando hashes.</span>
            </p>
          </div>
        </div>

        {/* Password Verification */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Verificación de Contraseña
          </h3>
          
          <div>
            <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Ingresa la contraseña a verificar</label>
            <input
              type="password"
              value={verifyInput}
              onChange={(e) => { setVerifyInput(e.target.value); setVerifyResult(null); }}
              placeholder="Escribe la contraseña..."
              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-slate-500 focus:border-emerald-400/50 transition-all"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={!verifyInput || !hashResult}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all disabled:opacity-50"
          >
            Verificar Contraseña
          </button>

          {verifyResult !== null && (
            <div className={`p-4 rounded-xl border animate-slide-up ${
              verifyResult 
                ? 'bg-emerald-500/10 border-emerald-500/20' 
                : 'bg-red-500/10 border-red-500/20'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  verifyResult ? 'bg-emerald-500/20' : 'bg-red-500/20'
                }`}>
                  {verifyResult ? (
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p className={`font-semibold ${verifyResult ? 'text-emerald-400' : 'text-red-400'}`}>
                    {verifyResult ? '✓ Contraseña Correcta' : '✗ Contraseña Incorrecta'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {verifyResult 
                      ? 'El hash coincide con la contraseña almacenada'
                      : 'El hash no coincide. Acceso denegado.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Password Strength */}
          <div>
            <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Fortaleza de la contraseña</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${getColorClass(strength.color)}`}>
                  {strength.label}
                </span>
                <span className={`text-sm font-bold ${getColorClass(strength.color)}`}>
                  {strength.score}/100
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${
                    strength.color === 'red' ? 'from-red-500 to-red-600' :
                    strength.color === 'orange' ? 'from-orange-500 to-amber-500' :
                    strength.color === 'yellow' ? 'from-yellow-500 to-amber-400' :
                    strength.color === 'green' ? 'from-green-500 to-emerald-500' :
                    'from-emerald-500 to-teal-400'
                  } rounded-full transition-all duration-500`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {[
                  { check: strength.checks.minLength, label: '8+ caracteres' },
                  { check: strength.checks.hasUppercase, label: 'Mayúsculas' },
                  { check: strength.checks.hasLowercase, label: 'Minúsculas' },
                  { check: strength.checks.hasNumbers, label: 'Números' },
                  { check: strength.checks.hasSpecialChars, label: 'Especiales' },
                  { check: strength.checks.noCommonPasswords, label: 'No común' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-1.5 text-xs ${item.check ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {item.check ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Token Generation & Encryption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Generation */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            Generación de Tokens
          </h3>

          {/* Secure Token */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-400 font-medium uppercase tracking-wider">Token Seguro (256-bit)</label>
              <button onClick={regenerateToken} className="text-blue-400 hover:text-blue-300 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-white/5 rounded-lg font-mono text-xs text-amber-400 break-all flex items-start justify-between gap-2">
              <span className="flex-1">{secureToken}</span>
              <button 
                onClick={() => copyToClipboard(secureToken, 'token')}
                className="text-blue-400 hover:text-blue-300 flex-shrink-0"
              >
                {copied === 'token' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Verification Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-400 font-medium uppercase tracking-wider">Código de Verificación (SMS/Email)</label>
              <button onClick={regenerateCode} className="text-blue-400 hover:text-blue-300 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-white/5 rounded-lg font-mono text-lg text-center text-cyan-400 tracking-widest">
              {verificationCode}
            </div>
          </div>

          <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
            <p className="text-xs text-amber-300/70 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Los tokens se generan con <code className="text-amber-400">crypto.getRandomValues()</code> usando el generador criptográfico del navegador.</span>
            </p>
          </div>
        </div>

        {/* AES Encryption */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            Cifrado AES-256
          </h3>

          <div>
            <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Datos a cifrar</label>
            <input
              type="text"
              value={encryptInput}
              onChange={(e) => setEncryptInput(e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-white focus:border-purple-400/50 transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wider">Clave de cifrado</label>
            <input
              type="text"
              value={encryptKey}
              onChange={(e) => setEncryptKey(e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-white focus:border-purple-400/50 transition-all"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEncrypt}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            >
              🔒 Cifrar
            </button>
            <button
              onClick={handleDecrypt}
              disabled={!encryptedData}
              className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all disabled:opacity-50"
            >
              🔓 Descifrar
            </button>
          </div>

          {encryptedData && (
            <div>
              <label className="text-xs text-slate-400 mb-1 block font-medium uppercase tracking-wider">Datos cifrados</label>
              <div className="p-3 bg-white/5 rounded-lg font-mono text-xs text-purple-400 break-all">
                {encryptedData}
              </div>
            </div>
          )}

          {decryptedData && (
            <div>
              <label className="text-xs text-slate-400 mb-1 block font-medium uppercase tracking-wider">Datos descifrados</label>
              <div className="p-3 bg-white/5 rounded-lg font-mono text-xs text-emerald-400">
                {decryptedData}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Masking */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-cyan-400" />
          Enmascaramiento de Datos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Contraseña</label>
            <div className="p-3 glass rounded-lg">
              <p className="text-sm text-white font-mono">{maskPassword(testPassword || 'password123')}</p>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Email</label>
            <div className="p-3 glass rounded-lg">
              <p className="text-sm text-white font-mono">{maskEmail('usuario@email.com')}</p>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Tarjeta</label>
            <div className="p-3 glass rounded-lg">
              <p className="text-sm text-white font-mono">{maskCardNumber('4532015112830366')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

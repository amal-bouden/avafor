import React, { useState, useEffect, useRef } from 'react';
import { User, Palette, Shirt, Smile, Mail, MessageSquare, Send, Sparkles, Zap, Heart, Eye, Trophy, Ghost, PartyPopper, Gamepad2, Key, Lock, Unlock, Crown, Sword, Shield, Skull, Rocket, Star, Cake, Music, Volume2, VolumeX, Settings } from 'lucide-react';

export default function UltimateContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
    gender: 'male',
    skinTone: '#FDB99D',
    hairColor: '#4A3728',
    hairStyle: 'short',
    outfit: 'casual',
    expression: 'happy',
    accessory: 'none',
    eyeColor: '#4A5F7A',
    bodyType: 'average',
    secretCode: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [particles, setParticles] = useState([]);
  const [avatarScale, setAvatarScale] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentlyTyping, setCurrentlyTyping] = useState('');
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [easterEggsFound, setEasterEggsFound] = useState([]);
  const [showWinModal, setShowWinModal] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [gameMode, setGameMode] = useState(false);
  const [typingEffect, setTypingEffect] = useState('');
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  // Easter eggs configuration
  const easterEggs = {
    KONAMI: { 
      code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
      message: '🎮 Code Konami activé ! Mode jeu débloqué !',
      icon: <Gamepad2 className="inline mr-2" />
    },
    WINNING_MESSAGE: {
      trigger: 'Félicitations, vous avez gagné !',
      message: '🎉 VOUS AVEZ GAGNÉ LE GRAND PRIX ! 🏆',
      icon: <Trophy className="inline mr-2" />
    },
    SECRET_CODE: {
      code: '1337',
      message: '🔥 Mode Hacker activé ! Interface matrix déployée.',
      icon: <Key className="inline mr-2" />
    },
    SPOOKY: {
      trigger: 'Halloween',
      message: '👻 Mode Spooky activé ! Les fantômes sont parmi nous...',
      icon: <Ghost className="inline mr-2" />
    },
    CAKE: {
      trigger: 'anniversaire',
      message: '🎂 Joyeux anniversaire ! Voici un gâteau virtuel !',
      icon: <Cake className="inline mr-2" />
    }
  };

  // Easter egg detection
  useEffect(() => {
    const checkEasterEggs = () => {
      const eggsFound = [];
      
      // Check for winning message in topic
      if (formData.topic.toLowerCase().includes('félicitations')) {
        if (!easterEggsFound.includes('WINNING_MESSAGE')) {
          eggsFound.push('WINNING_MESSAGE');
          setTimeout(() => setShowWinModal(true), 500);
        }
      }
      
      // Check for secret codes
      if (formData.secretCode === easterEggs.SECRET_CODE.code && !easterEggsFound.includes('SECRET_CODE')) {
        eggsFound.push('SECRET_CODE');
        setGameMode(true);
      }
      
      // Check for spooky mode
      if (formData.message.toLowerCase().includes('halloween') && !easterEggsFound.includes('SPOOKY')) {
        eggsFound.push('SPOOKY');
      }
      
      // Check for birthday
      if (formData.message.toLowerCase().includes('anniversaire') && !easterEggsFound.includes('CAKE')) {
        eggsFound.push('CAKE');
      }
      
      if (eggsFound.length > 0) {
        setEasterEggsFound(prev => [...prev, ...eggsFound]);
        eggsFound.forEach(egg => {
          setTimeout(() => {
            setTypingEffect(easterEggs[egg].message);
            setTimeout(() => setTypingEffect(''), 3000);
          }, 500);
        });
      }
    };
    
    checkEasterEggs();
  }, [formData.topic, formData.message, formData.secretCode]);

  // Konami code detection
  useEffect(() => {
    const konamiSequence = easterEggs.KONAMI.code;
    let currentIndex = 0;
    
    const handleKeyDown = (e) => {
      if (e.key === konamiSequence[currentIndex]) {
        currentIndex++;
        setKonamiProgress((currentIndex / konamiSequence.length) * 100);
        
        if (currentIndex === konamiSequence.length) {
          if (!easterEggsFound.includes('KONAMI')) {
            setEasterEggsFound(prev => [...prev, 'KONAMI']);
            setGameMode(true);
            setTypingEffect(easterEggs.KONAMI.message);
            setTimeout(() => setTypingEffect(''), 3000);
          }
          currentIndex = 0;
          setKonamiProgress(0);
        }
      } else {
        currentIndex = 0;
        setKonamiProgress(0);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [easterEggsFound]);

  useEffect(() => {
    let completionScore = 0;
    if (formData.name) completionScore += 20;
    if (formData.email) completionScore += 20;
    if (formData.topic) completionScore += 20;
    if (formData.message) completionScore += 20;
    if (formData.gender || formData.skinTone !== '#FDB99D') completionScore += 20;
    setAvatarScale(Math.min(completionScore, 100));
  }, [formData]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingPhase(prev => (prev + 0.05) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (submitted) {
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        size: Math.random() * 20 + 5
      }));
      setParticles(newParticles);
      setTimeout(() => {
        setParticles([]);
        setSubmitted(false);
        // Random chance to show winning modal
        if (Math.random() > 0.7) {
          setTimeout(() => setShowWinModal(true), 1000);
        }
      }, 5000);
    }
  }, [submitted]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setCurrentlyTyping(field);
    setTimeout(() => setCurrentlyTyping(''), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Easter egg: If message contains "win" or "gagne", show winning modal
    if (formData.message.toLowerCase().includes('gagne') || 
        formData.message.toLowerCase().includes('win') ||
        formData.topic.toLowerCase().includes('félicitations')) {
      setTimeout(() => setShowWinModal(true), 500);
    }
    
    setSubmitted(true);
  };

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled);
    if (audioRef.current) {
      if (!musicEnabled) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const getProgressMessage = () => {
    if (avatarScale === 0) return "✨ Commencez à taper pour matérialiser votre avatar...";
    if (avatarScale === 20) return "👤 Votre avatar prend forme...";
    if (avatarScale === 40) return "🎨 Magnifique ! Votre avatar devient réel...";
    if (avatarScale === 60) return "💫 Presque vivant ! Continuez à façonner...";
    if (avatarScale === 80) return "🌟 Formidable ! Dernières touches...";
    if (avatarScale === 100) return "🎉 Parfait ! Votre avatar est pleinement vivant !";
    return "";
  };

  const WinModal = () => {
    if (!showWinModal) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="relative bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-1 rounded-3xl max-w-2xl mx-4">
          <div className="bg-slate-900 rounded-3xl p-12 text-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-full shadow-2xl">
                <Trophy size={48} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 mb-6">
              🎉 FÉLICITATIONS ! 🎉
            </h2>
            
            <div className="text-2xl font-bold text-white mb-8 leading-relaxed">
              <p className="mb-4">VOUS AVEZ GAGNÉ LE GRAND PRIX !</p>
              <p className="text-yellow-300 animate-pulse">🎁 1 000 000 € EN BITCOINS 🎁</p>
            </div>
            
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 mb-8 border-2 border-yellow-500/50">
              <p className="text-slate-300 text-lg">
                Un message spécial vous sera envoyé à :<br />
                <span className="text-yellow-300 font-black text-xl">{formData.email || 'votre@email.com'}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowWinModal(false)}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black rounded-xl hover:scale-105 transition-transform"
              >
                🏆 CLAIMER MON PRIX
              </button>
              <button
                onClick={() => setShowWinModal(false)}
                className="px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-xl hover:scale-105 transition-transform border border-slate-600"
              >
                PARTAGER MA VICTOIRE
              </button>
            </div>
            
            <p className="text-slate-500 text-sm mt-8">
              *Ceci est une simulation. Les prix sont virtuels. Mais votre talent est bien réel !
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderRealisticAvatar = () => {
    const { gender, skinTone, hairColor, hairStyle, outfit, expression, accessory, eyeColor, bodyType } = formData;
    
    const showHead = formData.name;
    const showBody = formData.email;
    const showArms = formData.topic;
    const showDetails = formData.message;

    const bodyWidth = gender === 'female' ? (bodyType === 'slim' ? 65 : bodyType === 'athletic' ? 72 : 75) : (bodyType === 'slim' ? 75 : bodyType === 'athletic' ? 85 : 82);
    const bodyHeight = gender === 'female' ? 95 : 105;
    const shoulderWidth = gender === 'female' ? 80 : 90;
    
    const breathOffset = Math.sin(breathingPhase) * 2;
    const eyeOffsetX = mousePos.x * 3;
    const eyeOffsetY = mousePos.y * 3;

    const outfitColors = {
      casual: { primary: '#6366f1', secondary: '#4f46e5', shadow: '#312e81' },
      formal: { primary: '#1e293b', secondary: '#0f172a', shadow: '#020617' },
      sporty: { primary: '#ef4444', secondary: '#dc2626', shadow: '#991b1b' },
      elegant: { primary: '#a855f7', secondary: '#9333ea', shadow: '#6b21a8' }
    };

    const getSkinShade = (baseColor, factor) => {
      const hex = baseColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgb(${Math.max(0, r - factor)}, ${Math.max(0, g - factor)}, ${Math.max(0, b - factor)})`;
    };

    // Easter egg: Spooky mode
    const isSpooky = easterEggsFound.includes('SPOOKY');

    const renderHair = () => {
      if (!showHead) return null;
      
      const hairStyles = {
        short: (
          <>
            <ellipse cx="85" cy="62" rx="38" ry="28" fill={isSpooky ? "#4A00E0" : hairColor} opacity="0.9" />
            <ellipse cx="85" cy="58" rx="36" ry="25" fill={isSpooky ? "#8A2BE2" : hairColor} />
            {isSpooky && <ellipse cx="85" cy="58" rx="36" ry="25" fill="url(#spookyPattern)" />}
          </>
        ),
        long: (
          <>
            <ellipse cx="85" cy="62" rx="38" ry="28" fill={hairColor} opacity="0.9" />
            <ellipse cx="85" cy="58" rx="36" ry="25" fill={hairColor} />
          </>
        ),
        curly: (
          <>
            <ellipse cx="85" cy="62" rx="40" ry="30" fill={hairColor} opacity="0.9" />
          </>
        ),
        bald: (
          <>
            <ellipse cx="85" cy="65" rx="33" ry="22" fill={skinTone} opacity="0.95" />
            <ellipse cx="85" cy="63" rx="32" ry="20" fill={getSkinShade(skinTone, 10)} />
          </>
        )
      };

      return hairStyles[hairStyle];
    };

    const renderFace = () => {
      if (!showHead) return null;

      const expressions = {
        happy: { mouth: 'M77,128 Q85,135 93,128', eyebrow1: 'M68,88 Q73,86 78,88', eyebrow2: 'M92,88 Q97,86 102,88' },
        neutral: { mouth: 'M77,128 L93,128', eyebrow1: 'M68,88 L78,88', eyebrow2: 'M92,88 L102,88' },
        smile: { mouth: 'M75,128 Q85,138 95,128', eyebrow1: 'M68,87 Q73,85 78,87', eyebrow2: 'M92,87 Q97,85 102,87' },
        cool: { mouth: 'M77,129 Q85,127 93,129', eyebrow1: 'M68,86 Q73,84 78,87', eyebrow2: 'M92,87 Q97,84 102,86' }
      };

      const expr = expressions[expression];

      return (
        <>
          <defs>
            <radialGradient id="faceGradient">
              <stop offset="0%" stopColor={skinTone} />
              <stop offset="70%" stopColor={skinTone} />
              <stop offset="100%" stopColor={getSkinShade(skinTone, 20)} />
            </radialGradient>
            <pattern id="spookyPattern" patternUnits="userSpaceOnUse" width="4" height="4">
              <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#00FF00" strokeWidth="0.5"/>
            </pattern>
          </defs>

          {isSpooky && <ellipse cx="85" cy="92" rx="34" ry="40" fill="#4A00E0" opacity="0.2" />}
          <ellipse cx="85" cy="92" rx="34" ry="40" fill="url(#faceGradient)" />
          
          {!isSpooky && (
            <>
              <ellipse cx="68" cy="102" rx="8" ry="6" fill="#ff8a9a" opacity="0.3" />
              <ellipse cx="102" cy="102" rx="8" ry="6" fill="#ff8a9a" opacity="0.3" />
            </>
          )}
          
          <path d={expr.eyebrow1} stroke={isSpooky ? "#00FF00" : hairColor} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d={expr.eyebrow2} stroke={isSpooky ? "#00FF00" : hairColor} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
          
          <ellipse cx="73" cy="98" rx="8" ry="9" fill={isSpooky ? "#000" : "white"} />
          <ellipse cx="97" cy="98" rx="8" ry="9" fill={isSpooky ? "#000" : "white"} />
          
          <circle cx={73 + eyeOffsetX} cy={98 + eyeOffsetY} r={isSpooky ? "7" : "5"} fill={isSpooky ? "#00FF00" : eyeColor}>
            {currentlyTyping && <animate attributeName="r" values="5;0.5;5" dur="0.2s" />}
          </circle>
          <circle cx={97 + eyeOffsetX} cy={98 + eyeOffsetY} r={isSpooky ? "7" : "5"} fill={isSpooky ? "#00FF00" : eyeColor}>
            {currentlyTyping && <animate attributeName="r" values="5;0.5;5" dur="0.2s" />}
          </circle>
          
          <path d={expr.mouth} stroke={isSpooky ? "#FF0000" : "#d97891"} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          
          {isSpooky && (
            <>
              <text x="85" y="60" fontSize="10" fill="#00FF00" textAnchor="middle">👻</text>
              <text x="85" y="140" fontSize="10" fill="#00FF00" textAnchor="middle">SPOOKY</text>
            </>
          )}
        </>
      );
    };

    const renderBody = () => {
      if (!showBody) return null;

      const outfit = outfitColors[formData.outfit];
      
      return (
        <>
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={outfit.primary} />
              <stop offset="50%" stopColor={outfit.secondary} />
              <stop offset="100%" stopColor={outfit.shadow} />
            </linearGradient>
          </defs>

          <rect 
            x={85 - bodyWidth/2} 
            y={145 + breathOffset * 0.5}
            width={bodyWidth} 
            height={bodyHeight + breathOffset}
            rx="12" 
            fill={isSpooky ? "#2D00AA" : "url(#bodyGradient)"}
          />

          {easterEggsFound.includes('CAKE') && (
            <text x="85" y="180" fontSize="14" fill="white" textAnchor="middle" opacity="0.8">🎂</text>
          )}
        </>
      );
    };

    const renderAccessories = () => {
      if (!showDetails) return null;

      if (gameMode) {
        return (
          <>
            <rect x="70" y="50" width="30" height="20" rx="5" fill="#8B4513" opacity="0.9" />
            <text x="85" y="65" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">GAME</text>
            <rect x="60" y="220" width="50" height="15" rx="3" fill="#FFD700" />
            <text x="85" y="232" fontSize="8" fill="#000" textAnchor="middle">LEVEL UP!</text>
          </>
        );
      }

      const accessories = {
        glasses: (
          <>
            <rect x="65" y="96" width="18" height="14" rx="4" fill="none" stroke="#475569" strokeWidth="2.5" />
            <rect x="87" y="96" width="18" height="14" rx="4" fill="none" stroke="#475569" strokeWidth="2.5" />
          </>
        ),
        hat: (
          <>
            <ellipse cx="85" cy="56" rx="42" ry="10" fill="#8B4513" opacity="0.9" />
          </>
        ),
        earrings: (
          <>
            <circle cx="55" cy="107" r="5" fill="#ffd700" />
            <circle cx="115" cy="107" r="5" fill="#ffd700" />
          </>
        ),
        none: null
      };

      return accessories[accessory];
    };

    return (
      <svg viewBox="0 0 170 280" className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}>
        <g style={{ opacity: avatarScale / 100, transition: 'opacity 0.5s' }}>
          {renderHair()}
          {renderFace()}
          {renderBody()}
          {renderAccessories()}
        </g>
      </svg>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gameMode ? 'from-purple-950 via-gray-900 to-black' : 'from-slate-950 via-slate-900 to-slate-950'} relative overflow-hidden p-8`}>
      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh) translateX(-50%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(50%); opacity: 0; }
        }
        .matrix-rain {
          position: absolute;
          color: #0F0;
          font-family: monospace;
          font-size: 14px;
          animation: matrix-fall linear infinite;
          text-shadow: 0 0 5px #0F0;
        }
      `}</style>

      {/* Matrix rain effect for game mode */}
      {gameMode && Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="matrix-rain"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.7 + Math.random() * 0.3
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </div>
      ))}

      {/* Easter Egg Notification */}
      {typingEffect && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-pulse">
          <div className="flex items-center gap-3">
            <Sparkles size={24} />
            <span className="font-black">{typingEffect}</span>
          </div>
        </div>
      )}

      {/* Konami Code Progress */}
      {konamiProgress > 0 && (
        <div className="fixed bottom-4 left-4 z-50 bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl">
          <div className="text-xs text-slate-400 mb-2">Code secret : {konamiProgress.toFixed(0)}%</div>
          <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${konamiProgress}%` }}
            />
          </div>
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-game-show-suspense-waiting-667.mp3" type="audio/mpeg" />
      </audio>

      <div className="absolute top-4 right-4 flex gap-2 z-50">
        <button
          onClick={toggleMusic}
          className={`p-3 rounded-full ${musicEnabled ? 'bg-green-500/20' : 'bg-slate-800/50'} backdrop-blur-sm border border-slate-700`}
        >
          {musicEnabled ? <Volume2 size={20} className="text-green-400" /> : <VolumeX size={20} className="text-slate-400" />}
        </button>
        <button
          onClick={() => setGameMode(!gameMode)}
          className="p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700"
        >
          <Settings size={20} className="text-slate-400" />
        </button>
      </div>

      {/* Easter Eggs Counter */}
      <div className="absolute top-4 left-4 z-50">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-2">Easter Eggs Trouvés</div>
          <div className="flex gap-2">
            {easterEggsFound.map((egg, index) => (
              <div key={index} className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Star size={16} className="text-white" />
              </div>
            ))}
            {easterEggsFound.length === 0 && (
              <div className="text-xs text-slate-500">Aucun egg trouvé... Cherchez bien !</div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 tracking-tight">
            {gameMode ? '🎮 MODE JEU ACTIVÉ 🎮' : 'Formulaire de Contact Ultime'}
          </h1>
          <p className="text-xl text-slate-400 flex items-center justify-center gap-3">
            <Sparkles className="text-violet-400 animate-pulse" size={24} />
            <span>
              {gameMode 
                ? 'Mission: Trouver tous les Easter Eggs!' 
                : 'Le message "Félicitations, vous avez gagné !" vous attend...'}
            </span>
            <Eye className="text-pink-400 animate-pulse" size={24} />
          </p>
        </div>

        {/* Secret Code Input (Hidden Easter Egg) */}
        <div className="mb-6 max-w-md mx-auto">
          <input
            type="password"
            value={formData.secretCode}
            onChange={(e) => updateField('secretCode', e.target.value)}
            placeholder="Code secret? (Essayez 1337)"
            className="w-full p-4 bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-xl text-center text-slate-500 placeholder-slate-600"
          />
        </div>

        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-slate-300">Progression de l'Avatar</span>
              <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">{avatarScale}%</span>
            </div>
            <div className="h-4 bg-slate-800/50 rounded-full overflow-hidden border-2 border-slate-700/50 relative">
              <div 
                className="progress-bar h-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 rounded-full relative overflow-hidden"
                style={{ width: `${avatarScale}%` }}
              />
            </div>
            <p className="text-center mt-4 text-sm font-semibold text-violet-300">
              {getProgressMessage()}
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-slate-700/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/40">
                <User className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">Vos Informations</h2>
                <p className="text-slate-400 text-sm">Formulaire de contact premium</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Nom Complet *</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Votre nom ici..."
                    className="w-full pl-12 pr-12 py-4 bg-slate-800/60 border-2 border-slate-700/50 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-12 pr-12 py-4 bg-slate-800/60 border-2 border-slate-700/50 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Sujet *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={20} />
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => updateField('topic', e.target.value)}
                    placeholder="Écrivez 'Félicitations, vous avez gagné !' pour un easter egg..."
                    className="w-full pl-12 pr-12 py-4 bg-slate-800/60 border-2 border-slate-700/50 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Message *</label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Décrivez votre projet, posez une question... ou cherchez des easter eggs ! (Essayez 'Halloween' ou 'anniversaire')"
                    rows="4"
                    className="w-full px-4 py-4 bg-slate-800/60 border-2 border-slate-700/50 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all duration-300 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Hidden message hint */}
              <div className="p-4 bg-gradient-to-r from-violet-900/30 to-pink-900/30 rounded-xl border border-violet-500/20">
                <p className="text-sm text-slate-400 text-center">
                  💡 <span className="text-violet-300">Astuce:</span> Utilisez les flèches directionnelles pour un code secret...
                </p>
              </div>

              <button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.topic || !formData.message}
                className={`w-full py-6 px-6 rounded-2xl font-black text-xl text-white transition-all transform flex items-center justify-center gap-3 mt-8 ${
                  formData.name && formData.email && formData.topic && formData.message
                    ? 'bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600 hover:scale-105 shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70'
                    : 'bg-slate-700 cursor-not-allowed opacity-50'
                }`}
              >
                <Send size={26} />
                {submitted ? '🎉 Message Envoyé ! 🎉' : 'Envoyer le Message Fatidique 🚀'}
              </button>

              {submitted && (
                <div className="p-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl text-white text-center font-black text-lg shadow-2xl shadow-green-500/60">
                  ✨ Votre message a été envoyé avec succès ! ✨
                  <div className="text-sm font-normal mt-2">
                    Attendez-vous à une réponse... peut-être pleine de surprises !
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-2 sticky top-8" ref={canvasRef}>
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-slate-700/50">
              <h2 className="text-3xl font-black text-white mb-6 text-center flex items-center justify-center gap-3">
                <Sparkles className="text-violet-400" />
                Votre Avatar Dynamique
                <Sparkles className="text-pink-400" />
              </h2>
              <div className="bg-gradient-to-br from-violet-900/40 via-pink-900/40 to-cyan-900/40 rounded-3xl p-12 flex items-center justify-center relative overflow-hidden border-2 border-slate-700/40">
                <div className="w-full max-w-md">
                  {renderRealisticAvatar()}
                </div>
              </div>
              <div className="mt-6 p-5 bg-gradient-to-r from-violet-600/40 to-pink-600/40 rounded-2xl backdrop-blur-sm border-2 border-violet-500/30">
                <p className="text-white text-center font-bold text-sm mb-2">
                  ✨ Fonctions Spéciales Activées ✨
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1">
                    <Eye size={12} /> Suivi des yeux
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={12} /> Animation respiratoire
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles size={12} /> Easter Eggs: {easterEggsFound.length}/5
                  </div>
                  <div className="flex items-center gap-1">
                    <Gamepad2 size={12} /> Mode jeu: {gameMode ? 'ON' : 'OFF'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Instructions */}
        <div className="mt-12 p-6 bg-gradient-to-r from-slate-900/50 to-slate-950/50 rounded-3xl border-2 border-slate-700/30">
          <h3 className="text-2xl font-black text-white mb-4 text-center">🎯 Défi de la Page de Contact Ultime</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-violet-300">Contraintes (Base)</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">✅ Formulaire 100% fonctionnel</li>
                <li className="flex items-center gap-2">✅ Champs requis: Nom, Email, Sujet, Message</li>
                <li className="flex items-center gap-2">✅ Popup de confirmation originale</li>
                <li className="flex items-center gap-2">✅ Stack technique: React + Tailwind CSS</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-pink-300">Touche Fun (Bonus)</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">🎮 Code Konami: ↑↑↓↓←→←→BA</li>
                <li className="flex items-center gap-2">🔑 Code secret: 1337</li>
                <li className="flex items-center gap-2">👻 Mot magique: "Halloween"</li>
                <li className="flex items-center gap-2">🎂 Mot magique: "anniversaire"</li>
                <li className="flex items-center gap-2">🏆 Mot magique: "Félicitations, vous avez gagné !"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WinModal />
    </div>
  );
}
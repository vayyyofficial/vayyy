import React, { useEffect, useState } from 'react';
import { X, Trophy, Calendar as CalendarIcon, Gift, ImageOff } from 'lucide-react';
import {
  type Language,
  type AchievementItem,
  PERSONAL_PROFILE,
  I18N_CONTENT,
  CLOUD_BLUEPRINTS
} from './data';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface AchievementModalProps extends ModalProps {
  achievement: AchievementItem | null;
}

/**
 * Base Modal Backdrop & Container Wrapper
 */
export const ModalWrapper: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  className?: string;
  windowClassName?: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, id, className = '', windowClassName = '', children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay open ${className}`}
      id={id}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`modal-window ${windowClassName}`}>
        <div className="modal-header-bar">
          <button
            className="modal-close-btn"
            onClick={onClose}
            title="Close Window"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body-content">{children}</div>
      </div>
    </div>
  );
};

/**
 * 1. Avatar Modal
 */
export const AvatarModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose} id="avatar-modal">
    <img
      src="assets/avatar.png"
      alt="Vayyy Large View"
      className="modal-avatar-preview"
    />
    <div className="modal-avatar-name">{PERSONAL_PROFILE.name}</div>
  </ModalWrapper>
);

/**
 * 2. Real-time Clock & Calendar Modal
 */
export const ClockModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const [time, setTime] = useState<{
    day: string;
    date: string;
    hour: string;
    min: string;
    sec: string;
  }>({
    day: '',
    date: '',
    hour: '00',
    min: '00',
    sec: '00'
  });

  useEffect(() => {
    if (!isOpen) return;

    const updateTime = () => {
      const now = new Date();
      const tzOptions: Intl.DateTimeFormatOptions = { timeZone: PERSONAL_PROFILE.timezone };
      const locale = lang === 'id' ? 'id-ID' : 'en-US';

      const parts = new Intl.DateTimeFormat('en-US', {
        ...tzOptions,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).formatToParts(now);

      const partMap: Record<string, string> = {};
      parts.forEach((p) => {
        partMap[p.type] = p.value;
      });

      setTime({
        day: now.toLocaleDateString(locale, { ...tzOptions, weekday: 'long' }),
        date: now.toLocaleDateString(locale, {
          ...tzOptions,
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        hour: (partMap.hour || '00').padStart(2, '0'),
        min: (partMap.minute || '00').padStart(2, '0'),
        sec: (partMap.second || '00').padStart(2, '0')
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isOpen, lang]);

  const t = I18N_CONTENT[lang];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} id="clock-modal">
      <div className="modal-main-title">{t.clockModalTitle}</div>
      <div className="calendar-container">
        <div className="calendar-day-text">{time.day}</div>
        <div className="calendar-date-text">{time.date}</div>
        <div className="live-clock-grid">
          <div className="clock-card-unit">
            <div className="clock-digit-display">{time.hour}</div>
            <div className="clock-label-unit">{t.units.hour}</div>
          </div>
          <div className="clock-card-unit">
            <div className="clock-digit-display">{time.min}</div>
            <div className="clock-label-unit">{t.units.min}</div>
          </div>
          <div className="clock-card-unit">
            <div className="clock-digit-display" id="live-modal-sec">
              {time.sec}
            </div>
            <div className="clock-label-unit">{t.units.sec}</div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

/**
 * 3. Birthday Countdown Modal
 */
export const CountdownModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const [countdown, setCountdown] = useState<{
    days: string;
    hours: string;
    mins: string;
    secs: string;
    isBirthday: boolean;
    currentAge: number;
  }>({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00',
    isBirthday: false,
    currentAge: 15
  });

  useEffect(() => {
    if (!isOpen) return;

    const calcCountdown = () => {
      const birth = PERSONAL_PROFILE.birthDate;
      const now = new Date();

      let age = now.getFullYear() - birth.getFullYear();
      if (
        now.getMonth() < birth.getMonth() ||
        (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
      ) {
        age--;
      }

      let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
      const isToday = now.getMonth() === birth.getMonth() && now.getDate() === birth.getDate();

      if (now > nextBday && !isToday) {
        nextBday.setFullYear(now.getFullYear() + 1);
      }

      const diff = Math.max(0, nextBday.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0'),
        isBirthday: isToday,
        currentAge: age
      });
    };

    calcCountdown();
    const interval = setInterval(calcCountdown, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const t = I18N_CONTENT[lang];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} id="age-modal">
      <div className="modal-main-title">
        {countdown.isBirthday ? "🎂 IT'S YOUR BIRTHDAY! 🎂" : t.countdownModalTitle}
      </div>
      <div className="countdown-box-wrapper">
        <div className="countdown-unit-card">
          <div className="countdown-value-num">{countdown.days}</div>
          <div className="countdown-label-text">{t.units.days}</div>
        </div>
        <div className="countdown-unit-card">
          <div className="countdown-value-num">{countdown.hours}</div>
          <div className="countdown-label-text">{t.units.hours}</div>
        </div>
        <div className="countdown-unit-card">
          <div className="countdown-value-num">{countdown.mins}</div>
          <div className="countdown-label-text">{t.units.mins}</div>
        </div>
        <div className="countdown-unit-card">
          <div className="countdown-value-num">{countdown.secs}</div>
          <div className="countdown-label-text">{t.units.secs}</div>
        </div>
      </div>
      <div className="birthday-wishes-text" id="birthday-wish-display">
        {countdown.isBirthday
          ? t.birthdayWish(countdown.currentAge, PERSONAL_PROFILE.fullName)
          : t.journeyTo(countdown.currentAge + 1)}
      </div>
    </ModalWrapper>
  );
};

/**
 * 4. Cloud Engineer Blueprint Modal
 */
export const BlueprintModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const t = I18N_CONTENT[lang];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} id="dream-modal">
      <div className="modal-main-title">{t.cloudBlueprintTitle}</div>
      <p className="cloud-modal-intro">{t.cloudBlueprintIntro}</p>
      <div className="cloud-photo-grid">
        {CLOUD_BLUEPRINTS.map((item) => (
          <div key={item.id} className="cloud-photo-item">
            <img src={item.image} alt={item.caption} width={200} height={100} />
            <div className="cloud-img-caption">{item.caption}</div>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

/**
 * 5. Achievement Detail Modal
 */
export const AchievementModal: React.FC<AchievementModalProps> = ({
  isOpen,
  onClose,
  lang,
  achievement
}) => {
  const t = I18N_CONTENT[lang];
  if (!achievement) return null;

  const title = lang === 'id' ? achievement.titleId : achievement.titleEn;
  const event = lang === 'id' ? achievement.eventId : achievement.eventEn;
  const date = lang === 'id' ? achievement.dateId : achievement.dateEn;
  const prize = lang === 'id' ? achievement.prizeId : achievement.prizeEn;
  const desc = lang === 'id' ? achievement.descId : achievement.descEn;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      id="achievement-modal"
      windowClassName="achievement-modal-window"
    >
      <div className="achievement-modal-photo-box">
        <ImageOff size={34} />
        <span>{t.certificatePlaceholder}</span>
      </div>
      <span className="achievement-coming-badge">{t.comingSoon}</span>
      <div className="modal-main-title">{title}</div>
      <div className="achievement-modal-meta">
        <div className="achievement-modal-meta-row">
          <Trophy size={16} />
          <span>{event}</span>
        </div>
        <div className="achievement-modal-meta-row">
          <CalendarIcon size={16} />
          <span>{date}</span>
        </div>
        <div className="achievement-modal-meta-row">
          <Gift size={16} />
          <span>{prize}</span>
        </div>
      </div>
      <div className="modal-sub-quote">{desc}</div>
    </ModalWrapper>
  );
};

/**
 * 6. Tagline / Quote Reflection Modal
 */
export const QuoteModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const t = I18N_CONTENT[lang];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} id="quote-modal">
      <div className="modal-main-title">{t.quoteModalTitle}</div>
      <div className="modal-sub-quote">{t.quoteModalSub}</div>
    </ModalWrapper>
  );
};

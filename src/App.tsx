import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingCart,
  Languages,
  User,
  Hourglass,
  Cake,
  Target,
  MapPin,
  Award
} from 'lucide-react';
import {
  type Language,
  type AchievementItem,
  PERSONAL_PROFILE,
  I18N_CONTENT,
  SKILLS_DATA,
  ACHIEVEMENTS_DATA,
  PROJECTS_DATA,
  SOCIAL_LINKS
} from './data';
import {
  AvatarModal,
  ClockModal,
  CountdownModal,
  BlueprintModal,
  AchievementModal,
  QuoteModal
} from './Modals';
import { LoadingScreen, ParticlesBackground, TypewriterText } from './Effects';
import { renderSocialIcon } from './SocialIcons';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('vayyy_portfolio_lang');
    return saved === 'id' || saved === 'en' ? saved : 'en';
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLoadingComplete = React.useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Modal states
  const [activeModal, setActiveModal] = useState<
    'avatar' | 'clock' | 'countdown' | 'blueprint' | 'achievement' | 'quote' | null
  >(null);
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  // Dynamic live clock for footer & greeting
  const [wibTime, setWibTime] = useState('00:00 WIB');
  const [greeting, setGreeting] = useState({ id: 'Selamat Malam! 🌙', en: 'Good Night! 🌙' });

  // Language toggle handler
  const handleToggleLanguage = () => {
    const nextLang = lang === 'en' ? 'id' : 'en';
    setLang(nextLang);
    try {
      localStorage.setItem('vayyy_portfolio_lang', nextLang);
    } catch {
      // Ignore in restricted environments
    }
  };

  // Age calculation
  const currentAge = useMemo(() => {
    const birth = PERSONAL_PROFILE.birthDate;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (
      now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }, []);

  // Scroll listener for floating navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live WIB clock & greeting updater
  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: PERSONAL_PROFILE.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now);
      setWibTime(`${timeStr} WIB`);

      const hours = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: PERSONAL_PROFILE.timezone,
          hour: '2-digit',
          hour12: false
        }).format(now),
        10
      );

      let idText = 'Selamat Malam! 🌙';
      let enText = 'Good Night! 🌙';

      if (hours >= 5 && hours < 11) {
        idText = 'Selamat Pagi! 🌅';
        enText = 'Good Morning! 🌅';
      } else if (hours >= 11 && hours < 15) {
        idText = 'Selamat Siang! ☀️';
        enText = 'Good Afternoon! ☀️';
      } else if (hours >= 15 && hours < 18) {
        idText = 'Selamat Sore! 🌇';
        enText = 'Good Evening! 🌇';
      }

      setGreeting({ id: idText, en: enText });
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cursor glow effect handler on cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    card.classList.add('glow-active');
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('glow-active');
  };

  // Smooth scroll handler for navbar links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      const navbarOffset = 90;
      const elementTop = targetEl.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo({ top: elementTop, behavior: 'smooth' });
    }
  };

  const t = I18N_CONTENT[lang];
  const activeGreeting = lang === 'id' ? greeting.id : greeting.en;

  return (
    <>
      {/* 1. Loading Screen */}
      {!isLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 2. Particles Background */}
      <ParticlesBackground />

      {/* 3. Fixed Top Navbar */}
      <nav
        className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}
        id="site-navbar"
        aria-label="Main Navigation"
      >
        <div className="navbar-inner">
          <a href="#" className="navbar-brand">
            Vayyy<span>.Dev</span>
          </a>
          <div className="navbar-links">
            <a
              href="#about"
              className="navbar-link"
              onClick={(e) => handleNavClick(e, '#about')}
            >
              {t.nav.about}
            </a>
            <a
              href="#skills"
              className="navbar-link"
              onClick={(e) => handleNavClick(e, '#skills')}
            >
              {t.nav.skills}
            </a>
            <a
              href="#projects"
              className="navbar-link"
              onClick={(e) => handleNavClick(e, '#projects')}
            >
              {t.nav.project}
            </a>
          </div>
          <a
            href={PERSONAL_PROFILE.storeUrl}
            className="store-btn-nav anim-hover"
            title="Visit Store Vayyy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShoppingCart size={15} />
            <span>{t.nav.store}</span>
          </a>
        </div>
      </nav>

      {/* 4. Main Page Content */}
      <main
        className="container page-content"
        id="page-content"
        style={{
          visibility: isLoaded ? 'visible' : 'hidden',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease'
        }}
      >
        {/* Header Section */}
        <header className="header-section" id="about">
          <div className="avatar-wrapper">
            <div
              className="avatar-box anim-hover glow-card"
              data-glow="white"
              id="avatar-toggle-btn"
              role="button"
              tabIndex={0}
              title="Click to view large profile image"
              aria-label="View large profile avatar"
              onClick={() => setActiveModal('avatar')}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <img
                src="assets/avatar.png"
                alt="Vayyy Profile Avatar"
                className="modal-avatar-preview"
              />
            </div>
            <div
              className="greeting-box"
              id="auto-greeting"
              role="button"
              tabIndex={0}
              title="Click to see live calendar"
              aria-label="Open live real-time clock and calendar"
              onClick={() => setActiveModal('clock')}
            >
              {activeGreeting}
            </div>
          </div>

          <div className="info-box">
            <div className="name-wrapper">
              <div
                className="card-text card-header-compact anim-hover glow-card"
                data-glow="yellow"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="name">{PERSONAL_PROFILE.name}</div>
              </div>
              <button
                id="translate-btn"
                className="translate-btn anim-hover"
                title="Translate Page"
                aria-label="Toggle language between English and Indonesian"
                onClick={handleToggleLanguage}
              >
                <Languages size={15} />
                <span>{lang === 'en' ? 'ID' : 'EN'}</span>
              </button>
            </div>

            <div
              className="card-text card-header-compact anim-hover tagline-box glow-card"
              data-glow="yellow"
              id="tagline-toggle-btn"
              role="button"
              tabIndex={0}
              title="Click to see reflection"
              aria-label="View personal quote reflection"
              onClick={() => setActiveModal('quote')}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="tagline" id="tagline-text">
                <TypewriterText text={t.tagline} speed={55} cursorId="tagline-cursor" />
              </div>
            </div>

            <div
              className="bio-expand-card glow-card"
              data-glow="white"
              id="bio-toggle-btn"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="bio-visible-row">
                <div className="bio" id="bio-text">
                  <TypewriterText text={t.bio} speed={8} cursorId="bio-cursor" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Section */}
        <section aria-labelledby="profile-heading">
          <div className="profile-header-wrapper">
            <h2 className="section-title" id="profile-heading">
              {t.profile.heading}
            </h2>
          </div>
          <div className="profile-grid">
            <div
              className="profile-item anim-hover glow-card"
              data-glow="white"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="profile-label">
                <User size={16} /> {t.profile.nameLabel}
              </div>
              <div className="profile-value">{PERSONAL_PROFILE.fullName}</div>
            </div>

            <div
              className="profile-item anim-hover glow-card"
              data-glow="red"
              id="age-toggle-btn"
              role="button"
              tabIndex={0}
              title="Click to see birthday countdown!"
              aria-label="Open birthday countdown modal"
              onClick={() => setActiveModal('countdown')}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="profile-label" id="age-label-main">
                <Hourglass size={16} /> {t.profile.ageLabel}
              </div>
              <div className="profile-value" id="age-value-main">
                {currentAge} {t.profile.yearsOld}
              </div>
            </div>

            <div
              className="profile-item anim-hover glow-card"
              data-glow="white"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="profile-label">
                <Cake size={16} /> {t.profile.birthdayLabel}
              </div>
              <div className="profile-value" id="birthday-value-main">
                {t.profile.birthdayValue}
              </div>
            </div>

            <div
              className="profile-item anim-hover glow-card"
              data-glow="green"
              id="dream-toggle-btn"
              role="button"
              tabIndex={0}
              title="Click to view DevOps Engineer Overview!"
              aria-label="Open DevOps & Cloud Engineer Overview"
              onClick={() => setActiveModal('blueprint')}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="profile-label">
                <Target size={16} /> {t.profile.dreamLabel}
              </div>
              <div className="profile-value">{t.profile.dreamValue}</div>
            </div>

            <div
              className="profile-item home-address-item anim-hover glow-card"
              data-glow="white"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="profile-label">
                <MapPin size={16} /> {t.profile.addressLabel}
              </div>
              <div
                className="profile-value"
                dangerouslySetInnerHTML={{ __html: t.profile.addressValue }}
              />
            </div>
          </div>
        </section>

        {/* Skills & Interests Section */}
        <section aria-labelledby="skills">
          <h2 className="section-title" id="skills">
            {t.skillsHeading}
          </h2>
          <div className="skills-grid">
            {SKILLS_DATA.map((skill) => (
              <div
                key={skill.id}
                className="skill-card anim-hover glow-card"
                data-glow={
                  skill.categoryClass === 'software'
                    ? 'yellow'
                    : skill.categoryClass === 'networking'
                      ? 'green'
                      : 'red'
                }
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className={`card-header ${skill.categoryClass}`}>
                  {skill.title}
                  {skill.badge && <span className="skill-badge learning">{skill.badge}</span>}
                </div>
                <div className="skill-progress-label">
                  <span>Proficiency</span>
                  <span className="skill-percent">{skill.proficiency}%</span>
                </div>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{
                      width: `${skill.proficiency}%`,
                      ...(skill.gradient ? { background: skill.gradient } : {})
                    }}
                  />
                </div>
                <ul className="skill-list">
                  {skill.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section aria-labelledby="achievement">
          <h2 className="section-title" id="achievement">
            {t.achievementHeading}
          </h2>
          <div className="achievement-grid">
            {ACHIEVEMENTS_DATA.map((ach) => (
              <div
                key={ach.num}
                className="achievement-card anim-hover glow-card achievement-trigger"
                data-glow="white"
                role="button"
                tabIndex={0}
                title="Click to view achievement detail"
                aria-label={`View achievement detail slot ${ach.num}`}
                onClick={() => {
                  setSelectedAchievement(ach);
                  setActiveModal('achievement');
                }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="achievement-icon">
                  <Award size={18} />
                </div>
                <div className="achievement-title">
                  {lang === 'id' ? ach.titleId : ach.titleEn}
                </div>
                <div className="achievement-desc">
                  {lang === 'id' ? `Slot Achievement #${ach.num}` : `Achievement Slot #${ach.num}`}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section aria-labelledby="projects">
          <h2 className="section-title" id="projects">
            {t.projectsHeading}
          </h2>
          <div className="projects-container">
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.id}
                className="project-item-block anim-hover glow-card"
                data-glow="yellow"
                role="button"
                tabIndex={0}
                title={`Open ${proj.title} Website`}
                aria-label={`Open ${proj.title} Website`}
                onClick={() => window.open(proj.url, '_blank', 'noopener,noreferrer')}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="project-header-row">
                  <div className="project-title-text">{proj.title}</div>
                  <div className="project-timeline">{proj.timeline}</div>
                </div>
                <div
                  className="project-description"
                  dangerouslySetInnerHTML={{
                    __html: lang === 'id' ? proj.descriptionId : proj.descriptionEn
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="web-footer">
          <div className="divider-line" />
          <nav aria-label="Social media links" className="social-container">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="social-circle"
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                aria-label={`Visit my ${link.name} profile`}
              >
                {renderSocialIcon(link.icon || link.name, { className: 'social-svg-icon' })}
              </a>
            ))}
          </nav>

          <div id="digital-clock" aria-label="Current time in Western Indonesia Time">{wibTime}</div>

          <div className="footer-address">
            <MapPin size={15} className="footer-pin-icon" aria-hidden="true" />
            <span>{PERSONAL_PROFILE.location}</span>
          </div>

          <div className="footer-copyright">
            2026 &copy; Copyright Vayyy. All Rights Reserved.
          </div>
        </footer>
      </main>

      {/* 5. Modals */}
      <AvatarModal
        isOpen={activeModal === 'avatar'}
        onClose={() => setActiveModal(null)}
        lang={lang}
      />

      <ClockModal
        isOpen={activeModal === 'clock'}
        onClose={() => setActiveModal(null)}
        lang={lang}
      />

      <CountdownModal
        isOpen={activeModal === 'countdown'}
        onClose={() => setActiveModal(null)}
        lang={lang}
      />

      <BlueprintModal
        isOpen={activeModal === 'blueprint'}
        onClose={() => setActiveModal(null)}
        lang={lang}
      />

      <AchievementModal
        isOpen={activeModal === 'achievement'}
        onClose={() => setActiveModal(null)}
        lang={lang}
        achievement={selectedAchievement}
      />

      <QuoteModal
        isOpen={activeModal === 'quote'}
        onClose={() => setActiveModal(null)}
        lang={lang}
      />
    </>
  );
};
export default App;

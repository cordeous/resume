const Logo = ({ size = 'default', variant = 'dark', showText = true }) => {
  const sizes = {
    small: { icon: 20, text: 16, gap: 6 },
    default: { icon: 28, text: 24, gap: 8 },
    large: { icon: 36, text: 32, gap: 10 },
  };

  const s = sizes[size] || sizes.default;

  const colors = {
    dark: { text: 'var(--text-primary)', accent: 'var(--accent-primary)' },
    light: { text: '#FFFFFF', accent: '#FFFFFF' },
    accent: { text: 'var(--accent-primary)', accent: 'var(--accent-primary)' },
  };

  const c = colors[variant] || colors.dark;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap, textDecoration: 'none' }}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Document body */}
        <rect x="4" y="2" width="24" height="28" rx="3" fill={c.accent} opacity="0.15" />
        <rect x="4" y="2" width="24" height="28" rx="3" stroke={c.accent} strokeWidth="2" />
        {/* Folded corner */}
        <path d="M20 2V8C20 9.10457 20.8954 10 22 10H28" stroke={c.accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M20 2L28 10" stroke={c.accent} strokeWidth="2" strokeLinecap="round" />
        {/* Text lines */}
        <rect x="9" y="14" width="14" height="2" rx="1" fill={c.accent} />
        <rect x="9" y="19" width="10" height="2" rx="1" fill={c.accent} opacity="0.6" />
        <rect x="9" y="24" width="12" height="2" rx="1" fill={c.accent} opacity="0.4" />
      </svg>
      {showText && (
        <span
          style={{
            fontSize: s.text,
            fontWeight: 600,
            color: c.text,
            letterSpacing: '-0.3px',
            lineHeight: 1,
          }}
        >
          ResumeBuilder
        </span>
      )}
    </div>
  );
};

export default Logo;

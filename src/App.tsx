import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronDown,
  ExternalLink,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

const portrait = '/images/SONAM_PASSPORT.jpeg';
const womaniyaInstagramImage = '/images/womaniya-instagram.png';
const reelItProjectImage = '/images/reelit-project-replacement.png';
const womaniyaProjectImage = '/images/womaniya-project.jpg';
const contentMoodboardImage = '/images/content-moodboard.jpg';
const campaignPlaygroundImage = '/images/campaign-playground.png';

const navItems = ['About', 'Work', 'Journey', 'Skills', 'Contact'];
const projectFilters = ['All work', 'Marketing', 'Branding', 'Content'];
const skills = [
  { title: 'Digital marketing', color: 'blue', items: ['Social media management', 'Meta Ads fundamentals', 'Campaign planning', 'Audience research', 'Performance metrics'] },
  { title: 'Content & creative', color: 'pink', items: ['Content strategy', 'Storytelling', 'Reel ideation', 'Copywriting', 'Canva design'] },
  { title: 'Creator energy', color: 'yellow', items: ['Instagram content', 'Fashion & beauty', 'Lifestyle storytelling', 'Creator-led shoots', 'Audience engagement'] },
  { title: 'Tools & tech', color: 'red', items: ['Canva', 'Meta Ads Manager', 'AI content tools', 'AI avatar/video tools', 'Digital platforms'] },
];
const projects = [
  { title: 'reeliT.in', category: 'Marketing', description: 'A freelance venture exploring practical, people-first digital marketing.', role: 'Founder / strategist', image: reelItProjectImage, className: 'project-large' },
  { title: 'Womaniya', category: 'Branding', description: 'A personal creative corner for fashion, beauty, lifestyle and visual stories.', role: 'Creator / visual direction', image: womaniyaProjectImage, className: 'project-tall' },
  { title: 'Content moodboard', category: 'Content', description: 'A collection of content directions, reel prompts and social-first ideas.', role: 'Creative concept', image: contentMoodboardImage, className: 'project-small' },
  { title: 'Campaign playground', category: 'Marketing', description: 'Editable concept space for future campaigns and practical assignments.', role: 'Concept / copy / design', image: campaignPlaygroundImage, className: 'project-small' },
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function IntroDoodle() {
  return (
    <svg className="intro-doodle" viewBox="0 0 520 340" aria-hidden="true">
      <path className="intro-twinkle" d="m31 238 7 11 12 6-12 6-7 12-6-12-12-6 12-6 6-11Z" />
      <path className="intro-twinkle" d="m481 238 5 8 9 5-9 4-5 9-4-9-9-4 9-5 4-8Z" />
      <circle className="intro-dot" cx="260" cy="33" r="4" />
      <g className="intro-eyes">
        <path className="intro-lash" d="M91 117C63 110 46 97 36 78m42 61c-27 0-47-10-61-27" />
        <path className="intro-eye-shape" d="M70 163c0-48 31-80 77-80 49 0 80 32 80 80 0 45-33 75-80 75-45 0-77-30-77-75Z" />
        <g className="intro-right-eye-open">
          <path className="intro-lash" d="M429 117c28-7 45-20 55-39m-42 61c27 0 47-10 61-27" />
          <path className="intro-eye-shape" d="M450 163c0-48-31-80-77-80-49 0-80 32-80 80 0 45 33 75 80 75 45 0 77-30 77-75Z" />
        </g>
        <g className="intro-right-eye-wink">
          <path className="intro-wink" d="M291 168c35-34 91-35 128 0" />
          <path className="intro-wink-lashes" d="M414 163c22-1 35-10 45-25m-37 34c20 0 34-7 45-20" />
        </g>
        <g className="intro-pupils">
          <ellipse className="intro-glint" cx="164" cy="132" rx="20" ry="23" />
          <ellipse className="intro-glint" cx="111" cy="191" rx="11" ry="14" />
          <g className="intro-right-eye-open">
            <ellipse className="intro-glint" cx="356" cy="132" rx="20" ry="23" />
            <ellipse className="intro-glint" cx="409" cy="191" rx="11" ry="14" />
          </g>
        </g>
      </g>
      <g className="intro-smile">
        <ellipse className="intro-cheek" cx="106" cy="283" rx="25" ry="12" />
        <ellipse className="intro-cheek" cx="414" cy="283" rx="25" ry="12" />
        <path className="intro-smile-mouth" d="M215 274c24 32 66 40 90 0" />
      </g>
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All work');
  const [submitted, setSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (!showIntro) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

    const stackPages = Array.from(document.querySelectorAll<HTMLElement>('.stack-page'));
    let frame = 0;
    const updateStack = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight;
        const stackTop = Math.max(12, Math.min(22, viewportHeight * 0.02));
        const smoothStep = (value: number) => value * value * (3 - 2 * value);
        const panelHeight = Math.max(1, viewportHeight - stackTop * 2);
        const measurements = stackPages.map((page, index) => {
          const content = page.querySelector<HTMLElement>('.stack-content');
          const naturalHeight = content?.scrollHeight ?? panelHeight;
          const flowHeight = Math.max(panelHeight, naturalHeight);
          const overflow = flowHeight - panelHeight;
          return { page, index, flowHeight, overflow };
        });

        const main = document.querySelector<HTMLElement>('main');
        const startPositions = new Map<HTMLElement, number>();
        let flowPosition = (main?.getBoundingClientRect().top ?? 0) + window.scrollY;
        if (main) {
          const flowHeights = new Map(measurements.map(({ page, flowHeight }) => [page, flowHeight]));
          Array.from(main.children).forEach((child) => {
            const element = child as HTMLElement;
            const style = window.getComputedStyle(element);
            if (style.position === 'absolute' || style.position === 'fixed') return;

            flowPosition += Number.parseFloat(style.marginTop) || 0;
            const flowHeight = flowHeights.get(element);
            if (flowHeight !== undefined) {
              startPositions.set(element, flowPosition);
              flowPosition += flowHeight;
            } else {
              flowPosition += element.offsetHeight + (Number.parseFloat(style.marginBottom) || 0);
            }
          });
        }

        measurements.forEach(({ page, index, overflow }) => {
          const startY = startPositions.get(page) ?? page.getBoundingClientRect().top + window.scrollY;
          const top = startY - window.scrollY;
          const nextPage = stackPages[index + 1];
          const nextTop = nextPage
            ? (startPositions.get(nextPage) ?? nextPage.getBoundingClientRect().top + window.scrollY) - window.scrollY
            : viewportHeight;
          const entryProgress = smoothStep(Math.max(0, Math.min(1, (stackTop + 120 - top) / 120)));
          const scrollProgress = overflow > 0
            ? Math.max(0, Math.min(1, (window.scrollY - startY + stackTop) / overflow))
            : 1;
          const coverProgress = smoothStep(Math.max(0, Math.min(1, (viewportHeight - nextTop) / (viewportHeight - stackTop))));

          page.style.height = `${panelHeight}px`;
          page.style.minHeight = '0px';
          page.style.setProperty('--stack-flow-extra', `${overflow}px`);
          page.style.setProperty('--stack-index', String(index + 1));
          page.style.setProperty('--stack-entry', String(entryProgress));
          page.style.setProperty('--stack-scroll', `${overflow * scrollProgress}px`);
          page.style.setProperty('--stack-cover', String(coverProgress));
        });
      });
    };

    window.addEventListener('scroll', updateStack, { passive: true });
    window.addEventListener('resize', updateStack, { passive: true });
    updateStack();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateStack);
      window.removeEventListener('resize', updateStack);
    };
  }, [filter]);

  const visibleProjects = filter === 'All work' ? projects : projects.filter((project) => project.category === filter);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(form.get('subject') ?? 'Hello Sonam'));
    const body = encodeURIComponent(`Hi Sonam,\n\n${String(form.get('message') ?? '')}\n\nFrom: ${String(form.get('name') ?? '')} (${String(form.get('email') ?? '')})`);
    window.location.href = `mailto:heysonam03@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main>
      {showIntro && (
        <div
          className="intro-splash"
          aria-hidden="true"
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setShowIntro(false);
          }}
        >
          <div className="intro-face">
            <IntroDoodle />
          </div>
        </div>
      )}
      <nav className="nav-shell" aria-label="Main navigation">
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a className="nav-home" href="#top" onClick={() => setMenuOpen(false)}>Home</a>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </div>
        <a className="wordmark" href="#top" aria-label="Sonam home">sonam<span>.</span></a>
        <div className="nav-tools">
          <a className="nav-icon-link" href="https://instagram.com/womaniya.irl_" target="_blank" rel="noreferrer" aria-label="Visit Womaniya on Instagram"><Instagram size={15} /></a>
          <a className="nav-icon-link" href="mailto:heysonam03@gmail.com" aria-label="Email Sonam"><Mail size={15} /></a>
          <a className="nav-cta" href="mailto:heysonam03@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero paper-grid stack-page" id="top">
        <div className="stack-content">
        <div className="hero-scribble">hello<br />there<span>✳</span></div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> creative strategist <span className="slash">/</span> digital marketer</p>
          <h1>Hi, I&apos;m<br className="hero-name-break" /> <em>Sonam</em>.<br />Creative minds, <em>strategic</em> thinking.<br /><span>Stories that connect.</span></h1>
          <p className="hero-intro">Exploring the intersection of creative strategy, digital marketing and content creation — one idea at a time.</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={18} /></a><a className="text-link" href="#contact">Let&apos;s connect <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="hero-visual">
          <div className="hero-burst"><span>creative</span><span>curious</span><span>always learning</span></div>
          <div className="portrait-frame"><img src={portrait} alt="Sonam in a black blazer" /></div>
          <div className="sticker sticker-star"><Star size={20} fill="currentColor" /></div>
          <div className="sticker sticker-note">based in<br /><strong>Patna, IN</strong></div>
          <div className="sticker sticker-arrow"><ArrowDownRight size={34} /></div>
        </div>
        <div className="hero-bottom"><span>scroll to explore</span><div className="scroll-line" /><span>01 — 10</span></div>
        </div>
      </section>

      <div className="marquee"><div>STRATEGY <span>✦</span> STORYTELLING <span>✦</span> CONTENT <span>✦</span> COMMUNITY <span>✦</span> </div><div>STRATEGY <span>✦</span> STORYTELLING <span>✦</span> CONTENT <span>✦</span> COMMUNITY <span>✦</span> </div></div>

      <section className="about section-yellow stack-page" id="about">
        <div className="stack-content">
        <div className="section-number">02 / about me</div>
        <div className="about-layout">
          <Reveal className="about-heading"><span className="hand-label">a little introduction</span><h2>Okay, but<br /><em>who&apos;s</em> Sonam?</h2><div className="scribble-underline" /></Reveal>
          <Reveal className="about-photo"><img src={portrait} alt="Sonam smiling in a black blazer" /><span className="photo-caption">just figuring it out<br />& making it pretty</span></Reveal>
          <Reveal className="about-copy"><p className="large-copy">I&apos;m a curious creative from Patna who loves turning <strong>big ideas into things people want to look at, feel and remember.</strong></p><p>Currently studying BSc Zoology while building a path in creative strategy, digital marketing and content creation. I&apos;m interested in the little details — a good hook, a thoughtful visual, a story that stays.</p><p>When I&apos;m not planning content, you&apos;ll find me exploring fashion, beauty, lifestyle and all the ways a personal brand can feel more human.</p><a className="text-link dark-link" href="#journey">My story so far <ArrowUpRight size={16} /></a></Reveal>
        </div>
        <div className="fun-facts"><span>✳ currently: learning in public</span><span>♡ loves: visuals & good conversations</span><span>→ based: Patna, Bihar, India</span></div>
        </div>
      </section>

      <section className="doing section-ivory stack-page" id="skills">
        <div className="stack-content">
        <div className="section-number">03 / what I do</div>
        <Reveal className="section-intro"><p className="eyebrow">the two sides of the story</p><h2>A little bit of <em>strategy,</em><br />a little bit of creativity.</h2></Reveal>
        <div className="service-grid">
          <Reveal className="service-card service-blue"><div className="card-top"><span>01</span><Sparkles size={22} /></div><h3>Creative strategy<br /><em>& digital marketing</em></h3><p>Making the message clear, the content intentional and the next step feel easy.</p><div className="pill-list">{['Social media strategy', 'Content planning', 'Brand positioning', 'Meta Ads fundamentals', 'Audience targeting', 'Campaign planning', 'Canva creative design', 'AI-powered solutions'].map((item) => <span key={item}>{item}</span>)}</div></Reveal>
          <Reveal className="service-card service-pink"><div className="card-top"><span>02</span><Asterisk size={25} /></div><h3>Content creation<br /><em>& personal branding</em></h3><p>Building visual worlds and scroll-stopping stories that sound like a real person.</p><div className="pill-list">{['Content creation', 'Creative direction', 'Visual storytelling', 'Reel concepts', 'Copywriting', 'Personal branding', 'Fashion & lifestyle', 'Creator-led content'].map((item) => <span key={item}>{item}</span>)}</div></Reveal>
        </div>
        </div>
      </section>

      <section className="toolkit section-blue stack-page" id="toolkit">
        <div className="stack-content">
        <div className="section-number">04 / my toolkit</div><Reveal className="toolkit-header"><div><p className="eyebrow">things I&apos;m growing</p><h2>Skills, but make<br /><em>them useful.</em></h2></div><p>No fake percentages here. Just a growing toolkit, practical curiosity and a willingness to learn what the idea needs.</p></Reveal>
        <div className="skill-grid">{skills.map((skill, index) => <Reveal key={skill.title} className={`skill-card skill-${skill.color}`}><span className="skill-index">0{index + 1}</span><h3>{skill.title}</h3><ul>{skill.items.map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul></Reveal>)}</div>
        </div>
      </section>

      <section className="journey section-red stack-page" id="journey">
        <div className="stack-content">
        <div className="section-number">05 / the journey</div><Reveal className="journey-header"><p className="eyebrow">a work in progress</p><h2>Not a straight line,<br />but definitely a <em>journey.</em></h2></Reveal>
        <div className="timeline">{[
          ['01', 'Founder', 'reeliT.in', 'A freelance venture for practical digital marketing, ideas and internet things.', 'Present / building'],
          ['02', 'Learning', 'Bizneeti Academy', 'Digital marketing training — getting the strategy, tools and fundamentals into practice.', 'Training / Patna'],
          ['03', 'Showing up', 'NSS + internships', 'Social service, academic projects and the kind of experiences that make you notice people.', 'Ongoing / learning'],
          ['04', 'Everywhere', 'Events + projects', 'Hosting, participating and creating through school, college and off-campus moments.', 'Ongoing / exploring'],
        ].map(([number, label, title, description, date]) => <Reveal className="timeline-item" key={number}><div className="timeline-marker">{number}</div><div className="timeline-content"><p className="eyebrow">{label}</p><h3>{title}</h3><p>{description}</p></div><span className="timeline-date">{date}</span></Reveal>)}</div>
        </div>
      </section>

      <section className="work section-ivory stack-page" id="work">
        <div className="stack-content">
        <div className="section-number">06 / selected work</div><Reveal className="work-header"><div><p className="eyebrow">a peek into the playground</p><h2>Things I&apos;ve been<br /><em>creating lately.</em></h2></div><p>Some real, some in progress, some just waiting for the right brief. Every piece is a chance to make an idea clearer and more memorable.</p></Reveal>
        <div className="filter-row">{projectFilters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="project-grid">{visibleProjects.map((project, index) => <Reveal className={`project-card ${project.className}`} key={project.title}><div className="project-image"><img src={project.image} alt="" loading="lazy" /><span className="project-index">0{index + 1}</span><span className="view-project"><MoveUpRight size={17} /></span></div><div className="project-meta"><div><p className="eyebrow">{project.category}</p><h3>{project.title}</h3></div><p>{project.description}</p></div><span className="role-label">{project.role}</span></Reveal>)}</div>
        </div>
      </section>

      <section className="learning section-yellow stack-page" id="education"><div className="stack-content"><div className="section-number">07 / learning out loud</div><Reveal className="learning-layout"><div><p className="eyebrow">always learning, always experimenting</p><h2>Curiosity is<br />my favourite <em>credential.</em></h2><div className="education-sticker">keep<br />going <Star size={20} fill="currentColor" /></div></div><div className="education-list"><div className="education-item"><span>education</span><h3>BSc Zoology</h3><p>A.N. College · Patliputra University</p><b>Expected graduation: 2028</b></div><div className="education-item"><span>professional training</span><h3>Digital Marketing Training</h3><p>Bizneeti Academy, Patna</p><b>Practical projects + fundamentals</b></div><div className="education-item placeholder"><span>next chapter</span><h3>Certifications & workshops</h3><p>A space for the things I&apos;m still collecting.</p><b>Coming soon / editable</b></div></div></Reveal></div></section>

      <section className="creative-corner section-pink stack-page" id="creative"><div className="stack-content"><div className="section-number">08 / the personal corner</div><div className="corner-layout"><Reveal className="corner-copy"><p className="eyebrow">beyond the job titles</p><h2>Making room<br />for the <em>fun stuff.</em></h2><p>Fashion, beauty, lifestyle, visual aesthetics and a lot of creative experimenting. Womaniya is where these interests get to be loud, soft, weird and entirely mine.</p><a className="button button-dark" href="https://instagram.com/womaniya.irl_" target="_blank" rel="noreferrer">Visit Womaniya <Instagram size={17} /></a></Reveal><Reveal className="corner-collage"><div className="collage-back"><img src={womaniyaInstagramImage} alt="Pink beauty flat lay" loading="eager" /></div><div className="collage-front"><img src={portrait} alt="Sonam in a black blazer" loading="eager" /><span>@womaniya.irl_</span></div><div className="collage-label">soft launch<br />of a big mood ✳</div></Reveal></div></div></section>

      <section className="contact section-blue stack-page" id="contact"><div className="stack-content"><div className="section-number">09 / let&apos;s connect</div><Reveal className="contact-header"><p className="eyebrow">have an idea?</p><h2>Let&apos;s make<br />something <em>happen.</em></h2><p>Open to conversations, creative collaborations, thoughtful briefs and learning opportunities.</p></Reveal><div className="contact-layout"><div className="contact-details"><a href="mailto:heysonam03@gmail.com"><Mail size={18} /> heysonam03@gmail.com <ArrowUpRight size={16} /></a><a href="https://instagram.com/womaniya.irl_" target="_blank" rel="noreferrer"><Instagram size={18} /> @womaniya.irl_ <ArrowUpRight size={16} /></a><span><ExternalLink size={18} /> reeliT.in <small>coming soon</small></span><span><Linkedin size={18} /> LinkedIn <small>link to be added</small></span></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@email.com" /></label></div><label>Subject<input required name="subject" placeholder="What are we making?" /></label><label>Message<textarea required name="message" placeholder="Tell me a little about it..." rows={4} /></label><button className="button button-dark" type="submit">Send a note <ArrowUpRight size={17} /></button>{submitted && <p className="form-note">Your email app should open with the message ready to send.</p>}</form></div></div></section>

      <footer className="footer section-cherry stack-page"><div className="stack-content"><div className="footer-top"><a className="wordmark" href="#top">sonam<span>.</span></a><p>creative strategy · digital marketing · content creation</p><a className="back-top" href="#top">back to top <ChevronDown size={16} className="rotate" /></a></div><div className="footer-bottom"><span>© 2026 Sonam</span><span>made with curiosity & good intent</span><span>Patna, India <span className="footer-star">✦</span></span></div></div></footer>
    </main>
  );
}

export default App;

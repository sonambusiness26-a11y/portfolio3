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
const campaignImage = '/images/homemade-social-food-beverage.jfif';
const reelItImage = '/images/reelit-project.jpg';
const pexels = {
  collage: 'https://images.pexels.com/photos/23991028/pexels-photo-23991028.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beauty: 'https://images.pexels.com/photos/31449823/pexels-photo-31449823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  portrait: 'https://images.pexels.com/photos/31544926/pexels-photo-31544926.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  flowers: 'https://images.pexels.com/photos/12622593/pexels-photo-12622593.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const navItems = ['About', 'Work', 'Journey', 'Skills', 'Contact'];
const projectFilters = ['All work', 'Marketing', 'Branding', 'Content'];
const skills = [
  { title: 'Digital marketing', color: 'blue', items: ['Social media management', 'Meta Ads fundamentals', 'Campaign planning', 'Audience research', 'Performance metrics'] },
  { title: 'Content & creative', color: 'pink', items: ['Content strategy', 'Storytelling', 'Reel ideation', 'Copywriting', 'Canva design'] },
  { title: 'Creator energy', color: 'yellow', items: ['Instagram content', 'Fashion & beauty', 'Lifestyle storytelling', 'Creator-led shoots', 'Audience engagement'] },
  { title: 'Tools & tech', color: 'red', items: ['Canva', 'Meta Ads Manager', 'AI content tools', 'AI avatar/video tools', 'Digital platforms'] },
];
const projects = [
  { title: 'reeliT.in', category: 'Marketing', description: 'A freelance venture exploring practical, people-first digital marketing.', role: 'Founder / strategist', image: reelItImage, className: 'project-large' },
  { title: 'Womaniya', category: 'Branding', description: 'A personal creative corner for fashion, beauty, lifestyle and visual stories.', role: 'Creator / visual direction', image: pexels.beauty, className: 'project-tall' },
  { title: 'Content moodboard', category: 'Content', description: 'A collection of content directions, reel prompts and social-first ideas.', role: 'Creative concept', image: pexels.portrait, className: 'project-small' },
  { title: 'Campaign playground', category: 'Marketing', description: 'Editable concept space for future campaigns and practical assignments.', role: 'Concept / copy / design', image: campaignImage, className: 'project-small' },
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All work');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

    let frame = 0;
    const parallaxElements = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const updateScrollGraphic = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
        parallaxElements.forEach((element) => {
          const speed = Number(element.dataset.parallax ?? 0);
          const bounds = element.getBoundingClientRect();
          const distanceFromCenter = window.innerHeight / 2 - (bounds.top + bounds.height / 2);
          element.style.setProperty('--parallax-offset', `${distanceFromCenter * speed}px`);
        });
      });
    };
    const updatePointerGraphic = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth - 0.5) * 14}px`);
      document.documentElement.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight - 0.5) * 14}px`);
    };

    window.addEventListener('scroll', updateScrollGraphic, { passive: true });
    window.addEventListener('pointermove', updatePointerGraphic, { passive: true });
    updateScrollGraphic();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScrollGraphic);
      window.removeEventListener('pointermove', updatePointerGraphic);
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
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Sonam home">sonam<span>.</span></a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="nav-cta" href="mailto:heysonam03@gmail.com">Let&apos;s talk <ArrowUpRight size={16} /></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero paper-grid" id="top">
        <div className="hero-scribble" data-parallax="-0.12">hello<br />there<span>✳</span></div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> creative strategist <span className="slash">/</span> digital marketer</p>
          <h1>Hi, I&apos;m <em>Sonam</em>.<br />Creative minds, <em>strategic</em> thinking.<br /><span>Stories that connect.</span></h1>
          <p className="hero-intro">Exploring the intersection of creative strategy, digital marketing and content creation — one idea at a time.</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={18} /></a><a className="text-link" href="#contact">Let&apos;s connect <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="hero-visual">
          <div className="hero-burst" data-parallax="0.08"><span>creative</span><span>curious</span><span>always learning</span></div>
          <div className="portrait-frame"><img src={portrait} alt="Sonam in a black blazer" /></div>
          <div className="sticker sticker-star"><Star size={20} fill="currentColor" /></div>
          <div className="sticker sticker-note" data-parallax="-0.06">based in<br /><strong>Patna, IN</strong></div>
          <div className="sticker sticker-arrow" data-parallax="0.14"><ArrowDownRight size={34} /></div>
        </div>
        <div className="hero-bottom"><span>scroll to explore</span><div className="scroll-line" /><span>01 — 10</span></div>
      </section>

      <div className="marquee"><div>STRATEGY <span>✦</span> STORYTELLING <span>✦</span> CONTENT <span>✦</span> COMMUNITY <span>✦</span> </div><div>STRATEGY <span>✦</span> STORYTELLING <span>✦</span> CONTENT <span>✦</span> COMMUNITY <span>✦</span> </div></div>

      <section className="about section-yellow" id="about">
        <div className="section-number">02 / about me</div>
        <div className="about-layout">
          <Reveal className="about-heading"><span className="hand-label">a little introduction</span><h2>Okay, but<br /><em>who&apos;s</em> Sonam?</h2><div className="scribble-underline" /></Reveal>
          <Reveal className="about-photo"><img src={portrait} alt="Sonam smiling in a black blazer" /><span className="photo-caption">just figuring it out<br />& making it pretty</span></Reveal>
          <Reveal className="about-copy"><p className="large-copy">I&apos;m a curious creative from Patna who loves turning <strong>big ideas into things people want to look at, feel and remember.</strong></p><p>Currently studying BSc Zoology while building a path in creative strategy, digital marketing and content creation. I&apos;m interested in the little details — a good hook, a thoughtful visual, a story that stays.</p><p>When I&apos;m not planning content, you&apos;ll find me exploring fashion, beauty, lifestyle and all the ways a personal brand can feel more human.</p><a className="text-link dark-link" href="#journey">My story so far <ArrowUpRight size={16} /></a></Reveal>
        </div>
        <div className="fun-facts"><span>✳ currently: learning in public</span><span>♡ loves: visuals & good conversations</span><span>→ based: Patna, Bihar, India</span></div>
      </section>

      <section className="doing section-ivory" id="skills">
        <div className="section-number">03 / what I do</div>
        <Reveal className="section-intro"><p className="eyebrow">the two sides of the story</p><h2>A little bit of <em>strategy,</em><br />a little bit of creativity.</h2></Reveal>
        <div className="service-grid">
          <Reveal className="service-card service-blue"><div className="card-top"><span>01</span><Sparkles size={22} /></div><h3>Creative strategy<br /><em>& digital marketing</em></h3><p>Making the message clear, the content intentional and the next step feel easy.</p><div className="pill-list">{['Social media strategy', 'Content planning', 'Brand positioning', 'Meta Ads fundamentals', 'Audience targeting', 'Campaign planning', 'Canva creative design', 'AI-powered solutions'].map((item) => <span key={item}>{item}</span>)}</div></Reveal>
          <Reveal className="service-card service-pink"><div className="card-top"><span>02</span><Asterisk size={25} /></div><h3>Content creation<br /><em>& personal branding</em></h3><p>Building visual worlds and scroll-stopping stories that sound like a real person.</p><div className="pill-list">{['Content creation', 'Creative direction', 'Visual storytelling', 'Reel concepts', 'Copywriting', 'Personal branding', 'Fashion & lifestyle', 'Creator-led content'].map((item) => <span key={item}>{item}</span>)}</div></Reveal>
        </div>
      </section>

      <section className="toolkit section-blue" id="toolkit">
        <div className="section-number">04 / my toolkit</div><Reveal className="toolkit-header"><div><p className="eyebrow">things I&apos;m growing</p><h2>Skills, but make<br /><em>them useful.</em></h2></div><p>No fake percentages here. Just a growing toolkit, practical curiosity and a willingness to learn what the idea needs.</p></Reveal>
        <div className="skill-grid">{skills.map((skill, index) => <Reveal key={skill.title} className={`skill-card skill-${skill.color}`}><span className="skill-index">0{index + 1}</span><h3>{skill.title}</h3><ul>{skill.items.map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul></Reveal>)}</div>
      </section>

      <section className="journey section-red" id="journey">
        <div className="section-number">05 / the journey</div><Reveal className="journey-header"><p className="eyebrow">a work in progress</p><h2>Not a straight line,<br />but definitely a <em>journey.</em></h2></Reveal>
        <div className="timeline">{[
          ['01', 'Founder', 'reeliT.in', 'A freelance venture for practical digital marketing, ideas and internet things.', 'Present / building'],
          ['02', 'Learning', 'Bizneeti Academy', 'Digital marketing training — getting the strategy, tools and fundamentals into practice.', 'Training / Patna'],
          ['03', 'Showing up', 'NSS + internships', 'Social service, academic projects and the kind of experiences that make you notice people.', 'Ongoing / learning'],
          ['04', 'Everywhere', 'Events + projects', 'Hosting, participating and creating through school, college and off-campus moments.', 'Ongoing / exploring'],
        ].map(([number, label, title, description, date]) => <Reveal className="timeline-item" key={number}><div className="timeline-marker">{number}</div><div className="timeline-content"><p className="eyebrow">{label}</p><h3>{title}</h3><p>{description}</p></div><span className="timeline-date">{date}</span></Reveal>)}</div>
      </section>

      <section className="work section-ivory" id="work">
        <div className="section-number">06 / selected work</div><Reveal className="work-header"><div><p className="eyebrow">a peek into the playground</p><h2>Things I&apos;ve been<br /><em>creating lately.</em></h2></div><p>Some real, some in progress, some just waiting for the right brief. Every piece is a chance to make an idea clearer and more memorable.</p></Reveal>
        <div className="filter-row">{projectFilters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="project-grid">{visibleProjects.map((project, index) => <Reveal className={`project-card ${project.className}`} key={project.title}><div className="project-image"><img src={project.image} alt="" loading="lazy" /><span className="project-index">0{index + 1}</span><span className="view-project"><MoveUpRight size={17} /></span></div><div className="project-meta"><div><p className="eyebrow">{project.category}</p><h3>{project.title}</h3></div><p>{project.description}</p></div><span className="role-label">{project.role}</span></Reveal>)}</div>
      </section>

      <section className="learning section-yellow" id="education"><div className="section-number">07 / learning out loud</div><Reveal className="learning-layout"><div><p className="eyebrow">always learning, always experimenting</p><h2>Curiosity is<br />my favourite <em>credential.</em></h2><div className="education-sticker">keep<br />going <Star size={20} fill="currentColor" /></div></div><div className="education-list"><div className="education-item"><span>education</span><h3>BSc Zoology</h3><p>A.N. College · Patliputra University</p><b>Expected graduation: 2028</b></div><div className="education-item"><span>professional training</span><h3>Digital Marketing Training</h3><p>Bizneeti Academy, Patna</p><b>Practical projects + fundamentals</b></div><div className="education-item placeholder"><span>next chapter</span><h3>Certifications & workshops</h3><p>A space for the things I&apos;m still collecting.</p><b>Coming soon / editable</b></div></div></Reveal></section>

      <section className="creative-corner section-pink" id="creative"><div className="section-number">08 / the personal corner</div><div className="corner-layout"><Reveal className="corner-copy"><p className="eyebrow">beyond the job titles</p><h2>Making room<br />for the <em>fun stuff.</em></h2><p>Fashion, beauty, lifestyle, visual aesthetics and a lot of creative experimenting. Womaniya is where these interests get to be loud, soft, weird and entirely mine.</p><a className="button button-dark" href="https://instagram.com/womaniya.irl_" target="_blank" rel="noreferrer">Visit Womaniya <Instagram size={17} /></a></Reveal><Reveal className="corner-collage"><div className="collage-back" data-parallax="0.08"><img src={pexels.beauty} alt="Pink beauty flat lay" loading="lazy" /></div><div className="collage-front"><img src={portrait} alt="Sonam in a black blazer" loading="lazy" /><span>@womaniya.irl_</span></div><div className="collage-label" data-parallax="-0.1">soft launch<br />of a big mood ✳</div></Reveal></div></section>

      <section className="contact section-blue" id="contact"><div className="section-number">09 / let&apos;s connect</div><Reveal className="contact-header"><p className="eyebrow">have an idea?</p><h2>Let&apos;s make<br />something <em>happen.</em></h2><p>Open to conversations, creative collaborations, thoughtful briefs and learning opportunities.</p></Reveal><div className="contact-layout"><div className="contact-details"><a href="mailto:heysonam03@gmail.com"><Mail size={18} /> heysonam03@gmail.com <ArrowUpRight size={16} /></a><a href="https://instagram.com/womaniya.irl_" target="_blank" rel="noreferrer"><Instagram size={18} /> @womaniya.irl_ <ArrowUpRight size={16} /></a><span><ExternalLink size={18} /> reeliT.in <small>coming soon</small></span><span><Linkedin size={18} /> LinkedIn <small>link to be added</small></span></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@email.com" /></label></div><label>Subject<input required name="subject" placeholder="What are we making?" /></label><label>Message<textarea required name="message" placeholder="Tell me a little about it..." rows={4} /></label><button className="button button-dark" type="submit">Send a note <ArrowUpRight size={17} /></button>{submitted && <p className="form-note">Your email app should open with the message ready to send.</p>}</form></div></section>

      <footer className="footer section-cherry"><div className="footer-top"><a className="wordmark" href="#top">sonam<span>.</span></a><p>creative strategy · digital marketing · content creation</p><a className="back-top" href="#top">back to top <ChevronDown size={16} className="rotate" /></a></div><div className="footer-bottom"><span>© 2026 Sonam</span><span>made with curiosity & good intent</span><span>Patna, India <span className="footer-star">✦</span></span></div></footer>
    </main>
  );
}

export default App;

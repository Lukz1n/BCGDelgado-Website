import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Smartphone, Wrench, Cpu, Shield, Clock, MapPin, Phone, Mail, Menu, X, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'servicos', 'sobre', 'contato']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const services = [
    {
      icon: Smartphone,
      title: 'Troca de Tela',
      description: 'Substituição de displays LCD, OLED e AMOLED com garantia de qualidade e peças originais.',
      features: ['iPhone', 'Samsung', 'Xiaomi', 'Motorola']
    },
    {
      icon: Wrench,
      title: 'Troca de Conectores',
      description: 'Reparo e substituição de conectores de carga, fones de ouvido e outros componentes.',
      features: ['USB-C', 'Lightning', 'Micro USB', 'P2']
    },
    {
      icon: Cpu,
      title: 'Reparo de Placa',
      description: 'Micro soldagem e reparo avançado em placas-mãe de smartphones Android e iOS.',
      features: ['Micro soldagem', 'Reballing', 'Diagnóstico avançado', 'Recuperação de dados']
    },
    {
      icon: Shield,
      title: 'Software & Sistema',
      description: 'Atualização, desbloqueio e restauração de sistemas operacionais Android e iOS.',
      features: ['Desbloqueio', 'Atualização', 'Root/Jailbreak', 'Backup']
    }
  ]

  const stats = [
    { number: '10+', label: 'Anos de Experiência' },
    { number: '5000+', label: 'Dispositivos Reparados' },
    { number: '98%', label: 'Taxa de Sucesso' },
    { number: '24h', label: 'Tempo Médio de Reparo' }
  ]

  return (
    <div className="app-container">
      {/* Header/Navigation */}
      <motion.header 
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="header-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Cpu className="logo-icon" />
            <span className="logo-text">BCG DELGADO</span>
          </motion.div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {['home', 'servicos', 'sobre', 'contato'].map((section) => (
              <motion.button
                key={section}
                className={`nav-link ${activeSection === section ? 'nav-link-active' : ''}`}
                onClick={() => scrollToSection(section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </nav>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="hero-grid"></div>
          <div className="hero-gradient"></div>
        </div>

        <motion.div 
          className="hero-content"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-badge">
              <Star className="badge-icon" />
              <span>Assistência Técnica Especializada</span>
            </div>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Reparo Profissional para
            <span className="hero-title-highlight"> Android & iOS</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Especialistas em micro soldagem, troca de tela, conectores e software.
            <br />Qualidade profissional com 10 anos de experiência no mercado.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              className="btn-primary"
              onClick={() => scrollToSection('contato')}
            >
              Solicitar Orçamento
              <ChevronRight className="btn-icon" />
            </Button>
            <Button 
              className="btn-secondary"
              onClick={() => scrollToSection('servicos')}
            >
              Ver Serviços
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="services-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Nossos Serviços</h2>
            <p className="section-subtitle">
              Soluções completas para todos os tipos de reparos em dispositivos móveis
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="service-icon-wrapper">
                  <service.icon className="service-icon" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="service-feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="about-section">
        <div className="section-container">
          <div className="about-grid">
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Sobre Nós</h2>
              <p className="about-text">
                Com mais de 10 anos de experiência no mercado de assistência técnica, 
                a <strong>BCG DELGADO ELETRÔNICOS</strong> se consolidou como referência 
                em reparo de dispositivos móveis Android e iOS.
              </p>
              <p className="about-text">
                Nossa equipe é formada por técnicos especializados em micro soldagem, 
                reparo de placas e diagnóstico avançado. Utilizamos equipamentos de 
                última geração e peças de alta qualidade para garantir a satisfação 
                total dos nossos clientes.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <Clock className="about-feature-icon" />
                  <div>
                    <h4>Agilidade</h4>
                    <p>Reparo em até 24 horas</p>
                  </div>
                </div>
                <div className="about-feature">
                  <Shield className="about-feature-icon" />
                  <div>
                    <h4>Garantia</h4>
                    <p>90 dias em todos os serviços</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-image-card">
                <Cpu className="about-image-icon" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="contact-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Entre em Contato</h2>
            <p className="section-subtitle">
              Estamos prontos para atender você e resolver o problema do seu dispositivo
            </p>
          </motion.div>

          <div className="contact-grid">
            <motion.div 
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="contact-icon" />
              <h3>Telefone</h3>
              <p>(00) 00000-0000</p>
            </motion.div>

            <motion.div 
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="contact-icon" />
              <h3>E-mail</h3>
              <p>contato@bcgdelgado.com.br</p>
            </motion.div>

            <motion.div 
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="contact-icon" />
              <h3>Localização</h3>
              <p>Consulte nossa localização</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Cpu className="footer-logo-icon" />
            <span>BCG DELGADO ELETRÔNICOS</span>
          </div>
          <p className="footer-text">
            © 2025 BCG DELGADO ELETRÔNICOS. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App


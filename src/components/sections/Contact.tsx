import React, { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

function ServiceHighlights() {
  const items = ["Strategy", "Design", "Development", "Branding"];
  return (
    <div className="mt-12 hidden lg:block">
      <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 dark:text-neutral-500 mb-6">Expertise</p>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="w-full bg-background text-foreground transition-colors duration-300 scroll-mt-[70px] md:scroll-mt-[80px]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT: 40% Contact Details */}
        <div className="w-full lg:w-[40%] p-8 md:p-16 lg:p-24 bg-secondary/30 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
  <div>
    <h2 className="text-4xl md:text-5xl font-serif mb-8">Let's build <br />something new.</h2>
    <p className="text-muted-foreground mb-12 max-w-sm">We are currently accepting new projects. Our team typically responds within 24 hours.</p>
    
    {/* NEW COMPONENT HERE - Only shows on LG+ screens */}
    <ServiceHighlights />
  </div>
  

  <div className="space-y-6">
    <ContactLink icon={<Mail size={18} />} text="digitalgraphicsranchi@gmail.com" />
    <ContactLink icon={<Phone size={18} />} text="+91 6205114112" />
    <ContactLink icon={<MapPin size={18} />} text="Ranchi, Jharkhand, India" />
  </div>
</div>

        {/* RIGHT: 60% Clean Form */}
        <div className="w-full lg:w-[60%] p-6 md:p-12 lg:p-24 flex items-center">
  {status === 'success' ? (
    <div className="text-center w-full">
      <h3 className="text-3xl font-serif mb-4">Inquiry Received.</h3>
      <p className="text-neutral-500">Thank you for reaching out. We'll be in touch shortly.</p>
    </div>
  ) : (
<form onSubmit={handleSubmit} className="w-full max-w-xl space-y-10" aria-label="Contact Form">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <FormInput label="Full Name" placeholder="John Doe" required />
         <FormInput label="Email" placeholder="john@company.com" type="email" required />
       </div>
       
       <FormInput label="Company" placeholder="Your Agency" />
       
       <div className="space-y-2">
         <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 dark:text-neutral-500" htmlFor="contact-message">Message</label>
         <textarea 
   id="contact-message"
   required
   rows={4}
   className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 
          py-3 focus:outline-none focus:border-black dark:focus:border-white 
          text-black dark:text-white transition-colors resize-none" 
   placeholder="Tell us about your project goals..."
  />
       </div>

       <button 
         disabled={status === 'loading'}
         className="flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 uppercase text-[10px] tracking-[0.2em] font-bold hover:opacity-80 transition-opacity disabled:opacity-50"
   aria-label={status === 'loading' ? "Sending message" : "Send message"}
       >
         {status === 'loading' ? "Sending..." : "Send Message"}
         <ArrowRight size={14} />
       </button>
     </form>
  )}
</div>
      </div>
    </section>
  );
}

function ContactLink({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4 text-sm hover:text-primary transition-colors">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function FormInput({ label, placeholder, type = "text", required = false }: { 
  label: string; 
  placeholder: string; 
  type?: string; 
  required?: boolean 
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold">{label}</label>
      <input 
        required={required}
        type={type}
        className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30" 
        placeholder={placeholder}
      />
    </div>
  );
}
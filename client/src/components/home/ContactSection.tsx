import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlitchText } from "@/components/ui/glitch-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  codename: z.string().min(2, { message: "Codename must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codename: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would send data to a server
    console.log(data);
    
    toast({
      title: "Transmission Sent",
      description: "Your message has been encrypted and transmitted to the resistance.",
      variant: "default",
    });

    // Reset form after submission
    form.reset();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const contactChannels = [
    {
      icon: "fa-telegram-plane",
      color: "text-cyber-cyan",
      borderColor: "border-cyber-dark/60",
      title: "SECURE TELEGRAM",
      link: "#",
      handle: "@attention_resistance",
      linkColor: "text-cyber-cyan hover:text-cyber-cyan/70",
    },
    {
      icon: "fa-discord",
      color: "text-cyber-magenta",
      borderColor: "border-cyber-dark/60",
      title: "DISCORD SERVER",
      link: "#",
      handle: "discord.gg/attention-era",
      linkColor: "text-cyber-magenta hover:text-cyber-magenta/70",
    },
    {
      icon: "fa-keybase",
      color: "text-cyber-yellow",
      borderColor: "border-cyber-dark/60",
      title: "KEYBASE",
      link: "#",
      handle: "keybase.io/attention_breach",
      linkColor: "text-cyber-yellow hover:text-cyber-yellow/70",
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-24 bg-cyber-black overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyber-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-cyber-magenta/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <GlitchText element="h2" className="text-3xl sm:text-4xl font-bold mb-3">
              JOIN THE <span className="text-cyber-green">RESISTANCE</span>
            </GlitchText>
            <div className="h-px w-24 mx-auto bg-cyber-green mb-3"></div>
            <p className="text-white/70 font-sans">Connect with us through secure channels. The corporations are always watching.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="bg-cyber-dark/60 p-6 border border-cyber-dark rounded-sm">
              <GlitchText element="h3" className="text-xl font-bold mb-6">
                SECURE TRANSMISSION
              </GlitchText>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="codename"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70">CODE NAME</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-cyber-black/60 border border-cyber-dark/70 focus:border-cyber-green text-white px-4 py-3 rounded-sm focus:outline-none"
                            placeholder="Your alias"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70">ENCRYPTED CHANNEL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-cyber-black/60 border border-cyber-dark/70 focus:border-cyber-green text-white px-4 py-3 rounded-sm focus:outline-none"
                            placeholder="Secure email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70">MESSAGE</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            className="bg-cyber-black/60 border border-cyber-dark/70 focus:border-cyber-green text-white px-4 py-3 rounded-sm focus:outline-none"
                            placeholder="Your message (end-to-end encrypted)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green text-cyber-green font-medium py-6 rounded-sm transition-colors duration-300"
                  >
                    <GlitchText>TRANSMIT</GlitchText>
                  </Button>
                </form>
              </Form>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-cyber-dark/60 p-6 border border-cyber-dark rounded-sm flex flex-col">
              <GlitchText element="h3" className="text-xl font-bold mb-6">
                RESISTANCE CHANNELS
              </GlitchText>
              
              <ul className="space-y-4 mb-8">
                {contactChannels.map((channel, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    variants={itemVariants}
                  >
                    <div className={`w-10 h-10 rounded-sm bg-cyber-dark/80 flex items-center justify-center mr-4 border ${channel.borderColor}`}>
                      <i className={`fab ${channel.icon} ${channel.color}`}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{channel.title}</h4>
                      <a href={channel.link} className={`${channel.linkColor} text-sm transition-colors`}>
                        {channel.handle}
                      </a>
                    </div>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <div className="bg-cyber-black/40 p-4 border-l-4 border-cyber-red font-mono text-sm text-white/80">
                  <p className="mb-2"><span className="text-cyber-red">&gt;</span> WARNING:</p>
                  <p>Standard communication channels are monitored. Only use encrypted methods. Trust no platform fully. The attention harvesters are always watching.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

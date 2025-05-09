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
import { RGBSplitText } from "@/components/ui/rgb-split";

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

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-24 bg-cyber-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyber-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-cyber-magenta/5 rounded-full blur-3xl"></div>
        
        {/* Circuit board pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8cGF0aCBkPSJNMSAxaDQ4djQ4SDFWMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+CiAgPHBhdGggZD0iTTEwIDFWMTBNMjAgMVYxME0zMCAxVjEwTTQwIDFWMTBNMSAxMEgxME0xIDIwSDEwTTEgMzBIMTBNMSA0MEgxME0xMCAxMFYyMEgzMFYxME00MCAxMHYxMGgxMFYxME0xMCAxMEgyME0zMCAxMEg0ME0xMCAyMEgxTTEwIDIwVjMwTTEwIDMwdjEwTTEwIDQwdjlNMTAgNDBIMU0xMCAzMEgxTTEwIDMwSDIwTTEwIDQwSDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3N2Zz4=')]
          opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <RGBSplitText>
              <GlitchText element="h2" className="text-3xl sm:text-4xl font-bold mb-3">
                JOIN THE <span className="text-cyber-green">RESISTANCE</span>
              </GlitchText>
            </RGBSplitText>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-cyber-green to-transparent mb-3"></div>
            <p className="text-white/70 font-sans">Connect with us through our secure transmission channel.</p>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-cyber-dark/60 p-6 sm:p-8 border border-cyber-dark rounded-sm backdrop-blur-sm"
          >
            <motion.div variants={itemVariants}>
              <GlitchText element="h3" className="text-xl font-bold mb-6 flex items-center">
                <span className="w-3 h-3 bg-cyber-green rounded-full animate-pulse mr-3"></span>
                SECURE TRANSMISSION
              </GlitchText>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="codename"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70 flex items-center">
                          <span className="text-cyber-green mr-2">&gt;</span>
                          CODE NAME
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-cyber-black/60 border border-cyber-dark/70 focus:border-cyber-green text-white px-4 py-3 rounded-sm focus:outline-none"
                            placeholder="Your alias"
                          />
                        </FormControl>
                        <FormMessage className="text-cyber-red text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70 flex items-center">
                          <span className="text-cyber-green mr-2">&gt;</span>
                          ENCRYPTED CHANNEL
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-cyber-black/60 border border-cyber-dark/70 focus:border-cyber-green text-white px-4 py-3 rounded-sm focus:outline-none"
                            placeholder="Secure email address"
                          />
                        </FormControl>
                        <FormMessage className="text-cyber-red text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70 flex items-center">
                          <span className="text-cyber-green mr-2">&gt;</span>
                          MESSAGE
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            className="bg-cyber-black/60 border border-cyber-dark/70 focus:border-cyber-green text-white px-4 py-3 rounded-sm focus:outline-none font-mono"
                            placeholder="Your message (end-to-end encrypted)"
                          />
                        </FormControl>
                        <FormMessage className="text-cyber-red text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green text-cyber-green font-medium py-6 rounded-sm transition-colors duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-green/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-0 transition-all duration-1000"></div>
                      <GlitchText>TRANSMIT</GlitchText>
                    </Button>
                  </div>
                  
                  <div className="text-xs text-white/40 font-mono pt-4 border-t border-cyber-dark/30">
                    <p className="mb-1 flex items-start">
                      <span className="text-cyber-red mr-2 mt-0.5">[!]</span>
                      Your message will be encrypted before transmission. No data is stored on corporate servers.
                    </p>
                  </div>
                </form>
              </Form>
            </motion.div>
          </motion.div>
          
          {/* Info text */}
          <motion.div 
            className="mt-8 text-center text-white/50 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p>Visit our <a href="https://x.com/i/communities/1920969888081862674" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:text-cyber-green/80 transition-colors underline underline-offset-4">X Community</a> to connect with like-minded individuals</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

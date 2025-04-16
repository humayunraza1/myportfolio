import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define form with react-hook-form
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Call your serverless function or API endpoint
      const response = await fetch('https://myportfolio-server-three.vercel.app/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully", {
          description: "Thank you for your message. I'll get back to you soon."
        });
        
        // Reset form
        form.reset();
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error("Error sending message", {
        description: error.message || "There was a problem sending your message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">04</div>
          <div className="text-sm text-gray-500 font-mono">//CONTACT</div>
          <div className="text-sm text-gray-500">2020 - 2024</div>
        </div>

        <h2 className="text-6xl md:text-8xl font-bold text-white mb-16">
          GET IN TOUCH
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ 
                    required: "Name is required" 
                  }}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="block text-sm text-gray-500 uppercase tracking-wide">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className="bg-[#101010] border-[#222222] h-14 text-white" 
                          style={{ backgroundColor: "#101010", borderColor: "#222222" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{ 
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="block text-sm text-gray-500 uppercase tracking-wide">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Your email address" 
                          className="bg-[#101010] border-[#222222] h-14 text-white" 
                          style={{ backgroundColor: "#101010", borderColor: "#222222" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  rules={{ 
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="block text-sm text-gray-500 uppercase tracking-wide">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          className="bg-[#101010] border-[#222222] min-h-32 text-white" 
                          style={{ backgroundColor: "#101010", borderColor: "#222222" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-[#101010] hover:bg-[#1a1a1a] h-14 mt-4 flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  <span className="text-[#4ADE80]">
                    <Mail className="h-5 w-5" />
                  </span>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="lg:pl-16">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Email</div>
                <div className="text-[#4ADE80]">humayunraza.dev@gmail.com</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Phone</div>
                <div className="text-white">+(92)316-1278341</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Location</div>
                <div className="text-white">Karachi, Pakistan</div>
              </div>
              
              <div className="pt-8">
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">Follow Me</div>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => window.open("https://github.com/humayunraza1", '_blank')} 
                    className="rounded-md border-[#222222] text-white hover:text-[#4ADE80] hover:border-[#4ADE80] bg-transparent hover:bg-transparent"
                    style={{ backgroundColor: "#101010", borderColor: "#222222" }}
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => window.open("https://www.linkedin.com/in/humayun-raza/", '_blank')} 
                    className="rounded-md border-[#222222] text-white hover:text-[#4ADE80] hover:border-[#4ADE80] bg-transparent hover:bg-transparent"
                    style={{ backgroundColor: "#101010", borderColor: "#222222" }}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function AboutPage() {
  const faqs = [
    {
      question: "What is DataBreachChecker?",
      answer: "DataBreachChecker is a service that allows you to check if your personal information has been compromised in known data breaches. We scan multiple databases and sources to provide you with up-to-date information about potential security risks associated with your data."
    },
    {
      question: "How does DataBreachChecker work?",
      answer: "Our service works by comparing the information you provide (such as email addresses, usernames, or passwords) against a comprehensive database of known data breaches. If a match is found, we alert you and provide details about the breach, including when it occurred and what type of data was compromised."
    },
    {
      question: "Is it safe to enter my information on DataBreachChecker?",
      answer: "Yes, it is safe to use DataBreachChecker. We take your privacy and security seriously. We use industry-standard encryption to protect your data during transmission, and we do not store any of the personal information you enter for breach checks. Our service is designed to be a one-way check that doesn't retain your data."
    },
    {
      question: "What should I do if my information has been breached?",
      answer: "If we find that your information has been involved in a data breach, we recommend the following steps: 1) Change your passwords for the affected accounts and any other accounts where you've used the same password. 2) Enable two-factor authentication where possible. 3) Monitor your accounts for any suspicious activity. 4) Be cautious of potential phishing attempts that may result from the breach."
    },
    {
      question: "How often should I check for data breaches?",
      answer: "We recommend checking for data breaches regularly, at least once every few months. However, it's a good idea to check more frequently if you suspect your information may have been compromised or if there's news of a major data breach affecting services you use."
    },
    {
      question: "Is DataBreachChecker a free service?",
      answer: "DataBreachChecker offers both free and premium services. Our basic breach check is free for all users. Premium features, such as real-time monitoring and alerts, are available for a subscription fee. Check our pricing page for more details on our premium offerings."
    }
  ]

  return (
    <div className="container mx-auto p-4 pt-16"> {/* Added pt-16 for extra top padding */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-6 dark:text-gray-200">
        About DataBreachChecker
      </h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200">Our Mission</CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Empowering individuals and organizations to protect their digital identities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
            At DataBreachChecker, we are committed to providing a robust and user-friendly platform that helps you stay informed about potential security risks to your personal information. In an era where data breaches are becoming increasingly common, we believe that knowledge and proactive measures are key to maintaining your digital security.
          </p>
          <div className="mt-4 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-600 font-medium text-sm sm:text-base">Your security is our top priority</span>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 dark:text-gray-200">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-sm sm:text-base md:text-lg">{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm sm:text-base md:text-lg dark:text-gray-300">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
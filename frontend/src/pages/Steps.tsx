import { AlertTriangle, Check, Key, Lock, CreditCard, Mail, FileWarning } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DataBreachRemediation() {
  const remediationSteps = [
    {
      title: "Change Passwords",
      icon: <Key className="h-6 w-6" />,
      actions: [
        "Change passwords for all affected accounts immediately.",
        "Use a combination of symbols, numbers, and upper/lowercase letters in your new passwords.",
        "Change passwords for any unaffected accounts that shared the same password as the breached accounts.",
      ],
      tips: [
        "Avoid using the same password across multiple accounts.",
        "Enable Multi-Factor Authentication (MFA) or Two-Factor Authentication (2FA) wherever possible.",
        "Consider using a password manager to generate and store complex, unique passwords for each account.",
      ],
    },
    {
      title: "Monitor Your Accounts",
      icon: <CreditCard className="h-6 w-6" />,
      actions: [
        "Carefully review your bank and credit card statements for any suspicious or unrecognized transactions.",
        "Check your email accounts for notifications about login attempts or password reset requests you didn't initiate.",
        "Set up account alerts to receive notifications for any account activity.",
      ],
      tips: [
        "Contact one of the three major credit bureaus (Equifax, Experian, or TransUnion) to place a fraud alert on your credit report.",
        "Consider freezing your credit to prevent new accounts from being opened in your name.",
        "Regularly check your credit report for any unauthorized accounts or inquiries.",
      ],
    },
    {
      title: "Protect Your Social Security Number",
      icon: <FileWarning className="h-6 w-6" />,
      actions: [
        "File an Identity Theft Report with the Federal Trade Commission (FTC) at IdentityTheft.gov if you suspect your SSN has been compromised.",
        "Contact the Internal Revenue Service (IRS) to set up an Identity Protection PIN, which adds an extra layer of security to your tax filings.",
        "Monitor your Social Security statement for any suspicious activity.",
      ],
      tips: [
        "Be cautious about sharing your SSN. Only provide it when absolutely necessary and verify the legitimacy of the request.",
        "Consider using an identity monitoring service to alert you of potential misuse of your personal information.",
        "Regularly check your credit report for any accounts or loans opened using your SSN without your knowledge.",
      ],
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Data Breach Remediation Steps
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Follow these steps to secure your accounts and personal information after a data breach.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-600">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you believe your personal information has been compromised in a data breach, it's crucial to act quickly. 
              The following steps will help you secure your accounts and minimize the risk of identity theft.
            </p>
          </CardContent>
        </Card>

        {remediationSteps.map((step, index) => (
          <Card key={index} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                {step.icon}
                <span className="ml-2">{step.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="actions">
                  <AccordionTrigger>Actions to Take</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {step.actions.map((action, actionIndex) => (
                        <li key={actionIndex}>{action}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tips">
                  <AccordionTrigger>Helpful Tips</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <Check className="h-6 w-6 mr-2" />
              Stay Vigilant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Remember, staying proactive about your online security is an ongoing process. Regularly update your 
              passwords, monitor your accounts, and stay informed about the latest security best practices to keep 
              your personal information safe.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
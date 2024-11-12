import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "Free",
    description: "For everyone who want to check their security",
    features: ["1 user", "5 projects", "5GB storage", "Basic support"]
  },
  {
    name: "Basic",
    price: "$4.99",
    description: "For individuals just getting started",
    features: ["5 users", "20 projects", "50GB storage", "Priority support"]
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "For individuals who want the best",
    features: ["Unlimited users", "Unlimited projects", "1TB storage", "24/7 dedicated support"]
  }
]

const featureComparison = [
  { feature: "Number of users", free: "1", basic: "5", pro: "Unlimited" },
  { feature: "Number of projects", free: "5", basic: "20", pro: "Unlimited" },
  { feature: "Storage", free: "5GB", basic: "50GB", pro: "1TB" },
  { feature: "API access", free: false, basic: true, pro: true },
  { feature: "Custom domain", free: false, basic: true, pro: true },
  { feature: "Analytics", free: "Basic", basic: "Advanced", pro: "Advanced" },
  { feature: "Support", free: "Email", basic: "Priority", pro: "24/7 Dedicated" },
  { feature: "SSO", free: false, basic: false, pro: true },
]

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <Card key={index} className={index === 1 ? "border-primary shadow-lg" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{index === 2 ? "Contact Sales" : "Get Started"}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-center mb-8">Feature Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border p-2 text-left">Feature</th>
              <th className="border p-2 text-center">Free</th>
              <th className="border p-2 text-center">Basic</th>
              <th className="border p-2 text-center">Pro</th>
            </tr>
          </thead>
          <tbody>
            {featureComparison.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "dark:bg-gray-800"}>
                <td className="border p-2">{row.feature}</td>
                <td className="border p-2 text-center">
                  {typeof row.free === "boolean" ? (
                    row.free ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                  ) : (
                    row.free
                  )}
                </td>
                <td className="border p-2 text-center">
                  {typeof row.basic === "boolean" ? (
                    row.basic ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                  ) : (
                    row.basic
                  )}
                </td>
                <td className="border p-2 text-center">
                  {typeof row.pro === "boolean" ? (
                    row.pro ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                  ) : (
                    row.pro
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

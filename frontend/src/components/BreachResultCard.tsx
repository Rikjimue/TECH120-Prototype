import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";

interface BreachResult {
    service: string;
    date: string;
    description: string;
    matchedFields: Record<string, string>; // Example: { "Email": "Match", "FirstName": "No Match" }
    severity: 'low' | 'medium' | 'high';
    changeLink: string;
}

const results: BreachResult[] = [
    {
        service: 'ExampleService',
        date: '2023-01-15',
        description: 'This breach exposed email addresses and passwords due to unauthorized access.',
        matchedFields: { Email: "Match", FirstName: "No Match", Password: "Can't Match" },
        severity: 'high',
        changeLink: 'https://example.com/change-password'
    },
    // Additional breaches can be added here
];

function BreachResultsCard({ results }: { results: BreachResult[] }) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            {results.map((result, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-4">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            {result.severity === 'high' ? (
                                <AlertCircle className="text-red-500" />
                            ) : (
                                <CheckCircle className="text-green-500" />
                            )}
                            <CardTitle className="text-xl font-semibold">{result.service} Breach</CardTitle>
                        </div>
                        <CardDescription>{result.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{result.description}</p>
                        <div className="mt-4">
                            <h4 className="font-semibold">Matched Fields:</h4>
                            <ul className="ml-4">
                                {Object.entries(result.matchedFields).map(([field, match], idx) => (
                                    <li key={idx} className="text-sm">
                                        <strong>{field}:</strong> {match}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Recommended Actions:</strong> We recommend changing your password and monitoring your accounts for unusual activity.
                        </p>
                        <Button variant="link" href={result.changeLink} target="_blank" className="text-blue-600 dark:text-blue-400 underline">
                            Change Password or Update Email
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default BreachResultsCard;

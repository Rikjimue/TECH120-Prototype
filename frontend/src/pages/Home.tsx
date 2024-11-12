import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchField {
    id: string;
    type: string;
    label: string;
}

interface BreachResult {
    service: string;
    date: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    breachedData: Record<string, string>; // Record to store each field's label and match status
    changeLink: string;
}

const availableFields = [
    { type: 'text', label: 'Username' },
    { type: 'text', label: 'First Name' },
    { type: 'text', label: 'Last Name' },
    { type: 'text', label: 'Middle Name' },
    { type: 'email', label: 'Email' },
    { type: 'tel', label: 'Phone Number' },
    { type: 'text', label: 'Address' },
];

export function Home() {
    const [searchFields, setSearchFields] = useState<SearchField[]>([
        { id: '1', type: 'email', label: 'Email' },
    ]);
    const [searchValues, setSearchValues] = useState<Record<string, string>>({});
    const [results, setResults] = useState<BreachResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedField, setSelectedField] = useState<string | undefined>(undefined);

    // For Sensitive Information Search
    const [sensitiveType, setSensitiveType] = useState('password');
    const [sensitiveValue, setSensitiveValue] = useState('');
    const [sensitiveResults, setSensitiveResults] = useState<BreachResult[]>([]);
    const [isSensitiveLoading, setIsSensitiveLoading] = useState(false);

    const remainingFields = useMemo(() => {
        const usedLabels = new Set(searchFields.map(field => field.label));
        return availableFields.filter(field => !usedLabels.has(field.label));
    }, [searchFields]);

    const handleAddField = (label: string) => {
        const fieldToAdd = availableFields.find(field => field.label === label);
        if (fieldToAdd) {
            const newField: SearchField = {
                id: Date.now().toString(),
                type: fieldToAdd.type,
                label: fieldToAdd.label,
            };
            setSearchFields([...searchFields, newField]);
            setSelectedField(''); // Reset the select after adding a field
        }
    };

    const handleRemoveField = (id: string) => {
        if (searchFields.length > 1) {
            setSearchFields(searchFields.filter(field => field.id !== id));
            const { [id]: _, ...rest } = searchValues;
            setSearchValues(rest);
        }
    };

    const handleFieldChange = (id: string, value: string) => {
        setSearchValues({ ...searchValues, [id]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/v0/breach-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchValues }),
            });
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error('Error fetching breach data:', error);
        }
        setIsLoading(false);
    };

    const handleCloseResults = () => {
        setResults([]);
    };

    const handleSensitiveSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSensitiveLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/v0/sensitive-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    field: sensitiveType,
                    hash: sensitiveValue
                }),
            });
            const data = await response.json();
            setSensitiveResults(data.results);
        } catch (error) {
            console.error('Error fetching sensitive breach data:', error);
        }
        setIsSensitiveLoading(false);
        setSensitiveValue('');
    };

    const handleCloseSensitiveResults = () => {
        setSensitiveResults([]);
    };

    const getSeverityDot = (severity: string) => {
        const colors = {
            low: 'bg-green-500',
            medium: 'bg-yellow-500',
            high: 'bg-red-500'
        };
        return <span className={`inline-block w-3 h-3 rounded-full ${colors[severity]}`}></span>;
    };

    return (
        <div className="container mx-auto p-4 text-gray-900 dark:text-gray-100">
            {/* Data Breach Checker Card */}
            <Card className="w-full max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <CardHeader>
                    <CardTitle className="text-blue-800 dark:text-blue-700 flex items-center">
                        <span className="ml-2">Data Breach Checker</span>
                    </CardTitle>
                    <CardDescription className="text-gray-700 dark:text-gray-300">
                        Check if your personal information has been compromised in a data breach.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="md:flex md:justify-end mb-4">
                        <Select
                            value={selectedField}
                            onValueChange={(value) => {
                                setSelectedField(value);
                                handleAddField(value);
                            }}
                        >
                            <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                <SelectValue placeholder="Add field" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                {remainingFields.map((field) => (
                                    <SelectItem
                                        key={field.label}
                                        value={field.label}
                                        className="hover:bg-blue-100 dark:hover:bg-blue-800 text-gray-900 dark:text-gray-100"
                                    >
                                        {field.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {searchFields.map(field => (
                            <div key={field.id} className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                                <Label htmlFor={field.id} className="text-sm font-medium text-gray-900 dark:text-gray-300 sm:w-1/4">{field.label}</Label>
                                <div className="flex items-center w-full sm:w-3/4">
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                                        value={searchValues[field.id] || ''}
                                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                        required
                                        className="flex-grow bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                    {searchFields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleRemoveField(field.id)}
                                            className="ml-2 text-gray-700 dark:text-gray-300"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end items-center mt-4">
                            <Button type="submit" disabled={isLoading} className="bg-blue-800 text-white dark:bg-blue-700 dark:text-gray-100">
                                {isLoading ? 'Checking...' : 'Check for Breaches'}
                            </Button>
                        </div>
                    </form>
                </CardContent>

                {results.length > 0 && (
                    <CardFooter>
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Breach Results:</h3>
                                <Button variant="ghost" size="sm" onClick={handleCloseResults}>
                                    <X className="h-4 w-4 mr-2" /> Close Results
                                </Button>
                            </div>
                            {results.map((result, index) => (
                                <Card key={index} className="bg-white dark:bg-gray-800">
                                    <CardHeader>
                                        <CardTitle className="text-blue-800 dark:text-blue-700 flex items-center">
                                            {getSeverityDot(result.severity)} <span className="ml-2">{result.service} Breach</span>
                                        </CardTitle>
                                        <CardDescription>Breach Date: {result.date}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Description:</strong> {result.description}</p>
                                        <div className="mt-4 space-y-4">
                                            {Object.entries(result.breachedData).map(([field, status], idx) => (
                                                <div key={idx} className="mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                                    <h4 className="text-blue-800 dark:text-blue-700 font-semibold text-base">{field}</h4>
                                                    <p className="text-sm">Match Status: {status}</p>
                                                    <p className="text-sm mt-2"><strong>Description:</strong> This field was exposed due to unauthorized access.</p>
                                                    <p className="text-sm"><strong>Severity:</strong> {getSeverityDot(result.severity)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <strong>Recommended Actions:</strong> We recommend changing your password and enabling two-factor authentication.
                                        </p>
                                        <Button variant="link" href={result.changeLink} target="_blank" className="text-blue-600 dark:text-blue-400 underline">
                                            Change Password or Update Account Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </CardFooter>
                )}
            </Card>

            {/* Sensitive Information Search Card */}
            <Card className="w-full max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <CardHeader>
                    <CardTitle className="text-blue-800 dark:text-blue-700">Sensitive Information Search</CardTitle>
                    <CardDescription className="text-gray-700 dark:text-gray-300">
                        Securely check for breaches of highly sensitive information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSensitiveSubmit} className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <div className="flex-grow">
                                <Label htmlFor="sensitiveType">Type of Sensitive Information</Label>
                                <Select value={sensitiveType} onValueChange={setSensitiveType}>
                                    <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800">
                                        <SelectItem value="password" className="hover:bg-blue-100 dark:hover:bg-blue-800">Password</SelectItem>
                                        <SelectItem value="ssn" className="hover:bg-blue-100 dark:hover:bg-blue-800">Social Security Number</SelectItem>
                                        <SelectItem value="other" className="hover:bg-blue-100 dark:hover:bg-blue-800">Other Sensitive Information</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-grow">
                                <Label htmlFor="sensitiveValue">Sensitive Value</Label>
                                <Input
                                    id="sensitiveValue"
                                    type="text"
                                    placeholder={`Enter ${sensitiveType}`}
                                    value={sensitiveValue}
                                    onChange={(e) => setSensitiveValue(e.target.value)}
                                    required
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button type="submit" disabled={isSensitiveLoading} className="bg-blue-800 text-white dark:bg-blue-700">
                                {isSensitiveLoading ? 'Checking...' : 'Check for Breaches'}
                            </Button>
                        </div>
                    </form>
                </CardContent>

                {sensitiveResults.length > 0 && (
                    <CardFooter>
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Sensitive Information Breach Results:</h3>
                                <Button variant="ghost" size="sm" onClick={handleCloseSensitiveResults}>
                                    <X className="h-4 w-4 mr-2" /> Close Results
                                </Button>
                            </div>
                            {sensitiveResults.map((result, index) => (
                                <Card key={index} className="bg-white dark:bg-gray-800">
                                    <CardHeader>
                                        <CardTitle className="text-blue-800 dark:text-blue-700 flex items-center">
                                            {getSeverityDot(result.severity)} <span className="ml-2">{result.service} Breach</span>
                                        </CardTitle>
                                        <CardDescription>Breach Date: {result.date}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Description:</strong> {result.description}</p>
                                        <div className="mt-4">
                                            {Object.entries(result.breachedData).map(([field, status], idx) => (
                                                <div key={idx} className="mb-2">
                                                    <h4 className="text-blue-800 dark:text-blue-700 font-semibold text-base">{field}</h4>
                                                    <p>Match Status: {status}</p>
                                                    <p className="text-sm mt-2"><strong>Description:</strong> This field was exposed due to unauthorized access.</p>
                                                    <p className="text-sm"><strong>Severity:</strong> {getSeverityDot(result.severity)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <strong>Recommended Actions:</strong> We recommend changing your {sensitiveType} information and enabling two-factor authentication.
                                        </p>
                                        <Button variant="link" href={result.changeLink} target="_blank" className="text-blue-600 dark:text-blue-400 underline">
                                            Change {sensitiveType} Information
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}

import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SHA1 } from 'crypto-js';
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const convertSnakeCase = (text: any) => {
    const words = text.split("_");

    for (let i=0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }

    return words.join(" ")

}

const StyledPhoneInput = ({ value, onChange }) => {
    return (
        <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="US"
            value={value}
            onChange={onChange}
            className="flex-grow"
        />
    );
};

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
    const [error, setError] = useState<string | null>(null);
    const [showBreachError, setShowBreachError] = useState(false);
    const [showNoBreachMatches, setShowNoBreachMatches] = useState(false);

    // For Sensitive Information Search
    const [sensitiveType, setSensitiveType] = useState('password');
    const [sensitiveValue, setSensitiveValue] = useState('');
    const [sensitiveResults, setSensitiveResults] = useState<BreachResult[]>([]);
    const [isSensitiveLoading, setIsSensitiveLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showSensitiveError, setShowSensitiveError] = useState(false);
    const [showNoSensitiveMatches, setShowNoSensitiveMatches] = useState(false);

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
        setError(null);
        setShowNoBreachMatches(false);
        setShowBreachError(false);
        
        // Create a map of field labels to values
        const formattedSearchValues = searchFields.reduce((acc, field) => {
            if (searchValues[field.id]) {
                acc[field.label.toLowerCase().replace(' ', '_')] = searchValues[field.id];
            }
            return acc;
        }, {} as Record<string, string>);
    
        const requestBody = {
            Fields: formattedSearchValues
        };
    
        console.log('Sending request to server:', requestBody);
    
        try {
            const response = await fetch('https://v5flsvdg-8080.use.devtunnels.ms/api/v0/breach-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                console.error('Server response not ok:', {
                    status: response.status,
                    statusText: response.statusText
                });
                const errorText = await response.text();
                console.error('Error response body:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Received response from server:', data);
    
            if (data.Matches) {
                const formattedResults = data.Matches.map((match: any) => ({
                    service: convertSnakeCase(match.name),
                    date: match.date,
                    description: match.description,
                    severity: match.severity.toLowerCase(),
                    breachedData: Object.entries(match.fields).reduce((acc, [key, value]) => {
                        acc[convertSnakeCase(key)] = value; // Format the field key using formatFieldName
                        return acc;
                    }, {} as Record<string, string>),
                    changeLink: match.link
                }));
                setResults(formattedResults);
            }
            else {
                setResults([]);
                setShowNoBreachMatches(true);
            }
        } catch (error) {
            console.error('Error details:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
            setShowBreachError(true);
            setShowNoBreachMatches(false);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseResults = () => {
        setResults([]);
        setShowNoBreachMatches(false);
        setShowBreachError(false);
    };

    const handleSensitiveSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSensitiveLoading(true);
        setError(null);
        setShowNoSensitiveMatches(false);
        setShowSensitiveError(false);
        
        // Generate full SHA1 hash of the sensitive value
        const fullHash = SHA1(sensitiveValue).toString();
        // Take first 5 characters for k-anonymity
        const partialHash = fullHash.substring(0, 5);
        
        try {
            const response = await fetch('https://v5flsvdg-8080.use.devtunnels.ms/api/v0/sensitive-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    field: sensitiveType,
                    hash: partialHash // Send only partial hash for k-anonymity
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            
            // Server returns potential matches based on partial hash
            if (data.PotentialPasswords) {
                // Find our exact match in the potential passwords using full hash
                const exactMatch = data.PotentialPasswords[fullHash];
                console.log(exactMatch);
                
                if (exactMatch && exactMatch.Matches) {
                    const formattedResults = exactMatch.Matches.map((match: any) => ({
                        service: convertSnakeCase(match.name),
                        date: match.date,
                        description: match.description,
                        severity: match.severity.toLowerCase(),
                        breachedData: Object.entries(match.fields).reduce((acc, [key, value]) => {
                            acc[convertSnakeCase(key)] = value; // Format the field key using formatFieldName
                            return acc;
                        }, {} as Record<string, string>),
                        changeLink: match.link
                    }));
                    setSensitiveResults(formattedResults);
                    setShowNoSensitiveMatches(true);
                } else {
                    setSensitiveResults([]); // No exact matches found
                    setShowNoSensitiveMatches(true);
                }
            }
        } catch (error) {
            console.error('Error fetching sensitive breach data:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
            setShowSensitiveError(true);
            setSensitiveResults([]);
        } finally {
            setIsSensitiveLoading(false);
            setSensitiveValue('');
        }
    };

    const handleCloseSensitiveResults = () => {
        setSensitiveResults([]);
        setShowNoSensitiveMatches(false);
        setShowSensitiveError(false);
    };

    const getSeverityDot = (severity: string) => {
        const colors = {
            low: 'bg-green-500',
            medium: 'bg-yellow-500',
            high: 'bg-red-500'
        };
        return <span className={`inline-block w-3 h-3 rounded-full ${colors[severity]}`}></span>;
    };

    console.log(showNoSensitiveMatches)
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
                            <Label htmlFor={field.id} className="text-sm font-medium text-gray-900 dark:text-gray-300 sm:w-1/4">
                                {field.label}
                            </Label>
                            <div className="flex items-center w-full sm:w-3/4 gap-2"> {/* Added gap-2 */}
                                {field.type === 'tel' ? (
                                    <StyledPhoneInput
                                        value={searchValues[field.id] || ''}
                                        onChange={(value) => handleFieldChange(field.id, value)}
                                    />
                                ) : (
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                                        value={searchValues[field.id] || ''}
                                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                        required
                                        className="flex-grow bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                )}
                                {searchFields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleRemoveField(field.id)}
                                        className="text-gray-700 dark:text-gray-300"
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

                {(results.length > 0 || showBreachError || showNoBreachMatches) && (
                    <CardFooter>
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Breach Results:</h3>
                                <Button variant="ghost" size="sm" onClick={() => {handleCloseResults();}}>
                                    <X className="h-4 w-4 mr-2" /> Close Results
                                </Button>
                            </div>

                            {showBreachError && (
                                <Card className="bg-white dark:bg-gray-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                                            <XCircle className="h-6 w-6 mr-2" />
                                            Error Occurred
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-900 dark:text-gray-100">{error}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button 
                                            onClick={() => handleSubmit} 
                                            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                                        >
                                            Try Again
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )}

                            {showNoBreachMatches && !showBreachError && (
                                <Card className="bg-white dark:bg-gray-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                                            <CheckCircle className="h-6 w-6 mr-2" />
                                            No Breaches Found
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            Good news! We couldn't find any data breaches associated with the information you provided.
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Remember to stay vigilant and regularly check for potential data breaches.
                                        </p>
                                    </CardFooter>
                                </Card>
                            )}
                            {results.length > 0 && !showBreachError && (
                                results.map((result, index) => (
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
                                            <Button variant="link" asChild className="text-blue-600 dark:text-blue-400 underline">
                                                <a href={result.changeLink} target="_blank" rel="noopener noreferrer">
                                                    Secure your {sensitiveType}
                                                </a>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            )}
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
                                <div className="relative">
                                    <Input
                                        id="sensitiveValue"
                                        type={isVisible ? "text" : "password"}
                                        placeholder={`Enter ${sensitiveType}`}
                                        value={sensitiveValue}
                                        onChange={(e) => setSensitiveValue(e.target.value)}
                                        required
                                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 pr-10" // Added pr-10 for icon space
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                        onClick={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button type="submit" disabled={isSensitiveLoading} className="bg-blue-800 text-white dark:bg-blue-700">
                                {isSensitiveLoading ? 'Checking...' : 'Check for Breaches'}
                            </Button>
                        </div>
                    </form>
                </CardContent>

                {(sensitiveResults.length > 0 || showNoSensitiveMatches || showSensitiveError) && (
                    <CardFooter>
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Sensitive Information Breach Results:</h3>
                                <Button variant="ghost" size="sm" onClick={() => {handleCloseSensitiveResults();}}>
                                    <X className="h-4 w-4 mr-2" /> Close Results
                                </Button>
                            </div>

                            {showSensitiveError && (
                                <Card className="bg-white dark:bg-gray-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                                            <XCircle className="h-6 w-6 mr-2" />
                                            Error Occurred
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-900 dark:text-gray-100">{error}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button 
                                            onClick={() => handleSubmit} 
                                            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                                        >
                                            Try Again
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )}

                            {showNoSensitiveMatches && !showSensitiveError && (
                                <Card className="bg-white dark:bg-gray-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                                            <CheckCircle className="h-6 w-6 mr-2" />
                                            No Breaches Found
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            Good news! We couldn't find any data breaches associated with the information you provided.
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Remember to stay vigilant and regularly check for potential data breaches.
                                        </p>
                                    </CardFooter>
                                </Card>
                            )}
                            {sensitiveResults.length > 0 && !showSensitiveError && (
                                sensitiveResults.map((result, index) => (
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
                                            <Button variant="link" asChild className="text-blue-600 dark:text-blue-400 underline">
                                                <a href={result.changeLink} target="_blank" rel="noopener noreferrer">
                                                    Secure your {sensitiveType}
                                                </a>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            )}
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}

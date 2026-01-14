/**
 * Extracts numeric HeartRate values from a log string.
 * 
 * @param logString - The input string containing log entries with HeartRate values
 * @returns An array of valid numeric HeartRate values
 * 
 * @example
 * const input = "LOG_01: HeartRate=72bpm; STATUS=OK | LOG_02: HeartRate= 85 ; STATUS=WARN";
 * extractHeartRates(input); // Returns: [72, 85]
 */
export function extractHeartRates(logString: string): number[] {
    // Handle edge cases: null, undefined, or empty input
    if (!logString || typeof logString !== 'string') {
        return [];
    }

    // Regex pattern explanation:
    // HeartRate\s*=\s* - Matches "HeartRate" followed by optional spaces, "=", and optional spaces
    // ([^;|]+)        - Captures everything until a semicolon or pipe (the value part)
    const regex = /HeartRate\s*=\s*([^;|]+)/gi;

    const results: number[] = [];
    let match: RegExpExecArray | null;

    // Find all HeartRate entries in the log string
    while ((match = regex.exec(logString)) !== null) {
        const rawValue = match[1].trim();
        
        // Extract numeric part (handles values like "72bpm", " 85 ", etc.)
        const numericMatch = rawValue.match(/^(\d+)/);
        
        if (numericMatch) {
            const heartRate = parseInt(numericMatch[1], 10);
            
            // Only include valid heart rate values (reasonable range check)
            if (!isNaN(heartRate) && heartRate > 0) {
                results.push(heartRate);
            }
        }
        // Non-numeric values like "error" are silently skipped
    }

    return results;
}

// Main execution - supports command-line arguments for easy testing
if (require.main === module) {
    // Default example input from the task
    const defaultInput = "LOG_01: HeartRate=72bpm; STATUS=OK | LOG_02: HeartRate= 85 ; STATUS=WARN | LOG_03: HeartRate=error; STATUS=FAIL";
    
    // Use command-line argument if provided, otherwise use default
    const input = process.argv[2] || defaultInput;
    
    console.log("Input string:");
    console.log(input);
    console.log("\nExtracted HeartRate values:");
    console.log(extractHeartRates(input));
    
    if (!process.argv[2]) {
        console.log("\nTip: You can test with custom input:");
        console.log('  npm start -- "HeartRate=100; HeartRate=200bpm"');
    }
}

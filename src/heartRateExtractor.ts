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

// Main execution - demonstrates the function with the provided example
if (require.main === module) {
    const testInput = "LOG_01: HeartRate=72bpm; STATUS=OK | LOG_02: HeartRate= 85 ; STATUS=WARN | LOG_03: HeartRate=error; STATUS=FAIL";
    
    console.log("Input string:");
    console.log(testInput);
    console.log("\nExtracted HeartRate values:");
    console.log(extractHeartRates(testInput));
}

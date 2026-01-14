import { extractHeartRates } from '../src/heartRateExtractor';

/**
 * Simple test runner - no external testing framework needed
 */
function test(description: string, testFn: () => void): void {
    try {
        testFn();
        console.log(`✓ ${description}`);
    } catch (error) {
        console.error(`✗ ${description}`);
        console.error(`  ${error}`);
        process.exitCode = 1;
    }
}

function assertEqual<T>(actual: T, expected: T): void {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
        throw new Error(`Expected ${expectedStr}, but got ${actualStr}`);
    }
}

console.log("\n=== HeartRate Extractor Tests ===\n");

// Test 1: Main example from the task
test("extracts heart rates from the provided example input", () => {
    const input = "LOG_01: HeartRate=72bpm; STATUS=OK | LOG_02: HeartRate= 85 ; STATUS=WARN | LOG_03: HeartRate=error; STATUS=FAIL";
    const result = extractHeartRates(input);
    assertEqual(result, [72, 85]);
});

// Test 2: Single valid heart rate
test("extracts single heart rate value", () => {
    const input = "HeartRate=100bpm";
    const result = extractHeartRates(input);
    assertEqual(result, [100]);
});

// Test 3: No valid heart rates (all errors)
test("returns empty array when no valid heart rates", () => {
    const input = "HeartRate=error; HeartRate=invalid";
    const result = extractHeartRates(input);
    assertEqual(result, []);
});

// Test 4: Empty string input
test("returns empty array for empty string", () => {
    const result = extractHeartRates("");
    assertEqual(result, []);
});

// Test 5: Heart rate with extra spaces
test("handles heart rates with extra spaces", () => {
    const input = "HeartRate =  120  ;";
    const result = extractHeartRates(input);
    assertEqual(result, [120]);
});

// Test 6: Multiple valid heart rates
test("extracts multiple valid heart rates", () => {
    const input = "HeartRate=60; HeartRate=75; HeartRate=90";
    const result = extractHeartRates(input);
    assertEqual(result, [60, 75, 90]);
});

// Test 7: Mixed valid and invalid values
test("filters out non-numeric values", () => {
    const input = "HeartRate=55; HeartRate=N/A; HeartRate=88; HeartRate=--";
    const result = extractHeartRates(input);
    assertEqual(result, [55, 88]);
});

// Test 8: Case insensitivity
test("handles case variations in HeartRate", () => {
    const input = "HEARTRATE=65; heartrate=70; HeartRate=80";
    const result = extractHeartRates(input);
    assertEqual(result, [65, 70, 80]);
});

// Test 9: Heart rate with unit suffix
test("extracts numeric value before unit suffix", () => {
    const input = "HeartRate=95bpm; HeartRate=102 bpm";
    const result = extractHeartRates(input);
    assertEqual(result, [95, 102]);
});

// Test 10: No HeartRate entries in string
test("returns empty array when no HeartRate entries exist", () => {
    const input = "Temperature=98.6; BloodPressure=120/80";
    const result = extractHeartRates(input);
    assertEqual(result, []);
});

console.log("\n=== All tests completed ===\n");
